// ====== OMEGA-8D WORLD MAP & DICE ROLL LOCATION SYSTEM ======

// Full world map — every continent, region, country
const WORLD_MAP = {
  // Each region has: name, countries with lat/lng, terrain type, DEFCON level
  regions: [
    {
      id: 'africa', name: 'AFRICA', color: 0x8B4513,
      countries: [
        { code:'NG', name:'Nigeria',         lat:9.08, lng:8.68,  terrain:'urban+jungle',  capital:'Abuja',   hotspots:['Lagos','Kano','Port Harcourt'] },
        { code:'EG', name:'Egypt',           lat:26.82,lng:30.80, terrain:'desert',         capital:'Cairo',   hotspots:['Cairo','Alexandria','Giza'] },
        { code:'ZA', name:'South Africa',     lat:-30.56,lng:22.94,terrain:'savanna',        capital:'Pretoria',hotspots:['Cape Town','Johannesburg','Durban'] },
        { code:'KE', name:'Kenya',           lat:-0.02, lng:37.91, terrain:'savanna',        capital:'Nairobi', hotspots:['Nairobi','Mombasa'] },
        { code:'DZ', name:'Algeria',         lat:28.03, lng:1.66,  terrain:'desert',         capital:'Algiers', hotspots:['Algiers','Oran'] },
        { code:'MA', name:'Morocco',         lat:31.79, lng:-7.09, terrain:'mountain',       capital:'Rabat',   hotspots:['Casablanca','Rabat','Marrakech'] },
        { code:'ET', name:'Ethiopia',        lat:9.15,  lng:40.49, terrain:'mountain',       capital:'Addis Ababa', hotspots:['Addis Ababa','Dire Dawa'] },
        { code:'SD', name:'Sudan',           lat:12.86, lng:30.22, terrain:'desert',         capital:'Khartoum',hotspots:['Khartoum'] },
        { code:'LY', name:'Libya',           lat:26.34, lng:17.23, terrain:'desert',         capital:'Tripoli', hotspots:['Tripoli','Benghazi'] },
        { code:'TZ', name:'Tanzania',        lat:-6.37, lng:34.89, terrain:'jungle',         capital:'Dodoma',  hotspots:['Dar es Salaam','Dodoma'] },
        { code:'GH', name:'Ghana',           lat:7.95,  lng:-1.02, terrain:'jungle',         capital:'Accra',   hotspots:['Accra','Kumasi'] },
        { code:'AO', name:'Angola',          lat:-11.20,lng:17.87, terrain:'jungle',         capital:'Luanda',  hotspots:['Luanda'] },
        { code:'UG', name:'Uganda',          lat:1.37,  lng:32.29, terrain:'jungle',         capital:'Kampala', hotspots:['Kampala'] },
        { code:'SN', name:'Senegal',         lat:14.49, lng:-14.45,terrain:'coastal',        capital:'Dakar',   hotspots:['Dakar'] },
        { code:'ZW', name:'Zimbabwe',       lat:-19.02,lng:29.15, terrain:'savanna',        capital:'Harare',  hotspots:['Harare','Bulawayo'] },
        { code:'CM', name:'Cameroon',        lat:7.37,  lng:12.35, terrain:'jungle',         capital:'Yaoundé', hotspots:['Douala','Yaoundé'] },
        { code:'CD', name:'DR Congo',        lat:-4.04, lng:21.76, terrain:'jungle',         capital:'Kinshasa',hotspots:['Kinshasa','Goma'] },
        { code:'RW', name:'Rwanda',          lat:-1.94, lng:29.87, terrain:'mountain',       capital:'Kigali',  hotspots:['Kigali'] },
      ]
    },
    {
      id: 'europe', name:'EUROPE', color: 0x4169E1,
      countries: [
        { code:'RU', name:'Russia',          lat:61.52, lng:105.32,terrain:'tundra+urban',   capital:'Moscow',  hotspots:['Moscow','St Petersburg','Volgograd'] },
        { code:'GB', name:'United Kingdom',  lat:55.38, lng:-3.44, terrain:'urban',          capital:'London',  hotspots:['London','Manchester','Birmingham'] },
        { code:'FR', name:'France',          lat:46.23, lng:2.21,  terrain:'urban',          capital:'Paris',   hotspots:['Paris','Marseille','Lyon'] },
        { code:'DE', name:'Germany',          lat:51.17, lng:10.45,terrain:'urban',          capital:'Berlin',  hotspots:['Berlin','Munich','Hamburg'] },
        { code:'IT', name:'Italy',           lat:41.87, lng:12.57, terrain:'mountain+urban', capital:'Rome',    hotspots:['Rome','Milan','Naples'] },
        { code:'ES', name:'Spain',           lat:40.46, lng:-3.75, terrain:'mountain',       capital:'Madrid',  hotspots:['Madrid','Barcelona','Seville'] },
        { code:'PL', name:'Poland',          lat:51.92, lng:19.15, terrain:'forest',         capital:'Warsaw',  hotspots:['Warsaw','Krakow'] },
        { code:'UA', name:'Ukraine',         lat:48.38, lng:31.17, terrain:'plains',         capital:'Kyiv',    hotspots:['Kyiv','Kharkiv','Odesa'] },
        { code:'SE', name:'Sweden',          lat:60.13, lng:18.64, terrain:'forest',         capital:'Stockholm',hotspots:['Stockholm','Gothenburg'] },
        { code:'NO', name:'Norway',          lat:60.47, lng:8.47,  terrain:'mountain',       capital:'Oslo',   hotspots:['Oslo','Bergen'] },
        { code:'NL', name:'Netherlands',     lat:52.13, lng:5.29,  terrain:'coastal',        capital:'Amsterdam',hotspots:['Amsterdam','Rotterdam'] },
        { code:'TR', name:'Turkey',          lat:38.96, lng:35.24, terrain:'mountain',       capital:'Ankara', hotspots:['Istanbul','Ankara'] },
        { code:'GR', name:'Greece',          lat:39.07, lng:21.82,terrain:'mountain+island',capital:'Athens',  hotspots:['Athens','Thessaloniki'] },
        { code:'PT', name:'Portugal',        lat:39.40, lng:-8.22, terrain:'coastal',        capital:'Lisbon', hotspots:['Lisbon','Porto'] },
        { code:'CZ', name:'Czech Republic',  lat:49.82, lng:15.47, terrain:'forest',         capital:'Prague', hotspots:['Prague'] },
        { code:'RO', name:'Romania',         lat:45.94, lng:24.97, terrain:'mountain',       capital:'Bucharest',hotspots:['Bucharest'] },
        { code:'CH', name:'Switzerland',     lat:46.82, lng:8.23,  terrain:'mountain',       capital:'Bern',   hotspots:['Zurich','Geneva'] },
        { code:'AT', name:'Austria',         lat:47.52, lng:14.55, terrain:'mountain',       capital:'Vienna', hotspots:['Vienna'] },
        { code:'BE', name:'Belgium',         lat:50.50, lng:4.47,  terrain:'urban',          capital:'Brussels',hotspots:['Brussels','Antwerp'] },
        { code:'FI', name:'Finland',         lat:61.92, lng:25.75, terrain:'forest',         capital:'Helsinki',hotspots:['Helsinki'] },
        { code:'IE', name:'Ireland',         lat:53.41, lng:-8.24, terrain:'coastal',        capital:'Dublin', hotspots:['Dublin','Cork'] },
        { code:'DK', name:'Denmark',         lat:56.26, lng:9.50,  terrain:'coastal',        capital:'Copenhagen',hotspots:['Copenhagen'] },
      ]
    },
    {
      id: 'asia', name:'ASIA', color: 0xFF6347,
      countries: [
        { code:'CN', name:'China',           lat:35.86, lng:104.20,terrain:'mountain+urban', capital:'Beijing', hotspots:['Beijing','Shanghai','Shenzhen'] },
        { code:'IN', name:'India',            lat:20.59, lng:78.96, terrain:'jungle+urban',  capital:'New Delhi',hotspots:['Mumbai','Delhi','Bangalore'] },
        { code:'JP', name:'Japan',            lat:36.20, lng:138.25,terrain:'island+urban',   capital:'Tokyo',   hotspots:['Tokyo','Osaka','Yokohama'] },
        { code:'KP', name:'North Korea',     lat:40.34, lng:127.51,terrain:'mountain',       capital:'Pyongyang',hotspots:['Pyongyang','Wonsan'] },
        { code:'KR', name:'South Korea',     lat:35.91, lng:127.77,terrain:'mountain+urban', capital:'Seoul',   hotspots:['Seoul','Busan'] },
        { code:'PK', name:'Pakistan',        lat:30.38, lng:69.35, terrain:'desert+mountain',capital:'Islamabad',hotspots:['Karachi','Lahore','Islamabad'] },
        { code:'IR', name:'Iran',            lat:32.43, lng:53.69, terrain:'desert+mountain',capital:'Tehran', hotspots:['Tehran','Mashhad'] },
        { code:'IQ', name:'Iraq',            lat:33.22, lng:43.68, terrain:'desert',         capital:'Baghdad', hotspots:['Baghdad','Mosul','Basra'] },
        { code:'SA', name:'Saudi Arabia',    lat:23.89, lng:45.08, terrain:'desert',         capital:'Riyadh', hotspots:['Riyadh','Jeddah','Mecca'] },
        { code:'AF', name:'Afghanistan',     lat:33.94, lng:67.71, terrain:'mountain',       capital:'Kabul',   hotspots:['Kabul','Kandahar'] },
        { code:'SY', name:'Syria',            lat:34.80, lng:38.99, terrain:'desert',         capital:'Damascus',hotspots:['Damascus','Aleppo'] },
        { code:'VN', name:'Vietnam',         lat:14.06, lng:108.28,terrain:'jungle',         capital:'Hanoi',   hotspots:['Hanoi','Ho Chi Minh City'] },
        { code:'TH', name:'Thailand',        lat:15.87, lng:100.99,terrain:'jungle',         capital:'Bangkok', hotspots:['Bangkok','Chiang Mai'] },
        { code:'ID', name:'Indonesia',       lat:-0.79, lng:113.92,terrain:'island+jungle',  capital:'Jakarta', hotspots:['Jakarta','Surabaya'] },
        { code:'PH', name:'Philippines',     lat:12.88, lng:121.77,terrain:'island+jungle',  capital:'Manila',   hotspots:['Manila','Davao'] },
        { code:'MY', name:'Malaysia',        lat:4.21,  lng:101.98,terrain:'jungle',         capital:'Kuala Lumpur',hotspots:['Kuala Lumpur'] },
        { code:'IL', name:'Israel',          lat:31.05, lng:34.85, terrain:'desert+urban',   capital:'Jerusalem',hotspots:['Tel Aviv','Jerusalem','Haifa'] },
        { code:'KZ', name:'Kazakhstan',      lat:48.02, lng:66.92, terrain:'plains',         capital:'Astana',  hotspots:['Almaty','Astana'] },
        { code:'MM', name:'Myanmar',         lat:21.91, lng:95.96, terrain:'jungle',         capital:'Naypyidaw',hotspots:['Yangon'] },
        { code:'BD', name:'Bangladesh',      lat:23.68, lng:90.36, terrain:'jungle',         capital:'Dhaka',   hotspots:['Dhaka','Chittagong'] },
      ]
    },
    {
      id: 'americas', name:'AMERICAS', color: 0xFFD700,
      countries: [
        { code:'US', name:'United States',   lat:37.09, lng:-95.71,terrain:'varied',         capital:'Washington DC', hotspots:['New York','Los Angeles','Washington DC','Chicago','Miami'] },
        { code:'CA', name:'Canada',          lat:56.13, lng:-106.35,terrain:'forest+tundra', capital:'Ottawa',  hotspots:['Toronto','Vancouver','Montreal'] },
        { code:'MX', name:'Mexico',          lat:23.63, lng:-102.55,terrain:'desert+mountain',capital:'Mexico City',hotspots:['Mexico City','Guadalajara'] },
        { code:'BR', name:'Brazil',          lat:-14.24,lng:-51.93,terrain:'jungle',        capital:'Brasília',hotspots:['São Paulo','Rio de Janeiro','Brasília'] },
        { code:'AR', name:'Argentina',       lat:-38.42,lng:-63.62,terrain:'plains',         capital:'Buenos Aires',hotspots:['Buenos Aires','Córdoba'] },
        { code:'CO', name:'Colombia',        lat:4.57,  lng:-74.30,terrain:'jungle+mountain', capital:'Bogotá',  hotspots:['Bogotá','Medellín'] },
        { code:'PE', name:'Peru',             lat:-9.19, lng:-75.02,terrain:'mountain',       capital:'Lima',    hotspots:['Lima'] },
        { code:'VE', name:'Venezuela',        lat:6.42,  lng:-66.59,terrain:'jungle',         capital:'Caracas', hotspots:['Caracas'] },
        { code:'CL', name:'Chile',            lat:-35.68,lng:-71.54,terrain:'mountain+coastal',capital:'Santiago',hotspots:['Santiago'] },
        { code:'BO', name:'Bolivia',          lat:-16.29,lng:-63.59,terrain:'mountain',       capital:'Sucre',   hotspots:['La Paz'] },
        { code:'CU', name:'Cuba',             lat:21.52, lng:-77.78,terrain:'island',         capital:'Havana',  hotspots:['Havana'] },
        { code:'EC', name:'Ecuador',          lat:-1.83, lng:-78.18,terrain:'mountain',       capital:'Quito',   hotspots:['Quito','Guayaquil'] },
        { code:'PY', name:'Paraguay',         lat:-23.44,lng:-58.44,terrain:'plains',        capital:'Asunción',hotspots:['Asunción'] },
        { code:'UY', name:'Uruguay',          lat:-32.53,lng:-55.77,terrain:'plains',         capital:'Montevideo',hotspots:['Montevideo'] },
      ]
    },
    {
      id: 'oceania', name:'OCEANIA', color: 0x00FF7F,
      countries: [
        { code:'AU', name:'Australia',       lat:-25.27,lng:133.78,terrain:'desert+coastal', capital:'Canberra',hotspots:['Sydney','Melbourne','Brisbane'] },
        { code:'NZ', name:'New Zealand',     lat:-40.90,lng:174.89, terrain:'mountain',       capital:'Wellington',hotspots:['Auckland','Wellington'] },
        { code:'PG', name:'Papua New Guinea',lat:-6.31, lng:143.96, terrain:'jungle',         capital:'Port Moresby',hotspots:['Port Moresby'] },
        { code:'FJ', name:'Fiji',             lat:-16.58,lng:179.41,terrain:'island',         capital:'Suva',    hotspots:['Suva'] },
      ]
    },
    {
      id:'middle_east', name:'MIDDLE EAST', color: 0xFF8C00,
      countries: [
        { code:'AE', name:'UAE',             lat:23.42, lng:53.85, terrain:'desert+urban',   capital:'Abu Dhabi',hotspots:['Dubai','Abu Dhabi'] },
        { code:'QA', name:'Qatar',            lat:25.35, lng:51.18, terrain:'desert',         capital:'Doha',    hotspots:['Doha'] },
        { code:'KW', name:'Kuwait',           lat:29.31, lng:47.48, terrain:'desert',         capital:'Kuwait City',hotspots:['Kuwait City'] },
        { code:'JO', name:'Jordan',           lat:30.59, lng:36.24, terrain:'desert',         capital:'Amman',   hotspots:['Amman'] },
        { code:'LB', name:'Lebanon',          lat:33.85, lng:35.86, terrain:'mountain+coastal',capital:'Beirut',hotspots:['Beirut'] },
        { code:'YE', name:'Yemen',            lat:15.55, lng:48.52, terrain:'desert+mountain',capital:'Sanaa',  hotspots:['Sanaa','Aden'] },
        { code:'OM', name:'Oman',             lat:21.51, lng:55.92, terrain:'desert',         capital:'Muscat', hotspots:['Muscat'] },
        { code:'BH', name:'Bahrain',          lat:25.93, lng:50.64, terrain:'island',         capital:'Manama', hotspots:['Manama'] },
      ]
    }
  ],

  // Ocean zones for naval combat
  oceans: [
    { name:'Atlantic Ocean',   lat:0, lng:-30,  size:'massive' },
    { name:'Pacific Ocean',    lat:0, lng:-160,  size:'massive' },
    { name:'Indian Ocean',     lat:-20,lng:80,   size:'massive' },
    { name:'Arctic Ocean',     lat:80,lng:0,     size:'large' },
    { name:'Southern Ocean',   lat:-70,lng:0,    size:'large' },
  ]
};

