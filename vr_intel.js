/**
 * OMEGA-8D VR ARCADE + FULL-SPECTRUM INTELLIGENCE ARCHITECTURE
 * 1. VR Arcade mode (Meta Quest, PSVR2, PC VR, standalone VR)
 * 2. OSINT — Open-Source Intelligence Grid
 * 3. MANSINT — Manual & Human Intelligence Networks
 * 4. WARSINT — Warfare & Sensor Telemetry Intelligence
 */

// ============================================================
// 1. VR ARCADE MODE
// ============================================================
const VR_ARCADE = {
  supportedHeadsets: {
    meta_quest_3: { name: 'Meta Quest 3', resolution: '2064x2208 per eye', refreshRate: 120, fov: 110, standalone: true, type: 'vr' },
    meta_quest_3s: { name: 'Meta Quest 3S', resolution: '1832x1920 per eye', refreshRate: 120, fov: 96, standalone: true, type: 'vr' },
    meta_quest_2: { name: 'Meta Quest 2', resolution: '1832x1920 per eye', refreshRate: 120, fov: 89, standalone: true, type: 'vr' },
    psvr2: { name: 'PlayStation VR2', resolution: '2000x2040 per eye', refreshRate: 120, fov: 110, standalone: false, type: 'vr', console: 'PS5', features: ['eye_tracking', 'headset_haptics', 'adaptive_triggers', 'hdr'] },
    valve_index: { name: 'Valve Index', resolution: '1440x1600 per eye', refreshRate: 144, fov: 130, standalone: false, type: 'vr', features: ['finger_tracking', 'off_ear_audio'] },
    pimax_8k: { name: 'Pimax 8KX', resolution: '3840x2160 per eye', refreshRate: 90, fov: 200, standalone: false, type: 'vr' },
    htc_vive_pro2: { name: 'HTC Vive Pro 2', resolution: '2448x2448 per eye', refreshRate: 120, fov: 120, standalone: false, type: 'vr' },
    apple_vision_pro: { name: 'Apple Vision Pro', resolution: '3660x3660 per eye', refreshRate: 100, fov: 100, standalone: true, type: 'mixed_reality', features: ['eye_tracking', 'hand_tracking', 'persona', 'spatial_video'] },
    bigscreen_beyond: { name: 'Bigscreen Beyond', resolution: '2560x2560 per eye', refreshRate: 90, fov: 93, standalone: false, type: 'vr' },
  },

  // VR control schemes
  controls: {
    // Standard VR controllers (Touch, Index, PSVR2 Sense)
    vr_controllers: {
      left: {
        thumbstick: 'move (teleport or smooth locomotion)',
        trigger: 'grab weapon/item',
        grip: 'hold weapon/item',
        menu_button: 'combos reference tab',
        x_or_a: 'reload',
        y_or_b: 'switch weapon',
        thumbstick_click: 'crouch/prone',
      },
      right: {
        thumbstick: 'look/turn (snap turn or smooth)',
        trigger: 'shoot',
        grip: 'aim down sights',
        menu_button: 'tactical map',
        a_or_x: 'grenade throw',
        b_or_y: 'ability primary',
        thumbstick_click: 'melee',
      },
    },

    // Hand tracking (Quest 3, Vision Pro)
    hand_tracking: {
      pinch_index: 'shoot',
      pinch_middle: 'aim',
      fist: 'grab weapon',
      palm_open: 'reload',
      swipe_left: 'prev dimension',
      swipe_right: 'next dimension',
      swipe_up: 'aria menu',
      swipe_down: 'gear menu',
      double_tap_wrist: 'combos panel',
    },

    // VR-specific mechanics
    vrMechanics: {
      physical_aiming: 'Aim weapons by physically pointing controllers. No stick aim. Real marksmanship.',
      physical_reloading: 'Physically insert magazine, pull charging handle. Manual reload in VR.',
      physical_melee: 'Punch, slash, or stab with real arm movements. Full body tracking.',
      physical_cover: 'Physically lean, crouch, or go prone behind cover. Your real body position matters.',
      physical_grenade_throw: 'Real throwing motion. Pin pull + throw. Trajectory based on your actual throw.',
      dimensional_hand_gesture: 'Dimensional shifts triggered by specific hand gestures (sign language for war)',
      voice_commands: 'Speak commands: "ARIA scan", "banish target", "seal bunker", "call airstrike"',
      eye_tracking_aim: 'PSVR2 and Vision Pro: look at target to auto-aim assist. Eye tracking for targeting.',
      head_tracking_lean: 'Lean your real head to peek around corners. Your physical head movement = in-game peek.',
    },
  },

  // VR comfort options
  comfort: {
    locomotion: ['smooth', 'teleport', 'vignette', 'blink'],
    turning: ['smooth', 'snap_30', 'snap_45', 'snap_90'],
    vignette: { enabled: true, strength: 0.5, desc: 'Reduces peripheral vision during movement to prevent motion sickness' },
    blind_mode: { desc: 'Screen goes dark during locomotion, fades in when stopped' },
    seated_mode: { desc: 'Play seated. Crouch button replaces physical crouch' },
    standing_mode: { desc: 'Play standing. Full physical movement' },
    room_scale: { desc: 'Full room-scale. Walk around your physical room to move in-game' },
  },

  // VR arcade multiplayer
  vrArcade: {
    maxPlayers: 8, // 8 players in VR arcade (local network)
    headsetsConnected: 0,
    description: 'VR arcade mode. 8 headsets in the same physical space, same server, same war. See your friends as full-body avatars. Point and shoot. Lean and peek. Throw real grenades.',
    localNetwork: true,
    lanOnly: true,
    setup: 'All 8 headsets connect to the same LAN. Zero latency. Local server. No internet required.',
    spectatorMode: 'Big screen in the arcade shows all 8 players\' POV simultaneously. Audience watches the war.',
  },

  // Detect VR headset
  detectVR() {
    if (typeof navigator === 'undefined') return { vr: false, reason: 'No navigator object' };

    if (navigator.xr && navigator.xr.isSessionSupported) {
      // WebXR available
      return { vr: true, webxr: true, message: 'WebXR detected. VR headset supported.' };
    }

    return { vr: false, webxr: false, message: 'No VR detected. VR mode will activate when a headset is connected.' };
  },

  // Enable VR mode
  enableVR(headsetType) {
    const headset = this.supportedHeadsets[headsetType];
    if (!headset) return { success: false, error: 'Unknown headset' };

    return {
      success: true,
      headset: headset.name,
      resolution: headset.resolution,
      refreshRate: headset.refreshRate + 'Hz',
      fov: headset.fov + '°',
      controls: 'VR controllers + hand tracking',
      mechanics: Object.keys(this.controls.vrMechanics).length + ' VR-specific mechanics',
      message: 'VR mode enabled. Put on your headset. The war is now in 3D. Everything you see is real-scale. Everything you touch is physical.',
    };
  },
};

