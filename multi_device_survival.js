/**
 * OMEGA-8D MULTI-DEVICE LOGIN & DOOMSDAY SURVIVAL SYSTEM
 * =====================================================
 * 1. One account, multiple devices, multiple campaigns simultaneously
 * 2. Survival traits that let you live through doomsday outside a bunker
 */

// ============================================================
// 1. MULTI-DEVICE LOGIN SYSTEM
// ============================================================
const MULTI_DEVICE = {
  // Tier requirements for multi-device login
  tierAccess: {
    free: {
      maxDevices: 1,
      maxSimultaneousCampaigns: 1,
      description: 'Single device, single campaign. Standard play.',
    },
    bronze: {
      maxDevices: 1,
      maxSimultaneousCampaigns: 1,
      cost: 500,
      description: 'Same as free but with cosmetics.',
    },
    silver: {
      maxDevices: 2,
      maxSimultaneousCampaigns: 2,
      cost: 2000,
      description: 'Login on 2 devices. Play in 2 country campaigns simultaneously.',
    },
    gold: {
      maxDevices: 3,
      maxSimultaneousCampaigns: 3,
      cost: 8000,
      description: 'Login on 3 devices. Play in 3 country campaigns simultaneously.',
    },
    platinum: {
      maxDevices: 4,
      maxSimultaneousCampaigns: 4,
      cost: 25000,
      description: 'Login on 4 devices. Play in 4 country campaigns simultaneously.',
    },
    supreme: {
      maxDevices: 4,
      maxSimultaneousCampaigns: 12, // ALL countries you are enrolled in
      cost: 100000,
      description: 'Login on 4 devices. Play in ALL 12 of your countries simultaneously.',
    },
  },

  // Device registration
  devices: {}, // playerId -> { devices: [...], sessions: [...] }

  registerDevice(playerId, deviceInfo) {
    if (!this.devices[playerId]) {
      this.devices[playerId] = {
        devices: [],
        sessions: [],
        maxDevices: 1,
      };
    }

    const player = this.devices[playerId];
    const deviceId = deviceInfo.deviceId || 'DEV-' + Date.now();

    // Check if device already registered
    const existing = player.devices.find(d => d.deviceId === deviceId);
    if (existing) {
      existing.lastLogin = new Date().toISOString();
      return { success: true, deviceId, message: 'Device reconnected' };
    }

    // Check max devices
    if (player.devices.length >= player.maxDevices) {
      return {
        success: false,
        error: 'Max devices reached for your tier (' + player.maxDevices + '). Upgrade to play on more devices.',
        currentTier: player.tier || 'free',
        maxDevices: player.maxDevices,
      };
    }

    player.devices.push({
      deviceId,
      deviceName: deviceInfo.deviceName || 'Unknown Device',
      platform: deviceInfo.platform || 'web', // web, mobile, console, tablet
      registered: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      active: true,
    });

    return {
      success: true,
      deviceId,
      deviceCount: player.devices.length,
      maxDevices: player.maxDevices,
      remainingSlots: player.maxDevices - player.devices.length,
    };
  },

  // Set player tier (updates max devices)
  setTier(playerId, tier) {
    if (!this.devices[playerId]) {
      this.devices[playerId] = { devices: [], sessions: [], maxDevices: 1 };
    }
    const tierData = this.tierAccess[tier];
    if (!tierData) return { success: false, error: 'Invalid tier' };

    this.devices[playerId].tier = tier;
    this.devices[playerId].maxDevices = tierData.maxDevices;
    this.devices[playerId].maxSimultaneousCampaigns = tierData.maxSimultaneousCampaigns;

    return {
      success: true,
      tier,
      maxDevices: tierData.maxDevices,
      maxSimultaneousCampaigns: tierData.maxSimultaneousCampaigns,
      description: tierData.description,
    };
  },

  // Start a session on a device (joining a campaign)
  startSession(playerId, deviceId, countryCode, campaignId) {
    const player = this.devices[playerId];
    if (!player) return { success: false, error: 'Not registered' };

    const device = player.devices.find(d => d.deviceId === deviceId);
    if (!device) return { success: false, error: 'Device not registered' };

    // Count active sessions
    const activeSessions = player.sessions.filter(s => s.active);
    if (activeSessions.length >= player.maxSimultaneousCampaigns) {
      return {
        success: false,
        error: 'Max simultaneous campaigns reached (' + player.maxSimultaneousCampaigns + '). End a session or upgrade your tier.',
        activeSessions: activeSessions.length,
        maxSimultaneousCampaigns: player.maxSimultaneousCampaigns,
      };
    }

    // Check if already in this country's campaign on another device
    const existingInCountry = activeSessions.find(s => s.country === countryCode);
    if (existingInCountry) {
      return {
        success: false,
        error: 'Already playing in ' + countryCode + ' on device ' + existingInCountry.deviceId,
      };
    }

    const session = {
      sessionId: 'SESSION-' + Date.now() + '-' + deviceId.slice(-4),
      playerId,
      deviceId,
      deviceName: device.deviceName,
      country: countryCode,
      campaignId: campaignId || 'CAMPAIGN-' + Date.now(),
      career: null, // set by player per session
      startedAt: new Date().toISOString(),
      active: true,
    };

    player.sessions.push(session);

    return {
      success: true,
      session,
      totalActiveSessions: player.sessions.filter(s => s.active).length,
      maxSimultaneousCampaigns: player.maxSimultaneousCampaigns,
      message: 'Session started on ' + device.deviceName + ' for ' + countryCode,
    };
  },

  // Get all active sessions for a player (all devices)
  getActiveSessions(playerId) {
    const player = this.devices[playerId];
    if (!player) return [];

    return player.sessions
      .filter(s => s.active)
      .map(s => ({
        sessionId: s.sessionId,
        country: s.country,
        campaignId: s.campaignId,
        deviceName: s.deviceName,
        deviceId: s.deviceId,
        career: s.career,
        startedAt: s.startedAt,
        duration: ((Date.now() - new Date(s.startedAt).getTime()) / 1000 / 60).toFixed(1) + ' min',
      }));
  },

  // End a session (leave campaign)
  endSession(playerId, sessionId) {
    const player = this.devices[playerId];
    if (!player) return { success: false };

    const session = player.sessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.active = false;
      session.endedAt = new Date().toISOString();
      return { success: true, message: 'Session ended for ' + session.country };
    }
    return { success: false, error: 'Session not found' };
  },

  // Example: Gold tier player playing 3 campaigns on 3 devices
  exampleUsage() {
    // Register player with gold tier
    this.devices['p1'] = { devices: [], sessions: [], maxDevices: 3, maxSimultaneousCampaigns: 3, tier: 'gold' };
    const p = this.devices['p1'];

    // Register 3 devices
    this.registerDevice('p1', { deviceId: 'PC-001', deviceName: 'Gaming PC', platform: 'web' });
    this.registerDevice('p1', { deviceId: 'PHONE-001', deviceName: 'iPhone 16 Pro', platform: 'mobile' });
    this.registerDevice('p1', { deviceId: 'TABLET-001', deviceName: 'iPad Pro', platform: 'tablet' });

    // Start 3 simultaneous campaigns on 3 devices
    this.startSession('p1', 'PC-001', 'USA', 'CAMPAIGN-EAGLE-CLAW');
    this.startSession('p1', 'PHONE-001', 'NGA', 'CAMPAIGN-ABUJA-LIBERATION');
    this.startSession('p1', 'TABLET-001', 'RUS', 'CAMPAIGN-ARCTIC-CONVOY');

    // Player is now playing 3 different country campaigns on 3 devices
    // As sniper in USA on PC, as hacker in NGA on phone, as pilot in RUS on tablet
    // All from the SAME account, simultaneously

    return this.getActiveSessions('p1');
  },
};

