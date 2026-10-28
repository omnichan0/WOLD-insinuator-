// ============================================================
// OMEGA-8D STRATEGIC WARFARE & MULTI-NATION CAREER SYSTEM
// Real-world military protocols, submarine warfare, M.A.D.,
// expanded career paths, multi-country recruitment
// ============================================================

const COIN_PER_DOLLAR = 10; // $1 = 10 coins

// ============================================================
// 1. EXPANDED CAREER PATHS (20 paths, admin-configurable)
// Each tier auto-assigns abilities, skills, and gear based on price
// ============================================================
const CAREER_PATHS_EXPANDED = {
  sniper: {
    name: 'Sniper',
    icon: '🎯',
    description: 'Long-range elimination, reconnaissance, overwatch',
    tiers: [
      { name: 'Marksman', cost: 0, autoAssign: { abilities: ['basic_scope'], skills: ['steady_aim'], gear: ['hunting_rifle', 'basic_spotter_scope'] } },
      { name: 'Sharpshooter', cost: 500, autoAssign: { abilities: ['hold_breath', 'range_find'], skills: ['lucky_shot'], gear: ['m24_sniper', 'spotter_scope', 'ghillie_suit'] } },
      { name: 'Sniper Elite', cost: 2000, autoAssign: { abilities: ['wind_comp', 'moving_target_lead'], skills: ['wall_hack'], gear: ['barrett_m82', 'thermal_scope', 'advanced_ghillie'] } },
      { name: 'Ghost Sniper', cost: 8000, autoAssign: { abilities: ['phase_shot', 'silenced_scope'], skills: ['ghost_protocol'], gear: ['vss_vintorez', 'quantum_scope', 'dark_matter_cloak'] } },
      { name: 'Cosmic Marksman', cost: 25000, autoAssign: { abilities: ['tachyon_shot', 'dimensional_snipe', 'galaxy_sight'], skills: ['future_sight', 'dimensional_radar'], gear: ['tachyon_lance', 'cosmic_scope', 'omniverse_targeting'] } }
    ]
  },
  hacker: {
    name: 'Cyber Warfare Hacker',
    icon: '💻',
    description: 'AI-assisted cyber warfare, infrastructure hacking, intelligence',
    tiers: [
      { name: 'Script Kiddie', cost: 0, autoAssign: { abilities: ['basic_scan'], skills: ['passive_scan'], gear: ['laptop', 'basic_wifi_adapter'] } },
      { name: 'Net Runner', cost: 1000, autoAssign: { abilities: ['drone_hack', 'comms_intercept'], skills: ['camera_hack'], gear: ['tactical_laptop', 'signal_jammer', 'aria_lite'] } },
      { name: 'Cyber Soldier', cost: 5000, autoAssign: { abilities: ['grid_blackout', 'false_intel', 'digital_ghost'], skills: ['x_ray_vision'], gear: ['mil_grade_laptop', 'ew_pod', 'aria_pro'] } },
      { name: 'Ghost Hacker', cost: 15000, autoAssign: { abilities: ['drone_swarm_hijack', 'cyber_lockdown', 'deep_intel_dive'], skills: ['reality_anchor', 'quantum_peek'], gear: ['quantum_terminal', 'neural_interface', 'aria_elite'] } },
      { name: 'ARIA Commander', cost: 50000, autoAssign: { abilities: ['quantum_grid_hack', 'banishment_override', 'reality_code_rewrite'], skills: ['reality_reset', 'map_rewrite'], gear: ['aria_full_package', 'cosmic_terminal', 'dimensional_interface'] } }
    ]
  },
  medic: {
    name: 'Combat Medic',
    icon: '⚕️',
    description: 'Healing, revival, trauma surgery, bio-enhancement',
    tiers: [
      { name: 'Field Medic', cost: 0, autoAssign: { abilities: ['basic_heal'], skills: ['respawn_insurance'], gear: ['med_kit', 'bandages'] } },
      { name: 'Combat Medic', cost: 500, autoAssign: { abilities: ['revive', 'trauma_care'], skills: ['adrenaline_rush'], gear: ['advanced_med_kit', 'defibrillator', 'medic_armor'] } },
      { name: 'Trauma Surgeon', cost: 3000, autoAssign: { abilities: ['chain_revive', 'field_surgery', 'bio_boost'], skills: ['shield_dome'], gear: ['surgical_kit', 'stem_cell_injector', 'medic_exo'] } },
      { name: 'Quantum Medic', cost: 10000, autoAssign: { abilities: ['quantum_heal', 'time_rewind_revive', 'mass_heal'], skills: ['team_wipe_button'], gear: ['quantum_med_kit', 'nanite_injector', 'bio_regen_suit'] } },
      { name: 'Life Bringer', cost: 30000, autoAssign: { abilities: ['dimensional_revive', 'void_rescue', 'cosmic_heal', 'full_squad_revive'], skills: ['kill_reversal'], gear: ['cosmic_med_kit', 'soul_anchor', 'life_crown'] } }
    ]
  },
  engineer: {
    name: 'Combat Engineer',
    icon: '🔧',
    description: 'Fortifications, breaching, repairs, tech deployment',
    tiers: [
      { name: 'Field Engineer', cost: 0, autoAssign: { abilities: ['basic_build', 'repair'], skills: ['ammo_refill'], gear: ['toolkit', 'welding_kit'] } },
      { name: 'Combat Builder', cost: 500, autoAssign: { abilities: ['rapid_fortify', 'vehicle_repair'], skills: ['speed_demon'], gear: ['combat_toolkit', 'barrier_kit', 'drone_repair'] } },
      { name: 'Breacher', cost: 3000, autoAssign: { abilities: ['nanite_fortify', 'shape_shifting_cover', 'mine_clear'], skills: ['teleport_anchor'], gear: ['nanite_canister', 'adaptive_cover', 'breaching_charges'] } },
      { name: 'Quantum Engineer', cost: 12000, autoAssign: { abilities: ['tesseract_safezone', 'phase_turrets', 'dimensional_repair'], skills: ['reality_anchor'], gear: ['tesseract_disc', 'phase_turret_kit', 'quantum_tools'] } },
      { name: 'Architect', cost: 35000, autoAssign: { abilities: ['map_rewrite', 'reality_fortify', 'dimensional_bunker', 'permanent_mod'], skills: ['map_rewrite'], gear: ['reality_editor', 'architect_crown', 'omega_fortification'] } }
    ]
  },
  heavy: {
    name: 'Heavy Weapons',
    icon: '💪',
    description: 'Suppressive fire, anti-vehicle, area denial',
    tiers: [
      { name: 'Gunner', cost: 0, autoAssign: { abilities: ['suppressive_fire'], skills: ['infinite_ammo'], gear: ['lmg', 'ammo_belt'] } },
      { name: 'Heavy Gunner', cost: 500, autoAssign: { abilities: ['sustained_fire', 'anti_vehicle'], skills: ['double_damage'], gear: ['m240', 'rocket_launcher', 'heavy_armor'] } },
      { name: 'Juggernaut', cost: 3000, autoAssign: { abilities: ['goliath_suit', 'dual_wield_heavy', 'walking_tank'], skills: ['adrenaline_override'], gear: ['goliath_exo', 'dual_minigun', 'reactive_armor'] } },
      { name: 'Walking Tank', cost: 12000, autoAssign: { abilities: ['plasma_flamethrower', 'singularity_smg', 'gravity_well_carbine'], skills: ['streak_shield'], gear: ['plasma_flamethrower', 'singularity_smg', 'emp_armor'] } },
      { name: 'War God', cost: 35000, autoAssign: { abilities: ['molecular_disassembly', 'antimatter_grenades', 'dyson_rail'], skills: ['one_shot_mode'], gear: ['molecular_carbine', 'antimatter_nades', 'war_god_armor'] } }
    ]
  },
  recon: {
    name: 'Reconnaissance',
    icon: '🔍',
    description: 'Intelligence gathering, surveillance, target painting',
    tiers: [
      { name: 'Scout', cost: 0, autoAssign: { abilities: ['basic_recon'], skills: ['loot_vision'], gear: ['binoculars', 'radio'] } },
      { name: 'Recon Op', cost: 500, autoAssign: { abilities: ['target_paint', 'drone_scout'], skills: ['satellite_uplink'], gear: ['recon_drone', 'laser_designator', 'stealth_suit'] } },
      { name: 'Intelligence', cost: 3000, autoAssign: { abilities: ['echolocation', 'biomimetic_drones', 'genetic_tracker'], skills: ['dimensional_radar'], gear: ['nanite_swarm', 'sonar_pulse', 'tracking_darts'] } },
      { name: 'Ghost Recon', cost: 12000, autoAssign: { abilities: ['tachyon_visor', 'quantum_radar', 'perception_field'], skills: ['future_sight'], gear: ['tachyon_visor', 'perception_generator', 'ghost_cloak'] } },
      { name: 'All-Seeing', cost: 35000, autoAssign: { abilities: ['omniscience', 'reality_scan', 'timeline_view', 'multiverse_sight'], skills: ['dimensional_radar', 'future_sight'], gear: ['omniscience_crown', 'timeline_viewer', 'multiverse_scanner'] } }
    ]
  },
  stealth: {
    name: 'Stealth Operative',
    icon: '🥷',
    description: 'Infiltration, assassination, sabotage, evasion',
    tiers: [
      { name: 'Sneaker', cost: 0, autoAssign: { abilities: ['silent_move'], skills: ['death_fake'], gear: ['silenced_pistol', 'dark_clothing'] } },
      { name: 'Ghost Op', cost: 500, autoAssign: { abilities: ['thermal_camo', 'silent_takedown'], skills: ['ghost_protocol'], gear: ['thermal_suit', 'suppressed_smg', 'throwing_knives'] } },
      { name: 'Shadow', cost: 3000, autoAssign: { abilities: ['dark_matter_cloak', 'neural_hijack'], skills: ['void_trap'], gear: ['dark_matter_generator', 'neural_darts', 'shadow_blade'] } },
      { name: 'Void Walker', cost: 12000, autoAssign: { abilities: ['quantum_decoupling', 'void_step', 'dimensional_blink'], skills: ['ghost_protocol', 'anti_banish_shield'], gear: ['decoupling_pack', 'void_blade', 'phase_armor'] } },
      { name: 'Cosmic Ghost', cost: 35000, autoAssign: { abilities: ['cosmic_invisibility', 'reality_phasing', 'existence_erase'], skills: ['ghost_protocol'], gear: ['cosmic_cloak', 'existence_eraser', 'reality_phase_suit'] } }
    ]
  },
  commander: {
    name: 'Squad Commander',
    icon: '🎖️',
    description: 'Leadership, tactical coordination, strategic command',
    tiers: [
      { name: 'Corporal', cost: 0, autoAssign: { abilities: ['squad_boost'], skills: ['squad_revive'], gear: ['command_radio', 'officer_pistol'] } },
      { name: 'Sergeant', cost: 1000, autoAssign: { abilities: ['tactical_scan', 'orders_menu'], skills: ['airstrike_coupon'], gear: ['command_tablet', 'tactical_map', 'officer_rifle'] } },
      { name: 'Lieutenant', cost: 4000, autoAssign: { abilities: ['airstrike_designator', 'cruise_missile_strike'], skills: ['streak_shield'], gear: ['laser_designator', 'comm_node', 'command_armor'] } },
      { name: 'Captain', cost: 15000, autoAssign: { abilities: ['submarine_strike', 'orbital_strike', 'mad_protocol'], skills: ['reality_reset'], gear: ['submarine_comm', 'orbital_designator', 'command_crown'] } },
      { name: 'General', cost: 40000, autoAssign: { abilities: ['global_command', 'omega_protocol', 'reality_reset_engine', 'dimensional_command'], skills: ['reality_reset', 'map_rewrite'], gear: ['omega_key', 'general_crown', 'dimensional_command_center'] } }
    ]
  },
  demolitions: {
    name: 'Demolitions',
    icon: '💥',
    description: 'Explosives, breaching, structural destruction',
    tiers: [
      { name: 'Breacher', cost: 0, autoAssign: { abilities: ['basic_breaching'], skills: ['speed_demon'], gear: ['breaching_charges', 'shotgun'] } },
      { name: 'Demolitionist', cost: 500, autoAssign: { abilities: ['building_collapse', 'shaped_charge'], skills: ['infinite_ammo'], gear: ['c4', 'shaped_charges', 'demo_armor'] } },
      { name: 'Saboteur', cost: 3000, autoAssign: { abilities: ['oxygen_mines', 'gravity_tripwires', 'seismic_mines'], skills: ['void_trap'], gear: ['oxygen_mines', 'gravity_tripwires', 'seismic_mines', 'saboteur_suit'] } },
      { name: 'Void Breacher', cost: 12000, autoAssign: { abilities: ['void_implosion', 'singularity_mines', 'antimatter_grenades'], skills: ['streak_shield'], gear: ['void_implosion_device', 'singularity_mines', 'antimatter_nades'] } },
      { name: 'Apocalypse', cost: 35000, autoAssign: { abilities: ['reality_fracture', 'cosmic_rift', 'galaxy_bomb'], skills: ['one_shot_mode'], gear: ['reality_fracture_bomb', 'cosmic_rift_grenade', 'apocalypse_armor'] } }
    ]
  },
  pilot: {
    name: 'Combat Pilot',
    icon: '✈️',
    description: 'Aerial combat, gunship support, orbital drops',
    tiers: [
      { name: 'Rotary Pilot', cost: 0, autoAssign: { abilities: ['basic_flight'], skills: ['speed_demon'], gear: ['helicopter', 'basic_ordinance'] } },
      { name: 'Combat Pilot', cost: 1000, autoAssign: { abilities: ['gunship_support', 'evac'], skills: ['airstrike_coupon'], gear: ['attack_helicopter', 'rocket_pods', 'pilot_suit'] } },
      { name: 'Ace', cost: 5000, autoAssign: { abilities: ['jet_strike', 'carpet_bomb', 'aerial_recon'], skills: ['double_damage'], gear: ['stealth_jet', 'bomb_bay', 'pilot_exo'] } },
      { name: 'Void Pilot', cost: 20000, autoAssign: { abilities: ['orbital_drop', 'void_flight', 'space_combat'], skills: ['ghost_protocol'], gear: ['void_fighter', 'orbital_drop_pods', 'void_pilot_suit'] } },
      { name: 'Cosmic Ace', cost: 50000, autoAssign: { abilities: ['galaxy_flight', 'interstellar_combat', 'dyson_rail_control'], skills: ['reality_reset'], gear: ['cosmic_fighter', 'dyson_rail', 'cosmic_pilot_crown'] } }
    ]
  },
  // NEW CAREER PATHS (11-20)
  naval: {
    name: 'Naval Warfare Officer',
    icon: '🚢',
    description: 'Submarine command, naval strikes, sea combat',
    tiers: [
      { name: 'Deckhand', cost: 0, autoAssign: { abilities: ['basic_naval'], skills: ['speed_demon'], gear: ['patrol_boat', 'naval_radio'] } },
      { name: 'Submariner', cost: 1000, autoAssign: { abilities: ['submarine_command', 'torpedo_strike'], skills: ['satellite_uplink'], gear: ['attack_submarine', 'torpedoes', 'sonar_array'] } },
      { name: 'Submarine Captain', cost: 5000, autoAssign: { abilities: ['ballistic_missile_strike', 'acoustic_warfare', 'depth_charge'], skills: ['streak_shield'], gear: ['nuclear_submarine', 'slbms', 'advanced_sonar'] } },
      { name: 'Fleet Commander', cost: 20000, autoAssign: { abilities: ['carrier_strike', 'naval_blockade', 'submarine_squadron'], skills: ['reality_anchor'], gear: ['aircraft_carrier', 'carrier_group', 'fleet_command'] } },
      { name: 'Admiral of the Void', cost: 50000, autoAssign: { abilities: ['orbital_naval', 'void_fleet', 'cosmic_blockade', 'dimensional_naval'], skills: ['reality_reset'], gear: ['void_carrier', 'cosmic_fleet', 'admiral_crown'] } }
    ]
  },
  armor: {
    name: 'Armor Commander',
    icon: '🛡️',
    description: 'Tank command, armored warfare, mechanized assault',
    tiers: [
      { name: 'Driver', cost: 0, autoAssign: { abilities: ['basic_armor'], skills: ['speed_demon'], gear: ['apc', ' mounted_mg'] },
        correctedGear: ['apc', 'mounted_mg'] },
      { name: 'Tank Commander', cost: 1000, autoAssign: { abilities: ['tank_strike', 'armor_column'], skills: ['double_damage'], gear: ['main_battle_tank', 'sabot_rounds', 'tank_crew'] } },
      { name: 'Armored Captain', cost: 5000, autoAssign: { abilities: ['mech_drop', 'armor_squadron', 'reactive_armor'], skills: ['streak_shield'], gear: ['mech_unit', 'tank_squadron', 'reactive_armor_kit'] } },
      { name: 'Void Armored', cost: 20000, autoAssign: { abilities: ['void_tank', 'dimensional_armor', 'gravity_tank'], skills: ['reality_anchor'], gear: ['void_tank', 'dimensional_armor', 'gravity_cannon'] } },
      { name: 'Titan Commander', cost: 50000, autoAssign: { abilities: ['cosmic_titan', 'reality_tank', 'galaxy_cannon'], skills: ['one_shot_mode'], gear: ['cosmic_titan', 'reality_armor', 'titan_crown'] } }
    ]
  },
  intelligence: {
    name: 'Intelligence Officer',
    icon: '🕵️',
    description: 'Spy network, counter-intel, informant management',
    tiers: [
      { name: 'Analyst', cost: 0, autoAssign: { abilities: ['basic_intel'], skills: ['loot_vision'], gear: ['intelligence_kit', 'encrypted_radio'] } },
      { name: 'Field Agent', cost: 1000, autoAssign: { abilities: ['informant_network', 'counter_intel'], skills: ['x_ray_vision'], gear: ['spy_kit', 'false_documents', 'concealed_weapon'] } },
      { name: 'Handler', cost: 5000, autoAssign: { abilities: ['manage_spies', 'telemetry_intercept', 'social_engineering'], skills: ['dimensional_radar'], gear: ['handler_kit', 'surveillance_array', 'interrogation_kit'] } },
      { name: 'Spymaster', cost: 20000, autoAssign: { abilities: ['global_surveillance', 'deep_cover', 'mind_control'], skills: ['future_sight'], gear: ['spymaster_kit', 'global_surveillance', 'neural_interface'] } },
      { name: 'Omniscient', cost: 50000, autoAssign: { abilities: ['reality_intel', 'timeline_intel', 'multiverse_intel', 'omniscience'], skills: ['dimensional_radar', 'future_sight'], gear: ['omniscience_crown', 'timeline_viewer', 'multiverse_scanner'] } }
    ]
  },
  airborne: {
    name: 'Airborne Ranger',
    icon: '🪂',
    description: 'Paratrooper insertion, behind-enemy-lines, rapid deployment',
    tiers: [
      { name: 'Paratrooper', cost: 0, autoAssign: { abilities: ['airborne_insert'], skills: ['speed_demon'], gear: ['parachute', 'carbine'] } },
      { name: 'Ranger', cost: 1000, autoAssign: { abilities: ['halo_jump', 'behind_lines'], skills: ['ghost_protocol'], gear: ['stealth_chute', 'assault_rifle', 'ranger_kit'] } },
      { name: 'Pathfinder', cost: 5000, autoAssign: { abilities: ['orbital_drop', 'laser_designate', 'forward_air'], skills: ['airstrike_coupon'], gear: ['drop_pod', 'laser_designator', 'pathfinder_kit'] } },
      { name: 'Void Ranger', cost: 20000, autoAssign: { abilities: ['dimensional_drop', 'void_insert', 'phase_infiltration'], skills: ['ghost_protocol'], gear: ['void_pod', 'phase_chute', 'void_ranger_kit'] } },
      { name: 'Cosmic Ranger', cost: 50000, autoAssign: { abilities: ['galaxy_drop', 'interstellar_insert', 'reality_drop'], skills: ['reality_reset'], gear: ['cosmic_pod', 'galaxy_chute', 'cosmic_ranger_crown'] } }
    ]
  },
  special_forces: {
    name: 'Special Forces',
    icon: '💀',
    description: 'Elite multi-role, counter-terror, direct action',
    tiers: [
      { name: 'Operator', cost: 0, autoAssign: { abilities: ['multi_role'], skills: ['adrenaline_rush'], gear: ['assault_rifle', 'sidearm', 'tactical_kit'] } },
      { name: 'Tier 2', cost: 2000, autoAssign: { abilities: ['night_ops', 'cqb_master', 'interrogation'], skills: ['ghost_protocol', 'lucky_shot'], gear: ['night_vision', 'suppressed_rifle', 'tactical_armor'] } },
      { name: 'Tier 1', cost: 8000, autoAssign: { abilities: ['counter_terror', 'hostage_rescue', 'sniper_cqb'], skills: ['double_damage', 'shield_dome'], gear: ['tier1_kit', 'suppressed_sniper', 'reactive_armor'] } },
      { name: 'Ghost Operator', cost: 25000, autoAssign: { abilities: ['dimensional_ops', 'void_raid', 'cosmic_strike'], skills: ['ghost_protocol', 'one_shot_mode'], gear: ['void_kit', 'dimensional_rifle', 'ghost_armor'] } },
      { name: 'Phantom', cost: 60000, autoAssign: { abilities: ['reality_ops', 'omniverse_strike', 'existence_erase'], skills: ['reality_reset', 'one_shot_mode'], gear: ['phantom_crown', 'omniverse_kit', 'reality_suit'] } }
    ]
  },
  artillery: {
    name: 'Artillery Officer',
    icon: '🎯',
    description: 'Long-range bombardment, siege warfare, missile command',
    tiers: [
      { name: 'Gunner', cost: 0, autoAssign: { abilities: ['basic_artillery'], skills: ['infinite_ammo'], gear: ['howitzer', 'artillery_radio'] } },
      { name: 'Artillery Officer', cost: 1000, autoAssign: { abilities: ['precision_strike', 'barrage'], skills: ['airstrike_coupon'], gear: ['self_propelled_howitzer', 'gps_shells', 'artillery_kit'] } },
      { name: 'Missile Commander', cost: 5000, autoAssign: { abilities: ['cruise_missile', 'ballistic_missile', 'mlrs'], skills: ['double_damage'], gear: ['missile_launcher', 'cruise_missiles', 'mlrs_system'] } },
      { name: 'Strategic Commander', cost: 20000, autoAssign: { abilities: ['hypersonic_missile', 'orbital_bombardment', 'tactical_nuke'], skills: ['streak_shield'], gear: ['hypersonic_system', 'orbital_cannon', 'tactical_nuke'] } },
      { name: 'Apocalypse Commander', cost: 50000, autoAssign: { abilities: ['dyson_rail', 'galaxy_bomb', 'omega_strike', 'reality_bombardment'], skills: ['one_shot_mode'], gear: ['dyson_rail', 'galaxy_bomb', 'apocalypse_crown'] } }
    ]
  },
  cyber_resistance: {
    name: 'Cyber Resistance Fighter',
    icon: '⚡',
    description: 'Guerrilla cyber warfare, infrastructure sabotage, insurgent tech',
    tiers: [
      { name: 'Hacktivist', cost: 0, autoAssign: { abilities: ['basic_cyber_sabotage'], skills: ['speed_demon'], gear: ['laptop', 'wifi_jammer'] } },
      { name: 'Insurgent Tech', cost: 1000, autoAssign: { abilities: ['grid_sabotage', 'drone_repurpose', 'comms_jam'], skills: ['ghost_protocol'], gear: ['insurgent_laptop', 'captured_drones', 'jammer_kit'] } },
      { name: 'Cyber Guerrilla', cost: 5000, autoAssign: { abilities: ['infrastructure_hack', 'false_broadcast', 'data_steal'], skills: ['x_ray_vision'], gear: ['guerrilla_terminal', 'broadcast_kit', 'data_storage'] } },
      { name: 'Digital Revolutionary', cost: 20000, autoAssign: { abilities: ['mass_drone_hijack', 'global_blackout', 'ai_corruption'], skills: ['reality_anchor'], gear: ['revolutionary_terminal', 'ai_corruption_kit', 'global_jammer'] } },
      { name: 'System Override', cost: 50000, autoAssign: { abilities: ['reality_hack', 'dimensional_override', 'omega_corruption'], skills: ['reality_reset'], gear: ['override_crown', 'dimensional_hacker', 'omega_terminal'] } }
    ]
  },
  psychological: {
    name: 'Psychological Warfare Specialist',
    icon: '🧠',
    description: 'Mind warfare, sensory manipulation, propaganda, terror tactics',
    tiers: [
      { name: 'Propagandist', cost: 0, autoAssign: { abilities: ['basic_psyops'], skills: ['death_fake'], gear: ['broadcast_kit', 'speakers'] } },
      { name: 'Psyops', cost: 1000, autoAssign: { abilities: ['sensory_hack', 'fear_gas'], skills: ['sensory_hack'], gear: ['psyops_kit', 'sensory_grenades', 'broadcast_system'] } },
      { name: 'Mind Warrior', cost: 5000, autoAssign: { abilities: ['mnestic_emp', 'telepathic_jam', 'hallucination_gas'], skills: ['sensory_hack'], gear: ['mnestic_emp', 'telepathic_jammer', 'hallucination_grenades'] } },
      { name: 'Dream Breaker', cost: 20000, autoAssign: { abilities: ['dream_shatterer', 'neural_hijack', 'synaptic_overclock'], skills: ['sensory_hack'], gear: ['dream_shatterer', 'neural_darts', 'overclock_injector'] } },
      { name: 'Mind God', cost: 50000, autoAssign: { abilities: ['mass_mind_control', 'reality_hallucination', 'dimensional_madness', 'cosmic_terror'], skills: ['reality_reset'], gear: ['mind_crown', 'cosmic_terror_device', 'dimensional_madness_generator'] } }
    ]
  },
  biological: {
    name: 'Biological Warfare Specialist',
    icon: '☣️',
    description: 'Bio weapons, genetic enhancement, nanite warfare',
    tiers: [
      { name: 'Field Biologist', cost: 0, autoAssign: { abilities: ['bio_scan'], skills: ['adrenaline_rush'], gear: ['bio_kit', 'hazmat_suit'] } },
      { name: 'Bio Warfare', cost: 2000, autoAssign: { abilities: ['bio_weapon', 'toxin_gas', 'bio_agent'], skills: ['vampire_mode'], gear: ['bio_weapon_kit', 'toxin_grenades', 'bio_suit'] } },
      { name: 'Genetic Engineer', cost: 8000, autoAssign: { abilities: ['genetic_enhance', 'bio_luminescent_camo', 'nanite_swarm'], skills: ['shield_dome'], gear: ['genetic_kit', 'skin_weave', 'nanite_hive'] } },
      { name: 'Nano Weaponry', cost: 25000, autoAssign: { abilities: ['molecular_disassembly', 'self_replicate_nanites', 'neural_parasites'], skills: ['double_damage'], gear: ['molecular_carbine', 'nanite_fortification', 'neural_darts'] } },
      { name: 'Bio God', cost: 60000, autoAssign: { abilities: ['genetic_terrain', 'biological_dimension', 'life_creation', 'extinction_event'], skills: ['one_shot_mode'], gear: ['bio_crown', 'extinction_device', 'life_creator'] } }
    ]
  },
  orbital: {
    name: 'Orbital Warfare Specialist',
    icon: '🛰️',
    description: 'Space combat, satellite control, orbital strikes',
    tiers: [
      { name: 'Satellite Op', cost: 0, autoAssign: { abilities: ['satellite_scan'], skills: ['satellite_uplink'], gear: ['satellite_terminal', 'uplink_kit'] } },
      { name: 'Orbital Controller', cost: 2000, autoAssign: { abilities: ['orbital_strike', 'satellite_hack'], skills: ['airstrike_coupon'], gear: ['orbital_terminal', 'kinetic_rounds', 'satellite_array'] } },
      { name: 'Space Commander', cost: 8000, autoAssign: { abilities: ['orbital_bombardment', 'space_deployment', 'kinetic_bombardment'], skills: ['double_damage'], gear: ['space_terminal', 'kinetic_projectiles', 'orbital_platform'] } },
      { name: 'Void Orbital', cost: 25000, autoAssign: { abilities: ['dyson_rail', 'void_satellite', 'dimensional_orbital'], skills: ['reality_anchor'], gear: ['dyson_rail', 'void_satellites', 'dimensional_orbital_kit'] } },
      { name: 'Galactic Commander', cost: 60000, autoAssign: { abilities: ['galaxy_strike', 'interstellar_bombardment', 'cosmic_satellite', 'omega_orbital'], skills: ['reality_reset'], gear: ['galaxy_cannon', 'cosmic_satellites', 'galactic_crown'] } }
    ]
  },
  multidimensional: {
    name: 'Dimensional Warfare Specialist',
    icon: '🌌',
    description: '8D combat, dimensional manipulation, reality control',
    tiers: [
      { name: 'Dimension Initiate', cost: 0, autoAssign: { abilities: ['basic_4d'], skills: ['quantum_peek'], gear: ['dimensional_sensor', '4d_compass'] } },
      { name: 'Dimension Soldier', cost: 3000, autoAssign: { abilities: ['4d_fold', 'quantum_shift'], skills: ['ghost_protocol'], gear: ['4d_fold_kit', 'quantum_stabilizer', 'phase_armor'] } },
      { name: 'Dimension Master', cost: 12000, autoAssign: { abilities: ['void_banish', 'cosmic_banish', 'quantum_tunnel', 'void_step'], skills: ['void_trap', 'anti_banish_shield'], gear: ['void_cannon', 'cosmic_drive', 'dimensional_rifle'] } },
      { name: 'Reality Architect', cost: 30000, autoAssign: { abilities: ['reality_rewrite', 'map_rewrite', 'permanent_mod', 'dimensional_bunker'], skills: ['map_rewrite', 'reality_anchor'], gear: ['reality_editor', 'architect_crown', 'dimensional_command'] } },
      { name: 'Dimension God', cost: 80000, autoAssign: { abilities: ['omega_protocol', 'reality_reset_engine', 'galaxy_collapse', 'multiverse_control'], skills: ['reality_reset', 'one_shot_mode'], gear: ['omega_crown', 'multiverse_controller', 'dimension_god_suit'] } }
    ]
  }
};

