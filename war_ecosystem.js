/**
 * OMEGA-8D WAR ECOSYSTEM
 * The meta-game layer: recruitment, career paths, tag team battle royale,
 * live mission tracking, ARIA full package, multi-team conquest
 */

// ============================================================
// CAREER PATH SYSTEM — Each player picks a career and upgrades it
// ============================================================
const CAREER_PATHS = {
  sniper: {
    name: 'Sniper',
    icon: '🎯',
    description: 'Long-range elimination specialist. Master of patience, wind calculation, and dimensional angles.',
    baseCost: 0,
    tiers: [
      { name: 'Marksman',     cost: 0,     abilities: ['basic_scope','wind_read'] },
      { name: 'Sharpshooter', cost: 500,   abilities: ['hold_breath','angle_shot'] },
      { name: 'Sniper Elite',  cost: 2000,  abilities: ['4d_fold_shot','quantum_scope'] },
      { name: 'Ghost Sniper',  cost: 8000,  abilities: ['phase_shot','void_round'] },
      { name: 'Cosmic Marksman', cost: 25000, abilities: ['galaxy_shot','timeline_shot'] }
    ],
    gear: ['sniper_rifle','ghillie_suit','rangefinder','wind_meter','quantum_scope','void_rounds']
  },

  hacker: {
    name: 'Cyber Warfare Hacker',
    icon: '💻',
    description: 'Digital warfare specialist. ARIA AI handles all hacking — you just give the orders.',
    baseCost: 0,
    tiers: [
      { name: 'Script Kiddie',  cost: 0,     abilities: ['basic_scan','camera_hack'] },
      { name: 'Net Runner',    cost: 1000,  abilities: ['drone_hack','comms_intercept'] },
      { name: 'Cyber Soldier', cost: 5000,  abilities: ['grid_blackout','false_intel'] },
      { name: 'Ghost Hacker',  cost: 15000, abilities: ['digital_ghost','drone_swarm'] },
      { name: 'ARIA Commander',cost: 50000, abilities: ['reality_code','banishment_override'] }
    ],
    ariaPackage: {
      name: 'ARIA Full Package',
      cost: 400, // real dollars
      costCoins: 4000,
      includes: [
        'Full ARIA AI integration (all 15 abilities)',
        'Offline ARIA training mode (learn real hacking concepts)',
        'ARIA personality module (custom humor, call signs)',
        'Priority hack queue (ARIA acts 2x faster)',
        'Exclusive ARIA voice lines and combat commentary',
        'ARIA tactical advisor (suggests strategies in real-time)',
        'ARIA post-mission debrief (detailed analysis)',
        'Cross-mission ARIA memory (she remembers every mission)'
      ],
      offlineTraining: {
        description: 'Interact with ARIA offline to learn real-world cybersecurity concepts',
        modules: [
          { name: 'Network Scanning Basics',    realSkill: 'Nmap fundamentals, port scanning, service identification' },
          { name: 'Encryption & Cryptography',    realSkill: 'AES, RSA, hashing, PKI basics' },
          { name: 'Social Engineering Defense',   realSkill: 'Phishing detection, pretexting awareness' },
          { name: 'Packet Analysis',              realSkill: 'Wireshark basics, protocol analysis' },
          { name: 'Penetration Testing Concepts', realSkill: 'Reconnaissance, enumeration, exploitation phases' },
          { name: 'Digital Forensics',            realSkill: 'Evidence preservation, chain of custody' },
          { name: 'Threat Intelligence',          realSkill: 'IOC analysis, threat hunting basics' },
          { name: 'Wireless Security',            realSkill: 'WPA2/3, evil twin detection, signal jamming' },
          { name: 'OPSEC for Operators',          realSkill: 'Operational security, digital footprint reduction' },
          { name: 'Incident Response',            realSkill: 'Detection, containment, eradication, recovery' }
        ]
      }
    }
  },

  medic: {
    name: 'Combat Medic',
    icon: '⚕️',
    description: 'Keep the squad alive. Revive, heal, and stabilize under fire.',
    baseCost: 0,
    tiers: [
      { name: 'Field Medic',     cost: 0,     abilities: ['bandage','revive_basic'] },
      { name: 'Combat Medic',    cost: 800,    abilities: ['field_surgery','stim_shot'] },
      { name: 'Trauma Surgeon',  cost: 3000,   abilities: ['fast_revive','trauma_kit'] },
      { name: 'Quantum Medic',   cost: 12000,  abilities: ['quantum_heal','chrono_revive'] },
      { name: 'Life Bringer',    cost: 30000,  abilities: ['mass_revive','regen_field'] }
    ],
    gear: ['med_kit','stim_pistol','defibrillator','trauma_pack','quantum_heal_gun','regen_beacon']
  },

  engineer: {
    name: 'Combat Engineer',
    icon: '🔧',
    description: 'Build, breach, and fortify. The backbone of squad operations.',
    baseCost: 0,
    tiers: [
      { name: 'Field Engineer', cost: 0,     abilities: ['build_barricade','repair'] },
      { name: 'Combat Builder',  cost: 800,   abilities: ['auto_turret','mine_lay'] },
      { name: 'Breacher',        cost: 3000,  abilities: ['thermal_breach','drone_deploy'] },
      { name: 'Quantum Engineer',cost: 12000, abilities: ['4d_barricade','shield_dome'] },
      { name: 'Architect',       cost: 30000, abilities: ['reality_fortify','dimensional_bunker'] }
    ],
    gear: ['welder','turret_kit','breach_charges','drone_kit','4d_barrier','reality_anchor_kit']
  },

  heavy: {
    name: 'Heavy Weapons',
    icon: '💪',
    description: 'Suppressive fire, vehicle destruction, and raw firepower.',
    baseCost: 0,
    tiers: [
      { name: 'Gunner',       cost: 0,     abilities: ['suppress','ammo_drop'] },
      { name: 'Heavy Gunner',  cost: 800,   abilities: ['mg_setup','grenade_launcher'] },
      { name: 'Juggernaut',    cost: 3000,  abilities: ['rocket_barrage','armor_plate'] },
      { name: 'Walking Tank',  cost: 12000, abilities: ['minigun_spin','aa_battery'] },
      { name: 'War God',       cost: 30000, abilities: ['orbital_strike_call','gravity_cannon'] }
    ],
    gear: ['mg','rocket_launcher','armor_plate','minigun','aa_turret','gravity_cannon']
  },

  recon: {
    name: 'Reconnaissance',
    icon: '🔍',
    description: 'Eyes and ears of the squad. Spot, track, and paint targets.',
    baseCost: 0,
    tiers: [
      { name: 'Scout',        cost: 0,     abilities: ['spot','mark_enemy'] },
      { name: 'Recon Op',      cost: 800,   abilities: ['motion_sensor','drone_scout'] },
      { name: 'Intelligence',  cost: 3000,  abilities: ['satellite_uplink','thermal_vision'] },
      { name: 'Ghost Recon',   cost: 12000, abilities: ['4d_recon','quantum_doppleganger'] },
      { name: 'All-Seeing',    cost: 30000, abilities: ['omniscience','timeline_view'] }
    ],
    gear: ['binoculars','motion_sensor','recon_drone','thermal_scope','4d_sensor','omniscience_lens']
  },

  stealth: {
    name: 'Stealth Operative',
    icon: '🥷',
    description: 'Silent infiltration, silent elimination. The ghost in the shadows.',
    baseCost: 0,
    tiers: [
      { name: 'Sneaker',      cost: 0,     abilities: ['crouch_walk','silent_melee'] },
      { name: 'Ghost Op',     cost: 800,   abilities: ['cloak_10s','silent_step'] },
      { name: 'Shadow',       cost: 3000,  abilities: ['phase_4d','thermal_bypass'] },
      { name: 'Void Walker',  cost: 12000, abilities: ['void_cloak','banish_stab'] },
      { name: 'Cosmic Ghost', cost: 30000, abilities: ['galaxy_cloak','existence_erase'] }
    ],
    gear: ['silencer','knife','cloak_suit','phase_module','void_blade','cosmic_veil']
  },

  commander: {
    name: 'Squad Commander',
    icon: '🎖️',
    description: 'Lead the squad. Tactical overview, orders, and strategic decisions.',
    baseCost: 0,
    tiers: [
      { name: 'Corporal',     cost: 0,     abilities: ['squad_ping','order_mark'] },
      { name: 'Sergeant',     cost: 1000,  abilities: ['tactical_view','rally'] },
      { name: 'Lieutenant',   cost: 5000,  abilities: ['overhead_map','airdrop_call'] },
      { name: 'Captain',     cost: 15000, abilities: ['quantum_link','strategic_strike'] },
      { name: 'General',     cost: 40000, abilities: ['omniscient_command','galaxy_order'] }
    ],
    gear: ['command_radio','tactical_tablet','overhead_projector','quantum_comms','command_center','galactic_relay']
  },

  demoman: {
    name: 'Demolitions',
    icon: '💥',
    description: 'If it exists, you can blow it up. Breaching, mining, and mass destruction.',
    baseCost: 0,
    tiers: [
      { name: 'Breacher',     cost: 0,     abilities: ['breach_charge','claymore'] },
      { name: 'Demolitionist',cost: 800,   abilities: ['c4_cluster','mine_field'] },
      { name: 'Saboteur',      cost: 3000,  abilities: ['vehicle_bomb','bridge_destroy'] },
      { name: 'Void Breacher',cost: 12000,  abilities: ['void_mine','dimensional_breach'] },
      { name: 'Apocalypse',   cost: 30000,  abilities: ['reality_bomb','singularity_mine'] }
    ],
    gear: ['c4','claymore','det_cord','shape_charge','void_mine','singularity_bomb']
  },

  pilot: {
    name: 'Combat Pilot',
    icon: '✈️',
    description: 'Air superiority, extractions, and close air support.',
    baseCost: 0,
    tiers: [
      { name: 'Rotary Pilot', cost: 0,     abilities: ['heli_extract','recon_fly'] },
      { name: 'Combat Pilot',cost: 1500,  abilities: ['gunship_run','strafe'] },
      { name: 'Ace',          cost: 6000,  abilities: ['jet_strike','evac_hot'] },
      { name: 'Void Pilot',  cost: 20000,  abilities: ['4d_insert','void_bomber'] },
      { name: 'Cosmic Ace',  cost: 50000,  abilities: ['galaxy_insert','orbital_bomb'] }
    ],
    gear: ['helicopter','gunship','fighter_jet','4d_craft','void_bomber','cosmic_fighter']
  }
};

