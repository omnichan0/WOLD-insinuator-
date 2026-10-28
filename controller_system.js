/**
 * OMEGA-8D PLAYSTATION CONTROLLER SYSTEM
 * Full mapping for PS1 through PS5 with combo system for cheat skills
 */

const PS_CONTROLLERS = {
  // ==========================================
  // CONTROLLER DEFINITIONS (PS1-PS5)
  // ==========================================
  ps1_dualshock: {
    name: 'PlayStation 1 — DualShock',
    year: 1997,
    buttons: {
      CROSS: { id: 0, label: '✕', position: 'bottom_face' },
      CIRCLE: { id: 1, label: '◯', position: 'right_face' },
      SQUARE: { id: 2, label: '□', position: 'left_face' },
      TRIANGLE: { id: 3, label: '△', position: 'top_face' },
      L1: { id: 4, label: 'L1', position: 'left_shoulder' },
      R1: { id: 5, label: 'R1', position: 'right_shoulder' },
      L2: { id: 6, label: 'L2', position: 'left_trigger' },
      R2: { id: 7, label: 'R2', position: 'right_trigger' },
      SELECT: { id: 8, label: 'Select', position: 'center_left' },
      START: { id: 9, label: 'Start', position: 'center_right' },
      L3: { id: 10, label: 'L3', position: 'left_stick_click' },
      R3: { id: 11, label: 'R3', position: 'right_stick_click' },
    },
    sticks: {
      left: { type: 'analog', axes: 2, clickable: true, label: 'L3' },
      right: { type: 'analog', axes: 2, clickable: true, label: 'R3' },
    },
    dpad: { type: 'digital', buttons: 4 },
    features: ['pressure_sensitive_buttons', 'dual_vibration'],
    limitations: ['no_touchpad', 'no_motion', 'no_share_button', 'no_adaptive_triggers'],
  },

  ps2_dualshock2: {
    name: 'PlayStation 2 — DualShock 2',
    year: 2000,
    buttons: {
      CROSS: { id: 0, label: '✕' },
      CIRCLE: { id: 1, label: '◯' },
      SQUARE: { id: 2, label: '□' },
      TRIANGLE: { id: 3, label: '△' },
      L1: { id: 4 }, R1: { id: 5 },
      L2: { id: 6 }, R2: { id: 7 },
      SELECT: { id: 8 }, START: { id: 9 },
      L3: { id: 10 }, R3: { id: 11 },
    },
    sticks: { left: { analog: true, clickable: true }, right: { analog: true, clickable: true } },
    dpad: { type: 'digital' },
    features: ['pressure_sensitive_all_buttons', 'dual_vibration_2'],
    limitations: ['no_touchpad', 'no_motion', 'no_share_button', 'no_adaptive_triggers'],
  },

  ps3_dualshock3: {
    name: 'PlayStation 3 — DualShock 3 / Sixaxis',
    year: 2007,
    buttons: {
      CROSS: { id: 0 }, CIRCLE: { id: 1 },
      SQUARE: { id: 2 }, TRIANGLE: { id: 3 },
      L1: { id: 4 }, R1: { id: 5 },
      L2: { id: 6 }, R2: { id: 7 },
      SELECT: { id: 8 }, START: { id: 9 },
      L3: { id: 10 }, R3: { id: 11 },
      PS_BUTTON: { id: 12, label: 'PS', position: 'center' },
    },
    sticks: { left: { analog: true, clickable: true }, right: { analog: true, clickable: true } },
    dpad: { type: 'digital' },
    motion: { type: 'sixaxis', axes: 3, uses: ['tilt_steering', 'motion_aim_assist'] },
    features: ['pressure_sensitive', 'vibration', 'sixaxis_motion', 'bluetooth'],
    limitations: ['no_touchpad', 'no_share_button', 'no_adaptive_triggers', 'no_haptics'],
  },

  ps4_dualshock4: {
    name: 'PlayStation 4 — DualShock 4',
    year: 2013,
    buttons: {
      CROSS: { id: 0, label: '✕' },
      CIRCLE: { id: 1, label: '◯' },
      SQUARE: { id: 2, label: '□' },
      TRIANGLE: { id: 3, label: '△' },
      L1: { id: 4, label: 'L1' },
      R1: { id: 5, label: 'R1' },
      L2: { id: 6, label: 'L2', type: 'analog_trigger' },
      R2: { id: 7, label: 'R2', type: 'analog_trigger' },
      SHARE: { id: 8, label: 'Share', position: 'center_left' },
      OPTIONS: { id: 9, label: 'Options', position: 'center_right' },
      L3: { id: 10 }, R3: { id: 11 },
      PS_BUTTON: { id: 12, label: 'PS' },
      TOUCHPAD: { id: 13, label: 'Touchpad', clickable: true, type: 'capacitive' },
    },
    sticks: { left: { analog: true, clickable: true }, right: { analog: true, clickable: true } },
    dpad: { type: 'digital' },
    touchpad: { type: 'capacitive', clickable: true, gestures: ['tap', 'swipe', 'double_tap', 'multi_touch'] },
    motion: { type: 'sixaxis', axes: 6, uses: ['motion_aim', 'gesture_input'] },
    features: ['analog_triggers', 'touchpad', 'share_button', 'motion', 'vibration', 'light_bar', 'speaker', 'headphone_jack'],
    lightBar: { uses: ['player_id', 'health_indicator', 'dimension_color', 'alert_system'] },
    limitations: ['no_adaptive_triggers', 'no_haptic_feedback', 'no_microphone'],
  },

  ps5_dualsense: {
    name: 'PlayStation 5 — DualSense',
    year: 2020,
    buttons: {
      CROSS: { id: 0, label: '✕' },
      CIRCLE: { id: 1, label: '◯' },
      SQUARE: { id: 2, label: '□' },
      TRIANGLE: { id: 3, label: '△' },
      L1: { id: 4, label: 'L1', type: 'digital_bumper' },
      R1: { id: 5, label: 'R1', type: 'digital_bumper' },
      L2: { id: 6, label: 'L2', type: 'adaptive_trigger' },
      R2: { id: 7, label: 'R2', type: 'adaptive_trigger' },
      CREATE: { id: 8, label: 'Create', position: 'center_left' },
      OPTIONS: { id: 9, label: 'Options', position: 'center_right' },
      L3: { id: 10 }, R3: { id: 11 },
      PS_BUTTON: { id: 12, label: 'PS' },
      TOUCHPAD: { id: 13, label: 'Touchpad', clickable: true },
      MIC_BUTTON: { id: 14, label: 'Mic', position: 'bottom_center' },
    },
    sticks: { left: { analog: true, clickable: true }, right: { analog: true, clickable: true } },
    dpad: { type: 'digital' },
    touchpad: { type: 'capacitive', clickable: true, gestures: ['tap', 'swipe', 'double_tap', 'multi_touch'] },
    adaptiveTriggers: {
      L2: {
        programmable: true,
        effects: ['rigid', 'pulse', 'segment', 'weapon_recoil', 'bow_tension', 'trigger_resistance'],
        uses: ['aim_down_sights', 'hold_breath', 'sniper_scope_steady', 'adaptive_recoil'],
      },
      R2: {
        programmable: true,
        effects: ['rigid', 'pulse', 'segment', 'weapon_recoil', 'trigger_lock', 'charge_weapon'],
        uses: ['shoot', 'charge_shot', 'heavy_weapon_windup', 'recoil_pattern'],
      },
    },
    haptics: {
      type: 'voice_coil_actuators',
      zones: ['left_grip', 'right_grip', 'trigger_L2', 'trigger_R2'],
      uses: ['footstep_texture', 'terrain_feedback', 'weather_rain', 'explosion_impact', 'dimensional_rift_feel', 'heartbeat_low_health'],
    },
    motion: { type: 'sixaxis', axes: 6 },
    features: ['adaptive_triggers', 'haptic_feedback', 'touchpad', 'create_button', 'motion', 'microphone', 'speaker', 'light_bar', 'headphone_jack'],
    limitations: [],
  },
};

