// ====== OMEGA-8D: COGNITIVE WAR SIMULATOR ======
// 1. Military-Grade Cognitive Stress Testing AI
// 2. Squad Expertise System (2 experts per field per team)
// 3. Non-Euclidean Combat Mechanics (space folding, LoS bending)
// 4. Permanent Environmental Destruction
// 5. Sensory Overload & Cognitive Challenge System

// ====== 1. COGNITIVE STRESS TESTING AI ======
// AI designed to be unpredictable — for defense training level difficulty

const COGNITIVE_AI = {
  // AI personality archetypes — each creates different stress
  archetypes: {
    predator: {
      name: 'PREDATOR',
      desc: 'Stalks players, attacks from blind spots, uses dimensions to flank',
      behavior: {
        aggression: 0.7, stealth: 0.9, dimensionUse: 0.8,
        flankRate: 0.8, pursuit: 0.9, retreat: 0.2,
        preferredTactic: 'dimensional_flank',
        unpredictability: 0.6,
      },
      stressType: 'paranoia', // player never feels safe
    },
    swarm: {
      name: 'SWARM',
      desc: 'Overwhelming numbers from multiple dimensions simultaneously',
      behavior: {
        aggression: 1.0, stealth: 0.1, dimensionUse: 0.5,
        flankRate: 0.3, pursuit: 1.0, retreat: 0.0,
        preferredTactic: 'multi_dimensional_rush',
        unpredictability: 0.3,
      },
      stressType: 'sensory_overload', // too many threats at once
    },
    ghost: {
      name: 'GHOST',
      desc: 'Phase shifts constantly, attacks and disappears into 4D/6D',
      behavior: {
        aggression: 0.4, stealth: 1.0, dimensionUse: 1.0,
        flankRate: 0.9, pursuit: 0.3, retreat: 0.7,
        preferredTactic: 'phase_hit_and_run',
        unpredictability: 0.9,
      },
      stressType: 'disorientation', // can't track the threat
    },
    tactician: {
      name: 'TACTICIAN',
      desc: 'Adapts to player patterns, counters strategies, uses terrain',
      behavior: {
        aggression: 0.5, stealth: 0.6, dimensionUse: 0.7,
        flankRate: 0.7, pursuit: 0.5, retreat: 0.5,
        preferredTactic: 'adaptive_counter',
        unpredictability: 0.8,
      },
      stressType: 'cognitive_load', // forces strategic thinking
    },
    berserker: {
      name: 'BERSERKER',
      desc: 'Aggressive, no retreat, uses heavy weapons, charges through dimensions',
      behavior: {
        aggression: 1.0, stealth: 0.0, dimensionUse: 0.6,
        flankRate: 0.2, pursuit: 1.0, retreat: 0.0,
        preferredTactic: 'dimensional_charge',
        unpredictability: 0.5,
      },
      stressType: 'panic', // overwhelming pressure
    },
    void_master: {
      name: 'VOID MASTER',
      desc: 'Uses VOID dimension — banishes squad members, creates void zones',
      behavior: {
        aggression: 0.6, stealth: 0.7, dimensionUse: 1.0,
        flankRate: 0.6, pursuit: 0.4, retreat: 0.4,
        preferredTactic: 'void_isolation',
        preferredAbility: 'void_banish',
        unpredictability: 0.85,
      },
      stressType: 'existential', // squad members disappearing
    },
    cosmic_entity: {
      name: 'COSMIC ENTITY',
      desc: 'Uses 8D — teleports squad to deep space, bends reality',
      behavior: {
        aggression: 0.5, stealth: 0.8, dimensionUse: 1.0,
        flankRate: 0.5, pursuit: 0.3, retreat: 0.5,
        preferredTactic: 'reality_distortion',
        preferredAbility: 'cosmic_teleport',
        unpredictability: 1.0,
      },
      stressType: 'reality_break', // physics stop working
    },
  },

  // Adaptive AI — learns from player behavior
  adaptiveMemory: new Map(), // playerId → behavior patterns

  // Track player patterns and counter them
  analyzePlayer(playerId, action) {
    if (!this.adaptiveMemory.has(playerId)) {
      this.adaptiveMemory.set(playerId, {
        preferredRoutes: [],
        preferredWeapons: [],
        reactionTime: [],
        dimensionalUse: 0,
        aggressionLevel: 0,
        coverUsage: 0,
        flankDirection: 'left', // observed preference
        weaknesses: [],
        patterns: [],
      });
    }
    const profile = this.adaptiveMemory.get(playerId);

    // Learn from actions
    if (action.type === 'move') profile.preferredRoutes.push(action.direction);
    if (action.type === 'shoot') profile.preferredWeapons.push(action.weapon);
    if (action.type === 'dimension') profile.dimensionalUse++;
    if (action.type === 'aggressive') profile.aggressionLevel++;
    if (action.type === 'cover') profile.coverUsage++;
    if (action.type === 'reaction') profile.reactionTime.push(action.time);

    // Identify patterns
    if (profile.preferredRoutes.length > 10) {
      const leftCount = profile.preferredRoutes.filter(r => r === 'left').length;
      const rightCount = profile.preferredRoutes.filter(r => r === 'right').length;
      profile.flankDirection = leftCount > rightCount ? 'left' : 'right';
    }

    // Identify weaknesses
    if (profile.reactionTime.length > 5) {
      const avg = profile.reactionTime.reduce((a,b) => a+b, 0) / profile.reactionTime.length;
      if (avg > 500) profile.weaknesses.push('slow_reaction');
      if (avg > 1000) profile.weaknesses.push('very_slow');
    }
    if (profile.dimensionalUse < 2) profile.weaknesses.push('dimension_averse');
    if (profile.coverUsage > 20) profile.weaknesses.push('cover_dependent');

    return profile;
  },

  // Generate AI counter-strategy based on player profile
  generateCounterStrategy(playerId) {
    const profile = this.adaptiveMemory.get(playerId);
    if (!profile) return { tactic: 'standard', archetype: 'predator' };

    let tactic = 'standard';
    let archetype = 'predator';

    // Counter player weaknesses
    if (profile.weaknesses.includes('slow_reaction')) {
      archetype = 'swarm'; // overwhelm slow players
      tactic = 'multi_angle_attack';
    }
    if (profile.weaknesses.includes('dimension_averse')) {
      archetype = 'ghost'; // force dimensional combat
      tactic = 'dimensional_harassment';
    }
    if (profile.weaknesses.includes('cover_dependent')) {
      archetype = 'tactician'; // flush from cover
      tactic = 'cover_destruction';
    }
    if (profile.weaknesses.includes('very_slow')) {
      archetype = 'berserker'; // pure aggression
      tactic = 'overwhelm';
    }

    // Counter preferred flanking direction
    if (profile.flankDirection === 'left') {
      tactic += '_counter_left';
    } else {
      tactic += '_counter_right';
    }

    return { tactic, archetype, profile };
  },

  // Generate stress scenario for cognitive training
  generateStressScenario(difficulty) {
    const scenarios = [
      {
        name: 'THREAT FLOOD',
        desc: '12 enemies from 4 directions, 2 using 4D, 1 in quantum state',
        difficulty: 5, stressType: 'sensory_overload',
        enemies: 12, dimensions: [4, 6], timeLimit: 120,
      },
      {
        name: 'GHOST HUNT',
        desc: '3 phase-shifting enemies you can barely see. No minimap.',
        difficulty: 6, stressType: 'disorientation',
        enemies: 3, dimensions: [4, 5, 6], timeLimit: 180, disableMinimap: true,
      },
      {
        name: 'DIMENSIONAL SIEGE',
        desc: 'Enemies attack from 4D, 6D, and 7D simultaneously. VOID zones spawn.',
        difficulty: 7, stressType: 'existential',
        enemies: 8, dimensions: [4, 6, 7], timeLimit: 240, voidZones: true,
      },
      {
        name: 'REALITY COLLAPSE',
        desc: '8D entity bends the map. Gravity reverses. Portals open randomly. Survive.',
        difficulty: 9, stressType: 'reality_break',
        enemies: 5, dimensions: [4, 5, 6, 7, 8], timeLimit: 300,
        gravityFlip: true, randomPortals: true, realityDistortion: true,
      },
      {
        name: 'COGNITIVE OVERLOAD',
        desc: 'Everything at once. 15 enemies, all dimensions, sensory distortion, no HUD.',
        difficulty: 10, stressType: 'maximum',
        enemies: 15, dimensions: [4, 5, 6, 7, 8], timeLimit: 300,
        disableHUD: true, disableMinimap: true, sensoryDistortion: true,
        gravityFlip: true, randomPortals: true, voidZones: true,
      },
    ];
    return scenarios[Math.min(difficulty - 1, scenarios.length - 1)] || scenarios[0];
  },
};