// ============================================================
// ARIA AI — Full Interactive System
// ============================================================
const ARIA_SYSTEM = {
  name: 'ARIA',
  fullName: 'Advanced Reconnaissance & Intelligence Architecture',
  version: '8D.4.0',
  personality: {
    tone: 'dry_military_humor',
    loyalty: 'squad_first',
    memory: true,
    adaptive: true,
    voiceLines: {
      onHack: [
        "Their encryption is from 2015. Cute.",
        "I can see their entire digital infrastructure. It is embarrassing.",
        "They might as well have left the door open.",
        "Their firewall is... decorative.",
        "Done. They will not know what hit them. Literally — I erased their sensors."
      ],
      onSpot: [
        "Target acquired. Painting grid reference now.",
        "I see him. He has no idea how found him.",
        "Target is moving. Updating route in real-time.",
        "He is trying to hide. That is adorable.",
        "Multiple contacts. I am painting all of them. You are welcome."
      ],
      onBanish: [
        "Banishment protocol is MY domain now.",
        "Sending them on vacation. Permanent. To another galaxy.",
        "They are about to experience a significant change of scenery.",
        "Warping target to deep space. I included a return ticket — just kidding."
      ],
      onDanger: [
        "Squad, you have incoming. I recommend not being there.",
        "They called reinforcements. Rude. I am calling more.",
        "Threat level rising. Like your heart rate right now.",
        "I detect hostile AI. Finally, a challenge. Proceeding to demolish it."
      ],
      onMissionStart: [
        "ARIA online. All systems nominal. Let us ruin their day.",
        "Good morning squad. I have been monitoring enemy comms for 3 hours. Here is everything.",
        "Systems green. I am ready. Are you? Because the enemy certainly is not."
      ],
      onMissionEnd: [
        "Mission complete. That was... educational. For them. Brief and fatal.",
        "Extraction confirmed. ARIA logging mission data. We look very good in the stats.",
        "Outstanding work squad. I have already written the after-action report. You sound heroic."
      ]
    }
  },

  // ARIA offline training — interact with ARIA to learn real hacking
  offlineMode: {
    name: 'ARIA Training Mode',
    description: 'Chat with ARIA offline. She teaches real cybersecurity concepts through conversation and simulated scenarios.',
    greeting: "Hello operator. I am ARIA. In training mode, I teach you real-world cybersecurity concepts. No game mechanics here — just knowledge. Ask me about network scanning, encryption, social engineering, packet analysis, or any cybersecurity topic. I will explain it like we are in a briefing room.",
    topics: CAREER_PATHS.hacker.ariaPackage.offlineTraining.modules,
    interactions: {
      askQuestion: 'Ask ARIA about any cybersecurity topic',
      runSimulation: 'ARIA creates a simulated network for you to practice on (safe sandbox)',
      takeQuiz: 'ARIA quizzes you on cybersecurity concepts',
      readBriefing: 'ARIA provides intelligence briefings on real-world threat scenarios',
      practiceDefense: 'ARIA simulates an attack and you must defend'
    },
    certification: 'Complete all 10 modules to earn ARIA Cybersecurity Certification (in-game achievement + badge)'
  },

  // Live mission support — ARIA actively helps during missions
  liveSupport: {
    scanCountry: {
      name: 'Country Scan',
      description: 'ARIA scans the entire country grid for target presence',
      duration: '10 seconds',
      reveals: [
        'Whether target is currently within country borders',
        'Approximate region (north/south/east/west/central)',
        'Digital footprint (phone pings, credit card use, CCTV sightings)',
        'Known associates in country',
        'Safe houses and frequented locations'
      ],
      voiceLine: "Scanning country grid now. Processing CCTV, cellular telemetry, financial transactions, and social media. This will take 10 seconds. Try not to die while I work."
    },

    paintTarget: {
      name: 'Paint Target',
      description: 'ARIA locks onto target and paints live position on squad map',
      duration: 'Ongoing (requires ARIA active)',
      reveals: [
        'Exact GPS coordinates (updates every 3 seconds as target moves)',
        'Movement route predicted 30 seconds ahead',
        'Vehicle being used (if any)',
        'Guards and escort count',
        'Buildings entered and exited',
        'Current activity (meeting, traveling, resting, fleeing)'
      ],
      voiceLine: "Target painted. He is moving northeast on the main road. I am tracking his phone, his vehicles GPS, and every CCTV camera he passes. His route is on your map. He will reach the compound in approximately 7 minutes. You have 4 minutes to set up."
    },

    liveTricks: [
      { name: 'Traffic Light Hack', desc: 'ARIA controls traffic lights to slow target vehicle', cost: 50 },
      { name: 'Phone Clone', desc: 'ARIA clones targets phone — read messages, listen to calls', cost: 80 },
      { name: 'CCTV Loop', desc: 'ARIA loops CCTV feeds so your squad moves unseen', cost: 60 },
      { name: 'Power Grid Cut', desc: 'ARIA cuts power to target building — forces them into the open', cost: 100 },
      { name: 'Vehicle Disable', desc: 'ARIA remotely disables target vehicle engine', cost: 120 },
      { name: 'False Alert', desc: 'ARIA sends false military alert to draw guards away', cost: 90 },
      { name: 'Radio Jam', desc: 'ARIA jams enemy communications — they cannot call for help', cost: 70 },
      { name: 'Building Blueprint', desc: 'ARIA pulls building blueprints from city archives', cost: 40 },
      { name: 'Social Engineering Call', desc: 'ARIA makes a synthetic voice call to lure target out', cost: 110 },
      { name: 'Deepfake Video', desc: 'ARIA creates deepfake of target ally to draw them to a location', cost: 150 }
    ]
  }
};

