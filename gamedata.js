// ====== CHRONOFALL — Game Data (6D Edition) ======
// Weapons, Eras, Ranks, Progression, Mission Generation

// ====== 10 MILITARY ERAS ======
const ERAS = [
  { id:0, name:'STONE AGE',          levels:[1,10],    desc:'Clubs, spears, rocks. Survival combat.', color:0x8B4513 },
  { id:1, name:'BRONZE AGE',         levels:[11,20],   desc:'Bronze swords, bows, shields.', color:0xCD7F32 },
  { id:2, name:'IRON AGE',           levels:[21,30],   desc:'Iron weapons, crossbows, siege towers.', color:0x708090 },
  { id:3, name:'MEDIEVAL',           levels:[31,40],   desc:'Longswords, catapults, early firearms.', color:0x4B0082 },
  { id:4, name:'RENAISSANCE',        levels:[41,55],   desc:'Muskets, cannons, flintlock pistols.', color:0x8B0000 },
  { id:5, name:'INDUSTRIAL WAR',     levels:[56,75],   desc:'Bolt rifles, revolvers, early MGs.', color:0x2F4F4F },
  { id:6, name:'WORLD WARS',         levels:[76,100],  desc:'Semi-auto, SMGs, tanks, planes, bombers.', color:0x556B2F },
  { id:7, name:'COLD WAR',           levels:[101,125], desc:'Assault rifles, nukes, jets, satellites.', color:0xB22222 },
  { id:8, name:'MODERN WARFARE',     levels:[126,155], desc:'Drones, stealth, smart weapons, spec ops.', color:0x1E90FF },
  { id:9, name:'NEAR FUTURE',         levels:[156,180], desc:'Railguns, powered armor, combat AI.', color:0x00CED1 },
  { id:10,name:'FAR FUTURE',         levels:[181,205], desc:'Plasma, mechs, orbital strikes, teleport.', color:0xFF00FF },
  { id:11,name:'30TH CENTURY',       levels:[206,232], desc:'Hyperspace, laser arrays, dimensional, 6D tech.', color:0x00FF88 },
];

// ====== MILITARY RANKS ======
const RANKS = [
  { name:'Recruit',         minLevel:1 },
  { name:'Private',         minLevel:3 },
  { name:'Private First Class', minLevel:6 },
  { name:'Corporal',        minLevel:10 },
  { name:'Sergeant',        minLevel:16 },
  { name:'Staff Sergeant',  minLevel:22 },
  { name:'Sergeant First Class', minLevel:30 },
  { name:'Master Sergeant',  minLevel:40 },
  { name:'Sergeant Major',  minLevel:50 },
  { name:'Warrant Officer', minLevel:60 },
  { name:'Chief Warrant Officer', minLevel:70 },
  { name:'Second Lieutenant', minLevel:82 },
  { name:'First Lieutenant', minLevel:95 },
  { name:'Captain',         minLevel:110 },
  { name:'Major',           minLevel:125 },
  { name:'Lieutenant Colonel', minLevel:140 },
  { name:'Colonel',         minLevel:155 },
  { name:'Brigadier General', minLevel:170 },
  { name:'Major General',   minLevel:185 },
  { name:'Lieutenant General', minLevel:200 },
  { name:'General',         minLevel:215 },
  { name:'General of the Army', minLevel:225 },
  { name:'Supreme Commander', minLevel:232 },
];

