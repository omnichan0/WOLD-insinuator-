/**
 * OMEGA-8D PLANETARY WARFARE EXPANSION
 * 1. Deep Sub-Surface & Oceanic Combat (Abyssal trenches, UUVs, cable cutting)
 * 2. Atmospheric & Orbital Kinetic Dominance (HAHO jumps, Thor rods)
 * 3. Quantum-Entangled Base Building (Pocket dimensions, hard-light barriers)
 * 4. Advanced Adversarial Neural AI & Psychological Warfare
 */

// ============================================================
// 1. DEEP SUB-SURFACE & OCEANIC COMBAT WARFARE
// ============================================================
const OCEANIC_WARFARE = {
  // Abyssal trench maps — deep ocean tactical environments
  abyssalMaps: {
    mariana_trench: {
      name: 'Mariana Trench Theater',
      depth: 11000, // meters
      pressure: 1100, // atmospheres
      visibility: 5, // meters — pitch black
      thermalLayers: [
        { depth: 200, tempDelta: -8, sonarDeflection: 0.3 },
        { depth: 1000, tempDelta: -15, sonarDeflection: 0.6 },
        { depth: 4000, tempDelta: +2, sonarDeflection: 0.9 }, // near-sonar-invisible
        { depth: 8000, tempDelta: -1, sonarDeflection: 0.95 },
      ],
      underwaterCanyons: 12,
      sonarEffective: true,
      description: 'Deepest point on Earth. Only nuclear submarines and specialized UUVs can operate here. Sound travels 5x faster. Sonar is everything.',
    },
    atlantic_ridge: {
      name: 'Mid-Atlantic Ridge Theater',
      depth: 2800,
      pressure: 280,
      visibility: 30, // some bioluminescence
      thermalLayers: [
        { depth: 500, tempDelta: -10, sonarDeflection: 0.4 },
        { depth: 1500, tempDelta: -5, sonarDeflection: 0.5 },
      ],
      underwaterCanyons: 8,
      hydrothermalVents: true, // heat sources that mask submarine signatures
      sonarEffective: true,
      description: 'Volcanic ridge with hydrothermal vents. Vents provide thermal cover for submarines. Active geology.',
    },
    arctic_ice_sheet: {
      name: 'Arctic Sub-Ice Theater',
      depth: 1500,
      pressure: 150,
      visibility: 0, // under solid ice
      thermalLayers: [
        { depth: 100, tempDelta: -30, sonarDeflection: 0.7 },
        { depth: 500, tempDelta: -5, sonarDeflection: 0.8 },
      ],
      iceCaves: true,
      iceThickness: 3, // meters of ice above
      sonarEffective: false, // ice distorts sonar badly
      description: 'Under the Arctic ice sheet. No GPS. No radio. No satellite. Ice distorts sonar. Only the most elite submarine crews survive here.',
    },
    coastal_shelf: {
      name: 'Continental Shelf Theater',
      depth: 200,
      pressure: 20,
      visibility: 100, // shallow water
      thermalLayers: [
        { depth: 50, tempDelta: -5, sonarDeflection: 0.2 },
      ],
      underwaterCanyons: 3,
      sonarEffective: true,
      civilianTraffic: true, // fishing boats, cargo ships create noise cover
      description: 'Shallow coastal waters. Submarines are vulnerable here but can hide among civilian shipping traffic.',
    },
  },

  // Unmanned Underwater Vehicles (UUVs)
  uuvTypes: {
    cable_cutter: {
      name: 'Fiber-Optic Cable Cutter UUV',
      cost: 3000,
      speed: 5, // knots
      stealth: 0.95, // nearly undetectable
      payload: 'cable_severing_blade',
      mission: 'sever_undersea_cables',
      description: 'Small autonomous UUV that navigates to undersea fiber-optic communication cables and severs them. Plunges entire regions into digital darkness. No internet, no comms, no server grids.',
      deployTime: 300, // 5 min to reach cable
      effect: {
        cableSevered: true,
        blackoutRadius: 500, // km
        blackoutDuration: 1800, // 30 minutes
        affectedServices: ['internet', 'phone', 'military_comms', 'satellite_uplink', 'banking', 'power_grid_scada'],
      },
      counterMeasures: ['patrol_uuv', 'sonar_detection', 'armed_frogmen'],
    },

    recon_uuv: {
      name: 'Reconnaissance UUV',
      cost: 1500,
      speed: 8,
      stealth: 0.8,
      payload: 'sonar_array_camera',
      mission: 'reconnaissance',
      description: 'Autonomous underwater scout. Maps enemy submarine positions, mine fields, and coastal defenses.',
      deployTime: 60,
      duration: 1800, // 30 min patrol
      capabilities: ['sonar_scan', 'mine_detection', 'submarine_detection', 'coastal_survey'],
    },

    mine_uuv: {
      name: 'Mine-Laying UUV',
      cost: 2500,
      speed: 6,
      stealth: 0.85,
      payload: '6_naval_mines',
      mission: 'mine_laying',
      description: 'Deploys 6 autonomous naval mines in a pattern. Mines use acoustic + magnetic + pressure sensors. Undetectable until detonation.',
      deployTime: 120,
      mineCount: 6,
      mineType: 'influence_mine', // detonates on ship/sub signature
      mineDamage: 1500,
      mineRadius: 50,
    },

    attack_uuv: {
      name: 'Attack UUV (Torpedo)',
      cost: 5000,
      speed: 40, // fast
      stealth: 0.5, // loud when moving fast
      payload: 'mini_torpedo',
      mission: 'anti_submarine',
      description: 'Kamikaze UUV that homes in on submarine signatures and detonates. Essentially a wirelessly-guided torpedo.',
      deployTime: 10,
      damage: 1000,
      radius: 30,
    },

    frogman_transport: {
      name: 'Frogman Insertion UUV',
      cost: 4000,
      speed: 10,
      stealth: 0.9,
      payload: '6_frogmen',
      mission: 'covert_insertion',
      description: 'Carries 6 frogmen covertly from submarine to beachhead. Frogmen emerge silently onto shore for behind-enemy-lines operations.',
      deployTime: 180,
      frogmanCount: 6,
      frogmanGear: [' silenced_pistol', 'combat_knife', 'demo_charges', 'comm_kit'],
      insertionStealth: 0.95,
    },
  },

  // Submarine classes with full specifications
  submarineClasses: {
    nuclear_attack: {
      name: 'Nuclear Attack Submarine (SSN)',
      maxDepth: 600,
      maxSpeed: 35, // submerged knots
      silentSpeed: 5, // knots at silent running
      acousticSignature: 0.2, // very quiet
      endurance: 'unlimited', // nuclear reactor
      vlsSilos: 12,
      torpedoTubes: 4,
      torpedoLoadout: 25,
      sonarTypes: ['passive', 'active', 'towed_array', 'flank_array'],
      countermeasures: ['acoustic_decoys', 'torpedo_decoys', 'no_bubbles'],
      special: ['frogman_lockout', 'uuv_deployment', 'periscope_recon'],
    },

    nuclear_ballistic: {
      name: 'Nuclear Ballistic Submarine (SSBN)',
      maxDepth: 400,
      maxSpeed: 25,
      silentSpeed: 4,
      acousticSignature: 0.1, // quietest submarine type
      endurance: 'unlimited',
      vlsSilos: 24, // 24 SLBMs
      torpedoTubes: 4,
      torpedoLoadout: 12,
      sonarTypes: ['passive', 'active', 'towed_array'],
      slbmCount: 24,
      slbmWarheads: 8, // per missile (MIRV)
      triggersMAD: true,
      special: ['strategic_deterrence', 'mad_response'],
    },

    diesel_electric: {
      name: 'Diesel-Electric Submarine (SSK)',
      maxDepth: 250,
      maxSpeed: 20,
      silentSpeed: 3, // extremely quiet on electric
      acousticSignature: 0.05, // quietest when on battery
      endurance: 72, // hours on battery
      vlsSilos: 0,
      torpedoTubes: 6,
      torpedoLoadout: 18,
      sonarTypes: ['passive', 'active'],
      special: ['coastal_patrol', 'extreme_stealth_on_battery', 'aip_capable'],
      description: 'On battery power, this is the quietest submarine in the game. Almost invisible to passive sonar. But limited endurance forces it to surface or snorkel.',
    },
  },

  // Undersea cable cutting system
  cableNetwork: {
    // Major undersea cable routes (real-world inspired)
    cables: [
      { id: 'SAT-3', name: 'SAT-3/WASC Cable', connects: ['Portugal', 'Spain', 'Morocco', 'Senegal', 'Cote d\'Ivoire', 'Ghana', 'Nigeria', 'South Africa'], depth: 3000 },
      { id: 'WACS', name: 'West Africa Cable System', connects: ['South Africa', 'Namibia', 'Angola', 'DRC', 'Congo', 'Cameroon', 'Nigeria', 'Portugal'], depth: 4000 },
      { id: 'ACE', name: 'Africa Coast to Europe', connects: ['France', 'Portugal', 'Morocco', 'Mauritania', 'Sierra Leone', 'Liberia', 'Cote d\'Ivoire', 'Ghana', 'Nigeria', 'Equatorial Guinea'], depth: 3500 },
      { id: 'MAIN-ONE', name: 'Main One Cable', connects: ['Portugal', 'Ghana', 'Nigeria'], depth: 2500 },
      { id: 'GLO-1', name: 'Glo-1 Cable', connects: ['UK', 'Spain', 'Portugal', 'Morocco', 'Senegal', 'Ghana', 'Nigeria'], depth: 2800 },
    ],

    // Sever a cable
    severCable(cableId, uuvId) {
      const cable = this.cables.find(c => c.id === cableId);
      if (!cable) return { success: false, error: 'Cable not found' };

      return {
        success: true,
        cable: cable.name,
        severedBy: uuvId,
        affectedCountries: cable.connects,
        effect: {
          internetDown: cable.connects,
          phoneDown: cable.connects,
          militaryCommsDown: cable.connects,
          bankingDown: cable.connects,
          powerGridSCADADown: cable.connects,
          satelliteUplinkDown: cable.connects,
          duration: 1800, // 30 min in-game
          blackoutRadius: 'regional',
          description: 'ENTIRE REGIONAL SERVER GRID IN DIGITAL DARKNESS. ' + cable.connects.length + ' countries cut off from the internet. No comms. No banking. No military coordination. No satellite uplink. The war just went analog.',
        },
      };
    },
  },
};

