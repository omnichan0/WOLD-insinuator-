// ====== OMEGA-8D: SOVEREIGN PROTOCOLS & NEURAL TELEMETRY ======

// ====== 1. SOVEREIGN NATIONAL PROTOCOLS ======
// Every country has a unique protocol with its own rules, hazards, AI, and security

const NATIONAL_PROTOCOLS = {
  // Each protocol: name, rules, environmental hazards, AI defense, dimensional security, escalation
  NGA: { // Nigeria
    name: 'PROTOCOL: AJAGUN',
    country: 'Nigeria', region: 'Africa',
    rules: 'Urban warfare in dense markets. Civilian NPCs create cover confusion. Cash economy trading.',
    hazards: ['market_stalls_collapsible','flooded_streets_slow_movement','power_outages_dark_zones','traffic_blockades'],
    aiDefense: 'Nigerian Army Tactical AI — specializes in urban ambush and checkpoint defense',
    aiArchetypes: ['TACTICIAN','BERSERKER'],
    dimSecurity: '4D checkpoints — guards phase-check the W-axis at borders',
    escalation: ['polian_response','military_checkpoint','special_forces','airspace_lockdown'],
    unique: 'Market trading system — buy intel from NPCs using Chrono Coins',
    color: 0x008800
  },
  USA: {
    name: 'PROTOCOL: EAGLE',
    country: 'United States', region: 'Americas',
    rules: 'High-tech defense grid. Drone surveillance. GPS jamming in secure zones.',
    hazards: ['drone_patrols','automated_turrets','gps_blackout_zones','motion_sensors','laser_tripwires'],
    aiDefense: 'US Defense Advanced AI — predicts movement patterns using ML, deploys autonomous drones',
    aiArchetypes: ['TACTICIAN','GHOST'],
    dimSecurity: 'Reality anchors at military bases — 4D-8D blocked within 200m of federal buildings',
    escalation: ['police_response','swat_team','national_guard','military_lockdown','orbital_strike'],
    unique: 'Drone swarm patrol — 5 autonomous drones scan the zone every 30s',
    color: 0x000088
  },
  RUS: {
    name: 'PROTOCOL: MEDVED',
    country: 'Russia', region: 'Europe/Asia',
    rules: 'Cold weather ops. Electronic warfare. Heavy armor preference.',
    hazards: ['extreme_cold_health_drain','electronic_warfare_jamming','tank_patrols','mine_fields','snowstorm_visibility'],
    aiDefense: 'Russian Tactical AI — aggressive, uses overwhelming force, heavy armor columns',
    aiArchetypes: ['BERSERKER','SWARM'],
    dimSecurity: 'Tesla coils at military zones — dimensional travelers take electric damage',
    escalation: ['police_response','spetsnaz','military_convoy','airspace_lockdown','tactical_nuke'],
    unique: 'Winter storm — visibility drops to 10m every 60s for 15s',
    color: 0x880000
  },
  CHN: {
    name: 'PROTOCOL: LONG',
    country: 'China', region: 'Asia',
    rules: 'Electronic warfare heavy. Surveillance state. AI counter-intelligence.',
    hazards: ['mass_surveillance_cameras','facial_recognition_alerts','electronic_jamming','drone_swarm_patrol','great_firewall_data_lock'],
    aiDefense: 'PLA Cyber-Warfare AI — hacks squad comms, feeds false intel, uses electronic countermeasures',
    aiArchetypes: ['GHOST','TACTICIAN'],
    dimSecurity: 'Quantum firewall — 6D quantum shifts are detected and traced within China borders',
    escalation: ['police_response','armed_police','military_response','cyber_lockdown','orbital_strike'],
    unique: 'Facial recognition — staying visible for 10s triggers a national alert',
    color: 0x880088
  },
  JPN: {
    name: 'PROTOCOL: KAMIKAZE',
    country: 'Japan', region: 'Asia',
    rules: 'Dense urban verticality. Tech-enhanced defense. Earthquake zones.',
    hazards: ['earthquake_zones_random','vertical_combat_skyscrapers','mech_sentry_units','electromagnetic_barriers'],
    aiDefense: 'JDSF AI — uses mech units, vertical flanking, precision electronics',
    aiArchetypes: ['GHOST','TACTICIAN'],
    dimSecurity: 'Hyper-dimensional sensor array — detects all dimensional shifts within 500m',
    escalation: ['police_response','special_assault_team','military_response','mech_deployment','orbital_strike'],
    unique: 'Skyscraper vertical combat — 50+ floor buildings with vertical zones',
    color: 0xFF0000
  },
  PRK: {
    name: 'PROTOCOL: JUCHE',
    country: 'North Korea', region: 'Asia',
    rules: 'Underground bunker network. EMP towers. No electronic reliance.',
    hazards: ['emp_pulses_disable_weapons','underground_tunnels','artillery_barrages','propaganda_loudspeakers_disorient'],
    aiDefense: 'KPA AI — relentless, no retreat, uses human wave tactics + EMP warfare',
    aiArchetypes: ['SWARM','BERSERKER'],
    dimSecurity: 'Total dimensional blackout — EMP field blocks ALL 4D-8D abilities in entire zone',
    escalation: ['border_guards','military_response','artillery_strike','nuclear_threat'],
    unique: 'EMP towers — all electronic/energy weapons disabled every 60s for 10s',
    color: 0x444444
  },
  ISR: {
    name: 'PROTOCOL: IRON',
    country: 'Israel', region: 'Middle East',
    rules: 'Iron Dome intercepts all rockets. Urban density. Intel-heavy warfare.',
    hazards: ['iron_dome_intercepts_rockets','underground_tunnel_network','checkpoint_dna_scanners','mossad_counterintel'],
    aiDefense: 'IDF Tactical AI — Mossad-level counterintelligence, predicts squad movements, uses precision strikes',
    aiArchetypes: ['TACTICIAN','PREDATOR'],
    dimSecurity: 'Dimensional radar — detects 6D-8D activity and traces it to source player',
    escalation: ['police_response','idf_response','iron_dome_active','airspace_lockdown','precision_strike'],
    unique: 'Iron Dome — ALL rockets/missiles are intercepted. Must use energy weapons.',
    color: 0x0088FF
  },
  GBR: {
    name: 'PROTOCOL: LION',
    country: 'United Kingdom', region: 'Europe',
    rules: 'CCTV everywhere. SAS operations. Rain reduces visibility.',
    hazards: ['cctv_tracking','rain_visibility_reduction','surgical_air_strikes','underground_tube_combat'],
    aiDefense: 'SAS AI — stealth-focused, uses darkness and rain, silent eliminations',
    aiArchetypes: ['PREDATOR','GHOST'],
    dimSecurity: 'MI6 dimensional surveillance — 4D shifts logged and analyzed for patterns',
    escalation: ['police_response','armed_response','sas_deployment','military_lockdown','airspace_lockdown'],
    unique: 'London Underground — tube tunnels create 3D underground combat',
    color: 0x2222AA
  },
  FRA: {
    name: 'PROTOCOL: BASTILLE',
    country: 'France', region: 'Europe',
    rules: 'Urban barricades. Foreign Legion elite units. Riot control warfare.',
    hazards: ['barricade_networks','riot_gas_zones','sewer_combat_tunnels','cultural_landmarks_protected'],
    aiDefense: 'French Foreign Legion AI — adaptive, uses barricade warfare, gas attacks',
    aiArchetypes: ['TACTICIAN','BERSERKER'],
    dimSecurity: 'Paris dimensional grid — Eiffel Tower zone blocks all 7D-8D abilities',
    escalation: ['police_response','gendarmerie','foreign_legion','military_lockdown','airstrike'],
    unique: 'Sewer network — underground combat with limited visibility',
    color: 0x4444FF
  },
  DEU: {
    name: 'PROTOCOL: EISEN',
    country: 'Germany', region: 'Europe',
    rules: 'Engineering perfection. Tank divisions. Autobahn fast-deployment.',
    hazards: ['tank_patrols','autobahn_fast_zones','bunker_networks','industrial_hazards'],
    aiDefense: 'Bundeswehr AI — methodical, uses engineering cover, tank columns',
    aiArchetypes: ['TACTICIAN','BERSERKER'],
    dimSecurity: 'German engineering — dimensional locks are 2x stronger and last 2x longer',
    escalation: ['police_response','military_police','panzer_division','airspace_lockdown','military_lockdown'],
    unique: 'Tank columns — 3 tanks patrol the zone, each requiring heavy weapons to destroy',
    color: 0x888888
  },
  UKR: {
    name: 'PROTOCOL: STEPPE',
    country: 'Ukraine', region: 'Europe',
    rules: 'Trench warfare. Drone dominance. Active artillery exchanges.',
    hazards: ['trench_networks','drone_swarm_attacks','artillery_barrages_random','mine_fields_extensive'],
    aiDefense: 'Ukrainian Tactical AI — drone warfare specialist, uses trench networks for ambush',
    aiArchetypes: ['GHOST','SWARM'],
    dimSecurity: 'Electronic warfare — 4D shifts cause 3s dimensional static (you are visible to all)',
    escalation: ['territorial_defense','military_response','drone_swarm_deploy','artillery_barrage','airspace_lockdown'],
    unique: 'Both sides have drones — 5 enemy drones AND 5 friendly drones patrol simultaneously',
    color: 0x00AA44
  },
  IRN: {
    name: 'PROTOCOL: PERSIAN',
    country: 'Iran', region: 'Middle East',
    rules: 'Desert warfare. Drone swarms. Missile bases.',
    hazards: ['desert_heat_health_drain','drone_swarm_patrols','missile_base_barrages','mountain_tunnels'],
    aiDefense: 'IRGC AI — asymmetric warfare, uses drones and missiles, mountain hideouts',
    aiArchetypes: ['SWARM','TACTICIAN'],
    dimSecurity: 'Persian dimensional traps — 4D travelers get trapped in a 3s temporal loop',
    escalation: ['basij_response','irgc_deployment','missile_strike','drone_swarm','airspace_lockdown'],
    unique: 'Missile bases — random missile strikes every 90s target the most active player',
    color: 0x884400
  },
  IND: {
    name: 'PROTOCOL: TIGER',
    country: 'India', region: 'Asia',
    rules: 'Mountain warfare. Massive army. Dense urban combat.',
    hazards: ['mountain_combat_verticality','monsoon_flooding','crowd_density_civilian_confusion','jungle_ambush_zones'],
    aiDefense: 'Indian Army AI — uses terrain advantage, mountain ambush, massive numbers',
    aiArchetypes: ['SWARM','PREDATOR'],
    dimSecurity: 'Vedic dimensional shield — 7D void abilities reflected back at caster',
    escalation: ['police_response','paramilitary','military_response','mountain_division','airspace_lockdown'],
    unique: 'Monsoon — rain reduces all visibility and movement speed by 50% every 120s',
    color: 0xFF8800
  },
  BRA: {
    name: 'PROTOCOL: AMAZON',
    country: 'Brazil', region: 'Americas',
    rules: 'Jungle warfare. Favela combat. Guerrilla tactics.',
    hazards: ['jungle_concealment','favela_tight_corridors','river_crossings','wildlife_hostile'],
    aiDefense: 'Brazilian Special Forces AI — guerrilla tactics, jungle ambush, crowd blending',
    aiArchetypes: ['PREDATOR','GHOST'],
    dimSecurity: 'Amazon dimensional dampening — 4D-8D abilities have 50% reduced effectiveness',
    escalation: ['police_response','military_police','special_forces','jungle_lockdown','airspace_lockdown'],
    unique: 'Favela maze — randomly generated tight corridors change between matches',
    color: 0x00AA00
  },
  EGY: {
    name: 'PROTOCOL: PHARAOH',
    country: 'Egypt', region: 'Africa/Middle East',
    rules: 'Desert warfare. Ancient sites. Nile river combat.',
    hazards: ['sandstorm_visibility_loss','desert_heat_health_drain','nile_flood_zones','ancient_ruins_3d_labyrinth'],
    aiDefense: 'Egyptian Military AI — desert warfare specialist, uses ancient ruin labyrinths',
    aiArchetypes: ['TACTICIAN','BERSERKER'],
    dimSecurity: 'Pharaoh dimensional curse — 8D cosmic abilities trigger a 5s reality collapse',
    escalation: ['police_response','military_response','desert_lockdown','airspace_lockdown'],
    unique: 'Ancient ruins — pyramids and temples create 3D labyrinths with dimensional shortcuts',
    color: 0xDDAA00
  },
  ZAF: {
    name: 'PROTOCOL: SPEAR',
    country: 'South Africa', region: 'Africa',
    rules: 'Savanna warfare. Urban township combat. Resource control.',
    hazards: ['savanna_open_combat','township_shanty_mazes','mine_shaft_tunnels','wildlife_threats'],
    aiDefense: 'SADF AI — uses open terrain for sniping, township combat for ambush',
    aiArchetypes: ['PREDATOR','TACTICIAN'],
    dimSecurity: 'Sangoma dimensional ward — 6D quantum shifts have 30% chance of failing',
    escalation: ['police_response','special_task_force','military_response','airspace_lockdown'],
    unique: 'Mine shafts — underground tunnels with gold deposits (tradeable resource)',
    color: 0xFFAA00
  },
  SAU: {
    name: 'PROTOCOL: DESERT',
    country: 'Saudi Arabia', region: 'Middle East',
    rules: 'Open desert. Oil field defense. Air superiority.',
    hazards: ['extreme_heat_health_drain','oil_field_fire_zones','sand_dune_concealment','limited_cover'],
    aiDefense: 'Saudi Military AI — air superiority, uses jets and helicopters, limited ground engagement',
    aiArchetypes: ['TACTICIAN','GHOST'],
    dimSecurity: 'Desert dimensional void — 4D shifts in open desert have no cover to phase through',
    escalation: ['border_guard','military_response','air_superiority','airspace_lockdown','precision_strike'],
    unique: 'Oil fields — destroying oil infrastructure causes permanent fire zones',
    color: 0x00AA88
  },
  AUS: {
    name: 'PROTOCOL: OUTBACK',
    country: 'Australia', region: 'Oceania',
    rules: 'Vast distances. Desert survival. SAS elite units.',
    hazards: ['extreme_distance_traversal','desert_survival_water_mechanic','wildlife_hostile_dangerous','bushfire_spreading'],
    aiDefense: 'SASR AI — long-range patrol, desert survival, surgical strikes',
    aiArchetypes: ['PREDATOR','GHOST'],
    dimSecurity: 'Outback dimensional isolation — 7D-8D banishment sends you to Australian outback (harder to return)',
    escalation: ['police_response','military_response','sasr_deployment','airspace_lockdown'],
    unique: 'Bushfires — destroying vegetation creates spreading fire that changes the map',
    color: 0xAA8800
  },
  TUR: {
    name: 'PROTOCOL: OTTOMAN',
    country: 'Turkey', region: 'Europe/Asia',
    rules: 'Crossroads warfare. Bazaar combat. Drone operations.',
    hazards: ['bazaar_maze_corridors','earthquake_zones','border_crossing_checkpoints','drone_patrols'],
    aiDefense: 'Turkish Armed Forces AI — adaptive, uses urban and mountain terrain, drone warfare',
    aiArchetypes: ['TACTICIAN','GHOST'],
    dimSecurity: 'Ottoman dimensional checkpoint — 4D travelers must pass through a dimensional gate',
    escalation: ['police_response','gendarmerie','military_response','drone_swarm','airspace_lockdown'],
    unique: 'Crossroads — map spans two continents (Europe/Asia) with a bridge combat zone',
    color: 0xFF4444
  },
  KOR: {
    name: 'PROTOCOL: BLUE',
    country: 'South Korea', region: 'Asia',
    rules: 'Tech warfare. K-pop psyops. Cyber defense.',
    hazards: ['cyber_attack_interface_glitch','tech_sentry_drones','electromagnetic_barriers','k_pop_psyops_disorient'],
    aiDefense: 'ROK AI — cyber warfare specialist, uses electronic countermeasures, tech-enhanced soldiers',
    aiArchetypes: ['GHOST','TACTICIAN'],
    dimSecurity: 'Korean dimensional firewall — 6D quantum shifts are traced and logged',
    escalation: ['police_response','military_response','cyber_lockdown','airspace_lockdown','precision_strike'],
    unique: 'K-pop psyops — enemy AI plays disorienting audio that reverses your HUD',
    color: 0x0044FF
  },
};