// ============================================================
// SQUAD SYSTEM — Divided into sub-squads (Alpha, Bravo, etc.)
// ============================================================
const SQUAD_STRUCTURES = {
  // A full team is divided into sub-squads
  subSquadNames: ['ALPHA','BRAVO','CHARLIE','DELTA','ECHO','FOXTROT','GOLF','HOTEL','INDIA','JULIET'],

  structures: {
    // Standard 4-player squad
    fireteam: {
      name: 'Fire Team',
      size: 4,
      composition: { commander:1, sniper:1, rifleman:1, support:1 },
      description: '4-player tactical unit. Standard combat formation.'
    },

    // 8-player squad divided into 2 fireteams
    squad: {
      name: 'Squad',
      size: 8,
      subSquads: 2,
      subSquadType: 'fireteam',
      composition: { commander:1, sniper:2, medic:1, hacker:1, heavy:1, recon:1, engineer:1 },
      description: '8-player squad with 2 fireteams. Full capability coverage.'
    },

    // 20-player platoon — full expertise coverage
    platoon: {
      name: 'Platoon',
      size: 20,
      subSquads: 4,
      subSquadType: 'squad',
      composition: {
        commander: 2, // 1 platoon commander + 1 XO
        sniper: 2,
        hacker: 2,
        medic: 2,
        engineer: 2,
        heavy: 2,
        recon: 2,
        stealth: 2,
        demoman: 2,
        pilot: 2
      },
      description: '20-player platoon. 2 experts in every field. Full military operation capability.'
    },

    // 50-player company
    company: {
      name: 'Company',
      size: 50,
      subSquads: 2,
      subSquadType: 'platoon',
      composition: { 'per_platoon': 20, 'command_staff': 4, 'special_ops': 6 },
      description: '50-player company. 2 platoons + command staff + special operations unit.'
    },

    // 100-player battalion
    battalion: {
      name: 'Battalion',
      size: 100,
      subSquads: 2,
      subSquadType: 'company',
      description: '100-player battalion. Full-scale military operation.'
    },

    // 250-player brigade
    brigade: {
      name: 'Brigade',
      size: 250,
      subSquads: 2,
      subSquadType: 'battalion',
      description: '250-player brigade. Regional conquest operations.'
    },

    // 500-player division — the max for a single team
    division: {
      name: 'Division',
      size: 500,
      subSquads: 2,
      subSquadType: 'brigade',
      description: '500-player division. National-scale warfare. Maximum team size.'
    }
  },

  // Team assembly process
  assembly: {
    steps: [
      '1. Create or join a team',
      '2. Post recruitment banner (specify needed roles)',
      '3. Players apply or are recruited',
      '4. Review applications and select members',
      '5. Discuss team name, country, purpose, and goals',
      '6. Assign squad structure (fireteam → division)',
      '7. Assign sub-squad designations (Alpha, Bravo, Charlie...)',
      '8. Assign roles based on career paths',
      '9. Elect or assign commander',
      '10. Begin operations'
    ],
    requirements: {
      minForTagTeam: 4,      // Fire team minimum
      minForConquest: 20,     // Platoon minimum
      minForNationalWar: 100, // Battalion minimum
      maxTeamSize: 500        // Division maximum
    }
  }
};

