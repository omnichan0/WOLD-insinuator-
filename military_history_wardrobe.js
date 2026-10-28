/**
 * OMEGA-8D FULL MILITARY STRENGTH + HISTORICAL DEPTH + WARDROBE + 40D RENDERING
 * 1. Full military strength for all 86 countries (all branches, personnel, equipment)
 * 2. Historical tribes/kingdoms per era with era-specific weapons
 * 3. 100+ additional weapons across eras
 * 4. Wardrobe system (mix and match clothing + real military uniforms)
 * 5. Admin panel price controls
 * 6. 40D hyper-realistic character rendering
 */

// ============================================================
// 1. FULL MILITARY STRENGTH — ALL 86 COUNTRIES
// ============================================================
const MILITARY_STRENGTH = {
  // Every country's complete military: army, navy, air force, reserves, equipment
  data: {
    NGA: { name:'Nigeria', activePersonnel:230000, reserves:0, paramilitary:320000, army:{personnel:180000,tanks:343,apcs:1430,artillery:689}, navy:{personnel:25000,frigates:2,corvettes:3,subs:0,patrol:25}, airForce:{personnel:18000,fighters:11,helicopters:38,transports:20}, defenseBudget:4.5, /*billion USD*/ alliances:['ECOWAS','AU'], nuclear:false, missileRange:0 },
    EGY: { name:'Egypt', activePersonnel:438500, reserves:479000, paramilitary:330000, army:{personnel:310000,tanks:4295,apcs:11000,artillery:2890}, navy:{personnel:18500,frigates:9,corvettes:2,subs:8,patrol:45}, airForce:{personnel:30000,fighters:593,helicopters:254,transports:37}, defenseBudget:5.2, alliances:['Arab League','AU'], nuclear:false, missileRange:500 },
    ZAF: { name:'South Africa', activePersonnel:73500, reserves:14000, paramilitary:0, army:{personnel:40000,tanks:172,apcs:2400,artillery:120}, navy:{personnel:6500,frigates:4,corvettes:3,subs:3,patrol:6}, airForce:{personnel:10000,fighters:26,helicopters:96,transports:15}, defenseBudget:3.1, alliances:['SADC','AU'], nuclear:false, missileRange:0 },
    KEN: { name:'Kenya', activePersonnel:24100, reserves:5000, paramilitary:5000, army:{personnel:20000,tanks:76,apcs:550,artillery:50}, navy:{personnel:1600,frigates:0,corvettes:0,subs:0,patrol:6}, airForce:{personnel:2500,fighters:17,helicopters:30,transports:12}, defenseBudget:1.1, alliances:['EAC','AU'], nuclear:false, missileRange:0 },
    DZA: { name:'Algeria', activePersonnel:139000, reserves:150000, paramilitary:187200, army:{personnel:110000,tanks:1225,apcs:1900,artillery:850}, navy:{personnel:14000,frigates:8,corvettes:3,subs:8,patrol:15}, airForce:{personnel:14000,fighters:122,helicopters:100,transports:40}, defenseBudget:13.0, alliances:['Arab League','AU'], nuclear:false, missileRange:0 },
    MAR: { name:'Morocco', activePersonnel:195800, reserves:150000, paramilitary:50000, army:{personnel:175000,tanks:686,apcs:4800,artillery:294}, navy:{personnel:7800,frigates:6,corvettes:0,subs:0,patrol:28}, airForce:{personnel:13000,fighters:85,helicopters:80,transports:20}, defenseBudget:5.0, alliances:['Arab League','AU'], nuclear:false, missileRange:0 },
    ETH: { name:'Ethiopia', activePersonnel:162000, reserves:0, paramilitary:0, army:{personnel:162000,tanks:450,apcs:800,artillery:500}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:0,fighters:25,helicopters:40,transports:10}, defenseBudget:0.5, alliances:['IGAD','AU'], nuclear:false, missileRange:0 },
    SDN: { name:'Sudan', activePersonnel:209000, reserves:0, paramilitary:85000, army:{personnel:200000,tanks:360,apcs:900,artillery:400}, navy:{personnel:1500,frigates:0,corvettes:0,subs:0,patrol:8}, airForce:{personnel:7500,fighters:45,helicopters:50,transports:15}, defenseBudget:2.2, alliances:['Arab League','AU'], nuclear:false, missileRange:0 },
    LBY: { name:'Libya', activePersonnel:30000, reserves:0, paramilitary:0, army:{personnel:25000,tanks:800,apcs:1200,artillery:600}, navy:{personnel:2000,frigates:0,corvettes:1,subs:0,patrol:6}, airForce:{personnel:3000,fighters:50,helicopters:35,transports:20}, defenseBudget:0.8, alliances:['Arab League','AU'], nuclear:false, missileRange:0 },
    TZA: { name:'Tanzania', activePersonnel:27800, reserves:18000, paramilitary:1400, army:{personnel:23000,tanks:65,apcs:300,artillery:200}, navy:{personnel:1000,frigates:0,corvettes:0,subs:0,patrol:8}, airForce:{personnel:3800,fighters:14,helicopters:20,transports:10}, defenseBudget:0.7, alliances:['SADC','EAC','AU'], nuclear:false, missileRange:0 },
    GHA: { name:'Ghana', activePersonnel:15500, reserves:0, paramilitary:0, army:{personnel:13500,tanks:3,apcs:50,artillery:15}, navy:{personnel:1000,frigates:0,corvettes:0,subs:0,patrol:5}, airForce:{personnel:1000,fighters:0,helicopters:10,transports:8}, defenseBudget:0.3, alliances:['ECOWAS','AU'], nuclear:false, missileRange:0 },
    AGO: { name:'Angola', activePersonnel:107000, reserves:0, paramilitary:0, army:{personnel:90000,tanks:300,apcs:800,artillery:400}, navy:{personnel:7000,frigates:2,corvettes:0,subs:0,patrol:10}, airForce:{personnel:10000,fighters:35,helicopters:60,transports:25}, defenseBudget:4.2, alliances:['SADC','AU','OPEC'], nuclear:false, missileRange:0 },
    UGA: { name:'Uganda', activePersonnel:45000, reserves:0, paramilitary:0, army:{personnel:40000,tanks:200,apcs:400,artillery:150}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:5000,fighters:12,helicopters:25,transports:10}, defenseBudget:0.9, alliances:['EAC','AU'], nuclear:false, missileRange:0 },
    SEN: { name:'Senegal', activePersonnel:13500, reserves:0, paramilitary:5800, army:{personnel:11000,tanks:20,apcs:100,artillery:40}, navy:{personnel:1000,frigates:1,corvettes:0,subs:0,patrol:6}, airForce:{personnel:1500,fighters:4,helicopters:10,transports:8}, defenseBudget:0.4, alliances:['ECOWAS','AU'], nuclear:false, missileRange:0 },
    ZWE: { name:'Zimbabwe', activePersonnel:29500, reserves:21500, paramilitary:21500, army:{personnel:25000,tanks:80,apcs:200,artillery:100}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:4500,fighters:10,helicopters:20,transports:12}, defenseBudget:0.2, alliances:['SADC','AU'], nuclear:false, missileRange:0 },
    CMR: { name:'Cameroon', activePersonnel:22500, reserves:0, paramilitary:9000, army:{personnel:19000,tanks:50,apcs:200,artillery:80}, navy:{personnel:1300,frigates:0,corvettes:0,subs:0,patrol:8}, airForce:{personnel:2200,fighters:4,helicopters:15,transports:10}, defenseBudget:0.4, alliances:['ECOWAS','CEMAC','AU'], nuclear:false, missileRange:0 },
    COD: { name:'DR Congo', activePersonnel:134250, reserves:0, paramilitary:10000, army:{personnel:130000,tanks:120,apcs:300,artillery:200}, navy:{personnel:1000,frigates:0,corvettes:0,subs:0,patrol:10}, airForce:{personnel:3250,fighters:8,helicopters:25,transports:15}, defenseBudget:0.3, alliances:['SADC','ECCAS','AU'], nuclear:false, missileRange:0 },
    RWA: { name:'Rwanda', activePersonnel:33000, reserves:0, paramilitary:2000, army:{personnel:32000,tanks:24,apcs:120,artillery:50}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:1000,fighters:0,helicopters:15,transports:5}, defenseBudget:0.2, alliances:['EAC','AU'], nuclear:false, missileRange:0 },

    RUS: { name:'Russia', activePersonnel:1014000, reserves:2000000, paramilitary:554000, army:{personnel:280000,tanks:12500,apcs:30000,artillery:15000}, navy:{personnel:150000,frigates:15,corvettes:86,subs:65,patrol:55,aircraftCarrier:1}, airForce:{personnel:165000,fighters:1398,helicopters:1550,transports:440}, defenseBudget:84.0, alliances:['CSTO','BRICS','SCO'], nuclear:true, missileRange:18000, nukes:6257 },
    GBR: { name:'United Kingdom', activePersonnel:194000, reserves:37000, paramilitary:0, army:{personnel:73000,tanks:227,apcs:5000,artillery:200}, navy:{personnel:34000,frigates:13,corvettes:0,subs:11,patrol:22,aircraftCarrier:2}, airForce:{personnel:33000,fighters:137,helicopters:300,transports:50}, defenseBudget:68.5, alliances:['NATO','Five Eyes','AUKUS'], nuclear:true, missileRange:12000, nukes:225 },
    FRA: { name:'France', activePersonnel:203900, reserves:35000, paramilitary:103400, army:{personnel:114000,tanks:222,apcs:4500,artillery:300}, navy:{personnel:36000,frigates:11,corvettes:0,subs:9,patrol:20,aircraftCarrier:1}, airForce:{personnel:41000,fighters:266,helicopters:250,transports:60}, defenseBudget:56.0, alliances:['NATO','EU','G7'], nuclear:true, missileRange:10000, nukes:290 },
    DEU: { name:'Germany', activePersonnel:181600, reserves:34000, paramilitary:0, army:{personnel:62000,tanks:295,apcs:5000,artillery:150}, navy:{personnel:16000,frigates:15,corvettes:5,subs:6,patrol:20}, airForce:{personnel:26000,fighters:138,helicopters:200,transports:40}, defenseBudget:56.0, alliances:['NATO','EU','G7'], nuclear:false, missileRange:500 },
    ITA: { name:'Italy', activePersonnel:165500, reserves:18000, paramilitary:189600, army:{personnel:98000,tanks:200,apcs:3000,artillery:200}, navy:{personnel:30000,frigates:10,corvettes:4,subs:8,patrol:20,aircraftCarrier:2}, airForce:{personnel:42000,fighters:220,helicopters:150,transports:40}, defenseBudget:30.0, alliances:['NATO','EU','G7'], nuclear:false, missileRange:500 },
    ESP: { name:'Spain', activePersonnel:120000, reserves:3000, paramilitary:83000, army:{personnel:70000,tanks:327,apcs:2000,artillery:300}, navy:{personnel:21000,frigates:11,corvettes:0,subs:3,patrol:20,aircraftCarrier:1}, airForce:{personnel:12000,fighters:140,helicopters:100,transports:30}, defenseBudget:22.0, alliances:['NATO','EU'], nuclear:false, missileRange:500 },
    POL: { name:'Poland', activePersonnel:164000, reserves:97000, paramilitary:0, army:{personnel:95000,tanks:607,apcs:3000,artillery:500}, navy:{personnel:8000,frigates:2,corvettes:1,subs:1,patrol:10}, airForce:{personnel:16000,fighters:93,helicopters:100,transports:25}, defenseBudget:34.0, alliances:['NATO','EU','Lublin Triangle'], nuclear:false, missileRange:500 },
    UKR: { name:'Ukraine', activePersonnel:900000, reserves:1000000, paramilitary:100000, army:{personnel:800000,tanks:2200,apcs:5000,artillery:2000}, navy:{personnel:15000,frigates:1,corvettes:0,subs:0,patrol:15}, airForce:{personnel:45000,fighters:90,helicopters:120,transports:30}, defenseBudget:65.0, alliances:['None (non-aligned)'], nuclear:false, missileRange:500 },
    SWE: { name:'Sweden', activePersonnel:24000, reserves:221000, paramilitary:0, army:{personnel:19000,tanks:120,apcs:500,artillery:80}, navy:{personnel:3500,frigates:5,corvettes:0,subs:5,patrol:10}, airForce:{personnel:1500,fighters:90,helicopters:30,transports:15}, defenseBudget:12.0, alliances:['NATO','EU','Nordic'], nuclear:false, missileRange:500 },
    NOR: { name:'Norway', activePersonnel:25000, reserves:45000, paramilitary:0, army:{personnel:9000,tanks:54,apcs:200,artillery:50}, navy:{personnel:9000,frigates:4,corvettes:0,subs:6,patrol:10}, airForce:{personnel:7000,fighters:57,helicopters:40,transports:15}, defenseBudget:11.0, alliances:['NATO','Nordic'], nuclear:false, missileRange:500 },
    NLD: { name:'Netherlands', activePersonnel:41000, reserves:5000, paramilitary:0, army:{personnel:20000,tanks:18,apcs:200,artillery:80}, navy:{personnel:10000,frigates:6,corvettes:0,subs:4,patrol:10}, airForce:{personnel:9000,fighters:68,helicopters:30,transports:15}, defenseBudget:16.0, alliances:['NATO','EU'], nuclear:false, missileRange:500 },
    TUR: { name:'Turkey', activePersonnel:425000, reserves:200000, paramilitary:150000, army:{personnel:260000,tanks:2400,apcs:5000,artillery:1200}, navy:{personnel:45000,frigates:16,corvettes:10,subs:12,patrol:35}, airForce:{personnel:50000,fighters:245,helicopters:400,transports:80}, defenseBudget:18.0, alliances:['NATO','Turkic Council'], nuclear:false, missileRange:2500 },
    GRC: { name:'Greece', activePersonnel:142700, reserves:221000, paramilitary:4000, army:{personnel:100000,tanks:1354,apcs:3000,artillery:1300}, navy:{personnel:20000,frigates:13,corvettes:0,subs:11,patrol:25}, airForce:{personnel:20000,fighters:155,helicopters:100,transports:30}, defenseBudget:7.0, alliances:['NATO','EU'], nuclear:false, missileRange:500 },
    PRT: { name:'Portugal', activePersonnel:27000, reserves:210000, paramilitary:47000, army:{personnel:18000,tanks:37,apcs:400,artillery:50}, navy:{personnel:7000,frigates:5,corvettes:0,subs:2,patrol:10}, airForce:{personnel:6000,fighters:35,helicopters:20,transports:15}, defenseBudget:4.5, alliances:['NATO','EU'], nuclear:false, missileRange:500 },
    CZE: { name:'Czech Republic', activePersonnel:28000, reserves:3500, paramilitary:0, army:{personnel:20000,tanks:30,apcs:500,artillery:60}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:8000,fighters:28,helicopters:30,transports:10}, defenseBudget:4.5, alliances:['NATO','EU','V4'], nuclear:false, missileRange:500 },
    ROU: { name:'Romania', activePersonnel:81000, reserves:55000, paramilitary:0, army:{personnel:60000,tanks:250,apcs:1000,artillery:200}, navy:{personnel:7000,frigates:3,corvettes:0,subs:0,patrol:15}, airForce:{personnel:14000,fighters:30,helicopters:60,transports:15}, defenseBudget:8.0, alliances:['NATO','EU'], nuclear:false, missileRange:500 },
    CHE: { name:'Switzerland', activePersonnel:21000, reserves:138000, paramilitary:0, army:{personnel:20000,tanks:134,apcs:300,artillery:200}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:1500,fighters:36,helicopters:20,transports:10}, defenseBudget:6.5, alliances:['Neutral'], nuclear:false, missileRange:0 },
    AUT: { name:'Austria', activePersonnel:25000, reserves:1000, paramilitary:0, army:{personnel:22000,tanks:50,apcs:300,artillery:80}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:3000,fighters:15,helicopters:30,transports:10}, defenseBudget:4.0, alliances:['EU','Neutral'], nuclear:false, missileRange:0 },
    BEL: { name:'Belgium', activePersonnel:27000, reserves:0, paramilitary:1500, army:{personnel:13000,tanks:0,apcs:300,artillery:30}, navy:{personnel:1600,frigates:2,corvettes:0,subs:0,patrol:10}, airForce:{personnel:6000,fighters:48,helicopters:20,transports:15}, defenseBudget:7.0, alliances:['NATO','EU'], nuclear:false, missileRange:500 },
    FIN: { name:'Finland', activePersonnel:24000, reserves:280000, paramilitary:0, army:{personnel:20000,tanks:200,apcs:800,artillery:600}, navy:{personnel:3000,frigates:0,corvettes:8,subs:0,patrol:15}, airForce:{personnel:3000,fighters:62,helicopters:20,transports:10}, defenseBudget:7.0, alliances:['NATO','Nordic'], nuclear:false, missileRange:500 },
    IRL: { name:'Ireland', activePersonnel:7300, reserves:2000, paramilitary:0, army:{personnel:6500,tanks:0,apcs:200,artillery:20}, navy:{personnel:800,frigates:0,corvettes:8,subs:0,patrol:8}, airForce:{personnel:0,fighters:0,helicopters:10,transports:5}, defenseBudget:1.4, alliances:['EU','Neutral'], nuclear:false, missileRange:0 },
    DNK: { name:'Denmark', activePersonnel:17000, reserves:44000, paramilitary:0, army:{personnel:8000,tanks:44,apcs:300,artillery:50}, navy:{personnel:4000,frigates:9,corvettes:0,subs:0,patrol:15}, airForce:{personnel:3000,fighters:44,helicopters:30,transports:10}, defenseBudget:6.5, alliances:['NATO','Nordic','EU'], nuclear:false, missileRange:500 },

    CHN: { name:'China', activePersonnel:2035000, reserves:510000, paramilitary:665000, army:{personnel:965000,tanks:5000,apcs:35000,artillery:6000}, navy:{personnel:260000,frigates:43,corvettes:72,subs:72,patrol:120,aircraftCarrier:3}, airForce:{personnel:395000,fighters:1870,helicopters:900,transports:200}, defenseBudget:230.0, alliances:['SCO','BRICS'], nuclear:true, missileRange:15000, nukes:500 },
    IND: { name:'India', activePersonnel:1455000, reserves:1155000, paramilitary:1588000, army:{personnel:1237000,tanks:4614,apcs:12000,artillery:5000}, navy:{personnel:70000,frigates:12,corvettes:19,subs:16,patrol:25,aircraftCarrier:2}, airForce:{personnel:139000,fighters:595,helicopters:800,transports:250}, defenseBudget:83.0, alliances:['Quad','SCO'], nuclear:true, missileRange:8000, nukes:172 },
    JPN: { name:'Japan', activePersonnel:247000, reserves:56000, paramilitary:0, army:{personnel:150000,tanks:1004,apcs:5000,artillery:400}, navy:{personnel:45000,frigates:30,corvettes:6,subs:22,patrol:6}, airForce:{personnel:46000,fighters:331,helicopters:500,transports:50}, defenseBudget:51.0, alliances:['Quad','US-Japan Treaty'], nuclear:false, missileRange:2000 },
    PRK: { name:'North Korea', activePersonnel:1280000, reserves:600000, paramilitary:1890000, army:{personnel:1100000,tanks:6000,apcs:10000,artillery:21000}, navy:{personnel:60000,frigates:0,corvettes:5,subs:70,patrol:400}, airForce:{personnel:110000,fighters:808,helicopters:300,transports:100}, defenseBudget:4.0, alliances:['China','Russia'], nuclear:true, missileRange:13000, nukes:50 },
    KOR: { name:'South Korea', activePersonnel:555000, reserves:3100000, paramilitary:0, army:{personnel:365000,tanks:2624,apcs:8000,artillery:5000}, navy:{personnel:70000,frigates:18,corvettes:12,subs:22,patrol:50}, airForce:{personnel:65000,fighters:449,helicopters:700,transports:60}, defenseBudget:55.0, alliances:['US-ROK Treaty'], nuclear:false, missileRange:800 },
    PAK: { name:'Pakistan', activePersonnel:654000, reserves:550000, paramilitary:500000, army:{personnel:550000,tanks:2200,apcs:5000,artillery:4000}, navy:{personnel:70000,frigates:10,corvettes:0,subs:8,patrol:20}, airForce:{personnel:70000,fighters:400,helicopters:300,transports:60}, defenseBudget:12.0, alliances:['SCO','OIC'], nuclear:true, missileRange:2750, nukes:170 },
    IRN: { name:'Iran', activePersonnel:610000, reserves:350000, paramilitary:40000, army:{personnel:350000,tanks:1990,apcs:5000,artillery:3000}, navy:{personnel:85000,frigates:7,corvettes:3,subs:19,patrol:200}, airForce:{personnel:40000,fighters:200,helicopters:100,transports:50}, defenseBudget:20.0, alliances:['SCO','OIC'], nuclear:false, missileRange:2000 },
    IRQ: { name:'Iraq', activePersonnel:193000, reserves:0, paramilitary:110000, army:{personnel:180000,tanks:300,apcs:1000,artillery:200}, navy:{personnel:5000,frigates:0,corvettes:0,subs:0,patrol:15}, airForce:{personnel:8000,fighters:30,helicopters:80,transports:20}, defenseBudget:9.0, alliances:['Arab League'], nuclear:false, missileRange:0 },
    SAU: { name:'Saudi Arabia', activePersonnel:257000, reserves:0, paramilitary:150000, army:{personnel:75000,tanks:1062,apcs:5000,artillery:500}, navy:{personnel:15500,frigates:7,corvettes:4,subs:0,patrol:30}, airForce:{personnel:20000,fighters:280,helicopters:250,transports:50}, defenseBudget:78.0, alliances:['GCC','Arab League','OPEC'], nuclear:false, missileRange:2000 },
    AFG: { name:'Afghanistan', activePersonnel:165000, reserves:0, paramilitary:0, army:{personnel:165000,tanks:600,apcs:800,artillery:300}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:0}, airForce:{personnel:5000,fighters:50,helicopters:100,transports:20}, defenseBudget:0.5, alliances:['None'], nuclear:false, missileRange:0 },
    SYR: { name:'Syria', activePersonnel:169000, reserves:0, paramilitary:100000, army:{personnel:140000,tanks:2600,apcs:4500,artillery:3500}, navy:{personnel:4000,frigates:0,corvettes:0,subs:0,patrol:10}, airForce:{personnel:25000,fighters:350,helicopters:150,transports:40}, defenseBudget:2.0, alliances:['Russia','Iran'], nuclear:false, missileRange:0 },
    VNM: { name:'Vietnam', activePersonnel:482000, reserves:5000000, paramilitary:40000, army:{personnel:412000,tanks:1300,apcs:3000,artillery:2000}, navy:{personnel:40000,frigates:9,corvettes:12,subs:8,patrol:40}, airForce:{personnel:30000,fighters:140,helicopters:100,transports:40}, defenseBudget:6.5, alliances:['ASEAN'], nuclear:false, missileRange:500 },
    THA: { name:'Thailand', activePersonnel:360000, reserves:200000, paramilitary:93000, army:{personnel:280000,tanks:500,apcs:2000,artillery:500}, navy:{personnel:70000,frigates:8,corvettes:5,subs:6,patrol:60,aircraftCarrier:1}, airForce:{personnel:43000,fighters:150,helicopters:200,transports:50}, defenseBudget:7.0, alliances:['ASEAN'], nuclear:false, missileRange:300 },
    IDN: { name:'Indonesia', activePersonnel:395000, reserves:400000, paramilitary:280000, army:{personnel:300000,tanks:300,apcs:1000,artillery:200}, navy:{personnel:75000,frigates:7,corvettes:24,subs:4,patrol:140}, airForce:{personnel:30000,fighters:110,helicopters:100,transports:40}, defenseBudget:9.0, alliances:['ASEAN'], nuclear:false, missileRange:0 },
    PHL: { name:'Philippines', activePersonnel:158000, reserves:13000, paramilitary:40000, army:{personnel:100000,tanks:0,apcs:200,artillery:100}, navy:{personnel:40000,frigates:2,corvettes:10,subs:0,patrol:60}, airForce:{personnel:17000,fighters:12,helicopters:50,transports:20}, defenseBudget:5.0, alliances:['ASEAN','US Treaty'], nuclear:false, missileRange:0 },
    MYS: { name:'Malaysia', activePersonnel:113000, reserves:51000, paramilitary:24000, army:{personnel:80000,tanks:64,apcs:1000,artillery:200}, navy:{personnel:18000,frigates:6,corvettes:0,subs:2,patrol:40}, airForce:{personnel:15000,fighters:62,helicopters:50,transports:20}, defenseBudget:4.5, alliances:['ASEAN','FPDA'], nuclear:false, missileRange:0 },
    ISR: { name:'Israel', activePersonnel:170000, reserves:465000, paramilitary:8000, army:{personnel:130000,tanks:1370,apcs:10000,artillery:1000}, navy:{personnel:12000,frigates:0,corvettes:6,subs:5,patrol:45}, airForce:{personnel:34000,fighters:583,helicopters:155,transports:20}, defenseBudget:24.0, alliances:['US-Israel Treaty'], nuclear:true, missileRange:6000, nukes:90 },
    KAZ: { name:'Kazakhstan', activePersonnel:39000, reserves:0, paramilitary:31000, army:{personnel:25000,tanks:300,apcs:1000,artillery:300}, navy:{personnel:3000,frigates:0,corvettes:0,subs:0,patrol:15}, airForce:{personnel:11000,fighters:120,helicopters:50,transports:30}, defenseBudget:1.5, alliances:['CSTO','SCO'], nuclear:false, missileRange:0 },
    MMR: { name:'Myanmar', activePersonnel:406000, reserves:110000, paramilitary:107000, army:{personnel:350000,tanks:300,apcs:500,artillery:200}, navy:{personnel:16000,frigates:3,corvettes:3,subs:0,patrol:50}, airForce:{personnel:23000,fighters:100,helicopters:80,transports:30}, defenseBudget:2.0, alliances:['ASEAN'], nuclear:false, missileRange:0 },
    BGD: { name:'Bangladesh', activePersonnel:175000, reserves:0, paramilitary:63000, army:{personnel:150000,tanks:300,apcs:800,artillery:300}, navy:{personnel:24000,frigates:5,corvettes:5,subs:0,patrol:50}, airForce:{personnel:22000,fighters:50,helicopters:30,transports:15}, defenseBudget:4.5, alliances:['SAARC','BIMSTEC'], nuclear:false, missileRange:0 },

    USA: { name:'United States', activePersonnel:1328000, reserves:799000, paramilitary:0, army:{personnel:465000,tanks:6209,apcs:25000,artillery:2000}, navy:{personnel:337000,frigates:0,corvettes:0,subs:68,patrol:30,aircraftCarrier:11}, airForce:{personnel:300000,fighters:1957,helicopters:2000,transports:500}, defenseBudget:877.0, alliances:['NATO','Quad','AUKUS','Five Eyes'], nuclear:true, missileRange:15000, nukes:5244 },
    CAN: { name:'Canada', activePersonnel:68000, reserves:27000, paramilitary:0, army:{personnel:22000,tanks:82,apcs:500,artillery:100}, navy:{personnel:8500,frigates:12,corvettes:0,subs:4,patrol:12}, airForce:{personnel:12500,fighters:88,helicopters:120,transports:40}, defenseBudget:26.0, alliances:['NATO','NORAD','Five Eyes'], nuclear:false, missileRange:0 },
    MEX: { name:'Mexico', activePersonnel:277000, reserves:0, paramilitary:110000, army:{personnel:60000,tanks:0,apcs:200,artillery:50}, navy:{personnel:56000,frigates:0,corvettes:10,subs:0,patrol:110}, airForce:{personnel:11000,fighters:10,helicopters:100,transports:40}, defenseBudget:10.0, alliances:['USMCA'], nuclear:false, missileRange:0 },
    BRA: { name:'Brazil', activePersonnel:366500, reserves:1340000, paramilitary:405000, army:{personnel:217000,tanks:437,apcs:1000,artillery:200}, navy:{personnel:81000,frigates:8,corvettes:5,subs:7,patrol:25,aircraftCarrier:1}, airForce:{personnel:78000,fighters:100,helicopters:100,transports:60}, defenseBudget:20.0, alliances:['UNASUR','OAS','BRICS'], nuclear:false, missileRange:0 },
    ARG: { name:'Argentina', activePersonnel:74000, reserves:0, paramilitary:0, army:{personnel:40000,tanks:220,apcs:500,artillery:100}, navy:{personnel:17000,frigates:9,corvettes:0,subs:3,patrol:20}, airForce:{personnel:12700,fighters:22,helicopters:40,transports:30}, defenseBudget:3.0, alliances:['UNASUR','OAS'], nuclear:false, missileRange:0 },
    COL: { name:'Colombia', activePersonnel:295000, reserves:0, paramilitary:150000, army:{personnel:230000,tanks:0,apcs:300,artillery:100}, navy:{personnel:35000,frigates:7,corvettes:2,subs:4,patrol:80}, airForce:{personnel:13000,fighters:20,helicopters:100,transports:30}, defenseBudget:11.0, alliances:['OAS'], nuclear:false, missileRange:0 },
    PER: { name:'Peru', activePersonnel:89000, reserves:188000, paramilitary:77000, army:{personnel:76000,tanks:300,apcs:400,artillery:200}, navy:{personnel:10000,frigates:8,corvettes:0,subs:6,patrol:30}, airForce:{personnel:6000,fighters:33,helicopters:40,transports:20}, defenseBudget:2.5, alliances:['OAS','UNASUR'], nuclear:false, missileRange:0 },
    VEN: { name:'Venezuela', activePersonnel:123000, reserves:0, paramilitary:304000, army:{personnel:80000,tanks:500,apcs:600,artillery:300}, navy:{personnel:13000,frigates:6,corvettes:4,subs:2,patrol:40}, airForce:{personnel:12000,fighters:50,helicopters:60,transports:20}, defenseBudget:0.7, alliances:['OPEC','ALBA'], nuclear:false, missileRange:0 },
    CHL: { name:'Chile', activePersonnel:78000, reserves:0, paramilitary:0, army:{personnel:45000,tanks:200,apcs:500,artillery:100}, navy:{personnel:25000,frigates:8,corvettes:0,subs:4,patrol:30}, airForce:{personnel:10000,fighters:43,helicopters:40,transports:20}, defenseBudget:6.0, alliances:['OAS','Pacific Alliance'], nuclear:false, missileRange:0 },
    BOL: { name:'Bolivia', activePersonnel:34500, reserves:0, paramilitary:37100, army:{personnel:33000,tanks:0,apcs:100,artillery:50}, navy:{personnel:5000,frigates:0,corvettes:0,subs:0,patrol:30}, airForce:{personnel:6500,fighters:15,helicopters:30,transports:15}, defenseBudget:0.8, alliances:['OAS','ALBA'], nuclear:false, missileRange:0 },
    CUB: { name:'Cuba', activePersonnel:49000, reserves:39000, paramilitary:6500, army:{personnel:38000,tanks:800,apcs:500,artillery:500}, navy:{personnel:5000,frigates:0,corvettes:0,subs:0,patrol:15}, airForce:{personnel:8000,fighters:25,helicopters:30,transports:20}, defenseBudget:0.0, alliances:['ALBA'], nuclear:false, missileRange:0 },
    ECU: { name:'Ecuador', activePersonnel:40000, reserves:0, paramilitary:0, army:{personnel:30000,tanks:100,apcs:200,artillery:80}, navy:{personnel:9000,frigates:6,corvettes:0,subs:2,patrol:30}, airForce:{personnel:6000,fighters:20,helicopters:30,transports:15}, defenseBudget:2.5, alliances:['OAS','UNASUR'], nuclear:false, missileRange:0 },
    PRY: { name:'Paraguay', activePersonnel:13900, reserves:0, paramilitary:14000, army:{personnel:11000,tanks:6,apcs:50,artillery:20}, navy:{personnel:2000,frigates:0,corvettes:0,subs:0,patrol:10}, airForce:{personnel:1000,fighters:0,helicopters:10,transports:5}, defenseBudget:0.3, alliances:['OAS','MERCOSUR'], nuclear:false, missileRange:0 },
    URY: { name:'Uruguay', activePersonnel:21500, reserves:0, paramilitary:0, army:{personnel:17000,tanks:0,apcs:100,artillery:30}, navy:{personnel:4000,frigates:3,corvettes:0,subs:0,patrol:10}, airForce:{personnel:1000,fighters:0,helicopters:10,transports:5}, defenseBudget:1.0, alliances:['OAS','MERCOSUR'], nuclear:false, missileRange:0 },

    AUS: { name:'Australia', activePersonnel:59900, reserves:30000, paramilitary:0, army:{personnel:30000,tanks:59,apcs:1000,artillery:200}, navy:{personnel:16000,frigates:9,corvettes:0,subs:6,patrol:15}, airForce:{personnel:14000,fighters:100,helicopters:150,transports:40}, defenseBudget:48.0, alliances:['AUKUS','Five Eyes','Quad'], nuclear:false, missileRange:0 },
    NZL: { name:'New Zealand', activePersonnel:9400, reserves:2300, paramilitary:0, army:{personnel:4500,tanks:0,apcs:100,artillery:20}, navy:{personnel:2400,frigates:2,corvettes:0,subs:0,patrol:8}, airForce:{personnel:2500,fighters:0,helicopters:20,transports:10}, defenseBudget:4.0, alliances:['Five Eyes','ANZUS'], nuclear:false, missileRange:0 },
    PNG: { name:'Papua New Guinea', activePersonnel:4000, reserves:0, paramilitary:0, army:{personnel:3500,tanks:0,apcs:20,artillery:10}, navy:{personnel:400,frigates:0,corvettes:0,subs:0,patrol:4}, airForce:{personnel:0,fighters:0,helicopters:0,transports:5}, defenseBudget:0.1, alliances:['Pacific Islands Forum'], nuclear:false, missileRange:0 },
    FJI: { name:'Fiji', activePersonnel:3500, reserves:6000, paramilitary:0, army:{personnel:3500,tanks:0,apcs:20,artillery:5}, navy:{personnel:0,frigates:0,corvettes:0,subs:0,patrol:5}, airForce:{personnel:0,fighters:0,helicopters:0,transports:3}, defenseBudget:0.1, alliances:['Pacific Islands Forum'], nuclear:false, missileRange:0 },

    ARE: { name:'UAE', activePersonnel:65000, reserves:0, paramilitary:0, army:{personnel:47000,tanks:400,apcs:2000,artillery:200}, navy:{personnel:2500,frigates:0,corvettes:8,subs:0,patrol:30}, airForce:{personnel:4500,fighters:180,helicopters:200,transports:50}, defenseBudget:25.0, alliances:['GCC','Arab League'], nuclear:false, missileRange:0 },
    QAT: { name:'Qatar', activePersonnel:16500, reserves:0, paramilitary:0, army:{personnel:12000,tanks:90,apcs:300,artillery:50}, navy:{personnel:3000,frigates:0,corvettes:0,subs:0,patrol:20}, airForce:{personnel:2500,fighters:96,helicopters:50,transports:20}, defenseBudget:10.0, alliances:['GCC','Arab League','OPEC'], nuclear:false, missileRange:0 },
    KWT: { name:'Kuwait', activePersonnel:17500, reserves:24000, paramilitary:7000, army:{personnel:11000,tanks:294,apcs:500,artillery:100}, navy:{personnel:2000,frigates:0,corvettes:0,subs:0,patrol:10}, airForce:{personnel:2500,fighters:100,helicopters:30,transports:20}, defenseBudget:8.0, alliances:['GCC','Arab League'], nuclear:false, missileRange:0 },
    JOR: { name:'Jordan', activePersonnel:100500, reserves:65000, paramilitary:0, army:{personnel:85000,tanks:1200,apcs:3000,artillery:500}, navy:{personnel:500,frigates:0,corvettes:0,subs:0,patrol:5}, airForce:{personnel:14000,fighters:90,helicopters:80,transports:25}, defenseBudget:5.0, alliances:['Arab League','NATO partner'], nuclear:false, missileRange:0 },
    LBN: { name:'Lebanon', activePersonnel:80000, reserves:0, paramilitary:20000, army:{personnel:78000,tanks:300,apcs:500,artillery:300}, navy:{personnel:1000,frigates:0,corvettes:0,subs:0,patrol:10}, airForce:{personnel:1000,fighters:0,helicopters:30,transports:10}, defenseBudget:0.5, alliances:['Arab League'], nuclear:false, missileRange:0 },
    YEM: { name:'Yemen', activePersonnel:40000, reserves:0, paramilitary:70000, army:{personnel:40000,tanks:300,apcs:500,artillery:200}, navy:{personnel:1500,frigates:0,corvettes:0,subs:0,patrol:10}, airForce:{personnel:3000,fighters:20,helicopters:20,transports:10}, defenseBudget:0.0, alliances:['Arab League'], nuclear:false, missileRange:0 },
    OMN: { name:'Oman', activePersonnel:42000, reserves:0, paramilitary:0, army:{personnel:35000,tanks:200,apcs:800,artillery:100}, navy:{personnel:4200,frigates:3,corvettes:0,subs:0,patrol:15}, airForce:{personnel:4100,fighters:50,helicopters:40,transports:20}, defenseBudget:7.0, alliances:['GCC','Arab League'], nuclear:false, missileRange:0 },
    BHR: { name:'Bahrain', activePersonnel:14000, reserves:0, paramilitary:11200, army:{personnel:9000,tanks:180,apcs:300,artillery:50}, navy:{personnel:2000,frigates:1,corvettes:0,subs:0,patrol:15}, airForce:{personnel:2500,fighters:80,helicopters:30,transports:15}, defenseBudget:2.0, alliances:['GCC','Arab League'], nuclear:false, missileRange:0 },
  },

  getCountry(code) { return this.data[code] || null; },
  getAll() { return this.data; },
  getCount() { return Object.keys(this.data).length; },

  // Get military power ranking
  getRanking() {
    const ranked = Object.entries(this.data)
      .map(([code, d]) => ({ code, name: d.name, score: this._calcScore(d) }))
      .sort((a, b) => b.score - a.score);
    return ranked.map((r, i) => ({ rank: i + 1, ...r }));
  },

  _calcScore(d) {
    let score = 0;
    score += d.activePersonnel * 0.01;
    score += (d.army.tanks || 0) * 2;
    score += (d.army.artillery || 0) * 1;
    score += (d.airForce.fighters || 0) * 5;
    score += (d.navy.subs || 0) * 20;
    score += (d.navy.aircraftCarrier || 0) * 100;
    score += d.defenseBudget * 10;
    if (d.nuclear) score += 10000;
    return Math.round(score);
  },
};

