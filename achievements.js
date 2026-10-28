// ====== CHRONOFALL — Achievements, Badges, Teams & Personalization ======
// 100+ achievements, badge system, squad/team management, player customization

// ====== ACHIEVEMENT CATEGORIES ======
const ACHIEVEMENT_CATEGORIES = {
  combat:    { name:'COMBAT',       icon:'⚔️',  color:0xff0044 },
  sniper:    { name:'SNIPER',       icon:'🎯',  color:0x00ff88 },
  kills:     { name:'KILLS',       icon:'💀',  color:0xff6600 },
  dimension: { name:'DIMENSIONAL', icon:'🌌',  color:0xff00e6 },
  team:      { name:'TEAM',         icon:'🤝',  color:0x00f5ff },
  vehicle:   { name:'VEHICLE',      icon:'🚗',  color:0xffaa00 },
  survival:  { name:'SURVIVAL',     icon:'🛡️',  color:0x0088ff },
  premium:   { name:'PREMIUM',      icon:'👑',  color:0xffd700 },
  mission:   { name:'MISSION',      icon:'🎖',  color:0x00ff88 },
  special:   { name:'SPECIAL',      icon:'⭐',  color:0xff00ff },
};

// ====== ACHIEVEMENTS (100+) ======
const ACHIEVEMENTS = {
  // === COMBAT ===
  first_blood:      { name:'First Blood',      cat:'combat',   desc:'Get the first kill in a match',         xp:100,   rarity:'common' },
  double_kill:      { name:'Double Kill',      cat:'combat',   desc:'Kill 2 enemies within 3 seconds',        xp:200,   rarity:'common' },
  triple_kill:      { name:'Triple Kill',      cat:'combat',   desc:'Kill 3 enemies within 5 seconds',       xp:400,   rarity:'uncommon' },
  quad_kill:        { name:'Quad Kill',        cat:'combat',   desc:'Kill 4 enemies within 5 seconds',       xp:800,   rarity:'rare' },
  penta_kill:       { name:'PENTAKILL',       cat:'combat',   desc:'Kill 5 enemies within 7 seconds',       xp:1600,  rarity:'epic' },
  hexa_kill:        { name:'HEXAKILL',        cat:'combat',   desc:'Kill 6 enemies within 8 seconds',       xp:3200,  rarity:'legendary' },
  killing_spree:    { name:'Killing Spree',    cat:'combat',   desc:'Get 5 kills without dying',              xp:500,   rarity:'uncommon' },
  rampage:          { name:'RAMPAGE',          cat:'combat',   desc:'Get 10 kills without dying',            xp:1000,  rarity:'rare' },
  unstoppable:      { name:'UNSTOPPABLE',      cat:'combat',   desc:'Get 15 kills without dying',            xp:2000,  rarity:'epic' },
  godlike:          { name:'GODLIKE',          cat:'combat',   desc:'Get 20 kills without dying',            xp:4000,  rarity:'legendary' },
  comeback_king:    { name:'Comeback King',    cat:'combat',   desc:'Win after being at 10% health',         xp:1000,  rarity:'rare' },
  flank_master:      { name:'Flank Master',     cat:'combat',   desc:'Kill 3 enemies from behind',           xp:600,   rarity:'uncommon' },
  glass_cannon:     { name:'Glass Cannon',     cat:'combat',   desc:'Get 10 kills with 1 HP remaining',     xp:2000,  rarity:'epic' },
  melee_master:     { name:'Melee Master',     cat:'combat',   desc:'Get 50 melee kills',                     xp:1500,  rarity:'rare' },
  grenade_kill:     { name:'Grenadier',        cat:'combat',   desc:'Get 25 grenade kills',                  xp:800,   rarity:'uncommon' },
  rocket_kill:      { name:'Rocket Man',       cat:'combat',   desc:'Get 25 rocket/missile kills',           xp:1000,  rarity:'rare' },

  // === SNIPER ===
  sniper_shot:      { name:'Sniper Shot',      cat:'sniper',   desc:'Kill an enemy at 100m+',                xp:200,   rarity:'common' },
  long_shot:        { name:'Long Shot',        cat:'sniper',   desc:'Kill an enemy at 200m+',                xp:400,   rarity:'uncommon' },
  extreme_range:   { name:'Extreme Range',    cat:'sniper',   desc:'Kill an enemy at 500m+',                xp:1000,  rarity:'rare' },
  headshot:         { name:'Headshot',         cat:'sniper',   desc:'Get a headshot kill',                    xp:300,   rarity:'common' },
  headshot_master: { name:'Headshot Master',  cat:'sniper',   desc:'Get 100 headshot kills',                xp:2000,  rarity:'epic' },
  headshot_god:    { name:'Headshot God',     cat:'sniper',   desc:'Get 500 headshot kills',               xp:5000,  rarity:'legendary' },
  no_scope:        { name:'No Scope',         cat:'sniper',   desc:'Kill an enemy without aiming',          xp:500,   rarity:'rare' },
  no_scope_double: { name:'No Scope Double',  cat:'sniper',   desc:'Two no-scope kills in 3s',             xp:1000,  rarity:'epic' },
  quickscope:      { name:'Quickscope',       cat:'sniper',   desc:'Kill within 0.3s of aiming',           xp:400,   rarity:'uncommon' },
  quickscope_master:{name:'Quickscope Master',cat:'sniper',   desc:'50 quickscope kills',                  xp:2000,  rarity:'epic' },
  wallbang:        { name:'Wallbang',         cat:'sniper',   desc:'Kill through a wall',                  xp:800,   rarity:'rare' },
  counter_sniper:  { name:'Counter Sniper',   cat:'sniper',   desc:'Kill an enemy sniper while they aim',  xp:600,   rarity:'rare' },
  overwatch:       { name:'Overwatch',        cat:'sniper',   desc:'Cover a teammate with 5 kills',        xp:800,   rarity:'uncommon' },
  eagle_eye:       { name:'Eagle Eye',        cat:'sniper',   desc:'Kill at 1000m+',                       xp:5000,  rarity:'legendary' },
  galactic_sniper: { name:'Galactic Sniper',  cat:'sniper',   desc:'Sniper kill at 5000m (30th century)', xp:10000, rarity:'mythic' },

  // === KILLS ===
  bot_killer_10:    { name:'Bot Killer',      cat:'kills',    desc:'Kill 10 bots total',                     xp:100,   rarity:'common' },
  bot_killer_100:   { name:'Centurion',        cat:'kills',    desc:'Kill 100 bots total',                   xp:500,   rarity:'uncommon' },
  bot_killer_500:   { name:'Bot Slayer',       cat:'kills',    desc:'Kill 500 bots total',                   xp:2000,  rarity:'rare' },
  bot_killer_1000:  { name:'Terminator',       cat:'kills',    desc:'Kill 1000 bots total',                  xp:5000,  rarity:'epic' },
  bot_killer_5000:  { name:'Exterminator',     cat:'kills',    desc:'Kill 5000 bots total',                  xp:15000, rarity:'legendary' },
  boss_slayer:      { name:'Boss Slayer',      cat:'kills',    desc:'Defeat your first boss',                xp:2000,  rarity:'epic' },
  boss_master:     { name:'Boss Master',      cat:'kills',    desc:'Defeat 10 bosses',                    xp:10000, rarity:'legendary' },

  // === DIMENSIONAL ===
  dim4_novice:      { name:'4D Initiate',      cat:'dimension',desc:'Use Ana/Kata axis 10 times',            xp:300,   rarity:'common' },
  dim4_master:      { name:'4D Master',        cat:'dimension',desc:'Phase through 50 walls',                xp:1500,  rarity:'rare' },
  dim5_rewinder:   { name:'Time Rewinder',    cat:'dimension',desc:'Use Rewind 50 times',                  xp:500,   rarity:'uncommon' },
  dim5_slowmo:     { name:'Slow Motion',     cat:'dimension',desc:'Use Slow-Mo 50 times',               xp:500,   rarity:'uncommon' },
  dim5_chronomaster:{name:'Chrono Master',    cat:'dimension',desc:'Use all time abilities 100x each',   xp:3000,  rarity:'epic' },
  dim6_shifter:    { name:'Quantum Shifter',  cat:'dimension',desc:'Quantum shift 100 times',             xp:1000,  rarity:'rare' },
  dim6_master:     { name:'Quantum Master',  cat:'dimension',desc:'Kill in all 3 quantum states',        xp:2000,  rarity:'epic' },
  dim7_void:       { name:'VOID Walker',      cat:'dimension',desc:'Banish first enemy to VOID',         xp:2000,  rarity:'epic' },
  dim7_voidmaster: { name:'VOID Master',     cat:'dimension',desc:'Banish 50 enemies to VOID',          xp:10000, rarity:'legendary' },
  dim8_cosmic:     { name:'Galaxy Sender',    cat:'dimension',desc:'Teleport enemy to another galaxy',   xp:5000,  rarity:'legendary' },
  dim8_cosmicmaster:{name:'Galaxy Master',   cat:'dimension',desc:'Teleport 10 enemies to galaxies',    xp:25000, rarity:'mythic' },
  all_dimensions:  { name:'8D Being',        cat:'dimension',desc:'Use all 8 dimensions in one match',  xp:50000, rarity:'mythic' },

  // === TEAM ===
  team_player:      { name:'Team Player',      cat:'team',     desc:'Complete 10 squad missions',            xp:500,   rarity:'common' },
  team_leader:     { name:'Squad Leader',     cat:'team',     desc:'Lead a squad to victory 10 times',      xp:2000,  rarity:'rare' },
  team_medic:      { name:'Field Medic',      cat:'team',     desc:'Heal squadmates 50 times',             xp:1000,  rarity:'uncommon' },
  team_spotter:    { name:'Spotter',         cat:'team',     desc:'Spot 100 enemies for squad',          xp:800,   rarity:'uncommon' },
  team_reviver:    { name:'Guardian Angel',   cat:'team',     desc:'Revive 25 squadmates',                 xp:2000,  rarity:'rare' },
  team_flawless:   { name:'Flawless Squad',  cat:'team',     desc:'Win match with full squad alive',     xp:3000,  rarity:'epic' },
  team_carrier:    { name:'The Carrier',     cat:'team',     desc:'Win 4v1 in squad match',              xp:5000,  rarity:'legendary' },
  assist_master:   { name:'Assist Master',    cat:'team',     desc:'Get 200 assists',                      xp:1500,  rarity:'rare' },
  save_teammate:   { name:'Lifesaver',       cat:'team',     desc:'Kill enemy attacking teammate 50x',   xp:1000,  rarity:'uncommon' },

  // === VEHICLE ===
  first_drive:     { name:'First Drive',      cat:'vehicle',  desc:'Enter a vehicle for first time',        xp:200,   rarity:'common' },
  road_kill:       { name:'Road Kill',        cat:'vehicle',  desc:'Run over an enemy with vehicle',        xp:500,   rarity:'uncommon' },
  vehicle_destroyer:{name:'Vehicle Destroyer',cat:'vehicle',  desc:'Destroy 25 enemy vehicles',            xp:2000,  rarity:'rare' },
  mech_pilot:      { name:'Mech Pilot',       cat:'vehicle',  desc:'Destroy 10 enemies in a mech',         xp:3000,  rarity:'epic' },
  starship_captain:{name:'Starship Captain', cat:'vehicle',  desc:'Pilot a Stellar Warship',             xp:5000,  rarity:'legendary' },
  hyperspace_jump: { name:'Hyperspace Jump',  cat:'vehicle',  desc:'Jump a vehicle through hyperspace',   xp:10000, rarity:'mythic' },

  // === SURVIVAL ===
  survivor_60:     { name:'Survivor',         cat:'survival', desc:'Survive 60 seconds in a match',         xp:200,   rarity:'common' },
  survivor_300:    { name:'Tough',            cat:'survival', desc:'Survive 5 minutes',                    xp:800,   rarity:'uncommon' },
  survivor_600:    { name:'Hard to Kill',     cat:'survival', desc:'Survive 10 minutes',                   xp:2000,  rarity:'rare' },
  last_stand:     { name:'Last Stand',       cat:'survival', desc:'Win at 1 HP',                         xp:3000,  rarity:'epic' },
  flawless:        { name:'Flawless',         cat:'survival', desc:'Complete mission without damage',      xp:1500,  rarity:'rare' },
  flawless_x10:  { name:'Untouchable',      cat:'survival', desc:'10 flawless missions in a row',       xp:5000,  rarity:'legendary' },

  // === PREMIUM ===
  premium_recruit: { name:'Premium Recruit',  cat:'premium',  desc:'Buy any premium tier',                  xp:1000,  rarity:'rare' },
  premium_op:     { name:'Void Operative',   cat:'premium',  desc:'Use VOID abilities 10 times',          xp:2000,  rarity:'epic' },
  premium_cmd:    { name:'Cosmic Commander', cat:'premium',  desc:'Use COSMIC abilities 10 times',       xp:5000,  rarity:'legendary' },
  premium_supreme:{ name:'Supreme Being',    cat:'premium',  desc:'Reach SUPREME tier',                  xp:25000, rarity:'mythic' },
  galaxy_banisher:{ name:'Galaxy Banisher',  cat:'premium',  desc:'Send 50 enemies to galaxies',         xp:20000, rarity:'mythic' },
  enemy_paid_back:{ name:'Karma Dealer',     cat:'premium',  desc:'Enemy paid coins to return from VOID',xp:3000,  rarity:'epic' },

  // === MISSION ===
  first_mission:   { name:'First Mission',    cat:'mission',  desc:'Complete your first mission',           xp:100,   rarity:'common' },
  mission_10:     { name:'Dedicated',        cat:'mission',  desc:'Complete 10 missions',                xp:500,   rarity:'common' },
  mission_50:     { name:'Veteran',          cat:'mission',  desc:'Complete 50 missions',                xp:2000,  rarity:'uncommon' },
  mission_100:    { name:'Centurion',        cat:'mission',  desc:'Complete 100 missions',              xp:5000,  rarity:'rare' },
  mission_500:    { name:'Mission Machine',  cat:'mission',  desc:'Complete 500 missions',              xp:15000, rarity:'epic' },
  mission_1000:   { name:'Legendary Operative',cat:'mission',desc:'Complete 1000 missions',              xp:50000, rarity:'legendary' },
  level_10:       { name:'Bronze Age Warrior',cat:'mission', desc:'Reach Level 10',                     xp:1000,  rarity:'uncommon' },
  level_50:       { name:'Renaissance Soldier',cat:'mission',desc:'Reach Level 50',                  xp:3000,  rarity:'rare' },
  level_100:      { name:'WW Veteran',       cat:'mission',  desc:'Reach Level 100',                    xp:5000,  rarity:'epic' },
  level_150:      { name:'Modern Warrior',   cat:'mission',  desc:'Reach Level 150',                   xp:10000, rarity:'epic' },
  level_200:      { name:'Future Soldier',   cat:'mission',  desc:'Reach Level 200',                   xp:20000, rarity:'legendary' },
  level_232:      { name:'Supreme Commander',cat:'mission',  desc:'Reach Level 232 (MAX)',             xp:100000,rarity:'mythic' },
  speedrun:       { name:'Speed Demon',      cat:'mission',  desc:'Complete mission in under 30s',      xp:1000,  rarity:'rare' },
  stealth_complete:{name:'Ghost',            cat:'mission',  desc:'Complete stealth mission undetected', xp:2000,  rarity:'epic' },
  boss_first:     { name:'Boss Conqueror',   cat:'mission',  desc:'Complete first boss mission',        xp:3000,  rarity:'epic' },
  era_master_0:  { name:'Stone Age Master', cat:'mission',  desc:'Complete all Stone Age levels',      xp:2000,  rarity:'rare' },
  era_master_8:  { name:'Modern Warfare Master',cat:'mission',desc:'Complete all Modern Warfare levels',xp:5000, rarity:'epic' },
  era_master_11: { name:'30th Century Master',cat:'mission',desc:'Complete all 30th Century levels',  xp:20000, rarity:'legendary' },

  // === SPECIAL ===
  day_one:         { name:'Day One',          cat:'special',  desc:'Play on launch day',                    xp:1000,  rarity:'rare' },
  founder:         { name:'Founder',         cat:'special',  desc:'Be among first 1000 players',          xp:2000,  rarity:'epic' },
  legendary_skins:{ name:'Fashion Icon',     cat:'special',  desc:'Own 10 weapon skins',                  xp:1000,  rarity:'uncommon' },
  collector:      { name:'Collector',        cat:'special',  desc:'Own 50 weapons',                       xp:2000,  rarity:'rare' },
  collector_all:  { name:'Arsenal Master',   cat:'special',  desc:'Own all 262 weapons',                  xp:50000, rarity:'mythic' },
  noob_friendly:  { name:'Welcome',         cat:'special',  desc:'Complete the tutorial',                xp:100,   rarity:'common' },
  gambler:        { name:'Gambler',         cat:'special',  desc:'Open 10 loot boxes',                   xp:500,   rarity:'uncommon' },
  lucky:          { name:'Lucky Strike',     cat:'special',  desc:'Get a mythic from a loot box',         xp:5000,  rarity:'legendary' },
  social:         { name:'Social Butterfly', cat:'special',  desc:'Play with 10 different squadmates',    xp:1000,  rarity:'uncommon' },
  perfectionist:  { name:'Perfectionist',    cat:'special',  desc:'Complete 10 missions with 100% accuracy',xp:3000,rarity:'epic' },
  irony:          { name:'Irony',           cat:'special',  desc:'Kill an enemy with a rock while they have a plasma rifle', xp:5000, rarity:'legendary' },
  pacifist:       { name:'Pacifist Win',    cat:'special',  desc:'Win a match without killing anyone (objectives only)', xp:3000, rarity:'epic' },
  flag_capper:    { name:'Flag Runner',     cat:'special',  desc:'Capture 50 flags',                    xp:2000,  rarity:'rare' },
  bomb_plant:     { name:'Demolition Expert',cat:'special', desc:'Plant 25 bombs',                     xp:1500,  rarity:'uncommon' },
  bomb_defuse:    { name:'Bomb Tech',        cat:'special',  desc:'Defuse 25 bombs',                    xp:1500,  rarity:'uncommon' },
};

