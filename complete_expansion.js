/**
 * OMEGA-8D COMPLETE EXPANSION PACK
 * 1. ALL 262 weapon voice commands (auto-generated)
 * 2. Skins, cosmetics, costumes, gear customization system
 * 3. Controller-to-game input bridge (connects all inputs to game actions)
 * 4. AI spectate mode + AI difficulty scaling
 * 5. Merged unified voice system
 */

// ============================================================
// 1. ALL 262 WEAPON VOICE COMMANDS (auto-generated from weapon DB)
// ============================================================
const WEAPON_VOICE = {
  commands: {},

  // Auto-generate voice commands for every weapon
  generate(ed) {
    const wdb = ed.WEAPON_DB_EXPANDED;
    if (!wdb) return;

    for (const [weaponId, weaponData] of Object.entries(wdb)) {
      // Get the weapon name
      const name = weaponData.name || weaponData.Name || weaponId.replace(/_/g, ' ');
      const voicePhrase = 'equip ' + name.toLowerCase().replace(/[^a-z0-9 ]/g, '');

      this.commands[voicePhrase] = {
        action: 'equip_weapon_' + weaponId,
        desc: 'Equip ' + name,
        weaponId: weaponId,
      };

      // Also add "buy" command for each weapon
      const buyPhrase = 'buy ' + name.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      this.commands[buyPhrase] = {
        action: 'buy_weapon_' + weaponId,
        desc: 'Buy ' + name,
        weaponId: weaponId,
      };
    }

    return Object.keys(this.commands).length;
  },

  getCount() {
    return Object.keys(this.commands).length;
  },
};