// ============================================================
// 2. OSINT — OPEN-SOURCE INTELLIGENCE GRID
// ============================================================
const OSINT = {
  name: 'OSINT — Open-Source Intelligence Grid',
  description: 'Real-time scraping of public data feeds to track enemy movements before engagement',

  // Data sources
  sources: {
    social_media: {
      name: 'Civilian Social Media',
      desc: 'Scrapes posts, photos, and videos from civilian NPCs. An operator carrying a heavy weapon was photographed by a civilian and posted online 2 minutes ago.',
      updateRate: 5, // seconds
      intelTypes: ['weapon_photos', 'position_photos', 'squad_sightings', 'vehicle_sightings', 'unusual_activity'],
      accuracy: 0.6, // 60% accurate
    },

    transit_logs: {
      name: 'Municipal Transit Logs',
      desc: 'Tracks bus, train, and metro logs. A squad of 4 boarded the EKSU Road bus at 14:32. GPS shows them heading toward the city center.',
      updateRate: 10,
      intelTypes: ['movement_patterns', 'transit_usage', 'route_prediction'],
      accuracy: 0.8,
    },

    traffic_cameras: {
      name: 'Traffic & CCTV Cameras',
      desc: 'Accesses public traffic cameras. Real-time visual intelligence. A black SUV with tinted windows just turned onto the target street.',
      updateRate: 2,
      intelTypes: ['vehicle_identification', 'personnel_count', 'weapon_visible', 'direction_of_travel'],
      accuracy: 0.9,
    },

    smart_device_traffic: {
      name: 'Smart Device Network Traffic',
      desc: 'Monitors WiFi, Bluetooth, and cellular data spikes. A cluster of 5 devices with military encryption just appeared in a residential area.',
      updateRate: 3,
      intelTypes: ['device_count', 'encryption_type', 'location_cluster', 'communication_frequency'],
      accuracy: 0.75,
    },

    power_grid: {
      name: 'Power Grid Monitoring',
      desc: 'Tracks power consumption anomalies. A building in the target zone is drawing 3x normal power — likely a command center or server farm.',
      updateRate: 15,
      intelTypes: ['power_anomaly', 'location_estimate', 'activity_level'],
      accuracy: 0.7,
    },

    weather_feeds: {
      name: 'Meteorological Feeds',
      desc: 'Real-time weather data. A storm front is moving in from the north in 15 minutes. Visibility will drop to 50m. Plan accordingly.',
      updateRate: 30,
      intelTypes: ['weather_forecast', 'visibility_prediction', 'wind_direction', 'temperature'],
      accuracy: 0.95,
    },

    news_feeds: {
      name: 'Local News Broadcasts',
      desc: 'Scrapes local news. "Reports of gunfire near the government building. Police are responding." The enemy is already engaging. You are 5 minutes late.',
      updateRate: 20,
      intelTypes: ['combat_reports', 'civilian_reports', 'official_statements', 'casualty_reports'],
      accuracy: 0.65,
    },
  },

  // Harvest intelligence
  harvest(zoneId, zoneData) {
    const intel = [];
    for (const [sourceId, source] of Object.entries(this.sources)) {
      // Generate random intel from each source
      if (Math.random() < source.accuracy) {
        const intelTypes = source.intelTypes;
        const type = intelTypes[Math.floor(Math.random() * intelTypes.length)];

        intel.push({
          source: source.name,
          sourceId: sourceId,
          type: type,
          zone: zoneId,
          accuracy: source.accuracy,
          timestamp: new Date().toISOString(),
          data: this._generateIntelData(type, source, zoneData),
          reliability: this._calculateReliability(source.accuracy),
        });
      }
    }

    return {
      zone: zoneId,
      intelCount: intel.length,
      intel: intel,
      summary: this._generateSummary(intel),
    };
  },

  _generateIntelData(type, source, zoneData) {
    const data = {};
    switch (type) {
      case 'weapon_photos':
        data.desc = 'Civilian posted photo of operator carrying heavy weapon near ' + (zoneData?.zoneName || 'unknown zone');
        data.position = { x: Math.random() * 1000, z: Math.random() * 1000 };
        data.weaponType = ['assault_rifle', 'sniper_rifle', 'lmg', 'rocket_launcher'][Math.floor(Math.random() * 4)];
        data.photoQuality = source.accuracy > 0.8 ? 'high' : 'low';
        break;
      case 'vehicle_sightings':
        data.desc = 'Vehicle spotted: ' + ['black SUV', 'white van', 'military truck', 'motorcycle'][Math.floor(Math.random() * 4)];
        data.position = { x: Math.random() * 1000, z: Math.random() * 1000 };
        data.direction = ['north', 'south', 'east', 'west'][Math.floor(Math.random() * 4)];
        data.occupants = Math.floor(Math.random() * 6) + 1;
        break;
      case 'movement_patterns':
        data.desc = 'Transit logs show unusual movement pattern';
        data.affectedRoutes = Math.floor(Math.random() * 5) + 1;
        data.anomalyScore = Math.random();
        break;
      case 'device_count':
        data.desc = Math.floor(Math.random() * 10) + 2 + ' military-encrypted devices detected in cluster';
        data.position = { x: Math.random() * 1000, z: Math.random() * 1000 };
        data.encryptionLevel = ['standard', 'military', 'quantum'][Math.floor(Math.random() * 3)];
        break;
      case 'power_anomaly':
        data.desc = 'Building drawing ' + (Math.random() * 4 + 2).toFixed(1) + 'x normal power';
        data.position = { x: Math.random() * 1000, z: Math.random() * 1000 };
        data.possibleCommandCenter = true;
        break;
      case 'combat_reports':
        data.desc = 'Local news reports: "' + ['gunfire near city center', 'explosions in residential area', 'military vehicles seen', 'helicopter activity'][Math.floor(Math.random() * 4)] + '"';
        data.delayMinutes = Math.floor(Math.random() * 10) + 1;
        break;
      case 'weather_forecast':
        data.desc = 'Weather: ' + ['clear', 'rain incoming', 'fog', 'storm front'][Math.floor(Math.random() * 4)];
        data.visibilityForecast = Math.floor(Math.random() * 500) + 50;
        data.minutesUntilChange = Math.floor(Math.random() * 30) + 5;
        break;
      default:
        data.desc = 'Anomalous data spike detected';
    }
    return data;
  },

  _calculateReliability(accuracy) {
    if (accuracy > 0.85) return 'HIGH';
    if (accuracy > 0.7) return 'MEDIUM';
    return 'LOW';
  },

  _generateSummary(intel) {
    if (intel.length === 0) return 'No OSINT data available for this zone.';
    const highRel = intel.filter(i => i.reliability === 'HIGH').length;
    const threats = intel.filter(i => i.type.includes('weapon') || i.type.includes('vehicle') || i.type.includes('combat')).length;
    return highRel + ' high-reliability sources. ' + threats + ' potential threat indicators. OSINT active.';
  },

  // Digital footprint tracking
  trackFootprints(zoneId) {
    return {
      zone: zoneId,
      anomalies: [
        { type: 'unencrypted_radio', desc: 'Unencrypted radio chatter detected on frequency 147.825 MHz', position: { x: 450, z: 320 }, age: '2 min ago' },
        { type: 'data_spike', desc: 'Cellular data spike in residential sector — possible squad coordination', position: { x: 120, z: 680 }, age: '5 min ago' },
        { type: 'blackout_indicator', desc: 'Regional internet outage — possible cable severing or EMP', position: { x: 800, z: 200 }, age: '8 min ago' },
        { type: 'encrypted_burst', desc: 'Encrypted data burst from building — likely military communication', position: { x: 340, z: 550 }, age: '1 min ago' },
      ],
      description: 'Digital footprint tracking active. 4 anomalies detected. Cross-reference with OSINT sources for full picture.',
    };
  },
};

