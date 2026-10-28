// ====== OMEGA-8D: QUANTUM ENTANGLEMENT & REALITY ENGINE ======
// Hive-mind squad link, sensory distortion, conceptual weapons,
// adaptive red-team AI, permanent global legacy, real-world lat/long zones

// ====== 1. QUANTUM ENTANGLEMENT SQUAD LINK ======
const QUANTUM_LINK = {
  // 6D-8D players are quantum-entangled with their squad
  // When one scopes an enemy, ALL entangled squadmates see it

  entangled: false,
  linkLevel: 0, // 0=none, 1=6D, 2=7D, 3=8D
  sharedVisionRange: 0, // meters of shared peripheral vision
  reactionTimeReduction: 0, // ms reduction

  activateLink(premiumTier) {
    if (!premiumTier || premiumTier === 'FREE') return { success: false, msg: 'Requires 6D+ premium tier' };
    this.entangled = true;
    if (premiumTier === 'RECRUIT') { this.linkLevel = 1; this.sharedVisionRange = 50; this.reactionTimeReduction = 100; }
    if (premiumTier === 'OPERATIVE') { this.linkLevel = 2; this.sharedVisionRange = 100; this.reactionTimeReduction = 200; }
    if (premiumTier === 'COMMANDER') { this.linkLevel = 3; this.sharedVisionRange = 200; this.reactionTimeReduction = 400; }
    if (premiumTier === 'SUPREME') { this.linkLevel = 3; this.sharedVisionRange = 500; this.reactionTimeReduction = 800; }
    return { success: true, level: this.linkLevel, range: this.sharedVisionRange, reduction: this.reactionTimeReduction };
  },

  // When an entangled player scopes an enemy, share the feed
  shareVisualFeed(scoperId, targetData, squadMembers) {
    if (!this.entangled) return [];
    const shared = [];
    squadMembers.forEach(member => {
      if (member.id === scoperId || !member.alive) return;
      const dist = Math.sqrt((member.x - targetData.x)**2 + (member.z - targetData.z)**2);
      if (dist <= this.sharedVisionRange) {
        shared.push({
          memberId: member.id,
          feedType: 'peripheral_overlay',
          targetId: targetData.id,
          targetPos: { x: targetData.x, y: targetData.y, z: targetData.z, w: targetData.w || 0, q: targetData.q || 0 },
          threatLevel: targetData.health > 50 ? 'high' : 'critical',
          marker: targetData.health <= 25 ? '🔴 FINISH' : '🎯 SPOTTED',
          reactionReduction: this.reactionTimeReduction,
          dimensions: targetData.dimensions || [0,0,0,0,0,0,0,0]
        });
      }
    });
    return shared;
  },

  // Entangled squad can coordinate dimensional attacks
  dimensionalSync(squadMembers) {
    if (!this.entangled || squadMembers.length < 2) return null;
    const syncAbilities = {
      '4d_fold_volley': { name: '4D Fold Volley', desc: 'Entangled snipers fire through 4D simultaneously', minSquad: 2, dmg: 1.5 },
      'quantum_suppression': { name: 'Quantum Suppression', desc: 'Lock enemy in all 3 quantum states', minSquad: 3, dmg: 1.2 },
      'void_convergence': { name: 'Void Convergence', desc: 'Multiple banishments to same void instance', minSquad: 2, reqTier: 'OPERATIVE' },
      'cosmic_flare': { name: 'Cosmic Flare', desc: 'Banish entire enemy squad to deep space', minSquad: 4, reqTier: 'COMMANDER' },
      'galaxy_collapse': { name: 'Galaxy Collapse', desc: 'Rip a 500m zone into another galaxy', minSquad: 5, reqTier: 'SUPREME' }
    };
    const available = {};
    for (const [key, ab] of Object.entries(syncAbilities)) {
      if (squadMembers.length >= ab.minSquad) available[key] = ab;
    }
    return available;
  }
};