// ============================================================
// 2. SKINS, COSMETICS, COSTUMES & GEAR CUSTOMIZATION
// ============================================================
const CUSTOMIZATION = {
  name: 'OMEGA-8D Customization System',

  // SKIN TYPES
  skinCategories: {
    operator_skins: 'Character appearance skins',
    weapon_skins: 'Weapon cosmetic finishes',
    vehicle_skins: 'Vehicle paint jobs',
    drone_skins: 'Drone/companion cosmetics',
    effects: 'Visual effects and auras',
    banners: 'Profile banners and calling cards',
    emotes: 'In-game emotes and gestures',
    finishing_moves: 'Custom execution animations',
  },

  // OPERATOR SKINS (character costumes)
  operatorSkins: {
    // Default skins (free)
    standard_military: { name: 'Standard Military', rarity: 'common', cost: 0, desc: 'Standard issue military fatigues. Clean and functional.' },
    desert_camo: { name: 'Desert Camo', rarity: 'common', cost: 100, desc: 'Desert camouflage fatigues. Sand-colored.' },
    jungle_camo: { name: 'Jungle Camo', rarity: 'common', cost: 100, desc: 'Jungle camouflage fatigues. Green and brown.' },
    urban_camo: { name: 'Urban Camo', rarity: 'common', cost: 100, desc: 'Urban camouflage fatigues. Grey and black.' },
    arctic_camo: { name: 'Arctic Camo', rarity: 'common', cost: 100, desc: 'Arctic camouflage fatigues. White and grey.' },
    night_ops: { name: 'Night Ops', rarity: 'rare', cost: 500, desc: 'Black tactical gear. No reflective surfaces. For night operations.' },

    // Rare skins
    gold_elite: { name: 'Gold Elite', rarity: 'rare', cost: 1000, desc: 'Gold-trimmed tactical gear. Signifies elite status.' },
    crimson_specter: { name: 'Crimson Specter', rarity: 'rare', cost: 1500, desc: 'Blood-red armor with ghost pattern. Intimidating.' },
    void_walker_skin: { name: 'Void Walker', rarity: 'epic', cost: 3000, desc: 'Armor infused with void energy. Purple-black with glowing veins. Phases slightly in and out of reality.' },
    quantum_glitch: { name: 'Quantum Glitch', rarity: 'epic', cost: 4000, desc: 'Skin glitches between dimensions. Flickers between 3D and 4D appearance. Enemies see afterimages.' },
    cosmic_titan: { name: 'Cosmic Titan', rarity: 'legendary', cost: 8000, desc: 'Armor made from compressed star matter. Glows with galaxy patterns. Stars move across the surface.' },
    inferno_lord: { name: 'Inferno Lord', rarity: 'legendary', cost: 7000, desc: 'Molten armor. Embers fall from shoulders. Heat distortion visible around player.' },
    frost_king: { name: 'Frost King', rarity: 'legendary', cost: 7000, desc: 'Ice-crystal armor. Frozen mist emanates. Ground freezes under your feet.' },
    storm_bringer: { name: 'Storm Bringer', rarity: 'legendary', cost: 7500, desc: 'Lightning-crack armor. Static electricity visible. Small lightning arcs between armor plates.' },

    // Mythic skins
    doomsday_survivor: { name: 'Doomsday Survivor', rarity: 'mythic', cost: 15000, desc: 'Scorched, battle-worn armor that survived M.A.D. Cracks glow with residual radiation. Earned only by surviving doomsday outside a bunker.' },
    the_undying_skin: { name: 'The Undying', rarity: 'mythic', cost: 20000, desc: 'Golden aura surrounds the operator. Cannot be mistaken for anyone else. Earned by winning a match during M.A.D. while outside the bunker.' },
    reality_anchor_skin: { name: 'Reality Anchor', rarity: 'mythic', cost: 25000, desc: 'Golden chains visible around the operator\'s body. Reality bends visibly around them. For those who own the Reality Anchor cheat.' },
    immortal_code_skin: { name: 'Immortal Code', rarity: 'mythic', cost: 30000, desc: 'Green Matrix-style code rains around the operator. Their body periodically dissolves into code and reforms. For Immortal Code owners.' },
    wolverine_form: { name: 'Wolverine Form', rarity: 'mythic', cost: 18000, desc: 'Visible bone structure through translucent skin. Regeneration visible to all. Wounds heal in real-time on the skin. For Wolverine Skull owners.' },
    void_phantom: { name: 'Void Phantom', rarity: 'mythic', cost: 22000, desc: 'Operator is semi-transparent with purple void outline. Phases in and out of visibility. For Void Phase owners.' },

    // Cheat skins (for $15k-$20k cheat owners)
    kernel_avatar: { name: 'Kernel Avatar', rarity: 'cheat', cost: 35000, desc: 'The operator\'s body is made of server code. Green binary streams replace flesh. The most exclusive skin in the game. For Immortal Code owners only.' },
    reality_constant: { name: 'The Constant', rarity: 'cheat', cost: 40000, desc: 'The operator does not move. The world moves around them. The most disorienting skin ever designed. For Reality Anchor owners only.' },

    // National skins (per country)
    nigeria_elite: { name: 'Nigerian Elite Guard', rarity: 'epic', cost: 2000, desc: 'Nigerian special forces uniform. Green and white with national emblem.' },
    usa_ranger: { name: 'US Army Ranger', rarity: 'epic', cost: 2000, desc: 'US Army Ranger loadout. Tan and olive with US flag patch.' },
    russian_spetsnaz: { name: 'Russian Spetsnaz', rarity: 'epic', cost: 2000, desc: 'Russian Spetsnaz gear. Digital flora camo with Russian flag.' },
    israeli_sayeret: { name: 'Israeli Sayeret Matkal', rarity: 'epic', cost: 2000, desc: 'Israeli special forces uniform. Olive drab with Hebrew text.' },
    british_sas: { name: 'British SAS', rarity: 'epic', cost: 2000, desc: 'British SAS black kit. No insignia. Anonymous.' },
    japanese_sof: { name: 'Japanese SOF', rarity: 'epic', cost: 2000, desc: 'Japanese Special Operations Forces. Type 4 combat uniform.' },
    indian_parasf: { name: 'Indian Para SF', rarity: 'epic', cost: 2000, desc: 'Indian Parachute Special Forces. Maroon beret and combat loadout.' },
    french_cos: { name: 'French COS', rarity: 'epic', cost: 2000, desc: 'French Commandement des Opérations Spéciales. Multi-camo with French insignia.' },
    german_ksk: { name: 'German KSK', rarity: 'epic', cost: 2000, desc: 'German Kommando Spezialkräfte. Flecktarn camo with German flag.' },
    south_korean_sfb: { name: 'South Korean SFB', rarity: 'epic', cost: 2000, desc: 'South Korean Special Forces Brigade. Digital tiger stripe camo.' },
    afghan_commando: { name: 'Afghan Commando', rarity: 'epic', cost: 2000, desc: 'Afghan National Army Commando uniform. Woodland camo.' },
    chinese_sof: { name: 'Chinese SOF', rarity: 'epic', cost: 2000, desc: 'Chinese Special Operations Forces. Type 07 desert camo.' },

    // Fun skins
    chef: { name: 'The Chef', rarity: 'rare', cost: 800, desc: 'Full chef outfit with apron and toque. Because war is a recipe.' },
    clown: { name: 'The Clown', rarity: 'rare', cost: 800, desc: 'Full clown makeup and outfit. Terrifying in night vision.' },
    businessman: { name: 'The Businessman', rarity: 'rare', cost: 800, desc: 'Suit and tie with tactical vest. The corporate approach to warfare.' },
    zombie: { name: 'The Zombie', rarity: 'epic', cost: 3000, desc: 'Decaying zombie skin with exposed bones. Enemies hesitate to shoot.' },
    robot: { name: 'The Robot', rarity: 'epic', cost: 3000, desc: 'Full chrome robot body. Servo sounds on movement. Glowing eyes.' },
    alien: { name: 'The Alien', rarity: 'legendary', cost: 6000, desc: 'Grey alien body with large head. Bioluminescent patterns. Not from this dimension.' },
    golden_god: { name: 'Golden God', rarity: 'mythic', cost: 20000, desc: 'Pure gold body. Everything you touch turns slightly gold. Light reflects off you blinding nearby enemies.' },
    invisible_man: { name: 'The Invisible Man', rarity: 'cheat', cost: 30000, desc: 'Your operator is fully invisible at all times. No shimmer, no outline, nothing. Only for $30k skin owners.' },
  },

  // WEAPON SKINS (applies to any weapon)
  weaponSkins: {
    factory: { name: 'Factory Finish', rarity: 'common', cost: 0, desc: 'Standard manufacturer finish.' },
    scratched: { name: 'Battle-Scarred', rarity: 'common', cost: 50, desc: 'Worn and scratched from heavy use.' },
    polished: { name: 'Polished', rarity: 'common', cost: 100, desc: 'Clean polished metal. Reflects light.' },
    matte_black: { name: 'Matte Black', rarity: 'common', cost: 200, desc: 'Non-reflective matte black coating.' },
    desert_tan: { name: 'Desert Tan', rarity: 'rare', cost: 500, desc: 'Sand-colored finish for desert environments.' },
    arctic_white: { name: 'Arctic White', rarity: 'rare', cost: 500, desc: 'White finish for snow environments.' },
    blood_red: { name: 'Blood Red', rarity: 'rare', cost: 800, desc: 'Deep crimson finish. Intimidating.' },
    electric_blue: { name: 'Electric Blue', rarity: 'rare', cost: 800, desc: 'Glowing electric blue finish. Visible in dark.' },
    gold_plated: { name: 'Gold Plated', rarity: 'epic', cost: 2000, desc: 'Real gold plating. Status symbol.' },
    diamond_encrusted: { name: 'Diamond Encrusted', rarity: 'epic', cost: 5000, desc: 'Diamonds embedded in the weapon frame. Catches light.' },
    void_touch: { name: 'Void Touch', rarity: 'legendary', cost: 8000, desc: 'Weapon absorbs light. Darker than black. Stars visible in the finish.' },
    plasma_glow: { name: 'Plasma Glow', rarity: 'legendary', cost: 8000, desc: 'Weapon glows with contained plasma. Energy crackles along the barrel.' },
    quantum_shimmer: { name: 'Quantum Shimmer', rarity: 'legendary', cost: 10000, desc: 'Weapon shimmers between dimensions. Different appearance in 4D.' },
    cosmic_dust: { name: 'Cosmic Dust', rarity: 'mythic', cost: 20000, desc: 'Weapon surface contains a miniature galaxy. Stars move inside the metal.' },
    reality_code: { name: 'Reality Code', rarity: 'cheat', cost: 25000, desc: 'Weapon surface shows running code. The code IS the weapon. For cheat owners.' },
  },

  // GEAR CUSTOMIZATION (functional + cosmetic)
  gearCustomization: {
    headgear: {
      standard_helmet: { name: 'Standard Helmet', cost: 0, stats: { armor: 10 }, desc: 'Basic combat helmet.' },
      ballistic_helmet: { name: 'Ballistic Helmet', cost: 300, stats: { armor: 25 }, desc: 'Level IV ballistic protection.' },
      tactical_helmet: { name: 'Tactical Helmet', cost: 800, stats: { armor: 30, ability: 'NVG mount' }, desc: 'Helmet with NVG mount and comms.' },
      quantum_helm: { name: 'Quantum Helm', cost: 5000, stats: { armor: 50, ability: 'dimensional_awareness' }, desc: 'Helmet that sees dimensional rifts. See 4D in HUD.' },
      void_crown: { name: 'Void Crown', cost: 12000, stats: { armor: 80, ability: 'void_sight' }, desc: 'Crown that sees through the void. See all dimensional layers.' },
      skull_mask: { name: 'Skull Mask', cost: 500, stats: { intimidation: 20 }, desc: 'Intimidating skull face mask.' },
      gas_mask: { name: 'Gas Mask', cost: 400, stats: { immune: 'gas' }, desc: 'Protection from toxic gas and bio hazards.' },
      thermal_visor: { name: 'Thermal Visor', cost: 2000, stats: { ability: 'thermal_vision' }, desc: 'See heat signatures through walls.' },
    },
    bodyArmor: {
      none: { name: 'No Armor', cost: 0, stats: { armor: 0, speed: 1.0 }, desc: 'Maximum speed, no protection.' },
      light_vest: { name: 'Light Vest', cost: 200, stats: { armor: 30, speed: 0.95 }, desc: 'Light plate carrier. Good mobility.' },
      heavy_vest: { name: 'Heavy Vest', cost: 500, stats: { armor: 60, speed: 0.85 }, desc: 'Heavy plate carrier. Reduced mobility.' },
      EOD_suit: { name: 'EOD Suit', cost: 2000, stats: { armor: 90, speed: 0.6 }, desc: 'Bomb disposal suit. Very slow but near-invulnerable to explosions.' },
      quantum_armor: { name: 'Quantum Armor', cost: 8000, stats: { armor: 120, speed: 0.9, ability: 'phase_damage_reduction' }, desc: 'Armor that phases to reduce incoming damage by 30%.' },
      adamantium_vest: { name: 'Adamantium Vest', cost: 15000, stats: { armor: 200, speed: 0.8, ability: 'unbreakable' }, desc: 'Unbreakable armor. Cannot be penetrated by conventional weapons.' },
    },
    backpacks: {
      none: { name: 'No Backpack', cost: 0, stats: { ammo: 0.5 }, desc: 'No extra storage.' },
      assault_pack: { name: 'Assault Pack', cost: 150, stats: { ammo: 1.0 }, desc: 'Standard ammo capacity.' },
      heavy_pack: { name: 'Heavy Pack', cost: 400, stats: { ammo: 2.0, speed: -0.05 }, desc: 'Double ammo capacity. Slightly slower.' },
      supply_pack: { name: 'Supply Pack', cost: 1000, stats: { ammo: 3.0, speed: -0.1, ability: 'auto_resupply' }, desc: 'Triple ammo. Auto-resupply nearby teammates.' },
      quantum_pack: { name: 'Quantum Pack', cost: 5000, stats: { ammo: 5.0, ability: 'dimensional_storage' }, desc: 'Stores items across dimensions. 5x capacity.' },
    },
    gloves: {
      bare_hands: { name: 'Bare Hands', cost: 0, stats: {}, desc: 'No gloves.' },
      tactical_gloves: { name: 'Tactical Gloves', cost: 100, stats: { reloadSpeed: 1.1 }, desc: 'Faster reload.' },
      gauntlets: { name: 'Combat Gauntlets', cost: 300, stats: { reloadSpeed: 1.1, meleeDmg: 1.5 }, desc: 'Faster reload and stronger melee.' },
      quantum_gloves: { name: 'Quantum Gloves', cost: 3000, stats: { reloadSpeed: 1.3, meleeDmg: 2.0, ability: 'dimensional_touch' }, desc: 'Touch dimensional objects. Reload 30% faster. 2x melee.' },
    },
    boots: {
      standard_boots: { name: 'Standard Boots', cost: 0, stats: { speed: 1.0 }, desc: 'Standard issue boots.' },
      combat_boots: { name: 'Combat Boots', cost: 200, stats: { speed: 1.05 }, desc: 'Lightweight combat boots. 5% faster.' },
      assault_boots: { name: 'Assault Boots', cost: 500, stats: { speed: 1.1, silent: false }, desc: '10% faster movement.' },
      silent_boots: { name: 'Silent Boots', cost: 1000, stats: { speed: 1.05, silent: true }, desc: 'Silent footsteps. Enemies cannot hear you.' },
      quantum_boots: { name: 'Quantum Boots', cost: 4000, stats: { speed: 1.2, silent: true, ability: 'wall_run' }, desc: '20% faster, silent, and can wall run.' },
    },
  },

  // COSTUMES (full outfit sets)
  costumes: {
    zombie_horde: { name: 'Zombie Horde Pack', cost: 5000, pieces: ['zombie_skin', 'tattered_clothes', 'fake_blood'], desc: 'Full zombie costume set. Perfect for Halloween ops.' },
    mech_warrior: { name: 'Mech Warrior Pack', cost: 8000, pieces: ['robot_skin', 'mech_helmet', 'servo_boots', 'energy_gauntlets'], desc: 'Full mech warrior transformation. Servo sounds included.' },
    ancient_soldier: { name: 'Ancient Soldier Pack', cost: 3000, pieces: ['roman_armor', 'gladius_skin', 'crest_helmet', 'sandal_boots'], desc: 'Roman legionnaire outfit. For the classics lover.' },
    ninja_assassin: { name: 'Ninja Assassin Pack', cost: 4000, pieces: ['black_shinobi', 'face_mask', 'silent_tabi', 'shadow_gauntlets'], desc: 'Full ninja outfit. Silent footsteps bonus included.' },
    space_marine: { name: 'Space Marine Pack', cost: 10000, pieces: ['power_armor', 'void_helmet', 'magnetic_boots', 'plasma_gauntlets'], desc: 'Full space marine power armor. For orbital operations.' },
    void_wraith: { name: 'Void Wraith Pack', cost: 15000, pieces: ['void_phantom_skin', 'void_crown', 'void_boots', 'void_gauntlets'], desc: 'Become a creature of the void. Semi-transparent at all times.' },
    golden_emperor: { name: 'Golden Emperor Pack', cost: 25000, pieces: ['golden_god_skin', 'crown_headgear', 'golden_boots', 'golden_gauntlets'], desc: 'Everything gold. Everything. The ultimate flex.' },
  },

  // EMOTES
  emotes: {
    salute: { name: 'Salute', cost: 50, desc: 'Military salute.' },
    thumbs_up: { name: 'Thumbs Up', cost: 50, desc: 'Thumbs up gesture.' },
    tea_bag: { name: 'Disrespect', cost: 200, desc: 'The ultimate disrespect. Does not need description.' },
    dance_victory: { name: 'Victory Dance', cost: 500, desc: 'Celebrate a kill with a dance.' },
    banish_gesture: { name: 'Banish Gesture', cost: 1000, desc: 'Point at the sky as your enemy is banished to deep space. Salt in the wound.' },
    dimensional_flex: { name: 'Dimensional Flex', cost: 2000, desc: 'Phase through 4D while doing a flex. Pure show-off.' },
    doomsday_stare: { name: 'Doomsday Stare', cost: 3000, desc: 'Stare into the nuclear fire unflinching. For survival trait owners who walked through M.A.D.' },
  },

  // FINISHING MOVES (custom executions)
  finishingMoves: {
    standard_execute: { name: 'Standard Execute', cost: 0, desc: 'Quick knife execution.' },
    banish_finish: { name: 'Banish Finish', cost: 5000, desc: 'Instead of killing, you banish them with a finishing move animation. They go to deep space instead of respawning.' },
    void_consume: { name: 'Void Consume', cost: 8000, desc: 'The void opens and consumes the enemy. No body left. They go directly to the void dimension.' },
    quantum_disperse: { name: 'Quantum Disperse', cost: 10000, desc: 'You disperse the enemy across 8 dimensions. They reform in deep space, scattered.' },
    reality_delete: { name: 'Reality Delete', cost: 25000, desc: 'You delete the enemy from reality. They do not die — they simply cease to have ever existed. For cheat owners only.' },
  },

  // VOICE LINES (custom voice packs)
  voicePacks: {
    standard: { name: 'Standard Voice', cost: 0, desc: 'Default operator voice.' },
    commander: { name: 'Commander Voice', cost: 500, desc: 'Deep, commanding voice. Orders sound like orders.' },
    hacker: { name: 'Hacker Voice', cost: 500, desc: 'Calm, analytical voice. Perfect for ARIA users.' },
    void_entity: { name: 'Void Entity', cost: 3000, desc: 'Ethereal, echoing voice. Sounds like it comes from the void.' },
    robot: { name: 'Robot Voice', cost: 2000, desc: 'Synthetic voice with metallic undertone.' },
    alien: { name: 'Alien Voice', cost: 5000, desc: 'Incomprehensible alien sounds that somehow convey meaning. Disturbing to enemies.' },
    ai_voice: { name: 'AI Assistant Voice', cost: 1000, desc: 'The AI speaks for you. Same voice as the AI Auto-Play mode.' },
  },

  // Get total customization items
  getTotalItems() {
    let total = 0;
    total += Object.keys(this.operatorSkins).length;
    total += Object.keys(this.weaponSkins).length;
    total += Object.values(this.gearCustomization).reduce((s, cat) => s + Object.keys(cat).length, 0);
    total += Object.keys(this.costumes).length;
    total += Object.keys(this.emotes).length;
    total += Object.keys(this.finishingMoves).length;
    total += Object.keys(this.voicePacks).length;
    return total;
  },

  // Get shop
  getShop() {
    return {
      operatorSkins: Object.keys(this.operatorSkins).length,
      weaponSkins: Object.keys(this.weaponSkins).length,
      gear: Object.values(this.gearCustomization).reduce((s, cat) => s + Object.keys(cat).length, 0),
      costumes: Object.keys(this.costumes).length,
      emotes: Object.keys(this.emotes).length,
      finishingMoves: Object.keys(this.finishingMoves).length,
      voicePacks: Object.keys(this.voicePacks).length,
      total: this.getTotalItems(),
    };
  },
};