// Count total countries
function getTotalCountries() {
  return WORLD_MAP.regions.reduce((sum, r) => sum + r.countries.length, 0);
}

// ====== DICE ROLL LOCATION PICKER ======
// After teams assemble, a dice rolls on the flat world map.
// It tumbles and lands on a random location. Team picks exact point.
// Teams can accept or bid coins to alter. Highest bidder wins.

const DICE_FACES = [1,2,3,4,5,6];
const DICE_SIZES = ['D4','D6','D8','D10','D12','D20'];

function rollLocationDice() {
  // Pick random region
  const region = WORLD_MAP.regions[Math.floor(Math.random() * WORLD_MAP.regions.length)];
  // Pick random country in region
  const country = region.countries[Math.floor(Math.random() * region.countries.length)];
  // Pick random hotspot or capital
  const useHotspot = Math.random() > 0.3;
  const location = useHotspot && country.hotspots.length > 0
    ? country.hotspots[Math.floor(Math.random() * country.hotspots.length)]
    : country.capital;

  // Dice roll for exact coordinates (adds variance)
  const d20 = Math.ceil(Math.random() * 20);
  const latOffset = (Math.random() - 0.5) * (d20 / 10); // ±1 degree based on dice
  const lngOffset = (Math.random() - 0.5) * (d20 / 10);

  // Dice size affects area of uncertainty
  const diceSize = DICE_SIZES[Math.floor(Math.random() * DICE_SIZES.length)];
  const uncertainty = {
    'D4': 0.5,   // ±0.5 degrees (~55km)
    'D6': 1.0,   // ±1 degree (~111km)
    'D8': 2.0,
    'D10': 3.0,
    'D12': 5.0,
    'D20': 10.0  // ±10 degrees — very imprecise
  }[diceSize];

  return {
    region: region.name,
    regionId: region.id,
    country: country.name,
    countryCode: country.code,
    capital: country.capital,
    location: location,
    terrain: country.terrain,
    lat: country.lat + latOffset,
    lng: country.lng + lngOffset,
    diceRoll: d20,
    diceSize: diceSize,
    uncertainty: uncertainty, // degrees of imprecision
    exact: false, // team hasn't picked exact point yet
    rawRoll: true
  };
}