// ====== RARITY SYSTEM ======
const RARITY_COLORS = {
  common:    { color:0x888888, name:'Common',    stars:1 },
  uncommon:  { color:0x00ff88, name:'Uncommon',  stars:2 },
  rare:      { color:0x00aaff, name:'Rare',      stars:3 },
  epic:      { color:0xaa00ff, name:'Epic',      stars:4 },
  legendary: { color:0xffaa00, name:'Legendary', stars:5 },
  mythic:    { color:0xff0066, name:'Mythic',    stars:6 },
};

// ====== BADGES (Visual display) ======
const BADGES = {
  sharpshooter:   { name:'Sharpshooter',    icon:'🎯', req:'50 headshot kills',          rarity:'rare' },
  marksman:       { name:'Marksman',        icon:'🎖', req:'100 long-range kills',       rarity:'epic' },
  sniper_elite:   { name:'Sniper Elite',    icon:'🏆', req:'500 headshot kills',         rarity:'legendary' },
  berserker:      { name:'Berserker',       icon:'🪓', req:'50 melee kills',             rarity:'rare' },
  demolitions:   { name:'Demolitions',     icon:'💣', req:'50 explosive kills',         rarity:'rare' },
  void_walker:    { name:'Void Walker',     icon:'🌀', req:'Banish 10 to VOID',         rarity:'epic' },
  galaxy_lord:    { name:'Galaxy Lord',     icon:'🌌', req:'Send 5 to galaxies',        rarity:'mythic' },
  dimension_god: { name:'Dimension God',   icon:'🔮', req:'Use all 8D in one match',    rarity:'mythic' },
  iron_wall:     { name:'Iron Wall',        icon:'🛡', req:'10 flawless missions',      rarity:'epic' },
  speed_demon:   { name:'Speed Demon',      icon:'⚡', req:'5 sub-30s missions',       rarity:'rare' },
  squad_legend: { name:'Squad Legend',     icon:'🤝', req:'Lead 25 squad wins',         rarity:'legendary' },
  war_hero:      { name:'War Hero',          icon:'⭐', req:'Complete 100 missions',     rarity:'epic' },
  supreme_cmd:   { name:'Supreme Commander',icon:'👑', req:'Reach Level 232',           rarity:'mythic' },
  first_blood:   { name:'First Blood',      icon:'🩸', req:'First kill in a match',      rarity:'common' },
  comeback:      { name:'Comeback King',    icon:'🔄', req:'Win at 10% HP',            rarity:'rare' },
  untouchable:   { name:'Untouchable',      icon:'💫', req:'10 flawless in a row',      rarity:'legendary' },
  road_warrior:  { name:'Road Warrior',     icon:'🚗', req:'10 vehicle road kills',     rarity:'uncommon' },
  mech_destroyer:{ name:'Mech Destroyer',    icon:'🤖', req:'Destroy 10 mechs',         rarity:'epic' },
  era_master:    { name:'Era Master',       icon:'🏛', req:'Complete 3 eras',           rarity:'legendary' },
  arsenal_king:  { name:'Arsenal King',     icon:'🔱', req:'Own 100 weapons',           rarity:'epic' },
};