// ============================================================
// 3. CONTROLLER-TO-GAME INPUT BRIDGE
// ============================================================
const INPUT_BRIDGE = {
  // This connects physical controllers, touch gamepad, and voice commands
  // to the actual game actions in index.html

  inputState: {
    // Movement
    moveX: 0, moveY: 0, lookX: 0, lookY: 0,
    // Actions
    shoot: false, aim: false, reload: false, sprint: false,
    jump: false, crouch: false, melee: false, grenade: false,
    switchWeapon: false, ability: false,
    // Combos
    comboBuffer: [],
    // Source tracking
    lastInputSource: 'none', // keyboard, controller, touch, voice
  },

  // Register a physical controller input
  registerControllerInput(button, pressed, source) {
    this.inputState.lastInputSource = source || 'controller';

    const buttonMap = {
      0: 'jump',       // Cross
      1: 'crouch',     // Circle
      2: 'reload',     // Square
      3: 'switchWeapon', // Triangle
      4: 'ability',    // L1
      5: 'grenade',    // R1
      6: 'aim',        // L2
      7: 'shoot',      // R2
      10: 'sprint',    // L3
      11: 'melee',     // R3
    };

    const action = buttonMap[button];
    if (action) {
      this.inputState[action] = pressed;

      // Feed into combo detection
      if (pressed) {
        const buttonNames = { 0:'CROSS', 1:'CIRCLE', 2:'SQUARE', 3:'TRIANGLE', 4:'L1', 5:'R1', 6:'L2', 7:'R2', 10:'L3', 11:'R3' };
        this.inputState.comboBuffer.push({ button: buttonNames[button], timestamp: Date.now() });
        this.inputState.comboBuffer = this.inputState.comboBuffer.filter(i => Date.now() - i.timestamp < 3000);

        // Check for combo
        if (typeof window !== "undefined" && window.COMBOS && window._playerState) {
          const detected = window.COMBOS.detectCombo(this.inputState.comboBuffer, window._playerState);
          if (detected) {
            this.inputState.comboBuffer = [];
            this._executeAction(detected.comboId, 'controller_combo');
            return { combo: detected };
          }
        }
      }
    }

    // Handle analog sticks
    if (button === 'left_stick') {
      this.inputState.moveX = pressed.x || 0;
      this.inputState.moveY = pressed.y || 0;
    } else if (button === 'right_stick') {
      this.inputState.lookX = pressed.x || 0;
      this.inputState.lookY = pressed.y || 0;
    }

    return { action, pressed };
  },

  // Register a touch gamepad input
  registerTouchInput(action, value, source) {
    this.inputState.lastInputSource = 'touch';
    if (typeof value === 'boolean') {
      this.inputState[action] = value;
      if (value) {
        const touchButtonMap = {
          shoot: 'R2', aim: 'L2', reload: 'SQUARE', grenade: 'R1',
          ability: 'L1', jump: 'CROSS', crouch: 'CIRCLE', melee: 'R3',
          switchWeapon: 'TRIANGLE', sprint: 'L3',
        };
        const btnName = touchButtonMap[action];
        if (btnName) {
          this.inputState.comboBuffer.push({ button: btnName, timestamp: Date.now() });
          this.inputState.comboBuffer = this.inputState.comboBuffer.filter(i => Date.now() - i.timestamp < 3000);
          if (typeof window !== "undefined" && window.COMBOS && window._playerState) {
            const detected = window.COMBOS.detectCombo(this.inputState.comboBuffer, window._playerState);
            if (detected) {
              this.inputState.comboBuffer = [];
              this._executeAction(detected.comboId, 'touch_combo');
              return { combo: detected };
            }
          }
        }
      }
    } else if (action === 'move') {
      this.inputState.moveX = value.x || 0;
      this.inputState.moveY = value.y || 0;
    } else if (action === 'look') {
      this.inputState.lookX = value.x || 0;
      this.inputState.lookY = value.y || 0;
    }
    return { action, value };
  },

  // Register a voice command
  registerVoiceCommand(command) {
    this.inputState.lastInputSource = 'voice';
    this._executeAction(command, 'voice');
    return { executed: command };
  },

  // Execute a game action (the bridge to the actual game)
  _executeAction(actionId, source) {
    // This dispatches to the game engine
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gameAction', {
        detail: {
          action: actionId,
          source: source,
          timestamp: Date.now(),
          playerState: window._playerState,
        }
      }));
    }

    // Log for debugging
    console.log('[INPUT BRIDGE] Action:', actionId, 'from:', source);
  },

  // Get current input state (for game loop)
  getState() {
    return { ...this.inputState };
  },

  // Initialize the bridge — listen to all input sources
  init() {
    if (typeof window === 'undefined') return;

    // Listen for gamepad input
    window.addEventListener('gamepadconnected', (e) => {
      console.log('[BRIDGE] Controller connected:', e.gamepad.id);
      this._startGamepadPolling();
    });

    // Listen for voice commands
    window.addEventListener('voiceCommand', (e) => {
      this.registerVoiceCommand(e.detail.action);
    });

    // Start gamepad polling
    this._startGamepadPolling();

    console.log('[INPUT BRIDGE] Initialized. Listening to controllers, touch, and voice.');
  },

  _gamepadPolling: false,
  _startGamepadPolling() {
    if (this._gamepadPolling) return;
    this._gamepadPolling = true;

    const poll = () => {
      if (!navigator.getGamepads) return;
      const gamepads = navigator.getGamepads();

      for (const gp of gamepads) {
        if (!gp) continue;

        // Read buttons
        for (let i = 0; i < gp.buttons.length; i++) {
          const pressed = gp.buttons[i].pressed;
          // Only register state changes
          if (pressed !== this._prevButtonState[gp.index + '_' + i]) {
            this.registerControllerInput(i, pressed, 'controller_' + gp.index);
            this._prevButtonState[gp.index + '_' + i] = pressed;
          }
        }

        // Read analog sticks
        if (gp.axes.length >= 4) {
          this.inputState.moveX = gp.axes[0];
          this.inputState.moveY = gp.axes[1];
          this.inputState.lookX = gp.axes[2];
          this.inputState.lookY = gp.axes[3];
        }
      }

      requestAnimationFrame(poll);
    };

    this._prevButtonState = {};
    poll();
  },
};