// Team picks exact point within uncertainty radius
function pickExactPoint(roll, teamLat, teamLng) {
  // Check if team's pick is within uncertainty radius
  const latDiff = Math.abs(teamLat - roll.lat);
  const lngDiff = Math.abs(teamLng - roll.lng);
  const withinRadius = latDiff <= roll.uncertainty && lngDiff <= roll.uncertainty;

  return {
    ...roll,
    exact: true,
    pickedLat: withinRadius ? teamLat : roll.lat, // force within radius if outside
    pickedLng: withinRadius ? teamLng : roll.lng,
    withinRadius: withinRadius,
    teamPick: true
  };
}

// Bidding system — teams bid coins to alter location result
const LOCATION_BID = {
  baseCost: 500,        // base cost to challenge the roll (50 coins = $5)
  multiplier: 1.5,     // each successive bid costs 1.5x more
  maxBids: 5,           // max 5 rounds of bidding

  // Team bids to reroll or pick new location
  bidToReroll(team, currentBid) {
    const minBid = currentBid ? Math.ceil(currentBid * this.multiplier) : this.baseCost;
    return {
      minBid: minBid,
      canAfford: team.coins >= minBid,
      accepted: false
    };
  },

  // Resolve bidding war between teams
  resolveBids(bids) {
    if (!bids || bids.length === 0) return null;
    // Sort by bid amount descending
    const sorted = bids.sort((a, b) => b.amount - a.amount);
    const winner = sorted[0];
    return {
      winner: winner.team,
      amount: winner.amount,
      locationPick: true, // winner gets to pick location
      totalSpent: sorted.reduce((s, b) => s + b.amount, 0),
      allBids: sorted
    };
  }
};