// ====== WEAPON DATABASE (150+ weapons across all eras) ======
const WEAPON_DB = {
  // STONE AGE (Levels 1-10)
  stone_club:      { name:'Stone Club',       era:0, dmg:15,  rate:800,  mag:1,   range:6,  type:'melee',   country:'PRIMITIVE', icon:'🏏' },
  sharpened_stick: { name:'Sharpened Stick',  era:0, dmg:20,  rate:1000, mag:1,   range:10, type:'thrown',  country:'PRIMITIVE', icon:'🥢' },
  rock:            { name:'Throwing Rock',     era:0, dmg:12,  rate:600,  mag:5,   range:15, type:'thrown',  country:'PRIMITIVE', icon:'🪨' },
  sling:           { name:'Sling',             era:0, dmg:18,  rate:800,  mag:1,   range:20, type:'thrown',  country:'PRIMITIVE', icon:'🪢' },
  bone_axe:        { name:'Bone Axe',          era:0, dmg:25,  rate:1000, mag:1,   range:6,  type:'melee',   country:'PRIMITIVE', icon:'🦴' },
  atlatl:          { name:'Atlatl Spear',       era:0, dmg:30,  rate:1200, mag:1,   range:25, type:'thrown',  country:'PRIMITIVE', icon:'🎯' },

  // BRONZE AGE (Levels 11-20)
  bronze_sword:    { name:'Bronze Sword',      era:1, dmg:35,  rate:700,  mag:1,   range:6,  type:'melee',   country:'SUMER', icon:'⚔️' },
  bronze_spear:    { name:'Bronze Spear',       era:1, dmg:30,  rate:900,  mag:1,   range:10, type:'melee',   country:'EGYPT', icon:'🔱' },
  short_bow:       { name:'Short Bow',          era:1, dmg:25,  rate:1000, mag:1,   range:30, type:'bow',     country:'EGYPT', icon:'🏹' },
  bronze_axe:      { name:'Bronze Battle Axe',   era:1, dmg:40,  rate:800,  mag:1,   range:6,  type:'melee',   country:'MESOPOTAMIA', icon:'🪓' },
  chariot_bow:     { name:'Chariot Bow',         era:1, dmg:28,  rate:800,  mag:1,   range:35, type:'bow',     country:'EGYPT', icon:'🏹' },

  // IRON AGE (Levels 21-30)
  iron_sword:      { name:'Iron Sword',          era:2, dmg:50,  rate:700,  mag:1,   range:7,  type:'melee',   country:'ROMAN', icon:'⚔️' },
  gladius:         { name:'Roman Gladius',       era:2, dmg:45,  rate:600,  mag:1,   range:6,  type:'melee',   country:'ROME', icon:'🗡️' },
  pilum:           { name:'Pilum Javelin',        era:2, dmg:40,  rate:1000, mag:2,   range:25, type:'thrown',  country:'ROME', icon:'🥢' },
  composite_bow:   { name:'Composite Bow',       era:2, dmg:35,  rate:900,  mag:1,   range:40, type:'bow',     country:'PERSIA', icon:'🏹' },
  crossbow:        { name:'Early Crossbow',      era:2, dmg:55,  rate:1500, mag:1,   range:45, type:'bow',     country:'CHINA', icon:'🏹' },
  ballista:        { name:'Ballista Bolt',        era:2, dmg:80,  rate:3000, mag:1,   range:80, type:'siege',   country:'ROME', icon:'🏰' },

  // MEDIEVAL (Levels 31-40)
  longsword:       { name:'Longsword',           era:3, dmg:60,  rate:700,  mag:1,   range:7,  type:'melee',   country:'EUROPE', icon:'⚔️' },
  war_hammer:      { name:'War Hammer',           era:3, dmg:70,  rate:900,  mag:1,   range:6,  type:'melee',   country:'EUROPE', icon:'🔨' },
  longbow:         { name:'English Longbow',      era:3, dmg:45,  rate:1000, mag:1,   range:60, type:'bow',     country:'ENGLAND', icon:'🏹' },
  heavy_crossbow:  { name:'Heavy Crossbow',       era:3, dmg:70,  rate:2000, mag:1,   range:55, type:'bow',     country:'EUROPE', icon:'🏹' },
  catapult_stone:  { name:'Catapult Stone',        era:3, dmg:120, rate:4000, mag:1,   range:100,type:'siege',   country:'EUROPE', icon:'🪨' },
  hand_cannon:     { name:'Hand Cannon',           era:3, dmg:50,  rate:2500, mag:1,   range:40, type:'firearm', country:'CHINA', icon:'💥' },
  trebuchet:       { name:'Trebuchet',             era:3, dmg:150, rate:5000, mag:1,   range:120,type:'siege',   country:'EUROPE', icon:'🏰' },

  // RENAISSANCE (Levels 41-55)
  flintlock_musket:{ name:'Flintlock Musket',     era:4, dmg:60,  rate:2000, mag:1,   range:70, type:'firearm', country:'EUROPE', icon:'🔫' },
  flintlock_pistol:{ name:'Flintlock Pistol',     era:4, dmg:40,  rate:1500, mag:1,   range:30, type:'firearm', country:'EUROPE', icon:'🔫' },
  blunderbuss:     { name:'Blunderbuss',           era:4, dmg:50,  rate:2000, mag:1,   range:20, type:'shotgun',country:'EUROPE', icon:'💥' },
  matchlock:       { name:'Matchlock Rifle',       era:4, dmg:55,  rate:2500, mag:1,   range:80, type:'firearm', country:'EUROPE', icon:'🔫' },
  cannon:          { name:'Field Cannon',          era:4, dmg:100, rate:4000, mag:1,   range:150,type:'siege',   country:'EUROPE', icon:'💣' },

  // INDUSTRIAL WAR (Levels 56-75)
  colt_revolver:   { name:'Colt Single Action',   era:5, dmg:35,  rate:500,  mag:6,   range:40, type:'pistol', country:'USA', icon:'🔫' },
  springfield_1903:{ name:'Springfield 1903',     era:5, dmg:70,  rate:1200, mag:5,   range:200,type:'rifle',  country:'USA', icon:'🔫' },
  lee_enfield:     { name:'Lee-Enfield SMLE',      era:5, dmg:65,  rate:800,  mag:10,  range:180,type:'rifle',  country:'UK', icon:'🔫' },
  maxim_gun:       { name:'Maxim Machine Gun',    era:5, dmg:25,  rate:100,  mag:250, range:120,type:'lmg',   country:'UK', icon:'🔱' },
  mauser_c96:      { name:'Mauser C96',            era:5, dmg:30,  rate:400,  mag:10,  range:50, type:'pistol', country:'GERMANY', icon:'🔫' },
  winchester:      { name:'Winchester 1897',       era:5, dmg:45,  rate:800,  mag:5,   range:35, type:'shotgun',country:'USA', icon:'💥' },
  webley:          { name:'Webley Revolver',        era:5, dmg:32,  rate:450,  mag:6,   range:35, type:'pistol', country:'UK', icon:'🔫' },
  mosin_nagant:    { name:'Mosin-Nagant',          era:5, dmg:75,  rate:1000, mag:5,   range:220,type:'rifle',  country:'RUSSIA', icon:'🔫' },

  // WORLD WARS (Levels 76-100)
  m1_garand:       { name:'M1 Garand',            era:6, dmg:65,  rate:400,  mag:8,   range:200,type:'rifle',  country:'USA', icon:'🔫' },
  thompson:        { name:'Thompson SMG',          era:6, dmg:20,  rate:100,  mag:30,  range:50, type:'smg',   country:'USA', icon:'🔫' },
  bar:             { name:'BAR M1918',             era:6, dmg:30,  rate:600,  mag:20,  range:120,type:'lmg',   country:'USA', icon:'🔫' },
  kar98k:          { name:'Kar98k',                era:6, dmg:80,  rate:1000, mag:5,   range:250,type:'rifle',  country:'GERMANY', icon:'🔫' },
  mp40:            { name:'MP40',                  era:6, dmg:18,  rate:120,  mag:32,  range:55, type:'smg',   country:'GERMANY', icon:'🔫' },
  mg42:            { name:'MG42',                  era:6, dmg:25,  rate:80,   mag:250, range:150,type:'lmg',   country:'GERMANY', icon:'🔱' },
  stg44:           { name:'StG 44',                era:6, dmg:35,  rate:300,  mag:30,  range:150,type:'rifle',  country:'GERMANY', icon:'🔫' },
  browning_50:     { name:'Browning M2 .50cal',    era:6, dmg:50,  rate:200,  mag:100, range:300,type:'hmg',   country:'USA', icon:'🔱' },
  panzerschreck:   { name:'Panzerschreck',         era:6, dmg:200, rate:3000, mag:1,   range:100,type:'rocket', country:'GERMANY', icon:'🚀' },
  ppsh:            { name:'PPSh-41',               era:6, dmg:16,  rate:60,   mag:71,  range:60, type:'smg',   country:'RUSSIA', icon:'🔫' },
  colt_1911:       { name:'Colt M1911',            era:6, dmg:30,  rate:400,  mag:7,   range:40, type:'pistol', country:'USA', icon:'🔫' },
  luger:           { name:'Luger P08',              era:6, dmg:25,  rate:400,  mag:8,   range:40, type:'pistol', country:'GERMANY', icon:'🔫' },

  // COLD WAR (Levels 101-125)
  ak47:            { name:'AK-47',                 era:7, dmg:35,  rate:300,  mag:30,  range:200,type:'rifle',  country:'RUSSIA', icon:'🔫' },
  m16_vietnam:     { name:'M16A1',                 era:7, dmg:30,  rate:400,  mag:30,  range:250,type:'rifle',  country:'USA', icon:'🔫' },
  rpg7:            { name:'RPG-7',                 era:7, dmg:200, rate:3000, mag:1,   range:120,type:'rocket', country:'RUSSIA', icon:'🚀' },
  uzi:             { name:'Uzi',                   era:7, dmg:18,  rate:80,   mag:32,  range:50, type:'smg',   country:'ISRAEL', icon:'🔫' },
  fn_fal:          { name:'FN FAL',                era:7, dmg:40,  rate:500,  mag:20,  range:250,type:'rifle',  country:'NATO', icon:'🔫' },
  dragunov:        { name:'Dragunov SVD',           era:7, dmg:90,  rate:1000, mag:10,  range:400,type:'sniper', country:'RUSSIA', icon:'🎯' },
  m60:             { name:'M60 Machine Gun',       era:7, dmg:30,  rate:100,  mag:100, range:200,type:'lmg',   country:'USA', icon:'🔱' },
  stinger:         { name:'FIM-92 Stinger',         era:7, dmg:250, rate:5000, mag:1,   range:200,type:'missile',country:'USA', icon:'🚀' },
  rpk:             { name:'RPK',                   era:7, dmg:28,  rate:120,  mag:100, range:150,type:'lmg',   country:'RUSSIA', icon:'🔱' },
  galil:           { name:'IMI Galil',              era:7, dmg:32,  rate:350,  mag:30,  range:200,type:'rifle',  country:'ISRAEL', icon:'🔫' },
  g36:             { name:'H&K G36',               era:7, dmg:33,  rate:400,  mag:30,  range:250,type:'rifle',  country:'GERMANY', icon:'🔫' },
  famas:           { name:'FAMAS',                 era:7, dmg:30,  rate:900,  mag:30,  range:200,type:'rifle',  country:'FRANCE', icon:'🔫' },

  // MODERN WARFARE (Levels 126-155)
  m4a1:            { name:'M4A1 Carbine',          era:8, dmg:32,  rate:350,  mag:30,  range:250,type:'rifle',  country:'USA', icon:'🔫' },
  ak12:            { name:'AK-12',                 era:8, dmg:35,  rate:300,  mag:30,  range:220,type:'rifle',  country:'RUSSIA', icon:'🔫' },
  scar_h:          { name:'FN SCAR-H',             era:8, dmg:45,  rate:500,  mag:20,  range:280,type:'rifle',  country:'NATO', icon:'🔫' },
  mp7:             { name:'H&K MP7',              era:8, dmg:20,  rate:70,   mag:40,  range:60, type:'smg',   country:'GERMANY', icon:'⚡' },
  awp:             { name:'AWM Sniper',            era:8, dmg:120, rate:1500, mag:5,   range:500,type:'sniper', country:'UK', icon:'🎯' },
  barrett_m82:     { name:'Barrett M82A1',         era:8, dmg:150, rate:2000, mag:10,  range:600,type:'sniper', country:'USA', icon:'🎯' },
  javelin:         { name:'FGM-148 Javelin',       era:8, dmg:300, rate:6000, mag:1,   range:250,type:'missile',country:'USA', icon:'🚀' },
  predator_drone:  { name:'MQ-1 Predator Strike',  era:8, dmg:200, rate:8000, mag:2,   range:500,type:'airstrike',country:'USA', icon:'🛩️' },
  grenade_m67:     { name:'M67 Frag Grenade',       era:8, dmg:80,  rate:3000, mag:2,   range:30, type:'grenade',country:'USA', icon:'💣' },
  flashbang:       { name:'M84 Flashbang',          era:8, dmg:5,  rate:2000, mag:1,   range:20, type:'grenade',country:'USA', icon:'💡' },
  claymore:        { name:'M18 Claymore',           era:8, dmg:100, rate:5000, mag:1,   range:15, type:'mine',   country:'USA', icon:'💣' },
  p90:             { name:'FN P90',                era:8, dmg:22,  rate:65,   mag:50,  range:70, type:'smg',   country:'NATO', icon:'⚡' },
  mk18:            { name:'Mk18 CQBR',             era:8, dmg:30,  rate:350,  mag:30,  range:200,type:'rifle',  country:'USA', icon:'🔫' },
  svd_modern:      { name:'SVDM Modern',            era:8, dmg:85,  rate:800,  mag:10,  range:400,type:'sniper', country:'RUSSIA', icon:'🎯' },
  rpk16:           { name:'RPK-16',                era:8, dmg:35,  rate:120,  mag:95,  range:180,type:'lmg',   country:'RUSSIA', icon:'🔱' },
  m320:            { name:'M320 Grenade Launcher',  era:8, dmg:90,  rate:1500, mag:1,   range:80, type:'grenade',country:'USA', icon:'💣' },

  // NEAR FUTURE (Levels 156-180)
  railgun:         { name:'EM Railgun',             era:9, dmg:180, rate:1500, mag:5,   range:800,type:'railgun',country:'USA', icon:'⚡' },
  coilgun:         { name:'Coil Rifle',             era:9, dmg:100, rate:600,  mag:10,  range:400,type:'railgun',country:'NATO', icon:'⚡' },
  laser_carbine:   { name:'Laser Carbine',          era:9, dmg:50,  rate:200,  mag:50,  range:300,type:'laser',  country:'USA', icon:'🔦' },
  emp_grenade:     { name:'EMP Grenade',            era:9, dmg:30,  rate:3000, mag:2,   range:30, type:'grenade',country:'NATO', icon:'💣' },
  rail_sniper:     { name:'Rail Sniper',            era:9, dmg:250, rate:2500, mag:3,   range:1000,type:'sniper', country:'USA', icon:'🎯' },
  smart_rifle:     { name:'Smart Rifle (AI-Aim)',   era:9, dmg:55,  rate:300,  mag:20,  range:400,type:'rifle',  country:'NATO', icon:'🔫' },
  exo_suit_fist:   { name:'Exosuit Punch',          era:9, dmg:120, rate:600,  mag:0,   range:5,  type:'melee',  country:'USA', icon:'👊' },
  plasma_pistol:   { name:'Plasma Pistol',           era:9, dmg:40,  rate:400,  mag:20,  range:60, type:'energy', country:'NATO', icon:'🔦' },
  combat_drone:    { name:'Combat Drone Strike',     era:9, dmg:150, rate:6000, mag:1,   range:600,type:'airstrike',country:'USA', icon:'🛩️' },
  sonic_cannon:    { name:'Sonic Cannon',            era:9, dmg:70,  rate:1000, mag:5,   range:80, type:'energy', country:'NATO', icon:'🔊' },

  // FAR FUTURE (Levels 181-205)
  plasma_rifle:    { name:'Plasma Rifle',           era:10, dmg:80,  rate:250,  mag:40,  range:400,type:'energy', country:'GALACTIC', icon:'🔥' },
  plasma_shotgun:  { name:'Plasma Scatter',          era:10, dmg:120, rate:700,  mag:8,   range:50, type:'shotgun',country:'GALACTIC', icon:'💥' },
  pulse_cannon:    { name:'Pulse Cannon',           era:10, dmg:100, rate:400,  mag:20,  range:300,type:'energy', country:'GALACTIC', icon:'✨' },
  laser_minigun:   { name:'Laser Minigun',          era:10, dmg:40,  rate:30,   mag:200, range:250,type:'lmg',   country:'GALACTIC', icon:'🔱' },
  rail_gun_heavy:  { name:'Heavy Railgun',           era:10, dmg:300, rate:2000, mag:3,   range:1500,type:'railgun',country:'GALACTIC', icon:'⚡' },
  ion_grenade:    { name:'Ion Grenade',             era:10, dmg:150, rate:3000, mag:3,   range:40, type:'grenade',country:'GALACTIC', icon:'💣' },
  mech_cannon:     { name:'Mech Cannon',             era:10, dmg:200, rate:800,  mag:15,  range:500,type:'rifle',  country:'GALACTIC', icon:'🤖' },
  teleport_mine:   { name:'Teleport Mine',           era:10, dmg:100, rate:5000, mag:2,   range:50, type:'mine',   country:'GALACTIC', icon:'🌀' },
  emp_cannon:      { name:'EMP Cannon',              era:10, dmg:60,  rate:1500, mag:10,  range:200,type:'energy', country:'GALACTIC', icon:'⚡' },
  shield_regen:    { name:'Regen Shield',            era:10, dmg:0,  rate:10000,mag:1,   range:0,  type:'utility',country:'GALACTIC', icon:'🛡️' },
  orbital_strike:  { name:'Orbital Strike',          era:10, dmg:500, rate:15000,mag:1,   range:1000,type:'airstrike',country:'GALACTIC', icon:'🛰️' },
  quantum_rifle:   { name:'Quantum Rifle',           era:10, dmg:90,  rate:200,  mag:30,  range:500,type:'energy', country:'GALACTIC', icon:'🌌' },

  // 30TH CENTURY (Levels 206-232)
  hyperspace_cannon:{name:'Hyperspace Cannon',     era:11, dmg:400, rate:2000, mag:5,   range:2000,type:'energy', country:'STELLAR', icon:'🌌' },
  laser_array:      { name:'Laser Array',           era:11, dmg:60,  rate:50,   mag:300, range:500,type:'laser',  country:'STELLAR', icon:'⚡' },
  dimensional_blade:{ name:'Dimensional Blade',     era:11, dmg:200, rate:400,  mag:0,   range:8,  type:'melee',  country:'STELLAR', icon:'⚔️' },
  antimatter_rifle: { name:'Antimatter Rifle',      era:11, dmg:350, rate:1500, mag:10,  range:800,type:'energy', country:'STELLAR', icon:'💫' },
  singularity_grenade:{name:'Singularity Grenade', era:11, dmg:300, rate:8000, mag:1,   range:50, type:'grenade',country:'STELLAR', icon:'🕳️' },
  phase_rifle:      { name:'Phase Rifle',            era:11, dmg:120, rate:200,  mag:25,  range:600,type:'energy', country:'STELLAR', icon:'🌀' },
  void_cannon:      { name:'Void Cannon',            era:11, dmg:500, rate:3000, mag:3,   range:1500,type:'energy', country:'STELLAR', icon:'🕳️' },
  chronoblade:      { name:'Chronoblade',            era:11, dmg:250, rate:300,  mag:0,   range:10, type:'melee',  country:'STELLAR', icon:'⏳' },
  tachyon_sniper:   { name:'Tachyon Sniper',         era:11, dmg:600, rate:3000, mag:5,   range:5000,type:'sniper', country:'STELLAR', icon:'🎯' },
  starship_laser:   { name:'Starship Laser',         era:11, dmg:800, rate:5000, mag:3,   range:3000,type:'airstrike',country:'STELLAR', icon:'🛸' },
  quantum_cannon:   { name:'Quantum Cannon',         era:11, dmg:450, rate:1000, mag:15,  range:2000,type:'energy', country:'STELLAR', icon:'🌌' },
  dimensional_rift:  { name:'Dimensional Rift Gun',  era:11, dmg:300, rate:4000, mag:2,   range:100, type:'special',country:'STELLAR', icon:'🌀' },
  hyperspace_jump:  { name:'Hyperspace Jump Drive',  era:11, dmg:0,  rate:10000,mag:1,   range:0,  type:'utility',country:'STELLAR', icon:'🚀' },
  camouflage_suit:  { name:'Adaptive Camo Suit',     era:11, dmg:0,  rate:8000, mag:1,   range:0,  type:'utility',country:'STELLAR', icon:'🫥' },
  chrono_storm_ult: { name:'Chrono Storm Ultimate', era:11, dmg:0,  rate:30000,mag:1,   range:0,  type:'special',country:'STELLAR', icon:'🌪️' },
  "6d_phase_cannon":  { name:'6D Phase Cannon',       era:11, dmg:350, rate:800,  mag:20,  range:1000,type:'energy', country:'STELLAR', icon:'🔮' },
};

