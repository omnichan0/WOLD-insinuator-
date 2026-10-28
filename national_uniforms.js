/**
 * OMEGA-8D NATIONAL UNIFORMS & SKINS — ALL 86 COUNTRIES
 * Every country gets: soldier uniform, special forces skin, flag cosmetic, weapon skin
 */

const NATIONAL_UNIFORMS = {
  // Generate uniforms for all 86 countries
  uniforms: {},

  // Country data with flag colors and military info
  countryData: {
    // Africa (18 countries)
    NGA: { name: 'Nigeria', flagColors: ['#008751','#FFFFFF','#008751'], army: 'Nigerian Army', sf: 'Nigerian Navy SBS', camo: 'woodland', desc: 'Green and white national colors' },
    EGY: { name: 'Egypt', flagColors: ['#CE1126','#FFFFFF','#000000'], army: 'Egyptian Army', sf: 'Unit 777', camo: 'desert', desc: 'Red white black tricolor' },
    ZAF: { name: 'South Africa', flagColors: ['#007749','#FFFFFF','#DE3831','#002395'], army: 'South African Army', sf: 'Special Forces Brigade', camo: 'desert', desc: 'Multi-color flag with green, white, red, blue' },
    KEN: { name: 'Kenya', flagColors: ['#000000','#BB0A1E','#FFFFFF','#006600'], army: 'Kenya Army', sf: 'Kenya SOF', camo: 'woodland', desc: 'Black red green with shield' },
    DZA: { name: 'Algeria', flagColors: ['#006233','#FFFFFF','#D21034'], army: 'ANP', sf: 'Special Intervention Group', camo: 'desert', desc: 'Green white green with red crescent' },
    MAR: { name: 'Morocco', flagColors: ['#C1272D','#006233'], army: 'Royal Moroccan Army', sf: 'Groupe des Forces', camo: 'desert', desc: 'Red with green star' },
    ETH: { name: 'Ethiopia', flagColors: ['#078930','#FCDD09','#DA121A'], army: 'Ethiopian Army', sf: 'Agazi Division', camo: 'woodland', desc: 'Green yellow red tricolor' },
    SDN: { name: 'Sudan', flagColors: ['#00722C','#FFFFFF','#D21034'], army: 'SAF', sf: 'Rapid Support Forces', camo: 'desert', desc: 'Green white red black' },
    LBY: { name: 'Libya', flagColors: ['#231F20','#239E46','#FFFFFF','#DA291C'], army: 'Libyan Army', sf: 'Thunderbolt Battalion', camo: 'desert', desc: 'Red black green with crescent' },
    TZA: { name: 'Tanzania', flagColors: ['#1EB53A','#00A3DD','#FCD116','#000000'], army: 'Tanzania People\'s Defence Force', sf: 'TPDF Commandos', camo: 'woodland', desc: 'Green blue yellow diagonal' },
    GHA: { name: 'Ghana', flagColors: ['#CE1126','#FCD116','#00722C'], army: 'Ghana Army', sf: 'Ghana SF Regiment', camo: 'woodland', desc: 'Red gold green tricolor' },
    AGO: { name: 'Angola', flagColors: ['#CE1126','#000000','#FCD116'], army: 'FAA', sf: 'Marine Brigade', camo: 'woodland', desc: 'Red black with yellow symbols' },
    UGA: { name: 'Uganda', flagColors: ['#000000','#FFFF00','#FF0000'], army: 'UPDF', sf: 'UPDF SF', camo: 'woodland', desc: 'Black yellow red with crane' },
    SEN: { name: 'Senegal', flagColors: ['#00853F','#FDEF42','#E31B23'], army: 'Senegalese Army', sf: 'Senegal Commando', camo: 'desert', desc: 'Green yellow red tricolor' },
    ZWE: { name: 'Zimbabwe', flagColors: ['#008751','#FFFFFF','#000000','#DE0000'], army: 'ZNA', sf: 'ZNA Commando', camo: 'woodland', desc: 'Green white red black' },
    CMR: { name: 'Cameroon', flagColors: ['#007A5E','#CE1126','#FCD116'], army: 'Cameroon Army', sf: 'Bataillon d\'Intervention Rapide', camo: 'woodland', desc: 'Green red yellow vertical' },
    COD: { name: 'DR Congo', flagColors: ['#007FFF','#CE1126','#FCD116'], army: 'FARDC', sf: 'FARDC Republican Guard', camo: 'woodland', desc: 'Blue red yellow with star' },
    RWA: { name: 'Rwanda', flagColors: ['#00A1DE','#FAD201','#20603D','#0051BA'], army: 'RDF', sf: 'RDF Commandos', camo: 'woodland', desc: 'Blue yellow green with sun' },

    // Europe (22 countries)
    RUS: { name: 'Russia', flagColors: ['#FFFFFF','#0039A6','#D52B1E'], army: 'Russian Ground Forces', sf: 'Spetsnaz GRU', camo: 'digital_flora', desc: 'White blue red horizontal' },
    GBR: { name: 'United Kingdom', flagColors: ['#012169','#FFFFFF','#C8102E'], army: 'British Army', sf: 'SAS / SBS', camo: 'mtp', desc: 'Union Jack' },
    FRA: { name: 'France', flagColors: ['#0055A4','#FFFFFF','#EF4135'], army: 'Armee de Terre', sf: 'COS / 1er RPIMa', camo: 'cecen', desc: 'Blue white red tricolor' },
    DEU: { name: 'Germany', flagColors: ['#000000','#DD0000','#FFCE00'], army: 'Bundeswehr', sf: 'KSK', camo: 'flecktarn', desc: 'Black red gold horizontal' },
    ITA: { name: 'Italy', flagColors: ['#009246','#FFFFFF','#CE2B37'], army: 'Esercito Italiano', sf: 'Col Moschin / GIS', camo: 'woodland', desc: 'Green white red vertical' },
    ESP: { name: 'Spain', flagColors: ['#AA151B','#F1BF00'], army: 'Spanish Army', sf: 'GOE / MOE', camo: 'desert', desc: 'Red yellow red horizontal' },
    POL: { name: 'Poland', flagColors: ['#FFFFFF','#DC143C'], army: 'Polish Land Forces', sf: 'GROM / JW Komandosow', camo: 'wz.93', desc: 'White red horizontal' },
    UKR: { name: 'Ukraine', flagColors: ['#0057B7','#FFD700'], army: 'AFU', sf: 'SBU Alpha / Kraken', camo: 'MM-14', desc: 'Blue yellow horizontal' },
    SWE: { name: 'Sweden', flagColors: ['#005293','#FECC02'], army: 'Swedish Army', sf: 'SOG', camo: 'm90', desc: 'Blue yellow Nordic cross' },
    NOR: { name: 'Norway', flagColors: ['#EF2B2D','#002868','#FFFFFF'], army: 'Norwegian Army', sf: 'FSK / MJK', camo: 'woodland', desc: 'Red white blue Nordic cross' },
    NLD: { name: 'Netherlands', flagColors: ['#AE1C28','#FFFFFF','#21468B'], army: 'Royal Netherlands Army', sf: 'KCT', camo: 'woodland', desc: 'Red white blue horizontal' },
    TUR: { name: 'Turkey', flagColors: ['#E30A17','#FFFFFF'], army: 'Turkish Army', sf: 'Bordo Bereliler', camo: 'desert', desc: 'Red with white crescent star' },
    GRC: { name: 'Greece', flagColors: ['#0D5EAF','#FFFFFF'], army: 'Hellenic Army', sf: 'Z\' MAK / ETA', camo: 'woodland', desc: 'Blue white with cross' },
    PRT: { name: 'Portugal', flagColors: ['#006600','#FF0000','#FFFFFF'], army: 'Portuguese Army', sf: 'FOE / DAE', camo: 'woodland', desc: 'Green red with shield' },
    CZE: { name: 'Czech Republic', flagColors: ['#FFFFFF','#FF0000','#0000FF'], army: 'Army of CR', sf: '601st SSG', camo: 'desert', desc: 'White red blue' },
    ROU: { name: 'Romania', flagColors: ['#002B7F','#FCD116','#ED2939'], army: 'Romanian Army', sf: 'SFG / Batalionul 1', camo: 'woodland', desc: 'Blue yellow red vertical' },
    CHE: { name: 'Switzerland', flagColors: ['#FF0000','#FFFFFF'], army: 'Swiss Army', sf: 'Grenadiers', camo: 'alpen', desc: 'Red with white cross' },
    AUT: { name: 'Austria', flagColors: ['#ED2939','#FFFFFF'], army: 'Austrian Army', sf: 'Jagdkommando', camo: 'woodland', desc: 'Red white red horizontal' },
    BEL: { name: 'Belgium', flagColors: ['#000000','#FDDA24','#EF3340'], army: 'Belgian Army', sf: 'SFG / ENE', camo: 'woodland', desc: 'Black yellow red vertical' },
    FIN: { name: 'Finland', flagColors: ['#FFFFFF','#003580'], army: 'Finnish Army', sf: 'SF / Border Guard', camo: 'snow', desc: 'White with blue cross' },
    IRL: { name: 'Ireland', flagColors: ['#169B62','#FFFFFF','#FF883E'], army: 'Irish Army', sf: 'ARW / Ranger Wing', camo: 'woodland', desc: 'Green white orange' },
    DNK: { name: 'Denmark', flagColors: ['#C8102E','#FFFFFF'], army: 'Danish Army', sf: 'Jægerkorpset', camo: 'm84', desc: 'Red white with cross' },

    // Asia (20 countries)
    CHN: { name: 'China', flagColors: ['#DE2910','#FFDE00'], army: 'PLA Ground Force', sf: 'PLA SF / Snow Wolf', camo: 'type07', desc: 'Red with yellow stars' },
    IND: { name: 'India', flagColors: ['#FF9933','#FFFFFF','#138807'], army: 'Indian Army', sf: 'Para SF / NSG', camo: 'desert', desc: 'Saffron white green with chakra' },
    JPN: { name: 'Japan', flagColors: ['#BC002D','#FFFFFF'], army: 'JGSDF', sf: 'SFGp / Special Forces Group', camo: 'type4', desc: 'White with red circle' },
    PRK: { name: 'North Korea', flagColors: ['#024FA2','#FFFFFF','#ED1C27'], army: 'KPA Ground Force', sf: 'Storm Corps', camo: 'woodland', desc: 'Blue red with star' },
    KOR: { name: 'South Korea', flagColors: ['#CD2E3A','#0047A0','#FFFFFF'], army: 'ROK Army', sf: '707th SMB / UDT', camo: 'digital', desc: 'White with taegeuk' },
    PAK: { name: 'Pakistan', flagColors: ['#01411C','#FFFFFF'], army: 'Pakistan Army', sf: 'SSG / Zarrar Company', camo: 'desert', desc: 'Green with white crescent' },
    IRN: { name: 'Iran', flagColors: ['#239F40','#FFFFFF','#DA0000'], army: 'NEZAJA', sf: 'Qods Force / NOPO', camo: 'desert', desc: 'Green white red' },
    IRQ: { name: 'Iraq', flagColors: ['#071F69','#FFFFFF','#EF3340'], army: 'Iraqi Army', sf: 'Iraqi SF / Golden Division', camo: 'desert', desc: 'Red white black with green' },
    SAU: { name: 'Saudi Arabia', flagColors: ['#006C35','#FFFFFF'], army: 'Royal Saudi Army', sf: 'Saudi SF', camo: 'desert', desc: 'Green with white text' },
    AFG: { name: 'Afghanistan', flagColors: ['#000000','#FFFFFF','#007A00'], army: 'ANDSF', sf: 'Commando Corps', camo: 'woodland', desc: 'Black red green' },
    SYR: { name: 'Syria', flagColors: ['#CE1126','#FFFFFF','#000000'], army: 'Syrian Army', sf: 'Tiger Forces', camo: 'desert', desc: 'Red white black' },
    VNM: { name: 'Vietnam', flagColors: ['#DA251D','#FFFF00'], army: 'PAVN', sf: 'Đặc công / Sapper', camo: 'woodland', desc: 'Red with yellow star' },
    THA: { name: 'Thailand', flagColors: ['#ED1C24','#FFFFFF','#241D4F'], army: 'Royal Thai Army', sf: 'NCG / RTNSF', camo: 'woodland', desc: 'Red white blue white red' },
    IDN: { name: 'Indonesia', flagColors: ['#FF0000','#FFFFFF'], army: 'Indonesian Army', sf: 'Kopassus', camo: 'woodland', desc: 'Red over white' },
    PHL: { name: 'Philippines', flagColors: ['#0038A8','#CE1126','#FFFFFF'], army: 'Philippine Army', sf: 'PA SOCOM / LRB', camo: 'woodland', desc: 'Blue red with sun' },
    MYS: { name: 'Malaysia', flagColors: ['#CC0001','#010066','#FFFFFF','#FFCC00'], army: 'Tentera Darat', sf: 'Grup Gerak Khas', camo: 'woodland', desc: 'Red white blue yellow' },
    ISR: { name: 'Israel', flagColors: ['#FFFFFF','#0038B8','#1393D8'], army: 'IDF Ground Forces', sf: 'Sayeret Matkal / Shayetet 13', camo: 'olive_drab', desc: 'White with blue star of David' },
    KAZ: { name: 'Kazakhstan', flagColors: ['#00AFCA','#FFD700'], army: 'Kazakh Army', sf: 'Aibyn Brigade', camo: 'desert', desc: 'Blue with yellow sun' },
    MMR: { name: 'Myanmar', flagColors: ['#FFB300','#EA4B00','#34B233'], army: 'Myanmar Army', sf: 'Myanmar SF', camo: 'woodland', desc: 'Yellow green red' },
    BGD: { name: 'Bangladesh', flagColors: ['#006A4E','#F42A41'], army: 'Bangladesh Army', sf: 'SAW / Para Commando', camo: 'woodland', desc: 'Green with red circle' },

    // Americas (14 countries)
    USA: { name: 'United States', flagColors: ['#3C3B6E','#FFFFFF','#B22234'], army: 'US Army', sf: 'Delta Force / 75th Ranger / Green Beret', camo: 'scorpion_w2', desc: 'Stars and stripes' },
    CAN: { name: 'Canada', flagColors: ['#FF0000','#FFFFFF'], army: 'Canadian Army', sf: 'CANSOFCOM / JTF 2', camo: 'cadpat', desc: 'Red with white maple leaf' },
    MEX: { name: 'Mexico', flagColors: ['#006847','#FFFFFF','#CE1126'], army: 'SEDENA', sf: 'Fuerza Especial / SF Amphibious', camo: 'desert', desc: 'Green white red vertical' },
    BRA: { name: 'Brazil', flagColors: ['#009C3B','#FFDF00','#002776'], army: 'Brazilian Army', sf: 'BOPE / CFF', camo: 'woodland', desc: 'Green yellow with blue globe' },
    ARG: { name: 'Argentina', flagColors: ['#75AADB','#FFFFFF','#FCBF49'], army: 'Argentine Army', sf: 'CADO / CEA', camo: 'woodland', desc: 'Light blue white with sun' },
    COL: { name: 'Colombia', flagColors: ['#FCD116','#003893','#CE1126'], army: 'Colombian Army', sf: 'FUDRA / AFEUR', camo: 'woodland', desc: 'Yellow blue red' },
    PER: { name: 'Peru', flagColors: ['#D91023','#FFFFFF'], army: 'Peruvian Army', sf: 'FOE / Chavin', camo: 'woodland', desc: 'Red white with coat of arms' },
    VEN: { name: 'Venezuela', flagColors: ['#FCD116','#003893','#CF142B'], army: 'Venezuelan Army', sf: 'CEJAFAN / FANB SF', camo: 'woodland', desc: 'Yellow blue red with stars' },
    CHL: { name: 'Chile', flagColors: ['#0039A6','#FFFFFF','#D52B1E'], army: 'Chilean Army', sf: 'GOE / Lautaro', camo: 'woodland', desc: 'Blue white red' },
    BOL: { name: 'Bolivia', flagColors: ['#D52B1E','#F9E300','#007934'], army: 'Bolivian Army', sf: 'FECLAS / DAC', camo: 'woodland', desc: 'Red yellow green' },
    CUB: { name: 'Cuba', flagColors: ['#002A8F','#FFFFFF','#CF142B'], army: 'Revolutionary Army', sf: 'Special Troops', camo: 'woodland', desc: 'Blue white with red triangle' },
    ECU: { name: 'Ecuador', flagColors: ['#FCD116','#003893','#CE1126'], army: 'Ecuadorian Army', sf: 'GOE / Ninth Brigade', camo: 'woodland', desc: 'Yellow blue red with coat' },
    PRY: { name: 'Paraguay', flagColors: ['#D52B1E','#FFFFFF','#0038A8'], army: 'Paraguayan Army', sf: 'FEO / Special Forces', camo: 'woodland', desc: 'Red white blue' },
    URY: { name: 'Uruguay', flagColors: ['#7BB0DA','#FFFFFF'], army: 'Uruguayan Army', sf: 'FNB / Comandos', camo: 'woodland', desc: 'Blue white with sun' },

    // Oceania (4 countries)
    AUS: { name: 'Australia', flagColors: ['#012169','#FFFFFF','#E4002B'], army: 'Australian Army', sf: 'SASR / 2nd Commando', camo: 'amcu', desc: 'Blue with Union Jack and stars' },
    NZL: { name: 'New Zealand', flagColors: ['#012169','#FFFFFF','#E4002B'], army: 'NZ Army', sf: 'NZSAS', camo: 'woodland', desc: 'Blue with Southern Cross' },
    PNG: { name: 'Papua New Guinea', flagColors: ['#000000','#CE1126','#FCD116'], army: 'PNGDF', sf: 'PNG SF', camo: 'woodland', desc: 'Black red yellow with bird' },
    FJI: { name: 'Fiji', flagColors: ['#003DA5','#FFFFFF','#FF0000'], army: 'RFMF', sf: 'Fijian SF', camo: 'woodland', desc: 'Blue with white red' },

    // Middle East (8 countries)
    ARE: { name: 'UAE', flagColors: ['#00732F','#FFFFFF','#000000','#FF0000'], army: 'UAE Army', sf: 'UAE SF / Presidential Guard', camo: 'desert', desc: 'Green white black red' },
    QAT: { name: 'Qatar', flagColors: ['#8D1B26','#FFFFFF'], army: 'Qatari Army', sf: 'Qatar SF', camo: 'desert', desc: 'Maroon white serrated' },
    KWT: { name: 'Kuwait', flagColors: ['#007A3D','#FFFFFF','#CE1126'], army: 'Kuwait Army', sf: 'Kuwait SF / 25th Bde', camo: 'desert', desc: 'Green white red' },
    JOR: { name: 'Jordan', flagColors: ['#000000','#FFFFFF','#007A3D'], army: 'Jordanian Army', sf: 'JSOC / 71st SF Bn', camo: 'desert', desc: 'Black white green with star' },
    LBN: { name: 'Lebanon', flagColors: ['#ED1C24','#FFFFFF','#00A651'], army: 'Lebanese Army', sf: 'Lebanese SF / RP', camo: 'woodland', desc: 'Red white green with cedar' },
    YEM: { name: 'Yemen', flagColors: ['#CF142B','#FFFFFF','#000000'], army: 'Yemeni Army', sf: 'Yemen SF', camo: 'desert', desc: 'Red white black' },
    OMN: { name: 'Oman', flagColors: ['#FFFFFF','#CE1126','#008000'], army: 'Royal Army of Oman', sf: 'Oman SF / Royal Guard', camo: 'desert', desc: 'White red green with emblem' },
    BHR: { name: 'Bahrain', flagColors: ['#FFFFFF','#CE1126'], army: 'BDF', sf: 'Bahrain SF / Royal Guard', camo: 'desert', desc: 'White red serrated' },
  },

  // Generate uniforms for all countries
  generate() {
    for (const [code, country] of Object.entries(this.countryData)) {
      this.uniforms[code] = {
        // Standard military uniform
        standard: {
          name: country.name + ' Army Uniform',
          countryCode: code,
          army: country.army,
          camo: country.camo,
          flagColors: country.flagColors,
          rarity: 'common',
          cost: 500,
          desc: 'Standard issue ' + country.army + ' uniform with ' + country.camo + ' camouflage. ' + country.desc + '.',
          visual: 'Camo pattern: ' + country.camo + '. Flag patch on shoulder. ' + country.army + ' insignia.',
        },

        // Special forces skin
        specialForces: {
          name: country.name + ' Special Forces',
          countryCode: code,
          sfUnit: country.sf,
          camo: country.camo,
          flagColors: country.flagColors,
          rarity: 'rare',
          cost: 1500,
          desc: 'Elite ' + country.sf + ' operator loadout. Full tactical gear, suppressed weapons, night ops capability. The best ' + country.name + ' has to offer.',
          visual: 'Black tactical gear over ' + country.camo + ' base. SF unit patch. Suppressed primary. Night vision mount. No flag (covert).',
        },

        // National hero skin (legendary)
        nationalHero: {
          name: country.name + ' National Hero',
          countryCode: code,
          army: country.army,
          flagColors: country.flagColors,
          rarity: 'legendary',
          cost: 5000,
          desc: 'Legendary skin representing ' + country.name + '\'s finest warrior. Flag-colored armor with national emblem. Inspires allies, intimidates enemies.',
          visual: 'Armor painted in ' + country.flagColors.join(', ') + ' flag colors. National emblem on chest. Glowing eyes. Battlefield aura visible to all.',
        },

        // Flag cosmetic (weapon skin)
        flagWeaponSkin: {
          name: country.name + ' Flag Weapon Skin',
          countryCode: code,
          flagColors: country.flagColors,
          rarity: 'rare',
          cost: 1000,
          desc: 'Paint your weapon in ' + country.name + '\'s flag colors. ' + country.desc,
          visual: 'Weapon painted in ' + country.flagColors.join(' / ') + ' flag pattern',
        },

        // Commander skin (epic)
        commander: {
          name: country.name + ' Field Commander',
          countryCode: code,
          army: country.army,
          flagColors: country.flagColors,
          rarity: 'epic',
          cost: 3000,
          desc: 'Field commander uniform with rank insignia, tactical map holder, and command cape in national colors. For those who lead.',
          visual: 'Officer uniform with ' + country.camo + ' base. Gold rank insignia. Command cape in flag colors. Tactical map wrist display.',
        },

        // Mythic national skin
        mythicNational: {
          name: country.name + ' Eternal Warrior',
          countryCode: code,
          flagColors: country.flagColors,
          rarity: 'mythic',
          cost: 12000,
          desc: 'Mythic skin. The eternal warrior of ' + country.name + '. Armor forged from the nation\'s spirit. Flag colors glow with ethereal light. Only obtainable by reaching max rank in ' + country.name + '\'s national campaign.',
          visual: 'Translucent armor in flag colors. Ethereal glow. National emblem floats above operator. Footsteps leave flag-colored light trails.',
          unlockCondition: 'Reach max rank in ' + code + ' national campaign',
        },
      };
    }

    return Object.keys(this.uniforms).length;
  },

  // Get uniforms for a specific country
  getCountry(code) {
    return this.uniforms[code] || null;
  },

  // Get all uniforms
  getCount() { return Object.keys(this.uniforms).length; },
  getAll() {
    return this.uniforms;
  },

  // Get total items
  getTotalItems() {
    if (Object.keys(this.uniforms).length === 0) this.generate();
    return Object.keys(this.uniforms).length * 6; // 6 items per country
  },

  // Get shop summary
  getShop() {
    if (Object.keys(this.uniforms).length === 0) this.generate();
    const count = Object.keys(this.uniforms).length;
    return {
      countries: count,
      itemsPerCountry: 6,
      totalItems: count * 6,
      breakdown: {
        standardUniforms: count,
        specialForcesSkins: count,
        nationalHeroSkins: count,
        flagWeaponSkins: count,
        commanderSkins: count,
        mythicNationalSkins: count,
      },
    };
  },
};

// Generate on load
NATIONAL_UNIFORMS.generate();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NATIONAL_UNIFORMS };
}
if (typeof window !== 'undefined') {
  window.NATIONAL_UNIFORMS = NATIONAL_UNIFORMS;
}