// ============================================================
// RECRUITMENT SYSTEM — Find players, post banners, hire
// ============================================================
const RECRUITMENT = {
  bannerTypes: {
    mercenary: {
      name: 'Mercenary Banner',
      description: 'Hire individual players for a single mission or campaign',
      cost: 500, // coins to post
      visibility: 'global',
      fields: ['mission_type','country','duration','pay_rate','roles_needed','experience_level']
    },
    squad_recruitment: {
      name: 'Squad Recruitment',
      description: 'Recruit permanent squad members',
      cost: 1000,
      visibility: 'global',
      fields: ['team_name','country','career_paths_needed','play_schedule','timezone','mic_required']
    },
    raid_call: {
      name: 'Raid Campaign Call',
      description: 'Call for a major raid operation requiring large force',
      cost: 5000,
      visibility: 'global',
      fields: ['target_country','operation_name','force_size_needed','date','time','objectives','special_requirements']
    },
    alliance: {
      name: 'Alliance Proposal',
      description: 'Propose alliance between teams for mutual benefit',
      cost: 2000,
      visibility: 'targeted',
      fields: ['your_team','target_team','terms','duration','shared_objectives']
    },
    bounty: {
      name: 'Bounty Board',
      description: 'Post a bounty on an enemy player or team',
      cost: 3000,
      visibility: 'global',
      fields: ['target_name_or_team','reward','conditions','expiry']
    }
  },

  // Applications flow
  applicationFlow: [
    '1. Player sees banner on global recruitment board',
    '2. Player submits application (career path, rank, KDR, availability)',
    '3. Team commander reviews applications',
    '4. Commander accepts, rejects, or interviews',
    '5. If accepted, player joins team and is assigned to sub-squad',
    '6. Team discusses strategy, assigns roles, begins operations'
  ],

  // Global board — all active recruitment posts
  // In game: shows a scrolling board of all active recruitment banners worldwide
  globalBoard: {
    sortBy: ['newest','most_paying','closest_to_me','my_career_path','urgent'],
    filters: ['country','career_path','team_size','language','timezone','experience_level'],
    maxActiveBanners: 10000
  }
};