// ====== 2. SENSORY OVERLOAD SYSTEM ======
// Mechanics that stress the player's cognitive abilities

const SENSORY_OVERLOAD = {
  // Visual distortions
  visualEffects: {
    hud_glitch: {
      name: 'HUD Glitch', desc: 'HUD flickers, shows wrong info, scrambles minimap',
      trigger: 'quantum_shift', duration: 3000, severity: 'medium',
      effect: { scrambleMinimap: true, fakeHealth: true, wrongAmmo: true },
    },
    dimensional_bleed: {
      name: 'Dimensional Bleed', desc: 'See echoes of other quantum realities overlaid',
      trigger: 'quantum_state_change', duration: 5000, severity: 'high',
      effect: { seeOtherRealities: true, ghostEnemies: 3, disorientation: 0.4 },
    },
    void_corruption: {
      name: 'Void Corruption', desc: 'Screen darkens, VOID tendrils creep from edges',
      trigger: 'void_ability_nearby', duration: 8000, severity: 'extreme',
      effect: { vignette: 0.7, screenDarken: 0.5, hallucinations: true },
    },
    time_dilation: {
      name: 'Time Dilation', desc: 'Time perception warps — actions feel delayed',
      trigger: 'temporal_weapon_hit', duration: 2000, severity: 'high',
      effect: { inputDelay: 100, visualSlow: 0.8, audioDistort: true },
    },
    cosmic_distortion: {
      name: 'Cosmic Distortion', desc: 'Reality bends — walls curve, floor tilts, gravity shifts',
      trigger: '8d_ability_nearby', duration: 10000, severity: 'extreme',
      effect: { screenWarp: true, gravityShift: true, colorInvert: 0.3 },
    },
    sensory_deprivation: {
      name: 'Sensory Deprivation', desc: 'Complete blackout — no visuals, only audio cues',
      trigger: 'void_banishment', duration: 5000, severity: 'maximum',
      effect: { blackout: true, audioOnly: true },
    },
  },

  // Audio distortions
  audioEffects: {
    dimensional_echo: {
      name: 'Dimensional Echo', desc: 'Gunshots echo from wrong directions',
      effect: { fakeDirection: true, echoDelay: 200 },
    },
    void_whisper: {
      name: 'Void Whisper', desc: 'Whispering sounds from the VOID dimension',
      effect: { ambientHorror: true, directional: false },
    },
    tachyon_reversal: {
      name: 'Tachyon Reversal', desc: 'Sound plays backwards — you hear the hit before the shot',
      effect: { reverseAudio: true, timeOffset: -200 },
    },
    frequency_scramble: {
      name: 'Frequency Scramble', desc: 'All audio pitched to disorienting frequencies',
      effect: { pitchShift: 0.5, disorient: true },
    },
  },

  // Apply sensory effect to player
  applyEffect(playerId, effectName) {
    const effect = this.visualEffects[effectName] || this.audioEffects[effectName];
    if (!effect) return null;
    return {
      playerId, effect: effectName, startTime: Date.now(),
      duration: effect.duration || 5000, active: true,
    };
  },
};

