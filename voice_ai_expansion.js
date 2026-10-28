/**
 * OMEGA-8D FULL VOICE EXPANSION + AI AUTO-PLAY MODE
 * 1. EVERY game action voice-controllable (200+ commands)
 * 2. AI Auto-Play Mode — $300/year, AI plays for you including cheats
 */

// ============================================================
// 1. COMPLETE VOICE COMMAND EXPANSION
// ============================================================
const FULL_VOICE = {
  // Merge with existing VOICE_COMMANDS and add ALL missing commands
  // Organized by every system in the game

  expandedCommands: {
    // === WEAPONS — EVERY WEAPON TYPE ===
    'equip plasma rifle': { action: 'equip_plasma_rifle', desc: 'Equip plasma assault rifle' },
    'equip railgun': { action: 'equip_railgun', desc: 'Equip electromagnetic railgun' },
    'equip particle beam': { action: 'equip_particle_beam', desc: 'Equip particle beam sniper' },
    'equip void cannon': { action: 'equip_void_cannon', desc: 'Equip void cannon' },
    'equip molecular carbine': { action: 'equip_molecular_carbine', desc: 'Equip molecular carbine' },
    'equip molecular flamethrower': { action: 'equip_flamethrower', desc: 'Equip plasma flamethrower' },
    'equip dark matter rifle': { action: 'equip_dark_matter', desc: 'Equip dark matter rifle' },
    'equip singularity cannon': { action: 'equip_singularity', desc: 'Equip singularity cannon' },
    'equip tachyon rifle': { action: 'equip_tachyon', desc: 'Equip tachyon rifle' },
    'equip gauss rifle': { action: 'equip_gauss', desc: 'Equip probability-collapse gauss rifle' },
    'equip phase dmr': { action: 'equip_phase_dmr', desc: 'Equip phase-shifting DMR' },
    'equip zero point grenade': { action: 'equip_zp_grenade', desc: 'Equip zero-point gravity grenade' },
    'equip gravity grenade': { action: 'equip_grav_nade', desc: 'Equip gravity sinkhole grenade' },
    'equip emp': { action: 'equip_emp', desc: 'Equip EMP grenade' },
    'equip neural dart': { action: 'equip_neural_dart', desc: 'Equip neural parasite dart' },
    'equip bow': { action: 'equip_bow', desc: 'Equip tactical bow' },
    'equip crossbow': { action: 'equip_crossbow', desc: 'Equip scoped crossbow' },
    'equip spear': { action: 'equip_spear', desc: 'Equip energy spear' },
    'equip axe': { action: 'equip_axe', desc: 'Equip battle axe' },
    'equip sword': { action: 'equip_sword', desc: 'Equip energy sword' },
    'equip mines': { action: 'equip_mines', desc: 'Equip proximity mines' },
    'equip c4': { action: 'equip_c4', desc: 'Equip C4 charges' },
    'equip claymores': { action: 'equip_claymores', desc: 'Equip claymore mines' },

    // === SURVIVAL TRAITS — ALL 17 ===
    'wolverine skull': { action: 'trait_wolverine', desc: 'Activate Wolverine Skull healing' },
    'adamantium shell': { action: 'trait_adamantium', desc: 'Activate Adamantium Shell armor' },
    'regen field': { action: 'trait_regen_field', desc: 'Deploy regeneration field organ' },
    'nanite shield': { action: 'trait_nanite', desc: 'Activate nanite swarm shield' },
    'quantum exo': { action: 'trait_quantum_exo', desc: 'Activate quantum-hardened exoskeleton' },
    'probability collapse': { action: 'trait_prob_collapse', desc: 'Activate probability collapse immunity' },
    'cosmic immortality': { action: 'trait_cosmic', desc: 'Activate cosmic immortality' },
    'galaxy shield': { action: 'trait_galaxy', desc: 'Activate galaxy shield' },
    'void phase': { action: 'trait_void_phase', desc: 'Phase into void dimension' },
    'dimensional blink': { action: 'trait_blink', desc: 'Activate dimensional blink survival' },
    'doomsday walker': { action: 'title_doomsday_walker', desc: 'Equip Doomsday Walker title' },
    'the undying': { action: 'title_undying', desc: 'Equip The Undying title' },
    'void walker': { action: 'title_void_walker', desc: 'Equip Void Walker title' },

    // === QUANTUM FORTIFICATIONS ===
    'pocket dimension': { action: 'deploy_pocket_dim', desc: 'Deploy pocket-dimension safehouse anchor' },
    'safehouse': { action: 'deploy_pocket_dim', desc: 'Deploy pocket-dimension safehouse' },
    'hard light': { action: 'deploy_hard_light', desc: 'Deploy molecular hard-light barrier' },
    'hard light wall': { action: 'deploy_hard_light_wall', desc: 'Deploy hard-light wall' },
    'hard light dome': { action: 'deploy_hard_light_dome', desc: 'Deploy hard-light dome' },
    'quantum anchor': { action: 'deploy_quantum_anchor', desc: 'Deploy quantum squad anchor' },
    'dimensional fortress': { action: 'deploy_dim_fortress', desc: 'Deploy dimensional fortress' },
    'void mine': { action: 'deploy_void_mine', desc: 'Deploy void mine in 4D space' },
    'reality seam': { action: 'deploy_reality_seam', desc: 'Create reality seam for bullet redirect' },

    // === COGNITIVE WARFARE ===
    'panic field': { action: 'cog_panic', desc: 'Deploy panic field emitter' },
    'hallucination field': { action: 'cog_hallucination', desc: 'Deploy hallucination field emitter' },
    'tunnel vision field': { action: 'cog_tunnel', desc: 'Deploy tunnel vision field emitter' },
    'sensory overload': { action: 'cog_overload', desc: 'Deploy sensory overload field emitter' },
    'paranoia field': { action: 'cog_paranoia', desc: 'Deploy paranoia field emitter' },

    // === UUV — ALL TYPES ===
    'deploy cable cutter': { action: 'uuv_cable_cutter', desc: 'Deploy fiber-optic cable cutter UUV' },
    'deploy recon uuv': { action: 'uuv_recon', desc: 'Deploy reconnaissance UUV' },
    'deploy mine uuv': { action: 'uuv_mine', desc: 'Deploy mine-laying UUV' },
    'deploy attack uuv': { action: 'uuv_attack', desc: 'Deploy attack UUV (torpedo)' },
    'deploy frogman': { action: 'uuv_frogman', desc: 'Deploy frogman insertion UUV' },
    'deploy frogmen': { action: 'uuv_frogman', desc: 'Deploy frogman insertion UUV' },

    // === SUBMARINE — ALL CLASSES ===
    'nuclear attack sub': { action: 'sub_ssn', desc: 'Deploy nuclear attack submarine (SSN)' },
    'nuclear ballistic sub': { action: 'sub_ssbn', desc: 'Deploy nuclear ballistic submarine (SSBN)' },
    'diesel sub': { action: 'sub_ssk', desc: 'Deploy diesel-electric submarine (SSK)' },
    'dive deep': { action: 'sub_dive', desc: 'Order submarine to dive to max depth' },
    'periscope depth': { action: 'sub_periscope', desc: 'Order submarine to periscope depth' },
    'surface': { action: 'sub_surface', desc: 'Order submarine to surface' },
    'silent mode': { action: 'sub_silent', desc: 'Switch to silent running on battery' },
    'towed array': { action: 'sub_towed_array', desc: 'Deploy towed sonar array' },

    // === OCEANIC MAPS ===
    'mariana trench': { action: 'map_mariana', desc: 'Deploy to Mariana Trench theater' },
    'atlantic ridge': { action: 'map_atlantic', desc: 'Deploy to Mid-Atlantic Ridge theater' },
    'arctic ice': { action: 'map_arctic', desc: 'Deploy to Arctic Sub-Ice theater' },
    'coastal shelf': { action: 'map_coastal', desc: 'Deploy to Continental Shelf theater' },
    'cut cable': { action: 'cut_cable', desc: 'Sever undersea fiber-optic cable' },
    'sever cable': { action: 'cut_cable', desc: 'Sever undersea cable' },

    // === ORBITAL / KINETIC ===
    'haho jump': { action: 'haho_jump', desc: 'Execute HAHO stratospheric insertion jump' },
    'stratospheric drop': { action: 'haho_jump', desc: 'Execute HAHO stratospheric insertion' },
    'thor single': { action: 'thor_single', desc: 'Single Thor rod strike' },
    'thor pair': { action: 'thor_pair', desc: 'Rod pair strike — 2 targets' },
    'thor ripple': { action: 'thor_ripple', desc: 'Rod ripple — 4 rods in a line' },
    'thor carpet': { action: 'thor_carpet', desc: 'Rod carpet — 8 rods grid pattern' },
    'thor annihilation': { action: 'thor_annihilation', desc: 'Rod annihilation — 16 rods, geography rewrite' },

    // === DIMENSIONAL — SPECIFICS ===
    'four d fold': { action: 'dim_4d', desc: '4D fold — shift one dimension forward' },
    'five d shift': { action: 'dim_5d', desc: '5D shift — quantum spatial' },
    'six d shift': { action: 'dim_6d', desc: '6D shift — temporal' },
    'seven d shift': { action: 'dim_7d', desc: '7D shift — void' },
    'eight d shift': { action: 'dim_8d', desc: '8D shift — cosmic' },
    'return to reality': { action: 'dim_return', desc: 'Return to 3D base reality' },
    'snipe through wall': { action: 'dim_snipe_4d', desc: '4D fold shot — curve bullet through dimension' },
    'tachyon shot': { action: 'dim_tachyon', desc: 'Fire tachyon shot — see 1s into future' },

    // === CAREER ABILITIES — ALL CAREERS ===
    'stealth cloak': { action: 'career_stealth_cloak', desc: 'Dark matter cloak — full invisibility' },
    'neural hijack': { action: 'career_neural_hijack', desc: 'Fire neural parasite dart — hijack enemy body' },
    'medic revive': { action: 'career_medic_revive', desc: 'Quick revive downed teammate' },
    'quantum heal': { action: 'career_quantum_heal', desc: 'Quantum heal — mass heal entire squad' },
    'tesseract': { action: 'career_tesseract', desc: 'Deploy Tesseract safe-zone — pocket dimension armory' },
    'overclock': { action: 'career_overclock', desc: 'Synaptic overclock — 500% neural boost, slow motion' },
    'echolocation': { action: 'career_echolocation', desc: 'Sonar echolocation — see all skeletons through walls' },
    'cloak': { action: 'career_stealth_cloak', desc: 'Activate stealth cloak' },

    // === INTELLIGENCE — ALL LAYERS ===
    'full intel': { action: 'intel_full', desc: 'Request full INTEL FUSION report (OSINT + MANSINT + WARSINT)' },
    'intel fusion': { action: 'intel_full', desc: 'Generate unified intelligence picture' },
    'harvest osint': { action: 'intel_osint_harvest', desc: 'Harvest OSINT from all sources in current zone' },
    'track footprints': { action: 'intel_footprints', desc: 'Track digital footprints and anomalies' },
    'civilian count': { action: 'intel_civilians', desc: 'Get civilian informant count for zone' },
    'recruit asset': { action: 'intel_recruit', desc: 'Recruit civilian as spy asset' },
    'interrogate': { action: 'intel_interrogate', desc: 'Interrogate captured enemy' },
    'aria interrogation': { action: 'intel_interrogate_aria', desc: 'ARIA-assisted interrogation (95% success)' },
    'browse black market': { action: 'intel_market_browse', desc: 'Browse intel black market listings' },
    'buy intel': { action: 'intel_market_buy', desc: 'Buy intel from black market' },
    'who is selling me': { action: 'intel_market_check', desc: 'Check if anyone is selling your position' },
    'sonar passive': { action: 'intel_sonar_passive', desc: 'Switch to passive sonar (stealthy)' },
    'sonar active': { action: 'intel_sonar_active', desc: 'Switch to active sonar (reveals position)' },
    'satellite recon': { action: 'intel_sat_recon', desc: 'Request recon satellite imagery' },
    'satellite signals': { action: 'intel_sat_signals', desc: 'Request signals intelligence satellite' },
    'early warning': { action: 'intel_early_warning', desc: 'Check early warning satellite for missile launches' },
    'thermal satellite': { action: 'intel_sat_thermal', desc: 'Request thermal imaging satellite' },
    'squad feed': { action: 'intel_squad_feed', desc: 'Activate quantum-entangled squad feed' },
    'share vision': { action: 'intel_share_vision', desc: 'Share your vision with squad (zero latency)' },
    'share biometrics': { action: 'intel_share_bio', desc: 'Share biometrics with squad' },
    'share threats': { action: 'intel_share_threats', desc: 'Share threat assessment with squad' },

    // === NATIONAL PROTOCOLS — SPECIFIC COUNTRIES ===
    'abuja protocol': { action: 'proto_abuja', desc: 'Activate Abuja national defense framework (Nigeria)' },
    'washington protocol': { action: 'proto_washington', desc: 'Activate Washington national defense framework (USA)' },
    'tokyo protocol': { action: 'proto_tokyo', desc: 'Activate Tokyo national defense framework (Japan)' },
    'kabul protocol': { action: 'proto_kabul', desc: 'Activate Kabul national defense framework (Afghanistan)' },
    'london protocol': { action: 'proto_london', desc: 'Activate London national defense framework (UK)' },
    'moscow protocol': { action: 'proto_moscow', desc: 'Activate Moscow national defense framework (Russia)' },
    'beijing protocol': { action: 'proto_beijing', desc: 'Activate Beijing national defense framework (China)' },
    'paris protocol': { action: 'proto_paris', desc: 'Activate Paris national defense framework (France)' },
    'berlin protocol': { action: 'proto_berlin', desc: 'Activate Berlin national defense framework (Germany)' },
    'tel aviv protocol': { action: 'proto_tel_aviv', desc: 'Activate Tel Aviv national defense framework (Israel)' },
    'seoul protocol': { action: 'proto_seoul', desc: 'Activate Seoul national defense framework (South Korea)' },
    'new delhi protocol': { action: 'proto_delhi', desc: 'Activate New Delhi national defense framework (India)' },

    // === MULTI-DEVICE SESSION ===
    'start session': { action: 'session_start', desc: 'Start a campaign session on this device' },
    'end session': { action: 'session_end', desc: 'End current campaign session' },
    'show sessions': { action: 'session_list', desc: 'Show all active sessions across devices' },
    'switch device': { action: 'session_switch', desc: 'Switch to another device session' },

    // === SPLIT SCREEN ===
    'split screen': { action: 'split_enable', desc: 'Enable split screen 2-player' },
    'split vertical': { action: 'split_vertical', desc: 'Split screen top and bottom' },
    'split horizontal': { action: 'split_horizontal', desc: 'Split screen left and right' },
    'merge screen': { action: 'split_disable', desc: 'Disable split screen — back to single player' },
    'player one login': { action: 'split_login_p1', desc: 'Login player 1 on split screen' },
    'player two login': { action: 'split_login_p2', desc: 'Login player 2 on split screen' },

    // === VR SPECIFIC ===
    'enable vr': { action: 'vr_enable', desc: 'Enable VR mode' },
    'disable vr': { action: 'vr_disable', desc: 'Disable VR mode — back to screen' },
    'recalibrate vr': { action: 'vr_recalibrate', desc: 'Recalibrate VR headset position' },
    'vr seated': { action: 'vr_seated', desc: 'Switch to VR seated mode' },
    'vr standing': { action: 'vr_standing', desc: 'Switch to VR standing mode' },
    'vr room scale': { action: 'vr_room_scale', desc: 'Switch to VR room-scale mode' },

    // === SHOP / ECONOMY — ALL ===
    'buy sniper': { action: 'shop_buy_sniper', desc: 'Buy sniper rifle' },
    'buy assault': { action: 'shop_buy_ar', desc: 'Buy assault rifle' },
    'buy shotgun': { action: 'shop_buy_shotgun', desc: 'Buy shotgun' },
    'buy lmg': { action: 'shop_buy_lmg', desc: 'Buy LMG' },
    'buy rocket': { action: 'shop_buy_rocket', desc: 'Buy rocket launcher' },
    'buy grenades': { action: 'shop_buy_grenades', desc: 'Buy grenades' },
    'buy flashbangs': { action: 'shop_buy_flash', desc: 'Buy flashbangs' },
    'buy smokes': { action: 'shop_buy_smoke', desc: 'Buy smoke grenades' },
    'buy wolverine': { action: 'shop_buy_wolverine', desc: 'Buy Wolverine Skull ($3,500)' },
    'buy self bunker': { action: 'shop_buy_bunker', desc: 'Buy Self-Bunker Mode ($4,000)' },
    'buy reality anchor': { action: 'shop_buy_anchor', desc: 'Buy Reality Anchor ($20,000)' },
    'buy immortal code': { action: 'shop_buy_immortal', desc: 'Buy Immortal Code ($15,000)' },
    'buy cosmic immortality': { action: 'shop_buy_cosmic', desc: 'Buy Cosmic Immortality ($10,000)' },
    'buy galaxy shield': { action: 'shop_buy_galaxy', desc: 'Buy Galaxy Shield ($7,500)' },
    'buy coins': { action: 'shop_buy_coins', desc: 'Buy coins with real money' },
    'buy premium tokens': { action: 'shop_buy_tokens', desc: 'Buy premium tokens' },
    'upgrade tier': { action: 'shop_upgrade_tier', desc: 'Upgrade premium tier' },
    'upgrade to silver': { action: 'shop_upgrade_silver', desc: 'Upgrade to Silver tier ($200)' },
    'upgrade to gold': { action: 'shop_upgrade_gold', desc: 'Upgrade to Gold tier ($800)' },
    'upgrade to platinum': { action: 'shop_upgrade_platinum', desc: 'Upgrade to Platinum tier ($2,500)' },
    'upgrade to supreme': { action: 'shop_upgrade_supreme', desc: 'Upgrade to Supreme tier ($10,000)' },

    // === AI MODE ===
    'ai mode on': { action: 'ai_enable', desc: 'Activate AI Auto-Play Mode ($300/year)' },
    'ai mode off': { action: 'ai_disable', desc: 'Deactivate AI Auto-Play Mode — back to manual' },
    'ai take over': { action: 'ai_takeover', desc: 'AI takes full control of your character' },
    'ai stop': { action: 'ai_stop', desc: 'AI releases control back to you' },
    'ai use cheat': { action: 'ai_cheat', desc: 'AI activates your best available cheat' },
    'ai banish': { action: 'ai_banish', desc: 'AI finds and banishes nearest enemy' },
    'ai survive': { action: 'ai_survive', desc: 'AI activates best survival trait for current threat' },
    'ai airstrike': { action: 'ai_airstrike', desc: 'AI calls optimal airstrike on enemy cluster' },
    'ai hunt': { action: 'ai_hunt', desc: 'AI enters hunting mode — seeks and eliminates enemies' },
    'ai defend': { action: 'ai_defend', desc: 'AI enters defensive mode — holds position and covers' },
    'ai escort': { action: 'ai_escort', desc: 'AI follows and protects squad leader' },
    'ai loot': { action: 'ai_loot', desc: 'AI collects nearby loot and supply drops' },
    'ai revive': { action: 'ai_revive', desc: 'AI revives nearest downed teammate' },
    'ai extract': { action: 'ai_extract', desc: 'AI navigates to extraction point' },
    'ai settings': { action: 'ai_settings', desc: 'Open AI behavior settings' },
    'ai aggressive': { action: 'ai_style_aggressive', desc: 'Set AI to aggressive playstyle' },
    'ai defensive': { action: 'ai_style_defensive', desc: 'Set AI to defensive playstyle' },
    'ai stealth': { action: 'ai_style_stealth', desc: 'Set AI to stealth playstyle' },
    'ai balanced': { action: 'ai_style_balanced', desc: 'Set AI to balanced playstyle' },

    // === WEATHER / ENVIRONMENT ===
    'check weather': { action: 'weather_check', desc: 'Check current weather conditions' },
    'weather forecast': { action: 'weather_forecast', desc: 'Get weather forecast for next 30 minutes' },

    // === MATCH MANAGEMENT ===
    'create match': { action: 'match_create', desc: 'Create a new match' },
    'join match': { action: 'match_join', desc: 'Join an available match' },
    'leave match': { action: 'match_leave', desc: 'Leave current match' },
    'surrender': { action: 'match_surrender', desc: 'Surrender current match' },
    'victory': { action: 'match_victory', desc: 'Declare victory (if win condition met)' },

    // === RECRUITMENT ===
    'post banner': { action: 'recruit_post', desc: 'Post recruitment banner' },
    'view banners': { action: 'recruit_view', desc: 'View open recruitment banners' },
    'apply to banner': { action: 'recruit_apply', desc: 'Apply to a recruitment banner' },

    // === MAP MODIFICATIONS ===
    'create crater': { action: 'mod_crater', desc: 'Create permanent crater at current position' },
    'create barricade': { action: 'mod_barricade', desc: 'Create barricade modification' },
    'create dimensional tear': { action: 'mod_tear', desc: 'Create dimensional tear modification' },
    'create void scar': { action: 'mod_void_scar', desc: 'Create void scar modification' },
    'view modifications': { action: 'mod_view', desc: 'View all permanent modifications in zone' },
  },

  // Get total command count
  getTotalCommands() {
    const existing = (typeof VOICE_COMMANDS !== 'undefined') ? Object.keys(VOICE_COMMANDS.commands).length : 0;
    return existing + Object.keys(this.expandedCommands).length;
  },

  // Get all commands merged
  getAllCommands() {
    const all = {};
    if (typeof VOICE_COMMANDS !== 'undefined') {
      Object.assign(all, VOICE_COMMANDS.commands);
    }
    Object.assign(all, this.expandedCommands);
    return all;
  },
};