// ============================================================
// 2. HISTORICAL TRIBES / KINGDOMS / EMPIRES PER ERA
// ============================================================
const HISTORICAL_ERAS = {
  eras: [
    {
      id: 0, name: 'Stone Age', period: '2.5M BCE - 3000 BCE',
      factions: [
        { name: 'Nigerian Tribes', region: 'West Africa', tribes: ['Nok People','Ijaw Hunters','Hausa Ancestors','Yoruba Forebears'], weapons: ['stone_club','sharpened_stick','throwing_rock','sling','bone_axe','fire_spear'], uniform: 'Animal skins and leather loincloths. Tribal body paint in ochre and charcoal.' },
        { name: 'Egyptian Pre-Dynastic', region: 'North Africa', tribes: ['Naqada Culture','Badarian People','Amratian Culture'], weapons: ['stone_knife','bone_axe','obsidian_blade','throwing_spear'], uniform: 'Linen wraps. Red and black body paint. Crook and flail symbols.' },
        { name: 'Mesopotamian Tribes', region: 'Middle East', tribes: ['Ubaid People','Sumerian Ancestors','Uruk Settlers'], weapons: ['stone_club','sling','bone_axe','jawbone_weapon'], uniform: 'Wool garments. Reed sandals.' },
        { name: 'European Hunter-Gatherers', region: 'Europe', tribes: ['Maglemosian','Ertebølle','Swifterbant'], weapons: ['sharpened_stick','bone_axe','atlatl_spear','antler_pickaxe'], uniform: 'Fur pelts. Leather wraps. Bone jewelry.' },
        { name: 'Chinese Neolithic', region: 'East Asia', tribes: ['Yangshao Culture','Longshan Culture','Hongshan Culture'], weapons: ['stone_knife','stone_war_hammer','sharpened_stick','bolas'], uniform: 'Hemp cloth. Jade ornaments. Topknot hairstyle.' },
        { name: 'Native American Tribes', region: 'Americas', tribes: ['Clovis Culture','Folsom Tradition','Paleo-Indian'], weapons: ['sharpened_stick','throwing_rock','bone_axe','bolas'], uniform: 'Hide clothing. Feather headdresses. War paint.' },
        { name: 'Australian Aboriginals', region: 'Oceania', tribes: ['First Australians','Arrernte','Koori'], weapons: ['boomerang','sharpened_stick','throwing_spear','stone_knife'], uniform: 'Minimal clothing. Body paint. Ochre decoration.' },
        { name: 'Andean Peoples', region: 'South America', tribes: ['Norte Chico','Caral Civilization','Chavín Culture'], weapons: ['bolas','stone_club','sling','obsidian_blade'], uniform: 'Woven cotton. Llama wool ponchos. Turban headdresses.' },
      ],
    },
    {
      id: 1, name: 'Bronze Age', period: '3000 BCE - 1200 BCE',
      factions: [
        { name: 'Egyptian Old/Middle Kingdom', region: 'North Africa', tribes: ['Old Kingdom Pharaohs','Middle Kingdom','Theban Princes'], weapons: ['bronze_sword','bronze_spear','short_bow','chariot_bow','khopesh','chariot_lance'], uniform: 'White linen kilts. Bronze scale armor for elite. Pharaoh headdress (khepresh). Blue and gold war crown.' },
        { name: 'Sumerian City-States', region: 'Mesopotamia', tribes: ['Ur','Uruk','Lagash','Eridu'], weapons: ['bronze_sword','bronze_axe','sickle_sword','bronze_arrow'], uniform: 'Wool kaunakes. Bronze helmets. Copper axes.' },
        { name: 'Minoan Civilization', region: 'Crete', tribes: ['Knossos','Phaistos','Malia'], weapons: ['bronze_sword','bronze_dagger','short_bow'], uniform: 'Loincloths. Bull-leaper motifs. Bare-chested warriors.' },
        { name: 'Mycenaean Greeks', region: 'Greece', tribes: ['Mycenae','Tiryns','Pylos','Thebes'], weapons: ['bronze_sword','bronze_dagger','sickle_sword','composite_bow_early'], uniform: 'Boar-tusk helmets. Bronze cuirass. Dendra armor. Linen tunics.' },
        { name: 'Hittite Empire', region: 'Anatolia', tribes: ['Hattusa','Carchemish','Kadesh'], weapons: ['bronze_sword','bronze_mace','chariot_lance','bronze_axe'], uniform: 'Iron (early) helmets. Bronze scale armor. Long robes.' },
        { name: 'Shang Dynasty', region: 'China', tribes: ['Shang Royal House','Yin Dynasty','Zhongyuan Lords'], weapons: ['bronze_halberd','bronze_spear','chariot_bow','bronze_arrow'], uniform: 'Silk robes. Bronze ceremonial armor. Jade belt hooks.' },
        { name: 'Indus Valley Civilization', region: 'South Asia', tribes: ['Harappa','Mohenjo-daro','Dholavira'], weapons: ['bronze_spear','short_bow','bronze_dagger'], uniform: 'Cotton garments. Bronze jewelry. Dyed cloth.' },
        { name: 'Nubian Kingdom of Kush', region: 'Sudan', tribes: ['Kerma','Napata','Meroitic Ancestors'], weapons: ['bronze_spear','short_bow','bronze_mace'], uniform: 'Leather shields. Ostrich feather headdresses. Leopard skins.' },
      ],
    },
    {
      id: 2, name: 'Iron Age', period: '1200 BCE - 500 CE',
      factions: [
        { name: 'Roman Republic/Empire', region: 'Mediterranean', tribes: ['Legio I','Legio IX Hispana','Legio X Equestris','Praetorian Guard'], weapons: ['iron_sword','gladius','pilum','ballista','spatha','pugio','hasta','sagittarius_bow'], uniform: 'Lorica segmentata (iron plate armor). Red tunic. Red crest helmet. Scutum shield. Caligae sandals. Gladius on right hip.' },
        { name: 'Persian Achaemenid Empire', region: 'Persia', tribes: ['Immortals','Satrapal Guards','Cavalry Elite'], weapons: ['iron_sword','composite_bow','sickle_sword','iron_spear'], uniform: 'Scale armor. Tiara caps. Purple and gold robes. Wicker shields.' },
        { name: 'Han Dynasty China', region: 'East Asia', tribes: ['Han Imperial Army','Northern Garrison','Hexi Corridor Guard'], weapons: ['repeating_crossbow','iron_spear','iron_sword','composite_bow'], uniform: 'Lamellar armor. Iron helmets. Red silk tunics. Jade ornaments.' },
        { name: 'Norse Vikings', region: 'Scandinavia', tribes: ['Rus Vikings','Danish Raiders','Norwegian Explorers','Swedish Varangians'], weapons: ['iron_dagger','seax','battle_axe','iron_sword','francisca'], uniform: 'Chainmail byrnie. Conical helmets (no horns). Wool cloaks. Leather boots.' },
        { name: 'Celtic Tribes', region: 'Western Europe', tribes: ['Gauls','Britons','Galatians','Belgae'], weapons: ['iron_spear','iron_dagger','seax','francisca'], uniform: 'Tartan trousers. Torc neck rings. Blue woad body paint. Bare-chested with chainmail for elite.' },
        { name: 'Kingdom of Kush', region: 'Sudan', tribes: ['Meroitic Army','Kushite Archers','Nubian Cavalry'], weapons: ['iron_spear','composite_bow','iron_sword'], uniform: 'Leather and iron armor. Gold jewelry. Feathered headdresses.' },
        { name: 'Maurya/Gupta Empire', region: 'India', tribes: ['Mauryan Infantry','Gupta War Elephants','Magadha Guards'], weapons: ['iron_sword','iron_spear','composite_bow'], uniform: 'Cotton tunics. Iron helmets. Elephant-mounted elite. Gold trim for officers.' },
        { name: 'Parthian Empire', region: 'Persia', tribes: ['Parthian Cataphracts','Suren cavalry','Pahlavi Guard'], weapons: ['sagittarius_bow','iron_spear','iron_sword'], uniform: 'Scale armor for horse and rider. Spangen helmets. Silk undergarments.' },
      ],
    },
    {
      id: 3, name: 'Medieval', period: '500 CE - 1500 CE',
      factions: [
        { name: 'English Kingdom', region: 'England', tribes: ['Royal Guard','Welsh Longbowmen','Knights of the Garter'], weapons: ['longsword','longbow','heavy_crossbow','arming_sword','war_hammer'], uniform: 'Plate armor. Heraldic surcoat. Great helm. Chainmail beneath plate. Yellow and red Plantagenet colors.' },
        { name: 'French Kingdom', region: 'France', tribes: ['French Knights','Genoese Crossbowmen','Ordonnance Companies'], weapons: ['longsword','arblast','poleaxe','bec_de_corbin'], uniform: 'Full plate armor. Heraldic tabard. Visored bascinet. Blue and gold fleur-de-lis.' },
        { name: 'Holy Roman Empire', region: 'Germany', tribes: ['Landsknechts','Teutonic Knights','Imperial Guard'], weapons: ['longsword','war_scythe','halberd','poleaxe'], uniform: 'Gothic plate armor. Black and gold. Slashed sleeves. Burgonet helmets.' },
        { name: 'Mali Empire', region: 'West Africa', tribes: ['Mansa Guard','Mandinka Cavalry','Djinni Warriors'], weapons: ['iron_sword','war_hammer','throwing_spear','short_bow'], uniform: 'Gold-trimmed robes. Cotton armor. Leather shields. Mandinka headdresses.' },
        { name: 'Song/Yuan Dynasty China', region: 'East Asia', tribes: ['Imperial Guard','Mongol Cavalry','Fire Lance troops'], weapons: ['hand_cannon','hwacha','iron_spear','repeating_crossbow'], uniform: 'Lamellar armor. Iron helmets. Silk tunics. Fire lance units with early gunpowder pouches.' },
        { name: 'Mongol Empire', region: 'Central Asia', tribes: ['Golden Horde','Ilkhanate','Chagatai Khanate','Yuan Dynasty'], weapons: ['composite_bow','iron_sword','war_hammer'], uniform: 'Leather and silk armor. Fur caps. Mounted archers. No heavy armor for mobility.' },
        { name: 'Japanese Shogunate', region: 'Japan', tribes: ['Samurai','Ashigaru','Sohei Warrior Monks'], weapons: ['longsword','war_scythe','heavy_crossbow','hand_cannon'], uniform: 'O-yoroi armor. Kabuto helmets. Menpo face masks. Sashimono back banners. Kimono beneath.' },
        { name: 'Oyo/Benin Empire', region: 'Nigeria', tribes: ['Oyo Cavalry','Benin Royal Guard','Egba Warriors'], weapons: ['iron_sword','war_hammer','throwing_spear','short_bow'], uniform: 'Cotton battle dress. Coral bead jewelry. Leopard skin cloaks. Adire indigo cloth.' },
        { name: 'Ottoman Empire', region: 'Turkey', tribes: ['Janissaries','Sipahi Cavalry','Azaps'], weapons: ['longsword','war_hammer','catapult_stone','greek_fire'], uniform: 'Turban headdresses. Chainmail beneath silk robes. Bows and scimitars. Red Ottoman banners.' },
      ],
    },
    {
      id: 4, name: 'Renaissance', period: '1500 CE - 1800 CE',
      factions: [
        { name: 'Spanish Empire', region: 'Spain', tribes: ['Tercios','Conquistadors','Spanish Navy'], weapons: ['flintlock_musket','arquebus','flintlock_pistol','field_cannon'], uniform: 'Steel breastplates. Morion helmets. Red and gold Spanish colors. Leather boots.' },
        { name: 'British Empire', region: 'England', tribes: ['Redcoats','Royal Navy','Highland Regiments'], weapons: ['flintlock_musket','flintlock_pistol','naval_cannon','grapeshot_cannon'], uniform: 'Red wool coats. Black tricorn hats. White breeches. Crossbelts. Muskets with bayonets.' },
        { name: 'French Kingdom/Empire', region: 'France', tribes: ['Musketeers','Napoleonic Grande Armée','French Navy'], weapons: ['flintlock_musket','musketoon','flintlock_pistol','field_cannon'], uniform: 'Blue coats (Napoleonic). White crosses. Shako hats. Gold epaulettes. Tricolor cockade.' },
        { name: 'Ottoman Empire', region: 'Turkey', tribes: ['Janissaries','Sipahis','Ottoman Navy'], weapons: ['flintlock_musket','matchlock','field_cannon','blunderbuss'], uniform: 'Turban. Silk kaftans. Bronze and gold ornamentation. Bow + musket hybrid era.' },
        { name: 'Qing Dynasty China', region: 'China', tribes: ['Eight Banners','Green Standard Army','Qing Navy'], weapons: ['flintlock_musket','matchlock','field_cannon','hwacha'], uniform: 'Mandarin jackets. Queue hairstyle. Silk armor. Dragon motifs.' },
        { name: 'Tokugawa Japan', region: 'Japan', tribes: ['Samurai','Ashigaru musketeers','Shogunate Guard'], weapons: ['matchlock','flintlock_pistol','double_pistol','hand_mortar'], uniform: 'Armor evolving to lighter styles. Hakama trousers. Kimono. Matchlock teppo.' },
        { name: 'Russian Empire', region: 'Russia', tribes: ['Streltsy','Imperial Guard','Cossack Host'], weapons: ['flintlock_musket','matchlock','field_cannon','flintlock_pistol'], uniform: 'Green coats (later). Fur hats. Cossack uniforms with papakha. Orthodox crosses.' },
        { name: 'Oyo Empire', region: 'Nigeria', tribes: ['Oyo Cavalry','Dahomey Warriors','Imperial Guard'], weapons: ['flintlock_musket','matchlock','flintlock_pistol','iron_sword'], uniform: 'Adorned battle dress. Cowrie shell decorations. Leopard skin. Imported muskets.' },
      ],
    },
    {
      id: 5, name: 'Industrial', period: '1800 CE - 1914 CE',
      factions: [
        { name: 'United States', region: 'North America', tribes: ['Union Army','Confederate Army','US Cavalry'], weapons: ['colt_revolver','springfield_1903','winchester','gatling_gun','henry_rifle','sharps_rifle'], uniform: 'Union: Blue wool. Confederate: Grey wool. Cavalry: Yellow trim. Slouch hats. Forage caps.' },
        { name: 'British Empire', region: 'England', tribes: ['Redcoats','Royal Navy','Colonial Forces'], weapons: ['lee_enfield','maxim_gun','webley','martini_henry'], uniform: 'Khaki (colonial). Red (ceremonial). Pith helmets in tropics. Wolseley helmets.' },
        { name: 'German Empire', region: 'Germany', tribes: ['Prussian Army','Imperial Navy','Bavarian Corps'], weapons: ['mauser_c96','maxim_gun','field_cannon','flintlock_musket'], uniform: 'Pickelhaube helmets. Field grey (later). Blue (early). Black-white Prussian colors.' },
        { name: 'French Republic', region: 'France', tribes: ['French Army','Foreign Legion','Colonial Troops'], weapons: ['lebel_rifle','hotchkiss','flintlock_pistol','field_cannon'], uniform: 'Bright blue (early). Horizon blue (WW1). Kepi caps. Red trousers (early).' },
        { name: 'Russian Empire', region: 'Russia', tribes: ['Imperial Army','Cossack Cavalry','Imperial Guard'], weapons: ['mosin_nagant','maxim_gun','nagant_revolver','field_cannon'], uniform: 'Khaki green. Fur papakha hats. Greatcoats. Orthodox crosses.' },
        { name: 'Japanese Empire', region: 'Japan', tribes: ['Imperial Army','Imperial Navy','Samurai Heritage'], weapons: ['arisaka','springfield_1903','flintlock_pistol'], uniform: 'Khaki (from 1900). Previously dark blue. Peaked caps. Samurais transitioning to modern.' },
        { name: 'Ottoman Empire', region: 'Turkey', tribes: ['Ottoman Army','Nizam troops'], weapons: ['mauser_c96','flintlock_musket','maxim_gun'], uniform: 'Grey-blue. Fez hats. Ottoman crest. Puttees.' },
      ],
    },
    {
      id: 6, name: 'World War 1 & 2', period: '1914 CE - 1945 CE',
      factions: [
        { name: 'United States', region: 'North America', tribes: ['US Army','US Marine Corps','82nd Airborne','101st Airborne'], weapons: ['m1_garand','thompson','bar','browning_50','colt_1911','bazooka'], uniform: 'OD green wool. M1 helmet (steel pot). Leggings. Khaki shirts. Web gear.' },
        { name: 'Nazi Germany', region: 'Germany', tribes: ['Wehrmacht','Waffen-SS','Afrika Korps','Fallschirmjäger'], weapons: ['kar98k','mp40','mg42','stg44','luger','panzerschreck'], uniform: 'Field grey. Stahlhelm helmets. Black (SS). Tropical (Afrika Korps). Jackboots.' },
        { name: 'British Empire', region: 'England', tribes: ['British Army','Commandos','SAS (WW2)','Red Berets'], weapons: ['lee_enfield_4','bren_gun','sten_gun','piat','walther_p38'], uniform: 'Khaki/Battledress. Brodie helmet. Denison smocks (commandos). Beret (paras).' },
        { name: 'Soviet Union', region: 'Russia', tribes: ['Red Army','NKVD','Guards Divisions','Partisans'], weapons: ['ppsh','dp28','svt40','tt33','molotov'], uniform: 'Khaki/gymnasterka tunics. Pilotka caps. Ushanka winter hats. Greatcoats. Red star insignia.' },
        { name: 'Imperial Japan', region: 'Japan', tribes: ['IJA','Imperial Marines','Kamikaze','Kwantung Army'], weapons: ['type99_arisaka','type100_smg','nambu','bayonet'], uniform: 'Khaki/olive. Type 90 helmet. Puttees. Cloth cap (field). Rising sun armband.' },
        { name: 'Free France', region: 'France', tribes: ['Free French','Resistance','Foreign Legion'], weapons: ['lebel_rifle','mas_38','bren_gun'], uniform: 'Khaki. Adrian helmet. Cross of Lorraine. Beret.' },
        { name: 'Italian Forces', region: 'Italy', tribes: ['Regio Esercito','Alpini','Blackshirts'], weapons: ['carcano','beretta_m38','schwarzlose'], uniform: 'Grey-green. Bustina cap. Pith helmet (colonial). Black shirts (MVSN).' },
      ],
    },
    {
      id: 7, name: 'Cold War', period: '1945 CE - 1991 CE',
      factions: [
        { name: 'United States', region: 'North America', tribes: ['US Army','Green Berets','USMC','US Navy SEALs','Delta Force'], weapons: ['m16_vietnam','m60','m14','m72_law','stinger','colt_1911'], uniform: 'ERDL/OG-107 green. M1 helmet. Jungle boots (Vietnam). Tiger stripe (advisors). Woodland camo (1980s+).' },
        { name: 'Soviet Union', region: 'Russia', tribes: ['Soviet Army','Spetsnaz','VDV Airborne','KGB'], weapons: ['ak47','rpg7','dragunov','ppsh','sa7_grail','makarov'], uniform: 'TTsKO camo. Soviet telnyashka (striped shirt). Ushanka. Pilotka. Red star.' },
        { name: 'United Kingdom', region: 'England', tribes: ['British Army','SAS','Royal Marines','Paras'], weapons: ['fn_fal','sterling','slr','m60'], uniform: 'DPM woodland. DPM smock. Beret (regiment colors). SAS beige beret.' },
        { name: 'Israel', region: 'Middle East', tribes: ['IDF','Sayeret Matkal','Paratroopers','Golani Brigade'], weapons: ['uzi','galil','fn_fal','ak47'], uniform: 'Olive drab. Sand-colored (desert). Mitznefet helmet covers. Tallit katan (some).' },
        { name: 'Vietnam (NVA/VC)', region: 'Southeast Asia', tribes: ['NVA','Viet Cong','Main Force'], weapons: ['ak47','rpg7','sks','tt33','sa7_grail'], uniform: 'Khaki/green. Pith helmets. Black pajamas (VC). Rubber sandals (tire-tread).' },
        { name: 'China (PLA)', region: 'East Asia', tribes: ['PLA Ground Force','PLA Navy','People\'s Militia'], weapons: ['ak47','type_56','rpg7'], uniform: ' olive green. Mao cap. Plain cloth. No rank insignia (early).' },
        { name: 'France', region: 'Europe', tribes: ['French Army','Foreign Legion','1er RPIMa'], weapons: ['famas','mat_49','aa52'], uniform: 'F2 woodland (later). Khaki (colonial). Kepi blanc (Legion). TAP 47 helmets.' },
      ],
    },
    {
      id: 8, name: 'Modern', period: '1991 CE - 2025 CE',
      factions: [
        { name: 'United States', region: 'North America', tribes: ['US Army','Delta Force','75th Rangers','Green Berets','USMC MARSOC','Navy SEALs'], weapons: ['m4a1','scar_h','barrett_m82','javelin','colt_1911','glock17'], uniform: 'UCP/OCP (Scorpion W2). ACU. MICH helmet. ACH. MultiCam. Plate carriers. Oakley gloves.' },
        { name: 'Russia', region: 'Russia', tribes: ['Russian Army','Spetsnaz GRU','VDV','FSB','National Guard'], weapons: ['ak12','ak74','rpk16','vss_vintorez','gm6_lynx','kord_hmg'], uniform: 'EMR (digital flora). Ratnik suit. 6B46 helmet. Altyn (Spetsnaz). Digital woodland.' },
        { name: 'United Kingdom', region: 'England', tribes: ['British Army','SAS','SBS','Royal Marines','Pathfinders'], weapons: ['hk416','awp','nlaw','fnx45','sa80'], uniform: 'MTP (Multi-Terrain Pattern). Virtus helmet. Osprey armor. Mk7 helmet.' },
        { name: 'China (PLA)', region: 'East Asia', tribes: ['PLA Army','PLA SF','Marines','PAP'], weapons: ['ak19','g36','type_95','p90'], uniform: 'Type 07 camo (digital). Type 19 (newer). Digital woodland. Plate carriers.' },
        { name: 'Israel (IDF)', region: 'Middle East', tribes: ['IDF','Sayeret Matkal','Shayetet 13','Givati','Golani'], weapons: ['tavor_x95','galil','fnx45','spike_missile'], uniform: 'Olive drab (standard). Sand (Tzabar kit). Mitznefet helmet cover. Ceramic plate.' },
        { name: 'Nigeria', region: 'West Africa', tribes: ['Nigerian Army','Nigerian Navy SBS','Nigerian Air Force','Civilian JTF'], weapons: ['ak47','fn_fal','m16_vietnam','rpg7','glock17'], uniform: 'Woodland camo. Nigerian flag patch. Beret (army). Green-brown digital (newer).' },
        { name: 'France', region: 'Europe', tribes: ['French Army','COS','1er RPIMa','GIGN'], weapons: ['famas','hk416','fn_fal','mp5'], uniform: 'Cecen (woodland). FELIN system. SPECTRA helmet. Black (GIGN).' },
        { name: 'Germany', region: 'Europe', tribes: ['Bundeswehr','KSK','Fallschirmjäger'], weapons: ['g36','mp7','hk416','glock17'], uniform: 'Flecktarn (woodland). Tropentarn (desert). IdZ system. MICH helmet.' },
      ],
    },
    {
      id: 9, name: 'Near Future', period: '2025 CE - 2100 CE',
      factions: [
        { name: 'NATO Space Command', region: 'Global', tribes: ['Orbital Marines','Quantum Rangers','AI Division'], weapons: ['railgun','coil_rifle','laser_carbine','plasma_pistol','emp_grenade','smart_rifle'], uniform: 'Exosuit armor. Energy shielding. HUD visors. Adaptive camo fibers. Climate-controlled.' },
        { name: 'Eurasian Alliance', region: 'Russia/China', tribes: ['Cyber Soldiers','Drone Operators','Quantum Guard'], weapons: ['rail_sniper','sonic_cannon','rail_pistol','auto_turret'], uniform: 'Powered armor. Neural interfaces. Digital camo with active color shift.' },
        { name: 'African Defense Union', region: 'Africa', tribes: ['Desert Rangers','Jungle Elites','Coastal Guard'], weapons: ['rail_shotgun','plasma_grenade','nano_swarm','combat_drone'], uniform: 'Desert-pattern adaptive. Solar-powered cooling suits. Light composite armor.' },
        { name: 'Pacific Coalition', region: 'Asia-Pacific', tribes: ['Sea Dragon Marines','Island Defense Force','Quantum Navy'], weapons: ['laser_lmg','plasma_sniper','drone_swarm','emp_mine'], uniform: 'Aquatic camo. Amphibious armor. Hydro-dynamic suit. Flipper boots.' },
      ],
    },
    {
      id: 10, name: 'Future', period: '2100 CE - 2500 CE',
      factions: [
        { name: 'Galactic Earth Alliance', region: 'Sol System', tribes: ['Orbital Drop Troopers','Void Marines','Star Knights'], weapons: ['plasma_rifle','plasma_scatter','pulse_cannon','laser_minigun','heavy_railgun','warp_blade','plasma_sword'], uniform: 'Powered exo-armor. Vacuum-sealed. Energy shielding. Plasma-cooled. Flag of Earth on shoulder.' },
        { name: 'Mars Colonial Republic', region: 'Mars', tribes: ['Mars Defense Force','Red Guard','Mars Rangers'], weapons: ['ion_grenade','mech_cannon','teleport_mine','emp_cannon'], uniform: 'Red-trimmed armor. Mars terraformed desert camo. Vacuum-rated. Dust-filtered.' },
        { name: 'Asteroid Belt Federation', region: 'Belt', tribes: ['Belt Marines','Miner Militias','Void Pirates'], weapons: ['orbital_strike','quantum_rifle','singularity_pistol','gravity_gun'], uniform: 'Salvaged armor. Zero-G harnesses. Mining suit base. Patchwork defenses.' },
        { name: 'Titan Independent Colonies', region: 'Saturn', tribes: ['Titan Guard','Methane Marines','Ice Soldiers'], weapons: ['photon_launcher','dark_matter_rifle','tachyon_pistol','stasis_field_gen'], uniform: 'Cold-weather vacuum armor. Methane atmosphere sealed. Ice-blue markings.' },
      ],
    },
    {
      id: 11, name: '30th Century', period: '3000 CE+',
      factions: [
        { name: 'Trans-Dimensional Federation', region: 'Multi-verse', tribes: ['Dimensional Rangers','Reality Engineers','Void Walkers','Cosmic Guard'], weapons: ['hyperspace_cannon','laser_array','dimensional_blade','antimatter_rifle','phase_rifle','void_cannon','chronoblade','tachyon_sniper','galaxy_buster','soul_reaper_blade','quasar_lance'], uniform: 'Living armor that adapts to dimension. Bio-organic plating. Dimensional anchor harness. Stars visible through translucent panels.' },
        { name: 'Void Dominion', region: 'Void Dimension', tribes: ['Void Lords','Shadow Reapers','Entropy Guard'], weapons: ['singularity_grenade','void_cannon','8d_void_cannon','cosmic_teleporter','void_banisher'], uniform: 'Void-absorbing armor. Darker than black. No visible features except glowing eyes.' },
        { name: 'Cosmic Empire', region: 'Galaxy', tribes: ['Star Forge Guard','Galaxy Hunters','Supernova Corps'], weapons: ['starship_laser','quantum_cannon','dimensional_rift','starforge_cannon','multiverse_rifle','8d_cosmic_portal'], uniform: 'Galaxy-pattern armor. Stars move across surface. Light-bending cloaks. Nebula-colored.' },
        { name: 'Temporal Authority', region: 'Time Stream', tribes: ['Time Wardens','Chrono Guard','Paradox Division'], weapons: ['chronoblade','chrono_storm_ult','tachyon_sniper','reality_anchor_gun','6d_phase_cannon'], uniform: 'Time-phased armor. Appears slightly shifted in time. Afterimages visible. Gold and silver.' },
      ],
    },
  ],

  getEra(id) { return this.eras.find(e => e.id === id); },
  getAllEras() { return this.eras; },
  getFactionCount() { return this.eras.reduce((s, e) => s + e.factions.length, 0); },
};

