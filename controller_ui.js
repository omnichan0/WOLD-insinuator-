/**
 * OMEGA-8D CONTROLLER UI, SPLIT-SCREEN & VIRTUAL GAMEPAD
 * 1. Combos reference tab — fully responsive (mobile/tablet/console/TV)
 * 2. Split-screen 2-player on same PlayStation
 * 3. Controller-to-mobile detection
 * 4. Virtual on-screen gamepad (COD Mobile style) when no controller found
 */

// ============================================================
// 1. COMBOS REFERENCE PANEL (RESPONSIVE)
// ============================================================
const COMBOS_PANEL = {
  // CSS injected once for responsive design
  _cssInjected: false,

  _injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;
    const style = document.createElement('style');
    style.id = 'combos-panel-css';
    style.textContent = `
      #combosPanel{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.97);z-index:9999;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;}
      #combosPanel .cp-wrap{max-width:800px;margin:0 auto;padding:16px;}
      #combosPanel .cp-title{text-align:center;font-size:clamp(20px,5vw,28px);font-weight:900;color:#00ffff;margin-bottom:8px;}
      #combosPanel .cp-sub{text-align:center;color:#888;font-size:clamp(12px,3vw,14px);margin-bottom:16px;}
      #combosPanel .cp-cat{margin-bottom:20px;}
      #combosPanel .cp-cat-title{font-size:clamp(16px,4vw,20px);border-bottom:2px solid;padding-bottom:4px;margin-bottom:6px;font-weight:700;}
      #combosPanel .cp-cat-desc{color:#666;font-size:clamp(10px,2.5vw,12px);margin-bottom:8px;}
      #combosPanel .cp-combo{border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:10px;margin-bottom:6px;}
      #combosPanel .cp-combo-top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;}
      #combosPanel .cp-combo-name{font-weight:700;color:#fff;font-size:clamp(13px,3.5vw,15px);}
      #combosPanel .cp-combo-seq{font-family:monospace;background:#111;padding:4px 8px;border-radius:6px;font-size:clamp(11px,3vw,13px);white-space:nowrap;}
      #combosPanel .cp-combo-desc{color:#aaa;font-size:clamp(11px,2.5vw,12px);margin:4px 0 0 0;line-height:1.4;}
      #combosPanel .cp-combo-time{color:#666;font-size:10px;}
      #combosPanel .cp-combo-voice{font-size:clamp(10px,2vw,11px);font-style:italic;margin:2px 0 0 0;}
      #combosPanel .cp-combo-req{color:#ff4444;font-size:10px;display:block;margin-top:2px;}
      #combosPanel .cp-info{margin-bottom:20px;}
      #combosPanel .cp-info-title{color:#fff;font-size:clamp(16px,4vw,20px);border-bottom:2px solid #fff;padding-bottom:4px;}
      #combosPanel .cp-info-row{font-size:clamp(12px,3vw,14px);padding:4px 0;}
      #combosPanel .cp-close{display:block;width:100%;padding:14px;background:#00ffff;color:#000;border:none;border-radius:10px;font-size:clamp(15px,4vw,18px);font-weight:700;cursor:pointer;margin-top:16px;position:sticky;bottom:0;}
      #combosPanel .cp-controller-badge{display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;margin:2px;}
      /* Mobile: stack combo name and sequence */
      @media(max-width:480px){
        #combosPanel .cp-wrap{padding:10px;}
        #combosPanel .cp-combo-top{flex-direction:column;align-items:flex-start;}
        #combosPanel .cp-combo-seq{font-size:12px;}
        #combosPanel .cp-combo{padding:8px;}
      }
      /* Tablet: 2-column layout */
      @media(min-width:768px) and (max-width:1024px){
        #combosPanel .cp-cat{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        #combosPanel .cp-cat-title,#combosPanel .cp-cat-desc{grid-column:1/-1;}
      }
      /* TV/Console: larger fonts, wider */
      @media(min-width:1920px){
        #combosPanel .cp-wrap{max-width:1200px;padding:32px;}
        #combosPanel .cp-title{font-size:36px;}
        #combosPanel .cp-cat-title{font-size:24px;}
        #combosPanel .cp-combo-name{font-size:18px;}
        #combosPanel .cp-combo-seq{font-size:16px;padding:6px 14px;}
        #combosPanel .cp-combo-desc{font-size:14px;}
      }
      /* Landscape phone */
      @media(max-height:500px) and (orientation:landscape){
        #combosPanel .cp-wrap{padding:8px 16px;}
        #combosPanel .cp-title{font-size:18px;margin-bottom:4px;}
        #combosPanel .cp-sub{display:none;}
        #combosPanel .cp-combo{padding:6px;margin-bottom:4px;}
        #combosPanel .cp-combo-desc{font-size:11px;}
      }
    `;
    document.head.appendChild(style);
  },

  generatePanel(playerState) {
    this._injectCSS();
    const combos = window.COMBOS ? window.COMBOS.combos : {};
    const available = window.CONTROLLER_MANAGER ? window.CONTROLLER_MANAGER.getAvailableCombos(playerState) : {};

    let html = '<div id="combosPanel">';
    html += '<div class="cp-wrap">';
    html += '<div class="cp-title">🎮 CONTROLLER COMBOS</div>';
    html += '<div class="cp-sub">Learn every combo for your controller. Master the pad.</div>';

    const categories = {
      cheat: { label: '💀 CHEAT ABILITIES', color: '#ff0066', desc: 'Server-blessed powers. Most expensive in the game.' },
      survival: { label: '🛡️ SURVIVAL TRAITS', color: '#00ff00', desc: 'Survive doomsday and M.A.D. outside a bunker.' },
      dimensional: { label: '🌌 DIMENSIONAL', color: '#9933ff', desc: 'Fold space, banish enemies, shift dimensions.' },
      hacker: { label: '💻 HACKER / ARIA', color: '#00ffff', desc: 'Cyber warfare commands. Requires hacker career.' },
      strikes: { label: '🚀 STRIKES & ORDNANCE', color: '#ff6600', desc: 'Call in air strikes, missiles, and submarines.' },
      mad: { label: '☢️ M.A.D. PROTOCOL', color: '#ff0000', desc: 'Mutually Assured Destruction responses.' },
      career: { label: '🎖️ CAREER ABILITIES', color: '#ffaa00', desc: 'Class-specific combos for your career path.' },
      utility: { label: '⚙️ UTILITY', color: '#888888', desc: 'Movement and gameplay tech.' },
    };

    for (const [catId, cat] of Object.entries(categories)) {
      let catCombos = Object.entries(combos).filter(([id, c]) => c.category === catId);
      if (catCombos.length === 0) continue;

      html += '<div class="cp-cat">';
      html += '<div class="cp-cat-title" style="color:' + cat.color + ';border-color:' + cat.color + '">' + cat.label + '</div>';
      html += '<div class="cp-cat-desc">' + cat.desc + '</div>';

      catCombos.forEach(([id, combo]) => {
        const isAvailable = available[id];
        const opacity = isAvailable ? '1' : '0.4';
        const locked = isAvailable ? '' : ' 🔒';
        const seqDisplay = combo.sequence ? combo.sequence.map(b => this._buttonDisplay(b)).join(' + ') : (combo.gesture || combo.motion || '?');

        html += '<div class="cp-combo" style="opacity:' + opacity + ';border-color:' + cat.color + '33;background:' + (isAvailable ? 'rgba(0,255,255,0.05)' : 'rgba(100,100,100,0.05)') + '">';
        html += '<div class="cp-combo-top">';
        html += '<span class="cp-combo-name">' + this._comboName(id) + locked + '</span>';
        html += '<span class="cp-combo-seq" style="color:' + cat.color + '">' + seqDisplay + '</span>';
        html += '</div>';
        html += '<p class="cp-combo-desc">' + (combo.desc || '') + '</p>';
        if (combo.timeWindow) html += '<span class="cp-combo-time">⏱ ' + (combo.timeWindow / 1000) + 's window</span>';
        if (combo.voiceLine) html += '<p class="cp-combo-voice" style="color:' + cat.color + '99">"' + combo.voiceLine + '"</p>';
        if (!isAvailable) {
          const reqs = [];
          if (combo.requiresCareer) reqs.push('Career: ' + combo.requiresCareer);
          if (combo.requiresTier) reqs.push('Tier ' + combo.requiresTier);
          if (combo.requiresOwnership) reqs.push('Owns: ' + combo.requiresOwnership);
          if (combo.requiresAria) reqs.push('ARIA owned');
          html += '<span class="cp-combo-req">🔒 ' + reqs.join(' | ') + '</span>';
        }
        html += '</div>';
      });
      html += '</div>';
    }

    // Controller info
    html += '<div class="cp-info">';
    html += '<div class="cp-info-title">🎛️ CONTROLLER INFO</div>';
    if (window.CONTROLLER_MANAGER && window.CONTROLLER_MANAGER.currentMapping) {
      const ctrl = window.CONTROLLER_MANAGER.currentMapping;
      html += '<div class="cp-info-row" style="color:#0f0">Connected: ' + ctrl.name + ' (' + ctrl.year + ')</div>';
      html += '<div class="cp-info-row" style="color:#888">Buttons: ' + Object.keys(ctrl.buttons).length + ' | Features: ' + (ctrl.features || []).join(', ') + '</div>';
      if (ctrl.touchpad) html += '<span class="cp-controller-badge" style="background:#0ff22;color:#0ff">✅ Touchpad</span>';
      if (ctrl.adaptiveTriggers) html += '<span class="cp-controller-badge" style="background:#0ff22;color:#0ff">✅ Adaptive Triggers</span>';
      if (ctrl.haptics) html += '<span class="cp-controller-badge" style="background:#0ff22;color:#0ff">✅ Haptics</span>';
    } else {
      html += '<div class="cp-info-row" style="color:#ff0">No controller detected — using virtual gamepad</div>';
      html += '<div class="cp-info-row" style="color:#888;font-size:12px">Connect a PlayStation or Xbox controller, or use touch controls on mobile</div>';
    }
    html += '</div>';

    html += '<button class="cp-close" onclick="document.getElementById(\'combosPanel\').remove()">CLOSE</button>';
    html += '</div></div>';

    return html;
  },

  _buttonDisplay(btn) {
    const map = {
      CROSS: '✕', CIRCLE: '◯', SQUARE: '□', TRIANGLE: '△',
      L1: 'L1', R1: 'R1', L2: 'L2', R2: 'R2',
      L3: 'L3⬇', R3: 'R3⬇', SELECT: 'Select', START: 'Start',
      SHARE: 'Share', OPTIONS: 'Options', PS_BUTTON: 'PS',
      TOUCHPAD: 'Touchpad', MIC_BUTTON: 'Mic',
      TOUCHPAD_TAP: 'Touch📐',
      DPAD_UP: '⬆️', DPAD_DOWN: '⬇️', DPAD_LEFT: '⬅️', DPAD_RIGHT: '➡️',
    };
    return map[btn] || btn;
  },

  _comboName(id) {
    return id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  },

  open(playerState) {
    const existing = document.getElementById('combosPanel');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.innerHTML = this.generatePanel(playerState);
    document.body.appendChild(div.firstChild);
  },
};