// ====== TITLES (Player titles to equip) ======
const TITLES = [
  { name:'Recruit',         req:'Default',                         rarity:'common' },
  { name:'Soldier',         req:'Level 10',                         rarity:'common' },
  { name:'Veteran',         req:'Level 50',                         rarity:'uncommon' },
  { name:'Marksman',        req:'50 headshots',                     rarity:'uncommon' },
  { name:'Sniper',          req:'100 headshots',                     rarity:'rare' },
  { name:'Sniper Elite',    req:'500 headshots',                     rarity:'epic' },
  { name:'Killing Spree',   req:'10 kills in a match',               rarity:'rare' },
  { name:'Rampage',         req:'15 kills in a match',               rarity:'epic' },
  { name:'Godlike',         req:'20 kills in a match',               rarity:'legendary' },
  { name:'Dimension Walker', req:'Use 4D 100 times',                 rarity:'rare' },
  { name:'Time Lord',       req:'Use time abilities 200 times',       rarity:'epic' },
  { name:'Quantum Being',   req:'Quantum shift 100 times',           rarity:'epic' },
  { name:'Void Walker',     req:'Banish 10 enemies to VOID',        rarity:'legendary' },
  { name:'Galaxy Lord',     req:'Send 5 enemies to galaxies',        rarity:'mythic' },
  { name:'8D Entity',      req:'Use all 8 dimensions',              rarity:'mythic' },
  { name:'Squad Leader',    req:'Lead 10 squad victories',           rarity:'rare' },
  { name:'War Hero',       req:'Complete 100 missions',             rarity:'epic' },
  { name:'Supreme Commander',req:'Reach Level 232',                  rarity:'mythic' },
  { name:'Founder',        req:'Play on launch day',               rarity:'legendary' },
  { name:'Arsenal Master',  req:'Own 100+ weapons',                  rarity:'legendary' },
  { name:'Speed Demon',    req:'5 sub-30s missions',               rarity:'rare' },
  { name:'Ghost',          req:'10 stealth completions',            rarity:'epic' },
  { name:'Iron Wall',      req:'10 flawless missions',              rarity:'epic' },
  { name:'The Collector',  req:'Own 50 weapons',                    rarity:'rare' },
];