// ==========================================
// BUTTON MAPPING — Core game actions per controller
// ==========================================
const BUTTON_MAP = {
  // STANDARD MAPPING (all controllers share these)
  core: {
    // Movement
    MOVE: { stick: 'left', desc: 'Move operator in 3D space' },
    LOOK: { stick: 'right', desc: 'Look / aim direction' },
    DPAD_UP: { action: 'menu_up', desc: 'Navigate menus / cycle ability 1' },
    DPAD_DOWN: { action: 'menu_down', desc: 'Navigate menus / cycle ability 2' },
    DPAD_LEFT: { action: 'menu_left', desc: 'Previous weapon / cycle ability 3' },
    DPAD_RIGHT: { action: 'menu_right', desc: 'Next weapon / cycle ability 4' },

    // Combat
    SHOOT: { button: 'R2', desc: 'Fire weapon', analog: true, adaptive: 'ps5' },
    AIM: { button: 'L2', desc: 'Aim down sights / scope', analog: true, adaptive: 'ps5' },
    RELOAD: { button: 'SQUARE', desc: 'Reload current weapon' },
    SWITCH_WEAPON: { button: 'TRIANGLE', desc: 'Switch weapon slot' },
    MELEE: { button: 'R3', desc: 'Melee attack / knife' },
    GRENADE_THROW: { button: 'R1', desc: 'Throw grenade / throwable' },
    ABILITY_PRIMARY: { button: 'L1', desc: 'Primary ability (career-specific)' },

    // Movement actions
    JUMP: { button: 'CROSS', desc: 'Jump / vault / climb' },
    CROUCH: { button: 'CIRCLE', desc: 'Crouch / slide / prone toggle' },
    SPRINT: { stick: 'L3', type: 'click', desc: 'Click L3 to sprint' },
    MARK: { stick: 'R3', type: 'click', desc: 'Click R3 to mark target / ping' },

    // Menu
    PAUSE: { button: 'OPTIONS', desc: 'Pause / settings' },
    SHARE: { button: 'SHARE', desc: 'Share / screenshot (PS4+), Create (PS5)' },
    PS_HOME: { button: 'PS', desc: 'Home menu / profile' },
  },

  // TOUCHPAD MAPPING (PS4/PS5 only)
  touchpad: {
    TAP: { action: 'tactical_map', desc: 'Open tactical map overview' },
    SWIPE_LEFT: { action: 'prev_dimension', desc: 'Swipe to shift to previous dimension (4D-8D)' },
    SWIPE_RIGHT: { action: 'next_dimension', desc: 'Swipe to shift to next dimension (4D-8D)' },
    SWIPE_UP: { action: 'aria_menu', desc: 'Swipe up for ARIA command menu (hacker)' },
    SWIPE_DOWN: { action: 'gear_menu', desc: 'Swipe down for quick gear menu' },
    DOUBLE_TAP: { action: 'ping_location', desc: 'Double tap to ping exact location for squad' },
    HOLD: { action: 'command_menu', desc: 'Hold for commander tactical orders menu' },
    TWO_FINGER_TAP: { action: 'dimensional_map', desc: 'Two finger tap for 4D-8D dimensional overview' },
  },

  // PS5 ADAPTIVE TRIGGER PROGRAMMING
  adaptiveTriggers: {
    // L2 (aim) adaptive effects per weapon type
    L2_aim: {
      sniper_rifle: { effect: 'segment', resistance: 0.8, desc: 'Heavy trigger pull for precision scope aim. Steadies the scope.' },
      assault_rifle: { effect: 'rigid', resistance: 0.3, desc: 'Light resistance for quick ADS' },
      lmg: { effect: 'rigid', resistance: 0.6, desc: 'Heavy weapon requires firm trigger hold' },
      plasma_flamethrower: { effect: 'pulse', resistance: 0.5, desc: 'Pulsing resistance as plasma charges' },
      particle_beam_sniper: { effect: 'segment', resistance: 0.95, desc: 'Near-lock resistance. Must commit to the shot.' },
      void_cannon: { effect: 'trigger_lock', resistance: 1.0, desc: 'Trigger locks until void cannon is charged' },
      free: { effect: 'rigid', resistance: 0.2, desc: 'Standard aim' },
    },
    // R2 (shoot) adaptive effects per weapon type
    R2_shoot: {
      sniper_rifle: { effect: 'weapon_recoil', resistance: 0.7, desc: 'Sharp kick on each shot' },
      assault_rifle: { effect: 'weapon_recoil', resistance: 0.3, desc: 'Rapid light kicks' },
      shotgun: { effect: 'weapon_recoil', resistance: 0.9, desc: 'Massive single kick' },
      lmg: { effect: 'pulse', resistance: 0.4, desc: 'Continuous pulsing during sustained fire' },
      railgun: { effect: 'charge_weapon', resistance: 0.8, desc: 'Progressive resistance as railgun charges' },
      molecular_carbine: { effect: 'segment', resistance: 0.6, desc: 'Segmented feel as nanites deploy' },
      free: { effect: 'weapon_recoil', resistance: 0.2, desc: 'Standard recoil' },
    },
  },

  // PS5 HAPTIC FEEDBACK
  haptics: {
    footstep_concrete: { zone: 'left_grip', pattern: 'sharp_tap', intensity: 0.3 },
    footstep_grass: { zone: 'left_grip', pattern: 'soft_ripple', intensity: 0.15 },
    footstep_metal: { zone: 'left_grip', pattern: 'metallic_ping', intensity: 0.5 },
    footstep_water: { zone: 'left_grip', pattern: 'liquid_slosh', intensity: 0.25 },
    footstep_snow: { zone: 'left_grip', pattern: 'crunch', intensity: 0.2 },
    footstep_void: { zone: 'both', pattern: 'ethereal_hum', intensity: 0.4 },
    explosion_near: { zone: 'both', pattern: 'massive_thud', intensity: 1.0 },
    explosion_far: { zone: 'both', pattern: 'distant_rumble', intensity: 0.3 },
    taking_damage: { zone: 'right_grip', pattern: 'sharp_punch', intensity: 0.7 },
    low_health: { zone: 'both', pattern: 'heartbeat_slow', intensity: 0.5 },
    critical_health: { zone: 'both', pattern: 'heartbeat_fast', intensity: 0.9 },
    dimensional_shift: { zone: 'both', pattern: 'reality_bend', intensity: 0.8 },
    banishment: { zone: 'both', pattern: 'void_pull', intensity: 1.0 },
    rain: { zone: 'both', pattern: 'rain_taps', intensity: 0.2 },
    wind: { zone: 'both', pattern: 'wind_rush', intensity: 0.15 },
    sniper_scope_hold: { zone: 'L2', pattern: 'steady_pressure', intensity: 0.6 },
    reloading: { zone: 'right_grip', pattern: 'mechanical_clicks', intensity: 0.3 },
    underwater: { zone: 'both', pattern: 'pressure_throb', intensity: 0.4 },
    nuclear_alert: { zone: 'both', pattern: 'emergency_pulse', intensity: 1.0 },
  },
};

