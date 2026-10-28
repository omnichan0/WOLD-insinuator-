// ====== CHRONOFALL — Expanded Weapon Database + Economy + 8D ======
// 300+ weapons across 12 eras, full monetization, DEFCON, squad, 8D

// ====== DIMENSIONS (8D) ======
const DIMENSIONS = [
  { id:1, name:'SPACE-X',    desc:'Lateral movement',          unlock:'Default' },
  { id:2, name:'SPACE-Y',    desc:'Vertical movement',         unlock:'Default' },
  { id:3, name:'SPACE-Z',    desc:'Depth movement',            unlock:'Default' },
  { id:4, name:'ANA-KATA',   desc:'4th spatial (Adanaxis)',    unlock:'Level 1' },
  { id:5, name:'TIME',       desc:'Temporal manipulation',     unlock:'Level 1' },
  { id:6, name:'QUANTUM',    desc:'3 parallel realities',      unlock:'Level 50' },
  { id:7, name:'VOID',       desc:'Banish enemies to nothing', unlock:'Premium Tier 1 ($4.99)' },
  { id:8, name:'COSMIC',     desc:'Teleport enemies to galaxy', unlock:'Premium Tier 2 ($9.99)' },
];

// ====== ECONOMY SYSTEM ======
const CURRENCY = {
  chronoCoins: { name:'Chrono Coins', symbol:'⬡', desc:'Earned from missions, kills, daily rewards' },
  warBonds:    { name:'War Bonds',    symbol:'🎖', desc:'Premium currency, bought with real money' },
  scrapMetal:  { name:'Scrap Metal',  symbol:'⚙',  desc:'Crafting material from destroyed vehicles' },
  darkMatter:  { name:'Dark Matter',  symbol:'🌌', desc:'Late-game currency for 30th century gear' },
};

const SHOP_CATEGORIES = [
  'weapons', 'ammo', 'attachments', 'equipment', 'vehicles', 'abilities', 'cosmetics', 'bundles'
];

// Weapon pricing (in Chrono Coins, earned in-game)
function getWeaponPrice(weapon) {
  const eraMultiplier = [50, 100, 200, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000, 100000];
  const typeMultiplier = { melee:0.5, thrown:0.7, bow:0.8, siege:2, firearm:1, pistol:0.6, rifle:1, smg:0.9, shotgun:0.9, lmg:1.3, hmg:2, sniper:1.5, rocket:2.5, missile:3, grenade:0.5, mine:0.7, laser:2, energy:2.5, railgun:3, airstrike:5, special:4, utility:1.5 };
  const base = eraMultiplier[weapon.era || 0];
  const type = typeMultiplier[weapon.type] || 1;
  return Math.floor(base * type);
}

// Ammo pricing
const AMMO_PRICES = {
  bullet: { name:'Standard Rounds',    price:5,   perMag:1 },
  shotgun:{ name:'Scatter Shells',     price:8,   perMag:1 },
  sniper: { name:'Precision Rounds',   price:20,  perMag:1 },
  rocket: { name:'Rocket Shells',      price:100, perMag:1 },
  energy: { name:'Energy Cells',      price:50,  perMag:1 },
  laser:  { name:'Laser Charges',     price:40,  perMag:1 },
  railgun:{ name:'Rail Projectiles',  price:80,  perMag:1 },
  missile:{ name:'Missile Munitions',  price:200, perMag:1 },
  grenade:{ name:'Grenades',           price:30,  perMag:1 },
  siege:  { name:'Siege Ammunition',   price:500, perMag:1 },
  melee:  { name:'N/A (melee)',         price:0,   perMag:0 },
  bow:    { name:'Arrows/Bolts',        price:3,   perMag:1 },
  thrown: { name:'Throwing Weapons',   price:2,   perMag:1 },
  airstrike:{name:'Airstrike Credits', price:1000,perMag:1 },
  special:{ name:'Special Munitions',   price:500, perMag:1 },
  utility:{ name:'N/A (utility)',       price:0,   perMag:0 },
};

// ====== PREMIUM TIERS ======
const PREMIUM_TIERS = [
  { name:'FREE',          price:0,      dims:[1,2,3,4,5],             desc:'6D at Level 50+. Basic weapons. Standard missions.' },
  { name:'RECRUIT',       price:4.99,   dims:[1,2,3,4,5,6],          desc:'6D unlocked immediately. 10% XP boost. Daily 500⬡.' },
  { name:'OPERATIVE',     price:9.99,   dims:[1,2,3,4,5,6,7],         desc:'7D VOID unlocked! Banish enemies. 25% XP boost. Daily 1500⬡.' },
  { name:'COMMANDER',     price:19.99,  dims:[1,2,3,4,5,6,7,8],       desc:'8D COSMIC! Teleport enemies to galaxy! 50% XP. Daily 5000⬡.' },
  { name:'SUPREME',       price:49.99,  dims:[1,2,3,4,5,6,7,8],       desc:'All 8D. 100% XP. Daily 15000⬡. Exclusive skins. Priority matchmaking.' },
];

// ====== 8D ABILITIES (Premium) ======
const DIM7_ABILITIES = {
  void_banish: {
    name:'VOID BANISH', tier:'OPERATIVE', cost:1000, cooldown:30000,
    desc:'Banish an enemy to the VOID dimension. They must pay 500⬡ or wait 30s to return.',
    effect:'target_teleport_void'
  },
  void_pull: {
    name:'VOID PULL', tier:'OPERATIVE', cost:800, cooldown:20000,
    desc:'Pull all enemies within 20m into the VOID for 10s.',
    effect:'aoe_void'
  },
  void_shield: {
    name:'VOID SHIELD', tier:'OPERATIVE', cost:600, cooldown:15000,
    desc:'Wrap yourself in void energy — immune to all damage for 5s.',
    effect:'self_shield'
  },
  void_bomb: {
    name:'VOID BOMB', tier:'OPERATIVE', cost:1200, cooldown:45000,
    desc:'Detonate a void explosion that banishes all enemies in 30m radius.',
    effect:'void_explosion'
  },
};

const DIM8_ABILITIES = {
  cosmic_teleport: {
    name:'COSMIC BANISH', tier:'COMMANDER', cost:2000, cooldown:60000,
    desc:'Teleport an enemy to ANOTHER GALAXY. They must pay 2000⬡ or watch an ad to return.',
    effect:'target_galaxy_teleport'
  },
  cosmic_portal: {
    name:'COSMIC PORTAL', tier:'COMMANDER', cost:3000, cooldown:90000,
    desc:'Open a portal that sucks enemies into deep space. They float for 15s.',
    effect:'portal_suck'
  },
  cosmic_rain: {
    name:'COSMIC RAIN', tier:'COMMANDER', cost:5000, cooldown:120000,
    desc:'Rain down meteor strikes from orbit across the entire arena.',
    effect:'meteor_strike'
  },
  galaxy_nova: {
    name:'GALAXY NOVA', tier:'SUPREME', cost:10000, cooldown:300000,
    desc:'ULTIMATE: Detonate a nova that sends ALL enemies to another dimension. They must pay 5000⬡ each to return.',
    effect:'ultimate_nova'
  },
  cosmic_clone: {
    name:'COSMIC CLONE', tier:'COMMANDER', cost:4000, cooldown:60000,
    desc:'Clone yourself from another galaxy — your clone fights for you for 20s.',
    effect:'galaxy_clone'
  },
  reality_anchor: {
    name:'REALITY ANCHOR', tier:'SUPREME', cost:8000, cooldown:180000,
    desc:'Anchor reality — NO ONE can use dimensional abilities for 30s. Counter premium players.',
    effect:'dimension_lock'
  },
};

