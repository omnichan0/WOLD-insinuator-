// ====== OMEGA-8D: CITIZEN INTELLIGENCE & NATION PROTOCOLS ======

// ====== 1. CITIZEN NPC SYSTEM ======
// Every civilian is an active, autonomous NPC with daily routines and loyalties

const CITIZEN_SYSTEM = {
  // Citizen behavior types
  citizenTypes: {
    civilian: {
      name: 'Civilian',
      desc: 'Regular person going about their day. Low threat detection. High panic response.',
      awareness: 0.15, loyalty: 0.3, panicLevel: 0.9, aggression: 0.0,
      detection: { heavyGear: 0.2, weapons: 0.3, dimensionalTech: 0.1, stealthOps: 0.05 },
      reaction: 'flee_and_call_police',
      routines: ['commute','shop','work','socialize','sleep']
    },
    patriot: {
      name: 'Local Patriot',
      desc: 'Loyal citizen with strong national pride. Will spot and report operators. May form militias.',
      awareness: 0.5, loyalty: 0.9, panicLevel: 0.3, aggression: 0.3,
      detection: { heavyGear: 0.6, weapons: 0.7, dimensionalTech: 0.4, stealthOps: 0.3 },
      reaction: 'report_and_resist',
      routines: ['patrol_neighborhood','monitor_strangers','community_watch','work']
    },
    informant: {
      name: 'Paid Informant',
      desc: 'Someone who sells information. Can be bought by either side. Double agents possible.',
      awareness: 0.7, loyalty: 0.0, panicLevel: 0.2, aggression: 0.1,
      detection: { heavyGear: 0.8, weapons: 0.9, dimensionalTech: 0.6, stealthOps: 0.5 },
      reaction: 'sell_intel_to_highest_bidder',
      routines: ['gather_intel','sell_info','observe','report'],
      sellable: true, // can be bought
      priceIntel: 200 // coins to buy their intel
    },
    shepherd: {
      name: 'Territorial Shepherd/Vendor',
      desc: 'Knows every inch of their territory. Spots anomalies that satellites miss. Deep local awareness.',
      awareness: 0.85, loyalty: 0.6, panicLevel: 0.2, aggression: 0.2,
      detection: { heavyGear: 0.9, weapons: 0.85, dimensionalTech: 0.7, stealthOps: 0.6 },
      reaction: 'silent_report_to_militia',
      routines: ['graze_flock','watch_territory','notice_strangers','alert_network'],
      special: 'Detects 4D shifts — knows the local terrain so well that spatial anomalies stand out'
    },
    militia: {
      name: 'Local Militia Member',
      desc: 'Armed local who will engage operators. Forms impromptu defense rings.',
      awareness: 0.6, loyalty: 0.8, panicLevel: 0.1, aggression: 0.7,
      detection: { heavyGear: 0.7, weapons: 0.8, dimensionalTech: 0.5, stealthOps: 0.4 },
      reaction: 'engage_and_rally_militia',
      routines: ['patrol','checkpoint','engage_hostiles','rally_defense'],
      armed: true, weapon: 'local_rifle', accuracy: 0.4
    },
    merchant: {
      name: 'Black Market Merchant',
      desc: 'Sells intel, weapons, and supplies. Operates in every country. Can be a double agent.',
      awareness: 0.5, loyalty: 0.0, panicLevel: 0.1, aggression: 0.0,
      detection: { heavyGear: 0.4, weapons: 0.5, dimensionalTech: 0.3, stealthOps: 0.2 },
      reaction: 'trade_or_betray',
      routines: ['trade','gather_intel','observe_market','report_to_contact'],
      sellable: true,
      sells: ['intel','ammo','medical_supplies','safe_house_access','false_documents','weapon_parts']
    },
    journalist: {
      name: 'Local Journalist',
      desc: 'Films everything. If they capture you on camera, your operation goes viral.',
      awareness: 0.4, loyalty: 0.3, panicLevel: 0.4, aggression: 0.0,
      detection: { heavyGear: 0.5, weapons: 0.6, dimensionalTech: 0.8, stealthOps: 0.3 },
      reaction: 'film_and_broadcast',
      routines: ['film_events','interview_witnesses','broadcast_live','upload_footage'],
      special: 'Filming you increases national threat level by 2x for each recording'
    }
  },

  // Generate citizens for a zone
  generateCitizens(zone, count) {
    const citizens = [];
    const types = Object.keys(this.citizenTypes);
    const weights = { civilian: 0.55, patriot: 0.15, informant: 0.05, shepherd: 0.05, militia: 0.08, merchant: 0.07, journalist: 0.05 };

    for (let i = 0; i < count; i++) {
      let type = 'civilian';
      const roll = Math.random();
      let cumulative = 0;
      for (const [t, w] of Object.entries(weights)) {
        cumulative += w;
        if (roll < cumulative) { type = t; break; }
      }

      const citizenType = this.citizenTypes[type];
      citizens.push({
        id: 'citizen_' + i,
        type: type,
        name: this.generateName(zone.countryCode),
        position: { lat: zone.center.lat + (Math.random() - 0.5) * 0.01, lng: zone.center.lng + (Math.random() - 0.5) * 0.01 },
        awareness: citizenType.awareness + Math.random() * 0.1,
        loyalty: citizenType.loyalty,
        panicLevel: citizenType.panicLevel,
        routine: citizenType.routines[Math.floor(Math.random() * citizenType.routines.length)],
        routineProgress: Math.random(),
        alive: true,
        alert: false,
        alertLevel: 0, // 0=calm, 1=suspicious, 2=spotted, 3=reporting, 4=panicking
        hasPhone: type !== 'shepherd',
        detectedOperators: [],
        lastCall: 0,
        armed: citizenType.armed || false,
        intelValue: citizenType.sellable ? (citizenType.priceIntel || 200) : 0
      });
    }
    return citizens;
  },

  generateName(countryCode) {
    const names = {
      NGA: ['Chidi','Ngozi','Emeka','Fatima','Tunde','Aisha','Bola','Kunle','Adaeze','Ibrahim'],
      USA: ['Mike','Sarah','James','Lisa','David','Karen','Chris','Amanda','Tyler','Jessica'],
      GBR: ['James','Oliver','Emma','Charlotte','Harry','Sophie','George','Amelia','Jack','Olivia'],
      FRA: ['Pierre','Marie','Jean','Sophie','Luc','Claire','Antoine','Julie','Henri','Camille'],
      DEU: ['Hans','Greta','Klaus','Anna','Wolfgang','Helga','Stefan','Lena','Markus','Petra'],
      JPN: ['Kenji','Yuki','Hiroshi','Akiko','Takeshi','Sakura','Daisuke','Mika','Ryo','Hana'],
      RUS: ['Dmitri','Olga','Sergei','Natasha','Vladimir','Irina','Boris','Yelena','Andrei','Katya'],
      AFG: ['Ahmad','Fatima','Mohammed','Zara','Hassan','Layla','Omar','Mariam','Yusuf','Aisha'],
      default: ['Alex','Sam','Jordan','Taylor','Casey','Riley','Morgan','Quinn','Avery','Blake']
    };
    const list = names[countryCode] || names.default;
    return list[Math.floor(Math.random() * list.length)];
  },

  // Citizen spots an operator
  spotCitizen(citizen, operator, operatorGear) {
    const type = this.citizenTypes[citizen.type];
    let detectionChance = 0;

    if (operatorGear.heavyGear) detectionChance = type.detection.heavyGear;
    if (operatorGear.weapon) detectionChance = Math.max(detectionChance, type.detection.weapons);
    if (operatorGear.dimensionalTech) detectionChance = Math.max(detectionChance, type.detection.dimensionalTech);
    if (operatorGear.stealthOps) detectionChance = Math.max(detectionChance, type.detection.stealthOps);

    // Adjust for citizen awareness
    detectionChance *= citizen.awareness;

    // Adjust for operator stealth
    if (operatorGear.stealthMode) detectionChance *= 0.3;
    if (operatorGear.camo) detectionChance *= 0.5;
    if (operatorGear.dim4Shift) detectionChance *= 0.7;

    const spotted = Math.random() < detectionChance;

    if (spotted) {
      citizen.alert = true;
      citizen.alertLevel = Math.min(4, citizen.alertLevel + 1);
      return this.citizenReact(citizen, operator, type);
    }
    return null;
  },

  // Citizen reacts to spotting an operator
  citizenReact(citizen, operator, type) {
    switch (type.reaction) {
      case 'flee_and_call_police':
        citizen.panicLevel = 1.0;
        return { action: 'CALL_POLICE', citizen: citizen.name, phoneCall: true, delay: 5, report: 'suspicious armed person', threat: 0.3 };

      case 'report_and_resist':
        return { action: 'REPORT_AND_RALLY', citizen: citizen.name, phoneCall: true, delay: 3, report: 'armed operator spotted', threat: 0.6, mayFormMilitia: true };

      case 'sell_intel_to_highest_bidder':
        return { action: 'SELL_INTEL', citizen: citizen.name, price: citizen.intelValue, offersToBoth: true, threat: 0.0, intel: 'operator position and loadout' };

      case 'silent_report_to_militia':
        return { action: 'SILENT_REPORT', citizen: citizen.name, phoneCall: false, delay: 10, report: 'stranger in territory — something off', threat: 0.5, special: 'detected dimensional anomaly' };

      case 'engage_and_rally_militia':
        return { action: 'ENGAGE', citizen: citizen.name, armed: true, weapon: type.weapon, threat: 0.8, ralliesOthers: 3, delay: 0 };

      case 'trade_or_betray':
        return { action: 'OFFER_TRADE', citizen: citizen.name, sells: type.sells, prices: 'negotiable', mayBetray: true, betrayalRisk: 0.3 };

      case 'film_and_broadcast':
        return { action: 'FILM', citizen: citizen.name, records: true, broadcastThreat: true, threatMultiplier: 2.0, msg: 'JOURNALIST FILMING — kill or disable before upload (10s)' };

      default:
        return { action: 'PANIC', citizen: citizen.name, flee: true, threat: 0.1 };
    }
  },

  // Form civilian defense ring
  formDefenseRing(citizens, position) {
    const militia = citizens.filter(c => c.type === 'militia' && c.alive);
    const patriots = citizens.filter(c => c.type === 'patriot' && c.alive && c.alert);
    const ring = [...militia, ...patriots];

    if (ring.length >= 3) {
      return {
        formed: true,
        members: ring.length,
        positions: ring.map(c => ({ id: c.id, angle: (ring.indexOf(c) / ring.length) * Math.PI * 2 })),
        tactic: 'surround_and_pin',
        threat: 0.9,
        msg: `${ring.length} citizens formed a defense ring around your position`
      };
    }
    return { formed: false };
  },

  // Human shield mechanic
  humanShieldScenario(enemies, citizens) {
    const hidingEnemies = enemies.filter(e => e.alive);
    const nearbyCitizens = citizens.filter(c => c.alive && !c.alert);

    if (nearbyCitizens.length > 5 && hidingEnemies.length > 0) {
      return {
        active: true,
        enemiesUsingShields: Math.min(hidingEnemies.length, 3),
        shieldCount: Math.min(nearbyCitizens.length, 15),
        msg: 'Enemies are weaving through civilian crowds — collateral damage risk HIGH',
        options: [
          { name: 'Precise shots', risk: 'low collateral', difficulty: 'high', requiresSkill: 'precision_shot' },
          { name: '4D fold shot', risk: 'zero collateral', difficulty: 'medium', requiresDim: 4, desc: 'Phase bullet through civilians' },
          { name: 'Non-lethal gas', risk: 'low', difficulty: 'low', requiresItem: 'tear_gas' },
          { name: 'Accept collateral', risk: 'HIGH', difficulty: 'none', consequence: 'threat_level +2.0, civilian_casualties', penalty: -1000 },
          { name: 'Wait for clear shot', risk: 'none', difficulty: 'patience', consequence: 'enemies may escape' }
        ]
      };
    }
    return { active: false };
  }
};