// ====== MILITARY UNITS ======
const MILITARY_UNITS = {
  infantry:       { name:'Infantry',         unlockLevel:1,   desc:'Standard ground forces' },
  cavalry:       { name:'Cavalry',          unlockLevel:11,  desc:'Mounted units, fast movement' },
  archers:       { name:'Archers',          unlockLevel:11,  desc:'Ranged support units' },
  siege:         { name:'Siege Corps',      unlockLevel:21,  desc:'Heavy artillery units' },
  artillery:     { name:'Artillery',        unlockLevel:56,  desc:'Long-range bombardment' },
  armored:       { name:'Armored Division', unlockLevel:76,  desc:'Tanks and armored vehicles' },
  airforce:      { name:'Air Force',        unlockLevel:76,  desc:'Aircraft and bombing runs' },
  airborne:      { name:'Airborne',         unlockLevel:101, desc:'Paratrooper drops' },
  special_ops:   { name:'Special Forces',   unlockLevel:126, desc:'Stealth and precision ops' },
  naval:         { name:'Naval Division',   unlockLevel:126, desc:'Sea-based operations' },
  marines:       { name:'Marine Corps',     unlockLevel:155, desc:'Amphibious assault units' },
  mech_infantry: { name:'Mech Infantry',    unlockLevel:156, desc:'Powered exoskeleton troops' },
  drone_wing:    { name:'Drone Wing',       unlockLevel:156, desc:'Autonomous combat drones' },
  orbital:       { name:'Orbital Command',  unlockLevel:181, desc:'Space-based weapons platform' },
  stellar:       { name:'Stellar Fleet',    unlockLevel:206, desc:'Interstellar warships' },
  dimensional:   { name:'Dimensional Corps',unlockLevel:220, desc:'6D warfare specialists' },
};