// ============================================================
// 3. MANSINT — MANUAL & HUMAN INTELLIGENCE NETWORKS
// ============================================================
const MANSINT = {
  name: 'MANSINT — Manual & Human Intelligence Networks',
  description: 'Leveraging the civilian population as organic spotters and running human intelligence operations',

  // Civilian informant network
  civilianNetwork: {
    // Civilian types and their intelligence value
    informantTypes: {
      loyal_citizen: {
        desc: 'Loves their country. Will report any suspicious activity to authorities immediately.',
        reportSpeed: 10, // seconds to report
        reportTarget: 'military',
        intelAccuracy: 0.9,
        bribeable: false,
        count: 500, // per zone
      },
      fearful_civilian: {
        desc: 'Will report if frightened or threatened. Can be intimidated into silence.',
        reportSpeed: 30,
        reportTarget: 'police',
        intelAccuracy: 0.6,
        bribeable: true,
        bribeCost: 50,
        count: 300,
      },
      opportunist: {
        desc: 'Will sell information to the highest bidder. Can be an asset OR a threat.',
        reportSpeed: 60,
        reportTarget: 'highest_bidder',
        intelAccuracy: 0.75,
        bribeable: true,
        bribeCost: 200,
        sellToEnemy: true, // will sell YOUR position to the enemy
        count: 100,
      },
      patriot_militia: {
        desc: 'Armed civilian militia member. Will not just report — will engage.',
        reportSpeed: 5,
        reportTarget: 'all_militia',
        intelAccuracy: 0.85,
        bribeable: false,
        armed: true,
        engagementRange: 100,
        count: 50,
      },
      journalist: {
        desc: 'Will film and broadcast your operation. 10 seconds to disable before it goes viral.',
        reportSpeed: 10,
        reportTarget: 'social_media',
        intelAccuracy: 0.95,
        bribeable: false,
        viralRisk: true,
        viralTimer: 10,
        count: 20,
      },
      black_market_dealer: {
        desc: 'Operates the underground intel market. Sells positions, routes, and squad compositions.',
        reportSpeed: 0, // doesn't report — sells
        reportTarget: 'black_market',
        intelAccuracy: 0.8,
        bribeable: true,
        bribeCost: 500,
        sells: ['enemy_positions', 'squad_routes', 'weapon_loadouts', 'bunker_locations', 'supply_drops'],
        count: 10,
      },
      shepherd: {
        desc: 'Rural shepherd who knows every path, trail, and shortcut. Silent observer. Reports only to militia.',
        reportSpeed: 120,
        reportTarget: 'militia_silent',
        intelAccuracy: 0.7,
        bribeable: false,
        knowsTerrain: true,
        count: 30,
      },
    },

    // Total civilian intelligence per zone
    getZoneIntel(zoneId) {
      const total = Object.values(this.informantTypes).reduce((s, t) => s + t.count, 0);
      return {
        zone: zoneId,
        totalCivilians: total,
        informants: Object.keys(this.informantTypes).length + ' types',
        description: total + ' civilians in this zone act as an organic intelligence network. ' + this.informantTypes.patriot_militia.count + ' are armed militia. ' + this.informantTypes.journalist.count + ' are journalists who can viral your operation. ' + this.informantTypes.black_market_dealer.count + ' black market dealers are selling intel to the highest bidder.',
      };
    },
  },

  // Asset recruitment system
  assetRecruitment: {
    // Recruit a civilian as a spy asset
    recruit(assetType, target, payment) {
      const types = MANSINT.civilianNetwork.informantTypes;
      if (!types[assetType]) return { success: false, error: 'Unknown asset type' };

      const asset = types[assetType];
      if (!asset.bribeable) {
        return { success: false, error: asset.desc + ' Cannot be recruited. They are loyal.' };
      }

      if (payment < asset.bribeCost) {
        return { success: false, error: 'Insufficient payment. Need ' + asset.bribeCost + ' coins. Offered: ' + payment };
      }

      return {
        success: true,
        assetType: assetType,
        payment: payment,
        intel: 'Asset recruited. They will provide intelligence for 30 minutes.',
        duration: 1800,
        abilities: ['report_enemy_positions', 'report_enemy_routes', 'warn_of_approaching_enemies'],
        doubleAgentRisk: asset.sellToEnemy ? 0.3 : 0, // opportunist might sell to BOTH sides
        warning: asset.sellToEnemy ? 'WARNING: This asset type may sell your position to the enemy as well. Trust at your own risk.' : null,
      };
    },

    // Interrogate a captured enemy
    interrogate(capturedEnemy, method) {
      const methods = {
        standard: { successRate: 0.4, time: 60, desc: 'Standard interrogation. 40% chance of usable intel.' },
        enhanced: { successRate: 0.7, time: 30, desc: 'Enhanced techniques. 70% success rate. But reputation -10.' },
        aria_assisted: { successRate: 0.95, time: 10, desc: 'ARIA neural scan extracts intel from brain patterns. 95% success. Requires ARIA.' },
        bribery: { successRate: 0.6, cost: 300, time: 15, desc: 'Offer freedom and payment. 60% success. No reputation loss.' },
      };

      const m = methods[method];
      if (!m) return { success: false, error: 'Unknown interrogation method' };

      if (Math.random() < m.successRate) {
        return {
          success: true,
          method: method,
          time: m.time + 's',
          intel: {
            enemyPositions: Math.floor(Math.random() * 5) + 1,
            enemyRoutes: Math.floor(Math.random() * 3) + 1,
            enemyWeapons: ['assault_rifle', 'sniper_rifle', 'lmg'][Math.floor(Math.random() * 3)],
            enemyPlans: Math.random() < 0.3 ? 'FULL OPERATION PLAN EXTRACTED' : 'Partial intel only',
            bunkerLocation: Math.random() < 0.2,
          },
          reputationChange: method === 'enhanced' ? -10 : 0,
        };
      }

      return { success: false, method: method, intel: 'Subject resisted interrogation. No intel extracted.', reputationChange: method === 'enhanced' ? -10 : 0 };
    },
  },

  // Intel black market
  blackMarket: {
    // What's for sale on the underground intel market
    listings: [
      { item: 'Enemy squad position (real-time)', price: 500, seller: 'opportunist', expires: 300 },
      { item: 'Enemy bunker location', price: 1000, seller: 'black_market_dealer', expires: 600 },
      { item: 'Enemy weapon loadouts', price: 300, seller: 'black_market_dealer', expires: 600 },
      { item: 'Enemy squad route (predicted)', price: 400, seller: 'shepherd', expires: 1200 },
      { item: 'Supply drop location', price: 800, seller: 'black_market_dealer', expires: 300 },
      { item: 'Your squad position (being sold by your informant)', price: 600, seller: 'double_agent', expires: 60, warning: 'SOMEONE IS SELLING YOUR POSITION' },
      { item: 'M.A.D. bunker code', price: 5000, seller: 'black_market_dealer', expires: 9999 },
      { item: 'Enemy commander authorization codes', price: 3000, seller: 'opportunist', expires: 600 },
    ],

    browse(playerCoins) {
      return {
        affordable: this.listings.filter(l => l.price <= playerCoins),
        all: this.listings,
        warning: this.listings.find(l => l.warning) ? '⚠️ WARNING: Someone is selling your squad position on the black market right now.' : null,
      };
    },

    purchase(itemIndex, playerCoins) {
      const item = this.listings[itemIndex];
      if (!item) return { success: false, error: 'Item not found' };
      if (playerCoins < item.price) return { success: false, error: 'Insufficient coins' };

      return {
        success: true,
        purchased: item.item,
        price: item.price,
        intel: item.warning ? 'You bought the intel about your own position. Now you know who the double agent is.' : 'Intel purchased. Added to your tactical HUD.',
        warning: item.warning || null,
      };
    },
  },
};