// ====== RECON / SCAN ABILITY ======
// Buy a skill that scans the battlefield and reports to whole team

const RECON_ABILITIES = {
  battlefield_scan: {
    name: 'Battlefield Scan',
    desc: 'Scan entire battlefield. Reveal enemy team composition, positions, and equipped abilities to your whole team.',
    priceUSD: 50,
    priceCoins: 500, // $50 × 10 coins/$
    duration: 10, // seconds
    cooldown: 120, // 2 min cooldown
    reveals: ['enemy_count','enemy_positions','enemy_weapons','enemy_abilities','hidden_threats'],
    report: true, // generates a text report to team
    tier: 'tactical'
  },

  xray_vision: {
    name: 'X-Ray Vision',
    desc: 'See through walls and cover for 30 seconds. Enemy silhouettes visible through any obstacle.',
    priceUSD: 30,
    priceCoins: 300,
    duration: 30,
    cooldown: 90,
    reveals: ['enemy_positions_through_walls'],
    tier: 'tactical'
  },

  enemy_ability_reveal: {
    name: 'Threat Assessment',
    desc: 'See what special abilities and killstreaks enemies have equipped and ready to deploy.',
    priceUSD: 25,
    priceCoins: 250,
    duration: 15,
    cooldown: 60,
    reveals: ['enemy_abilities','enemy_killstreaks','enemy_premium_tier'],
    tier: 'tactical'
  },

  dimensional_radar: {
    name: 'Dimensional Radar',
    desc: 'See ALL dimensional activity — who is in 4D, 6D, 7D, 8D. See void zones, quantum shifts, and cosmic portals.',
    priceUSD: 55,
    priceCoins: 550,
    duration: 20,
    cooldown: 90,
    reveals: ['4d_positions','6d_quantum_state','7d_void_zones','8d_cosmic_portals','banishment_targets'],
    tier: 'dimensional'
  },

  recon_drone: {
    name: 'Recon Drone Swarm',
    desc: 'Deploy 5 micro-drones that patrol the map and tag every enemy. Real-time tracking for 60 seconds.',
    priceUSD: 35,
    priceCoins: 350,
    duration: 60,
    cooldown: 180,
    reveals: ['real_time_tracking','enemy_movement_patterns','patrol_routes'],
    tier: 'tactical'
  },

  satellite_uplink: {
    name: 'Satellite Uplink',
    desc: 'Call in satellite surveillance. Top-down view of entire map, all enemy positions marked, for 45 seconds.',
    priceUSD: 45,
    priceCoins: 450,
    duration: 45,
    cooldown: 150,
    reveals: ['full_map_top_down','all_enemy_positions','vehicle_positions','loot_locations'],
    tier: 'strategic'
  },

  perception_field: {
    name: 'Perception Field Generator',
    desc: 'Deploy a perception field around your squad. Any enemy that enters 50m radius is automatically detected and reported. Lasts 90 seconds.',
    priceUSD: 40,
    priceCoins: 400,
    duration: 90,
    cooldown: 120,
    reveals: ['proximity_detection','enemy_direction','enemy_distance','enemy_speed'],
    tier: 'tactical'
  }
};