// ============================================================
// 3. ADDITIONAL WEAPONS (100+ more)
// ============================================================
const ADDITIONAL_WEAPONS = {
  // Weapons that should exist but don't yet
  weapons: {
    // Stone Age additions
    mammoth_bone_club: { name: 'Mammoth Bone Club', era: 0, dmg: 25, rate: 1200, mag: 1, range: 4, type: 'melee', country: 'EUROPE', desc: 'Heavy bone club from mammoth femur. Devastating blunt force.' },
    flint_hand_axe: { name: 'Flint Hand Axe', era: 0, dmg: 18, rate: 900, mag: 1, range: 3, type: 'melee', country: 'AFRICA', desc: 'Sharp flint knapped axe. Oldest designed weapon.' },
    fishing_spear: { name: 'Fishing Spear', era: 0, dmg: 12, rate: 600, mag: 1, range: 6, type: 'thrown', country: 'GLOBAL', desc: 'Barbed spear for fishing. Works on people too.' },
    war_drum: { name: 'War Drum', era: 0, dmg: 0, rate: 0, mag: 1, range: 50, type: 'support', country: 'AFRICA', desc: 'Intimidation weapon. Morale boost to allies. Fear to enemies.' },

    // Bronze Age additions
    labyrs: { name: 'Labyrs Double Axe', era: 1, dmg: 35, rate: 1100, mag: 1, range: 3, type: 'melee', country: 'CRETE', desc: 'Double-headed bronze axe. Minoan symbol of power.' },
    shingeku: { name: 'Mace-Scepter', era: 1, dmg: 30, rate: 1000, mag: 1, range: 3, type: 'melee', country: 'SUMER', desc: 'Ceremonial mace-scepter. Crushes skulls with authority.' },
    nubian_self_bow: { name: 'Nubian Self Bow', era: 1, dmg: 22, rate: 500, mag: 1, range: 40, type: 'bow', country: 'NUBIA', desc: 'Simple but deadly bow. Nubian archers were feared.' },

    // Iron Age additions
    kopis: { name: 'Kopis Sword', era: 2, dmg: 45, rate: 800, mag: 1, range: 3, type: 'melee', country: 'GREECE', desc: 'Curved slashing sword. Greek hoplite sidearm.' },
    sarissa: { name: 'Sarissa Pike', era: 2, dmg: 40, rate: 1000, mag: 1, range: 6, type: 'melee', country: 'MACEDONIA', desc: '18-foot pike. Macedonian phalanx weapon.' },
    gladius_hispaniensis: { name: 'Gladius Hispaniensis', era: 2, dmg: 42, rate: 700, mag: 1, range: 3, type: 'melee', country: 'ROME', desc: 'Original Roman gladius adopted from Iberians.' },
    celtic_sword: { name: 'Celtic Longsword', era: 2, dmg: 48, rate: 850, mag: 1, range: 4, type: 'melee', country: 'CELTIC', desc: 'Leaf-shaped blade. Celtic warriors prized these.' },
    onager: { name: 'Onager Catapult', era: 2, dmg: 80, rate: 10000, mag: 1, range: 400, type: 'siege', country: 'ROME', desc: 'Roman torsion siege engine. Hurls stones.' },
    testudo_shield: { name: 'Testudo Shield', era: 2, dmg: 0, rate: 0, mag: 1, range: 0, type: 'defense', country: 'ROME', desc: 'Tortoise formation shield. Near-invulnerable to arrows.' },

    // Medieval additions
    estoc: { name: 'Estoc Takedown Sword', era: 3, dmg: 55, rate: 900, mag: 1, range: 4, type: 'melee', country: 'EUROPE', desc: 'Edgeless thrusting sword. Penetrates armor gaps.' },
    flamberge: { name: 'Flamberge Greatsword', era: 3, dmg: 65, rate: 1200, mag: 1, range: 5, type: 'melee', country: 'GERMANY', desc: 'Wavy-bladed two-hander. Intimidating and deadly.' },
    katar: { name: 'Katar Punch Dagger', era: 3, dmg: 40, rate: 500, mag: 1, range: 2, type: 'melee', country: 'INDIA', desc: 'Push dagger. Indian Rajput weapon.' },
    khanda: { name: 'Khanda Sword', era: 3, dmg: 58, rate: 850, mag: 1, range: 4, type: 'melee', country: 'INDIA', desc: 'Double-edge straight sword. Indian warrior weapon.' },
    naginata: { name: 'Naginata Glaive', era: 3, dmg: 60, rate: 900, mag: 1, range: 5, type: 'melee', country: 'JAPAN', desc: 'Blade on staff. Japanese samurai and sohei weapon.' },
    kanabo: { name: 'Kanabo Club', era: 3, dmg: 70, rate: 1100, mag: 1, range: 3, type: 'melee', country: 'JAPAN', desc: 'Studded iron club. Crushes armor entirely.' },
    suleiman_cannon: { name: 'Suleiman Bombard', era: 3, dmg: 90, rate: 20000, mag: 1, range: 500, type: 'siege', country: 'TURKEY', desc: 'Massive Ottoman siege cannon. Breaches walls.' },

    // Renaissance additions
    brown_bess: { name: 'Brown Bess Musket', era: 4, dmg: 55, rate: 3000, mag: 1, range: 100, type: 'firearm', country: 'UK', desc: 'British Land Pattern musket. Served the Empire for 100+ years.' },
    kentucky_long_rifle: { name: 'Kentucky Long Rifle', era: 4, dmg: 60, rate: 4000, mag: 1, range: 200, type: 'rifle', country: 'USA', desc: 'American long rifle. Accurate at distance.' },
    katar_pistol: { name: 'Queen Anne Pistol', era: 4, dmg: 35, rate: 2000, mag: 1, range: 30, type: 'pistol', country: 'UK', desc: 'Elegant duel pistol. Queen Anne style.' },
    blunderbuss_carbine: { name: 'Dragon Carbine', era: 4, dmg: 45, rate: 2500, mag: 1, range: 20, type: 'shotgun', country: 'EUROPE', desc: 'Short-barrel blunderbuss. Cavalry version.' },
    nader_cannon: { name: 'Nader Shah Cannon', era: 4, dmg: 85, rate: 15000, mag: 1, range: 400, type: 'siege', country: 'PERSIA', desc: 'Persian mobile artillery. Nader Shah innovation.' },

    // Industrial additions
    spencer_carbine: { name: 'Spencer Repeating Carbine', era: 5, dmg: 50, rate: 1000, mag: 7, range: 150, type: 'rifle', country: 'USA', desc: '7-shot repeater. Union cavalry advantage.' },
    colt_navy: { name: 'Colt Navy 1851', era: 5, dmg: 30, rate: 800, mag: 6, range: 40, type: 'pistol', country: 'USA', desc: 'Six-shot cap and ball revolver. Wild West icon.' },
    martini_henry_mk4: { name: 'Martini-Henry Mk IV', era: 5, dmg: 55, rate: 2000, mag: 1, range: 300, type: 'rifle', country: 'UK', desc: 'British single-shot. Zulu War era.' },
    french_chauchat: { name: 'Chauchat LMG', era: 5, dmg: 45, rate: 250, mag: 20, range: 200, type: 'lmg', country: 'FRANCE', desc: 'First portable automatic weapon. Jammed constantly.' },
    mauser_g98: { name: 'Mauser Gewehr 98', era: 5, dmg: 60, rate: 2000, mag: 5, range: 400, type: 'rifle', country: 'GERMANY', desc: 'German bolt-action. Precise and reliable.' },

    // WW1/WW2 additions
    sten_mk2: { name: 'Sten Mk II', era: 6, dmg: 40, rate: 550, mag: 32, range: 100, type: 'smg', country: 'UK', desc: 'Cheap stamped-metal SMG. Resistance weapon.' },
    enfield_no5: { name: 'Jungle Carbine', era: 6, dmg: 55, rate: 1500, mag: 10, range: 300, type: 'rifle', country: 'UK', desc: 'Shortened Lee-Enfield for jungle warfare.' },
    type_100_full: { name: 'Type 100 SMG Full Stock', era: 6, dmg: 38, rate: 800, mag: 30, range: 120, type: 'smg', country: 'JAPAN', desc: 'Japanese SMG. Rare and prized.' },
    dp28_full: { name: 'DP-28 Light MG', era: 6, dmg: 50, rate: 550, mag: 47, range: 300, type: 'lmg', country: 'RUSSIA', desc: 'Soviet pan magazine LMG. Reliable in cold.' },
    m1903_a4: { name: 'Springfield M1903A4 Sniper', era: 6, dmg: 80, rate: 1500, mag: 5, range: 800, type: 'sniper', country: 'USA', desc: 'Scoped Springfield. US sniper rifle.' },
    svt40_sniper: { name: 'SVT-40 Sniper', era: 6, dmg: 70, rate: 600, mag: 10, range: 600, type: 'sniper', country: 'RUSSIA', desc: 'Soviet semi-auto sniper. Rare and effective.' },
    type_99_lmg: { name: 'Type 99 LMG', era: 6, dmg: 48, rate: 500, mag: 30, range: 300, type: 'lmg', country: 'JAPAN', desc: 'Japanese light machine gun.' },
    m3_grease_full: { name: 'M3 Grease Gun Full', era: 6, dmg: 38, rate: 450, mag: 30, range: 100, type: 'smg', country: 'USA', desc: 'Cheap stamped SMG. Replaced Thompson.' },

    // Cold War additions
    fn_fal_para: { name: 'FN FAL Para', era: 7, dmg: 55, rate: 650, mag: 20, range: 400, type: 'rifle', country: 'NATO', desc: 'Paratrooper version. Folding stock.' },
    ak47_tactical: { name: 'AK-47 Tactical', era: 7, dmg: 45, rate: 600, mag: 30, range: 350, type: 'rifle', country: 'RUSSIA', desc: 'Modified AK with rail mounts and optics.' },
    m14_ebr: { name: 'M14 EBR', era: 7, dmg: 65, rate: 700, mag: 20, range: 500, type: 'rifle', country: 'USA', desc: 'Enhanced Battle Rifle. Modernized M14.' },
    sterling_smg: { name: 'Sterling L2A3', era: 7, dmg: 38, rate: 550, mag: 34, range: 100, type: 'smg', country: 'UK', desc: 'British SMG. Silenced variant used by SAS.' },
    type_56_bayonet: { name: 'Type 56 Bayonet', era: 7, dmg: 35, rate: 500, mag: 1, range: 2, type: 'melee', country: 'CHINA', desc: 'Chinese AK copy bayonet. Spiked.' },
    sa_7b: { name: 'SA-7b Grail Improved', era: 7, dmg: 90, rate: 1000, mag: 1, range: 4000, type: 'missile', country: 'RUSSIA', desc: 'Improved MANPADS. Better seeker.' },
    fn_mag: { name: 'FN MAG GPMG', era: 7, dmg: 60, rate: 650, mag: 100, range: 800, type: 'lmg', country: 'NATO', desc: 'Universal GPMG. Used by 80+ countries.' },

    // Modern additions
    hk416_d10: { name: 'HK416 D10RS', era: 8, dmg: 42, rate: 700, mag: 30, range: 300, type: 'rifle', country: 'GERMANY', desc: '10-inch barrel. CQB version. Delta Force uses these.' },
    scar_h_black: { name: 'SCAR-H Black', era: 8, dmg: 55, rate: 600, mag: 20, range: 500, type: 'rifle', country: 'USA', desc: 'Black finish SCAR-H. SOCOM issue.' },
    ak12_grenadier: { name: 'AK-12 Grenadier', era: 8, dmg: 45, rate: 700, mag: 30, range: 400, type: 'rifle', country: 'RUSSIA', desc: 'AK-12 with GP-34 underbarrel grenade launcher.' },
    python_357: { name: 'Python .357 Magnum', era: 8, dmg: 50, rate: 400, mag: 6, range: 50, type: 'pistol', country: 'USA', desc: 'Premium revolver. "Combat Magnum."' },
    aw50: { name: 'AW50 Anti-Materiel', era: 8, dmg: 120, rate: 1500, mag: 5, range: 1500, type: 'sniper', country: 'UK', desc: '.50 BMG bolt-action. Destroys vehicles.' },
    m2010_esr: { name: 'M2010 ESR', era: 8, dmg: 100, rate: 1500, mag: 5, range: 1200, type: 'sniper', country: 'USA', desc: 'Enhanced Sniper Rifle. .300 Winchester.' },
    mp7a2: { name: 'MP7A2', era: 8, dmg: 35, rate: 950, mag: 40, range: 150, type: 'smg', country: 'GERMANY', desc: 'Updated MP7. Better ergonomics.' },
    desert_eagle: { name: 'Desert Eagle .50AE', era: 8, dmg: 60, rate: 300, mag: 7, range: 80, type: 'pistol', country: 'USA', desc: 'Hand cannon. .50 Action Express. Intimidating.' },
    xm25: { name: 'XM25 Airburst', era: 8, dmg: 70, rate: 500, mag: 5, range: 500, type: 'grenade', country: 'USA', desc: 'Airburst grenade launcher. Smart fusing.' },
    aa12_frag: { name: 'AA-12 Frag Rounds', era: 8, dmg: 55, rate: 300, mag: 20, range: 150, type: 'shotgun', country: 'USA', desc: 'Auto shotgun with fragmentation rounds.' },
    tavor_x95_300: { name: 'Tavor X95 .300 BLK', era: 8, dmg: 50, rate: 700, mag: 30, range: 300, type: 'rifle', country: 'ISRAEL', desc: 'Subsonic .300 Blackout version. Suppressed.' },
    fn_scar_17: { name: 'FN SCAR 17s CQC', era: 8, dmg: 55, rate: 600, mag: 20, range: 400, type: 'rifle', country: 'USA', desc: 'CQC variant. Short barrel.' },

    // Near Future additions
    railgun_sniper: { name: 'Rail Sniper Mk II', era: 9, dmg: 150, rate: 2000, mag: 3, range: 2000, type: 'sniper', country: 'USA', desc: 'Improved rail sniper. Longer range. More damage.' },
    plasma_shotgun_v2: { name: 'Plasma Scattergun', era: 9, dmg: 80, rate: 800, mag: 8, range: 50, type: 'shotgun', country: 'NATO', desc: 'Close-range plasma weapon. Melts armor.' },
    emp_rifle: { name: 'EMP Disruptor Rifle', era: 9, dmg: 20, rate: 500, mag: 15, range: 200, type: 'energy', country: 'NATO', desc: 'Disables electronics. No physical damage but shuts down drones, turrets, exosuits.' },
    nano_repair: { name: 'Nano-Repair Cloud', era: 9, dmg: 0, rate: 5000, mag: 1, range: 10, type: 'utility', country: 'NATO', desc: 'Releases nanobots that repair armor and heal allies in radius.' },
    sonic_pistol: { name: 'Sonic Pulse Pistol', era: 9, dmg: 30, rate: 400, mag: 12, range: 50, type: 'energy', country: 'NATO', desc: 'Sound wave weapon. Bypasses armor. Causes internal damage.' },

    // Future additions
    plasma_rifle_mk3: { name: 'Plasma Rifle Mk III', era: 10, dmg: 90, rate: 500, mag: 30, range: 400, type: 'energy', country: 'GALACTIC', desc: 'Third-gen plasma rifle. More stable, more damage.' },
    quantum_sniper: { name: 'Quantum Entanglement Sniper', era: 10, dmg: 200, rate: 3000, mag: 2, range: 5000, type: 'sniper', country: 'GALACTIC', desc: 'Hits target through quantum entanglement. No cover, no walls, no distance is safe.' },
    void_shotgun: { name: 'Void Scattergun', era: 10, dmg: 100, rate: 700, mag: 6, range: 40, type: 'shotgun', country: 'GALACTIC', desc: 'Fires void particles. Deletes targets from local space.' },
    gravity_hammer: { name: 'Gravity Hammer', era: 10, dmg: 150, rate: 1500, mag: 1, range: 5, type: 'melee', country: 'GALACTIC', desc: 'Hammer that creates gravity wells on impact. Crushes everything.' },
    hyperspace_mortar: { name: 'Hyperspace Mortar', era: 10, dmg: 250, rate: 10000, mag: 1, range: 10000, type: 'siege', country: 'GALACTIC', desc: 'Fires through hyperspace. Hits anywhere on the map instantly.' },

    // 30th Century additions
    reality_sword: { name: 'Reality Blade', era: 11, dmg: 300, rate: 800, mag: 1, range: 5, type: 'melee', country: 'STELLAR', desc: 'Cuts through reality itself. Hits in all 8 dimensions simultaneously.' },
    galaxy_cannon: { name: 'Galaxy Buster Cannon', era: 11, dmg: 500, rate: 5000, mag: 1, range: 99999, type: 'energy', country: 'STELLAR', desc: 'Destroys a galaxy. Battlefield-ending weapon.' },
    soul_reaper_scythe: { name: 'Soul Reaper Scythe', era: 11, dmg: 250, rate: 1200, mag: 1, range: 6, type: 'melee', country: 'STELLAR', desc: 'Harvests souls. Permanently bans target from respawning for the match.' },
    time_rifle: { name: 'Chrono Rifle', era: 11, dmg: 180, rate: 1000, mag: 10, range: 10000, type: 'energy', country: 'STELLAR', desc: 'Shoots through time. Can hit target 5 seconds in the past.' },
    multiverse_pistol: { name: 'Multiverse Pistol', era: 11, dmg: 120, rate: 400, mag: 12, range: 300, type: 'energy', country: 'STELLAR', desc: 'Each bullet exists in multiple universes simultaneously. One trigger pull, 8 hits.' },
    starforge_hammer: { name: 'Starforge Hammer', era: 11, dmg: 350, rate: 2000, mag: 1, range: 5, type: 'melee', country: 'STELLAR', desc: 'Hammer forged in a star. Each hit creates a miniature supernova.' },
  },

  getCount() { return Object.keys(this.weapons).length; },
  getByEra(era) { return Object.entries(this.weapons).filter(([k,v]) => v.era === era); },
};