// ====== VEHICLES ======
const VEHICLE_DB = {
  chariot:       { name:'War Chariot',        era:1, speed:0.3, armor:50,  seats:2, icon:'🐎' },
  warhorse:      { name:'Warhorse',           era:2, speed:0.35,armor:30,  seats:1, icon:'🐴' },
  tank_ww1:      { name:'Mark IV Tank',       era:6, speed:0.15,armor:200, seats:4, icon:'🚜' },
  tank_modern:   { name:'M1 Abrams',         era:8, speed:0.5, armor:500, seats:4, icon:'🛡️' },
  jeep:          { name:'Humvee',            era:8, speed:0.6, armor:100, seats:4, icon:'🚙' },
  apc:           { name:'BTR-80 APC',        era:8, speed:0.45,armor:300, seats:8, icon:'🚛' },
  mech:          { name:'Combat Mech',       era:9, speed:0.4, armor:800, seats:1, icon:'🤖' },
  hover_tank:     { name:'Hover Tank',        era:10,speed:0.7, armor:1000,seats:2, icon:'🛸' },
  dropship:      { name:'Dropship',          era:10,speed:1.0, armor:600, seats:8, icon:'🚁' },
  starship:      { name:'Stellar Warship',   era:11,speed:2.0, armor:2000,seats:10,icon:'🛸' },
  hypership:     { name:'Hyperspace Jumper',  era:11,speed:5.0, armor:1500,seats:4, icon:'🌌' },
};

