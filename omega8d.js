// ====== PROJECT OMEGA-8D — Advanced Mechanics ======
// 1. Interstellar Banishment (Deep Space Survival Instance)
// 2. Hyper-Attachment System (Dimensional Weapon Mods)
// 3. Architect System (Permanent Map Modifications)
// 4. Non-Euclidean Map Topology
// 5. Higher-Dimensional Weapon Physics

// ====== 1. INTERSTELLAR BANISHMENT ======
// When a premium 7D/8D player executes a finisher, the enemy is banished to
// a procedural Deep Space survival instance. They must escape to return.

const BANISHMENT = {
  // Banishment types
  types: {
    void: {
      name: 'VOID BANISHMENT',
      dim: 7, tier: 'OPERATIVE', cost: 1000, cooldown: 30000,
      duration: 120000, // 2 min max
      desc: 'Rip enemy into the VOID. They must escape the Void Realm to return.',
      instance: 'void_realm'
    },
    cosmic: {
      name: 'COSMIC BANISHMENT',
      dim: 8, tier: 'COMMANDER', cost: 2000, cooldown: 60000,
      duration: 300000, // 5 min max
      desc: 'Teleport enemy to another solar system. They must survive Deep Space to return.',
      instance: 'deep_space'
    },
    galaxy: {
      name: 'GALAXY BANISHMENT',
      dim: 8, tier: 'SUPREME', cost: 5000, cooldown: 120000,
      duration: 300000,
      desc: 'Send enemy to ANOTHER GALAXY. The ultimate exile. They must fight a guardian boss to return.',
      instance: 'alien_galaxy'
    },
  },

  // Banished player state
  banishedPlayers: new Map(), // playerId -> banishment state

  // Execute banishment
  banish(targetId, type, banisherId) {
    const bType = this.types[type];
    if (!bType) return null;

    const state = {
      targetId,
      banisherId,
      type,
      startTime: Date.now(),
      maxDuration: bType.duration,
      instance: bType.instance,
      fuelCells: 0,
      fuelNeeded: 3,
      scrap: 0,
      darkMatter: 0,
      plasmaCrystals: 50, // starting currency
      health: 100,
      inventory: [],
      bossDefeated: false,
      warpGateActive: false,
      returnMethod: null, // 'fuel' | 'pay' | 'boss'
      payCost: 500 + Math.floor((Date.now() - this.banishedPlayers.get(targetId)?.startTime || 0) / 1000) * 10,
    };

    this.banishedPlayers.set(targetId, state);
    return state;
  },

  // Deep Space instance — procedural survival
  generateDeepSpaceInstance(banishmentType) {
    const instances = {
      void_realm: this.generateVoidRealm(),
      deep_space: this.generateDeepSpace(),
      alien_galaxy: this.generateAlienGalaxy(),
    };
    return instances[banishmentType] || instances.deep_space;
  },

  generateVoidRealm() {
    return {
      name: 'THE VOID',
      description: 'Nothingness. No light. No sound. Find the 3 Void Crystals to power the rift home.',
      environment: 'void',
      gravity: 0, // zero gravity
      enemies: [
        { type: 'void_wraith', count: 5, hp: 50, dmg: 10, speed: 0.04, drops: 'void_crystal', dropChance: 0.3 },
        { type: 'void_horror', count: 2, hp: 150, dmg: 25, speed: 0.03, drops: 'void_crystal', dropChance: 0.5 },
        { type: 'void_guardian', count: 1, hp: 300, dmg: 40, speed: 0.05, drops: 'void_crystal', dropChance: 1.0, isBoss: true },
      ],
      pickups: [
        { type: 'void_crystal', count: 3, desc: 'Fuel for the warp rift' },
        { type: 'scrap', count: 8, desc: 'Tradeable material' },
        { type: 'health_shard', count: 5, desc: 'Restores 20 HP' },
      ],
      warpGate: { x: 0, z: 0, requires: 'void_crystal', amount: 3, bossGuard: true },
      atmosphere: 'pitch_black',
      maxTime: 120000, // 2 minutes
    };
  },

  generateDeepSpace() {
    return {
      name: 'DEEP SPACE — SECTOR 7',
      description: 'Floating in the void between stars. Scavenge fuel from wreckage. Beware the drifters.',
      environment: 'space',
      gravity: 0.05, // very low gravity
      enemies: [
        { type: 'space_drifter', count: 8, hp: 30, dmg: 8, speed: 0.06, drops: 'fuel_cell', dropChance: 0.2 },
        { type: 'salvage_drone', count: 4, hp: 60, dmg: 12, speed: 0.08, drops: 'fuel_cell', dropChance: 0.4 },
        { type: 'asteroid_worm', count: 2, hp: 200, dmg: 30, speed: 0.04, drops: 'fuel_cell', dropChance: 0.6 },
        { type: 'star_leech', count: 3, hp: 80, dmg: 15, speed: 0.07, drops: 'dark_matter', dropChance: 0.3 },
      ],
      pickups: [
        { type: 'fuel_cell', count: 5, desc: 'Warp gate fuel' },
        { type: 'scrap', count: 12, desc: 'Tradeable wreckage' },
        { type: 'dark_matter', count: 3, desc: 'Rare — buy instant warp' },
        { type: 'plasma_crystal', count: 20, desc: 'Trading currency' },
        { type: 'weapon_cache', count: 2, desc: 'Random weapon to fight back' },
      ],
      warpGate: { x: 40, z: -40, requires: 'fuel_cell', amount: 3, bossGuard: true },
      atmosphere: 'starfield',
      maxTime: 300000, // 5 minutes
      npcs: [
        { type: 'trader', name: 'Wandering Merchant', sells: 'fuel_cell', price: 30, currency: 'plasma_crystal' },
        { type: 'trader', name: 'Black Market Bot', sells: 'dark_matter', price: 50, currency: 'plasma_crystal' },
        { type: 'trader', name: 'Scavenger', sells: 'instant_warp', price: 500, currency: 'plasma_crystal' },
      ],
    };
  },

  generateAlienGalaxy() {
    return {
      name: 'ANDROMEDA OUTPOST — UNCHARTED',
      description: 'Another galaxy entirely. The rules of physics bend differently here. Find the Guardian.',
      environment: 'alien',
      gravity: 0.1, // weird gravity
      enemies: [
        { type: 'void_drone', count: 10, hp: 40, dmg: 10, speed: 0.05, drops: 'fuel_cell', dropChance: 0.15 },
        { type: 'galaxy_sentinel', count: 5, hp: 100, dmg: 20, speed: 0.06, drops: 'fuel_cell', dropChance: 0.3 },
        { type: 'dimensional_beast', count: 3, hp: 250, dmg: 35, speed: 0.04, drops: 'dark_matter', dropChance: 0.4 },
        { type: 'galaxy_guardian', count: 1, hp: 500, dmg: 50, speed: 0.07, drops: 'warp_key', dropChance: 1.0, isBoss: true },
      ],
      pickups: [
        { type: 'fuel_cell', count: 4, desc: 'Warp gate fuel' },
        { type: 'dark_matter', count: 5, desc: 'Rare resource' },
        { type: 'plasma_crystal', count: 30, desc: 'Trading currency' },
        { type: 'alien_tech', count: 2, desc: 'Unknown technology — random effect' },
      ],
      warpGate: { x: 0, z: 50, requires: 'warp_key', amount: 1, bossGuard: false, bossIsKey: true },
      atmosphere: 'nebula',
      maxTime: 300000,
      npcs: [
        { type: 'trader', name: 'Galactic Merchant', sells: 'fuel_cell', price: 50, currency: 'plasma_crystal' },
        { type: 'trader', name: 'Ancient Being', sells: 'instant_warp', price: 2000, currency: 'plasma_crystal' },
      ],
      special: 'The Guardian MUST be defeated to get the warp key. No shortcut.',
    };
  },

  // Return from banishment
  attemptReturn(playerId, method) {
    const state = this.banishedPlayers.get(playerId);
    if (!state) return null;

    const instance = this.generateDeepSpaceInstance(state.instance);

    if (method === 'fuel' && state.fuelCells >= instance.warpGate.amount) {
      state.returnMethod = 'fuel';
      this.banishedPlayers.delete(playerId);
      return { success: true, method: 'fuel', message: 'Warp gate activated — returning to battle!' };
    }
    if (method === 'pay') {
      const cost = state.payCost;
      state.returnMethod = 'pay';
      this.banishedPlayers.delete(playerId);
      return { success: true, method: 'pay', cost, message: 'Paid ' + cost + ' Chrono Coins — instant return!' };
    }
    if (method === 'boss' && state.bossDefeated) {
      state.returnMethod = 'boss';
      this.banishedPlayers.delete(playerId);
      return { success: true, method: 'boss', message: 'Guardian defeated — warp key acquired!' };
    }
    if (method === 'timeout') {
      this.banishedPlayers.delete(playerId);
      return { success: true, method: 'timeout', message: 'Banishment expired — auto-returning.' };
    }
    return { success: false, message: 'Requirements not met.' };
  },

  // Get banishment status for HUD
  getStatus(playerId) {
    return this.banishedPlayers.get(playerId) || null;
  },

  // Count currently banished
  countBanished() {
    return this.banishedPlayers.size;
  },
};