// ============================================================
// 2. SPLIT-SCREEN 2-PLAYER (Same PlayStation/Device)
// ============================================================
const SPLIT_SCREEN = {
  mode: 'none',
  player1: null,
  player2: null,

  enable(orientation) {
    this.mode = orientation;
    this.player1 = { id: null, name: null, viewport: null, controller: null };
    this.player2 = { id: null, name: null, viewport: null, controller: null };
    return {
      success: true, mode: orientation,
      desc: orientation === 'vertical' ? 'Screen split top/bottom' : 'Screen split left/right',
      note: 'Each player logs in with their own account. Each player uses their own controller.',
    };
  },

  loginPlayer1(playerId, name, country, career) {
    if (!this.player1) return { success: false, error: 'Split screen not enabled' };
    this.player1.id = playerId; this.player1.name = name;
    this.player1.country = country; this.player1.career = career;
    return { success: true, player: 'Player 1', screen: this.mode === 'vertical' ? 'Top half' : 'Left half', country, career };
  },

  loginPlayer2(playerId, name, country, career) {
    if (!this.player2) return { success: false, error: 'Split screen not enabled' };
    this.player2.id = playerId; this.player2.name = name;
    this.player2.country = country; this.player2.career = career;
    return { success: true, player: 'Player 2', screen: this.mode === 'vertical' ? 'Bottom half' : 'Right half', country, career };
  },

  getViewports() {
    if (this.mode === 'none') return null;
    if (this.mode === 'vertical') {
      return { player1: { x: 0, y: 0, width: '100%', height: '50%' }, player2: { x: 0, y: '50%', width: '100%', height: '50%' } };
    }
    return { player1: { x: 0, y: 0, width: '50%', height: '100%' }, player2: { x: '50%', y: 0, width: '50%', height: '100%' } };
  },

  joinSameCampaign(campaignId) {
    if (!this.player1?.id || !this.player2?.id) return { success: false, error: 'Both players must login first' };
    return { success: true, campaign: campaignId,
      player1: { id: this.player1.id, name: this.player1.name, country: this.player1.country, career: this.player1.career },
      player2: { id: this.player2.id, name: this.player2.name, country: this.player2.country, career: this.player2.career },
      sameScreen: true, note: 'Both players share the screen' };
  },

  joinDifferentCampaigns(campaign1, campaign2) {
    if (!this.player1?.id || !this.player2?.id) return { success: false, error: 'Both players must login first' };
    return { success: true,
      player1: { campaign: campaign1, country: this.player1.country, career: this.player1.career, screen: this.mode === 'vertical' ? 'top' : 'left' },
      player2: { campaign: campaign2, country: this.player2.country, career: this.player2.career, screen: this.mode === 'vertical' ? 'bottom' : 'right' },
      note: 'Each player in a different campaign. Same console, different wars.' };
  },

  disable() { this.mode = 'none'; this.player1 = null; this.player2 = null; return { success: true, message: 'Split screen disabled.' }; },

  getStatus() {
    if (this.mode === 'none') return { active: false, message: 'Split screen not active' };
    return { active: true, mode: this.mode, orientation: this.mode === 'vertical' ? 'Top/Bottom' : 'Left/Right',
      player1: this.player1?.id ? this.player1.name : 'Not logged in',
      player2: this.player2?.id ? this.player2.name : 'Not logged in', viewports: this.getViewports() };
  },
};