// ====== 2. CELLULAR TELEMETRY INTERCEPTION ======

const TELEMETRY_INTERCEPT = {
  // Intercept civilian phone calls and military radio chatter

  intercept(phoneCall) {
    return {
      type: phoneCall.report ? 'civilian_report' : 'military_comms',
      frequency: this.randomFreq(),
      signal: 'intercepted',
      content: phoneCall.report || 'unknown chatter',
      location: phoneCall.position,
      timestamp: Date.now(),
      actionable: phoneCall.report ? true : false,
      threatLevel: phoneCall.threat || 0.0,
      decryptTime: phoneCall.encrypted ? 5 : 0,
      channels: {
        civilian: { name: 'Civilian Band', freq: '433MHz', encryted: false, interceptable: true },
        police: { name: 'Police Band', freq: '150MHz', encrypted: false, interceptable: true },
        military: { name: 'Military Band', freq: '300MHz', encrypted: true, interceptable: true, decryptTime: 8 },
        encrypted: { name: 'Encrypted Command', freq: 'CLASSIFIED', encrypted: true, interceptable: true, decryptTime: 15, requiresHacker: true }
      }
    };
  },

  randomFreq() {
    return (Math.random() * 400 + 100).toFixed(1) + 'MHz';
  },

  // Listen to live chatter
  liveFeed(zone, citizens) {
    const calls = [];
    citizens.forEach(c => {
      if (c.alert && c.hasPhone && c.lastCall > 0) {
        calls.push({
          caller: c.name,
          type: c.type,
          message: this.generateChatter(c),
          location: c.position,
          urgency: c.alertLevel
        });
      }
    });
    return { zone: zone.name, activeCalls: calls.length, calls, msg: `${calls.length} civilian calls intercepted` };
  },

  generateChatter(citizen) {
    const chatter = {
      civilian: ['Oh my God, I see someone with a gun!', 'There are armed men near the market!', 'Call the police NOW!'],
      patriot: ['I see suspicious operators. Reporting to defense force.', 'Armed foreigners near our neighborhood. Mobilizing watch.'],
      militia: ['Contact! Armed operators at grid reference. Rally at checkpoint 3!', 'Engaging hostiles. All units converge!'],
      journalist: ['I am filming armed operators in the city. Going live in 10 seconds.', 'This footage will be on every channel.'],
      informant: ['I have intel on armed operators. Who is buying? Highest bidder.', 'Their position is yours for 200 coins.'],
      shepherd: ['Something is wrong. The land feels different. Strangers walk wrong here.', 'I know this land. Someone does not belong.'],
      merchant: ['I can sell you what you need. But it will cost extra for silence.', 'Armed operators? I know nothing... unless you have coins.']
    };
    const list = chatter[citizen.type] || chatter.civilian;
    return list[Math.floor(Math.random() * list.length)];
  }
};