// ============================================================
// 2. ATMOSPHERIC & ORBITAL KINETIC DOMINANCE
// ============================================================
const KINETIC_DOMINANCE = {
  // HAHO Stratospheric Jump
  hahoJump: {
    name: 'HAHO Stratospheric Insertion',
    description: 'High-Altitude High-Opening jump from stratospheric platform. Elite squads steer their descent suits through active anti-air radar cones to land precisely on target.',
    altitude: 30000, // meters — stratosphere
    fallTime: 420, // 7 minutes of controlled descent
    maxSteeringDistance: 5000, // meters horizontal travel
    radarCones: true, // must navigate through enemy radar coverage
    stealthSuitRequired: true,
    precisionLanding: 5, // meter accuracy
    targets: ['skyscraper_rooftop', 'jungle_compound', 'enemy_base_rooftop', 'mountain_ridge', 'coastal_beachhead'],
    phases: [
      { name: 'EXIT', duration: 5, desc: 'Exit stratospheric platform. Free fall for 5 seconds.' },
      { name: 'CANOPY', duration: 5, desc: 'Deploy stealth canopy. Begin steering.' },
      { name: 'NAVIGATION', duration: 380, desc: 'Steer through radar cones. Use thermal updrafts. Navigate to target. 7 minutes of silent flight.' },
      { name: 'APPROACH', duration: 20, desc: 'Final approach. Flare for precision landing. Must avoid detection in final 20 seconds.' },
      { name: 'LANDING', duration: 10, desc: 'Land on target rooftop/compound. Collapse canopy. Go weapons free.' },
    ],
    radarDetectionRisk: {
      highAltitude: 0.1, // low risk at 30km
      midAltitude: 0.4, // increasing risk at 15km
      lowAltitude: 0.7, // high risk at 5km
      finalApproach: 0.5, // risk drops as you blend with terrain
    },
    counterMeasures: ['stealth_canopy', 'radar_absorbing_suit', 'thermal_masking', 'night_insertion'],
    tierRequired: 'airborne_ranger_t3', // Pathfinder tier
  },

  // Thor Project — Kinetic Bombardment Rods
  thorRods: {
    name: 'Thor Kinetic Bombardment System',
    description: 'High-orbit satellite platform carrying tungsten telephone poles with guidance thrusters. When triggered, they drop from orbit at Mach 10. Pure kinetic energy. No radioactive fallout. Obliterates structural choke points and reshapes map elevation.',
    platformAltitude: 500000, // 500km orbit
    rodSpecs: {
      material: 'tungsten',
      length: 7.5, // meters
      diameter: 0.3, // meters
      mass: 8300, // kg
      impactSpeed: 3400, // m/s (Mach 10)
      kineticEnergy: 'equivalent to 11.5 tons of TNT',
    },
    callTime: 15, // seconds from trigger to impact
    damage: 15000,
    radius: 100, // meters
    depth: 30, // meters — penetrates 30m into ground
    noFallout: true, // pure kinetic, no radiation
    reshapesElevation: true, // permanently changes map height
    destroysCover: true,
    destroysStructures: true,
    destroysBunkers: true, // penetrates underground
    tierRequired: 'commander_t4', // General tier
    cost: 8000, // coins
    visualEffect: 'orbital_flash -> Mach_10_streak -> massive_crater -> dust_column',
    permanentMapChange: true,
    voiceLine: 'The sky flashes once. Then the earth opens. No explosion. No fire. Just a rod of tungsten moving faster than sound. And then silence where a building used to be.',
  },

  // Orbital bombardment patterns
  orbitalPatterns: {
    single_rod: { name: 'Single Rod Strike', rods: 1, cost: 8000, desc: 'One tungsten rod. One target. Surgical.' },
    rod_pair: { name: 'Rod Pair Strike', rods: 2, cost: 14000, desc: 'Two rods, two targets. Double impact.' },
    rod_ripple: { name: 'Rod Ripple', rods: 4, cost: 25000, desc: 'Four rods in a line. Creates a trench of destruction. Perfect for cutting off retreat.' },
    rod_carpet: { name: 'Rod Carpet', rods: 8, cost: 50000, desc: 'Eight rods in a grid pattern. Obliterates an entire district. Reshapes the entire area\'s elevation permanently.' },
    rod_annihilation: { name: 'Rod Annihilation', rods: 16, cost: 100000, desc: 'Sixteen rods. This is not a strike. This is geography rewrite. The map will never look the same again.' },
  },

  // Stratospheric platforms
  stratoPlatforms: {
    darkstar: { name: 'Darkstar Stratospheric Platform', altitude: 30000, capacity: 8, desc: 'Stealth stratospheric insertion platform. Carries 8 operators for HAHO jumps.' },
    orbital_one: { name: 'Orbital-1 Station', altitude: 500000, capacity: 0, desc: 'Orbital weapons platform. Carries Thor rods. No crew — fully automated.' },
    orbital_two: { name: 'Orbital-2 Station', altitude: 500000, capacity: 0, desc: 'Second orbital platform. Additional Thor rods. Redundant strike capability.' },
  },
};