// ====== 2. QUANTUM INTELLIGENCE & THREAT ESCALATION ======

const THREAT_ESCALATION = {
  // Each country has its own escalation ladder
  // The more 6D-8D havoc you cause, the higher it escalates

  levels: [
    { tier:0, name:'PEACE', desc:'No threat detected. Normal law enforcement only.', response:'police', scale:1 },
    { tier:1, name:'ALERT', desc:'Suspicious activity. Armed police deployed.', response:'armed_police', scale:1.2 },
    { tier:2, name:'MILITARY', desc:'Military response. Active duty soldiers deployed.', response:'military', scale:1.5 },
    { tier:3, name:'SPECIAL', desc:'Special forces deployed. Advanced tactics.', response:'special_forces', scale:2 },
    { tier:4, name:'LOCKDOWN', desc:'Full military lockdown. Airspace sealed.', response:'airspace_lockdown', scale:3 },
    { tier:5, name:'DIMENSIONAL', desc:'Dimensional security active. 4D-8D abilities blocked.', response:'dim_lockdown', scale:4 },
    { tier:6, name:'ORBITAL', desc:'ORBITAL KINETIC STRIKE authorized. Run.', response:'orbital_strike', scale:10 },
  ],

  // Track threat per country
  countryThreat: {}, // countryCode -> { level, kills, dimensionalUses, timeSinceLastIncident }

  increaseThreat(countryCode, action) {
    if (!this.countryThreat[countryCode]) this.countryThreat[countryCode] = { level: 0, kills: 0, dimensionalUses: 0, timeSinceLast: 0 };

    const threat = this.countryThreat[countryCode];
    let increase = 0;

    switch (action) {
      case 'kill': threat.kills++; increase = 0.3; break;
      case '4d_use': threat.dimensionalUses++; increase = 0.4; break;
      case '6d_shift': increase = 0.5; break;
      case '7d_void': increase = 1.0; break;
      case '8d_cosmic': increase = 2.0; break;
      case 'building_destroyed': increase = 0.5; break;
      case 'civilian_casualty': increase = 1.5; break;
      case 'infrastructure_hack': increase = 0.8; break;
      case 'dimensional_tear': increase = 1.5; break;
    }

    threat.level = Math.min(6, threat.level + increase);

    const currentLevel = this.levels[Math.floor(threat.level)];
    return { threatLevel: threat.level, level: currentLevel, countryCode };
  },

  decreaseThreat(countryCode, amount = 0.1) {
    if (!this.countryThreat[countryCode]) return null;
    this.countryThreat[countryCode].level = Math.max(0, this.countryThreat[countryCode].level - amount);
    return this.countryThreat[countryCode];
  },

  getCountryThreat(countryCode) {
    const threat = this.countryThreat[countryCode];
    if (!threat) return { level: 0, name: 'PEACE' };
    return { ...threat, name: this.levels[Math.floor(threat.level)].name, level: threat.level };
  },

  // Intelligence hacks — compromise local infrastructure
  intelHack(countryCode, targetType) {
    const hacks = {
      'comms_tower': { name: 'Comms Tower Hack', intel: 'enemy_radio_traffic', duration: 30, risk: 0.5 },
      'power_grid': { name: 'Power Grid Hack', intel: 'enemy_positions_via_blackout', duration: 20, risk: 0.8 },
      'cctv_network': { name: 'CCTV Network Hack', intel: 'all_enemy_positions_live', duration: 45, risk: 0.3 },
      'drone_control': { name: 'Drone Control Hijack', intel: 'control_enemy_drones', duration: 15, risk: 1.0 },
      'satellite': { name: 'Satellite Uplink Hack', intel: 'full_map_recon', duration: 60, risk: 1.5 },
      'quantum_grid': { name: 'Quantum Grid Hack', intel: 'see_all_dimensional_activity', duration: 30, risk: 2.0 }
    };
    const hack = hacks[targetType];
    if (!hack) return { success: false };

    // Hacking increases threat
    this.increaseThreat(countryCode, 'infrastructure_hack');

    return {
      success: true,
      hack: hack.name,
      intelGained: hack.intel,
      duration: hack.duration,
      risk: hack.risk,
      threatIncrease: 0.8,
      feedsTo: 'quantum_squad_link'
    };
  }
};