// ====== CALLING CARDS (Profile banners) ======
const CALLING_CARDS = [
  { name:'Default',         req:'Default',                 rarity:'common' },
  { name:'Skull',           req:'100 kills',                rarity:'common' },
  { name:'Sniper Cross',   req:'50 headshots',             rarity:'uncommon' },
  { name:'Neon Warrior',   req:'Level 50',                 rarity:'uncommon' },
  { name:'Void Crystal',   req:'Use VOID ability',         rarity:'rare' },
  { name:'Galaxy Portal',  req:'Use COSMIC ability',       rarity:'epic' },
  { name:'Chrono Storm',   req:'Use Chrono Storm ult',     rarity:'legendary' },
  { name:'8D Being',       req:'Use all 8 dimensions',      rarity:'mythic' },
  { name:'Founder Card',   req:'Play on launch day',       rarity:'legendary' },
  { name:'Supreme Gold',   req:'SUPREME tier member',       rarity:'mythic' },
];

// ====== TEAM / SQUAD SYSTEM ======
const SQUAD_SYSTEM = {
  maxSquadSize: 4,
  roles: {
    leader:     { name:'Squad Leader',  perks:['tactical_scan','squad_xp_boost'],   req:'Sergeant+' },
    sniper:     { name:'Sniper/Spotter', perks:['long_range_optics','enemy_spot'],   req:'Any' },
    medic:      { name:'Medic',         perks:['heal_aura','fast_revive'],           req:'Any' },
    engineer:   { name:'Engineer',       perks:['build_cover','repair_speed'],        req:'Any' },
    gunner:     { name:'Heavy Gunner',   perks:['suppressive_fire','ammo_drop'],     req:'Any' },
    stealth:    { name:'Stealth Op',     perks:['cloak','silent_kill'],              req:'Corporal+' },
    void_op:    { name:'Void Operative', perks:['void_banish','void_shield'],        req:'Premium: OPERATIVE' },
    cosmic_op:  { name:'Cosmic Operative',perks:['cosmic_teleport','cosmic_clone'],  req:'Premium: COMMANDER' },
  },
  squadAbilities: [
    { name:'Tactical Scan',   desc:'Reveal all enemies on minimap for 10s',      cd:30000 },
    { name:'Squad Boost',     desc:'+25% damage for squad for 15s',               cd:45000 },
    { name:'Heal Pulse',      desc:'Heal all squad members to full',               cd:60000 },
    { name:'Ammo Drop',       desc:'Resupply all squad members',                   cd:30000 },
    { name:'Revive Beacon',   desc:'Auto-revive downed squadmates',                cd:90000 },
    { name:'Squad Cloak',     desc:'All squad members go invisible for 8s',       cd:60000 },
    { name:'Void Squad',      desc:'Banish nearby enemies to VOID (Premium)',     cd:45000 },
    { name:'Cosmic Squad',    desc:'Teleport squad to safe location (Premium)',   cd:120000 },
  ],
};