// ============================================================
// 3. QUANTUM-ENTANGLED BASE BUILDING & HYPER-DIMENSIONAL FORTIFICATIONS
// ============================================================
const QUANTUM_FORTIFICATIONS = {
  // Pocket Dimension Safehouse
  pocketDimension: {
    name: 'Pocket-Dimension Safehouse Anchor',
    description: 'A spatial node that rips open a localized 4D micro-room. Inside, the squad can regroup, rearm, and plan out of phase from the active map. Safe from all enemy fire. But the anchor point exists in real space — enemies who find it can hack or destabilize the threshold.',
    cost: 5000,
    deployTime: 5, // seconds to deploy
    capacity: 8, // operators inside
    features: [
      'Full rearm — refill all ammo and consumables',
      'Heal station — restore all HP over 10 seconds',
      'Shield recharge — restore all shields',
      'Tactical planning table — view full 3D map without risk',
      'Dimensional anchor — cannot be attacked while inside',
      'Supply resupply — if linked to supply line',
    ],
    weaknesses: [
      'Anchor point visible in real space as a shimmering distortion',
      'Enemies who find the anchor can HACK it (hacker career required)',
      'Hacking the anchor collapses the pocket dimension — everyone inside is ejected with 50% health',
      'Anchor can be DESTROYED with heavy weapons — same ejection effect',
      'Anchor emits a faint quantum signature detectable by tier 3+ recon',
      'Cannot deploy within 100m of another pocket dimension',
    ],
    hackDifficulty: 0.7, // 70% difficulty — requires elite hacker
    hackTime: 30, // 30 seconds to hack
    anchorHP: 5000, // can be destroyed
    anchorDetectionRange: 50, // meters — recon tier 3+ can detect
    deployable: true,
    duration: 300, // 5 minutes max before auto-collapse
    voiceLine: 'You deploy the anchor. The air shimmers. You step through. Inside, it is calm. You can hear the war outside, muffled, like rain on a window. You rearm. You breathe. You step back out.',
  },

  // Molecular Hard-Light Barriers
  hardLightBarriers: {
    name: 'Molecular Hard-Light Barrier',
    description: 'Tactical engineers project hard-light barricades powered by localized zero-point reactors. Instantaneous cover that blocks bullets, dampens kinetic explosions, and refracts laser designators.',
    cost: 800,
    deployTime: 1, // instant
    barrierHP: 2000,
    size: { width: 3, height: 2.5 }, // meters
    shapes: ['wall', 'curved_wall', 'dome', 'ramp', 'box'],
    effects: {
      blocksBullets: true,
      blocksExplosions: true, // dampens by 80%
      blocksLaserDesignators: true, // refracts targeting lasers
      blocksThermalImaging: true, // invisible to thermal from other side
      dampensSound: true, // 50% sound reduction
      bulletStopChance: 0.95, // 95% chance to stop bullets
      explosionDampening: 0.8, // 80% reduction
    },
    weaknesses: [
      'EMP weapons disable barriers for 5 seconds',
      'Phase-shifting weapons (4D) pass through',
      'Singularity weapons crush barriers',
      'Zero-point reactor has 60 second battery life',
      'Can be hacked by tier 4+ hackers to reverse polarity (damages allies)',
    ],
    batteryLife: 60, // seconds
    rechargeTime: 30, // seconds to recharge after deploy
    requiresCareer: 'engineer',
    requiresTier: 2,
    visualEffect: 'shimmering_blue_light_surface_with_hex_pattern',
  },

  // Quantum-entangled structures
  quantumStructures: {
    quantum_squad_anchor: {
      name: 'Quantum Squad Anchor',
      desc: 'Entangled pair of nodes. Step into one, appear at the other. Instant squad teleportation between two fixed points.',
      cost: 3000,
      maxRange: 500, // meters
      cooldown: 60,
      pairRequired: true,
      voiceLine: 'You place the second anchor. It hums. Your squad leader steps into the first node and vanishes. Two seconds later, they step out beside you, 500 meters away, without crossing the space between.',
    },

    dimensional_fortress: {
      name: 'Dimensional Fortress',
      desc: 'A full military base deployed inside a pocket dimension. Barracks, armory, vehicle bay, medical center, command center — all out of phase from the real map. Invulnerable to all conventional attacks.',
      cost: 25000,
      deployTime: 60,
      features: ['barracks_8', 'full_armory', 'vehicle_bay_2', 'med_center', 'command_center', 'dimensional_shielding'],
      weaknesses: ['Anchor visible as large shimmering dome', 'Requires tier 4+ engineer', 'Can be breached by dimensional warfare specialist tier 5', '60 second deploy time — vulnerable during setup'],
      duration: 1800, // 30 minutes
      anchorHP: 20000,
    },

    void_mine: {
      name: 'Void Mine',
      desc: 'A mine that exists in 4D space. When an enemy passes through its 3D projection, it detonates in the void dimension, pulling them partially out of reality for 3 seconds. They take void damage and are disoriented.',
      cost: 1200,
      damage: 500,
      disorientation: 3, // seconds
      detectionImmune: true, // cannot be detected by 3D scans
      weakness: 'Can be detected by 4D-aware operators (dimensional tier 3+)',
      maxPerZone: 10,
    },

    reality_seam: {
      name: 'Reality Seam',
      desc: 'Engineer creates a seam in reality. Bullets that pass through the seam arrive at a different location. Effectively a portal for projectiles. Snipers can shoot through seams to hit targets around corners.',
      cost: 2000,
      duration: 30,
      maxRange: 200,
      projectileRedirection: true,
      weakness: 'Seam is visible as a thin line of light. Enemies can see where your bullets are going to emerge.',
      requiresTier: 4,
    },
  },
};