// ====== 2. HYPER-ATTACHMENT SYSTEM ======
// Modular attachments that alter how weapons interact with dimensions

const HYPER_ATTACHMENTS = {
  // Dimensional attachments
  phase_coating: {
    name: 'Phase Coating', icon: '🌀', rarity: 'epic', price: 5000,
    desc: 'Bullet phases through 1 layer of cover (4D interaction)',
    effect: { phaseThroughCover: 1, dmgMultiplier: 0.9 },
    compatibleTypes: ['rifle', 'sniper', 'smg', 'pistol'],
  },
  gravity_mod: {
    name: 'Gravity Mod', icon: '🪐', rarity: 'rare', price: 3000,
    desc: 'Bullet curves around obstacles using gravity',
    effect: { curveTrajectory: true, dmgMultiplier: 0.95 },
    compatibleTypes: ['rifle', 'smg', 'shotgun'],
  },
  sound_dampener: {
    name: 'Sound Dampener', icon: '🔇', rarity: 'uncommon', price: 1500,
    desc: 'Completely silent shots — no audio cue for enemies',
    effect: { silent: true, dmgMultiplier: 1.0 },
    compatibleTypes: ['rifle', 'sniper', 'smg', 'pistol', 'lmg'],
  },
  temporal_trigger: {
    name: 'Temporal Trigger', icon: '⏳', rarity: 'epic', price: 8000,
    desc: 'Bullet slows time on impact — 0.5s slow-mo at hit point',
    effect: { slowOnHit: 500, dmgMultiplier: 1.0 },
    compatibleTypes: ['rifle', 'sniper', 'shotgun'],
  },
  quantum_stabilizer: {
    name: 'Quantum Stabilizer', icon: '🔮', rarity: 'legendary', price: 15000,
    desc: 'Bullet hits in all 3 quantum realities simultaneously',
    effect: { hitAllQuantum: true, dmgMultiplier: 0.8 },
    compatibleTypes: ['rifle', 'sniper', 'lmg', 'energy'],
  },
  void_tip: {
    name: 'Void Tip', icon: '🕳️', rarity: 'legendary', price: 20000,
    desc: 'Banishes target to VOID for 3s on hit (premium ability)',
    effect: { voidBanish: 3000, dmgMultiplier: 0.7 },
    compatibleTypes: ['rifle', 'sniper', 'energy', 'special'],
    premiumRequired: 'OPERATIVE',
  },
  cosmic_drive: {
    name: 'Cosmic Drive', icon: '🌌', rarity: 'mythic', price: 50000,
    desc: 'Opens a micro-portal at impact point — bullets can travel through',
    effect: { portalOnHit: true, dmgMultiplier: 0.85 },
    compatibleTypes: ['rifle', 'sniper', 'energy', 'special'],
    premiumRequired: 'COMMANDER',
  },
  singularity_core: {
    name: 'Singularity Core', icon: '⚫', rarity: 'mythic', price: 75000,
    desc: 'Creates a 2m gravity well on impact — pulls enemies inward',
    effect: { gravityWell: 2000, radius: 2, dmgMultiplier: 0.9 },
    compatibleTypes: ['rifle', 'rocket', 'energy', 'grenade'],
  },
  ana_kata_scope: {
    name: 'Ana/Kata Scope', icon: '🔭', rarity: 'epic', price: 6000,
    desc: 'See enemies in the 4th spatial dimension through scope',
    effect: { seeWAxis: true, adsBonus: 1.2 },
    compatibleTypes: ['sniper', 'rifle'],
  },
  tachyon_accelerator: {
    name: 'Tachyon Accelerator', icon: '⚡', rarity: 'mythic', price: 100000,
    desc: 'Bullet hits 0.2s BEFORE you pull the trigger (target takes damage first, then muzzle flash)',
    effect: { timeReversal: 200, dmgMultiplier: 1.1 },
    compatibleTypes: ['sniper', 'rifle', 'energy'],
  },
  dimensional_echo: {
    name: 'Dimensional Echo', icon: '🌊', rarity: 'legendary', price: 12000,
    desc: 'Bullet creates a copy in the quantum layer — hits twice across realities',
    effect: { quantumEcho: true, dmgMultiplier: 0.75 },
    compatibleTypes: ['rifle', 'smg', 'energy'],
  },
  reality_lock: {
    name: 'Reality Lock', icon: '🔒', rarity: 'legendary', price: 18000,
    desc: 'Hit target cannot use dimensional abilities for 3s (counter premium)',
    effect: { lockDimensions: 3000, dmgMultiplier: 1.0 },
    compatibleTypes: ['rifle', 'sniper', 'smg', 'lmg', 'energy'],
  },
  anti_grav_chamber: {
    name: 'Anti-Grav Chamber', icon: '🎈', rarity: 'rare', price: 4000,
    desc: 'Bullet floats — travels in straight line ignoring gravity drop',
    effect: { antiGravity: true, dmgMultiplier: 1.0 },
    compatibleTypes: ['rifle', 'sniper', 'rocket'],
  },
  dimensional_ricochet: {
    name: 'Dimensional Ricochet', icon: '↩️', rarity: 'epic', price: 7000,
    desc: 'Bullet bounces off 4D walls — can hit behind cover',
    effect: { dimensionalBounce: 2, dmgMultiplier: 0.85 },
    compatibleTypes: ['rifle', 'smg', 'pistol'],
  },
  void_shroud: {
    name: 'Void Shroud', icon: '🫥', rarity: 'legendary', price: 25000,
    desc: 'Bullet is invisible to minimap and quantum detection',
    effect: { stealth: true, dmgMultiplier: 1.0 },
    compatibleTypes: ['rifle', 'sniper', 'smg', 'pistol'],
    premiumRequired: 'OPERATIVE',
  },
  cosmic_amplifier: {
    name: 'Cosmic Amplifier', icon: '💫', rarity: 'mythic', price: 60000,
    desc: 'Bullet gains power for each dimension you have active — up to 8x damage',
    effect: { dimensionalScaling: true, dmgMultiplier: 1.0 },
    compatibleTypes: ['rifle', 'sniper', 'energy', 'special'],
    premiumRequired: 'COMMANDER',
  },
};