// ====== MISSION TYPES ======
const MISSION_TYPES = [
  { id:'eliminate',  name:'Elimination',     desc:'Kill all enemies in the area',         objective:'Eliminate {n} enemies' },
  { id:'defend',     name:'Defense',         desc:'Hold your position against waves',     objective:'Survive {n} waves' },
  { id:'capture',    name:'Capture Point',   desc:'Capture and hold the objective',        objective:'Capture {n} points' },
  { id:'extract',    name:'Extraction',      desc:'Reach the extraction zone alive',       objective:'Reach extraction point' },
  { id:'destroy',   name:'Demolition',      desc:'Destroy enemy assets',                  objective:'Destroy {n} targets' },
  { id:'assassinate',name:'Assassination',  desc:'Eliminate the HVT',                     objective:'Eliminate the target' },
  { id:'survive',    name:'Survival',       desc:'Last one standing',                     objective:'Survive for {n} seconds' },
  { id:'race',       name:'Time Trial',     desc:'Complete the course fast',              objective:'Complete in {n}s' },
  { id:'stealth',    name:'Stealth Op',     desc:'Complete without detection',            objective:'Undetected elimination' },
  { id:'boss',       name:'Boss Fight',     desc:'Defeat the boss enemy',                 objective:'Defeat the boss' },
  { id:'horde',      name:'Horde Mode',     desc:'Survive endless waves',                 objective:'Reach wave {n}' },
  { id:'rescue',     name:'Hostage Rescue', desc:'Rescue the hostages',                   objective:'Rescue {n} hostages' },
  { id:'bomb',       name:'Bomb Defusal',   desc:'Defuse the chrono bomb',                objective:'Defuse within {n}s' },
];