// ============================================================
// 3. CONTROLLER DETECTION (Mobile/Tablet/Console)
// ============================================================
const CONTROLLER_DETECT = {
  detect() {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|android|mobile/i.test(ua);
    const isTablet = /ipad|tablet|kindle|silk/i.test(ua);
    const isPlayStation = /playstation|ps5|ps4|ps3/i.test(ua);
    const isTV = /smart-tv|smarttv|tv/i.test(ua);
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const connected = [];
    for (const gp of gamepads) if (gp) connected.push(gp);

    let deviceType = 'desktop';
    if (isPlayStation) deviceType = 'playstation';
    else if (isTV) deviceType = 'tv';
    else if (isTablet) deviceType = 'tablet';
    else if (isMobile) deviceType = 'mobile';

    let controllerType = 'none', useVirtual = false;
    if (connected.length > 0) {
      const id = (connected[0].id || '').toLowerCase();
      if (id.includes('dualsense') || id.includes('ps5')) controllerType = 'ps5';
      else if (id.includes('dualshock') || id.includes('ps4')) controllerType = 'ps4';
      else if (id.includes('xbox')) controllerType = 'xbox';
      else controllerType = 'generic';
    } else {
      if (deviceType === 'mobile' || deviceType === 'tablet') { useVirtual = true; controllerType = 'virtual_touch'; }
      else if (deviceType === 'playstation' || deviceType === 'tv') controllerType = 'waiting';
      else controllerType = 'keyboard_mouse';
    }

    return { deviceType, controllerType, connectedCount: connected.length, useVirtualGamepad: useVirtual,
      supportsSplitScreen: deviceType === 'playstation' || deviceType === 'tv' || (deviceType === 'desktop' && connected.length >= 2),
      canConnectControllerToMobile: deviceType === 'mobile' || deviceType === 'tablet',
      needsOnScreenControls: useVirtual, message: this._getMessage(deviceType, controllerType) };
  },

  _getMessage(device, controller) {
    const m = {
      'playstation|ps5': 'PS5 DualSense connected. Adaptive triggers and haptics active.',
      'playstation|ps4': 'PS4 DualShock 4 connected. Touchpad and motion active.',
      'playstation|waiting': 'No controller detected. Connect a DualSense or DualShock.',
      'mobile|virtual_touch': 'No controller. Virtual touch gamepad enabled. Connect Bluetooth controller for better control.',
      'mobile|ps5': 'PS5 controller connected to phone via Bluetooth.',
      'mobile|ps4': 'PS4 controller connected to phone via Bluetooth.',
      'mobile|xbox': 'Xbox controller connected to phone via Bluetooth.',
      'tablet|virtual_touch': 'No controller. Virtual touch gamepad enabled.',
      'tablet|ps5': 'PS5 controller connected to tablet.',
      'desktop|keyboard_mouse': 'Keyboard and mouse. Press gamepad button to switch to controller mode.',
      'desktop|ps5': 'PS5 DualSense connected to PC.',
      'desktop|xbox': 'Xbox controller connected to PC.',
      'tv|waiting': 'No controller detected. Please connect a controller.',
    };
    return m[device + '|' + controller] || 'Device: ' + device + ', Controller: ' + controller;
  },

  startMonitoring(onConnect, onDisconnect) {
    let lastCount = 0;
    setInterval(() => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      let count = 0;
      for (const gp of gamepads) if (gp) count++;
      if (count > lastCount && onConnect) onConnect(count);
      else if (count < lastCount && onDisconnect) onDisconnect(count);
      lastCount = count;
    }, 500);
    window.addEventListener('gamepadconnected', (e) => { if (onConnect) onConnect(e.gamepad); });
    window.addEventListener('gamepaddisconnected', (e) => { if (onDisconnect) onDisconnect(e.gamepad); });
  },
};