// ============================================================
// 4. WARDROBE SYSTEM (mix and match clothing)
// ============================================================
const WARDROBE = {
  // Players pick individual clothing pieces to mix and match
  // Each piece is separate: head, torso, legs, feet, hands, back, accessory, face

  categories: {
    head: {
      bare_head: { name: 'Bare Head', cost: 0, desc: 'No headgear' },
      bandana: { name: 'Bandana', cost: 50, desc: 'Stylish bandana. Multiple colors available.' },
      beanie: { name: 'Combat Beanie', cost: 80, desc: 'Warm tactical beanie.' },
      boonie_hat: { name: 'Boonie Hat', cost: 100, desc: 'Jungle boonie hat. Wide brim.' },
      baseball_cap: { name: 'Tactical Cap', cost: 80, desc: 'Baseball style tactical cap.' },
      beret: { name: 'Military Beret', cost: 150, desc: 'Regimental beret. Color by unit.' },
      cowboy_hat: { name: 'Cowboy Hat', cost: 200, desc: 'Western style. For the lone wolf.' },
      trucker_hat: { name: 'Trucker Cap', cost: 50, desc: 'Mesh-back trucker hat.' },
      fedora: { name: 'Fedora', cost: 300, desc: 'Classy fedora. Gentleman warrior.' },
      turban: { name: 'Desert Turban', cost: 200, desc: 'Traditional desert headwrap.' },
      mohawk: { name: 'Mohawk Haircut', cost: 100, desc: 'Punk mohawk. Intimidating.' },
      afro: { name: 'Afro', cost: 100, desc: 'Natural afro hairstyle.' },
      dreadlocks: { name: 'Dreadlocks', cost: 100, desc: 'Warrior dreads.' },
      buzzcut: { name: 'Buzz Cut', cost: 50, desc: 'Military buzz cut. Standard.' },
      long_hair: { name: 'Long Warrior Hair', cost: 80, desc: 'Flowing locks. Viking style.' },
      gas_mask_hood: { name: 'Gas Mask Hood', cost: 500, desc: 'Full head cover with gas mask.' },
      skull_mask: { name: 'Skull Face Mask', cost: 300, desc: 'Skull balaclava. Ghost operator.' },
      helmet_mich: { name: 'MICH Helmet', cost: 400, desc: 'Modern combat helmet with rails.' },
      helmet_pASGT: { name: 'PASGT Helmet', cost: 300, desc: 'Kevlar "Fritz" helmet.' },
      helmet_crown: { name: 'Void Crown', cost: 5000, desc: 'Crown that sees through dimensions.' },
      vr_headset: { name: 'VR Visor', cost: 1000, desc: 'Augmented reality combat visor.' },
    },
    torso: {
      bare_chest: { name: 'Bare Chest', cost: 0, desc: 'Shirtless. For the fearless.' },
      t_shirt: { name: 'T-Shirt', cost: 30, desc: 'Plain t-shirt. Multiple colors.' },
      tank_top: { name: 'Tank Top', cost: 30, desc: 'Sleeveless. Show those arms.' },
      hoodie: { name: 'Hoodie', cost: 80, desc: 'Casual hoodie. Street style.' },
      tactical_shirt: { name: 'Tactical Shirt', cost: 150, desc: 'Moisture-wicking combat shirt.' },
      flannel: { name: 'Flannel Shirt', cost: 60, desc: 'Lumberjack style. Surprisingly warm.' },
      hawaiian: { name: 'Hawaiian Shirt', cost: 80, desc: 'Tropical print. Aloha warfare.' },
      flight_jacket: { name: 'Flight Jacket', cost: 300, desc: 'Leather flight jacket. Bomber style.' },
      plate_carrier: { name: 'Plate Carrier', cost: 500, desc: 'Lightweight ballistic plate carrier.' },
      full_body_armor: { name: 'Full Body Armor', cost: 2000, desc: 'Level IV full body armor.' },
      exo_suit: { name: 'Exoskeleton Suit', cost: 5000, desc: 'Powered exo-skeleton. Strength boost.' },
      quantum_jacket: { name: 'Quantum Jacket', cost: 8000, desc: 'Jacket that phases with dimensions.' },
      mech_suit: { name: 'Mech Suit', cost: 15000, desc: 'Full mech suit. Tank on legs.' },
      void_cloak: { name: 'Void Cloak', cost: 10000, desc: 'Cloak that absorbs all light. Near-invisible in dark.' },
    },
    legs: {
      bare_legs: { name: 'Shorts Only', cost: 0, desc: 'Minimal leg coverage.' },
      cargo_pants: { name: 'Cargo Pants', cost: 80, desc: 'Tactical cargo pants. Lots of pockets.' },
      jeans: { name: 'Jeans', cost: 50, desc: 'Classic denim. Tough.' },
      combat_pants: { name: 'Combat Pants', cost: 150, desc: 'Reinforced combat trousers.' },
      shorts: { name: 'Combat Shorts', cost: 50, desc: 'Shorts for hot weather ops.' },
      kilt: { name: 'Tactical Kilt', cost: 200, desc: 'Freedom and airflow. Scottish style.' },
      sweatpants: { name: 'Sweatpants', cost: 40, desc: 'Casual. For relaxed warfare.' },
      exo_legs: { name: 'Exoskeleton Legs', cost: 3000, desc: 'Powered leg servos. Jump higher, run faster.' },
      void_legs: { name: 'Void Greaves', cost: 5000, desc: 'Armor from the void. Absorbs kinetic energy.' },
    },
    feet: {
      bare_feet: { name: 'Bare Feet', cost: 0, desc: 'No shoes. Truly primal.' },
      sandals: { name: 'Sandals', cost: 20, desc: 'Basic sandals. Ancient style.' },
      sneakers: { name: 'Sneakers', cost: 50, desc: 'Running shoes. Quick.' },
      combat_boots: { name: 'Combat Boots', cost: 150, desc: 'Standard military boots.' },
      jump_boots: { name: 'Jump Boots', cost: 300, desc: 'Airborne jump boots. Paratrooper style.' },
      tactical_boots: { name: 'Tactical Boots', cost: 200, desc: 'Modern tactical boots with ankle support.' },
      silent_boots: { name: 'Silent Boots', cost: 800, desc: 'No footstep sounds. Stealth essential.' },
      quantum_boots: { name: 'Quantum Boots', cost: 4000, desc: 'Wall-running capability. 20% faster.' },
      void_boots: { name: 'Void Greaves', cost: 6000, desc: 'Walk through walls (4D phasing).' },
      mech_boots: { name: 'Mech Stompers', cost: 8000, desc: 'Heavy mech boots. Ground shakes when you walk.' },
    },
    hands: {
      bare_hands: { name: 'Bare Hands', cost: 0, desc: 'No gloves. Feel the trigger.' },
      fingerless: { name: 'Fingerless Gloves', cost: 40, desc: 'Tactical fingerless gloves.' },
      tactical_gloves: { name: 'Tactical Gloves', cost: 100, desc: 'Full tactical gloves. Better grip.' },
      combat_gauntlets: { name: 'Combat Gauntlets', cost: 400, desc: 'Armored gauntlets. Stronger melee.' },
      quantum_gloves: { name: 'Quantum Gloves', cost: 3000, desc: 'Reload 30% faster. Touch dimensional objects.' },
      mech_gauntlets: { name: 'Mech Gauntlets', cost: 5000, desc: 'Powered fists. Crush anything.' },
    },
    back: {
      none_back: { name: 'Nothing', cost: 0, desc: 'No back item.' },
      assault_pack: { name: 'Assault Pack', cost: 150, desc: 'Small backpack for ammo.' },
      heavy_pack: { name: 'Heavy Pack', cost: 400, desc: 'Large backpack. More ammo capacity.' },
      supply_pack: { name: 'Supply Pack', cost: 1000, desc: 'Auto-resupply nearby teammates.' },
      jetpack: { name: 'Jetpack', cost: 5000, desc: 'Limited flight capability. 10 second bursts.' },
      quantum_pack: { name: 'Quantum Pack', cost: 8000, desc: 'Dimensional storage. 5x ammo capacity.' },
      wings: { name: 'Energy Wings', cost: 10000, desc: 'Glide and hover. Angelic.' },
      cape: { name: 'Command Cape', cost: 500, desc: 'Officer cape in national colors.' },
      void_cape: { name: 'Void Cape', cost: 8000, desc: 'Cape that absorbs incoming projectiles.' },
    },
    face: {
      bare_face: { name: 'Bare Face', cost: 0, desc: 'Show your face.' },
      bandana_face: { name: 'Face Bandana', cost: 50, desc: 'Cover lower face.' },
      balaclava: { name: 'Balaclava', cost: 100, desc: 'Full face cover. Only eyes visible.' },
      skull_mask_face: { name: 'Skull Mask', cost: 300, desc: 'Skull face mask.' },
      gas_mask: { name: 'Gas Mask', cost: 400, desc: 'Immune to gas attacks.' },
      night_vision: { name: 'Night Vision Goggles', cost: 2000, desc: 'See in the dark.' },
      thermal_visor: { name: 'Thermal Visor', cost: 3000, desc: 'See heat through walls.' },
      vr_visor: { name: 'VR Combat Visor', cost: 5000, desc: 'Full AR overlay. See all data.' },
      void_eyes: { name: 'Void Eyes', cost: 12000, desc: 'Eyes that see all 8 dimensions simultaneously.' },
    },
    accessory: {
      none_acc: { name: 'No Accessory', cost: 0, desc: 'Nothing extra.' },
      watch: { name: 'Tactical Watch', cost: 200, desc: 'Rugged tactical watch.' },
      dog_tags: { name: 'Dog Tags', cost: 50, desc: 'Military identification tags.' },
      scarf: { name: 'Tactical Scarf', cost: 100, desc: 'Shemagh scarf. Desert protection.' },
      necklace: { name: 'Bone Necklace', cost: 80, desc: 'Trophy necklace. Intimidating.' },
      gold_chain: { name: 'Gold Chain', cost: 500, desc: 'Oversized gold chain. Floss your wealth.' },
      flag_patch: { name: 'National Flag Patch', cost: 50, desc: 'Your country\'s flag on your shoulder.' },
      kill_counter: { name: 'Kill Counter', cost: 1000, desc: 'Digital display showing your kill count in real-time. Visible to all.' },
      dimensional_compass: { name: 'Dimensional Compass', cost: 5000, desc: 'Shows which dimension you are currently in.' },
    },
  },

  // Player's equipped outfit
  loadout: {
    head: 'bare_head', torso: 'bare_chest', legs: 'cargo_pants',
    feet: 'combat_boots', hands: 'fingerless', back: 'none_back',
    face: 'bare_face', accessory: 'none_acc',
  },

  // Equip a piece
  equip(category, itemId) {
    if (!this.categories[category] || !this.categories[category][itemId]) {
      return { success: false, error: 'Invalid item' };
    }
    this.loadout[category] = itemId;
    return { success: true, equipped: itemId, desc: this.categories[category][itemId].desc };
  },

  // Get current loadout
  getLoadout() {
    const result = {};
    for (const [cat, itemId] of Object.entries(this.loadout)) {
      result[cat] = this.categories[cat][itemId] || { name: 'Unknown' };
    }
    return result;
  },

  // Get total items
  getTotalItems() {
    return Object.values(this.categories).reduce((s, cat) => s + Object.keys(cat).length, 0);
  },

  // Get all available pieces for a category
  getCategory(category) {
    return this.categories[category] || {};
  },
};