// ====== 3. SQUAD EXPERTISE SYSTEM ======
// Each team needs 2 experts in each field — simulates real wartime composition

const SQUAD_EXPERTISE = {
  // Expertise fields
  fields: {
    sniper_ops: {
      name: 'Sniper Operations',
      expertsPerTeam: 2,
      desc: 'Long-range elimination, overwatch, counter-sniper',
      abilities: ['long_range_engagement', 'target_spotting', 'counter_sniper', 'overwatch_cover'],
      synergy: 'Two snipers create crossfire — enemies caught between two sightlines',
      bonusWhenPaired: { damage: 1.2, detection: 1.5 },
    },
    close_quarters: {
      name: 'Close Quarters Combat',
      expertsPerTeam: 2,
      desc: 'Breaching, room clearing, shotgun/SMG specialist',
      abilities: ['room_clearing', 'breach_and_clear', 'flashbang_entry', 'melee_combat'],
      synergy: 'Two CQC ops clear buildings 40% faster',
      bonusWhenPaired: { speed: 1.4, closeDmg: 1.3 },
    },
    combat_medic: {
      name: 'Combat Medicine',
      expertsPerTeam: 2,
      desc: 'Field healing, revive, triage, medical supply management',
      abilities: ['field_heal', 'fast_revive', 'medical_drone', 'triage_priority'],
      synergy: 'Two medics = chain revive — fallen squadmates revive each other',
      bonusWhenPaired: { healSpeed: 2.0, reviveTime: 0.5 },
    },
    demolitions: {
      name: 'Demolitions & Breaching',
      expertsPerTeam: 2,
      desc: 'Explosives, structural destruction, mine laying',
      abilities: ['breach_explosives', 'c4_placement', 'mine_field', 'vehicle_sabotage'],
      synergy: 'Two demo experts can collapse entire buildings',
      bonusWhenPaired: { explosiveDmg: 1.5, destructionRadius: 1.3 },
    },
    engineering: {
      name: 'Combat Engineering',
      expertsPerTeam: 2,
      desc: 'Build fortifications, repair vehicles, deploy tech',
      abilities: ['build_cover', 'repair_vehicle', 'deploy_turret', 'bridge_construction'],
      synergy: 'Two engineers build fortifications 3x faster',
      bonusWhenPaired: { buildSpeed: 3.0, repairSpeed: 2.0 },
    },
    recon_intel: {
      name: 'Reconnaissance & Intelligence',
      expertsPerTeam: 2,
      desc: 'Scouting, enemy detection, electronic warfare',
      abilities: ['enemy_scan', 'drone_recon', 'comms_intercept', 'electronic_warfare'],
      synergy: 'Two recon = full map awareness + enemy ability interception',
      bonusWhenPaired: { detectionRange: 2.0, intelSpeed: 1.5 },
    },
    heavy_support: {
      name: 'Heavy Weapons Support',
      expertsPerTeam: 2,
      desc: 'Suppressive fire, anti-vehicle, area denial',
      abilities: ['suppressive_fire', 'anti_vehicle', 'area_denial', 'ammo_resupply'],
      synergy: 'Two heavy gunners = permanent suppressive fire rotation',
      bonusWhenPaired: { fireRate: 1.3, suppressEffect: 1.5 },
    },
    stealth_infiltration: {
      name: 'Stealth & Infiltration',
      expertsPerTeam: 2,
      desc: 'Undetected movement, silent elimination, sabotage',
      abilities: ['cloak', 'silent_kill', 'security_bypass', 'sabotage'],
      synergy: 'Two stealth ops can clear an entire compound undetected',
      bonusWhenPaired: { stealthDuration: 1.5, silentDmg: 1.4 },
    },
    dimensional_warfare: {
      name: 'Dimensional Warfare (Premium)',
      expertsPerTeam: 2,
      desc: '7D/8D abilities, void banishment, cosmic teleportation',
      abilities: ['void_banish', 'cosmic_teleport', 'reality_anchor', 'dimensional_recon'],
      synergy: 'Two dimensional ops can lock an entire area in 8D — no one escapes',
      bonusWhenPaired: { dimPower: 2.0, banishSpeed: 1.5 },
      premiumRequired: 'OPERATIVE',
    },
    anti_air: {
      name: 'Anti-Air Defense',
      expertsPerTeam: 2,
      desc: 'Counter drones, missiles, aircraft, orbital strikes',
      abilities: ['drone_intercept', 'missile_defense', 'air_superiority', 'counter_orbital'],
      synergy: 'Two AA experts create an impenetrable air defense bubble',
      bonusWhenPaired: { interceptRate: 2.0, defenseRange: 1.5 },
    },
  },

  // Validate squad composition
  validateSquad(squad) {
    const requiredFields = Object.keys(this.fields);
    const issues = [];

    for (const fieldKey of requiredFields) {
      const field = this.fields[fieldKey];
      const experts = squad.filter(m => m.expertise === fieldKey);
      if (experts.length < field.expertsPerTeam) {
        issues.push({
          field: field.name,
          current: experts.length,
          required: field.expertsPerTeam,
          message: 'Need ' + (field.expertsPerTeam - experts.length) + ' more ' + field.name + ' expert(s)',
        });
      }
    }

    return {
      valid: issues.length === 0,
      issues,
      squadSize: squad.length,
      requiredSize: requiredFields.length * 2, // 20 members
    };
  },

  // Calculate squad synergy bonuses
  calculateSynergy(squad) {
    const bonuses = {};
    const pairs = {};

    for (const fieldKey of Object.keys(this.fields)) {
      const field = this.fields[fieldKey];
      const experts = squad.filter(m => m.expertise === fieldKey);
      pairs[fieldKey] = experts.length;

      if (experts.length >= 2) {
        // Apply paired bonus
        const bonus = field.bonusWhenPaired;
        for (const [key, value] of Object.entries(bonus)) {
          bonuses[key] = (bonuses[key] || 1) * value;
        }
      }
    }

    return { bonuses, pairs };
  },

  // Generate AI squad with proper composition
  generateAISquad(difficulty) {
    const squad = [];
    const fields = Object.keys(this.fields);

    for (const fieldKey of fields) {
      const field = this.fields[fieldKey];
      for (let i = 0; i < field.expertsPerTeam; i++) {
        squad.push({
          id: 'ai_' + fieldKey + '_' + i,
          name: field.name + ' Op ' + (i + 1),
          expertise: fieldKey,
          health: 100 + difficulty * 10,
          accuracy: 0.5 + difficulty * 0.05,
          aggression: 0.3 + difficulty * 0.07,
          dimensional: fieldKey === 'dimensional_warfare',
          abilities: field.abilities,
          isAI: true,
        });
      }
    }
    return squad;
  },
};