// Apply attachment to weapon
function applyAttachment(weaponKey, attachmentKey) {
  const attachment = HYPER_ATTACHMENTS[attachmentKey];
  const weapon = WEAPON_DB_EXPANDED ? WEAPON_DB_EXPANDED[weaponKey] : null;
  if (!attachment || !weapon) return null;

  const compatible = attachment.compatibleTypes.includes(weapon.type) || attachment.compatibleTypes.includes('all');
  if (!compatible) return { success: false, reason: 'Not compatible with this weapon type' };

  return {
    success: true,
    modifiedWeapon: {
      ...weapon,
      attachments: { ...(weapon.attachments || {}), [attachmentKey]: attachment },
      dmg: Math.floor(weapon.dmg * (attachment.effect.dmgMultiplier || 1)),
    }
  };
}

// ====== 3. ARCHITECT SYSTEM ======
// Players who use 8D abilities permanently modify the map

const ARCHITECT_SYSTEM = {
  // Map modifications database (persistent)
  mapModifications: new Map(), // mapId -> array of modifications

  // Types of permanent modifications
  modificationTypes: {
    spatial_tear: {
      name: 'Spatial Tear',
      desc: 'A hole in the fabric of space — acts as a shortcut or hazard',
      createdBy: '8D Cosmic ability',
      persistent: true,
      effect: 'portal',
    },
    gravity_anomaly: {
      name: 'Gravity Anomaly',
      desc: 'A zone where gravity is reversed or intensified',
      createdBy: 'Singularity weapon',
      persistent: true,
      effect: 'gravity_zone',
    },
    time_distortion: {
      name: 'Time Distortion',
      desc: 'A zone where time flows differently — slow or fast',
      createdBy: 'Temporal weapon/ability',
      persistent: true,
      effect: 'time_zone',
    },
    quantum_fissure: {
      name: 'Quantum Fissure',
      desc: 'A crack between quantum realities — see/hear across dimensions',
      createdBy: 'Quantum ability',
      persistent: true,
      effect: 'quantum_window',
    },
    void_scar: {
      name: 'Void Scar',
      desc: 'A permanent mark where the VOID touched reality — damages anyone who enters',
      createdBy: 'VOID banishment',
      persistent: true,
      effect: 'damage_zone',
    },
    dimensional_rift: {
      name: 'Dimensional Rift',
      desc: 'A permanent portal between two map points',
      createdBy: '8D Cosmic Portal ability',
      persistent: true,
      effect: 'permanent_portal',
    },
  },

  // Create a modification
  createModification(mapId, playerId, type, position, data) {
    const mod = {
      id: 'mod_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      mapId,
      playerId,
      playerTag: data.playerTag || 'UNKNOWN',
      type,
      position: { x: position.x, y: position.y || 0, z: position.z },
      createdAt: Date.now(),
      data: data || {},
      uses: 0,
      // Tears can be sealed by other players
      sealed: false,
      sealedBy: null,
    };

    if (!this.mapModifications.has(mapId)) {
      this.mapModifications.set(mapId, []);
    }
    this.mapModifications.get(mapId).push(mod);
    return mod;
  },

  // Get all modifications for a map
  getMapMods(mapId) {
    return this.mapModifications.get(mapId) || [];
  },

  // Seal a modification (counter-play)
  sealModification(mapId, modId, playerId) {
    const mods = this.mapModifications.get(mapId);
    if (!mods) return false;
    const mod = mods.find(m => m.id === modId);
    if (!mod || mod.sealed) return false;
    mod.sealed = true;
    mod.sealedBy = playerId;
    mod.sealedAt = Date.now();
    return true;
  },

  // Check if player is an Architect
  isArchitect(playerId) {
    let count = 0;
    for (const mods of this.mapModifications.values()) {
      count += mods.filter(m => m.playerId === playerId && !m.sealed).length;
    }
    return count >= 10; // 10+ active modifications = Architect
  },

  // Get architect stats
  getArchitectStats(playerId) {
    let total = 0, active = 0, sealed = 0, uses = 0;
    for (const mods of this.mapModifications.values()) {
      for (const m of mods) {
        if (m.playerId === playerId) {
          total++;
          if (m.sealed) sealed++;
          else { active++; uses += m.uses; }
        }
      }
    }
    return { total, active, sealed, uses, isArchitect: active >= 10 };
  },

  // Architect tiers
  architectTiers: [
    { name: 'Surveyor',     modifications: 1,    desc: 'First map modification' },
    { name: 'Cartographer', modifications: 5,    desc: '5 active modifications' },
    { name: 'Architect',    modifications: 10,   desc: '10 active modifications' },
    { name: 'World Shaper', modifications: 25,   desc: '25 active modifications' },
    { name: 'Reality Forger',modifications: 50,   desc: '50 active modifications' },
    { name: 'DIMENSION LORD',modifications: 100,  desc: '100 active modifications — living legend' },
  ],
};