// ============================================================
// 2. AI AUTO-PLAY MODE ($300/YEAR)
// ============================================================
const AI_AUTO_PLAY = {
  name: 'AI Auto-Play Mode',
  description: 'Player sits back. The AI plays the entire game for them. Including using cheats, abilities, dimensional shifts, banishments, strikes, and survival traits. The AI is smart, adaptive, and plays to win.',
  price: 300, // USD per year
  priceNGN: 450000, // Naira per year
  active: false,
  style: 'balanced', // aggressive, defensive, stealth, balanced
  playerState: null,

  // Subscription check
  subscription: {
    tier: 'ai_auto_play',
    priceUSD: 300,
    priceNGN: 450000,
    billingCycle: 'yearly',
    features: [
      'AI takes full control of your character in any match',
      'AI uses all your weapons, abilities, and gear optimally',
      'AI activates survival traits automatically when doomsday hits',
      'AI uses cheat abilities (Reality Anchor, Immortal Code) if you own them',
      'AI banishes enemies automatically when optimal',
      'AI calls airstrikes, missiles, and orbital strikes at the right moments',
      'AI navigates dimensions (4D-8D) for tactical advantage',
      'AI adapts playstyle: aggressive, defensive, stealth, or balanced',
      'AI loots, revives teammates, and completes objectives',
      'AI plays while you watch — like watching a movie of your character winning',
      'AI can be interrupted at any time — say "ai stop" to take back control',
      'AI learns from the neural AI system — it gets smarter the more it plays',
    ],
    restrictions: [
      'Does NOT work in ranked/competitive matches (prevents abuse)',
      'Does NOT work in tournament matches',
      'AI plays at your skill tier — if you are tier 3, AI plays at tier 3 level',
      'AI cannot use voice chat as you (it can use text pings)',
      'AI cannot spend real money without your confirmation',
      'AI mode is visible to all players in the match (transparency)',
      'You earn reduced XP (50%) while AI is playing for you',
      'You earn reduced coins (50%) while AI is playing for you',
      'AI may still lose — it is smart but not invincible',
    ],
  },

  // AI behavior engine
  behaviors: {
    aggressive: {
      playstyle: 'aggressive',
      desc: 'AI pushes forward aggressively, seeks enemies, uses heavy weapons, calls strikes',
      aimAccuracy: 0.75,
      reactionTime: 200, // ms
      movementSpeed: 'fast',
      abilityUsage: 'frequent',
      banishUsage: 'aggressive', // banishes whenever possible
      survivalUsage: 'reactive', // uses survival traits when threatened
      cheatUsage: 'tactical', // uses cheats at key moments
      priority: ['kill_enemies', 'push_objective', 'call_strikes', 'banish_threats'],
    },
    defensive: {
      playstyle: 'defensive',
      desc: 'AI holds position, provides covering fire, revives teammates, deploys fortifications',
      aimAccuracy: 0.7,
      reactionTime: 300,
      movementSpeed: 'slow',
      abilityUsage: 'reactive',
      banishUsage: 'defensive', // banishes only when threatened
      survivalUsage: 'proactive', // activates survival traits early
      cheatUsage: 'emergency', // uses cheats only as last resort
      priority: ['hold_position', 'revive_teammates', 'cover_fire', 'deploy_fortifications'],
    },
    stealth: {
      playstyle: 'stealth',
      desc: 'AI moves silently, flanks, uses cloaking, sniper positions, neural hijacks',
      aimAccuracy: 0.85,
      reactionTime: 150,
      movementSpeed: 'silent',
      abilityUsage: 'tactical',
      banishUsage: 'surgical', // banishes key targets only
      survivalUsage: 'proactive',
      cheatUsage: 'stealth', // uses cheats for infiltration
      priority: ['flank', 'snipe', 'infiltrate', 'neural_hijack', 'avoid_detection'],
    },
    balanced: {
      playstyle: 'balanced',
      desc: 'AI adapts to situation — aggressive when attacking, defensive when holding, stealth when scouting',
      aimAccuracy: 0.8,
      reactionTime: 250,
      movementSpeed: 'adaptive',
      abilityUsage: 'adaptive',
      banishUsage: 'adaptive',
      survivalUsage: 'adaptive',
      cheatUsage: 'adaptive',
      priority: ['adapt_to_situation', 'support_squad', 'complete_objective', 'survive'],
    },
  },

  // AI decision engine
  decisions: {
    // AI evaluates the current situation and decides what to do
    evaluate(gameState, playerState) {
      const threat = this._assessThreat(gameState);
      const opportunity = this._assessOpportunity(gameState, playerState);
      const survival = this._checkSurvival(gameState, playerState);

      // Priority 1: Survive (if doomsday or critical threat)
      if (survival.needed) {
        return {
          action: 'survive',
          trait: survival.bestTrait,
          desc: 'AI detects ' + survival.threat + '. Activating ' + survival.bestTrait + ' to survive.',
          voiceLine: 'AI: "Doomsday detected. Activating ' + survival.bestTrait + '. You will survive."',
        };
      }

      // Priority 2: Cheat (if optimal moment)
      if (opportunity.cheatOptimal && playerState.ownedItems) {
        const bestCheat = this._pickBestCheat(playerState.ownedItems, gameState);
        if (bestCheat) {
          return {
            action: 'activate_cheat',
            cheat: bestCheat,
            desc: 'AI determines this is the optimal moment for ' + bestCheat,
            voiceLine: 'AI: "Activating ' + bestCheat + '. This is the right moment."',
          };
        }
      }

      // Priority 3: Banish (if high-value target available)
      if (opportunity.banishTarget) {
        return {
          action: 'banish',
          target: opportunity.banishTarget,
          desc: 'AI found high-value target. Banishing ' + opportunity.banishTarget,
          voiceLine: 'AI: "High-value target detected. Banning from this reality."',
        };
      }

      // Priority 4: Strike (if enemy cluster detected)
      if (opportunity.strikeOptimal) {
        return {
          action: 'call_strike',
          strike: opportunity.bestStrike,
          target: opportunity.strikeLocation,
          desc: 'AI detected enemy cluster. Calling ' + opportunity.bestStrike,
          voiceLine: 'AI: "Enemy cluster detected. Calling ' + opportunity.bestStrike + ' on their position."',
        };
      }

      // Priority 5: Combat
      if (threat.enemyNearby) {
        return {
          action: 'engage',
          target: threat.nearestEnemy,
          weapon: this._pickBestWeapon(playerState, threat.nearestEnemy),
          desc: 'AI engaging enemy with ' + this._pickBestWeapon(playerState, threat.nearestEnemy),
          voiceLine: null, // no voice line for standard combat
        };
      }

      // Priority 6: Objective
      if (gameState.objective) {
        return {
          action: 'objective',
          objective: gameState.objective,
          desc: 'AI moving to complete objective: ' + gameState.objective,
        };
      }

      // Priority 7: Loot
      if (opportunity.nearbyLoot) {
        return {
          action: 'loot',
          item: opportunity.lootItem,
          desc: 'AI collecting nearby loot: ' + opportunity.lootItem,
        };
      }

      // Priority 8: Revive
      if (opportunity.downedTeammate) {
        return {
          action: 'revive',
          teammate: opportunity.downedTeammate,
          desc: 'AI reviving downed teammate: ' + opportunity.downedTeammate,
          voiceLine: 'AI: "Teammate down. Moving to revive."',
        };
      }

      // Default: hold and scan
      return {
        action: 'scan',
        desc: 'AI scanning for threats and opportunities',
      };
    },

    _assessThreat(gameState) {
      return {
        enemyNearby: gameState.enemies && gameState.enemies.length > 0,
        nearestEnemy: gameState.enemies && gameState.enemies[0] ? gameState.enemies[0].id : null,
        threatLevel: gameState.threatLevel || 'low',
        doomsdayActive: gameState.doomsdayActive || false,
      };
    },

    _assessOpportunity(gameState, playerState) {
      return {
        banishTarget: gameState.enemies && gameState.enemies.find(e => e.isHighValue) ? gameState.enemies.find(e => e.isHighValue).id : null,
        cheatOptimal: gameState.matchPhase === 'critical' && (gameState.enemies || []).length > 3,
        strikeOptimal: gameState.enemies && gameState.enemies.length >= 3 && gameState.enemies.every(e => Math.abs(e.x - gameState.playerX) < 100),
        bestStrike: playerState.tier >= 4 ? 'cruise_missile' : 'airstrike',
        strikeLocation: gameState.enemies && gameState.enemies[0] ? { x: gameState.enemies[0].x, z: gameState.enemies[0].z } : null,
        nearbyLoot: gameState.nearbyLoot || null,
        lootItem: gameState.lootItem || null,
        downedTeammate: gameState.downedTeammate || null,
      };
    },

    _checkSurvival(gameState, playerState) {
      if (!gameState.doomsdayActive) return { needed: false };

      const traits = playerState.equippedSurvivalTraits || [];
      if (traits.length === 0) return { needed: true, threat: 'doomsday', bestTrait: 'NONE — no survival traits equipped' };

      // Pick best trait for doomsday
      const priority = ['cheat_reality_anchor', 'cheat_immortal_code', 'cosmic_immortality', 'galaxy_shield', 'quantum_state_lock', 'void_phase_immunity', 'self_bunker_mode', 'wolverine_skull', 'adamantium_shell'];

      for (const trait of priority) {
        if (traits.includes(trait)) {
          return { needed: true, threat: 'doomsday', bestTrait: trait };
        }
      }

      return { needed: true, threat: 'doomsday', bestTrait: traits[0] };
    },

    _pickBestCheat(ownedItems, gameState) {
      if (ownedItems.includes('cheat_reality_anchor')) return 'reality_anchor';
      if (ownedItems.includes('cheat_immortal_code')) return 'immortal_code';
      return null;
    },

    _pickBestWeapon(playerState, enemyId) {
      const weapons = playerState.weapons || [];
      if (weapons.length === 0) return 'unarmed';
      // Pick based on enemy distance (simplified)
      return weapons[0]; // primary weapon
    },
  },

  // Enable AI mode
  enable(playerState) {
    this.active = true;
    this.playerState = playerState;
    return {
      success: true,
      message: 'AI Auto-Play Mode activated. Sit back and watch. The AI will play for you.',
      style: this.style,
      voiceLine: 'AI: "I have control now. I will play to win. You can take back control anytime by saying \'ai stop\'."',
    };
  },

  // Disable AI mode
  disable() {
    this.active = false;
    return {
      success: true,
      message: 'AI Auto-Play Mode deactivated. You have control again.',
      voiceLine: 'AI: "Control returned to you. Good luck out there."',
    };
  },

  // Set playstyle
  setStyle(style) {
    if (!this.behaviors[style]) return { success: false, error: 'Unknown style. Options: aggressive, defensive, stealth, balanced' };
    this.style = style;
    return {
      success: true,
      style: style,
      desc: this.behaviors[style].desc,
      voiceLine: 'AI: "Switching to ' + style + ' mode. Adapting my playstyle."',
    };
  },

  // AI plays one tick (called every game frame)
  tick(gameState) {
    if (!this.active) return null;
    const decision = this.decisions.evaluate(gameState, this.playerState);
    return decision;
  },

  // AI uses a cheat
  useCheat() {
    const owned = (this.playerState && this.playerState.ownedItems) || [];
    if (owned.includes('cheat_reality_anchor')) {
      return {
        action: 'reality_anchor',
        desc: 'AI activated Reality Anchor',
        voiceLine: 'AI: "Activating Reality Anchor. You are now immune to everything."',
      };
    }
    if (owned.includes('cheat_immortal_code')) {
      return {
        action: 'immortal_code',
        desc: 'AI activated Immortal Code',
        voiceLine: 'AI: "Activating Immortal Code. Your code is now in the kernel."',
      };
    }
    return { action: 'none', desc: 'AI: No cheats available to use.' };
  },

  // AI banishes
  banish(gameState) {
    const enemies = gameState.enemies || [];
    if (enemies.length === 0) return { success: false, message: 'AI: No targets to banish.' };

    const target = enemies.find(e => e.isHighValue) || enemies[0];
    return {
      success: true,
      target: target.id,
      desc: 'AI banishing target ' + target.id,
      voiceLine: 'AI: "Banishing target ' + target.id + ' to deep space. They will need to pay to come back."',
    };
  },

  // AI survives doomsday
  survive(gameState) {
    const check = this.decisions._checkSurvival(gameState, this.playerState);
    if (!check.needed) return { action: 'none', message: 'AI: No doomsday detected.' };

    return {
      action: 'survive',
      trait: check.bestTrait,
      desc: 'AI activating ' + check.bestTrait + ' for doomsday survival',
      voiceLine: 'AI: "Doomsday detected. Activating ' + check.bestTrait + '. You will not die today."',
    };
  },

  // AI calls airstrike
  callStrike(gameState) {
    const enemies = gameState.enemies || [];
    if (enemies.length < 2) return { success: false, message: 'AI: Not enough enemies to justify a strike.' };

    const tier = (this.playerState && this.playerState.tier) || 1;
    let strike = 'airstrike';
    if (tier >= 5) strike = 'icbm';
    else if (tier >= 4) strike = 'cruise_missile';
    else if (tier >= 3) strike = 'airstrike';

    return {
      success: true,
      strike: strike,
      target: { x: enemies[0].x, z: enemies[0].z },
      desc: 'AI calling ' + strike + ' on enemy cluster',
      voiceLine: 'AI: "Enemy cluster detected. Calling ' + strike + '. Clear the area."',
    };
  },

  // AI loots
  loot(gameState) {
    if (!gameState.nearbyLoot) return { success: false, message: 'AI: No loot nearby.' };
    return {
      success: true,
      item: gameState.lootItem,
      desc: 'AI collecting ' + gameState.lootItem,
      voiceLine: 'AI: "Collecting ' + gameState.lootItem + '. Stocking up."',
    };
  },

  // AI revives
  revive(gameState) {
    if (!gameState.downedTeammate) return { success: false, message: 'AI: No teammates need reviving.' };
    return {
      success: true,
      teammate: gameState.downedTeammate,
      desc: 'AI reviving ' + gameState.downedTeammate,
      voiceLine: 'AI: "' + gameState.downedTeammate + ' is down. Moving to revive. Cover me."',
    };
  },

  // Get AI status
  getStatus() {
    return {
      active: this.active,
      style: this.style,
      desc: this.behaviors[this.style].desc,
      subscription: this.subscription.priceUSD + '/year',
      voiceLine: this.active ? 'AI: "I am in control. Current playstyle: ' + this.style + '. Say \'ai stop\' to take back control."' : 'AI mode is off.',
    };
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FULL_VOICE, AI_AUTO_PLAY };
}
if (typeof window !== 'undefined') {
  window.FULL_VOICE = FULL_VOICE;
  window.AI_AUTO_PLAY = AI_AUTO_PLAY;
}