// ====== 3. REALITY-FRACTURING ORDNANCE ======

const REALITY_ORDNANCE = {
  ordnance: {
    chrono_stutter: {
      name: 'Chrono-Stutter Grenade',
      cost: 800, // $80
      radius: 12,
      duration: 3,
      mechanic: 'temporal_micro_loop',
      desc: 'Traps enemies in a 3-second micro-loop. Their movements, reloads, and positions repeat endlessly. Helpless to cross-fire.',
      effect: {
        microLoop: true,         // enemy repeats last 3 seconds infinitely
        actionLock: true,         // cannot perform new actions
        positionLock: true,       // locked to position 3 seconds ago
        reloadLoop: true,         // if reloading, stuck in reload animation
        invulnerable: false,      // they CAN still take damage
        crossfireVulnerable: true // they are sitting ducks
      },
      rarity: 'legendary',
      category: 'temporal'
    },
    topological_anchor: {
      name: 'Topological Anchor Mine',
      cost: 600, // $60
      radius: 8,
      duration: 10,
      mechanic: 'spatial_twist',
      desc: 'Destabilizes local geometry. Any enemy who steps near experiences an instant 90-degree spatial twist, throwing their perspective and aim reticle violently out of alignment.',
      effect: {
        spatialTwist: 90,        // 90 degree perspective twist
        aimDrift: true,           // reticle drifts randomly
        upIsSideways: true,       // gravity perception rotated
        vestibularOverload: true,  // extreme disorientation
        secondTrigger: 180       // second step twists another 180 degrees
      },
      rarity: 'legendary',
      category: 'spatial',
      isMine: true
    },
    reality_fracture: {
      name: 'Reality Fracture Bomb',
      cost: 1200, // $120
      radius: 20,
      duration: 15,
      mechanic: 'reality_fracture',
      desc: 'Fractures reality in a 20m radius. The ground splits into shards floating in different dimensions. Enemies fall between dimensions.',
      effect: {
        realityFracture: true,
        dimensionFall: true,      // enemies can fall into 4D/6D
        floatingShards: true,      // ground becomes floating platforms
        gravityRandom: true,       // gravity changes per shard
        visionSplit: true          // you see all dimensions simultaneously
      },
      rarity: 'mythic',
      category: 'dimensional'
    },
    paradox_mine: {
      name: 'Paradox Mine',
      cost: 1500, // $150
      radius: 10,
      duration: 5,
      mechanic: 'temporal_paradox',
      desc: 'Creates a temporal paradox. Enemies within range exist in two timelines simultaneously — they take damage in both.',
      effect: {
        dualTimeline: true,       // exists in 2 timelines
        doubleDamage: true,        // takes damage in both timelines
        positionSplit: true,       // sees two versions of themselves
        identityConfusion: true    // cant tell which version is real
      },
      rarity: 'mythic',
      category: 'temporal',
      isMine: true
    },
    quantum_freeze: {
      name: 'Quantum Freeze Grenade',
      cost: 1000, // $100
      radius: 15,
      duration: 8,
      mechanic: 'quantum_lock',
      desc: 'Freezes enemies in their current quantum state. They cant shift dimensions. They cant move between realities. Locked.',
      effect: {
        quantumLock: true,         // cant quantum shift
        dimensionalLock: true,    // cant use 4D-8D
        movementSlow: 0.3,         // 70% slow
        visibleInAllStates: true   // visible to ALL quantum realities
      },
      rarity: 'legendary',
      category: 'dimensional'
    },
    void_implosion: {
      name: 'Void Implosion Device',
      cost: 2000, // $200
      radius: 25,
      duration: 6,
      mechanic: 'void_collapse',
      desc: 'Creates a localized VOID collapse. Everything within 25m is sucked into the VOID. Survive the void or die.',
      effect: {
        voidSuck: true,           // pulls everything toward center
        voidBanish: true,          // enemies sucked in are banished to VOID
        coverConsumed: true,       // all cover destroyed
        voidRemains: true          // leaves a permanent void scar
      },
      rarity: 'mythic',
      category: 'void',
      premiumOnly: true,
      reqTier: 'OPERATIVE'
    },
    cosmic_rift_grenade: {
      name: 'Cosmic Rift Grenade',
      cost: 3000, // $300
      radius: 30,
      duration: 10,
      mechanic: 'cosmic_tear',
      desc: 'Tears a hole in reality. Enemies within 30m are flung to random points in space. Some end up in orbit. Some in another galaxy.',
      effect: {
        cosmicTear: true,         // reality tears open
        randomTeleport: true,     // enemies scattered across map
        someBanished: true,        // 30% chance of deep space banishment
        gravityLoss: true,         // zero gravity in zone
        permanentRift: true        // leaves a permanent dimensional rift
      },
      rarity: 'mythic',
      category: 'cosmic',
      premiumOnly: true,
      reqTier: 'COMMANDER'
    }
  },

  // Deploy ordnance
  deploy(ordnanceType, position, enemies) {
    const ord = this.ordnance[ordnanceType];
    if (!ord) return { success: false };

    const affected = enemies.filter(e => {
      const dist = Math.sqrt((e.x - position.x)**2 + (e.z - position.z)**2);
      return dist <= ord.radius;
    });

    return {
      success: true,
      ordnance: ord.name,
      affected: affected.length,
      effects: ord.effect,
      duration: ord.duration,
      isMine: ord.isMine || false
    };
  }
};