// ====== 4. NON-EUCLIDEAN MAP TOPOLOGY ======
// Real-world geography as game maps with dimensional folding

const NON_EUCLIDEAN_MAPS = {
  // Real-world coordinate system (lat/long → game space)
  realWorldMaps: {
    lagos: {
      name: 'LAGOS — EAGLE NEST',
      country: 'NIGERIA',
      coords: { lat: 6.5244, lng: 3.3792 },
      scale: 0.001, // degrees to meters ratio
      mapSize: 200, // arena units
      terrain: 'urban',
      landmarks: [
        { name: 'Lagos Island', x: 0, z: 0, type: 'central' },
        { name: 'Victoria Island', x: 40, z: -20, type: 'commercial' },
        { name: 'Ikeja', x: -30, z: 30, type: 'residential' },
        { name: 'Lekki', x: 50, z: 20, type: 'development' },
        { name: 'Apapa Port', x: -20, z: -30, type: 'industrial' },
      ],
      defconLevel: 3,
      special: 'High population density — many cover points, tight streets',
    },
    moscow: {
      name: 'MOSCOW — WINTER WOLF',
      country: 'RUSSIA',
      coords: { lat: 55.7558, lng: 37.6173 },
      scale: 0.001,
      mapSize: 250,
      terrain: 'arctic',
      landmarks: [
        { name: 'Red Square', x: 0, z: 0, type: 'central' },
        { name: 'Kremlin', x: 10, z: -10, type: 'fortified' },
        { name: 'Moscow River', x: 0, z: 30, type: 'water' },
        { name: 'Arbat District', x: -20, z: 10, type: 'residential' },
        { name: 'Metro Tunnels', x: 0, z: -20, type: 'underground' },
      ],
      defconLevel: 2,
      special: 'Underground metro system — 3D combat with subway tunnels',
    },
    washington: {
      name: 'WASHINGTON DC — EAGLE NEST',
      country: 'USA',
      coords: { lat: 38.8977, lng: -77.0365 },
      scale: 0.001,
      mapSize: 200,
      terrain: 'urban',
      landmarks: [
        { name: 'White House', x: 0, z: 0, type: 'fortified' },
        { name: 'Capitol Hill', x: 20, z: 10, type: 'government' },
        { name: 'Pentagon', x: -30, z: -20, type: 'military' },
        { name: 'National Mall', x: 0, z: 20, type: 'open' },
        { name: 'Georgetown', x: -20, z: 15, type: 'residential' },
      ],
      defconLevel: 4,
      special: 'Government buildings — high security, camera detection system',
    },
    pyongyang: {
      name: 'PYONGYANG — SHADOW LAND',
      country: 'NORTH KOREA',
      coords: { lat: 39.0392, lng: 125.7625 },
      scale: 0.001,
      mapSize: 180,
      terrain: 'fortified',
      landmarks: [
        { name: 'Kim Square', x: 0, z: 0, type: 'central' },
        { name: 'Underground Bunkers', x: 10, z: -10, type: 'underground' },
        { name: 'Military Base', x: 30, z: 20, type: 'military' },
        { name: 'Worker District', x: -20, z: 15, type: 'residential' },
        { name: 'EMP Tower', x: 0, z: -30, type: 'special' },
      ],
      defconLevel: 1,
      special: 'EMP towers disable electronic weapons periodically — melee focus',
    },
    tel_aviv: {
      name: 'TEL AVIV — IRON DOME',
      country: 'ISRAEL',
      coords: { lat: 32.0853, lng: 34.7818 },
      scale: 0.001,
      mapSize: 150,
      terrain: 'urban',
      landmarks: [
        { name: 'City Center', x: 0, z: 0, type: 'central' },
        { name: 'Iron Dome', x: 20, z: -20, type: 'defense' },
        { name: 'Beach Front', x: 0, z: 30, type: 'open' },
        { name: 'Tech District', x: -25, z: 10, type: 'commercial' },
        { name: 'Mossad HQ', x: 15, z: -15, type: 'special' },
      ],
      defconLevel: 3,
      special: 'Iron Dome intercepts incoming rockets — must use energy weapons',
    },
    kyiv: {
      name: 'KYIV — WHEAT FIELD',
      country: 'UKRAINE',
      coords: { lat: 50.4501, lng: 30.5234 },
      scale: 0.001,
      mapSize: 220,
      terrain: 'plains',
      landmarks: [
        { name: 'Maidan Square', x: 0, z: 0, type: 'central' },
        { name: 'Dnipro River', x: 0, z: 20, type: 'water' },
        { name: 'Trench Network', x: -30, z: -10, type: 'trench' },
        { name: 'Drone Factory', x: 25, z: -20, type: 'industrial' },
        { name: 'Air Defense', x: 0, z: -30, type: 'defense' },
      ],
      defconLevel: 2,
      special: 'Active drone warfare — both sides have combat drones',
    },
  },

  // Non-Euclidean topology — space that doesn't follow normal geometry
  topologyTypes: {
    standard: { name: 'Standard', desc: 'Normal 3D space' },
    hyperbolic: {
      name: 'Hyperbolic',
      desc: 'Space curves — corridors that look short are long, rooms bigger inside',
      effect: 'distance_distortion',
    },
    spherical: {
      name: 'Spherical',
      desc: 'Walking far enough in one direction brings you back',
      effect: 'looping_space',
    },
    fractal: {
      name: 'Fractal',
      desc: 'Self-similar structures — every room contains a smaller version of itself',
      effect: 'recursive_space',
    },
    mobius: {
      name: 'Möbius',
      desc: 'Space has one surface — left becomes right as you traverse',
      effect: 'orientation_flip',
    },
    portal_network: {
      name: 'Portal Network',
      desc: 'Pre-existing dimensional portals connect non-adjacent areas',
      effect: 'non_contiguous',
    },
    time_dilated: {
      name: 'Time Dilated',
      desc: 'Different zones have different time flow rates',
      effect: 'variable_time',
    },
  },

  // Apply topology to a map
  applyTopology(mapKey, topologyType) {
    const map = this.realWorldMaps[mapKey];
    const topology = this.topologyTypes[topologyType];
    if (!map || !topology) return null;
    return { ...map, topology: topology };
  },
};