// ====== 2. SENSORY DISTORTION FLARES ======
const DISTORTION_FLARES = {
  // Tactical grenades that break enemy spatial perception

  flares: {
    euclidean_breaker: {
      name: 'Euclidean Breaker',
      cost: 300, // 30 IRL dollars
      radius: 15,
      duration: 8,
      effects: {
        upIsDown: true,        // gravity perception flipped
        wallsBreathe: true,    // walls pulse and shift
        depthLoss: true,        // can't judge distance
        minimapCorrupt: true,   // minimap scrambled
        hudInvert: true         // controls temporarily inverted
      },
      desc: 'Turns enemy screen into a non-Euclidean nightmare'
    },
    dimensional_echo: {
      name: 'Dimensional Echo Flare',
      cost: 500,
      radius: 20,
      duration: 10,
      effects: {
        footstepEcho: true,     // footsteps echo from 5 dimensions
        phantomEnemies: true,    // see ghost enemies from other quantum states
        falseContacts: 4,       // 4 fake enemy markers on HUD
        soundReversal: true,     // all sound plays backwards
        quantumBleed: true       // see all 3 quantum realities simultaneously (overwhelming)
      },
      desc: 'Enemy hears and sees threats from dimensions that dont exist in their reality'
    },
    temporal_stutter: {
      name: 'Temporal Stutter Grenade',
      cost: 400,
      radius: 12,
      duration: 6,
      effects: {
        timeStutter: true,      // time randomly speeds up and slows down
        positionEcho: true,      // see yourself 2 seconds ago
        actionReplay: true,      // your last action repeats involuntarily
        reloadLoop: true,        // weapon keeps reloading
        movementDrift: true      // movement direction drifts
      },
      desc: 'Enemy time stutters — they relive the last 2 seconds on loop'
    },
    void_mirage: {
      name: 'Void Mirage',
      cost: 700,
      radius: 25,
      duration: 12,
      premiumOnly: true,
      reqTier: 'OPERATIVE',
      effects: {
        voidOverlay: true,      // screen goes pitch black with void creatures
        existentialDread: true,   // HUD shows "you have been here forever"
        squadVanish: true,        // teammates appear to disappear
        selfDoubt: true,          // own position marker vanishes
        falseDeath: true          // see your own death 3 times in a row
      },
      desc: 'Enemy sees their own death replay. Teammates vanish. Reality dissolves.'
    },
    cosmic_shatter: {
      name: 'Cosmic Shatter Grenade',
      cost: 1000,
      radius: 30,
      duration: 15,
      premiumOnly: true,
      reqTier: 'COMMANDER',
      effects: {
        galaxyShatter: true,      // screen fractures into galaxy shards
        allDimensionsVisible: true, // see ALL 8 dimensions at once (overwhelming)
        banishmentHallucination: true, // think youve been banished to deep space
        physicsBreak: true,        // gravity reverses every 2 seconds
        identityLoss: true         // forget which team youre on for 3 seconds
      },
      desc: 'Reality shatters. Enemy forgets which team they are on. Ultimate psychological weapon.'
    }
  },

  applyFlare(flareType, enemies) {
    const flare = this.flares[flareType];
    if (!flare) return { success: false };
    const affected = [];
    enemies.forEach(enemy => {
      affected.push({
        enemyId: enemy.id,
        effects: flare.effects,
        duration: flare.duration,
        radius: flare.radius,
        severity: Object.keys(flare.effects).length
      });
    });
    return { success: true, flare: flare.name, affected: affected.length, duration: flare.duration };
  }
};

