/**
 * OMEGA-8D: ALIENIC TECHNOLOGIES — 40 Hyper-Futuristic Systems
 * Reverse-engineered from a Kardashev Type III civilization
 */

const ALIEN_TECH = {
  1: {
    name: 'Dyson-Sphere Kinetic Rail',
    type: 'orbital_weapon', rarity: 'mythic',
    cost: 50000, costUSD: 5000,
    cooldown: 300, duration: 0,
    desc: 'Draws raw energy from a simulated stellar collector. Fires compressed plasma beam hot enough to turn a city block into glass in 0.4 seconds.',
    mechanic: { beamType: 'compressed_plasma', damage: 9999, radius: 50, flashTime: 400, instantVaporize: true, destroysBuildings: true, glassifiesTerrain: true },
    category: 'orbital',
    visualEffect: 'golden_beam_from_sky'
  },
  2: {
    name: 'Sub-Atomic Phase-Weaving Armor',
    type: 'armor', rarity: 'mythic',
    cost: 80000, costUSD: 8000,
    cooldown: 60, duration: 3,
    desc: 'Quark-lattice armor. When hit, shifts molecular bonds into liquid-state phase — bullet passes harmlessly through chest cavity before re-solidifying.',
    mechanic: { phaseThroughDamage: true, duration: 3, cooldown: 60, reSolidify: 'instant', immuneTo: ['kinetic','energy','plasma'] },
    category: 'defense',
    visualEffect: 'liquid_metal_ripple'
  },
  3: {
    name: 'Mnestic Memory-Wipe EMP',
    type: 'grenade', rarity: 'legendary',
    cost: 3000, costUSD: 300,
    cooldown: 120, radius: 20,
    desc: 'EMP that targets short-term synaptic memory. Enemy soldiers forget who they are, who squadmates are, and which direction they were facing for 10 seconds.',
    mechanic: { memoryWipe: true, duration: 10, forgetIdentity: true, forgetSquad: true, forgetDirection: true, forgetMission: true, alsoFriesElectronics: true },
    category: 'psychological',
    visualEffect: 'neural_white_flash'
  },
  4: {
    name: 'Zero-Point Gravity Sinkhole Grenade',
    type: 'grenade', rarity: 'mythic',
    cost: 5000, costUSD: 500,
    cooldown: 180, radius: 15,
    desc: 'Rips open a micro-singularity. Crushes light, sound, and enemies into an infinitely dense point, then snaps back with a devastating concussive shockwave.',
    mechanic: { microSingularity: true, crushPhase: 3, shockwavePhase: true, shockwaveRadius: 25, instantKill: true, blocksLight: true, blocksSound: true },
    category: 'dimensional',
    visualEffect: 'black_sphere_implode_then_explode'
  },
  5: {
    name: 'Tachyon Pre-Cognition HUD Visor',
    type: 'gear', rarity: 'legendary',
    cost: 15000, costUSD: 1500,
    cooldown: 0, duration: 'passive',
    desc: 'Helmet tachyon receiver displays enemy movement vectors 1 second into the future as glowing ghost trails. Intercept blind corners, counter-snipe before they fire.',
    mechanic: { seeFuture: 1, ghostTrails: true, predictTrajectory: true, counterSnipeAssist: true, passive: true },
    category: 'recon',
    visualEffect: 'ghost_trails_1s_future'
  },
  6: {
    name: 'Biomimetic Nanite Swarm Hive-Drones',
    type: 'deployable', rarity: 'epic',
    cost: 8000, costUSD: 800,
    cooldown: 150, duration: 120,
    desc: 'Micro-drones that mimic local insects down to wing-beat frequency. Stealth recon cameras that can crawl into enemy ear canals to record encrypted audio.',
    mechanic: { droneCount: 50, mimicInsects: true, stealthRecon: true, earCanalInfiltration: true, recordAudio: true, range: 200, undetectable: true },
    category: 'recon',
    visualEffect: 'swarm_of_what_looks_like_bugs'
  },
  7: {
    name: 'Dark-Matter Absorption Cloaking Field',
    type: 'ability', rarity: 'mythic',
    cost: 25000, costUSD: 2500,
    cooldown: 180, duration: 15,
    desc: 'Portable generator wraps operator in a localized event horizon. Bends all photons and radar. Invisible, soundless, undetectable by thermal, infrared, or quantum scanners.',
    mechanic: { eventHorizonCloak: true, invisible: true, silent: true, thermalImmune: true, infraredImmune: true, quantumImmune: true, duration: 15 },
    category: 'stealth',
    visualEffect: 'bending_light_around_operator'
  },
  8: {
    name: 'Neural-Hijack Synaptic Parasites',
    type: 'weapon', rarity: 'mythic',
    cost: 30000, costUSD: 3000,
    cooldown: 240, duration: 10,
    desc: 'Bio-digital hybrid darts fired into enemy helmet. Bypass nervous system, let you remotely steer enemy body like a meat-puppet into clear line of fire.',
    mechanic: { mindControl: true, controlEnemy: true, duration: 10, dartRequired: true, targetMustWearHelmet: true, moveEnemy: true, fireEnemyWeapon: true },
    category: 'psychological',
    visualEffect: 'enemy_eyes_glow_blue_then_moves_against_will'
  },
  9: {
    name: 'Hyper-Dimensional Tesseract Safe-Zone',
    type: 'deployable', rarity: 'legendary',
    cost: 12000, costUSD: 1200,
    cooldown: 300, duration: 60,
    desc: 'Small disc expands into a multi-room tactical armory existing entirely outside 3D space. Entire squad reloads, re-armors, and plans out of phase from reality.',
    mechanic: { pocketDimension: true, rooms: ['armory','med_bay','planning_table','reload_station'], invulnerable: true, outOfPhase: true, squadCapacity: 8, duration: 60 },
    category: 'support',
    visualEffect: 'unfolding_tesseract_into_rooms'
  },
  10: {
    name: 'Magnetohydrodynamic Plasma Flamethrower',
    type: 'weapon', rarity: 'legendary',
    cost: 10000, costUSD: 1000,
    cooldown: 0, duration: 'continuous',
    desc: 'Projects continuous arc of magnetically contained plasma heated to surface temperature of the sun. Vaporizes cover, steel doors, and enemies into ionized gas.',
    mechanic: { damage: 50, rate: 50, type: 'plasma', range: 30, vaporizesCover: true, vaporizesSteel: true, continuous: true, temp: 5778 },
    category: 'combat',
    visualEffect: 'blue_white_plasma_arc'
  },
  11: {
    name: 'Atmospheric Oxygen-Depletion Mines',
    type: 'mine', rarity: 'epic',
    cost: 4000, costUSD: 400,
    cooldown: 90, radius: 50,
    desc: 'Flash-freezes and strips all oxygen from a 50m radius in milliseconds. Unhelmeted enemies experience immediate hypoxic blackout and cognitive collapse.',
    mechanic: { oxygenDepletion: true, radius: 50, flashFreeze: true, hypoxia: true, blackoutTime: 8, helmetProtected: true },
    category: 'area_denial',
    visualEffect: 'frost_burst_then_silence'
  },
  12: {
    name: 'Quantum-Entangled Clone Decoys',
    type: 'deployable', rarity: 'legendary',
    cost: 8000, costUSD: 800,
    cooldown: 200, duration: 20,
    desc: 'Projects 3 fully physical holographic clones across the map. All 4 bodies share the same quantum state — targeting systems cannot identify the real one.',
    mechanic: { cloneCount: 3, quantumEntangled: true, physicalHolograms: true, untargetable: true, confuseAI: true, duration: 20 },
    category: 'deception',
    visualEffect: 'three_identical_operators_phasing'
  },
  13: {
    name: 'Seismic Resonance Disruption Beam',
    type: 'weapon', rarity: 'mythic',
    cost: 20000, costUSD: 2000,
    cooldown: 120, duration: 0,
    desc: 'Targets resonant frequency of human bone structure. Liquefies soft tissue and causes organ failure without a single scratch on external armor.',
    mechanic: { damage: 200, type: 'resonance', bypassesArmor: true, liquefiesTissue: true, noExternalDamage: true, silent: true, range: 100 },
    category: 'combat',
    visualEffect: 'invisible_beam_target_vibrates_then_drops'
  },
  14: {
    name: 'Molecular Disassembly Carbine',
    type: 'weapon', rarity: 'mythic',
    cost: 18000, costUSD: 1800,
    cooldown: 0, duration: 0,
    desc: 'Fires self-replicating grey-goo nanobites. On impact, nanites consume metal structure — dissolving a tank into grey dust in seconds.',
    mechanic: { damage: 30, rate: 200, type: 'nanite', greyGoo: true, dissolvesVehicles: true, dissolvesCover: true, dissolvesWeapons: true, consumeTime: 5 },
    category: 'combat',
    visualEffect: 'bullet_impact_then_target_dissolves_to_grey_dust'
  },
  15: {
    name: 'Chrono-Stasis Stagger Field',
    type: 'deployable', rarity: 'legendary',
    cost: 10000, costUSD: 1000,
    cooldown: 240, duration: 8,
    desc: 'Locks a 10m cubic space in temporal stasis. Freezes enemy bullets mid-air, traps any hostile player in an inescapable frozen second of eternity.',
    mechanic: { timeStop: true, radius: 10, freezeBullets: true, freezePlayers: true, freezeGrenades: true, duration: 8, inescapable: true },
    category: 'temporal',
    visualEffect: 'frozen_bullets_hanging_in_air'
  },
  16: {
    name: 'Orbital Drop Pods (Kinetic H-Bars)',
    type: 'deployment', rarity: 'epic',
    cost: 6000, costUSD: 600,
    cooldown: 180, duration: 0,
    desc: 'Drop pods launched from high orbit at Mach 25. Punch through bedrock into underground bunkers, delivering shock troops directly into subterranean strongholds.',
    mechanic: { insertionSpeed: 'Mach25', penetratesGround: true, undergroundInsertion: true, squadCapacity: 4, impactDamage: 500, stunRadius: 15 },
    category: 'deployment',
    visualEffect: 'meteor_like_streak_then_ground_crater'
  },
  17: {
    name: 'Bio-Luminescent Camouflage Skin-Weave',
    type: 'armor', rarity: 'epic',
    cost: 6000, costUSD: 600,
    cooldown: 0, duration: 'passive',
    desc: 'Sub-dermal grafts shift skin pigmentation and thermal signature to match any background. Living biological chameleons.',
    mechanic: { activeCamo: true, thermalMatch: true, visualMatch: true, passive: true, movementBreaksCamo: 0.7, reCloakDelay: 2 },
    category: 'stealth',
    visualEffect: 'skin_ripples_to_match_environment'
  },
  18: {
    name: 'Gravitational-Shear Tripwires',
    type: 'trap', rarity: 'epic',
    cost: 3500, costUSD: 350,
    cooldown: 90, duration: 120,
    desc: 'Invisible lines across doorways. When broken, instantly flips gravity 180 degrees for target, slamming them into the ceiling at 5Gs.',
    mechanic: { gravityFlip: 180, forceG: 5, instant: true, invisible: true, targetOnly: true, ceilingImpact: true, ceilingDamage: 50 },
    category: 'trap',
    visualEffect: 'person_suddenly_slams_into_ceiling'
  },
  19: {
    name: 'Synthetic Telepathic Jamming Array',
    type: 'deployable', rarity: 'legendary',
    cost: 9000, costUSD: 900,
    cooldown: 200, duration: 15, radius: 30,
    desc: 'Broadcasts white-noise into neural implants of high-tier enemies. Fills their minds with terrifying auditory hallucinations and phantom combat alerts.',
    mechanic: { telepathicJam: true, auditoryHallucinations: true, phantomAlerts: true, phantomEnemies: 5, disorientation: 0.8, duration: 15 },
    category: 'psychological',
    visualEffect: 'enemies_look_around_frantically_hearing_things'
  },
  20: {
    name: 'Adaptive Shape-Shifting Ballistic Cover',
    type: 'deployable', rarity: 'epic',
    cost: 5000, costUSD: 500,
    cooldown: 60, duration: 120,
    desc: 'Briefcase-sized nodes expand and morph into customized ballistic shields, pillboxes, or sniper nests matching terrain requirements.',
    mechanic: { shapeShift: true, forms: ['shield','pillbox','sniper_nest','wall','bunker'], morphTime: 3, health: 500, adaptive: true },
    category: 'support',
    visualEffect: 'briefcase_expands_and_morphs_into_structure'
  },
  21: {
    name: 'Anti-Matter Micro-Grenades',
    type: 'grenade', rarity: 'mythic',
    cost: 15000, costUSD: 1500,
    cooldown: 600, radius: 20,
    desc: 'Spheres containing trapped positrons. Complete matter-antimatter annihilation. Wipes everything within 20m down to subatomic particles.',
    mechanic: { antimatter: true, annihilation: true, radius: 20, subatomicDestruction: true, leavesNothing: true, permanentCrater: true, noRevive: true },
    category: 'ultimate',
    visualEffect: 'sphere_of_pure_white_then_NOTHING_remains'
  },
  22: {
    name: 'Neuro-Toxic Synaptic Overclock Injectors',
    type: 'consumable', rarity: 'legendary',
    cost: 4000, costUSD: 400,
    cooldown: 180, duration: 15,
    desc: 'Boosts adrenaline and neural processing by 500%. World moves in slow-motion for 15s. Overuse causes temporary paralysis.',
    mechanic: { slowMotion: true, speedMultiplier: 5, duration: 15, overuseRisk: true, paralysisTime: 5, maxUses: 2, visualSlowMo: true },
    category: 'consumable',
    visualEffect: 'world_slows_to_20_percent_speed'
  },
  23: {
    name: 'Hyper-Spatial Portal Grenades',
    type: 'grenade', rarity: 'legendary',
    cost: 7000, costUSD: 700,
    cooldown: 180, duration: 15,
    desc: 'Throw a disc on a wall, punches a temporary wormhole to a completely different map coordinate. Entire squad flanks through an inter-dimensional doorway.',
    mechanic: { portal: true, wormhole: true, twoWay: true, squadCanPass: true, duration: 15, exitPoint: 'player_aimed' },
    category: 'dimensional',
    visualEffect: 'tear_in_space_showing_other_location'
  },
  24: {
    name: 'Sentient AI Swarm Guided Bullets',
    type: 'ammo', rarity: 'mythic',
    cost: 8000, costUSD: 800,
    cooldown: 0, duration: 0,
    desc: 'Sniper rounds with micro-fins and independent neural guidance chips. Alter trajectory mid-flight to track targets around corners and obstacles.',
    mechanic: { guidedBullet: true, aiControlled: true, turnRadius: 45, trackAroundCorners: true, trackThroughObstacles: true, magazine: 10, selfCorrecting: true },
    category: 'ammo',
    visualEffect: 'bullet_curves_mid_air_like_a_missile'
  },
  25: {
    name: 'Sonar-Lattice Echolocation Pulses',
    type: 'ability', rarity: 'epic',
    cost: 5000, costUSD: 500,
    cooldown: 90, duration: 10,
    desc: 'Emits inaudible high-frequency wave across entire map. Bounces off structures, renders every enemy skeletal silhouette visible through walls in real-time.',
    mechanic: { echolocation: true, fullMap: true, seeSkeletons: true, throughWalls: true, realTime: true, duration: 10, silent: true },
    category: 'recon',
    visualEffect: 'pulse_wave_then_all_enemies_show_as_skeletons'
  },
  26: {
    name: 'Holographic Decoy Mirage Drones',
    type: 'deployable', rarity: 'epic',
    cost: 6000, costUSD: 600,
    cooldown: 150, duration: 30,
    desc: 'Flying drone projections mimicking full squads with fake thermal signatures, footsteps, and radio chatter. Bait enemy defenses into wasting ammo.',
    mechanic: { hologramSquad: true, fakeThermal: true, fakeFootsteps: true, fakeRadioChatter: true, droneCount: 8, duration: 30, wasteEnemyAmmo: true },
    category: 'deception',
    visualEffect: 'fake_squad_marching_with_fake_radio_chatter'
  },
  27: {
    name: 'Electromagnetic Pulse Armor Plating',
    type: 'armor', rarity: 'legendary',
    cost: 12000, costUSD: 1200,
    cooldown: 30, duration: 'passive',
    desc: 'Reactive armor that absorbs electrical/energy attacks, redirecting power into your own weapon systems to overcharge next magazine with plasma.',
    mechanic: { absorbEnergy: true, redirectPower: true, overchargeMagazine: true, overchargeDmg: 1.5, passive: true, absorbPercent: 90 },
    category: 'defense',
    visualEffect: 'energy_hit_absorbed_armor_glow_then_weapon_glows'
  },
  28: {
    name: 'Sub-Surface Seismic Sonar Mines',
    type: 'mine', rarity: 'epic',
    cost: 4000, costUSD: 400,
    cooldown: 120, duration: 300,
    desc: 'Buried 3m underground. Detect micro-vibrations of footsteps from 1km away. Detonate upward fragmentation spike matrix through floorboards.',
    mechanic: { detectionRange: 1000, underground: true, detectFootsteps: true, fragSpike: true, upwardBlast: true, damage: 150, triggerDelay: 0.5 },
    category: 'trap',
    visualEffect: 'spikes_burst_through_floor_at_target'
  },
  29: {
    name: 'Autonomous Robotic Exo-Skeletons (Goliath Units)',
    type: 'armor', rarity: 'legendary',
    cost: 20000, costUSD: 2000,
    cooldown: 0, duration: 'passive',
    desc: 'Heavy wearable frames. Carry anti-materiel railcannons, shield generators, and breaching charges that would normally require a vehicle.',
    mechanic: { exoSkeleton: true, carryCapacity: 5, speed: 0.7, armor: 500, shieldGenerator: true, dualWieldHeavy: true, meleeDamage: 100 },
    category: 'armor',
    visualEffect: 'massive_mech_like_exosuit'
  },
  30: {
    name: 'Quantum Decoupling Evasion Pack',
    type: 'gear', rarity: 'legendary',
    cost: 10000, costUSD: 1000,
    cooldown: 90, duration: 2,
    desc: 'Briefly decouples physical form from local server state for 2 seconds. Walk through enemy bullets and explosions like a ghost.',
    mechanic: { serverDecouple: true, intangible: true, duration: 2, walkThroughBullets: true, walkThroughExplosions: true, walkThroughWalls: false },
    category: 'defense',
    visualEffect: 'operator_flickers_and_bullets_pass_through'
  },
  31: {
    name: 'Atmospheric Nitrogen-Ice Freezing Beams',
    type: 'weapon', rarity: 'mythic',
    cost: 15000, costUSD: 1500,
    cooldown: 0, duration: 0,
    desc: 'Flash-cools target weapon and limbs to absolute zero (-273C). Instantly shatters steel components and freezes blood in veins.',
    mechanic: { damage: 80, rate: 300, type: 'cryo', freezeTemp: -273, shatterSteel: true, freezeBlood: true, freezeWeapons: true, shatterOnImpact: true, range: 60 },
    category: 'combat',
    visualEffect: 'blue_beam_target_freezes_then_shatters'
  },
  32: {
    name: 'Neuro-Linguistic Cyber Warfare Worms',
    type: 'ability', rarity: 'mythic',
    cost: 18000, costUSD: 1800,
    cooldown: 300, duration: 30,
    desc: 'Data-viruses uploaded into comms relays. Hijack enemy drone fleets and turn them against their own operators with a single keystroke.',
    mechanic: { cyberWorm: true, hijackEnemyDrones: true, turnAgainstOwner: true, duration: 30, spreadToAllDrones: true, singleKeystroke: true },
    category: 'cyber',
    visualEffect: 'enemy_drones_suddenly_attack_their_own_team'
  },
  33: {
    name: 'Kinetic Impact Dampening Fields',
    type: 'armor', rarity: 'epic',
    cost: 7000, costUSD: 700,
    cooldown: 0, duration: 'passive',
    desc: 'Personal energy barriers absorb 90% of kinetic energy from blows, shrapnel, and low-caliber rounds, dispersing force across entire body surface.',
    mechanic: { kineticAbsorb: 0.9, passive: true, coversFullBody: true, dispersal: 'surface', immuneLowCaliber: true, immuneShrapnel: true },
    category: 'defense',
    visualEffect: 'impact_ripples_across_body_like_water'
  },
  34: {
    name: 'Multi-Dimensional Phase-Shift Interceptors',
    type: 'deployable', rarity: 'legendary',
    cost: 14000, costUSD: 1400,
    cooldown: 180, duration: 120,
    desc: 'Auto defense turrets that phase out of 3D space when targeted by enemy fire, phase back in only the exact millisecond they fire their return shot.',
    mechanic: { autoTurret: true, phaseOut: 'when_targeted', phaseIn: 'only_to_fire', invulnerable: true, fireRate: 200, damage: 60, duration: 120 },
    category: 'defense',
    visualEffect: 'turret_flickers_in_and_out_of_existence'
  },
  35: {
    name: 'Sub-Atomic Particle Beam Snipers',
    type: 'weapon', rarity: 'mythic',
    cost: 35000, costUSD: 3500,
    cooldown: 0, duration: 0,
    desc: 'Accelerates lead slugs to 99% speed of light using particle accelerators. Creates Cherenkov radiation and atmospheric thunder wherever bullet travels.',
    mechanic: { damage: 800, rate: 3000, mag: 3, range: 5000, speedOfLight: 0.99, cherenkovRadiation: true, atmosphericThunder: true, piercesAll: true },
    category: 'combat',
    visualEffect: 'blue_glow_streak_and_thunderclap'
  },
  36: {
    name: 'Self-Replicating Nanite Fortifications',
    type: 'deployable', rarity: 'legendary',
    cost: 9000, costUSD: 900,
    cooldown: 120, duration: 'permanent',
    desc: 'Canister of construction nanites. Smash on floor, instantly builds fortified impenetrable bunker from surrounding rubble and concrete in 3 seconds.',
    mechanic: { nanoBuild: true, buildTime: 3, material: 'surrounding_rubble', health: 2000, impenetrable: true, permanent: true, size: 'small_bunker' },
    category: 'support',
    visualEffect: 'canister_smashes_then_floor_rises_into_bunker'
  },
  37: {
    name: 'Genetic-Signature Tracking Beacons',
    type: 'weapon', rarity: 'epic',
    cost: 5000, costUSD: 500,
    cooldown: 60, duration: 300,
    desc: 'Chemical micro-tags fired from dart gun. Bond with enemy sweat and skin oils. Trackable via satellite regardless of cloaking or cover.',
    mechanic: { geneticTag: true, bondWithSweat: true, bondWithSkinOil: true, satelliteTrack: true, ignoreCloaking: true, ignoreCover: true, duration: 300, dartGun: true },
    category: 'recon',
    visualEffect: 'dart_impact_then_target_glows_on_map_through_walls'
  },
  38: {
    name: 'Gravitational Singularity Landmines',
    type: 'mine', rarity: 'mythic',
    cost: 12000, costUSD: 1200,
    cooldown: 180, radius: 10,
    desc: 'When triggered, generates sudden 50G pull toward center. Crushes any nearby enemy into a compressed mass of flesh and metal.',
    mechanic: { gravity: 50, pullToCenter: true, crushTarget: true, radius: 10, instantKill: true, leavesCompressedMass: true },
    category: 'trap',
    visualEffect: 'everything_sucks_to_center_then_COMPACT_sphere'
  },
  39: {
    name: 'Solar-Flare Simulation Emitters',
    type: 'deployable', rarity: 'legendary',
    cost: 8000, costUSD: 800,
    cooldown: 150, duration: 5, radius: 30,
    desc: 'Simulates localized solar flare inside a room. Blinds all optical sensors, thermal scopes, and human eyes with UV and EM radiation.',
    mechanic: { solarFlare: true, blindOptical: true, blindThermal: true, blindHumanEyes: true, uvRadiation: true, emRadiation: true, duration: 5, radius: 30 },
    category: 'tactical',
    visualEffect: 'room_fills_with_blinding_white_light'
  },
  40: {
    name: 'Omega-Protocol Reality Reset Engine',
    type: 'ultimate', rarity: 'mythic',
    cost: 100000, costUSD: 10000,
    cooldown: 3600, duration: 0,
    desc: 'Faction-level ultimate. When triggered by elite squad completing a multi-dimensional objective, completely rewrites server seed data — shifts weather, lighting, gravity, and architecture LIVE in the middle of an active warzone.',
    mechanic: {
      serverRewrite: true,
      changesWeather: true, changesLighting: true, changesGravity: true, changesArchitecture: true,
      requiresObjective: true, objectiveType: 'multi_dimensional',
      liveShift: true, midWarzone: true,
      effects: { newWeather: 'random', newLighting: 'random', newGravity: 'random', newArchitecture: 'procedural_regen' },
      msg: 'REALITY REWRITE INITIATED. The battlefield you knew no longer exists. Welcome to the new world.'
    },
    category: 'omega',
    premiumRequired: 'SUPREME',
    visualEffect: 'ENTIRE_MAP_DISSOLVES_AND_REBUILDS_INTO_SOMETHING_NEW'
  }
};

// Get all tech sorted by cost
function getTechByCost() {
  return Object.values(ALIEN_TECH).sort((a,b) => b.cost - a.cost);
}

// Get tech by category
function getTechByCategory(cat) {
  return Object.values(ALIEN_TECH).filter(t => t.category === cat);
}

// Get all categories
function getCategories() {
  return [...new Set(Object.values(ALIEN_TECH).map(t => t.category))];
}

// Total cost of all 40 technologies
function getTotalCost() {
  return Object.values(ALIEN_TECH).reduce((sum, t) => sum + t.cost, 0);
}

// Export
if (typeof module !== 'undefined') {
  module.exports = { ALIEN_TECH, getTechByCost, getTechByCategory, getCategories, getTotalCost };
}