// ============================================================
// 2. ADMIN PANEL INTEGRATION — Auto-assign on price change
// ============================================================
const CAREER_ADMIN = {
  // When admin sets a price for a career tier, this auto-generates
  // the full abilities, skills, and gear package
  setTierPrice(careerId, tierIndex, priceInDollars) {
    const career = CAREER_PATHS_EXPANDED[careerId];
    if (!career || !career.tiers[tierIndex]) return { success: false, error: 'Invalid career/tier' };

    const tier = career.tiers[tierIndex];
    const oldPrice = tier.cost;
    tier.cost = Math.round(priceInDollars * COIN_PER_DOLLAR);

    // Auto-assign everything based on tier level (higher tier = more stuff)
    const package_ = this.generatePackage(careerId, tierIndex);

    return {
      success: true,
      career: career.name,
      tier: tier.name,
      oldPrice: oldPrice,
      newPrice: tier.cost,
      priceInDollars: priceInDollars,
      autoAssigned: package_
    };
  },

  // Generate full package for a tier
  generatePackage(careerId, tierIndex) {
    const career = CAREER_PATHS_EXPANDED[careerId];
    const tier = career.tiers[tierIndex];
    const auto = tier.autoAssign || {};

    return {
      abilities: auto.abilities || [],
      skills: auto.skills || [],
      gear: auto.gear || [],
      totalItems: (auto.abilities?.length || 0) + (auto.skills?.length || 0) + (auto.gear?.length || 0),
      tierLevel: tierIndex + 1,
      tierName: tier.name,
      cost: tier.cost,
      costUSD: (tier.cost / COIN_PER_DOLLAR).toFixed(2)
    };
  },

  // Get all career paths for admin panel display
  getAllForAdmin() {
    const result = {};
    for (const [id, career] of Object.entries(CAREER_PATHS_EXPANDED)) {
      result[id] = {
        name: career.name,
        icon: career.icon,
        description: career.description,
        tiers: career.tiers.map((t, i) => ({
          index: i,
          name: t.name,
          cost: t.cost,
          costUSD: (t.cost / COIN_PER_DOLLAR).toFixed(2),
          package: this.generatePackage(id, i)
        }))
      };
    }
    return result;
  },

  // Get full career catalog as table for admin
  getCatalogTable() {
    let table = '';
    for (const [id, career] of Object.entries(CAREER_PATHS_EXPANDED)) {
      table += career.icon + ' ' + career.name + ':\n';
      career.tiers.forEach((t, i) => {
        const pkg = this.generatePackage(id, i);
        table += '  T' + (i+1) + ' ' + t.name + ' | $' + (t.cost / COIN_PER_DOLLAR).toFixed(0) +
          ' | ' + pkg.totalItems + ' items | Abilities: ' + (pkg.abilities.length) +
          ' | Skills: ' + (pkg.skills.length) + ' | Gear: ' + (pkg.gear.length) + '\n';
      });
    }
    return table;
  }
};