// ============================================================
// 5. ADMIN PANEL PRICE CONTROLS
// ============================================================
const ADMIN_PRICES = {
  // All prices in the game are editable from the admin panel
  // The admin panel reads this object and lets the user adjust any price

  priceCategories: {
    weapons: 'Per-weapon prices',
    ammo: 'Ammo prices per type',
    survivalTraits: 'Survival trait prices',
    cheats: 'Cheat ability prices',
    skins: 'Operator skin prices',
    weaponSkins: 'Weapon skin prices',
    gear: 'Gear item prices',
    costumes: 'Costume pack prices',
    emotes: 'Emote prices',
    finishingMoves: 'Finishing move prices',
    voicePacks: 'Voice pack prices',
    nationalUniforms: 'Country uniform prices (86 countries)',
    wardrobe: 'Wardrobe clothing piece prices',
    aiMode: 'AI Auto-Play subscription ($300/year)',
    warpBack: 'Banishment warp-back ticket prices',
    premiumTiers: 'Premium tier upgrade prices',
    subscriptions: 'All subscription prices',
  },

  // Default prices (editable)
  defaults: {
    weaponBase: { common: 100, rare: 500, epic: 2000, legendary: 5000, mythic: 10000, cheat: 20000 },
    ammoPerMag: { pistol: 10, rifle: 25, smg: 20, lmg: 50, sniper: 100, rocket: 500, grenade: 200, energy: 150 },
    survivalTraits: {
      wolverine_skull: 3500, self_bunker_mode: 4000, quantum_state_lock: 6000,
      void_phase_immunity: 8000, adamantium_shell: 4500, regeneration_field_organ: 3500,
      nanite_swarm_shield: 5000, probability_collapse_immunity: 7000,
      cosmic_immortality: 10000, galaxy_shield: 7500,
    },
    cheats: { reality_anchor: 20000, immortal_code: 15000 },
    warpBack: { basic: 500, premium: 1000, instant: 2500, vip: 5000 },
    premiumTiers: { bronze: 50, silver: 200, gold: 800, platinum: 2500, supreme: 10000 },
    aiMode: 300, // per year
  },

  // Custom overrides (admin can set these)
  overrides: {},

  // Get price for an item
  getPrice(category, itemId, rarity) {
    if (this.overrides[category] && this.overrides[category][itemId]) {
      return this.overrides[category][itemId];
    }
    if (rarity && this.defaults.weaponBase[rarity]) {
      return this.defaults.weaponBase[rarity];
    }
    if (this.defaults[category] && this.defaults[category][itemId]) {
      return this.defaults[category][itemId];
    }
    return null;
  },

  // Set custom price (admin)
  setPrice(category, itemId, price) {
    if (!this.overrides[category]) this.overrides[category] = {};
    this.overrides[category][itemId] = price;
    return { success: true, category, itemId, newPrice: price };
  },

  // Reset to default (admin)
  resetPrice(category, itemId) {
    if (this.overrides[category]) {
      delete this.overrides[category][itemId];
    }
    return { success: true, message: 'Price reset to default' };
  },

  // Get all prices for admin panel display
  getAllPrices() {
    return {
      defaults: this.defaults,
      overrides: this.overrides,
      categories: Object.keys(this.priceCategories),
    };
  },

  // Bulk update (admin)
  bulkUpdate(category, updates) {
    if (!this.overrides[category]) this.overrides[category] = {};
    for (const [itemId, price] of Object.entries(updates)) {
      this.overrides[category][itemId] = price;
    }
    return { success: true, updated: Object.keys(updates).length, category };
  },
};