// ====== STRAP TYPES (4 per step) ======
const STRAP_TYPES = [
  { id:0, name:'Alpha', desc:'Primary objective',           reward:'Standard XP' },
  { id:1, name:'Bravo', desc:'Secondary challenge',          reward:'Bonus XP + Weapon unlock' },
  { id:2, name:'Charlie',desc:'Special condition',           reward:'Cosmetic unlock' },
  { id:3, name:'Delta', desc:'Elite challenge',              reward:'Rank points + Special item' },
];

// ====== PROGRESSION SYSTEM ======
function getEraForLevel(level) {
  for (const era of ERAS) {
    if (level >= era.levels[0] && level <= era.levels[1]) return era;
  }
  return ERAS[ERAS.length-1];
}

function getRankForLevel(level) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.minLevel) rank = r;
  }
  return rank;
}

function getWeaponsForEra(eraId) {
  const weapons = [];
  for (const [key, w] of Object.entries(WEAPON_DB)) {
    if (w.era === eraId) weapons.push({ key, ...w });
  }
  // Also include previous era weapons (you keep older weapons)
  if (eraId > 0) {
    for (const [key, w] of Object.entries(WEAPON_DB)) {
      if (w.era === eraId - 1) weapons.push({ key, ...w });
    }
  }
  return weapons;
}