// ====== 3. AI HACKER SYSTEM ======
// A team member has an AI that does hacking — even if the player knows nothing about hacking

const AI_HACKER = {
  // The AI hacker does cyber warfare for the squad automatically
  name: 'TACTICAL AI HACKER',
  desc: 'An AI module that handles all cyber warfare for the squad. The player does not need to know anything about hacking — the AI does it all, like a real military cyber warfare unit.',

  abilities: {
    // Passive abilities (always running)
    passive_scan: {
      name: 'Passive Network Scan',
      desc: 'AI continuously scans all networks in the zone. Identifies vulnerable infrastructure.',
      autoRun: true, interval: 30, // every 30s
      reveals: ['wifi_networks','security_cameras','door_systems','comms_towers','drones','traffic_lights','power_grid']
    },
    auto_encryption: {
      name: 'Auto Encryption',
      desc: 'AI encrypts all squad communications. Enemy cannot intercept squad comms.',
      autoRun: true, always: true,
      effect: { squadCommsEncrypted: true, enemyInterceptChance: 0.05 }
    },
    threat_monitor: {
      name: 'Threat Monitor',
      desc: 'AI monitors all frequencies for mentions of squad activity. Alerts squad if detected.',
      autoRun: true, interval: 10,
      monitors: ['civilian_calls','police_radio','military_comms','encrypted_channels'],
      alertIf: ['squad_position_mentioned','operator_spotted','threat_escalation']
    },

    // Active abilities (player triggers, AI executes)
    hack_cameras: {
      name: 'Hack Security Cameras',
      desc: 'AI hacks all CCTV cameras in zone. You see what they see. Full map awareness.',
      executionTime: 8, cooldown: 120,
      effect: { seeAllCameraFeeds: true, duration: 60, detectAllEnemies: true },
      cost: 0, skillCost: 800, // $80 to buy this skill
      msg: 'AI HACKER: Hacking 47 cameras... Access granted. Full visual feed active.'
    },
    hack_drones: {
      name: 'Hijack Enemy Drones',
      desc: 'AI takes control of enemy patrol drones. They now patrol for YOU.',
      executionTime: 12, cooldown: 180,
      effect: { droneControl: true, duration: 30, droneCount: 3 },
      cost: 0, skillCost: 1200, // $120
      msg: 'AI HACKER: Spoofing drone authentication... 3 drones hijacked. They are yours.'
    },
    hack_comms: {
      name: 'Intercept All Communications',
      desc: 'AI decrypts ALL enemy communications. You hear everything — civilian calls, police, military, encrypted.',
      executionTime: 15, cooldown: 200,
      effect: { interceptAll: true, decryptAll: true, duration: 45 },
      cost: 0, skillCost: 1000, // $100
      msg: 'AI HACKER: Brute-forcing encryption keys... All enemy comms decrypted. Listen up.'
    },
    blackout: {
      name: 'Grid Blackout',
      desc: 'AI shuts down the entire zone power grid. All lights, cameras, electronic locks go dark.',
      executionTime: 5, cooldown: 300,
      effect: { powerOut: true, duration: 30, camerasDown: true, locksDown: true, doorsOpen: true },
      cost: 0, skillCost: 1500, // $150
      msg: 'AI HACKER: Injecting overload code into substation... Grid is DOWN. They are blind.'
    },
    false_intel: {
      name: 'Inject False Intel',
      desc: 'AI injects false reports into enemy comms. Sends all enemy forces to wrong location.',
      executionTime: 3, cooldown: 180,
      effect: { misdirectEnemies: true, duration: 45, falseReport: 'operator_sighting_fake_location' },
      cost: 0, skillCost: 1000, // $100
      msg: 'AI HACKER: Spoofing GPS and injecting false report... Enemy forces deploying to WRONG sector.'
    },
    ghost_mode: {
      name: 'Digital Ghost Mode',
      desc: 'AI erases all digital traces of the squad. No phone pings, no camera footage, no GPS. You do not exist.',
      executionTime: 8, cooldown: 240,
      effect: { digitalInvisible: true, duration: 60, eraseCCTV: true, blockGPS: true, noPhoneTracking: true },
      cost: 0, skillCost: 1500, // $150
      msg: 'AI HACKER: Scrubbing digital footprint... You are ghosts. No digital trace exists.'
    },
    drone_swarm_hack: {
      name: 'Drone Swarm Hijack',
      desc: 'AI hijacks an entire drone swarm at once. 10+ drones now fly for your squad.',
      executionTime: 20, cooldown: 300,
      effect: { droneCount: 10, duration: 45, allDronesControlled: true },
      cost: 0, skillCost: 2000, // $200
      msg: 'AI HACKER: Exploiting swarm protocol vulnerability... 12 drones under our control. Full air dominance.'
    },
    cyber_lockdown: {
      name: 'Enemy Cyber Lockdown',
      desc: 'AI locks down ALL enemy electronics. Their drones crash. Cameras loop. Comms jammed. Total cyber blackout.',
      executionTime: 10, cooldown: 360,
      effect: { enemyCyberBlackout: true, duration: 30, enemyDronesCrash: true, enemyCommsJammed: true, enemyCamerasLoop: true },
      cost: 0, skillCost: 2500, // $250
      msg: 'AI HACKER: Deploying full-spectrum cyber weapon... Enemy is in total digital darkness.'
    },
    deep_dive: {
      name: 'Deep Intelligence Dive',
      desc: 'AI dives deep into national databases. Reveals enemy squad composition, weapons, abilities, and weaknesses.',
      executionTime: 30, cooldown: 600,
      effect: { fullIntel: true, reveals: ['enemy_squad_composition','enemy_weapons','enemy_abilities','enemy_weaknesses','enemy_positions','enemy_premium_tiers'] },
      cost: 0, skillCost: 3000, // $300
      msg: 'AI HACKER: Breaching national security database... Full enemy dossier compiled. We know everything about them.'
    },
    quantum_hack: {
      name: 'Quantum Grid Hack',
      desc: 'AI hacks the quantum grid itself. See ALL dimensional activity. Every 4D shift, 6D quantum state, 7D void, 8D cosmic — all visible.',
      executionTime: 15, cooldown: 300,
      effect: { seeAllDimensions: true, duration: 30, quantumGridAccess: true },
      cost: 0, skillCost: 3500, // $350
      reqPremium: 'OPERATIVE',
      msg: 'AI HACKER: Exploiting quantum entanglement backdoor... All dimensional activity visible. They cannot hide in ANY dimension.'
    },
    override_banish: {
      name: 'Banishment Override',
      desc: 'AI hacks the banishment system. If any squad member is banished, AI instantly opens a return gate. No waiting. No paying.',
      executionTime: 0, cooldown: 0,
      effect: { autoReturn: true, instantReturn: true, banishmentImmune: true },
      cost: 0, skillCost: 5000, // $500
      reqPremium: 'COMMANDER',
      msg: 'AI HACKER: Banishment protocol overridden. If they send you to deep space, I will bring you back instantly.'
    },
    reality_rewrite: {
      name: 'Reality Code Rewrite',
      desc: 'AI hacks the fabric of the game reality. Can alter one rule of physics for 10 seconds. Gravity off? Speed 3x? Bullets curve? Your choice.',
      executionTime: 20, cooldown: 600,
      effect: { physicsRewrite: true, duration: 10, chooseOneRule: true },
      cost: 0, skillCost: 10000, // $1000
      reqPremium: 'SUPREME',
      msg: 'AI HACKER: I have found the code that runs this reality. What rule shall I rewrite?'
    }
  },

  // AI hacker personality (makes it feel alive)
  personality: {
    name: 'ARIA',
    callsign: 'AI HACKER',
    style: 'dry military humor with efficiency',
    quotes: {
      onHack: ['Consider it done.', 'They really should update their firewall.', 'Accessing... too easy.', 'Their encryption is from 2015. Cute.', 'Bypassing in 3... 2... done.'],
      onDetect: ['I see them. You do not. That is a problem for them.', 'Threat detected. You are welcome.', 'Someone just called in your position. I jammed it.'],
      onBanish: ['They tried to banish you. I brought you back. Again.', 'Banishment protocol is MY domain now.'],
      onError: ['That was not supposed to happen.', 'Interesting. They have a competent hacker too.', 'Firewall is stronger than expected. Give me 30 more seconds.'],
      onRealityRewrite: ['I have the code. What do you want changed? Choose wisely — reality is fragile.'],
      onIdle: ['Scanning... nothing yet. I am bored.', 'Their networks are wide open. Almost feel bad. Almost.', 'I can see their entire digital infrastructure. It is embarrassing.']
    }
  },

  getQuote(category) {
    const quotes = this.personality.quotes[category] || ['...'];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  executeHack(hackType, zone, squad) {
    const hack = this.abilities[hackType];
    if (!hack) return { success: false };
    return {
      success: true,
      hack: hack.name,
      effect: hack.effect,
      duration: hack.duration || 0,
      msg: hack.msg,
      ariaQuote: this.getQuote('onHack')
    };
  }
};

// ====== 4. 20 NATION-SPECIFIC INFILTRATION PROTOCOLS ======

const NATION_PROTOCOLS_20 = {
  abuja: {
    name: 'THE ABUJA PROTOCOL', country: 'Nigeria', capital: 'Abuja',
    terrain: 'dense_urban_african', population: 'high',
    features: [
      'Dense urban topography with market districts',
      'Rapid-response mobile strike units',
      'Hyper-connected merchant networks as intelligence black markets',
      'Civilian population highly networked — phones everywhere',
      'Okada (motorcycle) units for fast response'
    ],
    citizenProfile: { civilian: 0.5, patriot: 0.2, merchant: 0.1, militia: 0.1, informant: 0.05, shepherd: 0.05 },
    hazards: ['market_crowds_block_movement','traffic_gridlock','power_outages_random','okada_response_units'],
    uniqueMechanic: 'Merchant intel network — buy live intel from 50+ merchants. Prices fluctuate based on threat level.',
    aiDefense: 'Nigerian Mobile Strike AI — fast response, urban warfare, uses civilian networks for tracking',
    escalation: ['police_response','mobile_strike_units','military_lockdown','airspace_seal']
  },
  kabul: {
    name: 'THE KABUL PROTOCOL', country: 'Afghanistan', capital: 'Kabul',
    terrain: 'mountain_urban_cave', population: 'medium',
    features: [
      'Rugged mountain terrain with cave networks',
      'Labyrinthine urban alleyways',
      'Cave-network spatial folding (4D shortcuts through mountains)',
      'Deeply entrenched insurgent AI with guerrilla tactics',
      'Low-tech guerrilla + captured high-tech gear mix',
      'Shepherds with extreme territorial awareness'
    ],
    citizenProfile: { civilian: 0.3, patriot: 0.25, shepherd: 0.15, militia: 0.2, informant: 0.05, merchant: 0.05 },
    hazards: ['mountain_ambush_points','cave_labyrinth_4d','ied_roads','insurgent_ambush','limited_visibility_dust'],
    uniqueMechanic: 'Cave network 4D folding — caves connect through the 4th dimension. Insurgent AI knows every tunnel.',
    aiDefense: 'Afghan Insurgent AI — guerrilla warfare, ambush tactics, low-tech but adaptive, captures enemy tech',
    escalation: ['local_militia','insurgent_response','mountain_lockdown','tribal_mobilization']
  },
  washington: {
    name: 'THE WASHINGTON PROTOCOL', country: 'USA', capital: 'Washington DC',
    terrain: 'urban_government', population: 'high',
    features: [
      'Biometric lockdown on all government buildings',
      'Automated federal grid shutdowns',
      'Swift heavy mechanized security deployment',
      'Every surface has sensors — pressure plates, thermal, motion',
      'Satellite surveillance redirect capability'
    ],
    citizenProfile: { civilian: 0.6, patriot: 0.15, journalist: 0.1, informant: 0.05, militia: 0.05, merchant: 0.05 },
    hazards: ['biometric_scanners','federal_grid_shutdown','automated_turrets','drone_patrols','satellite_tracking'],
    uniqueMechanic: 'Federal grid shutdown — if detected, entire zone goes into lockdown. All doors seal. All lights go red. All exits close.',
    aiDefense: 'US Federal Security AI — biometric tracking, drone swarms, satellite surveillance, mechanized response',
    escalation: ['police_response','federal_agents','swat','national_guard','military_lockdown','orbital_strike']
  },
  tokyo: {
    name: 'THE TOKYO PROTOCOL', country: 'Japan', capital: 'Tokyo',
    terrain: 'hyper_dense_vertical', population: 'extreme',
    features: [
      'Hyper-dense vertical architecture (50+ floor buildings)',
      'Rooftop transit corridors for insertion',
      'Every bystander smart device is a surveillance camera',
      'Rapid digital civilian reporting — phone app auto-reports',
      'Mech sentry units on key buildings'
    ],
    citizenProfile: { civilian: 0.65, patriot: 0.1, journalist: 0.08, informant: 0.05, militia: 0.02, merchant: 0.1 },
    hazards: ['vertical_combat_50_floors','smart_device_surveillance','mech_sentries','electromagnetic_barriers','earthquake_zones'],
    uniqueMechanic: 'Digital citizen reporting — every phone within 50m auto-photos you and uploads to security AI. Must disable phones or go 4D.',
    aiDefense: 'JDSF Tech AI — mech units, vertical combat, digital surveillance, precision electronics',
    escalation: ['police_response','sat_special_team','mech_deployment','digital_lockdown','orbital_strike']
  },
  london: {
    name: 'THE LONDON PROTOCOL', country: 'UK', capital: 'London',
    terrain: 'urban_underground', population: 'high',
    features: [
      'Thames-adjacent choke points',
      'Subterranean tube network — topological warps',
      'Legacy intelligence tracking grids (MI5/MI6)',
      'CCTV on every corner — highest density in world',
      'Rain as environmental modifier'
    ],
    citizenProfile: { civilian: 0.55, patriot: 0.15, journalist: 0.1, informant: 0.05, militia: 0.05, shepherd: 0.1 },
    hazards: ['cctv_everywhere','tube_network_3d_combat','rain_visibility','thames_choke_points','mi5_tracking'],
    uniqueMechanic: 'Tube network 4D warps — Underground stations connect through non-Euclidean space. Shortest path is NOT a straight line.',
    aiDefense: 'SAS/MI6 AI — stealth operations, CCTV tracking, rain camouflage, underground ambush',
    escalation: ['police_response','armed_response','sas_deployment','mi5_active','airspace_lockdown']
  },
  paris: {
    name: 'THE PARIS PROTOCOL', country: 'France', capital: 'Paris',
    terrain: 'historical_urban', population: 'high',
    features: [
      'Historical landmark structural security',
      'Catacomb-based underground evasion routes',
      'Civilian crowd-control barricades',
      'Seine river as natural barrier',
      'Rooftop-to-rooftop connections on Haussmann buildings'
    ],
    citizenProfile: { civilian: 0.55, patriot: 0.15, journalist: 0.1, merchant: 0.1, militia: 0.05, informant: 0.05 },
    hazards: ['catacombs_labyrinth','landmark_security','barricade_networks','seine_crossing','protest_crowds'],
    uniqueMechanic: 'Catacombs — 200 miles of underground tunnels with dimensional shortcuts. Historical spatial folding traps.',
    aiDefense: 'French Foreign Legion/GIGN AI — barricade warfare, catacomb navigation, gas attacks',
    escalation: ['police_response','gendarmerie','gign_deployment','foreign_legion','airspace_lockdown']
  },
  brasilia: {
    name: 'THE BRASILIA PROTOCOL', country: 'Brazil', capital: 'Brasilia',
    terrain: 'jungle_urban_fringe', population: 'high',
    features: [
      'Jungle-urban fringe borders',
      'Dense canopy tactical camouflage mechanics',
      'Decentralized regional militia networks',
      'Favela maze that regenerates between matches',
      'River network for amphibious insertion'
    ],
    citizenProfile: { civilian: 0.4, patriot: 0.15, militia: 0.15, shepherd: 0.1, informant: 0.1, merchant: 0.1 },
    hazards: ['jungle_concealment','favela_maze','river_crossings','wildlife_hostile','militia_networks'],
    uniqueMechanic: 'Favela regeneration — the favela maze changes every match. Walls move. Paths close. New ones open. You never know the layout.',
    aiDefense: 'BOPE AI — urban jungle warfare, favela navigation, crowd blending',
    escalation: ['police_response','military_police','bope_deployment','jungle_lockdown','airspace_lockdown']
  },
  berlin: {
    name: 'THE BERLIN PROTOCOL', country: 'Germany', capital: 'Berlin',
    terrain: 'industrial_urban', population: 'high',
    features: [
      'Heavy industrial security perimeters',
      'Automated drone-swarm defense grids',
      'Rigid checkpoint lockstep routines',
      'Underground bunker network from WWII',
      'Autobahn-adjacent fast response'
    ],
    citizenProfile: { civilian: 0.6, patriot: 0.15, journalist: 0.08, militia: 0.07, informant: 0.05, merchant: 0.05 },
    hazards: ['industrial_security','drone_swarm_defense','checkpoint_routines','bunker_network','autobahn_response'],
    uniqueMechanic: 'Drone-swarm defense grid — 20+ automated drones in coordinated patrol patterns. Must hack or destroy to pass.',
    aiDefense: 'Bundeswehr AI — methodical, engineering precision, drone swarms, tank columns',
    escalation: ['police_response','military_police','panzer_division','drone_swarm_full','airspace_lockdown']
  },
  cairo: {
    name: 'THE CAIRO PROTOCOL', country: 'Egypt', capital: 'Cairo',
    terrain: 'ancient_urban_desert', population: 'extreme',
    features: [
      'Ancient urban density — 1000+ year old streets',
      'Desert-edge transition zones',
      'Sprawling bazaar mazes that scramble radar',
      'Nile river as central barrier',
      'Pyramid and ancient site dimensional anomalies'
    ],
    citizenProfile: { civilian: 0.5, patriot: 0.15, merchant: 0.15, shepherd: 0.1, militia: 0.05, informant: 0.05 },
    hazards: ['bazaar_maze_radar_scramble','ancient_density','desert_edge','nile_crossing','pyramid_anomalies'],
    uniqueMechanic: 'Bazaar radar scramble — the dense bazaar maze completely scrambles all radar and minimap. Must navigate visually.',
    aiDefense: 'Egyptian Military AI — desert warfare, bazaar navigation, ancient ruin labyrinths',
    escalation: ['police_response','military_response','desert_lockdown','airspace_lockdown']
  },
  islamabad: {
    name: 'THE ISLAMABAD PROTOCOL', country: 'Pakistan', capital: 'Islamabad',
    terrain: 'high_altitude_urban', population: 'medium',
    features: [
      'High-altitude border friction points',
      'Multi-faction proxy AI networks',
      'Encrypted underground communication hubs',
      'Mountain pass chokepoints',
      'Multi-faction warfare — 3+ AI factions fight each other AND you'
    ],
    citizenProfile: { civilian: 0.35, patriot: 0.2, militia: 0.2, shepherd: 0.15, informant: 0.05, merchant: 0.05 },
    hazards: ['mountain_chokepoints','multi_faction_warfare','encrypted_comms','border_friction','proxy_militias'],
    uniqueMechanic: 'Multi-faction proxy war — 3 different AI factions fight each other AND you. Use the chaos to your advantage.',
    aiDefense: 'ISI Proxy AI — multi-faction, asymmetric, uses proxy militias, encrypted comms',
    escalation: ['border_guard','paramilitary','military_response','multi_faction_mobilization','airspace_lockdown']
  },
  riyadh: {
    name: 'THE RIYADH PROTOCOL', country: 'Saudi Arabia', capital: 'Riyadh',
    terrain: 'modern_desert', population: 'medium',
    features: [
      'Ultra-modern neon-lit structural grids',
      'High-speed desert transit intercepts',
      'Automated financial asset freezes during operations',
      'Oil infrastructure as environmental hazard',
      'Air superiority focus'
    ],
    citizenProfile: { civilian: 0.6, patriot: 0.15, merchant: 0.1, informant: 0.05, militia: 0.05, journalist: 0.05 },
    hazards: ['desert_transit_intercepts','financial_freeze','oil_fire_zones','air_superiority','limited_cover'],
    uniqueMechanic: 'Financial asset freeze — when detected, your in-game coin balance is frozen. Cannot buy anything until you escape or hack the system.',
    aiDefense: 'Saudi Royal Guard AI — air superiority, wealth-based defense, desert intercepts',
    escalation: ['border_guard','royal_guard','air_superiority','airspace_lockdown','precision_strike']
  },
  seoul: {
    name: 'THE SEOUL PROTOCOL', country: 'South Korea', capital: 'Seoul',
    terrain: 'cyber_urban_underground', population: 'extreme',
    features: [
      'Underground mega-city subway webs',
      'Cyber-integrated civilian populations',
      'High-frequency drone patrol overlaps',
      'Smart city grid — everything is connected',
      'K-pop psyops as disorientation weapon'
    ],
    citizenProfile: { civilian: 0.65, patriot: 0.1, journalist: 0.1, merchant: 0.08, militia: 0.02, informant: 0.05 },
    hazards: ['subway_mega_web','cyber_civilian_reporting','drone_overlaps','smart_grid_tracking','k_pop_psyops'],
    uniqueMechanic: 'Smart city grid — the entire city is one connected system. Hack one node, you access everything. But one alarm triggers EVERYTHING.',
    aiDefense: 'ROK Cyber AI — cyber warfare, smart grid integration, drone overlaps, electronic countermeasures',
    escalation: ['police_response','cyber_lockdown','military_response','drone_swarm_full','precision_strike']
  },
  buenos_aires: {
    name: 'THE BUENOS AIRES PROTOCOL', country: 'Argentina', capital: 'Buenos Aires',
    terrain: 'coastal_urban', population: 'high',
    features: [
      'Coastal dockyard labyrinths',
      'Sprawling residential verticality (favela-style)',
      'Tight-knit community warning systems',
      'Tango district crowd cover',
      'Port authority as additional security layer'
    ],
    citizenProfile: { civilian: 0.55, patriot: 0.15, merchant: 0.1, militia: 0.1, informant: 0.05, journalist: 0.05 },
    hazards: ['dockyard_labyrinth','residential_verticality','community_warning','crowd_cover','port_authority'],
    uniqueMechanic: 'Community warning system — neighborhoods have WhatsApp-style group chats that spread sightings instantly. One spot = whole district knows.',
    aiDefense: 'Argentine Special Forces AI — dockyard warfare, community intelligence, crowd tactics',
    escalation: ['police_response','coast_guard','special_forces','military_response','airspace_lockdown']
  },
  ottawa: {
    name: 'THE OTTAWA PROTOCOL', country: 'Canada', capital: 'Ottawa',
    terrain: 'wilderness_urban_transition', population: 'low',
    features: [
      'Vast wilderness-to-urban transition zones',
      'Extreme weather hazard modifiers (blizzards, ice)',
      'Remote outpost early-warning relays',
      'Forest concealment for both sides',
      'Parliament Hill high-security zone'
    ],
    citizenProfile: { civilian: 0.6, patriot: 0.15, shepherd: 0.1, journalist: 0.05, militia: 0.05, merchant: 0.05 },
    hazards: ['extreme_cold','blizzard_visibility','ice_slippery','wilderness_isolation','early_warning_relays'],
    uniqueMechanic: 'Blizzard modifier — random blizzards reduce visibility to 5m for 20s. Everyone is blind. Use thermal or 4D to see.',
    aiDefense: 'JTF2 AI — winter warfare, wilderness tracking, cold-weather operations',
    escalation: ['police_response','rcmp','jtf2_deployment','military_response','airspace_lockdown']
  },
  new_delhi: {
    name: 'THE NEW DELHI PROTOCOL', country: 'India', capital: 'New Delhi',
    terrain: 'chaotic_urban_extreme', population: 'extreme',
    features: [
      'Overwhelming foot-traffic density (highest in world)',
      'Chaotic multi-layered transit infrastructure',
      'Rapid-assembly local crowd-response behaviors',
      'Cows and livestock as mobile obstacles',
      'Monsoon as environmental modifier'
    ],
    citizenProfile: { civilian: 0.5, patriot: 0.15, shepherd: 0.1, militia: 0.1, merchant: 0.1, informant: 0.05 },
    hazards: ['extreme_foot_traffic','multi_layer_transit','crowd_response','livestock_obstacles','monsoon_flooding'],
    uniqueMechanic: 'Crowd density — 1000+ civilians create living cover. Hard to target enemies. Easy to get lost. Easy to get spotted.',
    aiDefense: 'Indian Army AI — crowd warfare, terrain advantage, massive numbers, monsoon operations',
    escalation: ['police_response','paramilitary','military_response','crowd_lockdown','airspace_lockdown']
  },
  rome: {
    name: 'THE ROME PROTOCOL', country: 'Italy', capital: 'Rome',
    terrain: 'ancient_modern_overlay', population: 'high',
    features: [
      'Ancient subterranean ruins intersect modern infrastructure',
      'Multi-tiered historical spatial folding traps',
      'Colosseum zone as arena battlefield',
      'Vatican high-security zone',
      'Narrow medieval streets limit vehicle access'
    ],
    citizenProfile: { civilian: 0.55, patriot: 0.15, journalist: 0.1, merchant: 0.1, militia: 0.05, informant: 0.05 },
    hazards: ['ancient_ruins_below','spatial_folding_traps','narrow_streets','vatican_security','tourist_crowds'],
    uniqueMechanic: 'Historical spatial folding — Roman ruins create 4D shortcuts. A modern street and an ancient tunnel can connect through the 4th dimension.',
    aiDefense: 'Italian GIS AI — urban warfare, historical site navigation, narrow street combat',
    escalation: ['police_response','carabinieri','gis_deployment','military_response','airspace_lockdown']
  },
  bangkok: {
    name: 'THE BANGKOK PROTOCOL', country: 'Thailand', capital: 'Bangkok',
    terrain: 'waterway_urban_tropical', population: 'extreme',
    features: [
      'Water-way transit networks (khlongs/canals)',
      'Floating market dynamic cover systems',
      'Dense humidity interference affecting thermal optics',
      'Temple complexes as combat zones',
      'Tuk-tuk and motorcycle response units'
    ],
    citizenProfile: { civilian: 0.55, patriot: 0.15, merchant: 0.15, militia: 0.05, shepherd: 0.05, journalist: 0.05 },
    hazards: ['waterway_combat','humidity_thermal_interference','floating_market_cover','temple_zones','tuktuk_response'],
    uniqueMechanic: 'Humidity interference — 90% humidity degrades ALL thermal optics and laser sights. You see blurred. Adapt or go 4D.',
    aiDefense: 'Thai Special Warfare AI — waterway combat, tropical adaptation, crowd navigation',
    escalation: ['police_response','military_response','special_warfare','airspace_lockdown']
  },
  singapore: {
    name: 'THE SINGAPORE PROTOCOL', country: 'Singapore', capital: 'Singapore',
    terrain: 'smart_city_maritime', population: 'extreme',
    features: [
      'Ultra-secure maritime choke points',
      'Automated vertical security pods',
      'Hyper-monitored smart-city grid architecture',
      'Every surface has sensors — zero blind spots',
      'Port authority + coast guard + military triple layer'
    ],
    citizenProfile: { civilian: 0.6, patriot: 0.15, journalist: 0.1, merchant: 0.1, militia: 0.03, informant: 0.02 },
    hazards: ['maritime_chokepoints','vertical_security_pods','smart_grid_total','zero_blind_spots','triple_layer_defense'],
    uniqueMechanic: 'Zero blind spots — Singapore has NO dark corners. Every meter is monitored. Stealth is nearly impossible without 4D or AI hacker.',
    aiDefense: 'SAF Cyber AI — smart city integration, total surveillance, maritime defense, cyber warfare',
    escalation: ['police_response','cyber_lockdown','military_response','maritime_lockdown','precision_strike']
  },
  bogota: {
    name: 'THE BOGOTA PROTOCOL', country: 'Colombia', capital: 'Bogota',
    terrain: 'mountain_urban_high_altitude', population: 'high',
    features: [
      'Mountainous high-altitude urban climbs',
      'Steep vertical zipline insertion routes',
      'Localized civilian tracking networks',
      'Narrow mountain streets with cliff hazards',
      'Cartel infrastructure as additional faction'
    ],
    citizenProfile: { civilian: 0.4, patriot: 0.15, militia: 0.2, informant: 0.1, shepherd: 0.1, merchant: 0.05 },
    hazards: ['mountain_climbs','cliff_fall_hazard','zipline_routes','civilian_tracking','cartel_presence'],
    uniqueMechanic: 'Cartel faction — a THIRD faction (drug cartel) operates independently. They fight military, you, AND each other. Unpredictable.',
    aiDefense: 'Colombian Special Forces AI — mountain warfare, vertical combat, anti-cartel operations',
    escalation: ['police_response','military_response','special_forces','cartel_intervention','airspace_lockdown']
  },
  tehran: {
    name: 'THE TEHRAN PROTOCOL', country: 'Iran', capital: 'Tehran',
    terrain: 'fortified_underground_electronic', population: 'high',
    features: [
      'Deeply fortified underground installations',
      'Electronic warfare jamming fields',
      'Ideological militia response algorithms',
      'Mosque complexes as sanctuary zones',
      'Bazaar as intel trading hub'
    ],
    citizenProfile: { civilian: 0.45, patriot: 0.25, militia: 0.15, shepherd: 0.05, merchant: 0.05, informant: 0.05 },
    hazards: ['underground_fortifications','ew_jamming','ideological_militia','mosque_sanctuaries','bazaar_intel'],
    uniqueMechanic: 'Ideological militia — militia do not retreat. Ever. They fight to the death because of ideology. No surrender mechanic.',
    aiDefense: 'IRGC AI — asymmetric warfare, underground networks, electronic warfare, ideological commitment',
    escalation: ['basij_response','irgc_deployment','electronic_warfare_full','underground_lockdown','missile_strike']
  }
};

// ====== EXPORT ======
if (typeof module !== 'undefined') {
  module.exports = {
    CITIZEN_SYSTEM, TELEMETRY_INTERCEPT, AI_HACKER, NATION_PROTOCOLS_20
  };
}