// ============================================================
// 4. WARSINT — WARFARE & SENSOR TELEMETRY INTELLIGENCE
// ============================================================
const WARSINT = {
  name: 'WARSINT — Warfare & Sensor Telemetry Intelligence',
  description: 'Live sensor data from submarines, satellites, and quantum-entangled squad feeds',

  // Sub-surface telemetry
  subsurfaceTelemetry: {
    // Live sonar feeds from submarines
    sonarFeeds: {
      passive: {
        desc: 'Passive sonar listens for enemy submarines and surface vessels without revealing own position',
        detects: ['submarine_signatures', 'surface_vessel_engines', 'torpedo_launches', 'sonar_pings_from_enemy'],
        range: 20000, // meters
        stealth: true, // does not reveal own position
        updateRate: 1, // Hz
        data: ['bearing', 'range_estimate', 'classification', 'confidence', 'velocity_estimate'],
      },
      active: {
        desc: 'Active sonar pings reveal everything but also reveals your position to all submarines in range',
        detects: ['exact_positions', 'submarine_type', 'torpedo_tubes_status', 'countermeasures'],
        range: 30000,
        stealth: false, // reveals own position
        updateRate: 0.5,
        data: ['precise_position', 'submarine_class', 'heading', 'speed', 'depth', 'weapon_status', 'crew_count_estimate'],
      },
      towed_array: {
        desc: 'Towed sonar array deployed behind submarine for extreme-range detection',
        detects: ['distant_submarines', 'surface_fleets', 'coastal_installations'],
        range: 100000, // 100km
        stealth: true,
        updateRate: 0.2,
        data: ['bearing', 'range_estimate', 'classification', 'signal_strength'],
      },
    },

    // Acoustic decoy tracking
    decoyTracking: {
      desc: 'Tracks enemy acoustic decoys and countermeasures',
      tracks: ['acoustic_decoys', 'bubble_screen', 'noise_generators', 'torpedo_decoys'],
      identifyReal: 0.7, // 70% chance to distinguish real submarine from decoy
      updateRate: 2,
    },

    // Get live submarine telemetry
    getSubmarineTelemetry(subId, sonarMode) {
      const feed = this.sonarFeeds[sonarMode];
      if (!feed) return { error: 'Unknown sonar mode' };

      return {
        subId: subId,
        sonarMode: sonarMode,
        range: feed.range + 'm',
        stealth: feed.stealth,
        detects: feed.detects,
        contacts: [
          { contactId: 'C-001', type: 'submarine', bearing: 45, range: 8000, classification: 'SSN', confidence: 0.8 },
          { contactId: 'C-002', type: 'surface_vessel', bearing: 180, range: 15000, classification: 'destroyer', confidence: 0.9 },
          { contactId: 'C-003', type: 'torpedo', bearing: 270, range: 3000, classification: 'wire_guided', confidence: 0.95, threat: 'INCOMING' },
        ],
        decoys: [
          { type: 'acoustic_decoy', bearing: 90, range: 5000, likelyDecoy: true },
        ],
        timestamp: new Date().toISOString(),
      };
    },
  },

  // Orbital telemetry
  orbitalTelemetry: {
    // Low-earth orbit satellite feeds
    satelliteFeeds: {
      recon_satellite: {
        desc: 'Reconnaissance satellite provides real-time overhead imagery',
        provides: ['enemy_positions', 'vehicle_count', 'heat_signatures', 'building_status', 'troop_movements'],
        resolution: 0.3, // 30cm resolution
        updateRate: 10, // seconds
        coverage: 'entire_zone',
        stealth: true, // enemy doesn't know they are being watched from orbit
      },
      signals_intel: {
        desc: 'Signals intelligence satellite intercepts enemy communications',
        provides: ['radio_intercepts', 'encrypted_bursts', 'communication_patterns', 'command_structure'],
        updateRate: 5,
        coverage: 'entire_zone',
        decryptionTime: 30, // 30s to decrypt intercepted comms
      },
      early_warning: {
        desc: 'Early warning satellite detects missile launches and aircraft',
        provides: ['missile_launch_detection', 'aircraft_tracking', 'launch_point_estimation', 'impact_prediction'],
        updateRate: 1, // real-time
        coverage: 'global',
        warningTime: 45, // 45s warning before ICBM impact
      },
      thermal_imaging: {
        desc: 'Thermal imaging satellite sees through walls',
        provides: ['heat_signatures', 'personnel_count', 'weapon_heat', 'vehicle_engines'],
        updateRate: 5,
        coverage: 'entire_zone',
        resolution: 1.0,
      },
    },

    // Get orbital intel
    getOrbitalIntel(satelliteType, zoneId) {
      const sat = this.satelliteFeeds[satelliteType];
      if (!sat) return { error: 'Unknown satellite type' };

      return {
        satellite: sat.desc,
        zone: zoneId,
        provides: sat.provides,
        data: sat.provides.map(p => ({
          type: p,
          detected: true,
          positions: [
            { x: Math.random() * 1000, z: Math.random() * 1000, confidence: Math.random() * 0.4 + 0.6 },
            { x: Math.random() * 1000, z: Math.random() * 1000, confidence: Math.random() * 0.4 + 0.6 },
          ],
        })),
        updateIn: sat.updateRate + 's',
        timestamp: new Date().toISOString(),
      };
    },
  },

  // Quantum-entangled squad feeds
  quantumSquadFeeds: {
    name: 'Quantum-Entangled Squad Feed',
    description: 'Zero-latency visual and biometric sharing across the squad. Every squad member sees what every other member sees, in real-time, with zero lag.',
    features: {
      shared_vision: 'Every squad member can toggle to see through any teammate\'s eyes. Zero latency. Quantum entanglement means no network delay — instant.',
      shared_biometrics: 'All squad members see each other\'s health, ammo, ability cooldowns, and stress levels in real-time.',
      shared_threat_assessment: 'When one squad member identifies a threat, all members instantly see it on their HUD. No communication needed.',
      shared_sensor_data: 'One member\'s sonar, thermal, or dimensional scan is shared with all members instantly.',
      synchronized_reactions: 'Reaction time data shared — if one member reacts to a threat, the system pre-aims all other members toward the same threat.',
      dimensional_sync: 'If one member shifts dimensions, all members can see their dimensional state and follow through the same fold.',
      casualty_alert: 'If a member dies, all members instantly know the position, cause, and direction of the kill.',
      quantum_state_sync: 'Squad quantum states are entangled — abilities and shields can be shared across members at quantum speed.',
    },
    // Feed types
    feeds: {
      vision: { name: 'Shared Vision', latency: 0, desc: 'See through any teammate\'s eyes instantly' },
      biometrics: { name: 'Biometric Sync', latency: 0, desc: 'Health, ammo, cooldowns, stress levels shared' },
      threats: { name: 'Threat Sync', latency: 0, desc: 'Identified threats shared to all HUDs instantly' },
      sensors: { name: 'Sensor Sharing', latency: 0, desc: 'Sonar, thermal, dimensional scans shared' },
      reactions: { name: 'Reaction Sync', latency: 0, desc: 'Pre-aim squad toward identified threats' },
      dimensional: { name: 'Dimensional Sync', latency: 0, desc: 'Track all members\' dimensional states' },
      casualty: { name: 'Casualty Alert', latency: 0, desc: 'Instant kill notification with position and direction' },
    },
    // Get squad feed status
    getSquadFeed(squadId) {
      return {
        squadId: squadId,
        feedsActive: Object.keys(this.feeds).length,
        latency: 0, // quantum = zero latency
        members: 4,
        feedTypes: Object.values(this.feeds),
        description: 'Quantum-entangled squad feed active. Zero latency. Every member sees everything. Every member knows everything. You are one organism.',
      };
    },
  },

  // Full WARSINT report
  getFullReport(zoneId, subId) {
    return {
      zone: zoneId,
      timestamp: new Date().toISOString(),
      subsurface: this.subsurfaceTelemetry.getSubmarineTelemetry(subId || 'SUB-001', 'passive'),
      orbital: this.orbitalTelemetry.getOrbitalIntel('recon_satellite', zoneId),
      squadFeed: this.quantumSquadFeeds.getSquadFeed('SQUAD-001'),
      earlyWarning: this.orbitalTelemetry.satelliteFeeds.early_warning.desc + ' — monitoring for missile launches globally',
      summary: 'WARSINT fully operational. Sub-surface sonar feeds active. Orbital reconnaissance live. Quantum squad feeds at zero latency. All intelligence layers synchronized.',
    };
  },
};