// ====== 4. MORE CHEAT SKILLS (50+ total now) ======

const MORE_CHEAT_SKILLS = {
  // National protocol skills
  protocol_bypass: {
    name: 'Protocol Bypass',
    desc: 'Bypass a country national protocol security for 15 seconds. All AI defenses go blind.',
    priceUSD: 60, priceCoins: 600, duration: 15, cooldown: 180, category: 'tactical',
    icon: '🔓', rarity: 'legendary', effect: 'disable_national_security'
  },
  diplomatic_immunity: {
    name: 'Diplomatic Immunity',
    desc: 'Become immune to national threat escalation for 30 seconds. Kill freely without consequences.',
    priceUSD: 50, priceCoins: 500, duration: 30, cooldown: 240, category: 'tactical',
    icon: '🎖', rarity: 'legendary', effect: 'freeze_threat_level'
  },

  // Reality manipulation
  map_rewrite: {
    name: 'Map Rewrite',
    desc: 'Instantly reshape the terrain around you. Create walls, remove cover, build bridges. Become the architect.',
    priceUSD: 80, priceCoins: 800, duration: 20, cooldown: 300, category: 'dimensional',
    icon: '🏗', rarity: 'mythic', effect: 'terrain_editing'
  },
  dimension_swap: {
    name: 'Force Dimension Swap',
    desc: 'Force ALL enemies within 50m to shift to a random quantum state. Their cover and position become useless.',
    priceUSD: 45, priceCoins: 450, duration: 0, cooldown: 120, category: 'dimensional',
    icon: '🔀', rarity: 'epic', effect: 'force_quantum_shift_enemies'
  },
  rewind_shot: {
    name: 'Rewind Shot',
    desc: 'Your next shot rewinds the target 3 seconds. They undo their last 3 seconds of movement and actions.',
    priceUSD: 35, priceCoins: 350, duration: 0, cooldown: 90, category: 'time',
    icon: '⏪', rarity: 'epic', effect: 'rewind_target', oneTime: true
  },
  future_sight: {
    name: 'Future Sight',
    desc: 'See 3 seconds into the future. Enemy positions, bullets, and actions are shown as ghostly predictions.',
    priceUSD: 70, priceCoins: 700, duration: 10, cooldown: 180, category: 'time',
    icon: '🔮', rarity: 'legendary', effect: 'precognition'
  },

  // Squad manipulation
  traitor_skill: {
    name: 'Turncoat',
    desc: 'Turn one enemy AI bot against their own team for 30 seconds. They fight for you.',
    priceUSD: 55, priceCoins: 550, duration: 30, cooldown: 200, category: 'psychological',
    icon: '🔀', rarity: 'legendary', effect: 'convert_enemy_ai'
  },
  squad_swap: {
    name: 'Squad Swap',
    desc: 'Swap positions with any squad member instantly. The ultimate tactical reposition.',
    priceUSD: 25, priceCoins: 250, duration: 0, cooldown: 60, category: 'movement',
    icon: '🔄', rarity: 'rare', effect: 'teleport_swap_teammate'
  },
  phantom_squad: {
    name: 'Phantom Squad',
    desc: 'Create 3 ghost copies of your entire squad that look and move like real players. Total confusion.',
    priceUSD: 65, priceCoins: 650, duration: 20, cooldown: 240, category: 'psychological',
    icon: '👥', rarity: 'legendary', effect: 'clone_entire_squad'
  },

  // Economy cheats
  coin_magnet: {
    name: 'Coin Magnet',
    desc: 'Double all Chrono Coin rewards for 60 seconds. Kills, objectives, everything pays 2x.',
    priceUSD: 20, priceCoins: 200, duration: 60, cooldown: 300, category: 'economy',
    icon: '🧲', rarity: 'rare', effect: 'double_coin_rewards'
  },
  loot_doublers: {
    name: 'Lottery Ticket',
    desc: 'Your next loot box gives DOUBLE rewards. Guaranteed mythic item.',
    priceUSD: 30, priceCoins: 300, duration: 0, cooldown: 0, category: 'economy',
    icon: '🎰', rarity: 'epic', effect: 'double_loot_guaranteed_mythic', oneTime: true
  },

  // Combat ultimate
  aimbot_pulse: {
    name: 'Aimbot Pulse',
    desc: 'Your next 5 shots auto-aim to the nearest enemies head. Yes, really.',
    priceUSD: 50, priceCoins: 500, duration: 15, cooldown: 300, category: 'combat',
    icon: '🎯', rarity: 'legendary', effect: 'auto_headshot_5_shots'
  },
  wall_hack: {
    name: 'Wall Hack',
    desc: 'See all enemies through all walls and cover for 20 seconds. Including their health bars.',
    priceUSD: 40, priceCoins: 400, duration: 20, cooldown: 150, category: 'recon',
    icon: '👁', rarity: 'epic', effect: 'see_all_enemies_through_walls'
  },
  damage_reflect: {
    name: 'Damage Reflect',
    desc: 'Reflect 100% of damage back to the attacker for 10 seconds. They hurt themselves.',
    priceUSD: 45, priceCoins: 450, duration: 10, cooldown: 180, category: 'defense',
    icon: '🪞', rarity: 'legendary', effect: 'reflect_all_damage'
  },
  infinite_stamina: {
    name: 'Adrenaline Override',
    desc: 'No cooldowns on ALL abilities for 15 seconds. Spam everything you have.',
    priceUSD: 75, priceCoins: 750, duration: 15, cooldown: 300, category: 'ultimate',
    icon: '💉', rarity: 'mythic', effect: 'zero_all_cooldowns'
  },
  one_shot_mode: {
    name: 'One Shot Mode',
    desc: 'Your next shot one-shots ANY target. Boss, vehicle, player. One hit. One kill.',
    priceUSD: 100, priceCoins: 1000, duration: 0, cooldown: 600, category: 'ultimate',
    icon: '💀', rarity: 'mythic', effect: 'instant_kill_any_target', oneTime: true
  },
  anti_banish: {
    name: 'Anti-Banish Shield',
    desc: 'Immune to ALL banishment (void, cosmic, galaxy) for 30 seconds. The premium counter.',
    priceUSD: 35, priceCoins: 350, duration: 30, cooldown: 120, category: 'defense',
    icon: '🛡', rarity: 'epic', effect: 'banishment_immune'
  },
  team_wipe: {
    name: 'Team Wipe Button',
    desc: 'Instantly eliminates the WEAKEST enemy player. They drop dead. No counter. Pure terror.',
    priceUSD: 90, priceCoins: 900, duration: 0, cooldown: 600, category: 'ultimate',
    icon: '💥', rarity: 'mythic', effect: 'instant_kill_weakest_enemy', oneTime: true
  },
  gravity_zero: {
    name: 'Zero Gravity Zone',
    desc: 'Create a 30m zero-gravity zone for 10 seconds. Everyone floats. Bullets curve. Chaos.',
    priceUSD: 40, priceCoins: 400, duration: 10, cooldown: 150, category: 'dimensional',
    icon: '🎈', rarity: 'epic', effect: 'zero_gravity_zone'
  },
  time_stop: {
    name: 'Time Stop',
    desc: 'Stop time for ALL enemies for 3 seconds. Only you and your squad can move. The ultimate setup.',
    priceUSD: 120, priceCoins: 1200, duration: 3, cooldown: 600, category: 'ultimate',
    icon: '⏸', rarity: 'mythic', effect: 'freeze_all_enemies'
  },
  dimension_collapse: {
    name: 'Dimension Collapse',
    desc: 'Collapse all 8 dimensions into one for 10 seconds. Everyone is in the same space. Pure chaos.',
    priceUSD: 150, priceCoins: 1500, duration: 10, cooldown: 600, category: 'cosmic',
    icon: '💀', rarity: 'mythic', effect: 'collapse_all_dimensions'
  },
  instant_boss: {
    name: 'Spawn a Boss',
    desc: 'Spawn a random boss enemy in the enemy team position. They have to fight it. You dont.',
    priceUSD: 80, priceCoins: 800, duration: 0, cooldown: 300, category: 'ultimate',
    icon: '👹', rarity: 'legendary', effect: 'spawn_boss_on_enemies'
  }
};