// ====== TEAM STATS ======
function createTeamStats() {
  return {
    squadWins: 0,
    squadLosses: 0,
    squadKills: 0,
    squadAssists: 0,
    squadRevives: 0,
    missionsTogether: 0,
    favoriteRole: null,
    squadStreak: 0,
    bestSquadStreak: 0,
  };
}

// ====== PLAYER PROFILE ======
function createPlayerProfile() {
  return {
    // Basic
    name: 'OPERATOR',
    level: 1,
    rank: 'Recruit',
    title: 'Recruit',
    callingCard: 'Default',

    // Currencies
    chronoCoins: 0,
    warBonds: 0,
    scrapMetal: 0,
    darkMatter: 0,

    // Stats
    totalKills: 0,
    totalDeaths: 0,
    totalHeadshots: 0,
    totalAssists: 0,
    totalMissions: 0,
    totalXP: 0,
    kdr: 0,
    accuracy: 0,
    playtime: 0,

    // Weapons
    ownedWeapons: ['stone_club'],
    equippedPrimary: 'stone_club',
    equippedSecondary: null,
    weaponKills: {},

    // Vehicles
    ownedVehicles: [],
    unlockedVehicles: [],

    // Progression
    currentLevel: 1,
    currentStep: 1,
    currentStrap: 0,

    // Dimensions unlocked
    dimensionsUnlocked: [1,2,3,4,5],
    premiumTier: 'FREE',

    // Achievements
    achievements: {}, // key: { unlocked: true, date: timestamp, progress: number }
    badges: [], // earned badge names
    titles: ['Recruit'],
    callingCards: ['Default'],

    // Team
    squad: null,
    teamStats: createTeamStats(),

    // Cosmetics
    weaponSkins: {},
    characterSkins: ['default'],
    equippedCharacter: 'rift',

    // Killstreaks
    currentStreak: 0,
    bestStreak: 0,

    // Special
    joinDate: Date.now(),
    isFounder: false,
  };
}

