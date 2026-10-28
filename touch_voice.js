/**
 * OMEGA-8D TOUCH COMBOS + VOICE COMMAND SYSTEM
 * 1. Touch gamepad combo input (gesture-based + combo wheel)
 * 2. Voice commands for weapons, gear, abilities, strikes, dimensions
 */

// ============================================================
// 1. TOUCH GAMEPAD COMBO SYSTEM
// ============================================================
const TOUCH_COMBOS = {
  // The virtual gamepad needs a way to input combos
  // Three methods: combo wheel, gesture drawing, and multi-tap

  // Method 1: COMBO WHEEL — tap a button, wheel appears, select combo
  comboWheel: {
    active: false,
    categories: {
      cheat: { icon: '💀', color: '#ff0066', label: 'Cheat', combos: ['reality_anchor', 'immortal_code'] },
      survival: { icon: '🛡️', color: '#00ff00', label: 'Survival', combos: ['self_bunker', 'void_phase', 'quantum_lock'] },
      dimensional: { icon: '🌌', color: '#9933ff', label: 'Dimension', combos: ['dimension_shift_4d', 'dimension_shift_8d', 'banish_target', 'cosmic_banish'] },
      hacker: { icon: '💻', color: '#00ffff', label: 'ARIA', combos: ['aria_scan', 'aria_paint', 'aria_blackout', 'aria_ghost', 'aria_reality_rewrite'] },
      strikes: { icon: '🚀', color: '#ff6600', label: 'Strikes', combos: ['call_airstrike', 'call_cruise_missile', 'call_icbm', 'call_submarine'] },
      career: { icon: '🎖️', color: '#ffaa00', label: 'Career', combos: ['sniper_4d_fold', 'sniper_tachyon', 'stealth_cloak', 'stealth_neural_hijack', 'medic_revive', 'medic_quantum_heal', 'engineer_tesseract', 'heavy_overclock', 'recon_echolocation'] },
      utility: { icon: '⚙️', color: '#888888', label: 'Utility', combos: ['quick_turn_180', 'dive_roll', 'slide_cancel'] },
    },

    // Open the combo wheel on touch
    open(playerState) {
      this.active = true;
      const availableCombos = window.CONTROLLER_MANAGER ?
        window.CONTROLLER_MANAGER.getAvailableCombos(playerState) : {};

      // Create wheel UI
      const wheel = document.createElement('div');
      wheel.id = 'comboWheel';
      wheel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:500px;max-height:80vh;overflow-y:auto;background:rgba(0,0,0,0.95);border-radius:20px;border:2px solid #00ffff;z-index:99999;padding:20px;font-family:sans-serif;color:#fff;';

      let html = '<h2 style="color:#00ffff;text-align:center;margin-bottom:15px;">🎮 COMBO WHEEL</h2>';
      html += '<p style="color:#888;text-align:center;font-size:12px;margin-bottom:15px;">Tap any combo to activate. Locked combos show requirements.</p>';

      for (const [catId, cat] of Object.entries(this.categories)) {
        html += '<div style="margin-bottom:15px;">';
        html += '<h3 style="color:' + cat.color + ';font-size:16px;margin-bottom:8px;">' + cat.icon + ' ' + cat.label.toUpperCase() + '</h3>';

        cat.combos.forEach(comboId => {
          const combo = window.COMBOS && window.COMBOS.combos[comboId];
          if (!combo) return;
          const isAvailable = availableCombos[comboId];
          const locked = isAvailable ? '' : '🔒';
          const opacity = isAvailable ? '1' : '0.4';

          html += '<button onclick="window.TOUCH_COMBOS.activate(\'' + comboId + '\')" style="display:block;width:100%;text-align:left;padding:10px;margin-bottom:5px;background:' + (isAvailable ? 'rgba(0,255,255,0.1)' : 'rgba(50,50,50,0.1)') + ';border:1px solid ' + cat.color + '55;border-radius:8px;color:#fff;font-size:13px;cursor:pointer;opacity:' + opacity + ';">';
          html += locked + ' <b>' + this._comboName(comboId) + '</b><br>';
          html += '<span style="color:#888;font-size:11px;">' + combo.desc + '</span>';
          if (!isAvailable) {
            const reqs = [];
            if (combo.requiresCareer) reqs.push('Need: ' + combo.requiresCareer);
            if (combo.requiresTier) reqs.push('Tier ' + combo.requiresTier);
            if (combo.requiresOwnership) reqs.push('Own: ' + combo.requiresOwnership);
            html += '<br><span style="color:#ff4444;font-size:10px;">' + reqs.join(' | ') + '</span>';
          }
          html += '</button>';
        });
        html += '</div>';
      }

      html += '<button onclick="window.TOUCH_COMBOS.close()" style="display:block;width:100%;padding:12px;margin-top:10px;background:#ff4444;color:#fff;border:none;border-radius:8px;font-size:16px;cursor:pointer;">CLOSE</button>';
      wheel.innerHTML = html;
      document.body.appendChild(wheel);
    },

    close() {
      this.active = false;
      const wheel = document.getElementById('comboWheel');
      if (wheel) wheel.remove();
    },

    activate(comboId) {
      const combo = window.COMBOS && window.COMBOS.combos[comboId];
      if (!combo) return;

      // Execute the combo
      this.close();

      return {
        activated: comboId,
        desc: combo.desc,
        voiceLine: combo.voiceLine || null,
        message: 'Combo activated: ' + this._comboName(comboId),
      };
    },

    _comboName(id) {
      return id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    },
  },

  // Method 2: GESTURE DRAWING — draw combo patterns on screen
  gestureDraw: {
    active: false,
    canvas: null,
    points: [],

    // Each combo has a gesture pattern (draw shape on screen)
    gestures: {
      // Draw a circle = banish
      banish_target: { shape: 'circle', desc: 'Draw a circle to banish target' },
      // Draw a triangle = dimensional shift 4D
      dimension_shift_4d: { shape: 'triangle', desc: 'Draw a triangle for 4D fold' },
      // Draw a square = seal bunker
      seal_bunker: { shape: 'square', desc: 'Draw a square to seal bunker' },
      // Draw an X = self bunker
      self_bunker: { shape: 'x', desc: 'Draw an X for self-bunker mode' },
      // Draw a star = cosmic banish
      cosmic_banish: { shape: 'star', desc: 'Draw a star for cosmic banishment' },
      // Draw a line up = ARIA scan
      aria_scan: { shape: 'line_up', desc: 'Draw a line up for ARIA scan' },
      // Draw a line right = airstrike
      call_airstrike: { shape: 'line_right', desc: 'Draw a line right for airstrike' },
      // Draw a zigzag = quantum lock
      quantum_lock: { shape: 'zigzag', desc: 'Draw a zigzag for quantum state lock' },
    },

    // Start gesture drawing mode
    start() {
      this.active = true;
      this.points = [];

      const canvas = document.createElement('canvas');
      canvas.id = 'gestureCanvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;pointer-events:auto;touch-action:none;background:rgba(0,0,0,0.3);';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      this.canvas = canvas;
      const ctx = canvas.getContext('2d');

      let drawing = false;

      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        drawing = true;
        this.points = [];
        const touch = e.touches[0];
        this.points.push({ x: touch.clientX, y: touch.clientY });
      });

      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!drawing) return;
        const touch = e.touches[0];
        this.points.push({ x: touch.clientX, y: touch.clientY });

        // Draw the line
        if (this.points.length > 1) {
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(this.points[this.points.length - 2].x, this.points[this.points.length - 2].y);
          ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
          ctx.stroke();
        }
      });

      canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        drawing = false;
        const detected = this._recognizeGesture();
        this.stop();
        if (detected) {
          // Show notification
          this._showNotification('Gesture: ' + detected.gesture + ' -> ' + detected.comboId);
        }
      });

      // Also support mouse for testing
      canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        this.points = [{ x: e.clientX, y: e.clientY }];
      });
      canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        this.points.push({ x: e.clientX, y: e.clientY });
        if (this.points.length > 1) {
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(this.points[this.points.length - 2].x, this.points[this.points.length - 2].y);
          ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
          ctx.stroke();
        }
      });
      canvas.addEventListener('mouseup', () => {
        drawing = false;
        const detected = this._recognizeGesture();
        this.stop();
        if (detected) {
          this._showNotification('Gesture: ' + detected.gesture + ' -> ' + detected.comboId);
        }
      });
    },

    stop() {
      this.active = false;
      const canvas = document.getElementById('gestureCanvas');
      if (canvas) canvas.remove();
    },

    _recognizeGesture() {
      if (this.points.length < 5) return null;

      // Simple shape recognition
      const shape = this._detectShape(this.points);

      for (const [comboId, gesture] of Object.entries(this.gestures)) {
        if (gesture.shape === shape) {
          return { comboId, gesture: gesture.shape, desc: gesture.desc };
        }
      }
      return null;
    },

    _detectShape(points) {
      // Get bounding box
      const xs = points.map(p => p.x);
      const ys = points.map(p => p.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const w = maxX - minX, h = maxY - minY;

      // Check if it's roughly circular
      if (w > 50 && h > 50 && Math.abs(w - h) < 30 && points.length > 30) {
        return 'circle';
      }

      // Check if first and last point are close (closed shape)
      const first = points[0], last = points[points.length - 1];
      const closedDist = Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);

      if (closedDist < 50 && w > 50 && h > 50) {
        // Closed shape — square or triangle
        if (points.length < 25) return 'triangle';
        return 'square';
      }

      // Check if it's a line
      if (w > 100 && h < 50) return 'line_right';
      if (h > 100 && w < 50) return 'line_up';

      // Check if it's a zigzag
      if (points.length > 20 && w > 80) {
        let zigzags = 0;
        let lastDir = 0;
        for (let i = 1; i < points.length; i++) {
          const dir = points[i].y > points[i - 1].y ? 1 : -1;
          if (dir !== lastDir && lastDir !== 0) zigzags++;
          lastDir = dir;
        }
        if (zigzags > 3) return 'zigzag';
      }

      // Check if it's an X (two crossing lines approximated by many direction changes)
      if (w > 50 && h > 50 && points.length > 15) {
        return 'x';
      }

      return 'unknown';
    },

    _showNotification(text) {
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(0,255,255,0.9);color:#000;padding:10px 25px;border-radius:20px;z-index:99999;font-family:sans-serif;font-weight:bold;font-size:14px;';
      toast.textContent = text;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    },
  },

  // Method 3: MULTI-TAP — tap buttons in sequence on the virtual gamepad
  // This is already handled by the COMBOS.detectCombo function
  // The virtual gamepad feeds button presses into the same combo detection engine
  // Example: tap 🔥 -> ⭕ -> 🔪 = banish_target (same as R2 -> CIRCLE -> R3)
  multiTapFeed(buttonId, playerState) {
    // Feed virtual button press into combo detection
    if (!this._inputBuffer) this._inputBuffer = [];
    this._inputBuffer.push({ button: buttonId, timestamp: Date.now() });

    // Keep only last 10 inputs (3s window)
    this._inputBuffer = this._inputBuffer.filter(i => Date.now() - i.timestamp < 3000);

    // Check for combo
    if (window.COMBOS) {
      const detected = window.COMBOS.detectCombo(this._inputBuffer, playerState);
      if (detected) {
        this._inputBuffer = []; // clear on match
        return detected;
      }
    }
    return null;
  },
};