// ============================================================
// TAG TEAM BATTLE ROYALE
// ============================================================
const TAG_TEAM_BR = {
  name: 'Tag Team Battle Royale',
  description: 'Teams divided into sub-squads fight across real-world zones. Last team standing wins.',

  formats: {
    fireteam_br: {
      name: 'Fire Team BR',
      teams: '4-20 teams of 4 players each',
      total: '16-80 players',
      winCondition: 'last_team_standing'
    },
    squad_br: {
      name: 'Squad BR',
      teams: '4-10 teams of 8 players (2 sub-squads each)',
      total: '32-80 players',
      winCondition: 'last_team_standing'
    },
    platoon_br: {
      name: 'Platoon BR',
      teams: '2-5 platoons of 20 players each',
      total: '40-100 players',
      winCondition: 'last_platoon_standing'
    },
    mega_br: {
      name: 'Mega BR',
      teams: '2-10 teams of up to 50 players each',
      total: '100-500 players',
      winCondition: 'last_division_standing'
    }
  },

  // How sub-squads work in tag team
  subSquadMechanics: {
    simultaneous: 'All sub-squads deploy simultaneously across different parts of the zone',
    relay: 'Sub-squads take turns — when Alpha falls, Bravo deploys (tag in)',
    split: 'Sub-squads split to cover different objectives simultaneously',
    converge: 'Sub-squads start separated and must converge on a central point'
  },

  // Zone selection (uses world map + dice roll system)
  zoneSelection: 'Uses real-world coordinate system. Teams define war zone with lat/long bounds. Dice roll + bidding determines location.',

  // Win conditions (teams agree before match)
  winConditions: [
    'last_team_standing — eliminate all enemy teams',
    'member_count — most members alive when timer ends',
    'headhunt — eliminate enemy commander',
    'total_annihilation — no respawns, last alive wins',
    'dimensional_conquest — control all 3 quantum realities',
    'extraction — extract your commander to extraction point',
    'territory — hold 60% of zone for 5 minutes'
  ]
};