// ============================================================
// 4. AI SPECTATE MODE + AI DIFFICULTY SCALING
// ============================================================
const AI_SPECTATE = {
  // AI Spectate Mode — watch the AI play from different camera angles
  cameras: {
    first_person: { name: 'First Person', desc: 'See through your character\'s eyes as the AI plays' },
    third_person: { name: 'Third Person', desc: 'Watch your character from behind' },
    free_cam: { name: 'Free Camera', desc: 'Fly around the map freely while AI plays' },
    tactical: { name: 'Tactical View', desc: 'Top-down view of the entire battlefield' },
    cinematic: { name: 'Cinematic', desc: 'Auto-switching dramatic camera angles' },
    enemy_cam: { name: 'Enemy Cam', desc: 'Watch from the enemy\'s perspective as your AI destroys them' },
    kill_cam: { name: 'Kill Cam', desc: 'Slow-motion replay of each AI kill' },
    squad_cam: { name: 'Squad Cam', desc: 'Cycle through all squad members\' perspectives' },
  },

  currentCamera: 'first_person',
  cinematicTimer: 0,
  cinematicInterval: 5000, // switch every 5 seconds in cinematic mode

  setCamera(cameraId) {
    if (!this.cameras[cameraId]) return { success: false, error: 'Unknown camera' };
    this.currentCamera = cameraId;
    return {
      success: true,
      camera: this.cameras[cameraId].name,
      desc: this.cameras[cameraId].desc,
      voiceLine: 'AI: "Switching camera to ' + this.cameras[cameraId].name + '. Enjoy the show."',
    };
  },

  // Cinematic mode auto-switching
  updateCinematic(deltaTime) {
    if (this.currentCamera !== 'cinematic') return;
    this.cinematicTimer += deltaTime;
    if (this.cinematicTimer >= this.cinematicInterval) {
      this.cinematicTimer = 0;
      const cams = Object.keys(this.cameras).filter(c => c !== 'cinematic');
      const next = cams[Math.floor(Math.random() * cams.length)];
      return { switchTo: next, name: this.cameras[next].name };
    }
    return null;
  },

  getCameras() {
    return Object.entries(this.cameras).map(([id, cam]) => ({ id, name: cam.name, desc: cam.desc }));
  },
};