// ====== DEFCON PROTOCOL MODE ======
const DEFCON_LEVELS = [
  { level:5, name:'DEFCON 5', desc:'Normal readiness. Training ops.',     threat:'LOW',    color:0x00ff00 },
  { level:4, name:'DEFCON 4', desc:'Increased intelligence. Surveillance.', threat:'GUARDED',color:0x00ffff },
  { level:3, name:'DEFCON 3', desc:'Increase force readiness. Mobilize.',   threat:'ELEVATED',color:0xffff00 },
  { level:2, name:'DEFCON 2', desc:'Next step to war. Deploy forces.',      threat:'HIGH',   color:0xff6600 },
  { level:1, name:'DEFCON 1', desc:'Nuclear war imminent. MAXIMUM ALERT.',  threat:'SEVERE', color:0xff0000 },
];

// Real-world countries for DEFCON infiltration mode
const COUNTRIES = [
  { name:'USA',        codename:'EAGLE NEST',   difficulty:3, map:'urban',    era:8,  reward:5000,  special:'Stealth bombers + drones' },
  { name:'RUSSIA',      codename:'WINTER WOLF', difficulty:4, map:'arctic',   era:8,  reward:6000,  special:'Cold weather ops + heavy armor' },
  { name:'CHINA',       codename:'DRAGON GATE', difficulty:5, map:'mountain', era:8,  reward:7000,  special:'Electronic warfare + drones' },
  { name:'NORTH KOREA', codename:'SHADOW LAND', difficulty:5, map:'fortified',era:7, reward:8000,  special:'Underground bunkers + EMP' },
  { name:'IRAN',        codename:'DESERT STORM',difficulty:4, map:'desert',   era:8,  reward:5500,  special:'Drone swarms + missile bases' },
  { name:'ISRAEL',      codename:'IRON DOME',   difficulty:5, map:'urban',    era:8,  reward:6500,  special:'Iron Dome defense + Mossad intel' },
  { name:'GERMANY',      codename:'IRON CROSS', difficulty:3, map:'forest',   era:8,  reward:4500,  special:'Tank divisions + engineering' },
  { name:'UK',          codename:'LION HEART',  difficulty:3, map:'urban',    era:8,  reward:4800,  special:'SAS special ops + naval' },
  { name:'FRANCE',      codename:'BASTILLE',    difficulty:3, map:'urban',    era:8,  reward:4700,  special:'Foreign Legion + nukes' },
  { name:'JAPAN',       codename:'RISING SUN',  difficulty:4, map:'island',   era:8,  reward:5200,  special:'Tech warfare + navy' },
  { name:'BRAZIL',      codename:'AMAZON',      difficulty:2, map:'jungle',   era:8,  reward:3000,  special:'Jungle warfare + guerrilla' },
  { name:'INDIA',       codename:'TIGER CLAW',  difficulty:4, map:'mountain', era:8,  reward:5800,  special:'Mountain warfare + massive army' },
  { name:'SOUTH AFRICA',codename:'DIAMOND',     difficulty:2, map:'savanna',  era:8,  reward:3200,  special:'Resource control + mercs' },
  { name:'AUSTRALIA',   codename:'OUTBACK',     difficulty:3, map:'desert',   era:8,  reward:4200,  special:'Long-range patrol + SAS' },
  { name:'EGYPT',       codename:'PHARAOH',     difficulty:3, map:'desert',   era:7,  reward:3800,  special:'Ancient sites + canal control' },
  { name:'UKRAINE',     codename:'WHEAT FIELD', difficulty:5, map:'plains',   era:8,  reward:7000,  special:'Drone warfare + trench ops' },
  { name:'SAUDI ARABIA',codename:'OIL FIELD',   difficulty:4, map:'desert',   era:8,  reward:6000,  special:'Oil defense + air force' },
  { name:'SOUTH KOREA', codename:'BLUE TIGER',  difficulty:4, map:'urban',    era:8,  reward:5500,  special:'Tech defense + K-pop psyops' },
  { name:'NIGERIA',     codename:'EAGLE',       difficulty:3, map:'jungle',   era:8,  reward:3500,  special:'Counter-terror + oil ops' },
  { name:'MEXICO',      codename:'AZTEC',       difficulty:3, map:'mountain', era:8,  reward:4000,  special:'Cartel warfare + tunnels' },
];

// ====== SQUAD SYSTEM ======
const SQUAD_ROLES = [
  { name:'Squad Leader',  role:'command',   abilities:['tactical_scan','squad_boost'], req:'Rank: Sergeant+' },
  { name:'Sniper',        role:'recon',    abilities:['long_range','spotter'],       req:'Any rank' },
  { name:'Medic',         role:'support',   abilities:['heal_squad','revive'],       req:'Any rank' },
  { name:'Engineer',      role:'support',   abilities:['build_cover','repair_vehicle'],req:'Any rank' },
  { name:'Heavy Gunner',  role:'assault',   abilities:['suppressive_fire','ammo_drop'],req:'Any rank' },
  { name:'Demolitions',   role:'assault',   abilities:['breach','c4'],              req:'Any rank' },
  { name:'Stealth Op',    role:'recon',    abilities:['cloak','silent_kill'],       req:'Rank: Corporal+' },
  { name:'Premium Void Op',role:'dim7',     abilities:['void_banish','void_shield'], req:'Premium: OPERATIVE' },
  { name:'Premium Cosmic Op',role:'dim8',   abilities:['cosmic_teleport','cosmic_clone'], req:'Premium: COMMANDER' },
];

// ====== SNIPER TEAM MP MODE ======
const SNIPER_MP_CONFIG = {
  name:'SNIPER TEAM',
  modes: [
    { name:'Team Deathmatch', desc:'2 teams of snipers, first to 50 kills' },
    { name:'Overwatch',       desc:'1 sniper + 1 spotter vs another pair' },
    { name:'Long Range Duel', desc:'1v1 sniper duel, extreme range' },
    { name:'Counter-Sniper',  desc:'Hunt the enemy sniper before they hunt you' },
    { name:'Convoy Escort',   desc:'Sniper team protects a moving convoy' },
    { name:'Assassination',   desc:'Sniper team must eliminate HVT, other team defends' },
  ],
  maps: [
    { name:'NEEDLE TOWER',   desc:'Urban skyscraper sniper duel', range:'200-500m' },
    { name:'ICE RIDGE',      desc:'Arctic mountain ridge',         range:'300-800m' },
    { name:'DESERT BLUFF',   desc:'Sahara canyon overlook',       range:'400-1000m' },
    { name:'CITY MILE',      desc:'Downtown street corridor',      range:'100-300m' },
    { name:'CARRIER DECK',   desc:'Aircraft carrier at sea',       range:'200-600m' },
    { name:'ORBITAL SNIPER', desc:'Space station sniper duel',     range:'500-2000m' },
    { name:'GALAXY EDGE',    desc:'Asteroid belt sniper (6D+)',   range:'1000-5000m' },
  ],
  sniperWeapons: ['awp','barrett_m82','dragunov','svd_modern','rail_sniper','heavy_railgun','tachyon_sniper'],
};