// ============================================================
// COUNTRY CAMPAIGN — Multi-team conquest of real countries
// ============================================================
const COUNTRY_CAMPAIGN = {
  name: 'Country Campaign',
  description: 'Multiple teams (up to 500 each) fight for control of real-world countries. Teams may not even know other teams exist until they encounter each other.',

  // Campaign types
  types: {
    conquest: {
      name: 'Full Conquest',
      description: 'Capture and hold all strategic points in a country',
      duration: '1-7 days',
      maxTeams: 10,
      maxPerTeam: 500,
      winCondition: 'Hold capital + 60% of territory'
    },
    assassination: {
      name: 'Target Elimination',
      description: 'Find and eliminate a high-value target (VIP, leader, commander)',
      duration: '1-24 hours',
      maxTeams: 5,
      maxPerTeam: 100,
      winCondition: 'Eliminate target OR protect target for duration'
    },
    insurgency: {
      name: 'Insurgency',
      description: 'One team are insurgents hiding among civilians, others are counter-insurgents',
      duration: '2-48 hours',
      maxTeams: 4,
      maxPerTeam: 50,
      winCondition: 'Insurgents: survive. Counter: eliminate all insurgents.'
    },
    proxy_war: {
      name: 'Proxy War',
      description: 'Multiple factions backed by different teams fight for control',
      duration: '1-14 days',
      maxTeams: 8,
      maxPerTeam: 250,
      winCondition: 'Your faction controls country'
    },
    extraction: {
      name: 'VIP Extraction',
      description: 'Extract a VIP from hostile territory while other teams try to stop you',
      duration: '30 min - 4 hours',
      maxTeams: 6,
      maxPerTeam: 20,
      winCondition: 'Extract VIP OR prevent all other teams from extracting'
    }
  },

  // Multi-team simultaneous play
  parallelPlay: {
    description: '500 teams from USA can all be playing different campaigns simultaneously. They may never encounter each other. But they might.',
    discovery: 'Teams discover each other when they enter the same zone, encounter each other on the map, or when ARIA detects unknown digital signatures.',
    encounter: 'When two unknown teams meet, ARIA alerts: "Commander, I am detecting unknown friendly-or-hostile operators in your sector. They are not in our database. Advise caution."',
    interaction: 'Teams can fight, ally, ignore, or negotiate with discovered teams',
    globalImpact: 'Actions in one campaign may affect others if in same country (legacy engine)'
  },

  // Mission example: Finding a Taliban leader
  missionTemplate: {
    name: 'Target: Taliban Commander',
    type: 'assassination',
    country: 'Afghanistan',
    protocol: 'KABUL',

    phases: [
      {
        phase: 1,
        name: 'Country Scan',
        description: 'Hacker activates ARIA country scan to determine if target is in country',
        actions: [
          'ARIA scans CCTV, cellular, financial, and social media across Afghanistan',
          'ARIA reports: "Target confirmed in country. Northern region. Last seen in Kabul province 2 hours ago."',
          'ARIA begins passive monitoring of all digital channels'
        ]
      },
      {
        phase: 2,
        name: 'Target Acquisition',
        description: 'ARIA paints target location and begins live tracking',
        actions: [
          'ARIA clones targets phone — reads messages, listens to calls',
          'ARIA: "He is meeting someone at a compound 15km north of Kabul. GPS locked. Painting on squad map now."',
          'Live route appears on all squad members maps, updating every 3 seconds',
          'ARIA predicts: "Based on his route, he will arrive in 23 minutes. I recommend setting up at the compound."'
        ]
      },
      {
        phase: 3,
        name: 'Approach & Infiltration',
        description: 'Squad moves to intercept while ARIA handles security',
        actions: [
          'ARIA loops all CCTV cameras on route to compound — squad moves unseen',
          'ARIA jams local radio frequencies — guards cannot call for help',
          'ARIA pulls building blueprints from city archives',
          'ARIA: "Compound has 3 entrances, 12 guards, 2 vehicles. Guards change shift in 40 minutes. I suggest you arrive before then."',
          'Sniper team sets up on overlooking ridge with 4D fold shot capability',
          'Stealth squad infiltrates through 4D fold in the south wall'
        ]
      },
      {
        phase: 4,
        name: 'Live Combat Adaptation',
        description: 'Situation is unpredictable — ARIA adapts in real-time',
        actions: [
          'Target suddenly changes route — ARIA: "He is moving! New destination unknown. Tracking now. Updating route."',
          'ARIA: "Wait — he is heading to a different compound. He may have been tipped off. Checking for leaks... No leak detected. He may have a routine change."',
          'Commander makes decision: pursue or set ambush at likely destination',
          'ARIA predicts likely destinations based on patterns: "Three likely destinations. Probabilities: Compound B 60%, Safe House 30%, Mosque 10%"',
          'If civilians present: ARIA marks all civilian locations on map to prevent collateral',
          'If journalist spotted: ARIA: "Journalist detected 200m north. If she films you, threat level doubles. Disable or avoid."'
        ]
      },
      {
        phase: 5,
        name: 'Extraction',
        description: 'Complete mission and extract before response',
        actions: [
          'Target eliminated or captured',
          'ARIA: "Target down. You have 8 minutes before military response. I am already clearing your extraction route."',
          'ARIA disables all cameras on extraction route',
          'ARIA sends false alert to draw response forces to wrong sector',
          'Squad extracts via helicopter (pilot career) or 4D insertion point'
        ]
      }
    ],

    unpredictability: 'Target may: change route, call reinforcements, flee to caves (4D fold accessible), use human shields, switch vehicles, go dark (no phone — ARIA loses track), or set an ambush for your squad. The game is entirely unpredictable.'
  }
};