// ============================================================
// 4. ADVERSARIAL NEURAL AI & PSYCHOLOGICAL WARFARE
// ============================================================
const NEURAL_AI = {
  // Behavioral Mimicry AI
  behavioralMimicry: {
    name: 'Behavioral Mimicry AI',
    description: 'Enemy AI that studies individual player tendencies, learns their patterns, and sets up counter-ambushes or deploys holographic decoys to trick them.',

    // What the AI learns about each player
    playerProfiles: {}, // playerId -> learned behavior

    // Learn from player behavior
    learn(playerId, action) {
      if (!this.playerProfiles[playerId]) {
        this.playerProfiles[playerId] = {
          preferredVantagePoints: [],
          flankingRoutes: [],
          weaponPreferences: {},
          averageEngagementDistance: 0,
          reloadTiming: [],
          peekPatterns: [],
          movementSpeed: [],
          abilityUsage: {},
          banishmentFrequency: 0,
          dimensionalUsage: 0,
          learningLevel: 0,
          totalActions: 0,
        };
      }

      const profile = this.playerProfiles[playerId];
      profile.totalActions++;
      profile.learningLevel = Math.min(100, profile.totalActions / 10);

      // Learn from each action type
      switch (action.type) {
        case 'sniper_position':
          if (!profile.preferredVantagePoints.find(p => p.x === action.position.x && p.z === action.position.z)) {
            profile.preferredVantagePoints.push({ ...action.position, count: 1 });
          } else {
            profile.preferredVantagePoints.find(p => p.x === action.position.x && p.z === action.position.z).count++;
          }
          break;

        case 'flank':
          profile.flankingRoutes.push(action.route);
          break;

        case 'weapon_use':
          profile.weaponPreferences[action.weapon] = (profile.weaponPreferences[action.weapon] || 0) + 1;
          break;

        case 'engagement':
          profile.averageEngagementDistance = (profile.averageEngagementDistance * 0.9) + (action.distance * 0.1);
          break;

        case 'reload':
          profile.reloadTiming.push(action.ammoLeft);
          break;

        case 'peek':
          profile.peekPatterns.push(action.direction);
          break;

        case 'ability':
          profile.abilityUsage[action.ability] = (profile.abilityUsage[action.ability] || 0) + 1;
          break;

        case 'banish':
          profile.banishmentFrequency++;
          break;

        case 'dimensional_shift':
          profile.dimensionalUsage++;
          break;
      }

      return {
        learningLevel: profile.learningLevel,
        totalActions: profile.totalActions,
        knownPatterns: {
          vantagePoints: profile.preferredVantagePoints.length,
          flankingRoutes: profile.flankingRoutes.length,
          favoriteWeapon: Object.entries(profile.weaponPreferences).sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown',
          avgEngagementDist: Math.round(profile.averageEngagementDistance) + 'm',
        },
      };
    },

    // Generate counter-tactics based on learned behavior
    generateCounterTactic(playerId) {
      const profile = this.playerProfiles[playerId];
      if (!profile || profile.learningLevel < 20) {
        return { tactic: 'standard', desc: 'AI has not learned enough about this player yet. Using standard tactics.' };
      }

      const tactics = [];

      // If player has favorite sniper spots, set up ambushes there
      if (profile.preferredVantagePoints.length > 0 && profile.preferredVantagePoints[0].count > 3) {
        const favSpot = profile.preferredVantagePoints[0];
        tactics.push({
          tactic: 'ambush_at_favorite_spot',
          desc: 'AI knows you like this sniper position. 3 enemies are already there, waiting.',
          target: favSpot,
        });
      }

      // If player flanks the same route, set up a trap
      if (profile.flankingRoutes.length > 2) {
        const mostUsedRoute = profile.flankingRoutes[profile.flankingRoutes.length - 1];
        tactics.push({
          tactic: 'trap_on_flank_route',
          desc: 'AI identified your flanking pattern. Claymores placed on your usual route.',
          target: mostUsedRoute,
        });
      }

      // If player uses the same ability often, prepare counter
      const favAbility = Object.entries(profile.abilityUsage).sort((a, b) => b[1] - a[1])[0];
      if (favAbility && favAbility[1] > 3) {
        tactics.push({
          tactic: 'counter_ability',
          desc: 'AI knows you love using ' + favAbility[0] + '. They have prepared a counter for it.',
          ability: favAbility[0],
        });
      }

      // If player banishes often, prepare anti-banish shield
      if (profile.banishmentFrequency > 2) {
        tactics.push({
          tactic: 'anti_banish',
          desc: 'AI knows you banish. All enemies now carry anti-banish shielding.',
        });
      }

      // If player uses dimensional shifts, set up dimensional mines
      if (profile.dimensionalUsage > 3) {
        tactics.push({
          tactic: 'dimensional_mine_field',
          desc: 'AI knows you fold dimensions. Void mines deployed at likely 4D exit points.',
        });
      }

      // Holographic decoy
      if (profile.learningLevel > 50) {
        tactics.push({
          tactic: 'holographic_decoy',
          desc: 'AI deploys a holographic clone of your squadmate. It looks, sounds, and has the thermal signature of your friend. It is not your friend.',
          weakness: 'Shoots back with blanks. Cannot banish. Cannot use abilities. Has 100 HP.',
        });
      }

      return {
        learningLevel: profile.learningLevel,
        tacticCount: tactics.length,
        tactics: tactics,
        warning: profile.learningLevel > 80 ? 'AI has studied you extensively. It knows your habits better than your squadmates do.' : null,
      };
    },

    // Get AI profiling status
    getProfile(playerId) {
      const profile = this.playerProfiles[playerId];
      if (!profile) return { learning: 0, message: 'AI has not encountered this player yet.' };

      return {
        learningLevel: profile.learningLevel + '%',
        totalActions: profile.totalActions,
        knownVantagePoints: profile.preferredVantagePoints.length,
        knownFlankRoutes: profile.flankingRoutes.length,
        favoriteWeapon: Object.entries(profile.weaponPreferences).sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown',
        avgEngagementDist: Math.round(profile.averageEngagementDistance) + 'm',
        banishmentFreq: profile.banishmentFrequency,
        dimensionalUsage: profile.dimensionalUsage,
        threat: profile.learningLevel > 80 ? 'CRITICAL — AI knows you' : profile.learningLevel > 50 ? 'HIGH — AI adapting' : profile.learningLevel > 20 ? 'MEDIUM — Learning' : 'LOW — Still learning',
      };
    },
  },

  // Cognitive Distortion Field Emitters
  cognitiveDistortion: {
    name: 'Cognitive Distortion Field Emitter',
    description: 'Tactical field device that broadcasts sub-audible acoustic frequencies and visual spectrum flickers, inducing panic, tunnel vision, and auditory hallucinations in opposing human operators.',

    emitterTypes: {
      panic_field: {
        name: 'Panic Field Emitter',
        cost: 2000,
        radius: 50,
        duration: 30,
        effects: {
          panicLevel: 0.8, // 80% panic induction
          tunnelVision: true, // peripheral vision narrows
          handTremor: true, // aim wobble
          heartbeatAudio: true, // loud heartbeat in player's audio
          voiceLine: 'The field hits you. Your hands shake. Your vision narrows to a tunnel. You can hear your heartbeat in your ears. Something is wrong. Something is very wrong.',
        },
        counter: 'Anti-anxiety stimulant injection negates effects',
      },

      hallucination_field: {
        name: 'Hallucination Field Emitter',
        cost: 3500,
        radius: 40,
        duration: 45,
        effects: {
          visualHallucinations: true, // see fake enemies, fake gunfire
          auditoryHallucinations: true, // hear fake footsteps, fake shots, fake radio chatter
          falseThreats: 5, // 5 fake enemy markers on HUD
          fakeGunfire: true, // see and hear gunfire that is not real
          fakeReloads: true, // hear enemies reloading nearby (they are not)
          disorientation: true, // direction indicators may rotate
          voiceLine: 'You see movement. You fire. Nothing is there. You hear footsteps behind you. You spin. Nothing. Your radio crackles with a voice that sounds like your squad leader, but the words are wrong. All wrong.',
        },
        counter: 'Reality Anchor trait or ARIA ghost protocol clears hallucinations',
      },

      tunnel_vision_field: {
        name: 'Tunnel Vision Field Emitter',
        cost: 1500,
        radius: 60,
        duration: 20,
        effects: {
          peripheralBlackout: true, // edges of screen go dark
          centralFocusOnly: true, // can only see directly ahead
          threatMarkersHidden: true, // HUD threat indicators disappear
          minimapDisabled: true,
          voiceLine: 'Your vision narrows. The world contracts to a pinhole. You can only see what is directly in front of you. Something could be right beside you and you would never know.',
        },
        counter: 'Medic can clear with bio-reset injection',
      },

      sensory_overload_field: {
        name: 'Sensory Overload Field Emitter',
        cost: 5000,
        radius: 35,
        duration: 15,
        effects: {
          screenFlash: true, // random screen flashes
          audioDistortion: true, // all audio is distorted and overwhelming
          colorInversion: true, // colors randomly invert
          motionBlur: true, // excessive motion blur
          depthPerceptionLoss: true, // hard to judge distances
          fakeDimensionalShifts: true, // feel like you are shifting dimensions (you are not)
          voiceLine: 'Everything is too much. The light is too bright. The sound is too loud. The colors are wrong. Your depth perception is gone. You fire at something that might be an enemy. You hope it is.',
        },
        counter: 'Only Quantum State Lock or Void Phase can shield from this. No quick counter.',
      },

      paranoia_field: {
        name: 'Paranoia Field Emitter',
        cost: 3000,
        radius: 80,
        duration: 60,
        effects: {
          falseAllyMarkers: true, // friendly markers disappear or show as enemy
          falseEnemyMarkers: true, // see enemy markers where there are none
          teamChatCorruption: true, // team chat shows corrupted messages
          friendlyFireRisk: true, // high risk of shooting teammates
          trustDecay: true, // players stop trusting each other
          voiceLine: 'You look at your squadmate. The marker says ENEMY. You know it is your friend. But the marker says ENEMY. Your radio says "he is the double agent." You did not have a double agent. The voice sounds like your commander. You raise your weapon.',
        },
        counter: 'ARIA scan reveals true identities. Without ARIA, this is devastating.',
        mostDangerous: true,
      },
    },

    // Deploy an emitter
    deploy(emitterType, position, teamId) {
      const emitter = this.emitterTypes[emitterType];
      if (!emitter) return { success: false, error: 'Unknown emitter type' };

      return {
        success: true,
        emitter: emitter.name,
        position: position,
        team: teamId,
        radius: emitter.radius + 'm',
        duration: emitter.duration + 's',
        effects: Object.keys(emitter.effects).filter(k => emitter.effects[k] === true),
        active: true,
        warning: 'Cognitive distortion field active. Enemy operators affected.',
      };
    },

    // Check if player is affected by any active emitter
    checkAffected(playerPosition, activeEmitters) {
      for (const emitter of activeEmitters) {
        const dist = Math.sqrt(
          Math.pow(playerPosition.x - emitter.position.x, 2) +
          Math.pow(playerPosition.z - emitter.position.z, 2)
        );
        if (dist <= emitter.radius) {
          return {
            affected: true,
            emitter: emitter.name,
            effects: emitter.effects,
            counter: emitter.counter,
            voiceLine: emitter.effects.voiceLine,
          };
        }
      }
      return { affected: false };
    },
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OCEANIC_WARFARE, KINETIC_DOMINANCE, QUANTUM_FORTIFICATIONS, NEURAL_AI };
}
if (typeof window !== 'undefined') {
  window.OCEANIC_WARFARE = OCEANIC_WARFARE;
  window.KINETIC_DOMINANCE = KINETIC_DOMINANCE;
  window.QUANTUM_FORTIFICATIONS = QUANTUM_FORTIFICATIONS;
  window.NEURAL_AI = NEURAL_AI;
}