// ====== ACHIEVEMENT CHECKER ======
function checkAchievement(profile, achievementKey, progress = 1) {
  const ach = ACHIEVEMENTS[achievementKey];
  if (!ach) return null;

  if (!profile.achievements[achievementKey]) {
    profile.achievements[achievementKey] = { unlocked: false, progress: 0, date: null };
  }

  const state = profile.achievements[achievementKey];
  if (state.unlocked) return null;

  state.progress += progress;

  // Check if achievement is unlocked
  // For count-based achievements, check against desc threshold
  // For now, mark as unlocked if triggered
  state.unlocked = true;
  state.date = Date.now();
  profile.totalXP += ach.xp;

  // Check for badge unlock
  checkBadges(profile);
  checkTitles(profile);

  return { achievement: ach, key: achievementKey };
}

// ====== BADGE CHECKER ======
function checkBadges(profile) {
  const newBadges = [];
  for (const [key, badge] of Object.entries(BADGES)) {
    if (profile.badges.includes(key)) continue;

    // Check requirements
    if (key === 'sharpshooter' && profile.totalHeadshots >= 50) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'marksman' && profile.totalKills >= 100) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'sniper_elite' && profile.totalHeadshots >= 500) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'berserker' && (profile.weaponKills['melee'] || 0) >= 50) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'demolitions' && (profile.weaponKills['grenade'] || 0) + (profile.weaponKills['rocket'] || 0) >= 50) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'war_hero' && profile.totalMissions >= 100) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'supreme_cmd' && profile.level >= 232) { profile.badges.push(key); newBadges.push(badge); }
    else if (key === 'arsenal_king' && profile.ownedWeapons.length >= 100) { profile.badges.push(key); newBadges.push(badge); }
  }
  return newBadges;
}