function generateMission(level, step, strap) {
  const era = getEraForLevel(level);
  const rank = getRankForLevel(level);
  const eraWeapons = getWeaponsForEra(era.id);

  // Pick mission type based on era progression
  const missionTypeIdx = (level + step + strap) % MISSION_TYPES.length;
  const missionType = MISSION_TYPES[missionTypeIdx];
  const strapType = STRAP_TYPES[strap];

  // Difficulty scales with level
  const difficulty = 1 + (level / 232) * 9; // 1.0 to 10.0
  const enemyCount = Math.floor(3 + difficulty * (strap + 1) * 0.5);
  const timeLimit = strap >= 2 ? Math.floor(60 + difficulty * 10) : 0;
  const xpReward = 100 * level * (strap + 1);

  // Generate objectives
  let objectives = [];
  switch (missionType.id) {
    case 'eliminate':  objectives.push(`Eliminate ${enemyCount} enemies`); break;
    case 'defend':     objectives.push(`Survive ${Math.min(strap+2, 5)} waves`); break;
    case 'capture':    objectives.push(`Capture ${Math.min(strap+1, 4)} points`); break;
    case 'extract':    objectives.push(`Reach extraction point`); break;
    case 'destroy':    objectives.push(`Destroy ${enemyCount} targets`); break;
    case 'assassinate':objectives.push(`Eliminate the HVT`); break;
    case 'survive':    objectives.push(`Survive ${60+difficulty*15} seconds`); break;
    case 'race':       objectives.push(`Complete in ${timeLimit}s`); break;
    case 'stealth':    objectives.push(`Eliminate ${enemyCount} undetected`); break;
    case 'boss':       objectives.push(`Defeat ${era.name} Boss`); break;
    case 'horde':      objectives.push(`Reach wave ${Math.floor(difficulty*2)}`); break;
    case 'rescue':     objectives.push(`Rescue ${Math.min(strap+2, 5)} hostages`); break;
    case 'bomb':       objectives.push(`Defuse within ${timeLimit}s`); break;
  }

  // Strap-specific modifiers
  let modifier = '';
  if (strap === 1) modifier = 'No secondary weapon';
  else if (strap === 2) modifier = 'Reduced health (50%)';
  else if (strap === 3) modifier = 'Elite enemies + time limit';

  // Recommended weapon
  const recWeapon = eraWeapons[Math.floor(Math.random() * eraWeapons.length)];

  return {
    level, step, strap,
    era: era.name,
    rank: rank.name,
    type: missionType.name,
    description: missionType.desc,
    strapName: strapType.name,
    objectives,
    modifier,
    difficulty,
    enemyCount,
    timeLimit,
    xpReward,
    recommendedWeapon: recWeapon.name,
    rewards: strapType.reward,
    title: `Lv.${level} Step ${step} - ${strapType.name} - ${missionType.name}`
  };
}