// ============================================================
// 2. DOOMSDAY SURVIVAL TRAITS & CHEATS
// ============================================================
const DOOMSDAY_SURVIVAL = {
  // When M.A.D. activates and surface is annihilated,
  // some players can survive OUTSIDE the bunker if they have the right traits

  // Survival trait categories
  categories: {
    biological: 'Biological mutations and enhancements',
    technological: 'Cybernetic implants and tech shells',
    dimensional: 'Dimensional phasing and void immunity',
    quantum: 'Quantum state manipulation',
    cosmic: 'Cosmic-tier abilities granted by the game',
    title: 'Special titles that grant survival',
    cheat: 'Rare server-blessed cheat abilities',
  },

  // All survival traits
  traits: {
    // BIOLOGICAL
    wolverine_skull: {
      name: 'Wolverine Skull',
      category: 'biological',
      rarity: 'mythic',
      cost: 35000,
      costUSD: 3500,
      description: 'Your skeletal structure has been genetically modified with a hyper-accelerated healing factor. Even during doomsday, your body regenerates faster than the damage can spread. You survive nuclear fire, radiation, and singularity crush.',
      survivesDoomsday: true,
      mechanic: {
        healRate: 500, // HP per second (faster than doomsday damage)
        immuneTo: ['RADIATION', 'THERMAL', 'BLAST', 'SINGULARITY'],
        duration: 'permanent (passive)',
        cooldown: 0,
        visualEffect: 'flesh_regenerates_visible_to_all',
        weakness: 'Cannot regenerate while in dimensional stasis or chrono-freeze',
      },
      voiceLine: 'Your bones knit back together as the world burns around you. You walk through nuclear fire like it is a warm breeze.',
    },

    adamantium_shell: {
      name: 'Adamantium Shell',
      category: 'biological',
      rarity: 'legendary',
      cost: 20000,
      costUSD: 2000,
      description: 'Sub-dermal adamantium bone coating. Your skeleton is literally unbreakable. Even a singularity cannot crush what cannot be compressed.',
      survivesDoomsday: true,
      mechanic: {
        armor: 9999,
        immuneTo: ['KINETIC', 'SINGULARITY', 'GRAVITY', 'BLAST'],
        duration: 'permanent (passive)',
        weakness: 'Still vulnerable to radiation and thermal — pair with Wolverine Skull for full immunity',
      },
    },

    regen_field_organ: {
      name: 'Regeneration Field Organ',
      category: 'biological',
      rarity: 'epic',
      cost: 12000,
      costUSD: 1200,
      description: 'A bio-engineered secondary organ that projects a 5m regeneration field. You and nearby allies slowly regenerate even during doomsday.',
      survivesDoomsday: true,
      mechanic: {
        healRate: 200,
        fieldRadius: 5,
        affectsAllies: true,
        allyHealRate: 100,
        duration: 'permanent (passive)',
        weakness: 'Heal rate may not outpace doomsday at epicenter — move away from ground zero',
      },
    },

    // TECHNOLOGICAL
    self_bunker_mode: {
      name: 'Self-Bunker Mode',
      category: 'technological',
      rarity: 'mythic',
      cost: 40000,
      costUSD: 4000,
      description: 'Your armor contains a personal bunker protocol. When activated, you deploy a quantum-hardened personal fortress around yourself. You become a 1-man bunker. Nothing gets in. Nothing gets out. You survive.',
      survivesDoomsday: true,
      mechanic: {
        type: 'deployable_shield',
        shieldHP: 50000,
        duration: 300, // 5 minutes — outlasts doomsday radiation
        cooldown: 0, // but can only use once per match
        immuneTo: ['ALL'],
        visualEffect: 'glowing_dome_forms_around_player',
        weakness: 'Cannot move while in self-bunker mode. Cannot shoot. Cannot use abilities. You are safe, but you are trapped until it ends.',
        canCancel: true,
        cancelDeathRisk: true, // if you cancel during doomsday, you die
      },
      voiceLine: 'The world outside becomes a white-hot inferno. Inside your shell, you hear music. You chose the right upgrade.',
    },

    quantum_hardened_exo: {
      name: 'Quantum-Hardened Exoskeleton',
      category: 'technological',
      rarity: 'legendary',
      cost: 18000,
      costUSD: 1800,
      description: 'An exoskeleton built from quantum-hardened alloys. Phase-shifts at the atomic level to deflect any incoming energy, including nuclear detonation.',
      survivesDoomsday: true,
      mechanic: {
        armor: 8000,
        phaseShift: true,
        immuneTo: ['THERMAL', 'RADIATION', 'ENERGY', 'PLASMA'],
        duration: 'permanent (passive)',
        weakness: 'Vulnerable to kinetic impacts and singularity crush',
      },
    },

    nanite_swarm_shield: {
      name: 'Nanite Swarm Shield',
      category: 'technological',
      rarity: 'legendary',
      cost: 15000,
      costUSD: 1500,
      description: 'A swarm of 10 billion nanites lives in your armor. When damage is detected, they instantly form a defensive lattice, absorbing and repairing damage in real-time.',
      survivesDoomsday: true,
      mechanic: {
        shieldHP: 30000,
        repairRate: 1000, // per second
        swarmCount: 10000000000,
        immuneTo: ['KINETIC', 'THERMAL', 'RADIATION'],
        duration: 'permanent (passive)',
        weakness: 'Nanites can be disrupted by EMP — vulnerable to cyber warfare',
      },
    },

    // DIMENSIONAL
    void_phase_immunity: {
      name: 'Void Phase Immunity',
      category: 'dimensional',
      rarity: 'mythic',
      cost: 45000,
      costUSD: 4500,
      description: 'When doomsday strikes, your body automatically phases into the void dimension. You exist between realities. The blast passes through you. You are a ghost in a burning world.',
      survivesDoomsday: true,
      mechanic: {
        autoPhase: true,
        trigger: 'detects_doomsday_damage',
        phaseDuration: 300, // 5 minutes
        immuneTo: ['ALL'],
        visualEffect: 'player_becomes_transparent_purple_outline',
        weakness: 'Cannot interact with anything while phased. Cannot shoot, heal, or move objects. You are a spectator to the apocalypse.',
        canPhaseBack: true, // when doomsday ends
      },
      voiceLine: 'You watch the world die from between dimensions. It is beautiful, in a terrible way. You phase back. You are alone.',
    },

    dimensional_blink_survival: {
      name: 'Dimensional Blink Survival',
      category: 'dimensional',
      rarity: 'legendary',
      cost: 22000,
      costUSD: 2200,
      description: 'When lethal damage is detected, you automatically blink to a safe dimension for 3 seconds, then blink back. Repeats until threat passes.',
      survivesDoomsday: true,
      mechanic: {
        autoBlink: true,
        blinkDuration: 3,
        blinkCooldown: 2,
        immuneTo: ['ALL'],
        weakness: 'Each blink costs quantum energy. If you run out of energy mid-doomsday, you die. You need high quantum energy reserves.',
        quantumCostPerBlink: 100,
        maxBlinks: 60, // enough for 5 minutes of doomsday
      },
    },

    // QUANTUM
    quantum_state_lock: {
      name: 'Quantum State Lock',
      category: 'quantum',
      rarity: 'mythic',
      cost: 50000,
      costUSD: 5000,
      description: 'You lock your quantum state to a moment in time. No matter what happens to the world around you, your quantum state cannot be altered. You are frozen in perfect safety while reality unravels.',
      survivesDoomsday: true,
      mechanic: {
        type: 'state_lock',
        duration: 300, // 5 minutes
        immuneTo: ['ALL'],
        visualEffect: 'player_glows_gold_and_is_frozen_in_time',
        weakness: 'You cannot move, shoot, or act while locked. You are a statue. But you are alive.',
        canCancel: true,
        cancelDeathRisk: true,
      },
      voiceLine: 'You feel nothing. You see the world burn in golden light. You are untouched. When it ends, you are the only one standing.',
    },

    probability_collapse_immunity: {
      name: 'Probability Collapse Immunity',
      category: 'quantum',
      rarity: 'legendary',
      cost: 25000,
      costUSD: 2500,
      description: 'Your quantum field collapses the probability of your own death to zero. The universe literally cannot kill you. Bullets miss. Explosions part around you. Doomsday ignores you.',
      survivesDoomsday: true,
      mechanic: {
        deathProbability: 0, // literally cannot die
        immuneTo: ['ALL'],
        duration: 60, // only 60 seconds — not enough for full doomsday
        cooldown: 300, // 5 minute cooldown
        weakness: 'Only lasts 60 seconds. Doomsday radiation lasts 5 minutes. You need to reach a bunker before it expires, or pair with another trait.',
      },
    },

    // COSMIC
    cosmic_immortality: {
      name: 'Cosmic Immortality',
      category: 'cosmic',
      rarity: 'mythic',
      cost: 100000,
      costUSD: 10000,
      description: 'You have achieved cosmic-tier immortality. Your consciousness is distributed across 8 dimensions. Destroying your body in one dimension does not destroy YOU. You simply reform.',
      survivesDoomsday: true,
      mechanic: {
        type: 'reform',
        reformTime: 5, // 5 seconds to reform after "death"
        immuneTo: ['ALL'],
        duration: 'permanent (passive)',
        visualEffect: 'player_disintegrates_then_reforms_from_cosmic_dust',
        weakness: 'Each reform costs 10,000 coins. If you run out of coins, you die permanently. Doomsday may trigger multiple reforms.',
        costPerReform: 10000,
        maxReforms: 5, // per match
      },
      voiceLine: 'Your body disintegrates. You feel yourself scatter across 8 dimensions. Then you pull yourself back together. The universe owes you 10,000 coins.',
    },

    galaxy_shield: {
      name: 'Galaxy Shield',
      category: 'cosmic',
      rarity: 'mythic',
      cost: 75000,
      costUSD: 7500,
      description: 'A shield powered by galactic energy. It can withstand the destruction of an entire galaxy. Doomsday is a firecracker to it.',
      survivesDoomsday: true,
      mechanic: {
        shieldHP: 999999,
        immuneTo: ['ALL'],
        duration: 'permanent (passive)',
        weakness: 'The shield draws from your galaxy energy reserve. If depleted, the shield drops. You need to maintain galaxy energy through gameplay.',
        energyCost: 500, // per second while under doomsday
      },
    },

    // TITLE-BASED (granted by earning special titles)
    title_doomsday_walker: {
      name: 'Title: Doomsday Walker',
      category: 'title',
      rarity: 'mythic',
      cost: 0, // earned, not bought
      earnCondition: 'Survive 10 M.A.D. events across your career',
      description: 'A title earned by those who have walked through doomsday and lived. Grants permanent passive doomsday resistance.',
      survivesDoomsday: true,
      mechanic: {
        damageReduction: 0.95, // 95% damage reduction from doomsday
        immuneTo: ['RADIATION'],
        duration: 'permanent while title equipped',
        weakness: '5% damage still gets through. At doomsday epicenter, this can still kill you. Move away from ground zero.',
      },
    },

    title_the_undying: {
      name: 'Title: The Undying',
      category: 'title',
      rarity: 'mythic',
      cost: 0,
      earnCondition: 'Win a match where M.A.D. activated and you were outside the bunker',
      description: 'Granted to the player who survived doomsday without a bunker. The game recognizes you as undying. Passive immortality during doomsday.',
      survivesDoomsday: true,
      mechanic: {
        immuneTo: ['ALL'],
        duration: 'entire doomsday duration while title equipped',
        weakness: 'You cannot deal damage while The Undying is protecting you. You survive, but you cannot fight. You are a witness.',
      },
    },

    title_void_walker: {
      name: 'Title: Void Walker',
      category: 'title',
      rarity: 'legendary',
      cost: 0,
      earnCondition: 'Banish 100 players to the void',
      description: 'You have sent 100 souls to the void. The void now protects you. You are immune to dimensional destruction.',
      survivesDoomsday: true,
      mechanic: {
        immuneTo: ['DIMENSIONAL', 'VOID', 'SINGULARITY', 'GRAVITY'],
        duration: 'permanent while title equipped',
        weakness: 'Not immune to radiation or thermal. Pair with biological trait for full coverage.',
      },
    },

    // CHEAT (rarest, server-blessed)
    cheat_reality_anchor: {
      name: 'Reality Anchor (Cheat)',
      category: 'cheat',
      rarity: 'cheat',
      cost: 200000,
      costUSD: 20000,
      description: 'The rarest ability in the game. You anchor yourself to reality itself. Reality cannot be rewritten around you. Reality Reset Engine does not affect you. M.A.D. does not affect you. You are the one constant in a universe of variables.',
      survivesDoomsday: true,
      mechanic: {
        immuneTo: ['ALL'],
        duration: 'permanent (passive)',
        ignoresRealityReset: true, // Omega Protocol cannot rewrite your position
        ignoresMAD: true,
        ignoresBanishment: true, // cannot be banished
        weakness: 'NONE. This is a cheat ability. It costs $20,000. It is the most expensive item in the game. It is also the most powerful.',
        visualEffect: 'golden_chain_anchors_player_to_ground_while_world_dissolves',
      },
      voiceLine: 'The world dissolves and rebuilds itself around you. You do not move. You do not change. You are the anchor. Everything else is variables.',
    },

    cheat_immortal_code: {
      name: 'Immortal Code (Cheat)',
      category: 'cheat',
      rarity: 'cheat',
      cost: 150000,
      costUSD: 15000,
      description: 'Your character data is written into the server kernel. You cannot be removed from any match by any means. Not death, not banishment, not doomsday, not reality reset. You are permanent.',
      survivesDoomsday: true,
      mechanic: {
        immuneTo: ['ALL'],
        duration: 'permanent (passive)',
        cannotBeBanished: true,
        cannotBeRemoved: true,
        autoRevive: true,
        reviveTime: 3,
        weakness: 'Costs $15,000. And everyone in the match knows you have it. You become the #1 target.',
        visualEffect: 'green_code_rains_around_player_matrix_style',
      },
      voiceLine: 'Your code is written into the kernel. You are the game itself. They can destroy your body, but you just respawn. They hate you for it.',
    },
  },

  // Check if a player survives doomsday
  checkSurvival(player, doomsdayType) {
    const equippedTraits = player.equippedSurvivalTraits || [];
    const titles = player.titles || [];
    const activeTitle = player.currentTitle;

    for (const traitId of equippedTraits) {
      const trait = this.traits[traitId];
      if (!trait || !trait.survivesDoomsday) continue;

      const mech = trait.mechanic;
      if (mech.immuneTo && (mech.immuneTo.includes('ALL') || mech.immuneTo.includes(doomsdayType))) {
        // Check weaknesses
        if (mech.weakness && mech.weakness.includes('expired')) continue;
        if (mech.duration === 'permanent (passive)' || mech.duration > 0) {
          return {
            survives: true,
            trait: trait.name,
            category: trait.category,
            voiceLine: trait.voiceLine || null,
            mechanic: mech,
            visualEffect: trait.mechanic.visualEffect || 'none',
          };
        }
      }
    }

    // Check title-based survival
    if (activeTitle) {
      const titleTrait = Object.values(this.traits).find(t =>
        t.category === 'title' && t.name.includes(activeTitle) && t.survivesDoomsday
      );
      if (titleTrait) {
        return {
          survives: true,
          trait: titleTrait.name,
          category: 'title',
          voiceLine: titleTrait.voiceLine || null,
        };
      }
    }

    return {
      survives: false,
      message: 'No survival traits equipped. You need a bunker or you die.',
    };
  },

  // Get all survival traits for shop display
  getShop() {
    const shop = {};
    for (const [id, trait] of Object.entries(this.traits)) {
      shop[id] = {
        name: trait.name,
        category: trait.category,
        rarity: trait.rarity,
        cost: trait.cost,
        costUSD: trait.costUSD || (trait.cost / 10),
        description: trait.description,
        survivesDoomsday: trait.survivesDoomsday,
        earnCondition: trait.earnCondition || null,
      };
    }
    return shop;
  },

  // Get by category
  getByCategory(category) {
    return Object.entries(this.traits)
      .filter(([id, t]) => t.category === category)
      .map(([id, t]) => ({ id, ...t }));
  },

  // Get survival count
  getSurvivalTraitCount() {
    return Object.values(this.traits).filter(t => t.survivesDoomsday).length;
  },
};

// ============================================================
// EXPORT
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MULTI_DEVICE, DOOMSDAY_SURVIVAL };
}
if (typeof window !== 'undefined') {
  window.MULTI_DEVICE = MULTI_DEVICE;
  window.DOOMSDAY_SURVIVAL = DOOMSDAY_SURVIVAL;
}