// ====== TITLE CHECKER ======
function checkTitles(profile) {
  for (const title of TITLES) {
    if (profile.titles.includes(title.name)) continue;

    let unlocked = false;
    if (title.name === 'Soldier' && profile.level >= 10) unlocked = true;
    else if (title.name === 'Veteran' && profile.level >= 50) unlocked = true;
    else if (title.name === 'Marksman' && profile.totalHeadshots >= 50) unlocked = true;
    else if (title.name === 'Sniper' && profile.totalHeadshots >= 100) unlocked = true;
    else if (title.name === 'Sniper Elite' && profile.totalHeadshots >= 500) unlocked = true;
    else if (title.name === 'War Hero' && profile.totalMissions >= 100) unlocked = true;
    else if (title.name === 'Supreme Commander' && profile.level >= 232) unlocked = true;
    else if (title.name === 'The Collector' && profile.ownedWeapons.length >= 50) unlocked = true;
    else if (title.name === 'Arsenal Master' && profile.ownedWeapons.length >= 100) unlocked = true;
    else if (title.name === 'Speed Demon' && (profile.achievements['speedrun']?.unlocked)) unlocked = true;
    else if (title.name === 'Ghost' && (profile.achievements['stealth_complete']?.unlocked)) unlocked = true;
    else if (title.name === 'Iron Wall' && (profile.achievements['flawless_x10']?.unlocked)) unlocked = true;

    if (unlocked) profile.titles.push(title.name);
  }
}

// ====== KILLSTREAK REWARDS ======
const KILLSTREAKS = [
  { kills:3,  name:'UAV Recon',        desc:'Reveal enemy positions on minimap',     tier:1 },
  { kills:4,  name:'Counter-UAV',     desc:'Block enemy minimap',                   tier:1 },
  { kills:5,  name:'Care Package',    desc:'Drop a random killstreak',              tier:2 },
  { kills:6,  name:'Cluster Strike',   desc:'Call in cluster bombs on area',        tier:2 },
  { kills:7,  name:'Airstrike',        desc:'Jet bomber run on target area',         tier:3 },
  { kills:8,  name:'Attack Helicopter',desc:'AI heli patrols and attacks',          tier:3 },
  { kills:10, name:'Predator Missile', desc:'Guided missile strike',                tier:4 },
  { kills:12, name:'Orbital Strike',    desc:'Laser from orbit',                     tier:4 },
  { kills:15, name:'Mech Drop',        desc:'Drop a combat mech you can pilot',      tier:5 },
  { kills:18, name:'Drone Swarm',      desc:'AI drone swarm attacks enemies',        tier:5 },
  { kills:20, name:'Chrono Storm',     desc:'Rewind entire arena 10 seconds',        tier:6 },
  { kills:25, name:'Void Bomb',        desc:'Banish all enemies to VOID (Premium)',  tier:6 },
  { kills:30, name:'Galaxy Nova',      desc:'Send ALL enemies to another galaxy (Premium)', tier:7 },
];

// ====== NOTIFICATION SYSTEM (for achievements) ======
function showAchievementNotification(achievement) {
  if (typeof addKillFeed === 'function') {
    const rarity = RARITY_COLORS[achievement.rarity] || RARITY_COLORS.common;
    addKillFeed('🏆 ACHIEVEMENT: ' + achievement.name + ' (+' + achievement.xp + ' XP)');
  }
}