// ====== 3. CONCEPTUAL & REALITY-BENDING WEAPONS ======
const CONCEPTUAL_WEAPONS = {
  // Weapons that don't fire bullets — they fire concepts

  weapons: {
    probability_gauss: {
      name: 'Probability Gauss-Rifle',
      era: 11,
      cost: 150000, // coins = $15,000
      dmg: 80,
      rate: 600,
      mag: 5,
      range: 2000,
      type: 'conceptual',
      rarity: 'mythic',
      mechanic: 'probability_collapse',
      desc: 'Fires localized probability collapses. Recalculates hit-box across multiple timelines.',
      fire(target) {
        // The bullet exists as a probability wave until it "collapses"
        // Roll across timelines — if probability favors it, materializes inside armor
        const timelines = 8;
        let hits = 0;
        for (let t = 0; t < timelines; t++) {
          // Each timeline has a slightly different hit position
          const roll = Math.random();
          if (roll > 0.3) hits++;
        }
        if (hits >= 6) {
          return { hit: true, crit: true, msg: 'Probability collapsed — round materialized INSIDE armor', dmg: 120, timelineHits: hits };
        } else if (hits >= 3) {
          return { hit: true, crit: false, msg: 'Partial probability collapse', dmg: 80, timelineHits: hits };
        } else {
          return { hit: false, crit: false, msg: 'Wave function collapsed to miss', dmg: 0, timelineHits: hits };
        }
      }
    },

    gravity_well_carbine: {
      name: 'Gravity-Well Carbine',
      era: 10,
      cost: 80000,
      dmg: 45,
      rate: 200,
      mag: 12,
      range: 800,
      type: 'conceptual',
      rarity: 'legendary',
      mechanic: 'gravity_collapse',
      desc: 'Pulls local physics grid inward, crushing cover and pinning enemies under 10G spikes.',
      fire(target, nearbyObjects) {
        const results = {
          directHit: target ? { id: target.id, pinned: true, pinDuration: 3, gravityG: 10 } : null,
          coverCrushed: [],
          areaEffect: { radius: 15, gravity: 10, duration: 4 }
        };
        nearbyObjects.forEach(obj => {
          if (obj.isCover) results.coverCrushed.push({ id: obj.id, destroyed: true, msg: 'Cover crushed under 10G' });
        });
        return results;
      }
    },

    tachyon_lance: {
      name: 'Tachyon Lance',
      era: 11,
      cost: 200000,
      dmg: 200,
      rate: 2000,
      mag: 3,
      range: 5000,
      type: 'conceptual',
      rarity: 'mythic',
      mechanic: 'retroactive_hit',
      desc: 'Fires faster than light. Target takes damage BEFORE you pull the trigger.',
      fire(target) {
        return {
          hit: true,
          retroactive: true,
          msg: 'Target already took damage 0.3 seconds ago',
          dmg: 200,
          visualDelay: -300 // negative = hit happens before muzzle flash
        };
      }
    },

    existence_eraser: {
      name: 'Existence Eraser',
      era: 11,
      cost: 500000,
      dmg: 999,
      rate: 5000,
      mag: 1,
      range: 10000,
      type: 'conceptual',
      rarity: 'mythic',
      mechanic: 'existence_removal',
      desc: 'Doesnt kill. Removes target from this timeline entirely. They never existed.',
      fire(target) {
        return {
          hit: true,
          erased: true,
          msg: 'Target erased from this timeline. No body. No death. No record.',
          dmg: 999,
          sideEffect: 'ALL players forget this target existed for 30 seconds',
          reviveBlocked: true // can't respawn because they never existed
        };
      }
    },

    paradox_rifle: {
      name: 'Paradox Rifle',
      era: 11,
      cost: 180000,
      dmg: 100,
      rate: 800,
      mag: 6,
      range: 1500,
      type: 'conceptual',
      rarity: 'mythic',
      mechanic: 'temporal_paradox',
      desc: 'Creates a paradox — the target is hit by a bullet that was never fired.',
      fire(target) {
        return {
          hit: true,
          paradox: true,
          msg: 'Target hit by a bullet from a timeline where you never fired',
          dmg: 100,
          confusion: 5, // seconds of confusion
          sideEffect: 'Target sees themselves getting shot from a direction where no shooter exists'
        };
      }
    },

    dream_shatterer: {
      name: 'Dream Shatterer',
      era: 11,
      cost: 300000,
      dmg: 150,
      rate: 1500,
      mag: 4,
      range: 3000,
      type: 'conceptual',
      rarity: 'mythic',
      mechanic: 'consciousness_attack',
      desc: 'Attacks the targets consciousness across all dimensions. They wake up in deep space.',
      fire(target) {
        return {
          hit: true,
          consciousnessAttack: true,
          msg: 'Target consciousness shattered across 8 dimensions',
          dmg: 150,
          effect: 'Target sees themselves in 8 different realities simultaneously',
          banishment: 'cosmic', // auto-banishes
          banishDuration: 60
        };
      }
    },

    omniverse_cannon: {
      name: 'Omniverse Cannon',
      era: 11,
      cost: 1000000,
      dmg: 500,
      rate: 10000,
      mag: 1,
      range: 50000,
      type: 'conceptual',
      rarity: 'mythic',
      mechanic: 'multiverse_strike',
      desc: 'Fires across every possible universe simultaneously. Hit rate: 100%. Unblockable.',
      fire(target) {
        return {
          hit: true,
          omniverse: true,
          msg: 'Hit registered across infinite universes. No escape possible.',
          dmg: 500,
          blockable: false,
          dimensionalBlockable: false,
          quantumBlockable: false
        };
      }
    },

    schrodinger_pistol: {
      name: 'Schrödinger Pistol',
      era: 10,
      cost: 60000,
      dmg: 50,
      rate: 400,
      mag: 8,
      range: 500,
      type: 'conceptual',
      rarity: 'legendary',
      mechanic: 'superposition',
      desc: 'Bullet is simultaneously a hit and a miss until the target observes it.',
      fire(target) {
        // If target is looking at the shooter, bullet "collapses" to a hit
        // If target is NOT looking, bullet stays in superposition (both hit and miss)
        if (Math.random() > 0.5) {
          return {
            hit: true,
            superposition: true,
            msg: 'Target observed the bullet — wave function collapsed to HIT',
            dmg: 50
          };
        } else {
          return {
            hit: false,
            superposition: true,
            msg: 'Target didnt observe — bullet remains in superposition (simultaneously hit and missed)',
            dmg: 0,
            weird: true
          };
        }
      }
    }
  },

  // All conceptual weapons
  getAll() {
    return Object.values(this.weapons);
  },

  getByName(name) {
    return Object.values(this.weapons).find(w => w.name === name);
  }
};