// ============================================================
// 3. MULTI-COUNTRY RECRUITMENT & NOTIFICATION SYSTEM
// Player can be recruited by multiple countries simultaneously
// ============================================================
const MULTI_NATION = {
  // Player registry — tracks which countries a player belongs to
  players: {}, // playerId -> { countries: { USA: {...}, NGA: {...}, ... } }

  registerPlayer(playerId, name) {
    if (!this.players[playerId]) {
      this.players[playerId] = {
        id: playerId,
        name: name,
        countries: {}, // country code -> { career, tier, role, squad, activeMissions, notifications }
        maxCountries: 12 // can join up to 12 countries
      };
    }
    return this.players[playerId];
  },

  // Join a country military
  joinCountry(playerId, countryCode, careerPath, tier) {
    const player = this.players[playerId];
    if (!player) return { success: false, error: 'Player not registered' };

    const countryCount = Object.keys(player.countries).length;
    if (countryCount >= player.maxCountries && !player.countries[countryCode]) {
      return { success: false, error: 'Max countries reached (' + player.maxCountries + ')' };
    }

    player.countries[countryCode] = {
      career: careerPath,
      tier: tier || 0,
      role: 'Recruit',
      squad: null,
      subSquad: null,
      activeMissions: [],
      notifications: [],
      joinedDate: Date.now(),
      rank: 0,
      kdr: 0,
      reputation: 0
    };

    return {
      success: true,
      player: player.name,
      country: countryCode,
      career: careerPath,
      tier: tier,
      totalCountries: Object.keys(player.countries).length,
      remainingSlots: player.maxCountries - Object.keys(player.countries).length
    };
  },

  // Set different career path in different country
  setCareerInCountry(playerId, countryCode, careerPath, tier) {
    const player = this.players[playerId];
    if (!player || !player.countries[countryCode]) {
      return { success: false, error: 'Not enlisted in this country' };
    }

    player.countries[countryCode].career = careerPath;
    player.countries[countryCode].tier = tier || 0;

    return {
      success: true,
      country: countryCode,
      career: careerPath,
      tier: tier,
      message: 'Career set to ' + careerPath + ' (Tier ' + (tier + 1) + ') in ' + countryCode
    };
  },

  // Notify player of campaign in ANY of their countries
  notifyCampaign(playerId, countryCode, campaignName, campaignType, urgency) {
    const player = this.players[playerId];
    if (!player || !player.countries[countryCode]) return { success: false };

    const notification = {
      id: Date.now() + Math.random(),
      countryCode: countryCode,
      campaignName: campaignName,
      campaignType: campaignType,
      urgency: urgency || 'normal', // low, normal, high, critical
      timestamp: Date.now(),
      read: false,
      accepted: false,
      declined: false
    };

    player.countries[countryCode].notifications.push(notification);

    return {
      success: true,
      notification: notification,
      totalUnread: this.getUnreadCount(playerId)
    };
  },

  // Get ALL notifications from ALL countries
  getAllNotifications(playerId) {
    const player = this.players[playerId];
    if (!player) return [];

    const all = [];
    for (const [countryCode, data] of Object.entries(player.countries)) {
      data.notifications.forEach(notif => {
        all.push({
          ...notif,
          countryName: countryCode,
          yourRole: data.career,
          yourTier: data.tier,
          yourRank: data.rank
        });
      });
    }

    // Sort by urgency then timestamp
    const urgencyOrder = { critical: 0, high: 1, normal: 2, low: 3 };
    all.sort((a, b) => (urgencyOrder[a.urgency] || 2) - (urgencyOrder[b.urgency] || 2) || b.timestamp - a.timestamp);

    return all;
  },

  getUnreadCount(playerId) {
    const player = this.players[playerId];
    if (!player) return 0;
    let count = 0;
    for (const data of Object.values(player.countries)) {
      count += data.notifications.filter(n => !n.read).length;
    }
    return count;
  },

  // Accept a campaign notification
  acceptNotification(playerId, notifId) {
    const player = this.players[playerId];
    if (!player) return { success: false };

    for (const [countryCode, data] of Object.entries(player.countries)) {
      const notif = data.notifications.find(n => n.id == notifId);
      if (notif) {
        notif.accepted = true;
        notif.read = true;
        data.activeMissions.push({
          campaign: notif.campaignName,
          country: countryCode,
          type: notif.campaignType,
          startedAt: Date.now()
        });
        return { success: true, campaign: notif.campaignName, country: countryCode };
      }
    }
    return { success: false };
  },

  // Get player's full multi-nation profile
  getProfile(playerId) {
    const player = this.players[playerId];
    if (!player) return null;

    const profile = {
      name: player.name,
      totalCountries: Object.keys(player.countries).length,
      maxCountries: player.maxCountries,
      countries: {}
    };

    for (const [code, data] of Object.entries(player.countries)) {
      profile.countries[code] = {
        career: data.career,
        tier: data.tier,
        rank: data.rank,
        role: data.role,
        squad: data.squad,
        activeMissions: data.activeMissions.length,
        unreadNotifications: data.notifications.filter(n => !n.read).length,
        reputation: data.reputation,
        kdr: data.kdr
      };
    }

    return profile;
  }
};