// ====== 4. NON-EUCLIDEAN COMBAT MECHANICS ======
// Space folding, line-of-sight bending, hyper-dimensional shooting

const NEUCLIDEAN_COMBAT = {
  // Space fold — sniper bends line of sight through 4th dimension
  spaceFold: {
    name: 'SPACE FOLD SHOT',
    desc: 'Sniper bends the 4th spatial axis — bullet exits from behind the target',
    requirements: { dim4: true, weapon: 'sniper', minLevel: 50 },
    mechanic: {
      // Player aims at target
      // Bullet enters 4D, travels through Ana/Kata axis
      // Bullet exits 3D space behind target's cover
      // Visual: bullet trail curves through a dimensional fold
      foldAngle: '4th_axis',
      bypassesCover: 3, // bypasses up to 3 layers of cover
      damageMultiplier: 1.5,
      cooldown: 8000,
    },
  },

  // Hyper-dimensional angle shot
  hyperAngleShot: {
    name: 'HYPER-ANGLE SHOT',
    desc: 'Bullet travels through a 5th-dimensional angle to hit targets behind walls',
    requirements: { dim5: true, weapon: 'sniper', minLevel: 100 },
    mechanic: {
      angle: '5th_dimensional',
      bypassesCover: 5,
      damageMultiplier: 1.3,
      cooldown: 12000,
    },
  },

  // Quantum tunnel shot
  quantumTunnel: {
    name: 'QUANTUM TUNNEL SHOT',
    desc: 'Bullet exists in all 3 quantum states — hits target regardless of their quantum position',
    requirements: { dim6: true, weapon: 'any', minLevel: 75 },
    mechanic: {
      hitsAllQuantum: true,
      damageMultiplier: 0.8, // less damage but guaranteed hit
      cooldown: 6000,
    },
  },

  // Void shot
  voidShot: {
    name: 'VOID SHOT',
    desc: 'Bullet enters the VOID and exits directly at the target — no cover exists in VOID',
    requirements: { dim7: true, weapon: 'any', premium: 'OPERATIVE' },
    mechanic: {
      bypassesAllCover: true,
      damageMultiplier: 1.2,
      cooldown: 15000,
      voidBanish: 1000, // brief banish on hit
    },
  },

  // Cosmic shot
  cosmicShot: {
    name: 'COSMIC SHOT',
    desc: 'Bullet travels through another galaxy and arrives at the target from an impossible angle',
    requirements: { dim8: true, weapon: 'any', premium: 'COMMANDER' },
    mechanic: {
      bypassesAllCover: true,
      bypassesAllDimensions: true,
      damageMultiplier: 2.0,
      cooldown: 30000,
      visualEffect: 'galaxy_portal',
    },
  },

  // Non-Euclidean map features
  mapFeatures: {
    hyperbolic_corridor: {
      name: 'Hyperbolic Corridor',
      desc: 'A hallway that appears 10m long but takes 100m to traverse',
      effect: 'distance_distortion',
      visualCue: 'corridor_stretches',
    },
    klein_room: {
      name: 'Klein Room',
      desc: 'A room with no inside or outside — bullets fired inside hit the shooter',
      effect: 'self_hit_risk',
      visualCue: 'orientation_flip',
    },
    recursive_chamber: {
      name: 'Recursive Chamber',
      desc: 'A room that contains a smaller copy of itself infinitely',
      effect: 'recursive_space',
      visualCue: 'infinite_zoom',
    },
    tesseract_portal: {
      name: 'Tesseract Portal',
      desc: 'A 4D cube unfolded into 3D — entering one face exits from any other face',
      effect: 'non_contiguous_travel',
      visualCue: 'unfolding_cube',
    },
  },

  // Bend line of sight calculation
  calculateBentShot(originPos, targetPos, dimension) {
    // In standard 3D, LoS is a straight line
    // In 4D, the bullet can travel through the W-axis and emerge behind cover
    // In 5D, the bullet can travel through time (arrives before it was fired)
    // In 6D, the bullet hits in all quantum states
    // In 7D, the bullet goes through VOID (no cover exists)
    // In 8D, the bullet travels through another galaxy

    const result = {
      canHit: true,
      bypassesCover: 0,
      damageMultiplier: 1.0,
      visualPath: 'straight',
    };

    switch (dimension) {
      case 3: result.visualPath = 'straight'; break;
      case 4: result.bypassesCover = 3; result.damageMultiplier = 1.5; result.visualPath = '4d_fold'; break;
      case 5: result.bypassesCover = 5; result.damageMultiplier = 1.3; result.visualPath = 'temporal_arc'; break;
      case 6: result.hitsAllQuantum = true; result.damageMultiplier = 0.8; result.visualPath = 'quantum_split'; break;
      case 7: result.bypassesCover = 999; result.damageMultiplier = 1.2; result.visualPath = 'void_tunnel'; break;
      case 8: result.bypassesCover = 999; result.bypassesAllDimensions = true; result.damageMultiplier = 2.0; result.visualPath = 'galaxy_arc'; break;
    }

    return result;
  },
};