// ====== CRAZY CHEAT SKILLS — People Would Pay For These ======

const CHEAT_SKILLS = {
  // Combat cheats
  bullet_time: {
    name: 'Bullet Time',
    desc: 'Slow down time for everyone EXCEPT you for 10 seconds. Move at normal speed while enemies crawl.',
    priceUSD: 40, priceCoins: 400, duration: 10, cooldown: 180, category: 'time',
    icon: '⏰', rarity: 'epic', effect: 'time_dilation_self_immune'
  },
  double_damage: {
    name: 'Double Damage',
    desc: '2x weapon damage for 30 seconds. Every hit hits twice as hard.',
    priceUSD: 15, priceCoins: 150, duration: 30, cooldown: 120, category: 'combat',
    icon: '💥', rarity: 'rare', effect: 'damage_multiplier_2x'
  },
  lucky_shot: {
    name: 'Lucky Shot',
    desc: 'Your next shot is a guaranteed headshot. One use per purchase.',
    priceUSD: 25, priceCoins: 250, duration: 0, cooldown: 0, category: 'combat',
    icon: '🎯', rarity: 'rare', effect: 'guaranteed_headshot', oneTime: true
  },
  invisibility: {
    name: 'Ghost Protocol',
    desc: 'Become fully invisible for 15 seconds. No shimmer, no sound. Pure stealth.',
    priceUSD: 35, priceCoins: 350, duration: 15, cooldown: 150, category: 'stealth',
    icon: '👻', rarity: 'epic', effect: 'full_invisibility'
  },
  shield_dome: {
    name: 'Shield Dome',
    desc: 'Deploy a dome shield that blocks ALL damage for 10 seconds. You can shoot out, they can\'t shoot in.',
    priceUSD: 35, priceCoins: 350, duration: 10, cooldown: 120, category: 'defense',
    icon: '🛡️', rarity: 'epic', effect: 'full_damage_immunity_dome'
  },
  speed_demon: {
    name: 'Speed Demon',
    desc: '3x movement speed for 15 seconds. Outrun bullets. Flank in seconds.',
    priceUSD: 20, priceCoins: 200, duration: 15, cooldown: 90, category: 'movement',
    icon: '⚡', rarity: 'rare', effect: 'speed_3x'
  },

  // Psychological cheats
  death_fake: {
    name: 'Death Fake',
    desc: 'Fake your death. Your body drops, enemies think you\'re dead. You go invisible for 10 seconds. Resurrect behind enemy lines.',
    priceUSD: 15, priceCoins: 150, duration: 10, cooldown: 120, category: 'psychological',
    icon: '💀', rarity: 'rare', effect: 'fake_death_invisible_respawn'
  },
  enemy_confusion: {
    name: 'Sensory Hack',
    desc: 'Enemy HUDs reverse — left becomes right, up becomes down. Total disorientation for 15 seconds.',
    priceUSD: 40, priceCoins: 400, duration: 15, cooldown: 180, category: 'psychological',
    icon: '🤯', rarity: 'epic', effect: 'enemy_hud_reverse'
  },
  gravity_flip: {
    name: 'Gravity Flip',
    desc: 'Flip gravity for ALL enemies only. They fall to the ceiling for 10 seconds. You stay grounded.',
    priceUSD: 50, priceCoins: 500, duration: 10, cooldown: 200, category: 'psychological',
    icon: '🔄', rarity: 'legendary', effect: 'gravity_flip_enemies_only'
  },

  // Dimensional cheats
  quantum_peek: {
    name: 'Quantum Peek',
    desc: 'See into all 3 quantum realities simultaneously for 15 seconds. No one can hide in any dimension.',
    priceUSD: 35, priceCoins: 350, duration: 15, cooldown: 120, category: 'dimensional',
    icon: '🔮', rarity: 'epic', effect: 'see_all_quantum_states'
  },
  reality_anchor: {
    name: 'Reality Anchor',
    desc: 'Lock the area — NO ONE can use dimensional abilities (4D, 6D, 7D, 8D) for 20 seconds. Pure 3D combat.',
    priceUSD: 40, priceCoins: 400, duration: 20, cooldown: 180, category: 'dimensional',
    icon: '⚓', rarity: 'legendary', effect: 'lock_all_dimensions'
  },
  void_trap: {
    name: 'Void Trap',
    desc: 'Place a void trap on the ground. First enemy to step on it is banished to the Void for 30 seconds.',
    priceUSD: 30, priceCoins: 300, duration: 0, cooldown: 90, category: 'dimensional',
    icon: '🕳️', rarity: 'epic', effect: 'void_banishment_trap'
  },

  // Economy cheats
  banishment_insurance: {
    name: 'Banishment Insurance',
    desc: 'If you get banished to deep space, instantly return for free. One use per purchase.',
    priceUSD: 70, priceCoins: 700, duration: 0, cooldown: 0, category: 'defense',
    icon: '🚀', rarity: 'legendary', effect: 'instant_banishment_return', oneTime: true
  },
  ammo_refill: {
    name: 'Infinite Ammo',
    desc: 'Unlimited ammo for all weapons for 30 seconds. No reload needed.',
    priceUSD: 10, priceCoins: 100, duration: 30, cooldown: 120, category: 'combat',
    icon: '📡', rarity: 'rare', effect: 'infinite_ammo'
  },
  respawn_insurance: {
    name: 'Respawn Insurance',
    desc: 'When you die, instantly respawn with full health and ammo. No respawn timer. One use per purchase.',
    priceUSD: 20, priceCoins: 200, duration: 0, cooldown: 0, category: 'defense',
    icon: '⚕️', rarity: 'rare', effect: 'instant_respawn_full', oneTime: true
  },
  squad_revive: {
    name: 'Squad Revive Beacon',
    desc: 'Instantly revive ALL dead squad members with full health. The ultimate comeback mechanic.',
    priceUSD: 45, priceCoins: 450, duration: 0, cooldown: 180, category: 'support',
    icon: '💚', rarity: 'legendary', effect: 'revive_all_squad'
  },

  // Ultimate cheats
  echo_clone: {
    name: 'Echo Clone',
    desc: 'Create a ghost copy of yourself that fights alongside you for 30 seconds. It has your weapons and abilities.',
    priceUSD: 55, priceCoins: 550, duration: 30, cooldown: 200, category: 'ultimate',
    icon: '👥', rarity: 'legendary', effect: 'spawn_fighting_clone'
  },
  kill_reversal: {
    name: 'Kill Reversal',
    desc: 'Undo the last kill against your team. The killed squad member comes back to life instantly. Enemy who got the kill loses the points.',
    priceUSD: 60, priceCoins: 600, duration: 0, cooldown: 0, category: 'ultimate',
    icon: '⏪', rarity: 'mythic', effect: 'undo_last_kill', oneTime: true
  },
  time_steal: {
    name: 'Time Steal',
    desc: 'Steal 30 seconds from the enemy team\'s match timer. They lose 30 seconds, you gain 30 seconds.',
    priceUSD: 50, priceCoins: 500, duration: 0, cooldown: 240, category: 'ultimate',
    icon: '🕰️', rarity: 'legendary', effect: 'steal_match_time'
  },
  airstrike_coupon: {
    name: 'Airstrike Coupon',
    desc: 'Call an immediate airstrike without earning a killstreak. 3 bombing runs over enemy positions.',
    priceUSD: 45, priceCoins: 450, duration: 0, cooldown: 180, category: 'ultimate',
    icon: '✈️', rarity: 'legendary', effect: 'instant_airstrike'
  },
  health_vamp: {
    name: 'Vampire Mode',
    desc: 'Heal 50% of all damage you deal for 30 seconds. Become unstoppable by becoming a vampire.',
    priceUSD: 20, priceCoins: 200, duration: 30, cooldown: 120, category: 'combat',
    icon: '🧛', rarity: 'epic', effect: 'lifesteal_50_percent'
  },
  streak_protector: {
    name: 'Streak Shield',
    desc: 'Your killstreak cannot be ended for 60 seconds. Even if you die, your streak continues.',
    priceUSD: 30, priceCoins: 300, duration: 60, cooldown: 180, category: 'combat',
    icon: '🔥', rarity: 'epic', effect: 'streak_protection'
  },
  teleport_anchor: {
    name: 'Teleport Anchor',
    desc: 'Place a beacon anywhere. Teleport back to it instantly at any time. The perfect escape tool.',
    priceUSD: 25, priceCoins: 250, duration: 0, cooldown: 60, category: 'movement',
    icon: '📍', rarity: 'rare', effect: 'place_recall_beacon'
  },
  loot_vision: {
    name: 'Loot Vision',
    desc: 'See all loot, rare items, and special weapons through walls for 20 seconds. Never miss the good stuff.',
    priceUSD: 25, priceCoins: 250, duration: 20, cooldown: 90, category: 'recon',
    icon: '📦', rarity: 'rare', effect: 'see_all_loot'
  },
  emp_burst: {
    name: 'EMP Burst',
    desc: 'Disable all enemy electronics, abilities, and killstreaks for 10 seconds. Total blackout.',
    priceUSD: 30, priceCoins: 300, duration: 10, cooldown: 150, category: 'tactical',
    icon: '🔌', rarity: 'epic', effect: 'disable_enemy_electronics'
  },
  adrenaline_rush: {
    name: 'Adrenaline Rush',
    desc: 'Full health + 2x speed + 2x damage + infinite ammo for 5 seconds. THE clutch button.',
    priceUSD: 15, priceCoins: 150, duration: 5, cooldown: 90, category: 'ultimate',
    icon: '💉', rarity: 'epic', effect: 'god_mode_5_seconds'
  },

  // THE MOST EXPENSIVE CRAZY SKILLS
  god_mode: {
    name: '5-Second God Mode',
    desc: 'Invincible, infinite ammo, 3x damage, 3x speed, see all dimensions. 5 seconds of pure godhood.',
    priceUSD: 100, priceCoins: 1000, duration: 5, cooldown: 300, category: 'ultimate',
    icon: '👑', rarity: 'mythic', effect: 'full_god_mode'
  },
  nuke_button: {
    name: 'Personal Nuke',
    desc: 'One personal tactical nuke. Drops on your designated target. Wipes everything in 100m radius. One per match.',
    priceUSD: 150, priceCoins: 1500, duration: 0, cooldown: 0, category: 'ultimate',
    icon: '☢️', rarity: 'mythic', effect: 'tactical_nuke', oneTime: true
  },
  galaxy_bomb: {
    name: 'Galaxy Bomb',
    desc: 'Detonate a galaxy-scale bomb. Every enemy within 500m is banished to another galaxy. They must pay coins to return. THE ultimate flex.',
    priceUSD: 200, priceCoins: 2000, duration: 0, cooldown: 0, category: 'cosmic',
    icon: '🌌', rarity: 'mythic', effect: 'mass_galaxy_banishment', oneTime: true
  },
  reality_reset: {
    name: 'Reality Reset',
    desc: 'Reset the entire battlefield to its original state. All destruction, all dimensional tears, all modifications — GONE. Start fresh.',
    priceUSD: 120, priceCoins: 1200, duration: 0, cooldown: 0, category: 'cosmic',
    icon: '🔄', rarity: 'mythic', effect: 'reset_battlefield', oneTime: true
  }
};