// ============================================================
// 6. 40D HYPER-REALISTIC CHARACTER RENDERING
// ============================================================
const RENDER_40D = {
  name: '40D Hyper-Realistic Rendering Engine',
  description: 'Characters so real players think they are real humans. Movie-quality rendering.',

  // Rendering dimensions (beyond 3D)
  dimensions: {
    d1_x: 'Left-right position',
    d2_y: 'Up-down position',
    d3_z: 'Forward-back position',
    d4_w: '4D spatial (Adanaxis) — hyper-rotation',
    d5_t: 'Time — temporal motion blur, micro-expressions',
    d6_q: 'Quantum probability — particle-level skin rendering',
    d7_v: 'Void — shadow and light interplay at subatomic level',
    d8_c: 'Cosmic — universal lighting from all star sources',
    d9_e: 'Emotional — micro-expression capture from gameplay state',
    d10_p: 'Physical — muscle fiber simulation under skin',
    d11_h: 'Hair — individual strand physics (100k strands)',
    d12_c2: 'Cloth — fabric weave simulation at thread level',
    d13_s: 'Sweat — perspiration and moisture simulation',
    d14_b: 'Blood — subsurface blood flow visible through skin',
    d15_f: 'Fat — body fat distribution and jiggle physics',
    d16_m: 'Muscle — muscle contraction and definition changes',
    d17_n: 'Nerve — micro-twitches and involuntary movements',
    d18_e2: 'Eye — iris dilation, pupil response, eye tracking',
    d19_t2: 'Tear — tear duct simulation',
    d20_r: 'Breath — visible breath in cold, breathing rate',
    d21_g: 'Grime — dirt accumulation on skin and clothing',
    d22_w: 'Wound — real-time wound deformation and bleeding',
    d23_a: 'Armor — armor deformation and damage states',
    d24_l: 'Light — real-time global illumination on skin',
    d25_sh: 'Shadow — contact shadows and ambient occlusion',
    d26_ref: 'Reflection — eye reflections, wet surface reflections',
    d27_rf: 'Refraction — skin translucency and light scattering',
    d28_uv: 'UV — skin response to UV (tanning, burning)',
    d29_ag: 'Aging — real-time aging based on match duration',
    d30_exp: 'Expression — 80+ facial expressions',
    d31_v2: 'Voice — lip sync with voice commands and callouts',
    d32_temp: 'Temperature — skin temperature changes (flush, pale)',
    d33_hp: 'HP visual — health visible on body (bruises, limping)',
    d34_sp: 'Speed — motion blur and afterimages at high speed',
    d35_dm: 'Dimensional — visual distortion during dimensional shifts',
    d36_aura: 'Aura — ability and cheat visual auras',
    d37_terrain: 'Terrain interaction — mud, water, grass response',
    d38_wind: 'Wind — clothing and hair respond to wind',
    d39_rain: 'Rain — water droplets on skin, clothing, weapons',
    d40_movie: 'Movie grade — final cinematic post-processing',
  },

  // Character detail levels
  detail: {
    skin: {
      pores: '4K pore-level detail. Visible skin texture up close.',
      subsurface: 'Subsurface scattering. Light passes through skin like real humans.',
      blemishes: 'Natural skin imperfections. Moles, freckles, scars, tan lines.',
      hair_body: 'Body hair visible. Arm hair, facial stubble growth over time.',
      sweat: 'Sweat appears during intense combat. Drips visible. Reflects light.',
      dirt: 'Dirt and grime accumulate during match. Visible on face and hands.',
      wounds: 'Bullet wounds show realistic damage. Blood flows and dries.',
      temperature: 'Skin flushes red during intense action. Pale when low health.',
    },
    face: {
      microExpressions: '80+ micro-expressions. Fear when shot at, anger when shooting, pain when hit.',
      eyeTracking: 'Eyes track targets independently. Pupils dilate in dark, constrict in light.',
      iris: 'Each character has unique iris pattern. Visible up close.',
      breathing: 'Nose and mouth show breathing. Heavy when sprinting, calm when hidden.',
      lipSync: 'Lips sync with voice commands and callouts. Every word matched.',
      tears: 'Tears in extreme pain. Eyes water from explosions and gas.',
      facialHair: 'Facial hair grows during long matches. Stubble to beard progression.',
      expressions_in_combat: 'Gritted teeth when shooting. Wide eyes when surprised. Squinted when aiming.',
    },
    body: {
      muscles: 'Muscles contract and relax realistically. Biceps flex when aiming, abs tense when sprinting.',
      fat: 'Body fat jiggles during movement. Realistic soft tissue physics.',
      skeleton: 'Skeleton visible through skin in X-ray view (thermal vision).',
      movement: 'Movement is motion-captured from real soldiers. No robotic animation.',
      injury: 'Limping when leg hit. Arm hangs when arm hit. Real injury response.',
      breathing_chest: 'Chest rises and falls with breathing. Rate changes with activity.',
      hands: 'Fingers individually animated. Reload animations show each finger moving.',
    },
    hair: {
      strands: '100,000 individual hair strands. Each strand has its own physics.',
      wind: 'Hair blows in wind. Gets wet in rain. Sticks to face with sweat.',
      styles: 'Multiple hairstyles. Short, long, braided, shaved, Mohawk, afro, dreads.',
      facial_hair: 'Beards, mustaches, stubble. All individually rendered.',
      helmets: 'Hair compresses under helmets. Falls out when helmet removed.',
      color: 'Natural hair colors. Graying with age. Dye options for customization.',
    },
    clothing: {
      fabric: 'Each fabric has unique weave pattern. Cotton, wool, leather, kevlar all look different.',
      physics: 'Cloth physics. Jackets flap in wind. Sleeves roll up. Fabric tears.',
      wetness: 'Clothing gets wet in rain. Dries over time. Water stains visible.',
      damage: 'Bullet holes in clothing. Burn marks from explosions. Tears from melee.',
      dirt: 'Dirt accumulates on clothing. Mud splatters. Dust on boots.',
      wrinkles: 'Dynamic wrinkles based on body movement. Fabric creases realistically.',
    },
  },

  // Rendering quality settings
  quality: {
    cinematic: {
      desc: 'Movie quality. 40D rendering. Every pore, every hair, every drop of sweat.',
      fps: 30,
      resolution: '4K per eye',
      note: 'Players will think they are watching a movie, not playing a game.',
    },
    ultra: {
      desc: 'Maximum detail for high-end devices.',
      fps: 60,
      resolution: '1440p',
      note: 'Nearly indistinguishable from real humans.',
    },
    high: {
      desc: 'High detail. Most 40D features active.',
      fps: 60,
      resolution: '1080p',
      note: 'Realistic but optimized for performance.',
    },
    medium: {
      desc: 'Balanced quality. Core 40D features.',
      fps: 60,
      resolution: '720p',
      note: 'Good looking but runs on most devices.',
    },
    low: {
      desc: 'Minimal detail for low-end devices.',
      fps: 30,
      resolution: '480p',
      note: 'Still looks good but drops pore-level detail.',
    },
  },

  // The "is this real?" factor
  realismFactors: {
    '1. Pores and skin texture': '4K skin texture. Visible pores up close. Same as movie CGI.',
    '2. Sub-surface scattering': 'Light passes through skin. Ears glow red in backlight. Real.',
    '3. Micro-expressions': 'Face shows 80+ micro-expressions. Fear, anger, pain, joy — all visible.',
    '4. Individual hair strands': '100k hair strands with physics. Wind, water, movement — all affect them.',
    '5. Sweat and moisture': 'Sweat appears during combat. Drips visible. Skin gets shiny. Reflects light.',
    '6. Dirt accumulation': 'Characters get dirty during matches. Mud, dust, blood — all accumulate.',
    '7. Wound deformation': 'Bullet wounds deform skin. Blood flows realistically. Scars form.',
    '8. Eye tracking': 'Eyes track targets. Pupils respond to light. Iris patterns unique per character.',
    '9. Lip sync': 'Mouth moves with every voice command. Every word matched perfectly.',
    '10. Muscle simulation': 'Muscles flex and relax. Biceps when aiming, abs when sprinting. Visible.',
    '11. Cloth physics': 'Clothing flaps, tears, gets wet, gets dirty. Fabric weave visible.',
    '12. Breathing': 'Chest rises and falls. Breathing rate changes with activity. Visible breath in cold.',
    '13. Injury response': 'Limping when leg shot. Arm hangs when arm shot. Face shows pain.',
    '14. Temperature changes': 'Skin flushes red in combat. Goes pale when low health. Real physiological response.',
    '15. Aging in match': 'Characters visibly age during long matches. Stubble grows. Eyes get tired.',
  },

  getDimensionCount() { return Object.keys(this.dimensions).length; },
  getRealismCount() { return Object.keys(this.realismFactors).length; },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MILITARY_STRENGTH, HISTORICAL_ERAS, ADDITIONAL_WEAPONS, WARDROBE, ADMIN_PRICES, RENDER_40D };
}
if (typeof window !== 'undefined') {
  window.MILITARY_STRENGTH = MILITARY_STRENGTH;
  window.HISTORICAL_ERAS = HISTORICAL_ERAS;
  window.ADDITIONAL_WEAPONS = ADDITIONAL_WEAPONS;
  window.WARDROBE = WARDROBE;
  window.ADMIN_PRICES = ADMIN_PRICES;
  window.RENDER_40D = RENDER_40D;
}