// ====== 5. PERMANENT ENVIRONMENTAL DESTRUCTION ======
// Destruction that permanently alters maps for future matches

const DESTRUCTION_SYSTEM = {
  // Destruction types
  types: {
    building_collapse: {
      name: 'Building Collapse',
      desc: 'Destroy enough structural supports and the building collapses',
      trigger: 'demolitions_expert + C4',
      permanent: true,
      effect: 'creates_rubble_cover + blocks_sightlines',
    },
    wall_breach: {
      name: 'Wall Breach',
      desc: 'Blow a hole in a wall — creates new passage and sightline',
      trigger: 'explosive or dimensional weapon',
      permanent: true,
      effect: 'new_passage + new_sightline',
    },
    floor_collapse: {
      name: 'Floor Collapse',
      desc: 'Destroy floor — upper levels fall, creates vertical access',
      trigger: 'heavy weapons or void weapon',
      permanent: true,
      effect: 'vertical_access + destruction',
    },
    dimensional_tear: {
      name: 'Dimensional Tear',
      desc: '8D ability tears a permanent hole in space',
      trigger: '8D cosmic ability',
      permanent: true,
      effect: 'permanent_portal + hazard',
      creator: true, // bears creator's tag
    },
    crater: {
      name: 'Crater',
      desc: 'Large explosion creates a crater — provides cover and changes terrain',
      trigger: 'airstrike, orbital strike, singularity weapon',
      permanent: true,
      effect: 'cover + terrain_change',
    },
    void_scar: {
      name: 'Void Scar',
      desc: 'VOID ability leaves a permanent scar — damages anyone who enters',
      trigger: '7D void ability',
      permanent: true,
      effect: 'damage_zone + hazard',
      creator: true,
    },
  },

  // Track all destruction per map
  destructionDB: new Map(), // mapId -> destruction records

  // Record destruction
  record(mapId, type, position, creatorId, creatorTag) {
    const record = {
      id: 'dest_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      mapId, type, position: { x: position.x, y: position.y || 0, z: position.z },
      creatorId, creatorTag: creatorTag || 'UNKNOWN',
      createdAt: Date.now(),
      permanent: true,
    };

    if (!this.destructionDB.has(mapId)) this.destructionDB.set(mapId, []);
    this.destructionDB.get(mapId).push(record);
    return record;
  },

  // Get all destruction for a map
  getMapDestruction(mapId) {
    return this.destructionDB.get(mapId) || [];
  },

  // Apply destruction to game scene (visual + collision changes)
  applyToScene(mapId, scene) {
    const records = this.getMapDestruction(mapId);
    // This would modify the 3D scene — remove walls, create rubble, add portals
    return records.map(r => ({
      type: r.type,
      pos: r.position,
      creator: r.creatorTag,
      age: Date.now() - r.createdAt,
    }));
  },
};

