/**
 * OMEGA-8D SKINS, COSMETICS & SOLDIER UNIFORMS — 150 COUNTRIES
 * Each country gets: standard uniform, special forces skin, national hero skin,
 * flag weapon skin, commander skin, mythic eternal warrior skin
 * Total: 150 countries × 6 cosmetics = 900 cosmetics
 * Plus universal cosmetics (not country-specific)
 */

const SKINS_COSMETICS = {

  // 150 countries with full cosmetic sets
  countries: {
    // Africa (54 countries)
    Nigeria: { code: "NG", flag: "🇳🇬", camo: "Nigerian Woodland", armyColor: "#1a4b2e", accentColor: "#00875a" },
    Egypt: { code: "EG", flag: "🇪🇬", camo: "Desert Sand", armyColor: "#c4a35a", accentColor: "#d4af37" },
    SouthAfrica: { code: "ZA", flag: "🇿🇦", camo: "Bushveld Camo", armyColor: "#3d5a3d", accentColor: "#007749" },
    Ethiopia: { code: "ET", flag: "🇪🇹", camo: "Highland Green", armyColor: "#2d5a1e", accentColor: "#1a8a3a" },
    Kenya: { code: "KE", flag: "🇰🇪", camo: "Savanna Tan", armyColor: "#8a7355", accentColor: "#006b3f" },
    Morocco: { code: "MA", flag: "🇲🇦", camo: "Atlas Desert", armyColor: "#9c7c4a", accentColor: "#c1272d" },
    Algeria: { code: "DZ", flag: "🇩🇿", camo: "Sahara Beige", armyColor: "#a89060", accentColor: "#006233" },
    Tunisia: { code: "TN", flag: "🇹🇳", camo: "Coastal Sand", armyColor: "#b09050", accentColor: "#d70026" },
    Libya: { code: "LY", flag: "🇱🇾", camo: "Desert Olive", armyColor: "#7a8a3a", accentColor: "#239e46" },
    Sudan: { code: "SD", flag: "🇸🇩", camo: "Nile Green", armyColor: "#3a5a2a", accentColor: "#00722f" },
    Ghana: { code: "GH", flag: "🇬🇭", camo: "Forest Green", armyColor: "#2a4a1e", accentColor: "#fcd116" },
    Cameroon: { code: "CM", flag: "🇨🇲", camo: "Jungle Stripe", armyColor: "#1e5a1e", accentColor: "#007a5e" },
    IvoryCoast: { code: "CI", flag: "🇨🇮", camo: "Tropical Woodland", armyColor: "#2a4a2a", accentColor: "#f77f00" },
    Senegal: { code: "SN", flag: "🇸🇳", camo: "Sahel Brown", armyColor: "#8a7050", accentColor: "#00853f" },
    Uganda: { code: "UG", flag: "🇺🇬", camo: "Equatorial Green", armyColor: "#1e4a1e", accentColor: "#000000" },
    Tanzania: { code: "TZ", flag: "🇹🇿", camo: "Serengeti Tan", armyColor: "#7a8a50", accentColor: "#1eb53a" },
    Rwanda: { code: "RW", flag: "🇷🇼", camo: "Hill Green", armyColor: "#2a5a2a", accentColor: "#00a1de" },
    Burundi: { code: "BI", flag: "🇧🇮", camo: "Lake Green", armyColor: "#1e4a2e", accentColor: "#ce1126" },
    Somalia: { code: "SO", flag: "🇸🇴", camo: "Coastal Desert", armyColor: "#a09070", accentColor: "#4189dd" },
    DRCCongo: { code: "CD", flag: "🇨🇩", camo: "Congo Jungle", armyColor: "#1e3a1e", accentColor: "#007fff" },
    Congo: { code: "CG", flag: "🇨🇬", camo: "Rainforest", armyColor: "#1a3a1a", accentColor: "#009543" },
    Gabon: { code: "GA", flag: "🇬🇦", camo: "Equatorial Forest", armyColor: "#1e4a1e", accentColor: "#009e60" },
    Chad: { code: "TD", flag: "🇹🇩", camo: "Sahel Khaki", armyColor: "#9a8a60", accentColor: "#002664" },
    Niger: { code: "NE", flag: "🇳🇪", camo: "Sahara Tan", armyColor: "#b0a070", accentColor: "#0db04b" },
    Mali: { code: "ML", flag: "🇲🇱", camo: "Sahel Sand", armyColor: "#a08050", accentColor: "#14b53a" },
    BurkinaFaso: { code: "BF", flag: "🇧🇫", camo: "Savanna Khaki", armyColor: "#8a7050", accentColor: "#ef2b2d" },
    Guinea: { code: "GN", flag: "🇬🇳", camo: "Forest Stripe", armyColor: "#1e4a1e", accentColor: "#ce1126" },
    Benin: { code: "BJ", flag: "🇧🇯", camo: "Tropical Olive", armyColor: "#2a4a2a", accentColor: "#fcd116" },
    Togo: { code: "TG", flag: "🇹🇬", camo: "Coastal Green", armyColor: "#1e4a2a", accentColor: "#008040" },
    SierraLeone: { code: "SL", flag: "🇸🇱", camo: "Rainforest Green", armyColor: "#1a4a1a", accentColor: "#0072c6" },
    Liberia: { code: "LR", flag: "🇱🇷", camo: "Liberian Forest", armyColor: "#1e4a2e", accentColor: "#002868" },
    Mauritania: { code: "MR", flag: "🇲🇷", camo: "Desert Khaki", armyColor: "#a09070", accentColor: "#00a651" },
    CapeVerde: { code: "CV", flag: "🇨🇻", camo: "Island Camo", armyColor: "#1a4a3a", accentColor: "#003893" },
    Gambia: { code: "GM", flag: "🇬🇲", camo: "River Camo", armyColor: "#2a4a2a", accentColor: "#ce1126" },
    Botswana: { code: "BW", flag: "🇧🇼", camo: "Kalahari Sand", armyColor: "#a09060", accentColor: "#ffffff" },
    Zambia: { code: "ZM", flag: "🇿🇲", camo: "Miombo Woodland", armyColor: "#2a5a2a", accentColor: "#198a00" },
    Zimbabwe: { code: "ZW", flag: "🇿🇼", camo: "Bushveld Olive", armyColor: "#3a5a3a", accentColor: "#000000" },
    Namibia: { code: "NA", flag: "🇳🇦", camo: "Namib Desert", armyColor: "#b09060", accentColor: "#003580" },
    Mozambique: { code: "MZ", flag: "🇲🇿", camo: "Coastal Forest", armyColor: "#1e4a1e", accentColor: "#007848" },
    Madagascar: { code: "MG", flag: "🇲🇬", camo: "Tropical Stripe", armyColor: "#2a4a2a", accentColor: "#fc3d32" },
    Angola: { code: "AO", flag: "🇦🇴", camo: "Savanna Stripe", armyColor: "#3a5a3a", accentColor: "#000000" },
    EquatorialGuinea: { code: "GQ", flag: "🇬🇶", camo: "Rainforest Green", armyColor: "#1e3a1e", accentColor: "#007848" },
    Eritrea: { code: "ER", flag: "🇪🇷", camo: "Red Sea Desert", armyColor: "#a08050", accentColor: "#003893" },
    SouthSudan: { code: "SS", flag: "🇸🇸", camo: "Nile Swamp", armyColor: "#2a4a2a", accentColor: "#000000" },
    Lesotho: { code: "LS", flag: "🇱🇸", camo: "Mountain Camo", armyColor: "#2a5a2a", accentColor: "#00209f" },
    ESwatini: { code: "SZ", flag: "🇸🇿", camo: "Hill Green", armyColor: "#2a4a2a", accentColor: "#ffd700" },
    Comoros: { code: "KM", flag: "🇰🇲", camo: "Island Green", armyColor: "#1e4a2a", accentColor: "#00843d" },
    Mauritius: { code: "MU", flag: "🇲🇺", camo: "Tropical Blue", armyColor: "#1a3a4a", accentColor: "#003366" },
    Seychelles: { code: "SC", flag: "🇸🇨", camo: "Ocean Camo", armyColor: "#1a4a4a", accentColor: "#003399" },
    Djibouti: { code: "DJ", flag: "🇩🇯", camo: "Volcanic Desert", armyColor: "#8a7050", accentColor: "#00aa00" },
    CentralAfricanRepublic: { code: "CF", flag: "🇨🇫", camo: "Jungle Khaki", armyColor: "#3a5a3a", accentColor: "#d21034" },
    SaoTome: { code: "ST", flag: "🇸🇹", camo: "Island Forest", armyColor: "#1e4a2e", accentColor: "#00ad40" },

    // Europe (44 countries)
    USA: { code: "US", flag: "🇺🇸", camo: "Universal Camo (UCP)", armyColor: "#3d4a3a", accentColor: "#bf0a30" },
    UK: { code: "GB", flag: "🇬🇧", camo: "MTP Multi-Terrain", armyColor: "#4a5a3a", accentColor: "#012169" },
    France: { code: "FR", flag: "🇫🇷", camo: "Centre Europe (CE)", armyColor: "#3a5a3a", accentColor: "#002654" },
    Germany: { code: "DE", flag: "🇩🇪", camo: "Flecktarn", armyColor: "#3a4a2a", accentColor: "#000000" },
    Russia: { code: "RU", flag: "🇷🇺", camo: "EMR Digital Flora", armyColor: "#3a5a3a", accentColor: "#d52b1e" },
    China: { code: "CN", flag: "🇨🇳", camo: "Type 07 Digital", armyColor: "#3a5a2a", accentColor: "#de2910" },
    Japan: { code: "JP", flag: "🇯🇵", camo: "Type 3 JGSDF", armyColor: "#3a4a3a", accentColor: "#bc002d" },
    SouthKorea: { code: "KR", flag: "🇰🇷", camo: "Digital Wave", armyColor: "#3a5a4a", accentColor: "#003478" },
    NorthKorea: { code: "KP", flag: "🇰🇵", camo: "People's Olive", armyColor: "#3a4a2a", accentColor: "#024fa2" },
    India: { code: "IN", flag: "🇮🇳", camo: "Indian Disruptive", armyColor: "#4a5a3a", accentColor: "#ff9933" },
    Pakistan: { code: "PK", flag: "🇵🇰", camo: "Pakistan Woodland", armyColor: "#3a5a3a", accentColor: "#01411c" },
    Israel: { code: "IL", flag: "🇮🇱", camo: "Tzabar Recon", armyColor: "#5a6a3a", accentColor: "#0038b8" },
    Turkey: { code: "TR", flag: "🇹🇷", camo: "M05 Turkish Digital", armyColor: "#3a5a3a", accentColor: "#e30a17" },
    Iran: { code: "IR", flag: "🇮🇷", camo: "Iranian Woodland", armyColor: "#3a4a3a", accentColor: "#239f40" },
    SaudiArabia: { code: "SA", flag: "🇸🇦", camo: "Saudi Desert", armyColor: "#a09060", accentColor: "#006c35" },
    UAE: { code: "AE", flag: "🇦🇪", camo: "Emirates Digital", armyColor: "#8a7050", accentColor: "#00732f" },
    Iraq: { code: "IQ", flag: "🇮🇶", camo: "Iraqi Desert Stripe", armyColor: "#9a8050", accentColor: "#ce1126" },
    Syria: { code: "SY", flag: "🇸🇾", camo: "Syrian Tiger Stripe", armyColor: "#3a5a3a", accentColor: "#000000" },
    Jordan: { code: "JO", flag: "🇯🇴", camo: "Jordanian Digital", armyColor: "#5a6a3a", accentColor: "#000000" },
    Lebanon: { code: "LB", flag: "🇱🇧", camo: "Lebanese Forest", armyColor: "#2a4a2a", accentColor: "#ed1c24" },
    Italy: { code: "IT", flag: "🇮🇹", camo: "Vegetata MIM", armyColor: "#3a4a2a", accentColor: "#008c45" },
    Spain: { code: "ES", flag: "🇪🇸", camo: "Pixelado Amplitude", armyColor: "#3a5a3a", accentColor: "#aa151b" },
    Portugal: { code: "PT", flag: "🇵🇹", camo: "Portuguese Pixel", armyColor: "#3a4a3a", accentColor: "#006600" },
    Netherlands: { code: "NL", flag: "🇳🇱", camo: "Dutch Woodland", armyColor: "#3a5a3a", accentColor: "#21468b" },
    Belgium: { code: "BE", flag: "🇧🇪", camo: "Belgian Woodland", armyColor: "#3a4a3a", accentColor: "#fdda24" },
    Greece: { code: "GR", flag: "🇬🇷", camo: "Greek Digital", armyColor: "#3a5a3a", accentColor: "#0d5eaf" },
    Poland: { code: "PL", flag: "🇵🇱", camo: "Wz.93 Polish Woodland", armyColor: "#3a5a3a", accentColor: "#dc143c" },
    Czechia: { code: "CZ", flag: "🇨🇿", camo: "Vz.95 Czech", armyColor: "#3a4a3a", accentColor: "#11457e" },
    Hungary: { code: "HU", flag: "🇭🇺", camo: "Hungarian Woodland", armyColor: "#3a4a3a", accentColor: "#477050" },
    Romania: { code: "RO", flag: "🇷🇴", camo: "Romanian Pixel", armyColor: "#3a5a3a", accentColor: "#002b7f" },
    Bulgaria: { code: "BG", flag: "🇧🇬", camo: "Bulgarian Digital", armyColor: "#3a4a3a", accentColor: "#00966e" },
    Serbia: { code: "RS", flag: "🇷🇸", camo: "Serbian Woodland", armyColor: "#3a5a3a", accentColor: "#c6363c" },
    Croatia: { code: "HR", flag: "🇭🇷", camo: "Croatian Digital", armyColor: "#3a4a3a", accentColor: "#171796" },
    Slovenia: { code: "SI", flag: "🇸🇮", camo: "Slovenian Woodland", armyColor: "#3a5a3a", accentColor: "#ff0000" },
    Slovakia: { code: "SK", flag: "🇸🇰", camo: "Slovak Vz.95", armyColor: "#3a4a3a", accentColor: "#0b439b" },
    Ukraine: { code: "UA", flag: "🇺🇦", camo: "MM-14 Ukrainian", armyColor: "#3a5a3a", accentColor: "#0057b7" },
    Belarus: { code: "BY", flag: "🇧🇾", camo: "Belarusian Butan", armyColor: "#3a4a3a", accentColor: "#d22730" },
    Lithuania: { code: "LT", flag: "🇱🇹", camo: "Lithuanian Woodland", armyColor: "#3a5a3a", accentColor: "#fef200" },
    Latvia: { code: "LV", flag: "🇱🇻", camo: "Latvian Digital", armyColor: "#3a4a3a", accentColor: "#9e1b32" },
    Estonia: { code: "EE", flag: "🇪🇪", camo: "Estonian Digital", armyColor: "#3a4a3a", accentColor: "#0072ce" },
    Finland: { code: "FI", flag: "🇫🇮", camo: "Finnish M05", armyColor: "#2a3a2a", accentColor: "#003580" },
    Sweden: { code: "SE", flag: "🇸🇪", camo: "Swedish M90", armyColor: "#3a5a3a", accentColor: "#006aa7" },
    Norway: { code: "NO", flag: "🇳🇴", camo: "Norwegian Digital", armyColor: "#2a3a3a", accentColor: "#ef2b2d" },
    Denmark: { code: "DK", flag: "🇩🇰", camo: "Danish M84", armyColor: "#3a4a3a", accentColor: "#c8102e" },
    Ireland: { code: "IE", flag: "🇮🇪", camo: "Irish Woodland", armyColor: "#3a5a3a", accentColor: "#169b62" },
    Austria: { code: "AT", flag: "🇦🇹", camo: "Austrian Peugeot", armyColor: "#3a4a3a", accentColor: "#ed2939" },
    Switzerland: { code: "CH", flag: "🇨🇭", camo: "Swiss Taz 90", armyColor: "#3a4a3a", accentColor: "#ff0000" },

    // Asia-Pacific (30 countries)
    Australia: { code: "AU", flag: "🇦🇺", camo: "Auscam Multi-Mission", armyColor: "#5a6a3a", accentColor: "#000000" },
    NewZealand: { code: "NZ", flag: "🇳🇿", camo: "NZ Digital", armyColor: "#3a5a3a", accentColor: "#000000" },
    Indonesia: { code: "ID", flag: "🇮🇩", camo: "Indonesian Woodland", armyColor: "#3a5a3a", accentColor: "#ff0000" },
    Malaysia: { code: "MY", flag: "🇲🇾", camo: "Malaysian Tiger Stripe", armyColor: "#3a5a3a", accentColor: "#cc0001" },
    Singapore: { code: "SG", flag: "🇸🇬", camo: "Singapore Digital No.4", armyColor: "#3a4a3a", accentColor: "#ed2939" },
    Thailand: { code: "TH", flag: "🇹🇭", camo: "Thai Tiger Stripe", armyColor: "#3a5a3a", accentColor: "#00247d" },
    Vietnam: { code: "VN", flag: "🇻🇳", camo: "Vietnamese Woodland", armyColor: "#3a4a3a", accentColor: "#da251d" },
    Philippines: { code: "PH", flag: "🇵🇭", camo: "Philippine Woodland", armyColor: "#3a5a3a", accentColor: "#0038a8" },
    Myanmar: { code: "MM", flag: "🇲🇲", camo: "Myanmar Woodland", armyColor: "#3a4a3a", accentColor: "#fecb00" },
    Cambodia: { code: "KH", flag: "🇰🇭", camo: "Cambodian Tiger", armyColor: "#3a5a3a", accentColor: "#032ea1" },
    Laos: { code: "LA", flag: "🇱🇦", camo: "Laotian Woodland", armyColor: "#3a4a3a", accentColor: "#ce1126" },
    Bangladesh: { code: "BD", flag: "🇧🇩", camo: "Bangladesh Woodland", armyColor: "#3a5a3a", accentColor: "#006a4e" },
    SriLanka: { code: "LK", flag: "🇱🇰", camo: "Sri Lankan Woodland", armyColor: "#3a5a3a", accentColor: "#8d153a" },
    Nepal: { code: "NP", flag: "🇳🇵", camo: "Nepali Mountain", armyColor: "#3a4a3a", accentColor: "#dc143c" },
    Afghanistan: { code: "AF", flag: "🇦🇫", camo: "Afghan Desert Woodland", armyColor: "#5a6a3a", accentColor: "#000000" },
    Taiwan: { code: "TW", flag: "🇹🇼", camo: "Taiwanese Digital", armyColor: "#3a5a3a", accentColor: "#fe0000" },
    Mongolia: { code: "MN", flag: "🇲🇳", camo: "Mongolian Steppe", armyColor: "#3a4a3a", accentColor: "#006a4e" },
    Kazakhstan: { code: "KZ", flag: "🇰🇿", camo: "Kazakh Steppe Camo", armyColor: "#5a6a4a", accentColor: "#00afca" },
    Uzbekistan: { code: "UZ", flag: "🇺🇿", camo: "Uzbek Desert", armyColor: "#8a7050", accentColor: "#1eb53a" },
    Azerbaijan: { code: "AZ", flag: "🇦🇿", camo: "Azerbaijani Digital", armyColor: "#3a4a3a", accentColor: "#00b5e2" },
    Armenia: { code: "AM", flag: "🇦🇲", camo: "Armenian Woodland", armyColor: "#3a4a3a", accentColor: "#d90012" },
    Georgia: { code: "GE", flag: "🇬🇪", camo: "Georgian Digital", armyColor: "#3a4a3a", accentColor: "#000000" },
    Fiji: { code: "FJ", flag: "🇫🇯", camo: "Pacific Island Camo", armyColor: "#2a4a3a", accentColor: "#00008b" },
    PapuaNewGuinea: { code: "PG", flag: "🇵🇬", camo: "Jungle Stripe", armyColor: "#1e3a1e", accentColor: "#000000" },
    Brunei: { code: "BN", flag: "🇧🇳", camo: "Brunei Jungle", armyColor: "#1e4a2a", accentColor: "#fcd116" },
    Maldives: { code: "MV", flag: "🇲🇻", camo: "Ocean Digital", armyColor: "#1a3a4a", accentColor: "#004b9b" },
    Kyrgyzstan: { code: "KG", flag: "🇰🇬", camo: "Mountain Steppe", armyColor: "#5a6a4a", accentColor: "#d41c1c" },
    Tajikistan: { code: "TJ", flag: "🇹🇯", camo: "Mountain Camo", armyColor: "#3a5a3a", accentColor: "#006600" },
    Turkmenistan: { code: "TM", flag: "🇹🇲", camo: "Desert Khaki", armyColor: "#8a7050", accentColor: "#008040" },
    Bahrain: { code: "BH", flag: "🇧🇭", camo: "Desert Digital", armyColor: "#9a8050", accentColor: "#ce1126" },

    // Americas (21 countries)
    Canada: { code: "CA", flag: "🇨🇦", camo: "CADTW Canadian Digital", armyColor: "#3a4a3a", accentColor: "#ff0000" },
    Mexico: { code: "MX", flag: "🇲🇽", camo: "Mexican Woodland", armyColor: "#3a5a3a", accentColor: "#006847" },
    Brazil: { code: "BR", flag: "🇧🇷", camo: "Brazilian Amazon", armyColor: "#2a4a2a", accentColor: "#009c3b" },
    Argentina: { code: "AR", flag: "🇦🇷", camo: "Argentine Pixelado", armyColor: "#3a4a3a", accentColor: "#74acdf" },
    Chile: { code: "CL", flag: "🇨🇱", camo: "Chilean Woodland", armyColor: "#3a4a3a", accentColor: "#0039a6" },
    Colombia: { code: "CO", flag: "🇨🇴", camo: "Colombian Jungle", armyColor: "#2a4a2a", accentColor: "#fcd116" },
    Peru: { code: "PE", flag: "🇵🇪", camo: "Peruvian Woodland", armyColor: "#3a4a3a", accentColor: "#d91023" },
    Venezuela: { code: "VE", flag: "🇻🇪", camo: "Venezuelan Digital", armyColor: "#3a4a3a", accentColor: "#ffcc00" },
    Ecuador: { code: "EC", flag: "🇪🇨", camo: "Ecuadorian Jungle", armyColor: "#2a4a2a", accentColor: "#ffd700" },
    Bolivia: { code: "BO", flag: "🇧🇴", camo: "Highland Camo", armyColor: "#3a4a3a", accentColor: "#d52b1e" },
    Paraguay: { code: "PY", flag: "🇵🇾", camo: "Paraguayan Woodland", armyColor: "#3a4a3a", accentColor: "#d52b1e" },
    Uruguay: { code: "UY", flag: "🇺🇾", camo: "Uruguayan Woodland", armyColor: "#3a4a3a", accentColor: "#0038a8" },
    Cuba: { code: "CU", flag: "🇨🇺", camo: "Cuban Woodland", armyColor: "#3a5a3a", accentColor: "#002a8f" },
    DominicanRepublic: { code: "DO", flag: "🇩🇴", camo: "Caribbean Woodland", armyColor: "#3a4a3a", accentColor: "#002d62" },
    Guatemala: { code: "GT", flag: "🇬🇹", camo: "Guatemalan Woodland", armyColor: "#3a5a3a", accentColor: "#4997d0" },
    Honduras: { code: "HN", flag: "🇭🇳", camo: "Honduran Woodland", armyColor: "#3a5a3a", accentColor: "#0073cf" },
    Panama: { code: "PA", flag: "🇵🇦", camo: "Panama Jungle", armyColor: "#2a4a2a", accentColor: "#0057b7" },
    Jamaica: { code: "JM", flag: "🇯🇲", camo: "Caribbean Digital", armyColor: "#2a4a2a", accentColor: "#fed100" },
    Trinidad: { code: "TT", flag: "🇹🇹", camo: "Island Camo", armyColor: "#3a4a3a", accentColor: "#ce1126" },
    CostaRica: { code: "CR", flag: "🇨🇷", camo: "Tropical Digital", armyColor: "#2a4a2a", accentColor: "#002b7f" },
    ElSalvador: { code: "SV", flag: "🇸🇻", camo: "Salvadoran Woodland", armyColor: "#3a5a3a", accentColor: "#0f47af" },
  },

  // Generate cosmetics for each country
  generateCosmetics() {
    const cosmetics = {};
    let id = 0;

    for (const [country, data] of Object.entries(this.countries)) {
      // 1. Standard Army Uniform
      cosmetics[`std_${data.code}`] = {
        id: ++id, country, code: data.code, flag: data.flag,
        name: `${country} Standard Uniform`,
        type: "uniform", tier: "free",
        camo: data.camo, color: data.armyColor, accent: data.accentColor,
        desc: `Standard issue ${country} military uniform with ${data.camo} pattern.`,
        icon: "🪖", price: 0,
      };

      // 2. Special Forces Skin
      cosmetics[`sf_${data.code}`] = {
        id: ++id, country, code: data.code, flag: data.flag,
        name: `${country} Special Forces`,
        type: "uniform", tier: "free",
        camo: data.camo + " SF", color: data.armyColor, accent: data.accentColor,
        desc: `Elite ${country} special forces operative. Night ops gear, tactical vest, balaclava.`,
        icon: "🥷", price: 5,
      };

      // 3. National Hero Skin
      cosmetics[`hero_${data.code}`] = {
        id: ++id, country, code: data.code, flag: data.flag,
        name: `${country} National Hero`,
        type: "uniform", tier: "silver",
        camo: data.camo + " Hero", color: data.armyColor, accent: data.accentColor,
        desc: `Legendary ${country} war hero. Gold-trimmed uniform with national flag cape.`,
        icon: "🏅", price: 15,
      };

      // 4. Flag Weapon Skin
      cosmetics[`flagw_${data.code}`] = {
        id: ++id, country, code: data.code, flag: data.flag,
        name: `${country} Flag Weapon Skin`,
        type: "weapon_skin", tier: "free",
        desc: `Wrap your weapon in the ${data.flag} ${country} flag colors.`,
        icon: "🎨", price: 3,
        color: data.accentColor,
      };

      // 5. Commander Skin
      cosmetics[`cmdr_${data.code}`] = {
        id: ++id, country, code: data.code, flag: data.flag,
        name: `${country} Commander`,
        type: "uniform", tier: "gold",
        camo: data.camo + " Commander", color: data.armyColor, accent: data.accentColor,
        desc: `${country} battlefield commander. Beret, medals, command insignia. Calls orbital strikes.`,
        icon: "🎖️", price: 25,
      };

      // 6. Mythic Eternal Warrior
      cosmetics[`mythic_${data.code}`] = {
        id: ++id, country, code: data.code, flag: data.flag,
        name: `${country} Mythic Eternal Warrior`,
        type: "uniform", tier: "supreme",
        camo: data.camo + " MYTHIC", color: data.armyColor, accent: data.accentColor,
        desc: `MYTHIC ${country} eternal warrior. Glowing armor with dimensional energy. Unique to ${country}. Banishes enemies on melee kill.`,
        icon: "👑", price: 100,
      };
    }

    return cosmetics;
  },

  // Universal cosmetics (not country-specific)
  universalCosmetics: {
    // Universal uniforms
    stealth_suit: { id: "U1", name: "Quantum Stealth Suit", type: "uniform", tier: "gold", icon: "🫥", price: 30, desc: "Active camouflage that bends light around you. Near-invisible when standing still." },
    void_armor: { id: "U2", name: "Void Walker Armor", type: "uniform", tier: "supreme", icon: "🕳️", price: 80, desc: "Phase through matter. 50% chance to dodge any projectile." },
    cosmic_ranger: { id: "U3", name: "Cosmic Ranger", type: "uniform", tier: "supreme", icon: "🌌", price: 90, desc: "Stars embedded in armor. Glows in all 8 dimensions. +20% warp speed." },
    dimensional_suit: { id: "U4", name: "6D Phase Suit", type: "uniform", tier: "platinum", icon: "🔮", price: 50, desc: "Shift between 6 dimensions at will. Enemies lose track of you." },
    chrono_uniform: { id: "U5", name: "Chrono Warrior", type: "uniform", tier: "platinum", icon: "⏳", price: 45, desc: "Time-woven fabric. Rewind 3 seconds once per match." },
    nuclear_survivor: { id: "U6", name: "Doomsday Survivor", type: "uniform", tier: "gold", icon: "☢️", price: 35, desc: "Survive nuclear fallout outside bunker. Built-in Geiger counter." },
    HAHO_suit: { id: "U7", name: "HAHO Infiltration Suit", type: "uniform", tier: "gold", icon: "🪂", price: 25, desc: "High-altitude jump suit. Oxygen mask, GPS, night vision. Silent drop." },
    submarine_suit: { id: "U8", name: "Abyssal Diving Suit", type: "uniform", tier: "gold", icon: "🤿", price: 30, desc: "Deep-sea operations. 500m depth. Sonar display. UUV control." },
    AI_hunter: { id: "U9", name: "AI Hunter Cortex", type: "uniform", tier: "supreme", icon: "🧠", price: 75, desc: "Neural link with AI. Predicts enemy movement 2 seconds ahead." },

    // Universal weapon skins
    gold_weapon: { id: "W1", name: "Gold Plated Skin", type: "weapon_skin", tier: "gold", icon: "✨", price: 20, desc: "24K gold plating on any weapon. Visible across the map." },
    plasma_glow: { id: "W2", name: "Plasma Glow Skin", type: "weapon_skin", tier: "platinum", icon: "🔥", price: 40, desc: "Plasma energy coursing through your weapon. Leaves energy trail." },
    void_weapon: { id: "W3", name: "Void Tendril Skin", type: "weapon_skin", tier: "supreme", icon: "🕳️", price: 60, desc: "Void tendrils wrap your weapon. Bullets phase through walls." },
    rainbow_trail: { id: "W4", name: "Rainbow Bullet Trail", type: "weapon_skin", tier: "gold", icon: "🌈", price: 25, desc: "Every bullet leaves a rainbow trail. Visible in all 8 dimensions." },
    dimensional_skin: { id: "W5", name: "Dimensional Shimmer", type: "weapon_skin", tier: "supreme", icon: "🌀", price: 70, desc: "Weapon shimmers between dimensions. Hard to track in combat." },

    // Emotes and effects
    banish_emote: { id: "E1", name: "Banish Gesture", type: "emote", tier: "supreme", icon: "👋", price: 15, desc: "Point and laugh as you banish an enemy to deep space." },
    orbital_emote: { id: "E2", name: "Orbital Strike Call", type: "emote", tier: "gold", icon: "🛰️", price: 10, desc: "Point to sky, call down the thunder. Intimidate before the strike." },
    warp_emote: { id: "E3", name: "Warp Victory Dance", type: "emote", tier: "platinum", icon: "🚀", price: 20, desc: "Dance as you warp back from banishment. Disrespect guaranteed." },

    // Kill effects
    void_kill: { id: "K1", name: "Void Kill Effect", type: "kill_effect", tier: "supreme", icon: "🕳️", price: 50, desc: "Enemies disintegrate into void particles on kill." },
    cosmic_kill: { id: "K2", name: "Cosmic Kill Effect", type: "kill_effect", tier: "supreme", icon: "✨", price: 50, desc: "Enemies explode into a miniature galaxy on kill." },
    gold_kill: { id: "K3", name: "Golden Kill Effect", type: "kill_effect", tier: "gold", icon: "🏆", price: 30, desc: "Enemies turn to gold statues before crumbling on kill." },

    // Player cards and banners
    legendary_card: { id: "P1", name: "Legendary Player Card", type: "card", tier: "gold", icon: "💎", price: 15, desc: "Animated legendary player card shown in kill feed." },
    supreme_card: { id: "P2", name: "Supreme Player Card", type: "card", tier: "supreme", icon: "👑", price: 40, desc: "Supreme animated card with dimensional effects." },
  },

  // Get all cosmetics
  getAll() {
    return { ...this.generateCosmetics(), ...this.universalCosmetics };
  },

  // Get cosmetics by country
  getByCountry(country) {
    const all = this.generateCosmetics();
    return Object.values(all).filter(c => c.country === country);
  },

  // Get cosmetics by type
  getByType(type) {
    const all = this.getAll();
    return Object.values(all).filter(c => c.type === type);
  },

  // Get cosmetics by tier
  getByTier(tier) {
    const all = this.getAll();
    return Object.values(all).filter(c => c.tier === tier);
  },

  // Count total
  count() {
    const countryCosmetics = Object.keys(this.countries).length * 6; // 6 per country
    const universalCount = Object.keys(this.universalCosmetics).length;
    return { countries: Object.keys(this.countries).length, perCountry: 6, countryTotal: countryCosmetics, universal: universalCount, grandTotal: countryCosmetics + universalCount };
  },

  // Build shop UI
  buildShopUI() {
    const all = this.getAll();
    const count = this.count();
    let html = `<div id="cosmetics-shop" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:8000;overflow-y:auto;font-family:sans-serif;color:#fff">`;
    html += `<div style="max-width:900px;margin:0 auto;padding:20px">`;
    html += `<h1 style="color:#00d4ff;text-align:center;font-size:clamp(20px,5vw,28px)">🎨 SKINS & COSMETICS SHOP</h1>`;
    html += `<p style="text-align:center;color:#888;font-size:clamp(11px,2.5vw,13px)">${count.grandTotal} cosmetics across ${count.countries} countries + universal items</p>`;

    // Country cosmetics
    html += `<h2 style="color:#ffaa00;font-size:18px;margin:20px 0 10px">🌍 BY COUNTRY (150 nations × 6 skins)</h2>`;
    html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">`;

    for (const [country, data] of Object.entries(this.countries)) {
      html += `<div style="background:#13132a;border:1px solid #2a2a4a;border-radius:10px;padding:10px">`;
      html += `<div style="font-size:20px">${data.flag}</div>`;
      html += `<div style="color:#00d4ff;font-weight:700;font-size:14px">${country}</div>`;
      html += `<div style="color:#666;font-size:11px">${data.camo}</div>`;
      html += `<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px">`;
      html += `<span style="font-size:16px" title="Standard">🪖</span>`;
      html += `<span style="font-size:16px" title="Special Forces">🥷</span>`;
      html += `<span style="font-size:16px" title="National Hero">🏅</span>`;
      html += `<span style="font-size:16px" title="Flag Weapon">🎨</span>`;
      html += `<span style="font-size:16px" title="Commander">🎖️</span>`;
      html += `<span style="font-size:16px" title="Mythic">👑</span>`;
      html += `</div></div>`;
    }
    html += `</div>`;

    // Universal cosmetics
    html += `<h2 style="color:#7b2ff7;font-size:18px;margin:20px 0 10px">⭐ UNIVERSAL COSMETICS</h2>`;
    html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px">`;
    for (const [key, item] of Object.entries(this.universalCosmetics)) {
      const tierColor = item.tier === "free" ? "#2ed573" : item.tier === "gold" ? "#ffaa00" : item.tier === "supreme" ? "#ff0066" : "#7b2ff7";
      html += `<div style="background:#13132a;border:1px solid ${tierColor}33;border-radius:10px;padding:10px">`;
      html += `<div style="font-size:24px">${item.icon}</div>`;
      html += `<div style="color:${tierColor};font-weight:700;font-size:12px">${item.name}</div>`;
      html += `<div style="color:#888;font-size:10px">${item.desc.substring(0, 60)}...</div>`;
      html += `<div style="color:${tierColor};font-size:11px;margin-top:4px">${item.tier === "free" ? "FREE" : "$" + item.price}</div>`;
      html += `</div>`;
    }
    html += `</div>`;

    html += `<button onclick="document.getElementById('cosmetics-shop').remove()" style="display:block;width:100%;padding:14px;background:#00d4ff;color:#000;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;margin-top:20px">CLOSE</button>`;
    html += `</div></div>`;

    return html;
  },

  init() {
    // Add cosmetics shop button
    const btn = document.createElement('button');
    btn.id = 'cosmetics-btn';
    btn.textContent = '🎨 Cosmetics';
    btn.style.cssText = 'position:fixed;top:16px;right:320px;z-index:5000;background:linear-gradient(135deg,#ffaa00,#ff6600);color:#000;border:none;padding:10px 14px;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer';
    btn.onclick = () => {
      const div = document.createElement('div');
      div.innerHTML = this.buildShopUI();
      document.body.appendChild(div.firstChild);
    };
    document.body.appendChild(btn);
    console.log(`[OMEGA-8D] Skins & Cosmetics initialized — ${this.count().grandTotal} items across ${this.count().countries} countries`);
  },
};

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SKINS_COSMETICS.init());
} else {
  SKINS_COSMETICS.init();
}

if (typeof window !== 'undefined') window.SKINS_COSMETICS = SKINS_COSMETICS;
if (typeof module !== 'undefined' && module.exports) module.exports = SKINS_COSMETICS;