// ====== 4. ADAPTIVE RED-TEAM AI ======
const RED_TEAM_AI = {
  // AI that learns from player behavior in real-time
  // Not scripted — adaptive neural behavior

  behaviorMemory: {
    playerRoutes: {},       // favorite movement paths
    playerWeapons: {},     // most used weapons
    playerReactionTime: 0, // average reaction time
    playerDimensions: {},  // which dimensions player uses
    playerCoverDependency: 0, // how much they use cover
    playerFlankDirection: 'none', // preferred flanking direction
    playerAggression: 0,    // 0=defensive, 1=aggressive
    playerAdaptability: 0,  // how fast they adapt to new threats
    dimensionalExploits: [], // recorded 4D-8D exploits
    counterStrategies: {}   // generated counters
  },

  learn(playerAction) {
    const m = this.behaviorMemory;
    switch (playerAction.type) {
      case 'move':
        const route = `${Math.round(playerAction.x/10)}x${Math.round(playerAction.z/10)}`;
        m.playerRoutes[route] = (m.playerRoutes[route] || 0) + 1;
        if (playerAction.flankDir) m.playerFlankDirection = playerAction.flankDir;
        break;
      case 'shoot':
        m.playerWeapons[playerAction.weapon] = (m.playerWeapons[playerAction.weapon] || 0) + 1;
        m.playerAggression = Math.min(1, m.playerAggression + 0.02);
        break;
      case 'use_dimension':
        m.playerDimensions[playerAction.dim] = (m.playerDimensions[playerAction.dim] || 0) + 1;
        m.dimensionalExploits.push({
          dim: playerAction.dim,
          action: playerAction.action,
          time: Date.now(),
          position: { x: playerAction.x, z: playerAction.z }
        });
        break;
      case 'take_cover':
        m.playerCoverDependency = Math.min(1, m.playerCoverDependency + 0.05);
        break;
      case 'react':
        m.playerReactionTime = (m.playerReactionTime * 0.9) + (playerAction.reactionMs * 0.1);
        m.playerAdaptability = Math.min(1, m.playerAdaptability + 0.01);
        break;
    }
  },

  generateStrategy() {
    const m = this.behaviorMemory;
    const strategy = {};

    // Counter preferred routes
    const topRoute = Object.entries(m.playerRoutes).sort((a, b) => b[1] - a[1])[0];
    if (topRoute) strategy.ambush = { route: topRoute[0], msg: 'AI knows your favorite route' };

    // Counter preferred weapons
    const topWeapon = Object.entries(m.playerWeapons).sort((a, b) => b[1] - a[1])[0];
    if (topWeapon) strategy.weaponCounter = { weapon: topWeapon[0], counterWeapon: 'higher_range' };

    // Counter cover dependency
    if (m.playerCoverDependency > 0.5) {
      strategy.flush = { tactic: 'flank_through_4D', msg: 'AI will use 4D to bypass your cover' };
    }

    // Counter flanking
    if (m.playerFlankDirection === 'left') strategy.antiFlank = 'right_trap';
    if (m.playerFlankDirection === 'right') strategy.antiFlank = 'left_trap';

    // Counter aggression
    if (m.playerAggression > 0.7) strategy.response = 'bait_and_ambush';
    if (m.playerAggression < 0.3) strategy.response = 'aggressive_push';

    // Counter dimensional use
    const topDim = Object.entries(m.playerDimensions).sort((a, b) => b[1] - a[1])[0];
    if (topDim) {
      const dimName = ['space', 'space', 'space', '4D_spatial', 'time', 'quantum', 'void', 'cosmic'][parseInt(topDim[0])];
      strategy.dimCounter = { dim: dimName, counter: dimName === '4D_spatial' ? 'reality_anchor' : 'dimensional_lock' };
    }

    // Learn exploits and generate specific counters
    if (m.dimensionalExploits.length > 5) {
      strategy.exploitCounter = {
        msg: 'AI has learned your dimensional patterns',
        counter: 'predict_and_intercept',
        confidence: Math.min(1, m.dimensionalExploits.length / 20)
      };
    }

    return strategy;
  },

  // Generate a red-team squad that adapts to the player
  generateRedTeam(playerProfile, difficulty) {
    const strategy = this.generateStrategy();
    const squad = [];

    const baseCount = 4 + Math.floor(difficulty * 2);
    const archetypes = ['PREDATOR', 'SWARM', 'GHOST', 'TACTICIAN', 'BERSERKER'];

    // Assign archetypes based on learned strategy
    if (strategy.antiFlank) squad.push({ role: 'ambusher', archetype: 'PREDATOR', dim: 4, strategy: strategy.antiFlank });
    if (strategy.flush) squad.push({ role: 'flusher', archetype: 'GHOST', dim: 4, strategy: 'flush' });
    if (strategy.dimCounter) squad.push({ role: 'dimensional_hunter', archetype: 'GHOST', dim: 6, counter: strategy.dimCounter });
    if (strategy.response === 'aggressive_push') squad.push({ role: 'pusher', archetype: 'BERSERKER', dim: 0 });
    if (strategy.response === 'bait_and_ambush') squad.push({ role: 'bait', archetype: 'TACTICIAN', dim: 0 });

    while (squad.length < baseCount) {
      squad.push({ role: 'soldier', archetype: archetypes[Math.floor(Math.random() * archetypes.length)], dim: difficulty > 5 ? Math.floor(Math.random() * 4) : 0 });
    }

    return { squad, strategy, adapted: true, learningLevel: this.behaviorMemory.dimensionalExploits.length };
  },

  reset() {
    this.behaviorMemory = {
      playerRoutes: {}, playerWeapons: {}, playerReactionTime: 0,
      playerDimensions: {}, playerCoverDependency: 0, playerFlankDirection: 'none',
      playerAggression: 0, playerAdaptability: 0, dimensionalExploits: [], counterStrategies: {}
    };
  }
};