// ============================================================
// 4. STRATEGIC MILITARY PROTOCOLS & HEAVY ORDNANCE
// ============================================================
const STRATEGIC_PROTOCOLS = {
  // Air Strike Designators
  airStrikes: {
    laser_guided_drone: {
      name: 'Laser-Guided Drone Strike',
      type: 'precision',
      cost: 500,
      callTime: 8, // seconds to arrive
      damage: 300,
      radius: 15,
      description: 'Operator paints target with laser designator. Supersonic stealth drone delivers precision munition.',
      visualEffect: 'laser_beam -> drone_approach -> explosion',
      destroysCover: true,
      tierRequired: 'Sergeant',
      waypointGuidance: false
    },
    carpet_bombing: {
      name: 'Carpet Bombing Run',
      type: 'area',
      cost: 1500,
      callTime: 20,
      damage: 200,
      radius: 80,
      description: 'B-2 stealth bomber levels entire city block. All cover in radius destroyed. Map permanently altered.',
      visualEffect: 'bomber_flyover -> multiple_explosions -> dust_cloud',
      destroysCover: true,
      permanentMapChange: true,
      tierRequired: 'Lieutenant',
      waypointGuidance: false
    },
    gunship_overwatch: {
      name: 'AC-130 Gunship Overwatch',
      type: 'sustained',
      cost: 2000,
      callTime: 15,
      duration: 60, // 60 seconds of gunship support
      damage: 150,
      radius: 100,
      description: 'AC-130 circles overhead for 60 seconds. Operator selects targets in real-time. 105mm howitzer, 40mm bofors, 25mm gatling.',
      visualEffect: 'gunship_circling -> tracer_fire -> target_explosions',
      destroysCover: true,
      tierRequired: 'Lieutenant',
      waypointGuidance: false
    },
    a10_warthog: {
      name: 'A-10 Warthog BRRRRT',
      type: 'anti_armor',
      cost: 1200,
      callTime: 12,
      damage: 400,
      radius: 40,
      description: 'A-10 Thunderbolt II strafing run with GAU-8 Avenger 30mm cannon. BRRRRT. Destroys all vehicles and armor.',
      visualEffect: 'a10_approach -> BRRRRT -> devastation',
      destroysCover: true,
      destroysVehicles: true,
      tierRequired: 'Sergeant',
      waypointGuidance: false
    }
  },

  // Cruise & Ballistic Missiles
  missileStrikes: {
    tomahawk_cruise: {
      name: 'Tomahawk Cruise Missile',
      type: 'cruise',
      cost: 3000,
      callTime: 30,
      damage: 800,
      radius: 30,
      description: 'Subsonic cruise missile launched from remote silo. Manual waypoint guidance — thread through urban canyons.',
      visualEffect: 'launch_trail -> waypoint_path -> impact',
      waypointGuidance: true,
      maxWaypoints: 8,
      tierRequired: 'Lieutenant',
      permanentMapChange: true
    },
    hypersonic_bolt: {
      name: 'Hypersonic Bolt Missile',
      type: 'hypersonic',
      cost: 8000,
      callTime: 5, // Mach 20, arrives fast
      damage: 1200,
      radius: 50,
      description: 'Mach 20 hypersonic glide vehicle. Too fast to intercept. No warning. Impact before sound arrives.',
      visualEffect: 'flash -> impact (no approach sound)',
      waypointGuidance: true,
      maxWaypoints: 3,
      interceptable: false,
      tierRequired: 'Captain',
      permanentMapChange: true
    },
    icbm_strike: {
      name: 'ICBM Strike',
      type: 'ballistic',
      cost: 15000,
      callTime: 45,
      damage: 5000,
      radius: 200,
      description: 'Intercontinental Ballistic Missile. Suborbital trajectory. Takes 45s. Devastates 200m radius. Triggers M.A.D. response.',
      visualEffect: 'vertical_launch -> arc_trajectory -> nuclear_explosion',
      waypointGuidance: false,
      interceptable: true,
      tierRequired: 'Captain',
      permanentMapChange: true,
      triggersMAD: true
    },
    mirv_strike: {
      name: 'MIRV Multi-Warhead Strike',
      type: 'ballistic',
      cost: 25000,
      callTime: 60,
      damage: 3000, // per warhead
      radius: 150, // per warhead
      warheads: 6, // 6 independent targets
      description: 'Multiple Independently Targetable Reentry Vehicle. 6 warheads, 6 different targets, 6 impacts. Like having 6 ICBMs.',
      visualEffect: 'launch -> split_into_6 -> 6_simultaneous_impacts',
      waypointGuidance: true,
      maxWaypoints: 6,
      tierRequired: 'General',
      permanentMapChange: true,
      triggersMAD: true
    }
  },

  // Submarine & Naval Warfare
  submarineWarfare: {
    attack_submarine: {
      name: 'Attack Submarine',
      type: 'submarine',
      cost: 5000,
      callTime: 20,
      damage: 600,
      radius: 25,
      description: 'Nuclear attack submarine surfaces offshore. Fires torpedoes at coastal targets and ships.',
      visualEffect: 'periscope -> torpedo_wake -> impact',
      tierRequired: 'Captain',
      navalOnly: true
    },
    ballistic_submarine: {
      name: 'Ballistic Missile Submarine (SSBN)',
      type: 'ssbn',
      cost: 12000,
      callTime: 40,
      damage: 2000,
      radius: 100,
      description: 'Stealth nuclear submarine launches subsurface-to-surface ballistic missiles. Silent. Undetectable until launch.',
      visualEffect: 'underwater_launch -> surface_breach -> ballistic_arc -> impact',
      tierRequired: 'Captain',
      interceptable: true,
      triggersMAD: true
    },
    torpedo_spread: {
      name: 'Acoustic Torpedo Spread',
      type: 'torpedo',
      cost: 2000,
      callTime: 15,
      damage: 800,
      radius: 40,
      description: 'Submarine fires 6 acoustic homing torpedoes. Track enemy ships and coastal installations by sound signature.',
      visualEffect: 'bubble_trails -> homing_tracks -> multiple_impacts',
      tierRequired: 'Lieutenant',
      navalOnly: true
    },
    depth_charge: {
      name: 'Depth Charge Barrage',
      type: 'depth',
      cost: 800,
      callTime: 5,
      damage: 400,
      radius: 30,
      description: 'Anti-submarine depth charges. Devastates underwater targets. Can collapse underwater bunkers.',
      visualEffect: 'splashes -> underwater_explosions -> shockwave',
      tierRequired: 'Sergeant'
    },
    naval_blockade: {
      name: 'Naval Blockade',
      type: 'blockade',
      cost: 6000,
      callTime: 60,
      duration: 300, // 5 minute blockade
      damage: 0,
      radius: 500,
      description: 'Fleet establishes naval blockade. No enemy naval units can operate in 500m coastal zone for 5 minutes.',
      visualEffect: 'fleet_deployment -> blockade_line',
      tierRequired: 'Captain',
      navalOnly: true
    }
  },

  // M.A.D. — Mutually Assured Destruction
  madProtocol: {
    name: 'M.A.D. Protocol',
    description: 'Mutually Assured Destruction. The ultimate strategic deterrent.',
    tiers: [
      {
        level: 1,
        name: 'DEFCON 2 — ALERT',
        effect: 'All factions receive nuclear launch warning. Bunker seals activate. 60s preparation.',
        trigger: 'ICBM or SSBN launched'
      },
      {
        level: 2,
        name: 'DEFCON 1 — IMMINENT',
        effect: 'All factions must choose: launch counter-strike OR seal bunkers. 30s decision window.',
        trigger: 'ICBM impact in 15s'
      },
      {
        level: 3,
        name: 'M.A.D. — ACTIVATION',
        effect: 'If no faction seals bunkers in time, ALL factions launch simultaneously. Total map annihilation. No winners.',
        trigger: 'No bunker seal in 30s'
      },
      {
        level: 4,
        name: 'BUNKER SEAL',
        effect: 'Factions that sealed bunkers survive underground. Surface is irradiated for 5 minutes. Must emerge to claim victory.',
        trigger: 'Bunker sealed before M.A.D.'
      },
      {
        level: 5,
        name: 'TOTAL ANNIHILATION',
        effect: 'No one sealed bunkers. Map is glass. Game ends. No winner. Everyone loses.',
        trigger: 'M.A.D. activated, no bunkers'
      }
    ],

    state: {
      active: false,
      currentLevel: 0,
      timer: 0,
      factionsSealed: [],
      launchedBy: null
    },

    initiate(initiatingFaction, strikeType) {
      if (this.state.active) return { success: false, error: 'M.A.D. already active' };

      this.state = {
        active: true,
        currentLevel: 1,
        timer: 60,
        factionsSealed: [],
        launchedBy: initiatingFaction,
        strikeType: strikeType || 'ICBM'
      };

      return {
        success: true,
        message: 'M.A.D. PROTOCOL INITIATED by ' + initiatingFaction,
        level: 1,
        timer: 60,
        allFactionsNotified: true,
        actionRequired: 'All factions: SEAL BUNKERS or PREPARE COUNTER-STRIKE'
      };
    },

    sealBunker(factionName) {
      if (!this.state.active) return { success: false };
      if (this.state.factionsSealed.includes(factionName)) return { success: false, error: 'Already sealed' };

      this.state.factionsSealed.push(factionName);

      return {
        success: true,
        faction: factionName,
        sealed: true,
        message: factionName + ' has sealed their bunker. Surviving underground.',
        sealedFactions: this.state.factionsSealed
      };
    },

    advance() {
      const s = this.state;
      if (!s.active) return null;

      s.timer -= 1;
      if (s.timer > 0) return { level: s.currentLevel, timer: s.timer };

      if (s.currentLevel === 1) {
        s.currentLevel = 2;
        s.timer = 30;
        return { level: 2, message: 'DEFCON 1 — IMMINENT. 30s to seal bunkers or launch counter-strike.' };
      }

      if (s.currentLevel === 2) {
        const sealed = s.factionsSealed.length;
        if (sealed === 0) {
          s.currentLevel = 5;
          s.timer = 0;
          return { level: 5, message: 'TOTAL ANNIHILATION. No one sealed bunkers. Everyone loses.' };
        } else {
          s.currentLevel = 4;
          s.timer = 300; // 5 min irradiation
          return {
            level: 4,
            message: 'BUNKER SEAL complete for ' + sealed + ' faction(s). Surface irradiated for 5 minutes.',
            sealedFactions: s.factionsSealed
          };
        }
      }

      if (s.currentLevel === 4) {
        s.timer -= 1;
        if (s.timer <= 0) {
          s.active = false;
          return { level: 0, message: 'Radiation cleared. Bunker factions emerge. Battle continues.' };
        }
        return { level: 4, timer: s.timer };
      }

      return null;
    },

    reset() {
      this.state = {
        active: false,
        currentLevel: 0,
        timer: 0,
        factionsSealed: [],
        launchedBy: null
      };
    }
  },

  // Deep-sea subsurface maps
  navalMaps: {
    coastal_waters: {
      name: 'Coastal Waters',
      depth: 'shallow',
      submarines: 2,
      surfaceVessels: 4,
      description: 'Shallow coastal waters with naval patrols',
      sonarEffective: true
    },
    deep_ocean: {
      name: 'Deep Ocean Theater',
      depth: 'abyssal',
      submarines: 6,
      surfaceVessels: 2,
      description: 'Deep ocean. Stealth submarines hunt in darkness. Surface vessels are vulnerable.',
      sonarEffective: true,
      thermalLayers: true // submarines can hide under thermal layers
    },
    arctic_ice: {
      name: 'Arctic Sub-Ice Theater',
      depth: 'deep',
      submarines: 4,
      surfaceVessels: 0,
      description: 'Under ice sheet. No surface vessels. Submarines only. Sonar distorted by ice.',
      sonarEffective: false,
      iceCaves: true
    },
    strait_choke: {
      name: 'Strait Choke Point',
      depth: 'variable',
      submarines: 3,
      surfaceVessels: 6,
      description: 'Narrow strait. All naval traffic must pass through. Perfect for ambush.',
      sonarEffective: true,
      chokepoint: true
    }
  }
};

