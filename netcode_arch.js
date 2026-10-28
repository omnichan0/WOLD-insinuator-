/**
 * OMEGA-8D NETWORK SYNCHRONIZATION ARCHITECTURE
 * =============================================
 * Real-time netcode for submarine torpedo telemetry, missile waypoint guidance,
 * civilian AI state machines, and topological map persistence.
 *
 * Tick Rates:
 *   Combat Loop:     60Hz (16.67ms) — player movement, shots, hits
 *   Tactical Loop:   30Hz (33.33ms) — abilities, scans, hacks, dimensional shifts
 *   Strategic Loop:  10Hz (100ms)  — missiles, submarines, air strikes
 *   Civilian Loop:   20Hz (50ms)   — NPC routines, spotting, panic
 *   Map Persist Loop: 1Hz (1000ms) — topology changes, permanent damage
 *   Telemetry Loop:  5Hz (200ms)    — neural telemetry, stats, achievements
 */

const NETCODE = {
  // ==========================================
  // 1. SERVER TICK SYSTEM
  // ==========================================
  tickRates: {
    combat: 60,      // 16.67ms
    tactical: 30,    // 33.33ms
    strategic: 10,   // 100ms
    civilian: 20,     // 50ms
    mapPersist: 1,   // 1000ms
    telemetry: 5,    // 200ms
  },

  tickIntervals: {
    combat: 1000 / 60,
    tactical: 1000 / 30,
    strategic: 1000 / 10,
    civilian: 1000 / 20,
    mapPersist: 1000,
    telemetry: 200,
  },

  // ==========================================
  // 2. SUBMARINE TORPEDO TELEMETRY SYNC
  // ==========================================
  torpedoTelemetry: {
    // Wire-guided torpedoes maintain a data wire to the submarine
    // The firing sub can steer the torpedo via the wire until it breaks
    // Wire breaks at 8000m or if sub takes damage

    maxWireRange: 8000, // meters
    wireBreakOnDamage: true,
    wireBandwidth: 128, // bytes per tick — minimal data over wire

    // Torpedo state machine
    torpedoStates: ['LAUNCHED', 'RUNOUT', 'SEEKING', 'WIRE_GUIDED', 'ACQUIRE_LOCK', 'TERMINAL', 'IMPACT', 'MISSED', 'DESTROYED'],

    // Per-torpedo sync data (sent every strategic tick = 100ms)
    torpedoSyncPacket: {
      torpedoId: 'string',
      ownerId: 'string',
      state: 'string',
      position: { x: 'f32', y: 'f32', z: 'f32' },
      velocity: { x: 'f32', y: 'f32', z: 'f32' },
      heading: 'f32',
      depth: 'f32',
      fuelRemaining: 'f32',
      wireConnected: 'boolean',
      targetLock: 'string|null',
      runDepth: 'f32',
      seekerMode: 'string', // PASSIVE_SONAR, ACTIVE_SONAR, WIRE_GUIDED, WAKE_HOMING
      signalStrength: 'f32', // target signal for active/passive
      countermeasuresDetected: 'u8',
      timeToImpact: 'f32',
    },

    // Acoustic environment sync
    acousticSync: {
      // Thermal layers that deflect sonar
      thermalLayers: [{ depth: 'f32', strength: 'f32' }],
      // Background noise (shipping, biologics, weather)
      ambientNoise: 'f32',
      // Active sonar pings visible to ALL submarines in range
      activePings: [{ sourceId: 'string', position: 'vec3', frequency: 'f32', timestamp: 'u32' }],
      // Acoustic decoys
      decoys: [{ id: 'string', position: 'vec3', signalType: 'string', ttl: 'f32' }],
    },

    // Submarine state sync (sent every strategic tick)
    submarineSyncPacket: {
      subId: 'string',
      teamId: 'string',
      position: { x: 'f32', y: 'f32', z: 'f32' },
      heading: 'f32',
      depth: 'f32',
      speed: 'f32', // knots
      silentRunning: 'boolean',
      periscopeDepth: 'boolean',
      // Silence profile: slower = quieter, depth affects detection
      acousticSignature: 'f32', // 0.0 = silent, 1.0 = loud
      // VLS silos
      vlsSilos: { loaded: 'u8', total: 'u8', types: ['string'] },
      // Torpedo tubes
      torpedoTubes: { loaded: 'u8', total: 'u8', types: ['string'] },
      // Sonar
      sonarMode: 'string', // PASSIVE, ACTIVE, TOWED_ARRAY
      sonarRange: 'f32',
      detectedContacts: [{ contactId: 'string', bearing: 'f32', range: 'f32', classification: 'string', confidence: 'f32' }],
      // Hull integrity
      hullIntegrity: 'f32',
      reactorStatus: 'string', // NORMAL, QUIET, CRITICAL
      crewCount: 'u8',
      // Frogman insertion
      frogmanTeamReady: 'boolean',
      frogmanTeamDeployed: 'boolean',
    },

    // Torpedo guidance loop
    updateTorpedo(torpedo, deltaTime, guidanceInput) {
      const updates = {};

      switch (torpedo.state) {
        case 'LAUNCHED':
          // Exit tube, initial runout
          torpedo.state = 'RUNOUT';
          torpedo.runDepth = guidanceInput.runDepth || torpedo.depth;
          updates.stateChange = 'LAUNCHED -> RUNOUT';
          break;

        case 'RUNOUT':
          // Travel to safe arming distance
          torpedo.fuelRemaining -= deltaTime * 0.5;
          const armDistance = 500; // meters
          if (this._distance(torpedo.startPos, torpedo.position) > armDistance) {
            torpedo.state = 'SEEKING';
            torpedo.seekerMode = guidanceInput.wireConnected ? 'WIRE_GUIDED' : 'PASSIVE_SONAR';
            updates.stateChange = 'RUNOUT -> SEEKING';
          }
          break;

        case 'WIRE_GUIDED':
          // Submarine can steer torpedo via wire
          if (guidanceInput.steering) {
            torpedo.heading = guidanceInput.steering.heading;
            torpedo.runDepth = guidanceInput.steering.depth || torpedo.runDepth;
            updates.wireGuidance = { heading: torpedo.heading, depth: torpedo.runDepth };
          }
          // Check wire integrity
          const wireLength = this._distance(torpedo.startPos, torpedo.position);
          if (wireLength > this.maxWireRange) {
            torpedo.wireConnected = false;
            torpedo.seekerMode = 'ACTIVE_SONAR';
            updates.wireBreak = 'Wire exceeded max range';
          }
          // Transition to active seek
          if (guidanceInput.activateActiveSeeker) {
            torpedo.seekerMode = 'ACTIVE_SONAR';
            torpedo.state = 'ACQUIRE_LOCK';
            updates.stateChange = 'WIRE_GUIDED -> ACQUIRE_LOCK';
          }
          break;

        case 'SEEKING':
          // Passive sonar search
          torpedo.signalStrength = this._passiveSearch(torpedo, guidanceInput.contacts);
          if (torpedo.signalStrength > 0.6) {
            torpedo.state = 'ACQUIRE_LOCK';
            updates.stateChange = 'SEEKING -> ACQUIRE_LOCK';
          }
          break;

        case 'ACQUIRE_LOCK':
          // Lock onto strongest signal
          const target = this._acquireTarget(torpedo, guidanceInput.contacts);
          if (target) {
            torpedo.targetLock = target.contactId;
            torpedo.state = 'TERMINAL';
            torpedo.seekerMode = 'ACTIVE_SONAR';
            updates.lockAcquired = { targetId: target.contactId, bearing: target.bearing };
          } else if (torpedo.fuelRemaining < 5) {
            torpedo.state = 'MISSED';
            updates.stateChange = 'ACQUIRE_LOCK -> MISSED';
          }
          break;

        case 'TERMINAL':
          // Active homing, maximum speed, no wire
          torpedo.wireConnected = false;
          torpedo.speed = 60; // knots terminal speed
          // Countermeasure check
          if (guidanceInput.countermeasuresNear > 0) {
            torpedo.countermeasuresDetected = guidanceInput.countermeasuresNear;
            // 30% chance to decoy per countermeasure
            const decoyChance = 0.3 * guidanceInput.countermeasuresNear;
            if (Math.random() < decoyChance) {
              torpedo.state = 'MISSED';
              updates.decoyed = 'Torpedo decoyed by countermeasures';
              break;
            }
          }
          // Check impact
          if (torpedo.timeToImpact < 0.5) {
            torpedo.state = 'IMPACT';
            updates.impact = { targetId: torpedo.targetLock, damage: this._calculateTorpedoDamage(torpedo) };
          }
          break;

        case 'IMPACT':
          updates.detonation = { position: torpedo.position, targetId: torpedo.targetLock };
          torpedo.state = 'DESTROYED';
          break;

        case 'MISSED':
          torpedo.fuelRemaining -= deltaTime * 0.3;
          if (torpedo.fuelRemaining <= 0) {
            torpedo.state = 'DESTROYED';
            updates.stateChange = 'MISSED -> DESTROYED';
          }
          break;
      }

      // Fuel check
      torpedo.fuelRemaining -= deltaTime * (torpedo.speed / 60);
      if (torpedo.fuelRemaining <= 0 && torpedo.state !== 'IMPACT' && torpedo.state !== 'DESTROYED') {
        torpedo.state = 'DESTROYED';
        updates.outOfFuel = true;
      }

      return { torpedo: torpedo, updates: updates };
    },

    _distance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
    },

    _passiveSearch(torpedo, contacts) {
      if (!contacts || contacts.length === 0) return 0;
      let maxSignal = 0;
      for (const c of contacts) {
        const range = this._distance(torpedo.position, c.position);
        const signal = (c.acousticSignature || 0.5) / Math.max(range / 1000, 0.1);
        maxSignal = Math.max(maxSignal, signal);
      }
      return maxSignal;
    },

    _acquireTarget(torpedo, contacts) {
      let bestTarget = null;
      let bestSignal = 0;
      for (const c of contacts) {
        const range = this._distance(torpedo.position, c.position);
        const signal = (c.acousticSignature || 0.5) / Math.max(range / 1000, 0.1);
        if (signal > bestSignal && signal > 0.7) {
          bestSignal = signal;
          bestTarget = c;
        }
      }
      return bestTarget;
    },

    _calculateTorpedoDamage(torpedo) {
      const baseDamage = torpedo.type === 'HEAVY' ? 800 : 500;
      const proximityBonus = torpedo.warhead === 'PROXIMITY' ? 0.8 : 1.0;
      return Math.floor(baseDamage * proximityBonus);
    },
  },

  // ==========================================
  // 3. MISSILE WAYPOINT GUIDANCE SYNC
  // ==========================================
  missileGuidance: {
    // Cruise missile waypoint system
    // Squad leader manually plots waypoints on tactical map
    // Missile follows waypoints, threading through urban canyons
    // Waypoints can be updated mid-flight by squad leader

    maxWaypoints: 8,
    waypointUpdateRate: 2, // Hz — how often leader can update waypoints
    terrainFollowing: true,
    terrainClearance: 50, // meters above ground

    missileStates: ['LAUNCH', 'BOOST', 'CRUISE', 'WAYPOINT_NAV', 'TERMINAL_DIVE', 'IMPACT', 'INTERCEPTED', 'FAILED'],

    missileSyncPacket: {
      missileId: 'string',
      ownerId: 'string',
      teamId: 'string',
      type: 'string', // TOMAHAWK, HYPERSONIC, ICBM, MIRV_WARHEAD
      state: 'string',
      position: { x: 'f32', y: 'f32', z: 'f32' },
      velocity: { x: 'f32', y: 'f32', z: 'f32' },
      altitude: 'f32',
      speed: 'f32', // Mach
      waypoints: [{ x: 'f32', y: 'f32', z: 'f32', reached: 'boolean' }],
      currentWaypoint: 'u8',
      timeToImpact: 'f32',
      targetPosition: { x: 'f32', y: 'f32', z: 'f32' },
      interceptable: 'boolean',
      interceptorLock: 'string|null',
      payloadType: 'string', // CONVENTIONAL, NUCLEAR, EMP, MIRV
      warheadCount: 'u8',
      launched: 'u32', // timestamp
      eta: 'f32',
    },

    // Update missile position and guidance
    updateMissile(missile, deltaTime, waypointUpdate) {
      const updates = {};

      switch (missile.state) {
        case 'LAUNCH':
          missile.state = 'BOOST';
          missile.altitude = 0;
          missile.speed = 0.3; // Mach 0.3 initial
          updates.stateChange = 'LAUNCH -> BOOST';
          break;

        case 'BOOST':
          missile.altitude += deltaTime * 500; // climb rate
          missile.speed += deltaTime * 2; // accelerate
          if (missile.altitude > 1000) {
            missile.state = 'CRUISE';
            missile.speed = missile.type === 'HYPERSONIC' ? 5 : 0.8;
            updates.stateChange = 'BOOST -> CRUISE';
          }
          break;

        case 'CRUISE':
          // Follow waypoints
          if (missile.waypoints && missile.waypoints.length > 0) {
            missile.state = 'WAYPOINT_NAV';
            missile.currentWaypoint = 0;
            updates.stateChange = 'CRUISE -> WAYPOINT_NAV';
          } else {
            // Direct to target
            missile.state = 'TERMINAL_DIVE';
            updates.stateChange = 'CRUISE -> TERMINAL_DIVE (no waypoints)';
          }
          break;

        case 'WAYPOINT_NAV':
          // Process waypoint updates from squad leader
          if (waypointUpdate && waypointUpdate.waypoints) {
            missile.waypoints = waypointUpdate.waypoints;
            updates.waypointsUpdated = missile.waypoints.length + ' waypoints';
          }

          // Navigate to current waypoint
          if (missile.currentWaypoint < missile.waypoints.length) {
            const wp = missile.waypoints[missile.currentWaypoint];
            const dist = this._distance3(missile.position, wp);

            // Terrain following
            if (this.terrainFollowing) {
              missile.altitude = Math.max(this.terrainClearance, missile.altitude - deltaTime * 200);
            }

            if (dist < 100) { // reached waypoint
              missile.waypoints[missile.currentWaypoint].reached = true;
              missile.currentWaypoint++;
              updates.waypointReached = missile.currentWaypoint;

              if (missile.currentWaypoint >= missile.waypoints.length) {
                missile.state = 'TERMINAL_DIVE';
                updates.stateChange = 'WAYPOINT_NAV -> TERMINAL_DIVE';
              }
            }
          }
          break;

        case 'TERMINAL_DIVE':
          // Dive to target
          missile.altitude -= deltaTime * 1000;
          missile.speed = missile.type === 'HYPERSONIC' ? 20 : 1.5; // Mach in terminal

          // Interception check
          if (missile.interceptable && missile.interceptorLock) {
            const interceptChance = missile.type === 'HYPERSONIC' ? 0.05 : 0.3;
            if (Math.random() < interceptChance) {
              missile.state = 'INTERCEPTED';
              updates.intercepted = 'Missile intercepted by defense system';
              break;
            }
          }

          if (missile.altitude <= 0 || missile.timeToImpact < 0.5) {
            missile.state = 'IMPACT';
            updates.impact = {
              position: missile.position,
              targetPosition: missile.targetPosition,
              payloadType: missile.payloadType,
              damage: this._calculateMissileDamage(missile),
              radius: this._getBlastRadius(missile),
              permanent: missile.payloadType === 'NUCLEAR',
            };
          }
          break;

        case 'IMPACT':
          updates.detonation = { position: missile.position, payload: missile.payloadType };
          missile.state = 'DESTROYED';
          break;
      }

      // Calculate ETA
      if (missile.targetPosition && missile.state !== 'IMPACT' && missile.state !== 'INTERCEPTED') {
        const dist = this._distance3(missile.position, missile.targetPosition);
        missile.timeToImpact = dist / (missile.speed * 343); // Mach to m/s
        updates.eta = missile.timeToImpact + 's';
      }

      return { missile: missile, updates: updates };
    },

    _distance3(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
    },

    _calculateMissileDamage(missile) {
      const damages = {
        TOMAHAWK: 2000, HYPERSONIC: 5000, ICBM: 50000, MIRV_WARHEAD: 8000,
      };
      return damages[missile.type] || 2000;
    },

    _getBlastRadius(missile) {
      const radii = {
        TOMAHAWK: 50, HYPERSONIC: 80, ICBM: 200, MIRV_WARHEAD: 100,
      };
      return radii[missile.type] || 50;
    },
  },

  // ==========================================
  // 4. CIVILIAN AI STATE MACHINE SYNC
  // ==========================================
  civilianAISync: {
    // 1000+ civilian NPCs need to be synced efficiently
    // Use state machines with delta compression
    // Only sync CHANGED states, not full state every tick

    // Civilian state machine
    states: {
      SLEEPING: { transitions: ['COMMUTING'], schedule: '00:00-06:00' },
      COMMUTING: { transitions: ['WORKING', 'SHOPPING', 'PANICKING', 'SPOTTING'], schedule: '06:00-09:00' },
      WORKING: { transitions: ['LUNCH', 'COMMUTING', 'PANICKING', 'SPOTTING'], schedule: '09:00-17:00' },
      LUNCH: { transitions: ['WORKING', 'PANICKING', 'SPOTTING'], schedule: '12:00-13:00' },
      SHOPPING: { transitions: ['COMMUTING', 'PANICKING', 'SPOTTING'], schedule: 'any' },
      OBSERVING: { transitions: ['SPOTTING', 'REPORTING', 'COMMUTING'], schedule: 'any' },
      SPOTTING: { transitions: ['REPORTING', 'PANICKING'], schedule: 'any' },
      REPORTING: { transitions: ['PANICKING', 'FLEEING'], schedule: 'any' },
      PANICKING: { transitions: ['FLEEING', 'HIDING'], schedule: 'any' },
      FLEEING: { transitions: ['HIDING', 'PANICKING'], schedule: 'any' },
      HIDING: { transitions: ['FLEEING', 'OBSERVING'], schedule: 'any' },
      MILITIA_RALLY: { transitions: ['MILITIA_ENGAGE', 'FLEEING'], schedule: 'any' },
      MILITIA_ENGAGE: { transitions: ['FLEEING', 'DEAD'], schedule: 'any' },
      DEAD: { transitions: [], schedule: 'none' },
    },

    // Delta sync — only send what changed
    civilianSyncPacket: {
      // Full sync (on first contact with client or major state change)
      full: {
        citizenId: 'string',
        type: 'string',
        position: { x: 'f32', y: 'f32', z: 'f32' },
        state: 'string',
        alertLevel: 'u8', // 0-4
        schedule: 'string',
        routine: 'object',
        loyalty: 'f32',
        awareness: 'f32',
        phoneActive: 'boolean',
      },
      // Delta sync (changed fields only, every civilian tick = 50ms)
      delta: {
        citizenId: 'string',
        position: { x: 'f32', y: 'f32', z: 'f32' }, // only if moved > 2m
        state: 'string', // only if changed
        alertLevel: 'u8', // only if changed
        phoneTarget: 'string|null', // who they are calling
        spotting: 'boolean', // are they currently spotting someone
        panicLevel: 'f32', // 0.0-1.0
      },
    },

    // Interest management — only sync civilians near players
    interestRadius: 300, // meters — only sync civilians within 300m of any player
    maxSyncedCivilians: 200, // per client — max civilians to sync to one client

    // Civilian decision loop
    updateCivilian(citizen, deltaTime, environment) {
      const updates = {};
      const time = environment.gameTime || '12:00';
      const nearbyOperators = environment.nearbyOperators || [];
      const nearbyGunfire = environment.nearbyGunfire || 0;
      const nearbyExplosions = environment.nearbyExplosions || 0;
      const alerts = environment.activeAlerts || [];

      // Schedule-based transitions
      const currentState = this.states[citizen.state];
      if (currentState && currentState.schedule && currentState.schedule !== 'any' && currentState.schedule !== 'none') {
        if (!this._inSchedule(time, currentState.schedule)) {
          // Transition based on time
          const newState = this._getScheduledState(time, citizen.type);
          if (newState && newState !== citizen.state) {
            citizen.state = newState;
            updates.stateChange = citizen.state;
          }
        }
      }

      // Environmental triggers
      if (nearbyGunfire > 3 || nearbyExplosions > 0) {
        // Loud sounds trigger panic
        if (citizen.state !== 'HIDING' && citizen.state !== 'DEAD') {
          citizen.state = 'PANICKING';
          citizen.alertLevel = 4;
          citizen.panicLevel = Math.min(1.0, citizen.panicLevel + 0.3);
          updates.stateChange = 'PANICKING';
          updates.alertLevel = 4;
          updates.panicLevel = citizen.panicLevel;
        }
      }

      // Operator spotting
      if (nearbyOperators.length > 0) {
        for (const op of nearbyOperators) {
          const dist = this._distance2(citizen.position, op.position);
          const detectionRange = citizen.awareness * 50; // 7.5m to 42.5m based on awareness
          const visibility = op.stealthLevel || 1.0;
          const effectiveRange = detectionRange / visibility;

          if (dist < effectiveRange) {
            // Check gear visibility
            const gearScore = (op.heavyWeapon ? 0.3 : 0) + (op.tacticalGear ? 0.2 : 0) + (op.dimensionActivity ? 0.3 : 0);

            if (gearScore > citizen.awareness * 0.5 || dist < effectiveRange * 0.5) {
              // Spotted!
              citizen.state = 'SPOTTING';
              citizen.alertLevel = Math.min(4, citizen.alertLevel + 1);
              citizen.spotting = true;
              citizen.phoneTarget = this._getReportingTarget(citizen.type);

              updates.stateChange = 'SPOTTING';
              updates.alertLevel = citizen.alertLevel;
              updates.spotting = true;
              updates.phoneTarget = citizen.phoneTarget;

              // Type-specific behavior
              switch (citizen.type) {
                case 'civilian':
                  // Will call police then flee
                  setTimeout(() => {
                    citizen.state = 'REPORTING';
                  }, 5000); // 5s delay
                  break;
                case 'patriot':
                case 'militia':
                  // Immediate report and resist
                  citizen.state = 'REPORTING';
                  if (citizen.type === 'militia') {
                    citizen.state = 'MILITIA_RALLY';
                  }
                  break;
                case 'informant':
                  // Sell to highest bidder — creates intel market event
                  updates.intelSale = { operatorId: op.id, position: op.position, price: 50 };
                  break;
                case 'shepherd':
                  // Silent report to militia
                  updates.silentReport = { operatorId: op.id, position: op.position, detectedAnomaly: true };
                  break;
                case 'merchant':
                  // Offer trade or betray
                  updates.merchantChoice = { operatorId: op.id, offerTrade: Math.random() > 0.4 };
                  break;
                case 'journalist':
                  // Start filming — 10s window to disable before upload
                  updates.journalistFilming = { operatorId: op.id, uploadIn: 10 };
                  break;
              }
              break;
            }
          }
        }
      }

      // Check alerts from other civilians
      if (alerts.length > 0 && citizen.state !== 'PANICKING' && citizen.state !== 'HIDING') {
        for (const alert of alerts) {
          const dist = this._distance2(citizen.position, alert.position);
          if (dist < 200) { // alert spreads within 200m
            citizen.alertLevel = Math.min(4, citizen.alertLevel + 1);
            if (citizen.alertLevel >= 3) {
              citizen.state = 'PANICKING';
              updates.stateChange = 'PANICKING';
            }
            updates.alertLevel = citizen.alertLevel;
            break;
          }
        }
      }

      // Movement updates
      if (citizen.state === 'COMMUTING' || citizen.state === 'FLEEING' || citizen.state === 'PANICKING') {
        const speed = citizen.state === 'FLEEING' ? 8 : 1.5; // m/s
        const direction = citizen.state === 'FLEEING' ? this._awayFromThreat(citizen, environment) : citizen.routineDirection;
        citizen.position.x += direction.x * speed * deltaTime;
        citizen.position.z += direction.z * speed * deltaTime;
        updates.positionChanged = true;
      }

      return { citizen: citizen, updates: updates };
    },

    _distance2(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.z - p1.z, 2));
    },

    _inSchedule(time, schedule) {
      if (schedule === 'any' || schedule === 'none') return true;
      const [start, end] = schedule.split('-');
      return time >= start && time <= end;
    },

    _getScheduledState(time, type) {
      if (time >= '00:00' && time < '06:00') return 'SLEEPING';
      if (time >= '06:00' && time < '09:00') return 'COMMUTING';
      if (time >= '09:00' && time < '12:00') return 'WORKING';
      if (time >= '12:00' && time < '13:00') return 'LUNCH';
      if (time >= '13:00' && time < '17:00') return 'WORKING';
      if (time >= '17:00' && time < '22:00') return 'SHOPPING';
      return 'SLEEPING';
    },

    _getReportingTarget(type) {
      const targets = {
        civilian: 'police',
        patriot: 'militia',
        informant: 'black_market',
        shepherd: 'militia_silent',
        militia: 'all_militia',
        merchant: 'highest_bidder',
        journalist: 'social_media',
      };
      return targets[type] || 'police';
    },

    _awayFromThreat(citizen, env) {
      if (!env.nearbyOperators || env.nearbyOperators.length === 0) return { x: 1, z: 0 };
      const threat = env.nearbyOperators[0];
      const dx = citizen.position.x - threat.position.x;
      const dz = citizen.position.z - threat.position.z;
      const len = Math.sqrt(dx * dx + dz * dz) || 1;
      return { x: dx / len, z: dz / len };
    },
  },

  // ==========================================
  // 5. TOPOLOGICAL MAP PERSISTENCE DATABASE
  // ==========================================
  mapPersistence: {
    // Permanent map changes stored in database, synced globally
    // When a squad blows a hole in Ekiti, it is there for EVERYONE forever

    // Damage types that persist
    persistentDamageTypes: [
      'BUILDING_COLLAPSE', 'WALL_BREACH', 'CRATER', 'DIMENSIONAL_TEAR',
      'VOID_SCAR', 'GRAVITY_ANOMALY', 'TIME_DISTORTION', 'QUANTUM_FISSURE',
      'STRUCTURAL_DEFORMATION', 'GLASSIFICATION', 'RADIATION_ZONE',
      'SINGULARITY_CRATER', 'FROST_ZONE', 'NANITE_CONSUMPTION',
    ],

    // Map modification record
    mapModRecord: {
      modId: 'string',
      zoneId: 'string', // the real-world zone identifier
      zoneName: 'string', // e.g. "EKSU Road to Ilawe Road, Ekiti"
      coords: { lat: 'f32', lng: 'f32' },
      type: 'string',
      severity: 'u8', // 1-10
      radius: 'f32', // meters
      depth: 'f32', // meters (for craters)
      createdBy: 'string', // player ID
      creatorTag: 'string', // "Loveth#0815"
      createdDate: 'string', // ISO timestamp
      matchId: 'string',
      // Visual data
      visualEffect: 'string',
      // Gameplay impact
      blocksMovement: 'boolean',
      blocksSight: 'boolean',
      providesCover: 'boolean',
      dimensionalLock: 'boolean', // prevents dimensional shifts in area
      // Expiry (null = permanent)
      expiryDate: 'string|null',
      // Affected coordinates (for pathfinding recalculation)
      affectedCells: ['string'],
    },

    // Zone topology state
    zoneTopology: {
      zoneId: 'string',
      zoneName: 'string',
      bounds: { minLat: 'f32', maxLat: 'f32', minLng: 'f32', maxLng: 'f32' },
      // Base terrain (from real-world data)
      baseTerrain: 'string',
      baseElevation: 'f32',
      // Modifications applied
      modifications: ['string'], // mod IDs
      modificationCount: 'u16',
      // Current topology hash (for sync verification)
      topologyHash: 'string',
      // Last updated
      lastModified: 'string',
    },

    // Create a permanent map modification
    createModification(zoneId, zoneName, coords, type, severity, radius, creator) {
      const mod = {
        modId: 'MOD-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
        zoneId: zoneId,
        zoneName: zoneName,
        coords: coords,
        type: type,
        severity: severity,
        radius: radius,
        depth: type === 'CRATER' ? radius * 0.3 : 0,
        createdBy: creator.id,
        creatorTag: creator.tag,
        createdDate: new Date().toISOString(),
        matchId: 'MATCH-' + Date.now(),
        visualEffect: this._getVisualEffect(type),
        blocksMovement: type === 'BUILDING_COLLAPSE' || type === 'SINGULARITY_CRATER',
        blocksSight: type === 'DIMENSIONAL_TEAR' || type === 'VOID_SCAR',
        providesCover: type === 'CRATER' || type === 'WALL_BREACH',
        dimensionalLock: type === 'QUANTUM_FISSURE' || type === 'DIMENSIONAL_TEAR',
        expiryDate: null, // permanent
        affectedCells: this._calculateAffectedCells(coords, radius),
      };

      return mod;
    },

    _getVisualEffect(type) {
      const effects = {
        BUILDING_COLLAPSE: 'rubble_pile',
        WALL_BREACH: 'jagged_hole',
        CRATER: 'scorched_crater',
        DIMENSIONAL_TEAR: 'reality_rift',
        VOID_SCAR: 'void_fissure',
        GRAVITY_ANOMALY: 'distortion_field',
        TIME_DISTORTION: 'temporal_ripple',
        QUANTUM_FISSURE: 'quantum_shards',
        STRUCTURAL_DEFORMATION: 'warped_geometry',
        GLASSIFICATION: 'glass_surface',
        RADIATION_ZONE: 'green_haze',
        SINGULARITY_CRATER: 'black_sphere',
        FROST_ZONE: 'ice_crystals',
        NANITE_CONSUMPTION: 'grey_dust',
      };
      return effects[type] || 'unknown';
    },

    _calculateAffectedCells(coords, radius) {
      // Grid-based cell calculation for pathfinding
      const cells = [];
      const cellSize = 10; // 10m grid cells
      const radiusInCells = Math.ceil(radius / cellSize);
      for (let dx = -radiusInCells; dx <= radiusInCells; dx++) {
        for (let dy = -radiusInCells; dy <= radiusInCells; dy++) {
          if (Math.sqrt(dx * dx + dy * dy) <= radiusInCells) {
            cells.push(coords.lat + '_' + coords.lng + '_' + dx + '_' + dy);
          }
        }
      }
      return cells;
    },

    // Sync topology to all clients in zone
    syncZoneTopology(zone, clientVersions) {
      // Delta sync: only send mods the client does not have
      const syncPackets = {};
      for (const [clientId, clientModCount] of Object.entries(clientVersions)) {
        if (clientModCount < zone.modificationCount) {
          // Client is behind, send missing mods
          syncPackets[clientId] = {
            zoneId: zone.zoneId,
            newMods: zone.modifications.slice(clientModCount),
            topologyHash: zone.topologyHash,
            modificationCount: zone.modificationCount,
          };
        }
      }
      return syncPackets;
    },
  },

  // ==========================================
  // 6. CLIENT-SIDE PREDICTION & RECONCILIATION
  // ==========================================
  prediction: {
    // Player sends input to server
    // Client predicts movement locally
    // Server sends authoritative state
    // Client reconciles if mismatch

    maxPredictionFrames: 10, // max frames client can predict ahead
    reconciliationSpeed: 0.15, // lerp speed for correction
    interpolationDelay: 100, // ms — delay for smooth remote player movement

    // Input packet (sent every combat tick = 16.67ms)
    inputPacket: {
      sequence: 'u32',
      timestamp: 'u32',
      // Movement
      moveX: 'i16', moveY: 'i16', moveZ: 'i16',
      lookX: 'i16', lookY: 'i16',
      // Actions
      firing: 'boolean',
      aiming: 'boolean',
      abilityUsed: 'string|null',
      abilityTarget: 'string|null',
      // Dimensional
      dimensionShift: 'string|null', // 4D, 6D, 7D, 8D
      // Weapon
      weaponSlot: 'u8',
      reload: 'boolean',
    },

    // Server state packet (sent every combat tick)
    statePacket: {
      sequence: 'u32',
      timestamp: 'u32',
      playerId: 'string',
      position: { x: 'f32', y: 'f32', z: 'f32' },
      velocity: { x: 'f32', y: 'f32', z: 'f32' },
      health: 'f32',
      dimension: 'u8',
      quantumState: 'u8',
      // Acknowledged input sequence
      lastProcessedInput: 'u32',
    },

    // Reconcile client prediction with server state
    reconcile(clientState, serverState, pendingInputs) {
      const positionDiff = Math.sqrt(
        Math.pow(clientState.position.x - serverState.position.x, 2) +
        Math.pow(clientState.position.y - serverState.position.y, 2) +
        Math.pow(clientState.position.z - serverState.position.z, 2)
      );

      if (positionDiff > 0.5) { // 0.5m threshold
        // Mismatch detected — replay pending inputs from server state
        let state = { ...serverState };
        const inputsToReplay = pendingInputs.filter(i => i.sequence > serverState.lastProcessedInput);
        for (const input of inputsToReplay) {
          state = this._applyInput(state, input);
        }
        return { corrected: true, newState: state, positionDiff: positionDiff };
      }

      return { corrected: false, positionDiff: positionDiff };
    },

    _applyInput(state, input) {
      // Apply movement input to state
      return {
        ...state,
        position: {
          x: state.position.x + input.moveX * 0.01,
          y: state.position.y + input.moveY * 0.01,
          z: state.position.z + input.moveZ * 0.01,
        },
      };
    },
  },

  // ==========================================
  // 7. LAG COMPENSATION
  // ==========================================
  lagCompensation: {
    // When a player fires, check if they hit from THEIR perspective
    // Rewind server state to client's view at time of shot

    historySize: 1000, // ms of history to keep
    historyInterval: 16, // ms between snapshots

    // Hit registration with lag compensation
    validateHit(shooter, target, shotTimestamp, hitPosition) {
      // Rewind target to where they were when shooter fired
      const targetAtShotTime = this._rewindEntity(target, shotTimestamp);

      if (!targetAtShotTime) {
        return { valid: false, reason: 'No history for timestamp' };
      }

      // Check if hit position is within target's hitbox at that time
      const distance = Math.sqrt(
        Math.pow(hitPosition.x - targetAtShotTime.position.x, 2) +
        Math.pow(hitPosition.y - targetAtShotTime.position.y, 2) +
        Math.pow(hitPosition.z - targetAtShotTime.position.z, 2)
      );

      const hitboxRadius = target.hitboxRadius || 0.5;
      const valid = distance <= hitboxRadius;

      return {
        valid: valid,
        distance: distance,
        reason: valid ? 'HIT' : 'MISS',
        targetPosition: targetAtShotTime.position,
        rewindMs: Date.now() - shotTimestamp,
      };
    },

    _rewindEntity(entity, timestamp) {
      // Find entity state at given timestamp
      if (!entity.history) return null;
      for (let i = entity.history.length - 1; i >= 0; i--) {
        if (entity.history[i].timestamp <= timestamp) {
          return entity.history[i];
        }
      }
      return entity.history[0] || null;
    },
  },

  // ==========================================
  // 8. NETWORK BANDWIDTH OPTIMIZATION
  // ==========================================
  bandwidth: {
    // Estimated bandwidth per client (kbps)
    perClient: {
      combat: 32, // 60Hz x small packets
      tactical: 16, // 30Hz
      strategic: 8, // 10Hz — missiles, subs
      civilian: 24, // 20Hz x delta compressed
      mapPersist: 4, // 1Hz — only on changes
      telemetry: 2, // 5Hz — minimal
      total: 86, // kbps per client
    },

    // Server bandwidth for 500-player Division
    serverMax: {
      players: 500,
      bandwidthMbps: (500 * 86) / 1024, // ~42 Mbps for full Division
      torpedoTelemetry: 2, // Mbps — torpedoes and subs
      missileGuidance: 1.5, // Mbps — active missiles
      civilianAI: 8, // Mbps — 1000+ NPCs delta compressed
      mapPersistence: 0.5, // Mbps — topology changes
    },

    // Compression
    compression: {
      enabled: true,
      algorithm: 'lz4', // fast compression
      ratio: 0.4, // 60% compression
      effectiveBandwidth: 86 * 0.4, // ~34 kbps per client after compression
    },

    // Interest management zones
    interestManagement: {
      // Only send data for entities within player's interest radius
      combatRadius: 200, // meters — players, bullets
      tacticalRadius: 500, // meters — abilities, scans
      strategicRadius: 5000, // meters — missiles, air strikes
      civilianRadius: 300, // meters — NPCs near player
      // Server divides map into cells and only sends data for cells near players
      cellSize: 100, // meters
      maxCellsPerClient: 25, // 5x5 grid around player
    },
  },

  // ==========================================
  // 9. SERVER ARCHITECTURE
  // ==========================================
  serverArchitecture: {
    // Match server handles one match instance
    // Authoritative for all game state
    matchServer: {
      tickRate: 60,
      maxPlayers: 500,
      zones: 1, // one zone per server
      // Sub-servers for heavy computation
      civilianAIWorker: true, // separate thread for civilian AI
      physicsWorker: true, // separate thread for physics
      telemetryWorker: true, // separate thread for neural telemetry
    },

    // Strategic server handles cross-match systems
    strategicServer: {
      // Manages persistent map database
      // Routes notifications to multi-country players
      // Handles recruitment and team formation
      mapDatabase: true,
      notificationRouter: true,
      matchmaking: true,
    },

    // Database schema (topological persistence)
    database: {
      // Zone topology table
      zones: {
        _id: 'ObjectId',
        zoneId: 'string',
        zoneName: 'string',
        bounds: 'object',
        baseTerrain: 'string',
        modifications: 'array',
        modificationCount: 'number',
        topologyHash: 'string',
        lastModified: 'date',
      },

      // Map modifications table
      modifications: {
        _id: 'ObjectId',
        modId: 'string',
        zoneId: 'string',
        type: 'string',
        coords: 'object',
        severity: 'number',
        radius: 'number',
        createdBy: 'string',
        creatorTag: 'string',
        createdDate: 'date',
        expiryDate: 'date|null',
        affectedCells: 'array',
      },

      // Player profiles (persistent career)
      players: {
        _id: 'ObjectId',
        playerId: 'string',
        name: 'string',
        countries: 'array', // countries enlisted
        careers: 'object', // career per country
        coins: 'number',
        premiumTokens: 'number',
        weapons: 'array',
        skills: 'array',
        gear: 'array',
        achievements: 'array',
        titles: 'array',
        ariaOwned: 'boolean',
        createdAt: 'date',
      },

      // Active matches
      matches: {
        _id: 'ObjectId',
        matchId: 'string',
        zoneId: 'string',
        teams: 'array',
        winCondition: 'string',
        status: 'string',
        startTime: 'date',
        endTime: 'date|null',
        participants: 'array',
      },

      // Recruitment banners
      banners: {
        _id: 'ObjectId',
        bannerId: 'string',
        type: 'string',
        country: 'string',
        commander: 'string',
        requirements: 'object',
        applicants: 'array',
        status: 'string',
        createdAt: 'date',
      },
    },
  },

  // ==========================================
  // 10. NOTIFICATION ROUTER (Multi-Country)
  // ==========================================
  notificationRouter: {
    // Routes campaign notifications to players enlisted in each country
    // Player can be in 12 countries and get notifications from all

    routeNotification(campaign, playerProfiles) {
      const notifications = [];
      for (const profile of playerProfiles) {
        if (profile.countries.includes(campaign.country)) {
          // Check if player is available
          if (profile.currentMatch && profile.currentMatch.status === 'active') {
            // Player is in a match — queue notification
            notifications.push({
              playerId: profile.playerId,
              type: 'CAMPAIGN_INVITE_QUEUED',
              country: campaign.country,
              campaignName: campaign.name,
              urgency: campaign.urgency,
              message: 'New campaign in ' + campaign.country + ': ' + campaign.name + ' (queued — you are in a match)',
            });
          } else {
            notifications.push({
              playerId: profile.playerId,
              type: 'CAMPAIGN_INVITE',
              country: campaign.country,
              campaignName: campaign.name,
              urgency: campaign.urgency,
              career: profile.careers[campaign.country],
              message: 'New campaign in ' + campaign.country + ': ' + campaign.name + ' (as ' + profile.careers[campaign.country] + ')',
            });
          }
        }
      }
      return notifications;
    },

    // Notification types
    types: {
      CAMPAIGN_INVITE: 'New campaign available',
      CAMPAIGN_INVITE_QUEUED: 'Campaign available (queued — in match)',
      SQUAD_RECRUITMENT: 'A squad is recruiting',
      BOUNTY_PLACED: 'A bounty has been placed on you',
      MATCH_STARTING: 'Your match is starting in 5 minutes',
      COUNTRY_ATTACKED: 'A country you are enlisted in is under attack',
      PROMOTION_AVAILABLE: 'Career upgrade available',
      ACHIEVEMENT_UNLOCKED: 'Achievement unlocked',
      LEGACY_MOD: 'Your permanent modification was triggered by another player',
    },

    // Urgency levels
    urgency: ['LOW', 'NORMAL', 'HIGH', 'CRITICAL', 'IMMEDIATE'],
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NETCODE;
}
if (typeof window !== 'undefined') {
  window.NETCODE = NETCODE;
}