// ====== 5. HIGHER-DIMENSIONAL WEAPON PHYSICS ======
// Weapons that interact with dimensions in unique ways

const DIMENSIONAL_WEAPONS = {
  phase_shift_dmr: {
    name: 'PHASE-SHIFT DMR',
    desc: 'Bullet exists in superposition until impact — phases through 3 layers of cover',
    type: 'energy', dmg: 80, rate: 500, mag: 20, range: 400,
    physics: {
      phaseThroughCover: 3, // phases through 3 walls/obstacles
      superposition: true, // bullet is in all positions until observed (impact)
      quantumCollapse: 'on_target_detection',
    },
    era: 10, country: 'GALACTIC', price: 25000,
  },
  singularity_smg: {
    name: 'SINGULARITY SMG',
    desc: 'Fires compressed micro-black-hole rounds that pull enemy cover inward',
    type: 'energy', dmg: 25, rate: 100, mag: 40, range: 80,
    physics: {
      gravityPull: true, // pulls nearby objects toward impact point
      pullRadius: 3,
      pullForce: 0.5,
      pullDuration: 1000,
    },
    era: 10, country: 'GALACTIC', price: 18000,
  },
  tachyon_sniper_pro: {
    name: 'TACHYON SNIPER PRO',
    desc: 'Bullet arrives BEFORE you fire — target takes damage, THEN muzzle flash appears',
    type: 'energy', dmg: 400, rate: 3000, mag: 5, range: 5000,
    physics: {
      timeReversal: 200, // damage applied 200ms before visual shot
      retrocausal: true,
    },
    era: 11, country: 'STELLAR', price: 80000,
  },
  void_annihilator: {
    name: 'VOID ANNIHILATOR',
    desc: 'Removes a 3m sphere of reality — anything inside ceases to exist for 5s',
    type: 'special', dmg: 150, rate: 4000, mag: 3, range: 100,
    physics: {
      voidZone: true, zoneRadius: 3, zoneDuration: 5000,
      entitiesInZone: 'cease_existence',
    },
    era: 11, country: 'STELLAR', price: 50000,
    premiumRequired: 'OPERATIVE',
  },
  reality_anchor_gun: {
    name: 'REALITY ANCHOR GUN',
    desc: 'Locks a 20m area — NO dimensional abilities work inside (counter-play)',
    type: 'special', dmg: 0, rate: 8000, mag: 1, range: 0,
    physics: {
      realityLock: true, lockRadius: 20, lockDuration: 10000,
      blocks: ['time', 'quantum', 'void', 'cosmic', 'ana_kata'],
    },
    era: 11, country: 'STELLAR', price: 40000,
  },
  dimensional_rift_opener: {
    name: 'DIMENSIONAL RIFT OPENER',
    desc: 'Opens a portal between two map points — bullets, players, and objects can travel through',
    type: 'special', dmg: 0, rate: 5000, mag: 2, range: 200,
    physics: {
      opensPortal: true, portalDuration: 10000,
      portalA: 'aim_point', portalB: 'player_position',
    },
    era: 11, country: 'STELLAR', price: 60000,
    premiumRequired: 'COMMANDER',
  },
  multiverse_cannon: {
    name: 'MULTIVERSE CANNON',
    desc: 'Fires a projectile that exists in all parallel universes simultaneously — hits through any cover, any dimension, any quantum state',
    type: 'special', dmg: 500, rate: 5000, mag: 3, range: 2000,
    physics: {
      multiverseHit: true, // hits in all dimensions/quantum states
      ignoresAllCover: true,
      ignoresAllDimensions: true,
      unstoppable: true,
    },
    era: 11, country: 'STELLAR', price: 150000,
    premiumRequired: 'SUPREME',
  },
  cosmic_amplifier_gun: {
    name: 'COSMIC AMPLIFIER',
    desc: 'Each active dimension multiplies damage — 1D=1x, 4D=4x, 8D=8x',
    type: 'energy', dmg: 50, rate: 300, mag: 20, range: 500,
    physics: {
      dimensionalScaling: true,
      scalesWith: ['space', 'ana_kata', 'time', 'quantum', 'void', 'cosmic'],
      maxMultiplier: 8,
    },
    era: 11, country: 'STELLAR', price: 100000,
    premiumRequired: 'COMMANDER',
  },
};

// Merge dimensional weapons into expanded database
if (typeof WEAPON_DB_EXPANDED !== 'undefined') {
  Object.assign(WEAPON_DB_EXPANDED, DIMENSIONAL_WEAPONS);
}

// Export
if (typeof module !== 'undefined') module.exports = {
  BANISHMENT, HYPER_ATTACHMENTS, applyAttachment,
  ARCHITECT_SYSTEM, NON_EUCLIDEAN_MAPS, DIMENSIONAL_WEAPONS
};
