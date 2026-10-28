/**
 * OMEGA-8D GAME MODES — 8 distinct modes beyond campaign/missions
 * Each mode has full rules, win conditions, scoring, spawn logic, and 8D mechanics
 */

const GameModes = {

  // ============ MODE DEFINITIONS ============
  modes: {
    interstellar_royale: {
      id: 'interstellar_royale',
      name: 'Interstellar Battle Royale',
      icon: '🌌',
      tagline: '100 players. 8 dimensions. One survivor.',
      desc: 'Drop into a multi-dimensional arena that collapses across all 8 dimensions. Last player standing wins. Banished players must survive deep space and scavenge to warp back.',
      players: { min: 2, max: 100, solo: true, team: false },
      duration: '15-25 min',
      winCondition: 'last_alive',
      rules: [
        '100 players drop from orbital station onto 8D vector map',
        'Dimensional collapse starts at 5 min — shrinks across 8 dimensions sequentially',
        'Players banished to Deep Space must scavenge 3 resources to build warp gate',
        'Warp back costs 5 chrono coins OR scavenge parts (free)',
        'Banished players can PVP each other in deep space',
        'Zone damage: 2% HP/sec outside safe zone',
        'Banishment mechanic: Cosmic tier players can banish others (3 min cooldown)',
        'Loadout: start with knife only, find weapons in supply crates',
      ],
      scoring: { kill: 100, banish: 250, survive_wave: 50, warp_back: 75, win: 5000 },
      mapConfig: { size: 8000, dimensions: 8, collapse_rate: 100, start_delay: 300 },
      specialMechanics: ['banishment', 'dimensional_collapse', 'deep_space_scavenge', 'supply_crates'],
      tier: 'free',
    },

    void_horde: {
      id: 'void_horde',
      name: 'Void Horde',
      icon: '🕳️',
      tagline: 'Endless waves from the VOID. How long can you survive?',
      desc: 'Enemies pour in from the VOID dimension across all 8 spatial axes. No rounds — just escalating waves until you die. Team up or go solo.',
      players: { min: 1, max: 4, solo: true, team: true },
      duration: 'Endless',
      winCondition: 'survive_longest',
      rules: [
        'Waves spawn every 45 seconds, +10% difficulty each wave',
        'VOID enemies spawn from all 8 dimensions simultaneously',
        'Wave 5: Void Stalkers (invisible, thermal-only)',
        'Wave 10: Void Reapers (can banish you to deep space)',
        'Wave 15: Void Colossus (boss, requires 8D coordinated fire)',
        'Wave 20+: Reality fractures — map geometry warps',
        'Buy weapons between waves using earned scrap metal',
        'Revive teammates: 3 sec channel, 1 use per wave',
        'Doomsday event at wave 25: must reach bunker or die',
      ],
      scoring: { kill: 50, boss_kill: 5000, wave_complete: 200, revive: 100, survive_10: 2000 },
      mapConfig: { size: 3000, dimensions: 8, spawn_rate: 'wave', bunker: true },
      specialMechanics: ['void_spawns', 'boss_waves', 'reality_fracture', 'doomsday_bunker', 'weapon_shop'],
      tier: 'free',
    },

    quantum_deathmatch: {
      id: 'quantum_deathmatch',
      name: 'Quantum Deathmatch',
      icon: '⚡',
      tagline: 'Free-for-all across parallel realities.',
      desc: 'Classic deathmatch with a twist — reality shifts every 30 seconds. The map geometry, weapons, and gravity change. Adapt or die.',
      players: { min: 2, max: 16, solo: true, team: false },
      duration: '10 min',
      winCondition: 'highest_score',
      rules: [
        'Free-for-all. First to 50 kills or highest score after 10 min wins',
        'Reality Shift every 30 seconds — one of 8 effects activates:',
        '  1. Gravity flip (up becomes down)',
        '  2. Time dilation (everyone slows 50%)',
        '  3. Quantum tunnel (walls become passable)',
        '  4. Mirror world (controls reversed)',
        '  5. Echo zone (every action repeats 2 sec later)',
        '  6. Void pocket (random zone becomes instant death)',
        '  7. Cosmic boost (gravity ×0.5, speed ×2)',
        '  8. Adanaxis shift (4D axis rotates)',
        'Spawn with full loadout (primary + secondary + ability)',
        'No banishment — kills are instant respawns',
        'Power weapons spawn at center every 2 min',
      ],
      scoring: { kill: 100, headshot: 150, reality_kill: 200, multikill: 300, win: 3000 },
      mapConfig: { size: 2000, dimensions: 8, reality_shift_interval: 30 },
      specialMechanics: ['reality_shift', 'power_weapons', 'instant_respawn', '8_effects'],
      tier: 'free',
    },

    banishment_arena: {
      id: 'banishment_arena',
      name: 'Banishment Arena',
      icon: '🚀',
      tagline: 'Trapped in deep space. Build a warp gate. Escape first.',
      desc: 'All players start banished in a procedural deep-space instance. Scavenge parts, fight other banished players, and build a warp gate to escape. First to warp back wins.',
      players: { min: 2, max: 12, solo: true, team: false },
      duration: '10-15 min',
      winCondition: 'first_to_escape',
      rules: [
        'All players spawn in procedural Deep Space with nothing',
        'Scavenge 5 warp gate parts scattered across the instance',
        'Parts: Power Core, Quantum Stabilizer, Void Coupling, Nav Chip, Shield Matrix',
        'PVP enabled — steal parts from killed players',
        'Asteroid fields provide cover but drift (move over time)',
        'Solar flares every 2 min — must hide behind asteroids',
        'Warp gate takes 30 sec to construct (stand near it)',
        'Construction can be interrupted by attacks',
        'First player to activate warp gate wins',
        'If no one escapes in 15 min, VOID entities consume all',
      ],
      scoring: { part_collected: 100, kill: 150, steal_part: 200, escape: 5000, survive_flare: 50 },
      mapConfig: { size: 5000, dimensions: 8, procedural: true, asteroid_drift: true },
      specialMechanics: ['deep_space_spawn', 'warp_gate_construction', 'asteroid_drift', 'solar_flares', 'pvp_scavenge'],
      tier: 'free',
    },

    temporal_siege: {
      id: 'temporal_siege',
      name: 'Temporal Siege',
      icon: '⏳',
      tagline: 'Attack and defend across 12,000 years of history.',
      desc: 'One team attacks a fortress, the other defends. Every 2 minutes the era shifts — weapons, fortifications, and terrain change. Adapt your tactics across 12 eras.',
      players: { min: 2, max: 12, solo: false, team: true },
      duration: '24 min',
      winCondition: 'capture_fortress',
      rules: [
        '6v6. Attackers vs Defenders',
        'Capture 3 control points inside the fortress to win',
        'Era shifts every 2 minutes through 12 eras:',
        '  Stone Age → Bronze → Iron → Medieval → Renaissance → Industrial →',
        '  WW1 → WW2 → Modern → Near Future → Deep Future → 30th Century',
        'Each era changes: weapons, fortification materials, terrain, vehicles',
        'Defenders get era-appropriate fortifications (walls, towers, traps)',
        'Attackers get era-appropriate siege weapons (battering ram → orbital strike)',
        'Control points captured by standing in zone for 10 sec',
        'If attackers capture all 3 points: attackers win',
        'If defenders hold all 3 after 24 min: defenders win',
      ],
      scoring: { capture: 500, defend_kill: 100, era_adapt_bonus: 200, win: 4000 },
      mapConfig: { size: 4000, dimensions: 4, era_shift_interval: 120, control_points: 3 },
      specialMechanics: ['era_shift', 'fortification_changes', 'siege_weapons', 'control_points', '12_eras'],
      tier: 'free',
    },

    protocol_war: {
      id: 'protocol_war',
      name: 'Sovereign Protocol War',
      icon: '🌍',
      tagline: 'Country vs country. Real nations. Real protocols.',
      desc: 'Two teams represent real countries. Each side gets their national protocol abilities, environmental hazards, and military assets. Capture the enemy capital to win.',
      players: { min: 2, max: 20, solo: false, team: true },
      duration: '20-30 min',
      winCondition: 'capture_capital',
      rules: [
        '10v10. Each team picks a real country (from 86 available)',
        'Each country has unique Protocol abilities:',
        '  Nigeria (AJAGUN): Hacker protocol — disable enemy comms',
        '  USA (EAGLE): Air superiority — call drone strikes',
        '  Russia (BEAR): Winter warfare — freeze enemy movement',
        '  China (DRAGON): Cyber warfare — take over enemy turrets',
        '  Israel (IRON DOME): Defense — auto-intercept incoming',
        '  UK (LION): Naval bombardment from offshore',
        '  + 80 more countries with unique protocols',
        'Map is the real-world geography between the two countries',
        'Capture 5 territories to reach the capital',
        'Each territory gives resources (troops, vehicles, airstrikes)',
        'Capital capture: hold the capital building for 60 sec',
        'Permanent legacy: captured territory stays damaged for all future matches',
      ],
      scoring: { territory_capture: 1000, protocol_kill: 300, capital_hold: 500, win: 8000 },
      mapConfig: { size: 10000, dimensions: 4, real_geography: true, territories: 5 },
      specialMechanics: ['national_protocols', 'real_geography', 'territory_capture', 'permanent_legacy', '86_countries'],
      tier: 'free',
    },

    cosmic_arms_race: {
      id: 'cosmic_arms_race',
      name: 'Cosmic Arms Race',
      icon: '✨',
      tagline: 'Collect 8 dimensional cores. Control all 8 dimensions.',
      desc: 'Race to collect 8 cores scattered across 8 dimensional layers. Each core unlocks a new dimension to fight in. First team to control all 8 dimensions wins.',
      players: { min: 2, max: 8, solo: false, team: true },
      duration: '15-20 min',
      winCondition: 'control_all_dimensions',
      rules: [
        '2v2 to 4v4. Teams race to collect dimensional cores',
        '8 cores, one per dimension:',
        '  1. Spatial Core (3D) — standard combat',
        '  2. Adanaxis Core (4D) — non-Euclidean movement',
        '  3. Time Core (5D) — rewind/forward 3 sec',
        '  4. Quantum Core (6D) — superposition (be in 2 places)',
        '  5. Void Core (7D) — phase through matter',
        '  6. Cosmic Core (8D) — reality bending',
        '  7. Abyss Core (deep void) — instant kill zone',
        '  8. Genesis Core (creation) — spawn any weapon',
        'Cores are guarded by dimension-specific bosses',
        'Killing the boss drops the core — carry it to your base',
        'Carrier moves 50% slower, drops core on death',
        'Steal cores from enemy base (hack their vault)',
        'Control a dimension = have the core installed at your base',
        'First team to control all 8 wins',
      ],
      scoring: { boss_kill: 1000, core_carry: 500, core_install: 2000, steal: 1500, win: 10000 },
      mapConfig: { size: 6000, dimensions: 8, core_bosses: 8, vaults: 2 },
      specialMechanics: ['dimensional_cores', 'boss_guards', 'core_carrier', 'vault_hack', '8_dimensions_unlock'],
      tier: 'silver',
    },

    pocket_heist: {
      id: 'pocket_heist',
      name: 'Pocket Dimension Heist',
      icon: '💎',
      tagline: 'Steal the artifact. The dimension collapses behind you.',
      desc: 'Two teams race into a procedurally generated pocket dimension to steal an artifact. The dimension collapses behind you — no going back the way you came. First team to extract wins.',
      players: { min: 2, max: 8, solo: false, team: true },
      duration: '10-15 min',
      winCondition: 'extract_artifact',
      rules: [
        '2v2 to 4v4. Both teams enter from opposite sides of pocket dimension',
        'Map is 100% procedural — different every match',
        'Artifact is at the center of the dimension',
        'Dimension collapses from edges inward every 60 sec',
        'Collapsed zones = instant death (VOID)',
        'No backtracking — corridors seal behind you',
        'Traps: quantum tripwires, gravity wells, time loops',
        'Grab artifact → extraction point appears at random edge',
        'Carrier can use weapon but moves 30% slower',
        'Drop artifact on death — either team can pick it up',
        'Extract at extraction point (3 sec channel)',
        'If dimension fully collapses: team closest to center wins',
      ],
      scoring: { artifact_grab: 1000, trap_kill: 200, extract: 5000, collapse_survive: 500, win: 6000 },
      mapConfig: { size: 4000, dimensions: 8, procedural: true, collapse_interval: 60 },
      specialMechanics: ['procedural_map', 'dimensional_collapse', 'no_backtrack', 'artifact_carrier', 'extraction_point', 'traps'],
      tier: 'free',
    },
  },

  // ============ MODE SELECTION UI ============
  selectedMode: null,
  modeConfig: null,

  buildModeSelector() {
    const overlay = document.createElement('div');
    overlay.id = 'mode-selector';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:8000;display:flex;align-items:center;justify-content:center;overflow-y:auto;padding:20px';

    let modeCards = '';
    Object.values(this.modes).forEach((mode, i) => {
      const tierBadge = mode.tier === 'free' ? '🟢 FREE' : mode.tier === 'silver' ? '🥈 SILVER+' : '👑 PREMIUM';
      modeCards += `
        <div onclick="GameModes.selectMode('${mode.id}')" style="
          background:linear-gradient(135deg,#13132a,#0d0d1a);
          border:1px solid #2a2a4a;border-radius:14px;padding:20px;cursor:pointer;
          transition:all .2s;width:280px;margin:10px;display:inline-block;vertical-align:top;
        " onmouseover="this.style.borderColor='#00d4ff44';this.style.transform='translateY(-4px)'"
          onmouseout="this.style.borderColor='#2a2a4a';this.style.transform='none'">
          <div style="font-size:48px;margin-bottom:8px">${mode.icon}</div>
          <div style="font-size:18px;font-weight:900;color:#00d4ff;margin-bottom:4px">${mode.name}</div>
          <div style="font-size:12px;color:#7b2ff7;margin-bottom:8px;font-style:italic">${mode.tagline}</div>
          <div style="font-size:12px;color:#999;margin-bottom:12px;line-height:1.5">${mode.desc.substring(0, 120)}...</div>
          <div style="display:flex;justify-content:space-between;font-size:11px">
            <span style="color:#666">👥 ${mode.players.min}-${mode.players.max}</span>
            <span style="color:#666">⏱️ ${mode.duration}</span>
            <span style="color:#2ed573">${tierBadge}</span>
          </div>
        </div>`;
    });

    overlay.innerHTML = `
      <div style="max-width:960px;width:100%">
        <div style="text-align:center;margin-bottom:24px">
          <div style="font-size:32px;font-weight:900;background:linear-gradient(90deg,#00d4ff,#7b2ff7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:3px">OMEGA-8D GAME MODES</div>
          <div style="font-size:13px;color:#666;margin-top:4px">8 ways to fight across 8 dimensions</div>
        </div>
        <div style="text-align:center">${modeCards}</div>
        <div style="text-align:center;margin-top:20px">
          <button onclick="GameModes.closeSelector()" style="background:#2a2a4a;color:#e0e0e0;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:13px">Back to Game</button>
        </div>
        <div id="mode-detail" style="display:none;margin-top:20px"></div>
      </div>`;

    document.body.appendChild(overlay);
  },

  selectMode(modeId) {
    const mode = this.modes[modeId];
    this.selectedMode = modeId;
    this.modeConfig = mode;

    const detail = document.getElementById('mode-detail');
    detail.style.display = 'block';
    detail.innerHTML = `
      <div style="background:#0d0d1a;border:1px solid #00d4ff44;border-radius:14px;padding:24px;text-align:left">
        <div style="font-size:24px;font-weight:900;color:#00d4ff;margin-bottom:4px">${mode.icon} ${mode.name}</div>
        <div style="font-size:13px;color:#999;margin-bottom:16px">${mode.desc}</div>

        <div style="font-size:13px;color:#00d4ff;font-weight:700;margin-bottom:8px">📋 RULES</div>
        <div style="font-size:12px;color:#aaa;line-height:1.8;margin-bottom:16px">
          ${mode.rules.map(r => `<div style="${r.startsWith('  ') ? 'padding-left:20px;color:#7b2ff7' : ''}">${r}</div>`).join('')}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">
          <div style="background:#13132a;padding:10px;border-radius:8px;text-align:center">
            <div style="font-size:11px;color:#666">PLAYERS</div>
            <div style="font-size:14px;color:#e0e0e0;font-weight:700">${mode.players.min}-${mode.players.max} ${mode.players.team ? '(teams)' : '(solo)'}</div>
          </div>
          <div style="background:#13132a;padding:10px;border-radius:8px;text-align:center">
            <div style="font-size:11px;color:#666">DURATION</div>
            <div style="font-size:14px;color:#e0e0e0;font-weight:700">${mode.duration}</div>
          </div>
          <div style="background:#13132a;padding:10px;border-radius:8px;text-align:center">
            <div style="font-size:11px;color:#666">WIN CONDITION</div>
            <div style="font-size:14px;color:#2ed573;font-weight:700">${mode.winCondition.replace(/_/g, ' ')}</div>
          </div>
        </div>

        <div style="font-size:13px;color:#7b2ff7;font-weight:700;margin-bottom:8px">⚙️ SPECIAL MECHANICS</div>
        <div style="font-size:12px;color:#999;margin-bottom:16px">${mode.specialMechanics.map(m => `<span style="display:inline-block;background:#1a1a2e;padding:4px 10px;border-radius:6px;margin:2px;font-size:11px">${m.replace(/_/g, ' ')}</span>`).join('')}</div>

        <div style="font-size:13px;color:#00d4ff;font-weight:700;margin-bottom:8px">🏆 SCORING</div>
        <div style="font-size:12px;color:#aaa;margin-bottom:16px">
          ${Object.entries(mode.scoring).map(([k, v]) => `<div style="display:inline-block;margin-right:16px">${k.replace(/_/g, ' ')}: <span style="color:#2ed573;font-weight:700">+${v}</span></div>`).join('')}
        </div>

        <div style="display:flex;gap:10px">
          <button onclick="GameModes.launchMode()" style="flex:1;background:linear-gradient(135deg,#00d4ff,#7b2ff7);color:#0a0a0f;border:none;padding:14px;border-radius:8px;font-weight:700;font-size:15px;cursor:pointer">▶ PLAY ${mode.name.toUpperCase()}</button>
          <button onclick="document.getElementById('mode-detail').style.display='none'" style="background:#2a2a4a;color:#e0e0e0;border:none;padding:14px 20px;border-radius:8px;cursor:pointer">Back</button>
        </div>
      </div>`;
    detail.scrollIntoView({ behavior: 'smooth' });
  },

  closeSelector() {
    const el = document.getElementById('mode-selector');
    if (el) el.remove();
  },

  // ============ MODE LAUNCH ============
  async launchMode() {
    const mode = this.modes[this.selectedMode];
    if (!mode) return;

    // Check tier access
    if (mode.tier !== 'free') {
      const pid = OMEGA?.player?.playerId || '';
      if (pid) {
        const profile = await OMEGA?.map?.getPlayer(pid);
        const tier = profile?.success ? profile.player?.careerTier : 'free';
        const tierOrder = ['free', 'bronze', 'silver', 'gold', 'platinum', 'supreme'];
        const tierIdx = tierOrder.indexOf(tier || 'free');
        const requiredIdx = tierOrder.indexOf(mode.tier);
        if (tierIdx < requiredIdx) {
          alert(`${mode.name} requires ${mode.tier} tier or higher. Your tier: ${tier || 'free'}. Upgrade to unlock!`);
          return;
        }
      }
    }

    // Initialize match
    const matchState = {
      modeId: mode.id,
      modeName: mode.name,
      players: [],
      scores: {},
      wave: 0,
      timeRemaining: 0,
      dimensionsActive: 1,
      status: 'initializing',
      config: mode,
    };

    // Create match record in backend
    if (typeof OMEGA !== 'undefined' && OMEGA.player.playerId) {
      const match = await OMEGA.map.createMatch(
        mode.id + '_zone',
        mode.players.team ? 2 : mode.players.max,
        mode.winCondition
      );
      if (match.success) matchState.matchId = match.match?.id || match.match?.matchId;
    }

    // Store match state
    this.activeMatch = matchState;
    sessionStorage.setItem('omega8d_active_mode', JSON.stringify(matchState));

    // Close selector
    this.closeSelector();

    // Show pre-match lobby
    this.showLobby(mode, matchState);
  },

  showLobby(mode, matchState) {
    const lobby = document.createElement('div');
    lobby.id = 'mode-lobby';
    lobby.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:8000;display:flex;align-items:center;justify-content:center';

    lobby.innerHTML = `
      <div style="background:#0d0d1a;border:1px solid #00d4ff44;border-radius:14px;padding:32px;max-width:500px;width:90%;text-align:center">
        <div style="font-size:48px">${mode.icon}</div>
        <div style="font-size:24px;font-weight:900;color:#00d4ff;margin:8px 0">${mode.name}</div>
        <div style="font-size:13px;color:#999;margin-bottom:20px">${mode.tagline}</div>

        <div style="background:#13132a;border-radius:10px;padding:16px;margin-bottom:20px;text-align:left">
          <div style="font-size:13px;color:#00d4ff;font-weight:700;margin-bottom:8px">MATCH CONFIG</div>
          <div style="font-size:12px;color:#aaa;line-height:1.8">
            <div>Players: ${mode.players.min}-${mode.players.max} ${mode.players.team ? '(teams)' : '(solo)'}</div>
            <div>Duration: ${mode.duration}</div>
            <div>Win: ${mode.winCondition.replace(/_/g, ' ')}</div>
            <div>Map size: ${mode.mapConfig.size} units</div>
            <div>Dimensions: ${mode.mapConfig.dimensions}</div>
            <div>Match ID: ${matchState.matchId || 'LOCAL-' + Date.now()}</div>
          </div>
        </div>

        <div style="background:#13132a;border-radius:10px;padding:16px;margin-bottom:20px;text-align:left">
          <div style="font-size:13px;color:#7b2ff7;font-weight:700;margin-bottom:8px">LOADOUT</div>
          <div style="font-size:12px;color:#666">Select your weapons in the main game before starting</div>
        </div>

        <div style="display:flex;gap:10px">
          <button onclick="GameModes.startMatch()" style="flex:1;background:linear-gradient(135deg,#2ed573,#1dd1a1);color:#0a0a0f;border:none;padding:14px;border-radius:8px;font-weight:700;font-size:15px;cursor:pointer">▶ START MATCH</button>
          <button onclick="GameModes.cancelLobby()" style="background:#2a2a4a;color:#e0e0e0;border:none;padding:14px 20px;border-radius:8px;cursor:pointer">Cancel</button>
        </div>
      </div>`;

    document.body.appendChild(lobby);
  },

  cancelLobby() {
    document.getElementById('mode-lobby')?.remove();
    this.buildModeSelector();
  },

  startMatch() {
    document.getElementById('mode-lobby')?.remove();
    const matchState = this.activeMatch;
    if (!matchState) return;

    matchState.status = 'active';
    matchState.startTime = Date.now();
    matchState.scores = {};
    matchState.wave = 0;

    // Show match HUD
    this.showMatchHUD(matchState);

    // Trigger game start event
    window.dispatchEvent(new CustomEvent('omega8dMatchStart', { detail: matchState }));

    // Start match loop
    this.matchLoop(matchState);
  },

  showMatchHUD(matchState) {
    // Remove existing HUD
    document.getElementById('match-hud')?.remove();

    const mode = matchState.config;
    const hud = document.createElement('div');
    hud.id = 'match-hud';
    hud.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:7000;background:rgba(13,13,26,.9);border:1px solid #00d4ff44;border-radius:10px;padding:8px 20px;display:flex;gap:20px;align-items:center;font-size:13px;color:#e0e0e0';

    let modeLabel = mode.name;
    if (mode.id === 'void_horde') modeLabel = `🕳️ Wave: <span id="hud-wave">${matchState.wave}</span>`;
    else if (mode.id === 'quantum_deathmatch') modeLabel = `⚡ Kills: <span id="hud-kills">0</span> / 50`;
    else if (mode.id === 'interstellar_royale') modeLabel = `🌌 Alive: <span id="hud-alive">100</span>`;
    else if (mode.id === 'banishment_arena') modeLabel = `🚀 Parts: <span id="hud-parts">0</span> / 5`;
    else if (mode.id === 'temporal_siege') modeLabel = `⏳ Era: <span id="hud-era">Stone Age</span> | Points: <span id="hud-points">0</span>/3`;
    else if (mode.id === 'protocol_war') modeLabel = `🌍 Territories: <span id="hud-terr">0</span>/5`;
    else if (mode.id === 'cosmic_arms_race') modeLabel = `✨ Cores: <span id="hud-cores">0</span>/8`;
    else if (mode.id === 'pocket_heist') modeLabel = `💎 Artifact: <span id="hud-art">not found</span>`;

    hud.innerHTML = `
      <div style="color:#00d4ff;font-weight:700">${modeLabel}</div>
      <div style="color:#666">|</div>
      <div>⏱️ <span id="hud-time">0:00</span></div>
      <div style="color:#666">|</div>
      <div>🏆 Score: <span id="hud-score">0</span></div>
      <button onclick="GameModes.endMatch()" style="background:#ff475722;border:1px solid #ff475744;color:#ff4757;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px">End</button>
    `;

    document.body.appendChild(hud);
  },

  matchLoop(state) {
    if (state.status !== 'active') return;

    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;
    const timeEl = document.getElementById('hud-time');
    if (timeEl) timeEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;

    const mode = state.config;

    // Mode-specific logic
    switch (mode.id) {
      case 'void_horde':
        // Wave every 45 sec
        if (elapsed > 0 && elapsed % 45 === 0 && elapsed !== state.lastWaveTime) {
          state.wave++;
          state.lastWaveTime = elapsed;
          const waveEl = document.getElementById('hud-wave');
          if (waveEl) waveEl.textContent = state.wave;
          this.showNotification(`Wave ${state.wave} incoming!`, '⚠️');

          // Boss waves
          if (state.wave === 5) this.showNotification('Void Stalkers detected! Thermal vision required!', '🔥');
          if (state.wave === 10) this.showNotification('Void Reapers! They can banish you!', '💀');
          if (state.wave === 15) this.showNotification('VOID COLOSSUS AWAKENS! 8D coordinated fire needed!', '👹');
          if (state.wave === 25) this.showNotification('DOOMSDAY! Reach the bunker NOW!', '☢️');

          // Update AI behavior
          if (typeof OMEGA !== 'undefined' && OMEGA.player.playerId) {
            OMEGA.ai.updateBehavior({ wave: state.wave, playstyle: 'survival' });
          }
        }
        break;

      case 'quantum_deathmatch':
        // Reality shift every 30 sec
        if (elapsed > 0 && elapsed % 30 === 0 && elapsed !== state.lastShiftTime) {
          state.lastShiftTime = elapsed;
          const effects = [
            'Gravity Flip! Up is now down!',
            'Time Dilation! Everyone slows!',
            'Quantum Tunnel! Walls are passable!',
            'Mirror World! Controls reversed!',
            'Echo Zone! Actions repeat 2 sec later!',
            'Void Pocket! Random zone = death!',
            'Cosmic Boost! Low gravity, high speed!',
            'Adanaxis Shift! 4D axis rotating!',
          ];
          const effect = effects[Math.floor(Math.random() * effects.length)];
          this.showNotification(effect, '⚡');
          window.dispatchEvent(new CustomEvent('omega8dRealityShift', { detail: { effect: state.lastShiftTime % 8 } }));
        }
        break;

      case 'interstellar_royale':
        // Dimensional collapse starts at 5 min
        if (elapsed >= 300 && !state.collapseStarted) {
          state.collapseStarted = true;
          this.showNotification('Dimensional collapse begins! Safe zone shrinking!', '🌌');
        }
        if (state.collapseStarted && elapsed > 0 && elapsed % 60 === 0) {
          state.dimensionsActive = Math.min(8, Math.floor((elapsed - 300) / 60) + 1);
          this.showNotification(`Dimension ${state.dimensionsActive} collapsing!`, '⚠️');
        }
        break;

      case 'temporal_siege':
        // Era shift every 2 min
        if (elapsed > 0 && elapsed % 120 === 0 && elapsed !== state.lastEraTime) {
          state.lastEraTime = elapsed;
          const eras = ['Stone Age', 'Bronze Age', 'Iron Age', 'Medieval', 'Renaissance', 'Industrial', 'WW1', 'WW2', 'Modern', 'Near Future', 'Deep Future', '30th Century'];
          const eraIdx = Math.min(11, Math.floor(elapsed / 120));
          const eraEl = document.getElementById('hud-era');
          if (eraEl) eraEl.textContent = eras[eraIdx];
          this.showNotification(`Era shift: ${eras[eraIdx]}! Weapons and fortifications changed!`, '⏳');
        }
        break;

      case 'cosmic_arms_race':
        // Update cores display
        const coresEl = document.getElementById('hud-cores');
        if (coresEl) coresEl.textContent = state.dimensionsActive - 1;
        break;

      case 'banishment_arena':
        // Solar flare every 2 min
        if (elapsed > 0 && elapsed % 120 === 0 && elapsed !== state.lastFlareTime) {
          state.lastFlareTime = elapsed;
          this.showNotification('Solar flare! Hide behind asteroids!', '☀️');
        }
        break;

      case 'pocket_heist':
        // Dimensional collapse every 60 sec
        if (elapsed > 0 && elapsed % 60 === 0 && elapsed !== state.lastCollapseTime) {
          state.lastCollapseTime = elapsed;
          this.showNotification('Dimension collapsing! Outer zones = death!', '⬇️');
        }
        break;
    }

    // Continue loop
    state.loopHandle = requestAnimationFrame(() => this.matchLoop(state));
  },

  showNotification(text, icon = '📢') {
    let notif = document.getElementById('mode-notification');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'mode-notification';
      notif.style.cssText = 'position:fixed;top:120px;left:50%;transform:translateX(-50%);z-index:7500;background:rgba(13,13,26,.95);border:1px solid #00d4ff44;border-radius:10px;padding:14px 28px;color:#00d4ff;font-size:15px;font-weight:700;transition:all .3s;opacity:0;pointer-events:none';
      document.body.appendChild(notif);
    }
    notif.innerHTML = `${icon} ${text}`;
    notif.style.opacity = '1';
    notif.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(notif.timeout);
    notif.timeout = setTimeout(() => {
      notif.style.opacity = '0';
      notif.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 3000);
  },

  endMatch() {
    if (!this.activeMatch) return;
    this.activeMatch.status = 'ended';

    if (this.activeMatch.loopHandle) cancelAnimationFrame(this.activeMatch.loopHandle);

    // Show results
    const mode = this.activeMatch.config;
    const elapsed = Math.floor((Date.now() - this.activeMatch.startTime) / 1000);
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;

    const results = document.createElement('div');
    results.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:8000;display:flex;align-items:center;justify-content:center';
    results.innerHTML = `
      <div style="background:#0d0d1a;border:1px solid #00d4ff44;border-radius:14px;padding:32px;max-width:400px;text-align:center">
        <div style="font-size:48px">${mode.icon}</div>
        <div style="font-size:20px;font-weight:900;color:#00d4ff;margin:8px 0">Match Ended</div>
        <div style="font-size:13px;color:#999;margin-bottom:16px">${mode.name} • ${min}:${sec.toString().padStart(2, '0')}</div>

        <div style="background:#13132a;border-radius:10px;padding:16px;margin-bottom:20px">
          <div style="font-size:13px;color:#00d4ff;font-weight:700;margin-bottom:8px">RESULTS</div>
          <div style="font-size:12px;color:#aaa;line-height:1.8">
            <div>Mode: ${mode.name}</div>
            <div>Duration: ${min}m ${sec}s</div>
            ${this.activeMatch.wave ? `<div>Waves survived: ${this.activeMatch.wave}</div>` : ''}
            <div>Status: ${this.activeMatch.status}</div>
          </div>
        </div>

        <div style="display:flex;gap:10px">
          <button onclick="this.parentElement.parentElement.parentElement.remove();GameModes.buildModeSelector()" style="flex:1;background:linear-gradient(135deg,#00d4ff,#7b2ff7);color:#0a0a0f;border:none;padding:12px;border-radius:8px;font-weight:700;cursor:pointer">Play Again</button>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:#2a2a4a;color:#e0e0e0;border:none;padding:12px 20px;border-radius:8px;cursor:pointer">Close</button>
        </div>
      </div>`;

    document.body.appendChild(results);

    // Remove HUD
    document.getElementById('match-hud')?.remove();
    document.getElementById('mode-notification')?.remove();

    // Update AI behavior stats
    if (typeof OMEGA !== 'undefined' && OMEGA.player.playerId) {
      OMEGA.ai.updateBehavior({
        aiKills: this.activeMatch.kills || 0,
        aiDeaths: this.activeMatch.deaths || 0,
      });
    }

    // Clear active match
    sessionStorage.removeItem('omega8d_active_mode');
    this.activeMatch = null;
  },

  // ============ INITIALIZATION ============
  init() {
    // Add mode selector button
    const btn = document.createElement('button');
    btn.id = 'mode-selector-btn';
    btn.textContent = '🎮 Game Modes';
    btn.style.cssText = 'position:fixed;top:16px;right:200px;z-index:5000;background:linear-gradient(135deg,#2ed573,#1dd1a1);color:#0a0a0f;border:none;padding:10px 14px;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer';
    btn.onclick = () => this.buildModeSelector();
    document.body.appendChild(btn);

    console.log('OMEGA-8D Game Modes initialized — 8 modes ready');
  },
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GameModes.init());
} else {
  GameModes.init();
}

if (typeof window !== 'undefined') window.GameModes = GameModes;