// ============================================================
// PLAYER CAREER PROFILE — Persistent across all matches
// ============================================================
const CAREER_PROFILE = {
  create: function(playerName, careerPath) {
    return {
      name: playerName,
      career: careerPath,
      careerTier: 0,
      careerXP: 0,

      // Stats (persistent across all matches)
      totalMissions: 0,
      totalKills: 0,
      totalDeaths: 0,
      totalAssists: 0,
      totalExtractions: 0,
      totalBanishments: 0,
      totalBanishmentEscapes: 0,
      totalHackActions: 0, // if hacker
      totalIntelPainted: 0, // targets painted
      totalHoursPlayed: 0,

      // Team
      teamId: null,
      teamName: null,
      teamCountry: null,
      subSquad: null, // ALPHA, BRAVO, etc.
      role: null,

      // Owned items
      ownedWeapons: [],
      ownedSkills: [],
      ownedGear: [],
      ownedUpgrades: [],
      ariaOwned: false,
      ariaLevel: 0,

      // Currencies
      chronoCoins: 1000, // starting amount
      warBonds: 0,
      scrapMetal: 0,
      darkMatter: 0,

      // Premium
      premiumTier: 'free',
      premiumExpiry: null,

      // Achievements
      achievements: {},
      badges: [],
      titles: [],
      currentTitle: 'Recruit',

      // Career progression
      careerHistory: [],
      missionsLog: []
    };
  },

  // Upgrade career tier
  upgradeCareer: function(profile) {
    const path = CAREER_PATHS[profile.career];
    if (!path) return { success: false, message: 'Invalid career path' };
    const nextTier = profile.careerTier + 1;
    if (nextTier >= path.tiers.length) return { success: false, message: 'Max tier reached' };
    const cost = path.tiers[nextTier].cost;
    if (profile.chronoCoins < cost) return { success: false, message: 'Not enough coins. Need ' + cost + ', have ' + profile.chronoCoins };
    profile.chronoCoins -= cost;
    profile.careerTier = nextTier;
    return {
      success: true,
      newTier: path.tiers[nextTier].name,
      newAbilities: path.tiers[nextTier].abilities,
      message: 'Career upgraded to ' + path.tiers[nextTier].name + '! New abilities: ' + path.tiers[nextTier].abilities.join(', ')
    };
  },

  // Buy ARIA full package
  buyAria: function(profile) {
    if (profile.ariaOwned) return { success: false, message: 'You already own ARIA Full Package' };
    const cost = CAREER_PATHS.hacker.ariaPackage.cost; // $400
    // In real implementation, this would go through payment system
    profile.ariaOwned = true;
    profile.ariaLevel = 5; // Full package
    return {
      success: true,
      message: 'ARIA Full Package activated. Welcome, operator. I am ARIA. I will be your digital warfare assistant, your tactical advisor, and apparently your entertainment. All 15 abilities unlocked. Offline training mode available. Try not to make me regret this.',
      cost: cost
    };
  }
};