// ============================================================
// 5. STRATEGIC COMMAND ARRAYS — What commanders can call in
// ============================================================
const COMMAND_ARRAYS = {
  // What each commander tier can authorize
  getAvailableStrikes(commanderTier) {
    const tierStrikes = {
      0: ['laser_guided_drone'],
      1: ['laser_guided_drone', 'a10_warthog', 'gunship_overwatch'],
      2: ['laser_guided_drone', 'a10_warthog', 'gunship_overwatch', 'carpet_bombing', 'tomahawk_cruise', 'torpedo_spread', 'depth_charge'],
      3: ['laser_guided_drone', 'a10_warthog', 'gunship_overwatch', 'carpet_bombing', 'tomahawk_cruise', 'hypersonic_bolt', 'attack_submarine', 'torpedo_spread', 'depth_charge', 'naval_blockade', 'icbm_strike', 'ballistic_submarine'],
      4: ['ALL']
    };

    const available = tierStrikes[commanderTier] || ['laser_guided_drone'];
    if (available.includes('ALL')) return 'All strikes unlocked';

    const strikes = {};
    available.forEach(s => {
      if (STRATEGIC_PROTOCOLS.airStrikes[s]) strikes[s] = STRATEGIC_PROTOCOLS.airStrikes[s];
      if (STRATEGIC_PROTOCOLS.missileStrikes[s]) strikes[s] = STRATEGIC_PROTOCOLS.missileStrikes[s];
      if (STRATEGIC_PROTOCOLS.submarineWarfare[s]) strikes[s] = STRATEGIC_PROTOCOLS.submarineWarfare[s];
    });

    return strikes;
  },

  // Call in a strike
  callStrike(commanderTier, strikeId, targetCoords, waypoints) {
    const available = this.getAvailableStrikes(commanderTier);
    if (available === 'All strikes unlocked' || available[strikeId]) {
      let strike = null;
      if (STRATEGIC_PROTOCOLS.airStrikes[strikeId]) strike = STRATEGIC_PROTOCOLS.airStrikes[strikeId];
      else if (STRATEGIC_PROTOCOLS.missileStrikes[strikeId]) strike = STRATEGIC_PROTOCOLS.missileStrikes[strikeId];
      else if (STRATEGIC_PROTOCOLS.submarineWarfare[strikeId]) strike = STRATEGIC_PROTOCOLS.submarineWarfare[strikeId];

      if (strike) {
        if (strike.triggersMAD) {
          STRATEGIC_PROTOCOLS.madProtocol.initiate('Commander', strike.type);
        }

        return {
          success: true,
          strike: strike.name,
          callTime: strike.callTime + 's',
          damage: strike.damage,
          radius: strike.radius + 'm',
          waypoints: waypoints || 'none',
          permanentMapChange: strike.permanentMapChange || false,
          madTriggered: strike.triggersMAD || false
        };
      }
    }
    return { success: false, error: 'Strike not available at this tier' };
  }
};

// ============================================================
// EXPORTS
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COIN_PER_DOLLAR,
    CAREER_PATHS_EXPANDED,
    CAREER_ADMIN,
    MULTI_NATION,
    STRATEGIC_PROTOCOLS,
    COMMAND_ARRAYS
  };
}