// Merge with existing cheat skills
if (typeof CHEAT_SKILLS !== 'undefined') {
  Object.assign(CHEAT_SKILLS, MORE_CHEAT_SKILLS);
}

// ====== 5. NEURAL TELEMETRY & COGNITIVE STRESS TESTING ======

const NEURAL_TELEMETRY = {
  // Tracks player cognitive performance under stress
  // Advanced enough for defense training adaptation

  metrics: {
    reactionTime: {
      desc: 'Milliseconds between threat appearing and player response',
      baseline: 300, threshold: { elite: 150, advanced: 200, proficient: 300, basic: 500 }
    },
    spatialProcessingSpeed: {
      desc: 'How fast player tracks 3D+ threats across dimensions',
      baseline: 0.5, threshold: { elite: 0.9, advanced: 0.7, proficient: 0.5, basic: 0.3 }
    },
    dimensionalAwareness: {
      desc: 'Ability to track threats in 4D-8D simultaneously',
      baseline: 0.2, threshold: { elite: 0.85, advanced: 0.6, proficient: 0.4, basic: 0.15 }
    },
    sensoryResilience: {
      desc: 'Performance maintained under sensory distortion effects',
      baseline: 0.4, threshold: { elite: 0.9, advanced: 0.7, proficient: 0.5, basic: 0.3 }
    },
    cognitiveLoad: {
      desc: 'Ability to process multiple simultaneous threats under pressure',
      baseline: 3, threshold: { elite: 8, advanced: 6, proficient: 4, basic: 2 }
    },
    adaptationSpeed: {
      desc: 'How fast player adapts to new dimensional mechanics',
      baseline: 5, threshold: { elite: 1, advanced: 3, proficient: 5, basic: 10 }
    },
    threatPrioritization: {
      desc: 'Choosing the right target under multi-dimensional threat',
      baseline: 0.4, threshold: { elite: 0.95, advanced: 0.8, proficient: 0.6, basic: 0.3 }
    },
    squadCoordination: {
      desc: 'Effectiveness of squad communication and coordination',
      baseline: 0.5, threshold: { elite: 0.95, advanced: 0.8, proficient: 0.6, basic: 0.4 }
    },
    enduranceDecay: {
      desc: 'Performance decay rate over 30-minute session',
      baseline: 0.3, threshold: { elite: 0.05, advanced: 0.1, proficient: 0.2, basic: 0.4 }
    },
    paradoxResolution: {
      desc: 'Ability to function when reality breaks (temporal paradox, quantum collapse)',
      baseline: 0.1, threshold: { elite: 0.8, advanced: 0.5, proficient: 0.3, basic: 0.1 }
    }
  },

  // Real-time telemetry tracking
  session: {
    startTime: 0,
    events: [],
    stressLevel: 0,
    dimensionalEvents: 0,
    sensoryDistortionsExperienced: 0,
    decisionsUnderStress: 0,
    correctDecisions: 0,
    adaptationEvents: []
  },

  startSession() {
    this.session = {
      startTime: Date.now(),
      events: [],
      stressLevel: 0,
      dimensionalEvents: 0,
      sensoryDistortionsExperienced: 0,
      decisionsUnderStress: 0,
      correctDecisions: 0,
      adaptationEvents: []
    };
  },

  recordEvent(type, data) {
    this.session.events.push({ type, data, time: Date.now() - this.session.startTime });
    if (type === 'dimensional_use') this.session.dimensionalEvents++;
    if (type === 'sensory_distortion') this.session.sensoryDistortionsExperienced++;
    if (type === 'stress_decision') {
      this.session.decisionsUnderStress++;
      if (data.correct) this.session.correctDecisions++;
    }
    if (type === 'adaptation') this.session.adaptationEvents.push(data);
  },

  generateReport() {
    const accuracy = this.session.decisionsUnderStress > 0
      ? this.session.correctDecisions / this.session.decisionsUnderStress : 0;

    const duration = (Date.now() - this.session.startTime) / 1000;

    return {
      duration: Math.round(duration) + 's',
      dimensionalEvents: this.session.dimensionalEvents,
      sensoryDistortions: this.session.sensoryDistortionsExperienced,
      decisionsUnderStress: this.session.decisionsUnderStress,
      decisionAccuracy: (accuracy * 100).toFixed(1) + '%',
      adaptationsObserved: this.session.adaptationEvents.length,
      stressTolerance: this.calculateStressTolerance(),
      cognitiveLoadCapacity: this.calculateCognitiveLoad(),
      recommendation: this.generateRecommendation(accuracy, this.session.dimensionalEvents)
    };
  },

  calculateStressTolerance() {
    const distortions = this.session.sensoryDistortionsExperienced;
    const accuracy = this.session.decisionsUnderStress > 0
      ? this.session.correctDecisions / this.session.decisionsUnderStress : 0;

    if (distortions > 10 && accuracy > 0.7) return 'ELITE — maintains performance under extreme sensory distortion';
    if (distortions > 5 && accuracy > 0.5) return 'ADVANCED — strong performance under stress';
    if (distortions > 3 && accuracy > 0.3) return 'PROFICIENT — adequate stress management';
    return 'BASIC — performance degrades under sensory distortion';
  },

  calculateCognitiveLoad() {
    const dim = this.session.dimensionalEvents;
    if (dim > 50) return 'TIER S — Handles 8-dimensional simultaneous processing';
    if (dim > 30) return 'TIER A — Strong multi-dimensional processing';
    if (dim > 15) return 'TIER B — Moderate dimensional processing';
    if (dim > 5) return 'TIER C — Basic dimensional awareness';
    return 'TIER D — Limited dimensional capacity';
  },

  generateRecommendation(accuracy, dimEvents) {
    if (accuracy > 0.7 && dimEvents > 30) return 'Recommend: Advanced dimensional combat training. Ready for DEFCON Tier 1 operations.';
    if (accuracy > 0.5 && dimEvents > 15) return 'Recommend: Intermediate training. Focus on 6D quantum combat.';
    if (accuracy < 0.3) return 'Recommend: Basic cognitive training. Focus on sensory resilience exercises.';
    return 'Recommend: Standard training. Continue building dimensional awareness.';
  },

  // Get full cognitive profile
  getCognitiveProfile(playerStats) {
    const profile = {};
    for (const [key, metric] of Object.entries(this.metrics)) {
      const value = playerStats[key] !== undefined ? playerStats[key] : metric.baseline;
      let tier = 'basic';
      for (const [t, threshold] of Object.entries(metric.threshold)) {
        const isLower = key === 'reactionTime' || key === 'adaptationSpeed' || key === 'enduranceDecay';
        if (isLower ? value <= threshold : value >= threshold) tier = t;
      }
      profile[key] = { value, tier, desc: metric.desc };
    }
    return profile;
  }
};

// ====== EXPORT ======
if (typeof module !== 'undefined') {
  module.exports = {
    NATIONAL_PROTOCOLS, THREAT_ESCALATION, REALITY_ORDNANCE,
    MORE_CHEAT_SKILLS, NEURAL_TELEMETRY
  };
}