// ====== 5. PERMANENT GLOBAL LEGACY ENGINE ======
const LEGACY_ENGINE = {
  // Damage persists GLOBALLY for ALL players worldwide
  // Not just your match — everyone's map changes

  modifications: {}, // keyed by "lat,lng" zone
  globalStats: { totalMods: 0, totalCraters: 0, totalRifts: 0, totalTears: 0, activeZones: 0 },

  applyModification(zone, modification) {
    const key = `${zone.lat},${zone.lng}`;
    if (!this.modifications[key]) this.modifications[key] = { zone, mods: [] };
    this.modifications[key].mods.push({
      ...modification,
      timestamp: Date.now(),
      permanent: true,
      global: true,
      creatorId: modification.creatorId,
      creatorTag: modification.creatorTag,
      matchId: modification.matchId
    });
    this.globalStats.totalMods++;
    if (modification.type === 'crater') this.globalStats.totalCraters++;
    if (modification.type === 'dimensional_rift') this.globalStats.totalRifts++;
    if (modification.type === 'spatial_tear') this.globalStats.totalTears++;
    this.globalStats.activeZones = Object.keys(this.modifications).length;
    return { success: true, modId: key + '-' + this.modifications[key].mods.length, permanent: true };
  },

  getZoneModifications(lat, lng, radius) {
    const results = [];
    for (const [key, data] of Object.entries(this.modifications)) {
      const dist = this.haversine(lat, lng, data.zone.lat, data.zone.lng);
      if (dist <= radius) {
        results.push({ ...data, distance: dist });
      }
    }
    return results;
  },

  // Haversine distance in meters
  haversine(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  },

  // Types of permanent modifications
  modificationTypes: {
    crater: { name: 'Blast Crater', blocksMovement: false, providesCover: true, permanent: true, visualScale: 1 },
    building_collapse: { name: 'Collapsed Building', blocksMovement: true, providesCover: true, permanent: true },
    spatial_tear: { name: 'Spatial Tear', blocksMovement: false, providesCover: false, dangerous: true, desc: 'A rip in spacetime. Walking through it causes dimensional damage.', creatorTagged: true },
    dimensional_rift: { name: 'Dimensional Rift', blocksMovement: false, portal: true, connectsTo: 'random_dimension', permanent: true, desc: 'A permanent portal to another dimension.' },
    gravity_anomaly: { name: 'Gravity Anomaly', blocksMovement: false, gravityChange: true, radius: 20, permanent: true, desc: 'Gravity is 3x normal. Players move slowly.' },
    void_scar: { name: 'Void Scar', blocksMovement: true, voidDamage: true, radius: 15, permanent: true, desc: 'The VOID bleeds through. Standing here drains health.' },
    time_distortion: { name: 'Time Distortion Zone', blocksMovement: false, timeScale: 0.5, radius: 25, permanent: true, desc: 'Time moves at half speed inside this zone.' },
    quantum_fissure: { name: 'Quantum Fissure', blocksMovement: false, quantumShift: true, radius: 10, permanent: true, desc: 'Randomly shifts players between quantum states.' }
  },

  getGlobalSummary() {
    return {
      ...this.globalStats,
      topZones: Object.entries(this.modifications)
        .sort((a, b) => b[1].mods.length - a[1].mods.length)
        .slice(0, 10)
        .map(([key, data]) => ({ zone: data.zone, modCount: data.mods.length }))
    };
  }
};