// ============================================================
// 5. UNIFIED INTELLIGENCE ARCHITECTURE
// ============================================================
const INTEL_FUSION = {
  name: 'INTEL FUSION — Unified Intelligence Picture',
  description: 'Combines OSINT, MANSINT, and WARSINT into a single unified intelligence picture for the commander',

  // Generate full intelligence picture
  generatePicture(zoneId, zoneData, subId) {
    const osint = OSINT.harvest(zoneId, zoneData);
    const mansint = MANSINT.civilianNetwork.getZoneIntel(zoneId);
    const warsint = WARSINT.getFullReport(zoneId, subId);
    const footprints = OSINT.trackFootprints(zoneId);
    const blackMarket = MANSINT.blackMarket.browse(1000);

    return {
      zone: zoneId,
      timestamp: new Date().toISOString(),
      layers: {
        OSINT: { sources: osint.intelCount, summary: osint.summary, footprints: footprints.anomalies.length },
        MANSINT: { civilians: mansint.totalCivilians, informants: mansint.informants, blackMarket: blackMarket.all.length + ' listings' },
        WARSINT: { sonar: warsint.subsurface.sonarMode, orbital: 'active', squadFeeds: 'zero-latency', earlyWarning: 'global' },
      },
      unifiedPicture: {
        threatLevel: this._calculateThreat(osint, mansint, warsint),
        enemyEstimate: this._estimateEnemy(osint, warsint),
        recommendations: this._generateRecommendations(osint, mansint, warsint),
        confidence: this._calculateConfidence(osint, warsint),
      },
      desc: 'Full-spectrum intelligence active. OSINT (open sources), MANSINT (human networks), and WARSINT (sensor telemetry) are fused into a unified picture. The commander sees everything.',
    };
  },

  _calculateThreat(osint, mansint, warsint) {
    const threats = osint.intel.filter(i => i.type.includes('weapon') || i.type.includes('vehicle') || i.type.includes('combat')).length;
    if (threats > 5) return 'CRITICAL';
    if (threats > 2) return 'HIGH';
    if (threats > 0) return 'MEDIUM';
    return 'LOW';
  },

  _estimateEnemy(osint, warsint) {
    const personnel = osint.intel.filter(i => i.type.includes('device') || i.type.includes('weapon')).length * 2;
    const vehicles = osint.intel.filter(i => i.type.includes('vehicle')).length;
    return { personnel: personnel, vehicles: vehicles, submarines: warsint.subsurface.contacts ? warsint.subsurface.contacts.filter(c => c.type === 'submarine').length : 0 };
  },

  _generateRecommendations(osint, mansint, warsint) {
    const recs = [];
    if (osint.summary.includes('threat')) recs.push('OSINT indicates enemy activity. Recommend increased surveillance.');
    if (mansint.totalCivilians > 900) recs.push('High civilian density. Maintain stealth to avoid spotter network activation.');
    if (warsint.subsurface.contacts) recs.push('Submarine contacts detected. Recommend passive sonar only to maintain stealth.');
    recs.push('Quantum squad feeds at zero latency. All members synchronized.');
    return recs;
  },

  _calculateConfidence(osint, warsint) {
    const osintConf = osint.intel.reduce((s, i) => s + i.accuracy, 0) / Math.max(osint.intel.length, 1);
    const warsintConf = 0.9; // sensor data is highly reliable
    return Math.round((osintConf + warsintConf) / 2 * 100) + '%';
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VR_ARCADE, OSINT, MANSINT, WARSINT, INTEL_FUSION };
}
if (typeof window !== 'undefined') {
  window.VR_ARCADE = VR_ARCADE;
  window.OSINT = OSINT;
  window.MANSINT = MANSINT;
  window.WARSINT = WARSINT;
  window.INTEL_FUSION = INTEL_FUSION;
}