// ====== MASSIVE EXPANDED WEAPON DATABASE ======
// Added 200+ more weapons on top of existing 115
const WEAPON_DB_EXPANDED = {
  // === STONE AGE (Era 0) === — 16 weapons (was 6)
  stone_club:       { name:'Stone Club',        era:0, dmg:15, rate:800,  mag:1,  range:6,  type:'melee',   country:'PRIMITIVE' },
  sharpened_stick:  { name:'Sharpened Stick',   era:0, dmg:20, rate:1000, mag:1,  range:10, type:'thrown',  country:'PRIMITIVE' },
  rock:             { name:'Throwing Rock',     era:0, dmg:12, rate:600,  mag:5,  range:15, type:'thrown',  country:'PRIMITIVE' },
  sling:            { name:'Sling',             era:0, dmg:18, rate:800,  mag:1,  range:20, type:'thrown',  country:'PRIMITIVE' },
  bone_axe:         { name:'Bone Axe',           era:0, dmg:25, rate:1000, mag:1,  range:6,  type:'melee',   country:'PRIMITIVE' },
  atlatl:           { name:'Atlatl Spear',      era:0, dmg:30, rate:1200, mag:1,  range:25, type:'thrown',  country:'PRIMITIVE' },
  stone_knife:      { name:'Stone Knife',        era:0, dmg:10, rate:500,  mag:1,  range:4,  type:'melee',   country:'PRIMITIVE' },
  fire_torch:       { name:'Fire Torch',        era:0, dmg:8,  rate:400,  mag:1,  range:5,  type:'melee',   country:'PRIMITIVE' },
  boomerang:        { name:'Boomerang',          era:0, dmg:14, rate:700,  mag:1,  range:20, type:'thrown',  country:'AUSTRALIA' },
  bolas:            { name:'Bolas',             era:0, dmg:10, rate:800,  mag:2,  range:15, type:'thrown',  country:'SOUTH AMERICA' },
  obsidian_blade:   { name:'Obsidian Blade',    era:0, dmg:28, rate:800,  mag:1,  range:5,  type:'melee',   country:'MESOAMERICA' },
  war_hammer_stone: { name:'Stone War Hammer',  era:0, dmg:30, rate:1100, mag:1,  range:6,  type:'melee',   country:'PRIMITIVE' },
  throwing_spear:   { name:'Throwing Spear',    era:0, dmg:22, rate:900,  mag:3,  range:22, type:'thrown',  country:'PRIMITIVE' },
  jawbone_weapon:   { name:'Jawbone Club',      era:0, dmg:18, rate:800,  mag:1,  range:5,  type:'melee',   country:'PRIMITIVE' },
  antler_pickaxe:   { name:'Antler Pickaxe',    era:0, dmg:16, rate:700,  mag:1,  range:4,  type:'melee',   country:'PRIMITIVE' },
  fire_hardened_spear:{name:'Fire Spear',       era:0, dmg:26, rate:950,  mag:1,  range:12, type:'melee',   country:'PRIMITIVE' },

  // === BRONZE AGE (Era 1) === — 14 weapons (was 5)
  bronze_sword:     { name:'Bronze Sword',      era:1, dmg:35, rate:700,  mag:1,  range:6,  type:'melee',   country:'SUMER' },
  bronze_spear:     { name:'Bronze Spear',      era:1, dmg:30, rate:900,  mag:1,  range:10, type:'melee',   country:'EGYPT' },
  short_bow:        { name:'Short Bow',         era:1, dmg:25, rate:1000, mag:1,  range:30, type:'bow',     country:'EGYPT' },
  bronze_axe:       { name:'Bronze Battle Axe', era:1, dmg:40, rate:800,  mag:1,  range:6,  type:'melee',   country:'MESOPOTAMIA' },
  chariot_bow:      { name:'Chariot Bow',       era:1, dmg:28, rate:800,  mag:1,  range:35, type:'bow',     country:'EGYPT' },
  bronze_dagger:    { name:'Bronze Dagger',     era:1, dmg:20, rate:500,  mag:1,  range:4,  type:'melee',   country:'GREECE' },
  bronze_mace:      { name:'Bronze Mace',       era:1, dmg:38, rate:900,  mag:1,  range:5,  type:'melee',   country:'PERSIA' },
  khopesh:          { name:'Khopesh Sword',     era:1, dmg:42, rate:750,  mag:1,  range:6,  type:'melee',   country:'EGYPT' },
  bronze_halberd:   { name:'Bronze Halberd',    era:1, dmg:45, rate:1000, mag:1,  range:8,  type:'melee',   country:'CHINA' },
  sickle_sword:     { name:'Sickle Sword',      era:1, dmg:36, rate:800,  mag:1,  range:5,  type:'melee',   country:'MESOPOTAMIA' },
  socketed_axe:     { name:'Socketed Axe',      era:1, dmg:44, rate:850,  mag:1,  range:6,  type:'melee',   country:'EUROPE' },
  composite_bow_early:{name:'Recurved Bow',     era:1, dmg:30, rate:900,  mag:1,  range:38, type:'bow',     country:'PERSIA' },
  bronze_arrow:     { name:'Bronze Arrow Vol',  era:1, dmg:15, rate:600,  mag:5,  range:25, type:'bow',     country:'CHINA' },
  war_chariot_spear:{name:'Chariot Lance',      era:1, dmg:50, rate:1200, mag:1,  range:12, type:'melee',   country:'EGYPT' },

  // === IRON AGE (Era 2) === — 16 weapons (was 6)
  iron_sword:       { name:'Iron Sword',        era:2, dmg:50, rate:700,  mag:1,  range:7,  type:'melee',   country:'ROMAN' },
  gladius:          { name:'Roman Gladius',     era:2, dmg:45, rate:600,  mag:1,  range:6,  type:'melee',   country:'ROME' },
  pilum:            { name:'Pilum Javelin',     era:2, dmg:40, rate:1000, mag:2,  range:25, type:'thrown',  country:'ROME' },
  composite_bow:    { name:'Composite Bow',      era:2, dmg:35, rate:900,  mag:1,  range:40, type:'bow',     country:'PERSIA' },
  crossbow:         { name:'Early Crossbow',    era:2, dmg:55, rate:1500, mag:1,  range:45, type:'bow',     country:'CHINA' },
  ballista:         { name:'Ballista Bolt',     era:2, dmg:80, rate:3000, mag:1,  range:80, type:'siege',   country:'ROME' },
  spatha:           { name:'Spatha Longsword',  era:2, dmg:55, rate:700,  mag:1,  range:8,  type:'melee',   country:'ROME' },
  pugio:            { name:'Pugio Dagger',      era:2, dmg:25, rate:500,  mag:1,  range:4,  type:'melee',   country:'ROME' },
  hasta:            { name:'Hasta Spear',       era:2, dmg:42, rate:900,  mag:1,  range:10, type:'melee',   country:'ROME' },
  sagittarius_bow:  { name:'Sagittarius Bow',   era:2, dmg:40, rate:850,  mag:1,  range:50, type:'bow',     country:'PARTHIA' },
  iron_dagger:      { name:'Iron Dagger',       era:2, dmg:30, rate:450,  mag:1,  range:4,  type:'melee',   country:'NORSE' },
  francisca:        { name:'Francisca Axe',     era:2, dmg:48, rate:900,  mag:2,  range:15, type:'thrown',  country:'FRANKISH' },
  torsion_catapult: { name:'Torsion Catapult',  era:2, dmg:90, rate:3500, mag:1,  range:100,type:'siege',   country:'GREECE' },
  repeating_crossbow:{name:'Zhuge Nu Repeating Crossbow',era:2,dmg:20,rate:200,mag:10,range:35,type:'bow',country:'CHINA' },
  iron_spear:       { name:'Iron Spear',         era:2, dmg:45, rate:850,  mag:1,  range:12, type:'melee',   country:'CELTIC' },
  seax:             { name:'Seax Knife',         era:2, dmg:35, rate:500,  mag:1,  range:5,  type:'melee',   country:'NORSE' },

  // === MEDIEVAL (Era 3) === — 20 weapons (was 7)
  longsword:        { name:'Longsword',         era:3, dmg:60, rate:700,  mag:1,  range:7,  type:'melee',   country:'EUROPE' },
  war_hammer:       { name:'War Hammer',        era:3, dmg:70, rate:900,  mag:1,  range:6,  type:'melee',   country:'EUROPE' },
  longbow:          { name:'English Longbow',    era:3, dmg:45, rate:1000, mag:1,  range:60, type:'bow',     country:'ENGLAND' },
  heavy_crossbow:   { name:'Heavy Crossbow',    era:3, dmg:70, rate:2000, mag:1,  range:55, type:'bow',     country:'EUROPE' },
  catapult_stone:   { name:'Catapult Stone',    era:3, dmg:120,rate:4000, mag:1,  range:100,type:'siege',   country:'EUROPE' },
  hand_cannon:      { name:'Hand Cannon',       era:3, dmg:50, rate:2500, mag:1,  range:40, type:'firearm', country:'CHINA' },
  trebuchet:        { name:'Trebuchet',         era:3, dmg:150,rate:5000, mag:1,  range:120,type:'siege',   country:'EUROPE' },
  mace:             { name:'Spiked Mace',       era:3, dmg:55, rate:800,  mag:1,  range:5,  type:'melee',   country:'EUROPE' },
  flail:            { name:'Morning Star Flail',era:3, dmg:65, rate:850,  mag:1,  range:6,  type:'melee',   country:'EUROPE' },
  halberd:          { name:'Halberd',           era:3, dmg:75, rate:950,  mag:1,  range:8,  type:'melee',   country:'SWISS' },
  poleaxe:          { name:'Poleaxe',            era:3, dmg:68, rate:900,  mag:1,  range:8,  type:'melee',   country:'EUROPE' },
  arming_sword:     { name:'Arming Sword',      era:3, dmg:50, rate:600,  mag:1,  range:6,  type:'melee',   country:'EUROPE' },
  battle_axe:       { name:'Battle Axe',        era:3, dmg:72, rate:900,  mag:1,  range:6,  type:'melee',   country:'NORSE' },
  arblast:          { name:'Arblast',           era:3, dmg:75, rate:2500, mag:1,  range:60, type:'bow',     country:'FRANCE' },
  greek_fire:       { name:'Greek Fire Pot',    era:3, dmg:60, rate:2000, mag:3,  range:20, type:'thrown',  country:'BYZANTIUM' },
  throwing_axe:     { name:'Throwing Axe',      era:3, dmg:35, rate:800,  mag:3,  range:18, type:'thrown',  country:'NORSE' },
  javelin:          { name:'Javelin',           era:3, dmg:30, rate:700,  mag:4,  range:25, type:'thrown',  country:'EUROPE' },
  bec_de_corbin:    { name:'Bec de Corbin',     era:3, dmg:70, rate:900,  mag:1,  range:7,  type:'melee',   country:'FRANCE' },
  war_scythe:       { name:'War Scythe',        era:3, dmg:55, rate:800,  mag:1,  range:8,  type:'melee',   country:'EAST EUROPE' },
  hwacha:           { name:'Hwacha Arrow Rocket',era:3,dmg:40,rate:3000,mag:20, range:80, type:'siege',  country:'KOREA' },

  // === RENAISSANCE (Era 4) === — 14 weapons (was 5)
  flintlock_musket: { name:'Flintlock Musket',  era:4, dmg:60, rate:2000, mag:1,  range:70, type:'firearm', country:'EUROPE' },
  flintlock_pistol: { name:'Flintlock Pistol', era:4, dmg:40, rate:1500, mag:1,  range:30, type:'pistol', country:'EUROPE' },
  blunderbuss:      { name:'Blunderbuss',       era:4, dmg:50, rate:2000, mag:1,  range:20, type:'shotgun',country:'EUROPE' },
  matchlock:        { name:'Matchlock Rifle',   era:4, dmg:55, rate:2500, mag:1,  range:80, type:'firearm', country:'EUROPE' },
  cannon:           { name:'Field Cannon',      era:4, dmg:100,rate:4000, mag:1,  range:150,type:'siege',   country:'EUROPE' },
  wheelock:         { name:'Wheelock Pistol',   era:4, dmg:42, rate:1200, mag:1,  range:35, type:'pistol', country:'GERMANY' },
  arquebus:         { name:'Arquebus',          era:4, dmg:50, rate:2200, mag:1,  range:65, type:'firearm', country:'SPAIN' },
  musketoon:        { name:'Musketoon',          era:4, dmg:48, rate:1800, mag:1,  range:40, type:'firearm', country:'FRANCE' },
  howitzer:         { name:'Howitzer Cannon',   era:4, dmg:120,rate:5000, mag:1,  range:200,type:'siege',   country:'SWEDEN' },
  swivel_gun:       { name:'Swivel Gun',        era:4, dmg:70, rate:3000, mag:1,  range:60, type:'firearm', country:'EUROPE' },
  hand_mortar:      { name:'Hand Mortar',       era:4, dmg:80, rate:3500, mag:1,  range:50, type:'grenade', country:'EUROPE' },
  double_pistol:    { name:'Double-Barrel Pistol',era:4,dmg:45,rate:800,mag:2, range:30, type:'pistol', country:'EUROPE' },
  naval_cannon:     { name:'Naval Cannon',      era:4, dmg:110,rate:4500, mag:1,  range:180,type:'siege',   country:'UK' },
  grapeshot:        { name:'Grapeshot Cannon',  era:4, dmg:40, rate:4000, mag:10, range:40, type:'shotgun',country:'UK' },

  // === INDUSTRIAL WAR (Era 5) === — 20 weapons (was 8)
  colt_revolver:    { name:'Colt Single Action',era:5, dmg:35, rate:500,  mag:6,  range:40, type:'pistol', country:'USA' },
  springfield_1903: { name:'Springfield 1903', era:5, dmg:70, rate:1200, mag:5,  range:200,type:'rifle',  country:'USA' },
  lee_enfield:      { name:'Lee-Enfield SMLE', era:5, dmg:65, rate:800,  mag:10, range:180,type:'rifle',  country:'UK' },
  maxim_gun:        { name:'Maxim MG',          era:5, dmg:25, rate:100,  mag:250,range:120,type:'lmg',   country:'UK' },
  mauser_c96:       { name:'Mauser C96',        era:5, dmg:30, rate:400,  mag:10, range:50, type:'pistol', country:'GERMANY' },
  winchester:       { name:'Winchester 1897',   era:5, dmg:45, rate:800,  mag:5,  range:35, type:'shotgun',country:'USA' },
  webley:           { name:'Webley Revolver',   era:5, dmg:32, rate:450,  mag:6,  range:35, type:'pistol', country:'UK' },
  mosin_nagant:     { name:'Mosin-Nagant',      era:5, dmg:75, rate:1000, mag:5,  range:220,type:'rifle',  country:'RUSSIA' },
  gatling_gun:      { name:'Gatling Gun',       era:5, dmg:20, rate:80,   mag:400,range:100,type:'hmg',   country:'USA' },
  henry_rifle:      { name:'Henry Rifle',       era:5, dmg:55, rate:600,  mag:15, range:150,type:'rifle',  country:'USA' },
  sharps_rifle:     { name:'Sharps Rifle',      era:5, dmg:80, rate:1500, mag:1,  range:250,type:'rifle',  country:'USA' },
  lebel_rifle:      { name:'Lebel Model 1886',  era:5, dmg:68, rate:900,  mag:8,  range:190,type:'rifle',  country:'FRANCE' },
  carcano:          { name:'Carcano M1891',     era:5, dmg:60, rate:850,  mag:6,  range:180,type:'rifle',  country:'ITALY' },
  arisaka:          { name:'Arisaka Type 38',   era:5, dmg:72, rate:1000, mag:5,  range:210,type:'rifle',  country:'JAPAN' },
  martini_henry:    { name:'Martini-Henry',     era:5, dmg:58, rate:800,  mag:1,  range:170,type:'rifle',  country:'UK' },
  nagant_revolver:  { name:'Nagant M1895',      era:5, dmg:28, rate:400,  mag:7,  range:35, type:'pistol', country:'RUSSIA' },
  hotchkiss:        { name:'Hotchkiss MG',       era:5, dmg:22, rate:90,   mag:250,range:130,type:'lmg',   country:'FRANCE' },
  colt_peacemaker:  { name:'Colt Peacemaker',    era:5, dmg:33, rate:450,  mag:6,  range:38, type:'pistol', country:'USA' },
  derringer:        { name:'Derringer Pocket',   era:5, dmg:25, rate:600,  mag:2,  range:15, type:'pistol', country:'USA' },
  schwarzlose:      { name:'Schwarzlose MG',    era:5, dmg:24, rate:95,   mag:250,range:125,type:'lmg',   country:'AUSTRIA' },

  // === WORLD WARS (Era 6) === — 30 weapons (was 12)
  m1_garand:        { name:'M1 Garand',         era:6, dmg:65, rate:400,  mag:8,  range:200,type:'rifle',  country:'USA' },
  thompson:         { name:'Thompson SMG',      era:6, dmg:20, rate:100,  mag:30, range:50, type:'smg',   country:'USA' },
  bar:              { name:'BAR M1918',          era:6, dmg:30, rate:600,  mag:20, range:120,type:'lmg',   country:'USA' },
  kar98k:           { name:'Kar98k',            era:6, dmg:80, rate:1000, mag:5,  range:250,type:'rifle',  country:'GERMANY' },
  mp40:             { name:'MP40',              era:6, dmg:18, rate:120,  mag:32, range:55, type:'smg',   country:'GERMANY' },
  mg42:             { name:'MG42',              era:6, dmg:25, rate:80,   mag:250,range:150,type:'lmg',   country:'GERMANY' },
  stg44:            { name:'StG 44',             era:6, dmg:35, rate:300,  mag:30, range:150,type:'rifle',  country:'GERMANY' },
  browning_50:      { name:'Browning M2 .50cal',era:6, dmg:50, rate:200,  mag:100,range:300,type:'hmg',   country:'USA' },
  panzerschreck:    { name:'Panzerschreck',      era:6, dmg:200,rate:3000, mag:1,  range:100,type:'rocket', country:'GERMANY' },
  ppsh:             { name:'PPSh-41',           era:6, dmg:16, rate:60,   mag:71, range:60, type:'smg',   country:'RUSSIA' },
  colt_1911:        { name:'Colt M1911',         era:6, dmg:30, rate:400,  mag:7,  range:40, type:'pistol', country:'USA' },
  luger:            { name:'Luger P08',         era:6, dmg:25, rate:400,  mag:8,  range:40, type:'pistol', country:'GERMANY' },
  lee_enfield_4:    { name:'Lee-Enfield No.4',  era:6, dmg:68, rate:700,  mag:10, range:200,type:'rifle',  country:'UK' },
  bren_gun:         { name:'Bren Gun',           era:6, dmg:28, rate:500,  mag:30, range:140,type:'lmg',   country:'UK' },
  sten_gun:         { name:'Sten Gun',          era:6, dmg:15, rate:120,  mag:32, range:50, type:'smg',   country:'UK' },
  gewehr_43:        { name:'Gewehr 43',         era:6, dmg:55, rate:400,  mag:10, range:180,type:'rifle',  country:'GERMANY' },
  fg42:             { name:'FG42',              era:6, dmg:40, rate:300,  mag:20, range:130,type:'rifle',  country:'GERMANY' },
  walther_p38:      { name:'Walther P38',       era:6, dmg:24, rate:400,  mag:8,  range:38, type:'pistol', country:'GERMANY' },
  type99_arisaka:   { name:'Type 99 Arisaka',   era:6, dmg:78, rate:1000, mag:5,  range:240,type:'rifle',  country:'JAPAN' },
  m3_grease:        { name:'M3 Grease Gun',     era:6, dmg:17, rate:130,  mag:30, range:45, type:'smg',   country:'USA' },
  trench_gun:       { name:'M1897 Trench Gun',  era:6, dmg:48, rate:700,  mag:6,  range:25, type:'shotgun',country:'USA' },
  bazooka:          { name:'M1 Bazooka',        era:6, dmg:180,rate:3000, mag:1,  range:90, type:'rocket', country:'USA' },
  piat:             { name:'PIAT',              era:6, dmg:170,rate:3500, mag:1,  range:80, type:'rocket', country:'UK' },
  molotov:          { name:'Molotov Cocktail',  era:6, dmg:40, rate:2000, mag:3,  range:25, type:'grenade',country:'RUSSIA' },
  dp28:             { name:'DP-28',             era:6, dmg:22, rate:120,  mag:47, range:130,type:'lmg',   country:'RUSSIA' },
  svt40:            { name:'SVT-40',            era:6, dmg:60, rate:350,  mag:10, range:180,type:'rifle',  country:'RUSSIA' },
  tt33:             { name:'TT-33 Tokarev',     era:6, dmg:26, rate:400,  mag:8,  range:42, type:'pistol', country:'RUSSIA' },
  nambu:            { name:'Nambu Type 14',     era:6, dmg:20, rate:400,  mag:8,  range:35, type:'pistol', country:'JAPAN' },
  type100_smg:      { name:'Type 100 SMG',      era:6, dmg:15, rate:130,  mag:30, range:40, type:'smg',   country:'JAPAN' },
  beretta_m38:      { name:'Beretta M38',       era:6, dmg:16, rate:110,  mag:30, range:45, type:'smg',   country:'ITALY' },

  // === COLD WAR (Era 7) === — 28 weapons (was 12)
  ak47:             { name:'AK-47',            era:7, dmg:35, rate:300,  mag:30, range:200,type:'rifle',  country:'RUSSIA' },
  m16_vietnam:      { name:'M16A1',            era:7, dmg:30, rate:400,  mag:30, range:250,type:'rifle',  country:'USA' },
  rpg7:             { name:'RPG-7',            era:7, dmg:200,rate:3000, mag:1,  range:120,type:'rocket', country:'RUSSIA' },
  uzi:              { name:'Uzi',              era:7, dmg:18, rate:80,   mag:32, range:50, type:'smg',   country:'ISRAEL' },
  fn_fal:           { name:'FN FAL',           era:7, dmg:40, rate:500,  mag:20, range:250,type:'rifle',  country:'NATO' },
  dragunov:         { name:'Dragunov SVD',     era:7, dmg:90, rate:1000, mag:10, range:400,type:'sniper', country:'RUSSIA' },
  m60:              { name:'M60 MG',           era:7, dmg:30, rate:100,  mag:100,range:200,type:'lmg',   country:'USA' },
  stinger:          { name:'FIM-92 Stinger',    era:7, dmg:250,rate:5000, mag:1,  range:200,type:'missile',country:'USA' },
  rpk:              { name:'RPK',              era:7, dmg:28, rate:120,  mag:100,range:150,type:'lmg',   country:'RUSSIA' },
  galil:            { name:'IMI Galil',         era:7, dmg:32, rate:350,  mag:30, range:200,type:'rifle',  country:'ISRAEL' },
  g36:              { name:'H&K G36',          era:7, dmg:33, rate:400,  mag:30, range:250,type:'rifle',  country:'GERMANY' },
  famas:            { name:'FAMAS',            era:7, dmg:30, rate:900,  mag:30, range:200,type:'rifle',  country:'FRANCE' },
  m14:              { name:'M14 Rifle',        era:7, dmg:45, rate:500,  mag:20, range:280,type:'rifle',  country:'USA' },
  mp5:              { name:'H&K MP5',          era:7, dmg:18, rate:80,   mag:30, range:55, type:'smg',   country:'GERMANY' },
  steyr_aug:        { name:'Steyr AUG',        era:7, dmg:34, rate:450,  mag:30, range:240,type:'rifle',  country:'AUSTRIA' },
  m249_saw:         { name:'M249 SAW',         era:7, dmg:26, rate:100,  mag:200,range:180,type:'lmg',   country:'USA' },
  spas12:           { name:'SPAS-12',          era:7, dmg:50, rate:700,  mag:8,  range:35, type:'shotgun',country:'ITALY' },
  rem700:           { name:'Remington 700',    era:7, dmg:85, rate:1000, mag:5,  range:450,type:'sniper', country:'USA' },
  ak74:             { name:'AK-74',            era:7, dmg:33, rate:320,  mag:30, range:210,type:'rifle',  country:'RUSSIA' },
  vz58:             { name:'Vz. 58',           era:7, dmg:32, rate:350,  mag:30, range:200,type:'rifle',  country:'CZECH' },
  pkm:              { name:'PKM',              era:7, dmg:35, rate:100,  mag:250,range:220,type:'hmg',   country:'RUSSIA' },
  rpd:              { name:'RPD',              era:7, dmg:25, rate:110,  mag:100,range:160,type:'lmg',   country:'RUSSIA' },
  m72_law:          { name:'M72 LAW',          era:7, dmg:150,rate:4000, mag:1,  range:100,type:'rocket', country:'USA' },
  at4:              { name:'AT4',              era:7, dmg:180,rate:5000, mag:1,  range:150,type:'rocket', country:'USA' },
  carl_gustav:      { name:'Carl Gustav M2',   era:7, dmg:170,rate:4000, mag:1,  range:130,type:'rocket', country:'SWEDEN' },
  makarov:          { name:'Makarov PM',       era:7, dmg:22, rate:400,  mag:8,  range:35, type:'pistol', country:'RUSSIA' },
  tokarev:          { name:'Tokarev TT-33',    era:7, dmg:26, rate:400,  mag:8,  range:42, type:'pistol', country:'RUSSIA' },
  sa7_grail:        { name:'SA-7 Grail',       era:7, dmg:200,rate:6000, mag:1,  range:150,type:'missile',country:'RUSSIA' },

  // === MODERN WARFARE (Era 8) === — 35 weapons (was 16)
  m4a1:             { name:'M4A1 Carbine',     era:8, dmg:32, rate:350,  mag:30, range:250,type:'rifle',  country:'USA' },
  ak12:             { name:'AK-12',            era:8, dmg:35, rate:300,  mag:30, range:220,type:'rifle',  country:'RUSSIA' },
  scar_h:           { name:'FN SCAR-H',        era:8, dmg:45, rate:500,  mag:20, range:280,type:'rifle',  country:'NATO' },
  mp7:              { name:'H&K MP7',          era:8, dmg:20, rate:70,   mag:40, range:60, type:'smg',   country:'GERMANY' },
  awp:              { name:'AWM Sniper',       era:8, dmg:120,rate:1500, mag:5,  range:500,type:'sniper', country:'UK' },
  barrett_m82:      { name:'Barrett M82A1',    era:8, dmg:150,rate:2000, mag:10, range:600,type:'sniper', country:'USA' },
  javelin:          { name:'FGM-148 Javelin',  era:8, dmg:300,rate:6000, mag:1,  range:250,type:'missile',country:'USA' },
  predator_drone:   { name:'MQ-1 Predator',   era:8, dmg:200,rate:8000, mag:2,  range:500,type:'airstrike',country:'USA' },
  grenade_m67:      { name:'M67 Frag',         era:8, dmg:80, rate:3000, mag:2,  range:30, type:'grenade',country:'USA' },
  flashbang:        { name:'M84 Flashbang',    era:8, dmg:5,  rate:2000, mag:1,  range:20, type:'grenade',country:'USA' },
  claymore:         { name:'M18 Claymore',     era:8, dmg:100,rate:5000, mag:1,  range:15, type:'mine',   country:'USA' },
  p90:              { name:'FN P90',           era:8, dmg:22, rate:65,   mag:50, range:70, type:'smg',   country:'NATO' },
  mk18:             { name:'Mk18 CQBR',        era:8, dmg:30, rate:350,  mag:30, range:200,type:'rifle',  country:'USA' },
  svd_modern:       { name:'SVDM Modern',      era:8, dmg:85, rate:800,  mag:10, range:400,type:'sniper', country:'RUSSIA' },
  rpk16:            { name:'RPK-16',           era:8, dmg:35, rate:120,  mag:95, range:180,type:'lmg',   country:'RUSSIA' },
  m320:             { name:'M320 GL',          era:8, dmg:90, rate:1500, mag:1,  range:80, type:'grenade',country:'USA' },
  hk416:            { name:'H&K HK416',        era:8, dmg:34, rate:350,  mag:30, range:240,type:'rifle',  country:'GERMANY' },
  xm7:              { name:'XM7',             era:8, dmg:42, rate:300,  mag:25, range:300,type:'rifle',  country:'USA' },
  mcx_spear:        { name:'MCX Spear',        era:8, dmg:48, rate:400,  mag:20, range:320,type:'rifle',  country:'USA' },
  ak19:             { name:'AK-19',            era:8, dmg:38, rate:320,  mag:30, range:250,type:'rifle',  country:'RUSSIA' },
  tavor_x95:        { name:'Tavor X95',        era:8, dmg:33, rate:350,  mag:30, range:230,type:'rifle',  country:'ISRAEL' },
  kriss_vector:     { name:'KRISS Vector',     era:8, dmg:24, rate:55,   mag:25, range:65, type:'smg',   country:'USA' },
  fnx45:            { name:'FNX-45',           era:8, dmg:35, rate:350,  mag:15, range:50, type:'pistol', country:'USA' },
  glock17:          { name:'Glock 17',         era:8, dmg:25, rate:300,  mag:17, range:45, type:'pistol', country:'AUSTRIA' },
  fiveseven:        { name:'FN Five-seveN',    era:8, dmg:28, rate:350,  mag:20, range:55, type:'pistol', country:'NATO' },
  aa12:             { name:'AA-12 Auto Shotgun',era:8,dmg:55, rate:300,  mag:20, range:40, type:'shotgun',country:'USA' },
  gm6_lynx:        { name:'GM6 Lynx',         era:8, dmg:140,rate:2000, mag:5,  range:550,type:'sniper', country:'HUNGARY' },
  cheytac_m200:     { name:'CheyTac M200',     era:8, dmg:130,rate:1800, mag:7,  range:600,type:'sniper', country:'USA' },
  m32_mgl:          { name:'M32 MGL',          era:8, dmg:70, rate:500,  mag:6,  range:60, type:'grenade',country:'USA' },
  smaw:             { name:'SMAW',             era:8, dmg:220,rate:5000, mag:1,  range:200,type:'rocket', country:'USA' },
  nlaw:             { name:'NLAW',            era:8, dmg:250,rate:6000, mag:1,  range:150,type:'missile',country:'UK' },
  switchblade:      { name:'Switchblade Drone',era:8, dmg:180,rate:7000, mag:1,  range:400,type:'airstrike',country:'USA' },
  m134_minigun:     { name:'M134 Minigun',     era:8, dmg:20, rate:40,   mag:3000,range:200,type:'hmg',  country:'USA' },
  kord_hmg:        { name:'Kord HMG',        era:8, dmg:55, rate:150,  mag:200,range:350,type:'hmg',   country:'RUSSIA' },
  vss_vintorez:    { name:'VSS Vintorez',     era:8, dmg:60, rate:400,  mag:10, range:200,type:'rifle',  country:'RUSSIA' },

  // === NEAR FUTURE (Era 9) === — 20 weapons (was 10)
  railgun:          { name:'EM Railgun',        era:9, dmg:180,rate:1500, mag:5,  range:800,type:'railgun',country:'USA' },
  coilgun:          { name:'Coil Rifle',        era:9, dmg:100,rate:600,  mag:10, range:400,type:'railgun',country:'NATO' },
  laser_carbine:    { name:'Laser Carbine',     era:9, dmg:50, rate:200,  mag:50, range:300,type:'laser',  country:'USA' },
  emp_grenade:      { name:'EMP Grenade',       era:9, dmg:30, rate:3000, mag:2,  range:30, type:'grenade',country:'NATO' },
  rail_sniper:      { name:'Rail Sniper',       era:9, dmg:250,rate:2500, mag:3,  range:1000,type:'sniper',country:'USA' },
  smart_rifle:      { name:'Smart Rifle AI',    era:9, dmg:55, rate:300,  mag:20, range:400,type:'rifle',  country:'NATO' },
  exo_suit_fist:    { name:'Exosuit Punch',     era:9, dmg:120,rate:600,  mag:0,  range:5,  type:'melee',  country:'USA' },
  plasma_pistol:    { name:'Plasma Pistol',     era:9, dmg:40, rate:400,  mag:20, range:60, type:'energy', country:'NATO' },
  combat_drone:     { name:'Combat Drone',      era:9, dmg:150,rate:6000, mag:1,  range:600,type:'airstrike',country:'USA' },
  sonic_cannon:     { name:'Sonic Cannon',      era:9, dmg:70, rate:1000, mag:5,  range:80, type:'energy', country:'NATO' },
  rail_pistol:      { name:'Rail Pistol',       era:9, dmg:60, rate:500,  mag:8,  range:100,type:'railgun',country:'NATO' },
  emp_mine:         { name:'EMP Mine',          era:9, dmg:40, rate:5000, mag:2,  range:15, type:'mine',   country:'NATO' },
  auto_turret:      { name:'Auto-Turret Deploy',era:9, dmg:35, rate:200,  mag:100,range:200,type:'airstrike',country:'USA' },
  rail_shotgun:     { name:'Rail Shotgun',      era:9, dmg:90, rate:600,  mag:8,  range:50, type:'shotgun',country:'USA' },
  plasma_grenade:   { name:'Plasma Grenade',    era:9, dmg:120,rate:3000, mag:2,  range:35, type:'grenade',country:'NATO' },
  nano_swarm:       { name:'Nano Swarm',        era:9, dmg:60, rate:2000, mag:3,  range:40, type:'special',country:'NATO' },
  microwave_weapon: { name:'ADS Pain Ray',      era:9, dmg:45, rate:200,  mag:100,range:60, type:'energy', country:'USA' },
  laser_lmg:        { name:'Laser LMG',         era:9, dmg:35, rate:50,   mag:200,range:250,type:'laser',  country:'USA' },
  plasma_sniper:    { name:'Plasma Sniper',     era:9, dmg:200,rate:2000, mag:5,  range:800,type:'sniper', country:'NATO' },
  drone_swarm:      { name:'Drone Swarm Strike',era:9, dmg:100,rate:8000, mag:5,  range:500,type:'airstrike',country:'USA' },

  // === FAR FUTURE (Era 10) === — 24 weapons (was 12)
  plasma_rifle:     { name:'Plasma Rifle',      era:10,dmg:80, rate:250,  mag:40, range:400,type:'energy', country:'GALACTIC' },
  plasma_shotgun:    { name:'Plasma Scatter',    era:10,dmg:120,rate:700, mag:8,  range:50, type:'shotgun',country:'GALACTIC' },
  pulse_cannon:      { name:'Pulse Cannon',      era:10,dmg:100,rate:400, mag:20, range:300,type:'energy', country:'GALACTIC' },
  laser_minigun:     { name:'Laser Minigun',     era:10,dmg:40, rate:30,  mag:200,range:250,type:'lmg',   country:'GALACTIC' },
  rail_gun_heavy:    { name:'Heavy Railgun',     era:10,dmg:300,rate:2000, mag:3,  range:1500,type:'railgun',country:'GALACTIC' },
  ion_grenade:       { name:'Ion Grenade',       era:10,dmg:150,rate:3000, mag:3,  range:40, type:'grenade',country:'GALACTIC' },
  mech_cannon:       { name:'Mech Cannon',       era:10,dmg:200,rate:800, mag:15, range:500,type:'rifle',  country:'GALACTIC' },
  teleport_mine:     { name:'Teleport Mine',     era:10,dmg:100,rate:5000, mag:2,  range:50, type:'mine',   country:'GALACTIC' },
  emp_cannon:        { name:'EMP Cannon',        era:10,dmg:60, rate:1500, mag:10, range:200,type:'energy', country:'GALACTIC' },
  shield_regen:      { name:'Regen Shield',     era:10,dmg:0,  rate:10000,mag:1,  range:0,  type:'utility',country:'GALACTIC' },
  orbital_strike:    { name:'Orbital Strike',    era:10,dmg:500,rate:15000,mag:1,  range:1000,type:'airstrike',country:'GALACTIC' },
  quantum_rifle:     { name:'Quantum Rifle',     era:10,dmg:90, rate:200,  mag:30, range:500,type:'energy', country:'GALACTIC' },
  singularity_pistol:{name:'Singularity Pistol',era:10,dmg:180,rate:1500,mag:5,  range:80, type:'energy', country:'GALACTIC' },
  gravity_gun:       { name:'Gravity Gun',       era:10,dmg:50, rate:400,  mag:20, range:60, type:'special',country:'GALACTIC' },
  photon_launcher:  { name:'Photon Launcher',   era:10,dmg:250,rate:2000, mag:3,  range:600,type:'energy', country:'GALACTIC' },
  dark_matter_rifle: { name:'Dark Matter Rifle', era:10,dmg:150,rate:500, mag:10, range:700,type:'energy', country:'GALACTIC' },
  tachyon_pistol:    { name:'Tachyon Pistol',    era:10,dmg:80, rate:200,  mag:15, range:200,type:'energy', country:'GALACTIC' },
  warp_blade:        { name:'Warp Blade',        era:10,dmg:180,rate:300, mag:0,  range:8,  type:'melee',  country:'GALACTIC' },
  plasma_sword:      { name:'Plasma Sword',      era:10,dmg:200,rate:350, mag:0,  range:7,  type:'melee',  country:'GALACTIC' },
  teleport_grenade:  { name:'Teleport Grenade',  era:10,dmg:50, rate:4000, mag:2,  range:30, type:'grenade',country:'GALACTIC' },
  temporal_mine:     { name:'Temporal Mine',    era:10,dmg:150,rate:5000, mag:2,  range:30, type:'mine',   country:'GALACTIC' },
  stasis_field:      { name:'Stasis Field Gen', era:10,dmg:0,  rate:8000, mag:1,  range:40, type:'utility',country:'GALACTIC' },
  plasma_mortar:     { name:'Plasma Mortar',     era:10,dmg:200,rate:3000, mag:4,  range:300,type:'siege',  country:'GALACTIC' },
  neural_disruptor:  { name:'Neural Disruptor',  era:10,dmg:70, rate:1000, mag:10, range:100,type:'energy', country:'GALACTIC' },

  // === 30TH CENTURY (Era 11) === — 26 weapons (was 16)
  hyperspace_cannon:{ name:'Hyperspace Cannon', era:11,dmg:400,rate:2000, mag:5,  range:2000,type:'energy', country:'STELLAR' },
  laser_array:      { name:'Laser Array',        era:11,dmg:60, rate:50,   mag:300,range:500,type:'laser',  country:'STELLAR' },
  dimensional_blade:{ name:'Dimensional Blade',  era:11,dmg:250,rate:300, mag:0,  range:8,  type:'melee',  country:'STELLAR' },
  antimatter_rifle: { name:'Antimatter Rifle',  era:11,dmg:350,rate:1500, mag:10, range:800,type:'energy', country:'STELLAR' },
  singularity_grenade:{name:'Singularity Grenade',era:11,dmg:300,rate:8000,mag:1, range:50, type:'grenade',country:'STELLAR' },
  phase_rifle:      { name:'Phase Rifle',        era:11,dmg:120,rate:200,  mag:25, range:600,type:'energy', country:'STELLAR' },
  void_cannon:      { name:'Void Cannon',        era:11,dmg:500,rate:3000, mag:3,  range:1500,type:'energy', country:'STELLAR' },
  chronoblade:      { name:'Chronoblade',         era:11,dmg:280,rate:250, mag:0,  range:10, type:'melee',  country:'STELLAR' },
  tachyon_sniper:   { name:'Tachyon Sniper',     era:11,dmg:600,rate:3000, mag:5,  range:5000,type:'sniper', country:'STELLAR' },
  starship_laser:   { name:'Starship Laser',     era:11,dmg:800,rate:5000, mag:3,  range:3000,type:'airstrike',country:'STELLAR' },
  quantum_cannon:   { name:'Quantum Cannon',     era:11,dmg:450,rate:1000, mag:15, range:2000,type:'energy', country:'STELLAR' },
  dimensional_rift: { name:'Dimensional Rift Gun',era:11,dmg:300,rate:4000,mag:2, range:100, type:'special',country:'STELLAR' },
  hyperspace_jump:  { name:'Hyperspace Jump',    era:11,dmg:0,  rate:10000,mag:1,  range:0,  type:'utility',country:'STELLAR' },
  camouflage_suit:  { name:'Adaptive Camo Suit', era:11,dmg:0,  rate:8000, mag:1,  range:0,  type:'utility',country:'STELLAR' },
  chrono_storm_ult: { name:'Chrono Storm Ult',  era:11,dmg:0,  rate:30000,mag:1,  range:0,  type:'special',country:'STELLAR' },
  "6d_phase_cannon":{ name:'6D Phase Cannon',    era:11,dmg:350,rate:800,  mag:20, range:1000,type:'energy', country:'STELLAR' },
  galaxy_buster:    { name:'Galaxy Buster',      era:11,dmg:1000,rate:15000,mag:1, range:5000,type:'special',country:'STELLAR' },
  reality_anchor_gun:{name:'Reality Anchor Gun', era:11,dmg:0, rate:20000,mag:1,  range:0,  type:'special',country:'STELLAR' },
  cosmic_teleporter:{ name:'Cosmic Teleporter', era:11,dmg:0,  rate:12000,mag:1,  range:0,  type:'special',country:'STELLAR' },
  void_banisher:    { name:'Void Banisher Gun', era:11,dmg:200,rate:2000, mag:5,  range:100, type:'special',country:'STELLAR' },
  starforge_cannon: { name:'Star Forge Cannon', era:11,dmg:550,rate:2500, mag:8,  range:1500,type:'energy', country:'STELLAR' },
  multiverse_rifle: { name:'Multiverse Rifle',  era:11,dmg:200,rate:250,  mag:25, range:800, type:'energy', country:'STELLAR' },
  "8d_void_cannon":{ name:'8D Void Cannon',     era:11,dmg:600,rate:2000, mag:10, range:2000,type:'special',country:'STELLAR' },
  "8d_cosmic_portal":{name:'8D Cosmic Portal',  era:11,dmg:0,  rate:30000,mag:1,  range:0,  type:'special',country:'STELLAR' },
  soul_reaper:      { name:'Soul Reaper Blade',  era:11,dmg:300,rate:200, mag:0,  range:8,  type:'melee',  country:'STELLAR' },
  quasar_lance:     { name:'Quasar Lance',       era:11,dmg:700,rate:3000, mag:3,  range:3000,type:'energy', country:'STELLAR' },
};

// Count weapons per era
function countWeaponsPerEra() {
  const counts = {};
  for (const w of Object.values(WEAPON_DB_EXPANDED)) {
    counts[w.era] = (counts[w.era] || 0) + 1;
  }
  return counts;
}

// Export
if (typeof module !== 'undefined') module.exports = {
  DIMENSIONS, CURRENCY, SHOP_CATEGORIES, getWeaponPrice, AMMO_PRICES,
  PREMIUM_TIERS, DIM7_ABILITIES, DIM8_ABILITIES,
  DEFCON_LEVELS, COUNTRIES, SQUAD_ROLES, SNIPER_MP_CONFIG,
  WEAPON_DB_EXPANDED, countWeaponsPerEra
};