// ====== 6. SKILL COOLDOWN & OWNERSHIP SYSTEM ======
const SKILL_SYSTEM = {
  // Buy a skill → own it for 60 days
  // Each match: 5-10 uses with cooldown between uses
  // Skill persists across matches during ownership period

  ownedSkills: {}, // playerId → { skillId: { purchaseDate, expiryDate, usesThisMatch, lastUseTime } }

  DURATION_DAYS: 60,
  USES_PER_MATCH: { standard: 5, premium: 10 },
  COOLDOWN_SECONDS: { low: 30, medium: 60, high: 120, ultimate: 180 },

  purchase(playerId, skillId, price) {
    if (!this.ownedSkills[playerId]) this.ownedSkills[playerId] = {};
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + this.DURATION_DAYS);

    this.ownedSkills[playerId][skillId] = {
      purchaseDate: Date.now(),
      expiryDate: expiry.getTime(),
      usesThisMatch: 0,
      lastUseTime: 0,
      totalUses: 0,
      matchesUsed: 0
    };
    return { success: true, expiresOn: expiry.toDateString(), usesPerMatch: this.USES_PER_MATCH.standard };
  },

  canUse(playerId, skillId, isPremium) {
    const owned = this.ownedSkills[playerId]?.[skillId];
    if (!owned) return { canUse: false, reason: 'Skill not owned' };
    if (Date.now() > owned.expiryDate) return { canUse: false, reason: 'Skill expired. Repurchase required.' };

    const maxUses = isPremium ? this.USES_PER_MATCH.premium : this.USES_PER_MATCH.standard;
    if (owned.usesThisMatch >= maxUses) return { canUse: false, reason: `Max ${maxUses} uses per match reached` };

    const skill = this.getSkill(skillId);
    if (!skill) return { canUse: false, reason: 'Unknown skill' };

    const cooldown = this.COOLDOWN_SECONDS[skill.cooldownTier] || 60;
    const timeSinceLastUse = (Date.now() - owned.lastUseTime) / 1000;
    if (timeSinceLastUse < cooldown) return { canUse: false, reason: `Cooldown: ${Math.ceil(cooldown - timeSinceLastUse)}s remaining` };

    return { canUse: true, usesLeft: maxUses - owned.usesThisMatch, cooldown: cooldown };
  },

  use(playerId, skillId, isPremium) {
    const check = this.canUse(playerId, skillId, isPremium);
    if (!check.canUse) return check;
    const owned = this.ownedSkills[playerId][skillId];
    owned.usesThisMatch++;
    owned.lastUseTime = Date.now();
    owned.totalUses++;
    return { success: true, usesLeft: (isPremium ? 10 : 5) - owned.usesThisMatch };
  },

  resetMatchUses(playerId) {
    if (!this.ownedSkills[playerId]) return;
    for (const skill of Object.values(this.ownedSkills[playerId])) {
      skill.usesThisMatch = 0;
    }
  },

  getOwnedSkills(playerId) {
    if (!this.ownedSkills[playerId]) return [];
    return Object.entries(this.ownedSkills[playerId]).map(([id, data]) => {
      const skill = this.getSkill(id);
      const expired = Date.now() > data.expiryDate;
      const daysLeft = Math.ceil((data.expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
      return { id, name: skill?.name || id, expires: new Date(data.expiryDate).toDateString(), daysLeft, expired, totalUses: data.totalUses };
    });
  },

  getSkill(id) {
    // Reference cheat skills from worldmap.js
    if (typeof CHEAT_SKILLS !== 'undefined') return CHEAT_SKILLS.skills[id];
    return null;
  }
};

// ====== 7. REAL-WORLD COORDINATE ZONE SYSTEM ======
const REAL_ZONE = {
  // NOT preset cities — teams define their own war zone using real lat/long
  // Example: "EKSU Road to Ilawe Road" becomes a bounded combat zone

  zones: {}, // active combat zones

  // Create a zone from two real-world coordinate points
  createZone(name, pointA, pointB, options = {}) {
    // pointA = { lat, lng, label } e.g. "EKSU Road"
    // pointB = { lat, lng, label } e.g. "Ilawe Road"
    const centerLat = (pointA.lat + pointB.lat) / 2;
    const centerLng = (pointA.lng + pointB.lng) / 2;
    const radius = this.haversine(pointA.lat, pointA.lng, pointB.lat, pointB.lng) / 2;

    const zone = {
      id: 'zone_' + Date.now(),
      name: name,
      pointA: pointA,
      pointB: pointB,
      center: { lat: centerLat, lng: centerLng },
      radius: Math.max(100, radius), // minimum 100m zone
      area: Math.PI * (radius * radius),
      bounds: {
        north: Math.max(pointA.lat, pointB.lat),
        south: Math.min(pointA.lat, pointB.lat),
        east: Math.max(pointA.lng, pointB.lng),
        west: Math.min(pointA.lng, pointB.lng)
      },
      terrain: this.detectTerrain(centerLat, centerLng),
      urbanDensity: this.estimateUrban(centerLat, centerLng),
      createdAt: Date.now(),
      createdBy: options.createdBy || 'unknown',
      winCondition: options.winCondition || 'last_team_standing',
      maxTeams: options.maxTeams || 2,
      teamSize: options.teamSize || 20,
      timeLimit: options.timeLimit || 1800, // 30 min default
      modifiers: options.modifiers || []
    };

    this.zones[zone.id] = zone;
    return zone;
  },

  // Check if a position is inside the zone
  isInZone(zoneId, lat, lng) {
    const zone = this.zones[zoneId];
    if (!zone) return false;
    const dist = this.haversine(lat, lng, zone.center.lat, zone.center.lng);
    return dist <= zone.radius;
  },

  // Detect terrain type from coordinates
  detectTerrain(lat, lng) {
    // Simplified terrain detection
    if (Math.abs(lat) < 23.5 && Math.abs(lat) > 0) return 'tropical';
    if (Math.abs(lat) > 60) return 'arctic';
    if (Math.abs(lat) > 35) return 'temperate';
    if (Math.abs(lat) > 23.5) return 'desert';
    if (Math.abs(lat) < 10) return 'equatorial';
    return 'mixed';
  },

  // Estimate urban density (simplified)
  estimateUrban(lat, lng) {
    // This would use real population density data in production
    // For now, estimate based on known urban centers
    const urbanCenters = [
      { lat: 6.5, lng: 3.4, density: 'high' },   // Lagos
      { lat: 9.1, lng: 7.5, density: 'medium' },  // Abuja
      { lat: 7.6, lng: 5.2, density: 'medium' },  // Ado-Ekiti
      { lat: 51.5, lng: -0.1, density: 'high' },  // London
      { lat: 40.7, lng: -74.0, density: 'high' }, // NYC
      { lat: 55.8, lng: 37.6, density: 'high' },  // Moscow
      { lat: 39.9, lng: 116.4, density: 'high' }, // Beijing
    ];
    let closest = { density: 'low', dist: Infinity };
    for (const city of urbanCenters) {
      const dist = this.haversine(lat, lng, city.lat, city.lng);
      if (dist < closest.dist && dist < 50000) closest = { density: city.density, dist };
    }
    return closest.density;
  },

  haversine(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  },

  // Win conditions
  winConditions: {
    last_team_standing: { name: 'Last Team Standing', desc: 'Eliminate all enemy team members', timeLimit: 1800 },
    team_member_count: { name: 'Member Count Victory', desc: 'Team with most alive members when time runs out', timeLimit: 1800 },
    headhunt: { name: 'Headhunt', desc: 'First team to eliminate the enemy squad leader wins', timeLimit: 1800 },
    territory: { name: 'Territory Control', desc: 'Hold 60% of the zone for 5 minutes', timeLimit: 1800 },
    extraction: { name: 'Extraction', desc: 'Extract your squad leader to the extraction point', timeLimit: 1200 },
    annihilation: { name: 'Total Annihilation', desc: 'No respawns. Last player alive wins.', timeLimit: 2400 },
    dimensional: { name: 'Dimensional Conquest', desc: 'Control all 3 quantum realities simultaneously', timeLimit: 1800, reqDim: 6 }
  },

  // Teams agree to terms before match
  createMatch(zoneId, teamA, teamB, terms) {
    const zone = this.zones[zoneId];
    if (!zone) return { error: 'Zone not found' };

    const match = {
      id: 'match_' + Date.now(),
      zone: zone,
      teamA: teamA,
      teamB: teamB,
      terms: {
        winCondition: terms.winCondition || 'last_team_standing',
        timeLimit: terms.timeLimit || 1800,
        respawnAllowed: terms.respawnAllowed !== false,
        banishmentAllowed: terms.banishmentAllowed !== false,
        premiumAbilities: terms.premiumAbilities !== false,
        maxBanishTime: terms.maxBanishTime || 300,
        agreedByA: terms.agreedByA || false,
        agreedByB: terms.agreedByB || false
      },
      status: 'pending',
      createdAt: Date.now()
    };
    return match;
  },

  // EKSU Road to Ilawe Road example (Ado-Ekiti, Nigeria)
  // EKSU ≈ 7.7167°N, 5.2567°E
  // Ilawe ≈ 7.6000°N, 5.1333°E
  createEkitiZone() {
    return this.createZone('EKSU to Ilawe Road', {
      lat: 7.7167, lng: 5.2567, label: 'EKSU Road, Ado-Ekiti'
    }, {
      lat: 7.6000, lng: 5.1333, label: 'Ilawe Road, Ekiti'
    }, {
      createdBy: 'Loveth',
      winCondition: 'last_team_standing',
      teamSize: 20
    });
  }
};

// ====== EXPORT ======
if (typeof module !== 'undefined') {
  module.exports = {
    QUANTUM_LINK, DISTORTION_FLARES, CONCEPTUAL_WEAPONS,
    RED_TEAM_AI, LEGACY_ENGINE, SKILL_SYSTEM, REAL_ZONE
  };
}