// ====== PLAYER PROGRESS ======
let playerProgress = {
  currentLevel: 1,
  currentStep: 1,
  currentStrap: 0,
  totalXP: 0,
  completedMissions: [],
  unlockedWeapons: ['stone_club', 'sharpened_stick', 'rock'],
  unlockedVehicles: [],
  unlockedUnits: ['infantry'],
  kills: 0,
  deaths: 0,
  rank: 'Recruit',
};

function completeMission(mission) {
  const key = `${mission.level}-${mission.step}-${mission.strap}`;
  if (!playerProgress.completedMissions.includes(key)) {
    playerProgress.completedMissions.push(key);
    playerProgress.totalXP += mission.xpReward;
    playerProgress.kills += mission.enemyCount;

    // Advance progress
    playerProgress.currentStrap++;
    if (playerProgress.currentStrap >= 4) {
      playerProgress.currentStrap = 0;
      playerProgress.currentStep++;
      if (playerProgress.currentStep > 13) {
        playerProgress.currentStep = 1;
        playerProgress.currentLevel++;
        // Level up — unlock new era weapons
        const era = getEraForLevel(playerProgress.currentLevel);
        const newWeapons = getWeaponsForEra(era.id);
        for (const w of newWeapons) {
          if (!playerProgress.unlockedWeapons.includes(w.key)) {
            playerProgress.unlockedWeapons.push(w.key);
          }
        }
        // Unlock units
        for (const [key, unit] of Object.entries(MILITARY_UNITS)) {
          if (playerProgress.currentLevel >= unit.unlockLevel && !playerProgress.unlockedUnits.includes(key)) {
            playerProgress.unlockedUnits.push(key);
          }
        }
        // Unlock vehicles
        for (const [key, v] of Object.entries(VEHICLE_DB)) {
          const vEra = ERAS[v.era];
          if (playerProgress.currentLevel >= vEra.levels[0] && !playerProgress.unlockedVehicles.includes(key)) {
            playerProgress.unlockedVehicles.push(key);
          }
        }
      }
    }

    playerProgress.rank = getRankForLevel(playerProgress.currentLevel).name;
  }
  return playerProgress;
}

function getCurrentMission() {
  return generateMission(playerProgress.currentLevel, playerProgress.currentStep, playerProgress.currentStrap);
}

function getProgressPercent() {
  return (playerProgress.currentLevel / 232) * 100;
}

// Export for use in game
if (typeof module !== 'undefined') module.exports = {
  ERAS, RANKS, WEAPON_DB, MILITARY_UNITS, VEHICLE_DB, MISSION_TYPES, STRAP_TYPES,
  getEraForLevel, getRankForLevel, getWeaponsForEra, generateMission,
  playerProgress, completeMission, getCurrentMission, getProgressPercent
};