// ====== ADMIN PANEL DATA ======
// Admin (Loveth) can set prices, manage catalog, view stats

const ADMIN_PANEL = {
  // Currency conversion
  coinRate: { USD: 10, EUR: 9, GBP: 8, NGN: 15 }, // 1 USD = 10 coins, etc.
  coinPackages: [
    { coins: 500,  priceUSD: 50,   bonus: 0,    label: 'Starter Pack' },
    { coins: 1100, priceUSD: 100,  bonus: 100,  label: 'Soldier Pack' },
    { coins: 3000, priceUSD: 250,  bonus: 500,  label: 'Officer Pack' },
    { coins: 7000, priceUSD: 500,  bonus: 2000, label: 'General Pack' },
    { coins: 20000,priceUSD: 1500, bonus: 5000, label: 'Supreme Pack' },
  ],

  // Admin settings — Loveth controls these
  settings: {
    weaponPriceMultiplier: 1.0,    // multiply all weapon prices
    ammoPriceMultiplier: 1.0,
    skillPriceMultiplier: 1.0,
    premiumTierMultiplier: 1.0,
    banishReturnCost: 500,         // coins to return from banishment
    galaxyReturnCost: 2000,        // coins to return from galaxy banishment
    maxCheatsPerMatch: 5,
    maxCheatsPerPlayer: 3,
    battleRoyalePlayers: 60,
    teamTagSize: 20,               // squad members per team
    diceRollEnabled: true,
    biddingEnabled: true,
    defconModeEnabled: true,
  },

  // Get full catalog for admin
  getFullCatalog() {
    const catalog = {};
    // Weapons by era
    for (let era = 0; era <= 11; era++) {
      catalog['era_' + era] = Object.entries(
        typeof WEAPON_DB_EXPANDED !== 'undefined'
          ? WEAPON_DB_EXPANDED
          : (typeof require !== 'undefined' ? require('./expanded_data.js').WEAPON_DB_EXPANDED : {})
      )
        .filter(([k,w]) => w.era === era)
        .map(([k,w]) => ({
          key: k, name: w.name, type: w.type, dmg: w.dmg,
          priceCoins: Math.ceil((w.dmg * 10 + (w.range||100) * 2) * (this.settings.weaponPriceMultiplier||1)),
          priceUSD: ((w.dmg * 10 + (w.range||100) * 2) / 10 * (this.settings.weaponPriceMultiplier||1)).toFixed(2)
        }));
    }
    // Skills
    catalog['skills'] = Object.entries(CHEAT_SKILLS).map(([k,s]) => ({
      key: k, name: s.name, category: s.category,
      priceCoins: Math.ceil(s.priceCoins * (this.settings.skillPriceMultiplier||1)),
      priceUSD: (s.priceUSD * (this.settings.skillPriceMultiplier||1)).toFixed(2),
      rarity: s.rarity
    }));
    // Recon abilities
    catalog['recon'] = Object.entries(RECON_ABILITIES).map(([k,r]) => ({
      key: k, name: r.name, tier: r.tier,
      priceCoins: Math.ceil(r.priceCoins * (this.settings.skillPriceMultiplier||1)),
      priceUSD: (r.priceUSD * (this.settings.skillPriceMultiplier||1)).toFixed(2)
    }));
    return catalog;
  },

  // Admin updates a weapon price
  setWeaponPrice(weaponKey, newPriceCoins) {
    if (typeof WEAPON_DB_EXPANDED !== 'undefined' && WEAPON_DB_EXPANDED[weaponKey]) {
      WEAPON_DB_EXPANDED[weaponKey].customPrice = newPriceCoins;
      return { success: true, weapon: weaponKey, newPrice: newPriceCoins };
    }
    return { success: false, error: 'Weapon not found' };
  },

  // Admin updates a skill price
  setSkillPrice(skillKey, newPriceCoins) {
    if (CHEAT_SKILLS[skillKey]) {
      CHEAT_SKILLS[skillKey].customPrice = newPriceCoins;
      CHEAT_SKILLS[skillKey].priceCoins = newPriceCoins;
      CHEAT_SKILLS[skillKey].priceUSD = (newPriceCoins / 10).toFixed(2);
      return { success: true, skill: skillKey, newPrice: newPriceCoins };
    }
    return { success: false, error: 'Skill not found' };
  },

  // Admin updates a setting
  updateSetting(key, value) {
    if (this.settings[key] !== undefined) {
      this.settings[key] = value;
      return { success: true, setting: key, value: value };
    }
    return { success: false, error: 'Setting not found' };
  },

  // Get analytics for admin
  getAnalytics() {
    return {
      totalWeapons: typeof WEAPON_DB_EXPANDED !== 'undefined'
        ? Object.keys(WEAPON_DB_EXPANDED).length
        : 262,
      totalSkills: Object.keys(CHEAT_SKILLS).length,
      totalReconAbilities: Object.keys(RECON_ABILITIES).length,
      totalCountries: getTotalCountries(),
      totalRegions: WORLD_MAP.regions.length,
      coinRate: this.coinRate.USD,
      settings: this.settings
    };
  }
};

// ====== EXPORTS ======
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORLD_MAP,
    getTotalCountries,
    rollLocationDice,
    pickExactPoint,
    LOCATION_BID,
    RECON_ABILITIES,
    CHEAT_SKILLS,
    ADMIN_PANEL
  };
}