// ============================================================
// 2. VOICE COMMAND SYSTEM
// ============================================================
const VOICE_COMMANDS = {
  recognition: null,
  active: false,
  enabled: false,

  // Initialize speech recognition
  init() {
    if (typeof window === 'undefined') return { success: false, error: 'No window' };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return { success: false, error: 'Speech recognition not supported on this device. Use touch combos instead.' };
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 3;

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.toLowerCase().trim();
          this._processCommand(transcript);
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.log('[Voice] Error:', event.error);
      // Restart on error
      if (this.active) {
        setTimeout(() => { try { this.recognition.start(); } catch(e){} }, 1000);
      }
    };

    this.recognition.onend = () => {
      // Auto-restart if still active
      if (this.active) {
        try { this.recognition.start(); } catch(e){}
      }
    };

    return { success: true, message: 'Voice recognition initialized. Say "voice on" to start listening.' };
  },

  // Start listening
  start() {
    if (!this.recognition) {
      const init = this.init();
      if (!init.success) return init;
    }
    try {
      this.active = true;
      this.recognition.start();
      return { success: true, message: 'Voice commands active. Speak your command.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Stop listening
  stop() {
    this.active = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch(e){}
    }
    return { success: true, message: 'Voice commands deactivated.' };
  },

  // All voice commands
  commands: {
    // SYSTEM
    'voice on': { action: 'voice_start', desc: 'Activate voice commands' },
    'voice off': { action: 'voice_stop', desc: 'Deactivate voice commands' },
    'combos': { action: 'open_combos', desc: 'Open combos reference panel' },
    'combo wheel': { action: 'combo_wheel', desc: 'Open combo wheel for touch activation' },
    'tactical map': { action: 'tactical_map', desc: 'Open tactical map' },
    'settings': { action: 'settings', desc: 'Open settings menu' },

    // WEAPONS
    'switch weapon': { action: 'switch_weapon', desc: 'Switch to next weapon' },
    'next weapon': { action: 'switch_weapon', desc: 'Switch to next weapon' },
    'reload': { action: 'reload', desc: 'Reload current weapon' },
    'primary weapon': { action: 'weapon_slot_1', desc: 'Switch to primary weapon slot' },
    'secondary weapon': { action: 'weapon_slot_2', desc: 'Switch to secondary weapon slot' },
    'heavy weapon': { action: 'weapon_slot_3', desc: 'Switch to heavy weapon slot' },
    'sidearm': { action: 'weapon_slot_4', desc: 'Switch to sidearm' },
    'sniper': { action: 'equip_sniper', desc: 'Equip sniper rifle' },
    'assault rifle': { action: 'equip_ar', desc: 'Equip assault rifle' },
    'shotgun': { action: 'equip_shotgun', desc: 'Equip shotgun' },
    'lmg': { action: 'equip_lmg', desc: 'Equip light machine gun' },
    'rocket launcher': { action: 'equip_rocket', desc: 'Equip rocket launcher' },
    'pistol': { action: 'equip_pistol', desc: 'Equip pistol' },
    'knife': { action: 'melee', desc: 'Melee attack' },
    'throw grenade': { action: 'grenade', desc: 'Throw grenade' },
    'flashbang': { action: 'flashbang', desc: 'Throw flashbang' },
    'smoke': { action: 'smoke', desc: 'Throw smoke grenade' },

    // GEAR
    'equip mask': { action: 'equip_mask', desc: 'Equip gas mask' },
    'night vision': { action: 'nvg', desc: 'Toggle night vision goggles' },
    'thermal vision': { action: 'thermal', desc: 'Toggle thermal vision' },
    'med kit': { action: 'medkit', desc: 'Use medical kit' },
    'armor': { action: 'use_armor', desc: 'Use armor plate' },
    'shield': { action: 'use_shield', desc: 'Activate personal shield' },
    'battery': { action: 'use_battery', desc: 'Replace device battery' },

    // ABILITIES
    'ability': { action: 'ability_primary', desc: 'Use primary ability' },
    'special': { action: 'ability_special', desc: 'Use special ability' },
    'ultimate': { action: 'ability_ultimate', desc: 'Use ultimate ability' },

    // DIMENSIONAL
    'fold': { action: 'dimension_4d', desc: '4D fold — shift one dimension' },
    'shift': { action: 'dimension_shift', desc: 'Shift to next dimension' },
    'dimension up': { action: 'dimension_up', desc: 'Shift to higher dimension' },
    'dimension down': { action: 'dimension_down', desc: 'Shift to lower dimension' },
    'eight d': { action: 'dimension_8d', desc: '8D shift — maximum displacement' },
    'banish': { action: 'banish', desc: 'Banish locked target to deep space' },
    'cosmic banish': { action: 'cosmic_banish', desc: 'Cosmic banishment across galaxies' },

    // ARIA / HACKER
    'aria scan': { action: 'aria_scan', desc: 'ARIA country scan' },
    'aria paint': { action: 'aria_paint', desc: 'ARIA paint target on squad map' },
    'aria blackout': { action: 'aria_blackout', desc: 'ARIA grid blackout' },
    'aria ghost': { action: 'aria_ghost', desc: 'ARIA digital ghost — erase traces' },
    'aria rewrite': { action: 'aria_rewrite', desc: 'ARIA reality code rewrite' },
    'hack': { action: 'aria_hack', desc: 'Hack nearest device/system' },

    // STRIKES
    'airstrike': { action: 'airstrike', desc: 'Call airstrike (laser designator)' },
    'air strike': { action: 'airstrike', desc: 'Call airstrike' },
    'cruise missile': { action: 'cruise_missile', desc: 'Call cruise missile with waypoints' },
    'icbm': { action: 'icbm', desc: 'Launch ICBM — triggers M.A.D.' },
    'submarine': { action: 'submarine_strike', desc: 'Call submarine torpedo strike' },
    'thor': { action: 'thor_strike', desc: 'Thor kinetic bombardment from orbit' },
    'rod drop': { action: 'thor_strike', desc: 'Drop Thor rod from orbit' },
    'supply drop': { action: 'supply_drop', desc: 'Call supply drop' },

    // SURVIVAL
    'bunker': { action: 'seal_bunker', desc: 'SEAL BUNKER — survive doomsday' },
    'seal bunker': { action: 'seal_bunker', desc: 'Seal bunker during M.A.D.' },
    'self bunker': { action: 'self_bunker', desc: 'Deploy self-bunker mode' },
    'void phase': { action: 'void_phase', desc: 'Phase into void dimension' },
    'quantum lock': { action: 'quantum_lock', desc: 'Lock quantum state' },
    'reality anchor': { action: 'reality_anchor', desc: 'Activate Reality Anchor cheat' },
    'immortal code': { action: 'immortal_code', desc: 'Activate Immortal Code cheat' },

    // MOVEMENT
    'sprint': { action: 'sprint', desc: 'Start sprinting' },
    'stop': { action: 'stop_sprint', desc: 'Stop sprinting' },
    'crouch': { action: 'crouch', desc: 'Crouch' },
    'prone': { action: 'prone', desc: 'Go prone' },
    'stand': { action: 'stand', desc: 'Stand up' },
    'jump': { action: 'jump', desc: 'Jump' },
    'dive': { action: 'dive_roll', desc: 'Dive roll' },

    // SQUAD
    'regroup': { action: 'squad_regroup', desc: 'Call squad to regroup' },
    'hold position': { action: 'squad_hold', desc: 'Order squad to hold position' },
    'push forward': { action: 'squad_push', desc: 'Order squad to push forward' },
    'fall back': { action: 'squad_fallback', desc: 'Order squad to fall back' },
    'flank left': { action: 'squad_flank_left', desc: 'Order squad to flank left' },
    'flank right': { action: 'squad_flank_right', desc: 'Order squad to flank right' },
    'suppressing fire': { action: 'squad_suppress', desc: 'Order squad suppressing fire' },

    // INTEL
    'intel report': { action: 'intel_report', desc: 'Request full intelligence report' },
    'osint': { action: 'osint_scan', desc: 'Run OSINT harvest on current zone' },
    'scan area': { action: 'area_scan', desc: 'Scan area for threats' },
    'mark target': { action: 'mark_target', desc: 'Mark current target for squad' },
    'ping': { action: 'ping', desc: 'Ping current location' },

    // SUBMARINE / NAVAL
    'sonar ping': { action: 'sonar_active', desc: 'Active sonar ping (reveals position)' },
    'silent running': { action: 'silent_running', desc: 'Switch to silent running mode' },
    'deploy decoy': { action: 'deploy_decoy', desc: 'Deploy acoustic decoy' },
    'fire torpedo': { action: 'fire_torpedo', desc: 'Fire torpedo' },
    'launch missile': { action: 'launch_slbm', desc: 'Launch submarine missile' },
    'deploy uuv': { action: 'deploy_uuv', desc: 'Deploy UUV' },
    'cut cable': { action: 'cut_cable', desc: 'Deploy cable cutter UUV' },

    // VR SPECIFIC
    'grab': { action: 'vr_grab', desc: 'Grab item (VR)' },
    'release': { action: 'vr_release', desc: 'Release item (VR)' },

    // COMMUNICATION
    'enemy spotted': { action: 'callout_enemy', desc: 'Call out enemy position to squad' },
    'enemy behind': { action: 'callout_behind', desc: 'Warn squad of enemy behind' },
    'enemy left': { action: 'callout_left', desc: 'Warn squad of enemy left' },
    'enemy right': { action: 'callout_right', desc: 'Warn squad of enemy right' },
    'need backup': { action: 'call_backup', desc: 'Request backup' },
    'need medic': { action: 'call_medic', desc: 'Request medic' },
    'need ammo': { action: 'call_ammo', desc: 'Request ammo' },
    'clear': { action: 'callout_clear', desc: 'Area is clear' },
    'contact': { action: 'callout_contact', desc: 'Enemy contact' },

    // SHOP / ECONOMY
    'open shop': { action: 'open_shop', desc: 'Open weapon/ammo shop' },
    'buy ammo': { action: 'buy_ammo', desc: 'Buy ammo for current weapon' },
    'buy armor': { action: 'buy_armor', desc: 'Buy armor plates' },
    'buy medkit': { action: 'buy_medkit', desc: 'Buy medical kit' },
    'warp back': { action: 'warp_back', desc: 'Pay to warp back from banishment' },
    'return ticket': { action: 'warp_back', desc: 'Buy warp-gate return ticket' },

    // NATIONAL PROTOCOL
    'national protocol': { action: 'national_protocol', desc: 'Activate national defense framework' },
    'mobilize militia': { action: 'mobilize_militia', desc: 'Mobilize civilian militia' },
    'blackout': { action: 'grid_blackout', desc: 'Trigger local grid blackout' },

    // MISC
    'screenshot': { action: 'screenshot', desc: 'Take screenshot' },
    'record': { action: 'record', desc: 'Start/stop recording' },
    'mute': { action: 'mute', desc: 'Mute voice chat' },
    'unmute': { action: 'unmute', desc: 'Unmute voice chat' },
  },

  // Process a voice command
  _processCommand(transcript) {
    // Show what was heard
    this._showHeard(transcript);

    // Find matching command
    let matched = null;
    let matchedKey = null;

    // Exact match first
    if (this.commands[transcript]) {
      matched = this.commands[transcript];
      matchedKey = transcript;
    }

    // Partial match (command contained in transcript)
    if (!matched) {
      for (const [key, cmd] of Object.entries(this.commands)) {
        if (transcript.includes(key)) {
          matched = cmd;
          matchedKey = key;
          break;
        }
      }
    }

    if (matched) {
      this._showResult(matchedKey, matched.desc, true);
      this._execute(matched.action, matchedKey);
    } else {
      this._showResult('unknown', 'Command not recognized: "' + transcript + '"', false);
    }
  },

  // Execute the command
  _execute(action, commandKey) {
    // This would trigger the actual game action
    // For now, we dispatch a custom event the game can listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('voiceCommand', {
        detail: { action, command: commandKey, timestamp: Date.now() }
      }));
    }
  },

  // Show what was heard
  _showHeard(text) {
    let indicator = document.getElementById('voiceHeard');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'voiceHeard';
      indicator.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#00ff00;padding:8px 20px;border-radius:20px;z-index:99999;font-family:sans-serif;font-size:13px;border:1px solid #00ff00;max-width:80%;text-align:center;';
      document.body.appendChild(indicator);
    }
    indicator.textContent = '🎤 "' + text + '"';
    indicator.style.display = 'block';
  },

  // Show command result
  _showResult(key, desc, success) {
    let indicator = document.getElementById('voiceResult');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'voiceResult';
      indicator.style.cssText = 'position:fixed;top:50px;left:50%;transform:translateX(-50%);padding:8px 20px;border-radius:20px;z-index:99999;font-family:sans-serif;font-size:13px;max-width:80%;text-align:center;';
      document.body.appendChild(indicator);
    }
    indicator.textContent = (success ? '✅ ' : '❌ ') + desc;
    indicator.style.background = success ? 'rgba(0,255,0,0.8)' : 'rgba(255,50,50,0.8)';
    indicator.style.color = success ? '#000' : '#fff';
    indicator.style.display = 'block';
    setTimeout(() => { indicator.style.display = 'none'; }, 3000);

    // Clear heard text after a delay
    setTimeout(() => {
      const heard = document.getElementById('voiceHeard');
      if (heard) heard.style.display = 'none';
    }, 2000);
  },

  // Get all commands for reference
  getAllCommands() {
    const categories = {
      'System': ['voice on', 'voice off', 'combos', 'combo wheel', 'tactical map', 'settings'],
      'Weapons': ['switch weapon', 'reload', 'sniper', 'assault rifle', 'shotgun', 'lmg', 'rocket launcher', 'pistol', 'knife', 'throw grenade', 'flashbang', 'smoke'],
      'Gear': ['equip mask', 'night vision', 'thermal vision', 'med kit', 'armor', 'shield', 'battery'],
      'Abilities': ['ability', 'special', 'ultimate'],
      'Dimensional': ['fold', 'shift', 'dimension up', 'dimension down', 'eight d', 'banish', 'cosmic banish'],
      'ARIA/Hacker': ['aria scan', 'aria paint', 'aria blackout', 'aria ghost', 'aria rewrite', 'hack'],
      'Strikes': ['airstrike', 'cruise missile', 'icbm', 'submarine', 'thor', 'rod drop', 'supply drop'],
      'Survival': ['bunker', 'seal bunker', 'self bunker', 'void phase', 'quantum lock', 'reality anchor', 'immortal code'],
      'Movement': ['sprint', 'stop', 'crouch', 'prone', 'stand', 'jump', 'dive'],
      'Squad': ['regroup', 'hold position', 'push forward', 'fall back', 'flank left', 'flank right', 'suppressing fire'],
      'Intel': ['intel report', 'osint', 'scan area', 'mark target', 'ping'],
      'Naval': ['sonar ping', 'silent running', 'deploy decoy', 'fire torpedo', 'launch missile', 'deploy uuv', 'cut cable'],
      'Comms': ['enemy spotted', 'enemy behind', 'enemy left', 'enemy right', 'need backup', 'need medic', 'need ammo', 'clear', 'contact'],
      'Shop': ['open shop', 'buy ammo', 'buy armor', 'buy medkit', 'warp back', 'return ticket'],
      'National': ['national protocol', 'mobilize militia', 'blackout'],
    };

    let count = 0;
    for (const cmds of Object.values(categories)) count += cmds.length;

    return { categories, totalCommands: count };
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOUCH_COMBOS, VOICE_COMMANDS };
}
if (typeof window !== 'undefined') {
  window.TOUCH_COMBOS = TOUCH_COMBOS;
  window.VOICE_COMMANDS = VOICE_COMMANDS;
}