const AI_DIFFICULTY = {
  levels: {
    easy: {
      name: 'Easy AI',
      aimAccuracy: 0.5,
      reactionTime: 500, // ms
      decisionRate: 2, // decisions per second
      abilityUsage: 'rare',
      cheatUsage: 'never',
      banishUsage: 'rare',
      survivalUsage: 'reactive',
      aggression: 0.4,
      desc: 'AI plays casually. Good for farming XP while you relax.',
    },
    normal: {
      name: 'Normal AI',
      aimAccuracy: 0.65,
      reactionTime: 350,
      decisionRate: 4,
      abilityUsage: 'moderate',
      cheatUsage: 'emergency',
      banishUsage: 'moderate',
      survivalUsage: 'reactive',
      aggression: 0.6,
      desc: 'AI plays at average human level. Balanced approach.',
    },
    hard: {
      name: 'Hard AI',
      aimAccuracy: 0.75,
      reactionTime: 250,
      decisionRate: 6,
      abilityUsage: 'frequent',
      cheatUsage: 'tactical',
      banishUsage: 'aggressive',
      survivalUsage: 'proactive',
      aggression: 0.8,
      desc: 'AI plays at elite human level. Aggressive and tactical.',
    },
    elite: {
      name: 'Elite AI',
      aimAccuracy: 0.85,
      reactionTime: 150,
      decisionRate: 10,
      abilityUsage: 'frequent',
      cheatUsage: 'optimal',
      banishUsage: 'aggressive',
      survivalUsage: 'proactive',
      aggression: 0.9,
      desc: 'AI plays at professional esports level. Uses every advantage.',
    },
    nightmare: {
      name: 'Nightmare AI',
      aimAccuracy: 0.95,
      reactionTime: 80,
      decisionRate: 15,
      abilityUsage: 'constant',
      cheatUsage: 'ruthless',
      banishUsage: 'constant',
      survivalUsage: 'perfect',
      aggression: 1.0,
      desc: 'AI plays beyond human capability. Perfect aim. Perfect timing. Uses cheats without hesitation. This is not a game anymore — it is survival.',
    },
  },

  currentLevel: 'normal',

  setLevel(level) {
    if (!this.levels[level]) return { success: false, error: 'Unknown level. Options: easy, normal, hard, elite, nightmare' };
    this.currentLevel = level;
    return {
      success: true,
      level: this.levels[level].name,
      desc: this.levels[level].desc,
      voiceLine: 'AI: "Difficulty set to ' + this.levels[level].name + '. ' + this.levels[level].desc + '"',
    };
  },

  getLevel() {
    return {
      level: this.currentLevel,
      name: this.levels[this.currentLevel].name,
      ...this.levels[this.currentLevel],
    };
  },

  // Apply difficulty to AI behavior
  applyToBehavior(behavior) {
    const level = this.levels[this.currentLevel];
    return {
      ...behavior,
      aimAccuracy: level.aimAccuracy,
      reactionTime: level.reactionTime,
      decisionRate: level.decisionRate,
      aggression: level.aggression,
    };
  },
};