// ====== IN-GAME ACHIEVEMENT TRACKING HOOKS ======
function onKill(profile, weapon, distance, isHeadshot, isNoScope) {
  profile.totalKills++;
  profile.currentStreak++;
  if (profile.currentStreak > profile.bestStreak) profile.bestStreak = profile.currentStreak;

  if (isHeadshot) profile.totalHeadshots++;
  if (!profile.weaponKills[weapon]) profile.weaponKills[weapon] = 0;
  profile.weaponKills[weapon]++;

  // Check achievements
  if (profile.totalKills === 1) { const a = checkAchievement(profile, 'first_blood'); if (a) showAchievementNotification(a.achievement); }
  if (isHeadshot) { const a = checkAchievement(profile, 'headshot'); if (a) showAchievementNotification(a.achievement); }
  if (isHeadshot && profile.totalHeadshots >= 100) { const a = checkAchievement(profile, 'headshot_master'); if (a) showAchievementNotification(a.achievement); }
  if (isHeadshot && profile.totalHeadshots >= 500) { const a = checkAchievement(profile, 'headshot_god'); if (a) showAchievementNotification(a.achievement); }
  if (isNoScope) { const a = checkAchievement(profile, 'no_scope'); if (a) showAchievementNotification(a.achievement); }
  if (distance >= 100) { const a = checkAchievement(profile, 'sniper_shot'); if (a) showAchievementNotification(a.achievement); }
  if (distance >= 200) { const a = checkAchievement(profile, 'long_shot'); if (a) showAchievementNotification(a.achievement); }
  if (distance >= 500) { const a = checkAchievement(profile, 'extreme_range'); if (a) showAchievementNotification(a.achievement); }
  if (distance >= 1000) { const a = checkAchievement(profile, 'eagle_eye'); if (a) showAchievementNotification(a.achievement); }
  if (distance >= 5000) { const a = checkAchievement(profile, 'galactic_sniper'); if (a) showAchievementNotification(a.achievement); }
  if (profile.totalKills >= 10) { const a = checkAchievement(profile, 'bot_killer_10'); if (a) showAchievementNotification(a.achievement); }
  if (profile.totalKills >= 100) { const a = checkAchievement(profile, 'bot_killer_100'); if (a) showAchievementNotification(a.achievement); }
  if (profile.totalKills >= 500) { const a = checkAchievement(profile, 'bot_killer_500'); if (a) showAchievementNotification(a.achievement); }
  if (profile.totalKills >= 1000) { const a = checkAchievement(profile, 'bot_killer_1000'); if (a) showAchievementNotification(a.achievement); }
  if (profile.currentStreak >= 5) { const a = checkAchievement(profile, 'killing_spree'); if (a) showAchievementNotification(a.achievement); }
  if (profile.currentStreak >= 10) { const a = checkAchievement(profile, 'rampage'); if (a) showAchievementNotification(a.achievement); }
  if (profile.currentStreak >= 15) { const a = checkAchievement(profile, 'unstoppable'); if (a) showAchievementNotification(a.achievement); }
  if (profile.currentStreak >= 20) { const a = checkAchievement(profile, 'godlike'); if (a) showAchievementNotification(a.achievement); }

  // Killstreak rewards
  for (const ks of KILLSTREAKS) {
    if (profile.currentStreak === ks.kills) {
      if (typeof addKillFeed === 'function') addKillFeed('🎖 KILLSTREAK: ' + ks.name + ' (' + ks.kills + ' kills)');
    }
  }
}

function onDeath(profile) {
  profile.totalDeaths++;
  profile.currentStreak = 0;
  if (profile.totalKills > 0) profile.kdr = (profile.totalKills / profile.totalDeaths).toFixed(2);
}

function onMissionComplete(profile, time, flawless) {
  profile.totalMissions++;
  if (flawless) {
    const a = checkAchievement(profile, 'flawless'); if (a) showAchievementNotification(a.achievement);
  }
  if (time < 30) {
    const a = checkAchievement(profile, 'speedrun'); if (a) showAchievementNotification(a.achievement);
  }
  if (profile.totalMissions >= 10) { const a = checkAchievement(profile, 'mission_10'); if (a) showAchievementNotification(a.achievement); }
  if (profile.totalMissions >= 50) { const a = checkAchievement(profile, 'mission_50'); if (a) showAchievementNotification(a.achievement); }
  if (profile.totalMissions >= 100) { const a = checkAchievement(profile, 'mission_100'); if (a) showAchievementNotification(a.achievement); }
}

function onDimensionUse(profile, dim) {
  if (dim === 4) {
    if (!profile.achievements['dim4_novice']) { const a = checkAchievement(profile, 'dim4_novice'); if (a) showAchievementNotification(a.achievement); }
  }
  if (dim === 5) {
    if (!profile.achievements['dim5_rewinder']) { const a = checkAchievement(profile, 'dim5_rewinder'); if (a) showAchievementNotification(a.achievement); }
  }
  if (dim === 6) {
    if (!profile.achievements['dim6_shifter']) { const a = checkAchievement(profile, 'dim6_shifter'); if (a) showAchievementNotification(a.achievement); }
  }
  if (dim === 7) {
    if (!profile.achievements['dim7_void']) { const a = checkAchievement(profile, 'dim7_void'); if (a) showAchievementNotification(a.achievement); }
  }
  if (dim === 8) {
    if (!profile.achievements['dim8_cosmic']) { const a = checkAchievement(profile, 'dim8_cosmic'); if (a) showAchievementNotification(a.achievement); }
  }
}

// Export
if (typeof module !== 'undefined') module.exports = {
  ACHIEVEMENT_CATEGORIES, ACHIEVEMENTS, RARITY_COLORS, BADGES, TITLES, CALLING_CARDS,
  SQUAD_SYSTEM, KILLSTREAKS,
  createPlayerProfile, createTeamStats,
  checkAchievement, checkBadges, checkTitles,
  onKill, onDeath, onMissionComplete, onDimensionUse,
  showAchievementNotification
};