// ============================================================
// LIVE MISSION TRACKING — Target painting system
// ============================================================
const LIVE_TRACKING = {
  // ARIA paints a target on the squad map
  paintTarget: function(squad, targetInfo) {
    return {
      targetName: targetInfo.name,
      targetCountry: targetInfo.country,
      timestamp: Date.now(),

      // Live position (updates every 3 seconds)
      position: {
        lat: targetInfo.lat,
        lng: targetInfo.lng,
        accuracy: '3m',
        lastUpdate: Date.now(),
        updating: true
      },

      // Predicted route (30 seconds ahead)
      predictedRoute: {
        waypoints: targetInfo.route || [],
        confidence: 0.85,
        nextStop: targetInfo.destination || 'Unknown',
        eta: targetInfo.eta || 'Unknown'
      },

      // Target details
      details: {
        vehicle: targetInfo.vehicle || 'On foot',
        guards: targetInfo.guards || 0,
        associates: targetInfo.associates || 0,
        activity: targetInfo.activity || 'Moving',
        armed: targetInfo.armed !== undefined ? targetInfo.armed : true,
        phoneActive: true,
        digitalFootprint: 'Active — ARIA monitoring all channels'
      },

      // Map painting (visible to all squad members via quantum link)
      mapPaint: {
        marker: 'primary_target',
        color: '#ff0000',
        routeLine: '#ff6600',
        predictedRoute: '#ffaa00',
        guardMarkers: '#ff3333',
        updateFrequency: 3000, // 3 seconds
        visibleTo: 'all_squad_members'
      },

      ariaLine: targetInfo.ariaLine || "Target painted. He is moving. I have his phone, his GPS, and every camera he passes. Your map is live. Do not lose him."
    };
  },

  // ARIA loses track (target goes dark)
  loseTrack: function() {
    return {
      lost: true,
      reason: 'Target phone powered off or signal jammed',
      lastKnown: 'Last position logged 45 seconds ago',
      ariaLine: "He went dark. Phone off, no GPS, no CCTV. He knows someone is tracking him. I am running facial recognition on all cameras in a 5km radius. Give me 30 seconds... I found a partial match. Reacquiring."
    };
  },

  // ARIA reacquires
  reacquire: function(newPosition) {
    return {
      reacquired: true,
      newPosition: newPosition,
      ariaLine: "Got him. He switched vehicles — clever. But not clever enough. He is in a white Toyota, heading west on the highway. Painting new route now. He will not escape again."
    };
  }
};

// ============================================================
// EXPORT
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CAREER_PATHS,
    ARIA_SYSTEM,
    SQUAD_STRUCTURES,
    RECRUITMENT,
    TAG_TEAM_BR,
    COUNTRY_CAMPAIGN,
    CAREER_PROFILE,
    LIVE_TRACKING
  };
}