// ============================================================
// 5. UNIFIED MERGED VOICE SYSTEM
// ============================================================
const UNIFIED_VOICE = {
  // Merge ALL voice commands into one system
  allCommands: {},

  init() {
    // Load existing voice commands
    if (typeof VOICE_COMMANDS !== 'undefined') {
      Object.assign(this.allCommands, VOICE_COMMANDS.commands);
    }
    // Load expanded commands
    if (typeof FULL_VOICE !== 'undefined') {
      Object.assign(this.allCommands, FULL_VOICE.expandedCommands);
    }
    // Load weapon voice commands
    if (typeof require !== 'undefined') {
      const ed = require('./expanded_data.js');
      WEAPON_VOICE.generate(ed);
      Object.assign(this.allCommands, WEAPON_VOICE.commands);
    }
    // Add customization voice commands
    Object.assign(this.allCommands, this._getCustomizationCommands());

    return Object.keys(this.allCommands).length;
  },

  _getCustomizationCommands() {
    const cmds = {};
    const cust = CUSTOMIZATION;

    // Operator skins
    for (const [id, skin] of Object.entries(cust.operatorSkins)) {
      cmds['equip ' + skin.name.toLowerCase()] = { action: 'skin_' + id, desc: 'Equip ' + skin.name + ' skin' };
    }
    // Weapon skins
    for (const [id, skin] of Object.entries(cust.weaponSkins)) {
      cmds['weapon skin ' + skin.name.toLowerCase()] = { action: 'weapon_skin_' + id, desc: 'Apply ' + skin.name + ' to current weapon' };
    }
    // Costumes
    for (const [id, costume] of Object.entries(cust.costumes)) {
      cmds['equip ' + costume.name.toLowerCase()] = { action: 'costume_' + id, desc: 'Equip ' + costume.name };
    }
    // Emotes
    for (const [id, emote] of Object.entries(cust.emotes)) {
      cmds['emote ' + emote.name.toLowerCase()] = { action: 'emote_' + id, desc: 'Perform ' + emote.name };
    }
    // Finishing moves
    for (const [id, move] of Object.entries(cust.finishingMoves)) {
      cmds['finishing move ' + move.name.toLowerCase()] = { action: 'finish_' + id, desc: 'Set finishing move: ' + move.name };
    }
    // Voice packs
    for (const [id, pack] of Object.entries(cust.voicePacks)) {
      cmds['voice pack ' + pack.name.toLowerCase()] = { action: 'voicepack_' + id, desc: 'Set voice pack: ' + pack.name };
    }
    // AI spectate cameras
    for (const [id, cam] of Object.entries(AI_SPECTATE.cameras)) {
      cmds['camera ' + id.replace(/_/g, ' ')] = { action: 'camera_' + id, desc: 'Switch to ' + cam.name };
    }
    // AI difficulty
    for (const [id, level] of Object.entries(AI_DIFFICULTY.levels)) {
      cmds['ai ' + id] = { action: 'ai_difficulty_' + id, desc: 'Set AI to ' + level.name };
    }
    // Gear
    for (const [catId, category] of Object.entries(cust.gearCustomization)) {
      for (const [id, item] of Object.entries(category)) {
        cmds['equip ' + item.name.toLowerCase()] = { action: 'gear_' + catId + '_' + id, desc: 'Equip ' + item.name };
      }
    }

    return cmds;
  },

  processCommand(transcript) {
    const normalized = transcript.toLowerCase().trim();

    // Exact match
    if (this.allCommands[normalized]) {
      return this.allCommands[normalized];
    }

    // Partial match
    for (const [key, cmd] of Object.entries(this.allCommands)) {
      if (normalized.includes(key)) {
        return cmd;
      }
    }

    return null;
  },

  getCount() {
    return Object.keys(this.allCommands).length;
  },

  // Get commands by category for display
  getCategories() {
    return {
      'System': ['voice on', 'voice off', 'combos', 'combo wheel', 'tactical map', 'settings'],
      'Weapons (262)': 'ALL_WEAPON_COMMANDS',
      'Gear & Equipment': 'ALL_GEAR_COMMANDS',
      'Skins & Cosmetics': 'ALL_SKIN_COMMANDS',
      'Costumes': 'ALL_COSTUME_COMMANDS',
      'Emotes': 'ALL_EMOTE_COMMANDS',
      'Finishing Moves': 'ALL_FINISH_COMMANDS',
      'Voice Packs': 'ALL_VOICEPACK_COMMANDS',
      'Abilities': ['ability', 'special', 'ultimate'],
      'Dimensional': ['fold', 'shift', 'four d fold', 'five d shift', 'six d shift', 'seven d shift', 'eight d shift', 'banish', 'cosmic banish', 'return to reality'],
      'ARIA/Hacker': ['aria scan', 'aria paint', 'aria blackout', 'aria ghost', 'aria rewrite', 'hack'],
      'Strikes': ['airstrike', 'cruise missile', 'icbm', 'submarine', 'thor', 'thor single', 'thor pair', 'thor ripple', 'thor carpet', 'thor annihilation', 'supply drop'],
      'Survival': ['bunker', 'seal bunker', 'self bunker', 'void phase', 'quantum lock', 'reality anchor', 'immortal code', 'wolverine skull', 'adamantium shell', 'cosmic immortality', 'galaxy shield'],
      'Intel': ['full intel', 'intel fusion', 'harvest osint', 'track footprints', 'sonar passive', 'sonar active', 'satellite recon', 'squad feed'],
      'Naval': ['fire torpedo', 'launch missile', 'deploy uuv', 'deploy cable cutter', 'deploy recon uuv', 'deploy mine uuv', 'deploy attack uuv', 'deploy frogman', 'silent mode', 'towed array'],
      'National': ['abuja protocol', 'washington protocol', 'tokyo protocol', 'kabul protocol', 'london protocol', 'moscow protocol'],
      'AI Mode': ['ai mode on', 'ai mode off', 'ai take over', 'ai stop', 'ai use cheat', 'ai banish', 'ai survive', 'ai airstrike', 'ai hunt', 'ai defend', 'ai aggressive', 'ai defensive', 'ai stealth', 'ai balanced', 'ai easy', 'ai normal', 'ai hard', 'ai elite', 'ai nightmare'],
      'AI Camera': ['camera first person', 'camera third person', 'camera free cam', 'camera tactical', 'camera cinematic', 'camera enemy cam', 'camera kill cam', 'camera squad cam'],
      'Shop': ['open shop', 'buy ammo', 'buy armor', 'buy coins', 'upgrade to silver', 'upgrade to gold', 'upgrade to platinum', 'upgrade to supreme'],
      'Comms': ['enemy spotted', 'enemy behind', 'need backup', 'need medic', 'need ammo', 'clear', 'contact'],
      'Split Screen': ['split screen', 'split vertical', 'split horizontal', 'merge screen', 'player one login', 'player two login'],
      'VR': ['enable vr', 'disable vr', 'vr seated', 'vr standing', 'vr room scale'],
    };
  },
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WEAPON_VOICE, CUSTOMIZATION, INPUT_BRIDGE, AI_SPECTATE, AI_DIFFICULTY, UNIFIED_VOICE };
}
if (typeof window !== 'undefined') {
  window.WEAPON_VOICE = WEAPON_VOICE;
  window.CUSTOMIZATION = CUSTOMIZATION;
  window.INPUT_BRIDGE = INPUT_BRIDGE;
  window.AI_SPECTATE = AI_SPECTATE;
  window.AI_DIFFICULTY = AI_DIFFICULTY;
  window.UNIFIED_VOICE = UNIFIED_VOICE;
}