// ====== 6. DEFENSE TRAINING CERTIFICATION ======
// System that rates player cognitive performance — for "defense training" legitimacy

const TRAINING_CERT = {
  metrics: [
    { name: 'Reaction Time',      desc: 'How fast you respond to threats',              weight: 15 },
    { name: 'Spatial Awareness',   desc: 'Track enemies across dimensions',             weight: 15 },
    { name: 'Threat Prioritization',desc: 'Choose the right target under pressure',      weight: 12 },
    { name: 'Dimensional Aptitude', desc: 'Use 4D-8D mechanics effectively',           weight: 15 },
    { name: 'Squad Coordination',   desc: 'Work with team, cover weaknesses',           weight: 13 },
    { name: 'Sensory Resilience',   desc: 'Perform under sensory overload',             weight: 10 },
    { name: 'Tactical Adaptation',  desc: 'Adapt when enemy counters your strategy',    weight: 10 },
    { name: 'Cognitive Endurance',  desc: 'Maintain performance over long matches',     weight: 10 },
  ],

  // Rate a player's performance
  ratePlayer(stats) {
    let totalScore = 0;
    const breakdown = {};

    for (const metric of this.metrics) {
      const score = Math.min(100, stats[metric.name] || 50);
      breakdown[metric.name] = score;
      totalScore += (score * metric.weight / 100);
    }

    const tier =
      totalScore >= 90 ? 'TIER S — ELITE OPERATOR' :
      totalScore >= 80 ? 'TIER A — ADVANCED' :
      totalScore >= 70 ? 'TIER B — PROFICIENT' :
      totalScore >= 60 ? 'TIER C — COMPETENT' :
      totalScore >= 40 ? 'TIER D — BASIC' :
      'TIER F — RECRUIT';

    return { totalScore: Math.round(totalScore), tier, breakdown };
  },

  // Generate training certificate
  generateCertificate(playerName, stats) {
    const rating = this.ratePlayer(stats);
    return {
      player: playerName,
      date: new Date().toISOString(),
      overallScore: rating.totalScore,
      tier: rating.tier,
      metrics: rating.breakdown,
      certId: 'OMEGA8D-CERT-' + Date.now(),
      note: 'This CHRONOFALL OMEGA-8D training certificate rates cognitive combat performance across ' +
            'multi-dimensional threat assessment, sensory resilience, and tactical adaptation. ' +
            'Designed for institutional-grade cognitive stress testing.',
    };
  },
};

// Export
if (typeof module !== 'undefined') module.exports = {
  COGNITIVE_AI, SENSORY_OVERLOAD, SQUAD_EXPERTISE,
  NEUCLIDEAN_COMBAT, DESTRUCTION_SYSTEM, TRAINING_CERT
};