// ============================================================
// 4. VIRTUAL ON-SCREEN GAMEPAD (COD Mobile Style)
// ============================================================
const VIRTUAL_GAMEPAD = {
  active: false,
  touchState: { moveX: 0, moveY: 0, lookX: 0, lookY: 0, shoot: false, aim: false, reload: false, switchWeapon: false, grenade: false, ability: false, jump: false, crouch: false, melee: false, sprint: false },

  create() {
    if (this.active) return;
    this.active = true;
    const container = document.createElement('div');
    container.id = 'virtualGamepad';
    container.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;height:50vh;z-index:9998;pointer-events:none;user-select:none;-webkit-user-select:none;touch-action:none;';

    // Left joystick
    const ls = document.createElement('div');
    ls.style.cssText = 'position:absolute;bottom:30px;left:30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.08);border:2px solid rgba(255,255,255,0.2);pointer-events:auto;touch-action:none;';
    const lk = document.createElement('div');
    lk.style.cssText = 'position:absolute;top:30px;left:30px;width:60px;height:60px;border-radius:50%;background:rgba(0,255,255,0.3);border:2px solid #00ffff;';
    ls.appendChild(lk);
    container.appendChild(ls);

    let lId = null, lCenter = { x: 0, y: 0 };
    ls.addEventListener('touchstart', (e) => { e.preventDefault(); const t = e.changedTouches[0]; lId = t.identifier; const r = ls.getBoundingClientRect(); lCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    ls.addEventListener('touchmove', (e) => { e.preventDefault(); for (const t of e.changedTouches) { if (t.identifier === lId) { const dx = t.clientX - lCenter.x, dy = t.clientY - lCenter.y; const d = Math.min(Math.sqrt(dx * dx + dy * dy), 45); const a = Math.atan2(dy, dx); lk.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`; this.touchState.moveX = dx / 45; this.touchState.moveY = dy / 45; } } });
    ls.addEventListener('touchend', (e) => { e.preventDefault(); lId = null; lk.style.transform = 'translate(0,0)'; this.touchState.moveX = 0; this.touchState.moveY = 0; });

    // Look area
    const la = document.createElement('div');
    la.style.cssText = 'position:absolute;bottom:0;right:0;width:60%;height:100%;pointer-events:auto;touch-action:none;';
    container.appendChild(la);
    let lookId = null, lastLook = { x: 0, y: 0 };
    la.addEventListener('touchstart', (e) => { e.preventDefault(); if (lookId === null) { const t = e.changedTouches[0]; lookId = t.identifier; lastLook = { x: t.clientX, y: t.clientY }; } });
    la.addEventListener('touchmove', (e) => { e.preventDefault(); for (const t of e.changedTouches) { if (t.identifier === lookId) { this.touchState.lookX = (t.clientX - lastLook.x) * 0.5; this.touchState.lookY = (t.clientY - lastLook.y) * 0.5; lastLook = { x: t.clientX, y: t.clientY }; } } });
    la.addEventListener('touchend', (e) => { e.preventDefault(); for (const t of e.changedTouches) { if (t.identifier === lookId) { lookId = null; this.touchState.lookX = 0; this.touchState.lookY = 0; } } });

    // Action buttons
    const btns = [
      { id: 'shoot', label: '🔥', dx: 0, dy: 0, size: 70, color: '#ff3333' },
      { id: 'aim', label: '🎯', dx: -90, dy: -20, size: 55, color: '#ffaa00' },
      { id: 'reload', label: '🔄', dx: -160, dy: 30, size: 50, color: '#00aaff' },
      { id: 'grenade', label: '💣', dx: -90, dy: 70, size: 50, color: '#ff6600' },
      { id: 'ability', label: '⚡', dx: -160, dy: 90, size: 50, color: '#9933ff' },
      { id: 'jump', label: '⬆️', dx: -50, dy: 110, size: 45, color: '#00ff00' },
      { id: 'crouch', label: '⬇️', dx: -110, dy: 130, size: 45, color: '#888888' },
      { id: 'melee', label: '🔪', dx: 30, dy: 60, size: 40, color: '#ff0066' },
      { id: 'switchWeapon', label: '🔄', dx: 30, dy: 170, size: 45, color: '#00aaff' },
      { id: 'sprint', label: '🏃', dx: 100, dy: 170, size: 45, color: '#00ff00' },
    ];
    btns.forEach(b => {
      const el = document.createElement('div');
      const rgb = this._hexRgb(b.color);
      el.style.cssText = `position:absolute;bottom:${20 + b.dy}px;right:${20 + b.dx}px;width:${b.size}px;height:${b.size}px;border-radius:50%;background:rgba(${rgb},0.3);border:2px solid ${b.color};display:flex;align-items:center;justify-content:center;font-size:${b.size > 50 ? 24 : 20}px;pointer-events:auto;touch-action:none;user-select:none;`;
      el.textContent = b.label;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); this.touchState[b.id] = true; el.style.background = b.color; el.style.transform = 'scale(0.9)'; });
      el.addEventListener('touchend', (e) => { e.preventDefault(); this.touchState[b.id] = false; el.style.background = `rgba(${rgb},0.3)`; el.style.transform = 'scale(1)'; });
      container.appendChild(el);
    });

    // Combo button
    const cb = document.createElement('div');
    cb.style.cssText = 'position:absolute;top:20px;right:20px;width:45px;height:45px;border-radius:50%;background:rgba(0,255,255,0.3);border:2px solid #00ffff;display:flex;align-items:center;justify-content:center;font-size:20px;pointer-events:auto;touch-action:none;';
    cb.textContent = '🎮';
    cb.addEventListener('touchstart', (e) => { e.preventDefault(); if (window.COMBOS_PANEL) window.COMBOS_PANEL.open(window._playerState || {}); });
    container.appendChild(cb);

    document.body.appendChild(container);
  },

  destroy() { this.active = false; document.getElementById('virtualGamepad')?.remove(); },
  getState() { return { ...this.touchState }; },
  _hexRgb(h) { return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)].join(','); },
};

// ============================================================
// 5. INITIALIZATION
// ============================================================
const CONTROLLER_INIT = {
  init() {
    const d = CONTROLLER_DETECT.detect();
    if (d.useVirtualGamepad) { VIRTUAL_GAMEPAD.create(); console.log('[OMEGA-8D] Virtual gamepad for', d.deviceType); }
    if (d.controllerType === 'waiting') this._showNoController();
    CONTROLLER_DETECT.startMonitoring(
      (gp) => {
        if (d.useVirtualGamepad) { VIRTUAL_GAMEPAD.destroy(); console.log('[OMEGA-8D] Controller connected, virtual disabled.'); }
        this._toast('Controller connected!');
      },
      () => {
        const rd = CONTROLLER_DETECT.detect();
        if (rd.useVirtualGamepad) { VIRTUAL_GAMEPAD.create(); this._toast('Controller disconnected. Touch controls enabled.'); }
      }
    );
    return d;
  },
  _showNoController() {
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:24px;border-radius:14px;text-align:center;z-index:9999;border:2px solid #ff4444;max-width:90%;';
    m.innerHTML = '<div style="font-size:20px;font-weight:700;color:#ff4444">🎮 No Controller</div><div style="color:#aaa;margin:12px 0;font-size:14px">Connect a PlayStation controller.<br>Mobile: connect via Bluetooth.</div><button onclick="this.parentElement.remove()" style="padding:10px 24px;background:#00ffff;color:#000;border:none;border-radius:8px;font-size:14px;cursor:pointer">OK</button>';
    document.body.appendChild(m);
  },
  _toast(text) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,255,255,0.9);color:#000;padding:10px 24px;border-radius:20px;z-index:9999;font-weight:700;font-size:13px;';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  },
};

if (typeof window !== 'undefined') {
  window.COMBOS_PANEL = COMBOS_PANEL;
  window.SPLIT_SCREEN = SPLIT_SCREEN;
  window.CONTROLLER_DETECT = CONTROLLER_DETECT;
  window.VIRTUAL_GAMEPAD = VIRTUAL_GAMEPAD;
  window.CONTROLLER_INIT = CONTROLLER_INIT;
}
if (typeof module !== 'undefined' && module.exports) module.exports = { COMBOS_PANEL, SPLIT_SCREEN, CONTROLLER_DETECT, VIRTUAL_GAMEPAD, CONTROLLER_INIT };