// ==========================================
// COMBO SYSTEM — Cheat skills & special abilities
// ==========================================
const COMBOS = {
  // Format: [buttons pressed in sequence within 2 seconds]
  // Or [buttons held simultaneously]

  combos: {
    // CHEAT SKILL COMBOS
    reality_anchor: {
      sequence: ['L1', 'R1', 'L2', 'R2', 'TRIANGLE'],
      timeWindow: 2000,
      desc: 'Activate Reality Anchor cheat (if owned) — become immune to everything',
      category: 'cheat',
      requiresOwnership: 'cheat_reality_anchor',
      voiceLine: 'You press the ancient combination. Reality locks around you.',
    },

    immortal_code: {
      sequence: ['PS_BUTTON', 'SHARE', 'OPTIONS', 'TRIANGLE', 'CIRCLE', 'CROSS', 'SQUARE'],
      timeWindow: 3000,
      desc: 'Activate Immortal Code cheat (if owned) — kernel-level immortality',
      category: 'cheat',
      requiresOwnership: 'cheat_immortal_code',
      voiceLine: 'The code runs through your veins. You are the kernel now.',
    },

    // DIMENSIONAL COMBOS
    dimension_shift_4d: {
      sequence: ['L3', 'R3'],
      timeWindow: 500,
      desc: '4D fold — shift one dimension forward',
      category: 'dimensional',
      type: 'hold',
    },

    dimension_shift_8d: {
      sequence: ['L1', 'R1', 'L3'],
      timeWindow: 1000,
      desc: '8D shift — maximum dimensional displacement',
      category: 'dimensional',
      requiresTier: 'ghost',
    },

    banish_target: {
      sequence: ['TRIANGLE', 'CIRCLE', 'R2'],
      timeWindow: 1500,
      desc: 'Banish locked target to deep space (requires banishment engine)',
      category: 'dimensional',
      requiresAbility: 'void_banish',
      voiceLine: 'The universe opens. Your enemy falls through. Welcome to the void.',
    },

    cosmic_banish: {
      sequence: ['L1', 'TRIANGLE', 'R1', 'CIRCLE', 'L2', 'R2'],
      timeWindow: 2500,
      desc: 'Cosmic banishment — send target across galaxies',
      category: 'dimensional',
      requiresAbility: 'cosmic_banish',
      requiresTier: 'void_walker',
    },

    // SELF-BUNKER / SURVIVAL COMBOS
    self_bunker: {
      sequence: ['L2', 'R2', 'CROSS'],
      timeWindow: 1000,
      desc: 'Deploy Self-Bunker Mode (if owned)',
      category: 'survival',
      requiresOwnership: 'self_bunker_mode',
      type: 'hold',
    },

    void_phase: {
      sequence: ['SQUARE', 'CIRCLE', 'L1'],
      timeWindow: 1000,
      desc: 'Void Phase Immunity — phase into void dimension (if owned)',
      category: 'survival',
      requiresOwnership: 'void_phase_immunity',
    },

    quantum_lock: {
      sequence: ['L1', 'L2', 'R1', 'R2'],
      timeWindow: 1500,
      desc: 'Quantum State Lock — freeze your quantum state (if owned)',
      category: 'survival',
      requiresOwnership: 'quantum_state_lock',
      type: 'hold_all',
    },

    // ARIA / HACKER COMBOS
    aria_scan: {
      sequence: ['TOUCHPAD_TAP'],
      timeWindow: 200,
      desc: 'ARIA country scan — scan for targets',
      category: 'hacker',
      requiresCareer: 'hacker',
    },

    aria_paint: {
      sequence: ['L1', 'R3'],
      timeWindow: 500,
      desc: 'ARIA paint target — lock and track target on squad map',
      category: 'hacker',
      requiresCareer: 'hacker',
      requiresAria: true,
    },

    aria_blackout: {
      sequence: ['SQUARE', 'SQUARE', 'TRIANGLE'],
      timeWindow: 1000,
      desc: 'ARIA grid blackout — shut down zone power grid',
      category: 'hacker',
      requiresCareer: 'hacker',
      requiresAriaTier: 3,
    },

    aria_ghost: {
      sequence: ['L1', 'R1', 'SQUARE', 'CIRCLE'],
      timeWindow: 1500,
      desc: 'ARIA Digital Ghost — erase all digital traces',
      category: 'hacker',
      requiresCareer: 'hacker',
      requiresAriaTier: 3,
    },

    aria_reality_rewrite: {
      sequence: ['L2', 'R2', 'L1', 'R1', 'TRIANGLE', 'CIRCLE', 'CROSS', 'SQUARE'],
      timeWindow: 3000,
      desc: 'ARIA Reality Code Rewrite — alter one rule of physics for 10 seconds',
      category: 'hacker',
      requiresCareer: 'hacker',
      requiresAriaTier: 5,
      requiresOwnership: 'reality_code_rewrite',
    },

    // STRIKES & ORDNANCE COMBOS
    call_airstrike: {
      sequence: ['DPAD_UP', 'L1'],
      timeWindow: 500,
      desc: 'Open laser designator for air strike (commander tier 2+)',
      category: 'strikes',
      requiresTier: 'sergeant',
    },

    call_cruise_missile: {
      sequence: ['DPAD_UP', 'DPAD_UP', 'L1'],
      timeWindow: 1000,
      desc: 'Call Tomahawk cruise missile with waypoint guidance',
      category: 'strikes',
      requiresTier: 'lieutenant',
    },

    call_icbm: {
      sequence: ['DPAD_UP', 'DPAD_UP', 'DPAD_UP', 'L1', 'R1'],
      timeWindow: 2000,
      desc: 'Launch ICBM — triggers M.A.D. protocol',
      category: 'strikes',
      requiresTier: 'captain',
      triggersMAD: true,
    },

    call_submarine: {
      sequence: ['DPAD_DOWN', 'DPAD_DOWN', 'L1'],
      timeWindow: 1500,
      desc: 'Call submarine torpedo strike from offshore',
      category: 'strikes',
      requiresTier: 'captain',
    },

    // MAD / BUNKER COMBOS
    seal_bunker: {
      sequence: ['L2', 'R2', 'L1', 'R1', 'CROSS', 'CIRCLE'],
      timeWindow: 2000,
      desc: 'SEAL BUNKER during M.A.D. — survive doomsday underground',
      category: 'mad',
      type: 'hold_all',
    },

    // CAREER ABILITY COMBOS
    sniper_4d_fold: {
      sequence: ['L1', 'TRIANGLE'],
      timeWindow: 500,
      desc: '4D fold shot — bend bullet through 4th dimension',
      category: 'career',
      requiresCareer: 'sniper',
      requiresTier: 3, // Sniper Elite
    },

    sniper_tachyon: {
      sequence: ['L1', 'TRIANGLE', 'R1'],
      timeWindow: 1000,
      desc: 'Tachyon shot — see 1s into future, fire through time',
      category: 'career',
      requiresCareer: 'sniper',
      requiresTier: 5, // Cosmic Marksman
    },

    stealth_cloak: {
      sequence: ['CIRCLE', 'CIRCLE'],
      timeWindow: 500,
      desc: 'Dark matter cloak — full invisibility (if owned)',
      category: 'career',
      requiresCareer: 'stealth',
      requiresOwnership: 'dark_matter_cloaking_field',
    },

    stealth_neural_hijack: {
      sequence: ['L1', 'CIRCLE', 'R1'],
      timeWindow: 1000,
      desc: 'Fire neural parasite dart — hijack enemy body',
      category: 'career',
      requiresCareer: 'stealth',
      requiresOwnership: 'neural_hijack_synaptic_parasites',
    },

    medic_revive: {
      sequence: ['SQUARE', 'CROSS'],
      timeWindow: 500,
      desc: 'Quick revive downed teammate',
      category: 'career',
      requiresCareer: 'medic',
    },

    medic_quantum_heal: {
      sequence: ['SQUARE', 'SQUARE', 'CROSS', 'L1'],
      timeWindow: 1500,
      desc: 'Quantum heal — mass heal entire squad',
      category: 'career',
      requiresCareer: 'medic',
      requiresTier: 4,
    },

    engineer_tesseract: {
      sequence: ['SQUARE', 'L1', 'R1'],
      timeWindow: 1000,
      desc: 'Deploy Tesseract Safe-Zone — pocket dimension armory',
      category: 'career',
      requiresCareer: 'engineer',
      requiresOwnership: 'tesseract_safe_zone',
    },

    heavy_overclock: {
      sequence: ['CROSS', 'CROSS', 'CROSS'],
      timeWindow: 800,
      desc: 'Activate synaptic overclock — 500% neural boost, slow motion',
      category: 'career',
      requiresOwnership: 'neuro_toxic_synaptic_overclock',
    },

    recon_echolocation: {
      sequence: ['L3', 'L1'],
      timeWindow: 500,
      desc: 'Sonar echolocation pulse — see all skeletons through walls',
      category: 'career',
      requiresCareer: 'recon',
      requiresOwnership: 'sonar_lattice_echolocation',
    },

    // MOVEMENT / UTILITY COMBOS
    quick_turn_180: {
      sequence: ['CIRCLE', 'R3'],
      timeWindow: 300,
      desc: 'Instant 180 degree turn',
      category: 'utility',
    },

    dive_roll: {
      sequence: ['CROSS', 'CIRCLE'],
      timeWindow: 300,
      desc: 'Dive roll in movement direction',
      category: 'utility',
    },

    slide_cancel: {
      sequence: ['CIRCLE', 'CROSS'],
      timeWindow: 200,
      desc: 'Cancel slide into sprint (movement tech)',
      category: 'utility',
    },

    // PS4/PS5 TOUCHPAD GESTURE COMBOS
    dimension_swipe_left: {
      gesture: 'swipe_left',
      desc: 'Shift to previous dimension',
      requiresController: ['ps4_dualshock4', 'ps5_dualsense'],
    },

    dimension_swipe_right: {
      gesture: 'swipe_right',
      desc: 'Shift to next dimension',
      requiresController: ['ps4_dualshock4', 'ps5_dualsense'],
    },

    // PS5 MOTION COMBOS
    motion_aim_fine: {
      motion: 'tilt',
      desc: 'Fine-tune aim with controller tilt (PS3/PS4/PS5)',
      requiresController: ['ps3_dualshock3', 'ps4_dualshock4', 'ps5_dualsense'],
    },

    motion_dimensional_tilt: {
      motion: 'tilt_sharp',
      desc: 'Sharp tilt to trigger emergency dimensional shift',
      requiresController: ['ps4_dualshock4', 'ps5_dualsense'],
    },
  },

  // Combo detection engine
  detectCombo(inputBuffer, playerState) {
    // inputBuffer is array of button presses with timestamps
    const now = Date.now();
    const recentInputs = inputBuffer.filter(i => now - i.timestamp < 3000);

    for (const [comboId, combo] of Object.entries(this.combos)) {
      if (!combo.sequence) continue;

      // Check requirements
      if (combo.requiresCareer && playerState.career !== combo.requiresCareer) continue;
      if (combo.requiresTier && playerState.tier < combo.requiresTier) continue;
      if (combo.requiresOwnership && !(playerState.ownedItems || []).includes(combo.requiresOwnership)) continue;
      if (combo.requiresAria && !playerState.ariaOwned) continue;

      // Match sequence
      const seq = combo.sequence;
      const timeWindow = combo.timeWindow || 2000;

      // Get last N inputs matching sequence length
      if (recentInputs.length < seq.length) continue;

      const lastN = recentInputs.slice(-seq.length);

      // Check timestamps within window
      if (lastN[lastN.length - 1].timestamp - lastN[0].timestamp > timeWindow) continue;

      // Check sequence match
      let match = true;
      for (let i = 0; i < seq.length; i++) {
        if (lastN[i].button !== seq[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        return {
          comboId,
          combo: combo,
          desc: combo.desc,
          voiceLine: combo.voiceLine || null,
          category: combo.category,
        };
      }
    }

    return null;
  },
};

// ==========================================
// CONTROLLER DETECTION & ADAPTATION
// ==========================================
const CONTROLLER_MANAGER = {
  currentController: null,
  currentMapping: null,

  // Auto-detect connected controller
  detectController(gamepad) {
    const id = (gamepad.id || '').toLowerCase();

    if (id.includes('dualsense') || id.includes('ps5')) {
      return this.setController('ps5_dualsense');
    } else if (id.includes('dualshock') && (id.includes(' 4') || id.includes('ps4') || id.includes('09cc'))) {
      return this.setController('ps4_dualshock4');
    } else if (id.includes('dualshock') && (id.includes(' 3') || id.includes('ps3') || id.includes('0268'))) {
      return this.setController('ps3_dualshock3');
    } else if (id.includes('dualshock') && (id.includes(' 2') || id.includes('ps2'))) {
      return this.setController('ps2_dualshock2');
    } else if (id.includes('dualshock') || id.includes('ps1')) {
      return this.setController('ps1_dualshock');
    } else if (id.includes('xbox')) {
      return { success: true, controller: 'xbox', note: 'Xbox controller detected — using Xbox mapping' };
    } else {
      return { success: true, controller: 'generic', note: 'Generic controller — using standard mapping' };
    }
  },

  setController(controllerId) {
    const controller = PS_CONTROLLERS[controllerId];
    if (!controller) return { success: false, error: 'Unknown controller' };

    this.currentController = controllerId;
    this.currentMapping = controller;

    return {
      success: true,
      controller: controller.name,
      year: controller.year,
      features: controller.features,
      hasTouchpad: !!controller.touchpad,
      hasAdaptiveTriggers: !!controller.adaptiveTriggers,
      hasHaptics: !!controller.haptics,
      hasMotion: !!controller.motion,
      buttons: Object.keys(controller.buttons).length,
    };
  },

  // Get button mapping for current controller
  getMapping() {
    if (!this.currentMapping) return null;

    return {
      controller: this.currentMapping.name,
      core: BUTTON_MAP.core,
      touchpad: this.currentMapping.touchpad ? BUTTON_MAP.touchpad : null,
      adaptiveTriggers: this.currentMapping.adaptiveTriggers ? BUTTON_MAP.adaptiveTriggers : null,
      haptics: this.currentMapping.haptics ? BUTTON_MAP.haptics : null,
      combos: COMBOS.combos,
      availableCombos: this.getAvailableCombos(),
    };
  },

  // Get combos available for this controller and player
  getAvailableCombos(playerState) {
    const available = {};
    for (const [id, combo] of Object.entries(COMBOS.combos)) {
      // Check controller compatibility
      if (combo.requiresController && !combo.requiresController.includes(this.currentController)) continue;

      // Check player requirements
      if (playerState) {
        if (combo.requiresCareer && playerState.career !== combo.requiresCareer) continue;
        if (combo.requiresTier && playerState.tier < combo.requiresTier) continue;
        if (combo.requiresOwnership && !(playerState.ownedItems || []).includes(combo.requiresOwnership)) continue;
        if (combo.requiresAria && !playerState.ariaOwned) continue;
      }

      available[id] = {
        name: id,
        sequence: combo.sequence,
        desc: combo.desc,
        category: combo.category,
        timeWindow: combo.timeWindow,
      };
    }
    return available;
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PS_CONTROLLERS, BUTTON_MAP, COMBOS, CONTROLLER_MANAGER };
}
if (typeof window !== 'undefined') {
  window.PS_CONTROLLERS = PS_CONTROLLERS;
  window.BUTTON_MAP = BUTTON_MAP;
  window.COMBOS = COMBOS;
  window.CONTROLLER_MANAGER = CONTROLLER_MANAGER;
}
