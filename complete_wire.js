/**
 * OMEGA-8D COMPLETE WIRING — All missing connections in one file
 * 1. Weapon shop → backend (spendBalance)
 * 2. Achievements → backend (PlayerProfile entity)
 * 3. Career paths → backend (PlayerProfile entity)
 * 4. VR arcade → complete integration
 * 5. Netcode sync → oceanic + orbital + submarine
 * 6. Recruitment banners → backend
 * 7. War ecosystem → backend
 * 8. Everything connected through system_bridge
 */

const COMPLETE_WIRE = {

  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Wire all systems
    this.wireWeaponShop();
    this.wireAchievements();
    this.wireCareerPaths();
    this.wireRecruitment();
    this.wireVRArcade();
    this.wireNetcode();
    this.wireWarEcosystem();
    this.wireDoomsdaySurvival();

    console.log('[OMEGA-8D] Complete wiring done — all systems connected');
  },

  // ============ 1. WEAPON SHOP → BACKEND ============
  wireWeaponShop() {
    // Create weapon shop data from gamedata
    if (typeof WEAPONS === 'undefined' && typeof GameData === 'undefined') return;

    const weapons = (typeof WEAPONS !== 'undefined' ? WEAPONS : null) ||
                    (typeof GameData !== 'undefined' && GameData.weapons ? GameData.weapons : null) ||
                    [];

    if (!weapons.length) return;

    // Build shop catalog with prices
    this.shopCatalog = weapons.map(w => ({
      id: w.id || w.name,
      name: w.name || w.id,
      era: w.era || 'Modern',
      damage: w.damage || 50,
      fireRate: w.fireRate || 10,
      range: w.range || 100,
      price: this._calcWeaponPrice(w),
      icon: this._weaponIcon(w),
      category: w.category || 'primary',
    }));

    // Shop purchase function
    window.omegaBuyWeapon = async function(weaponId) {
      const weapon = COMPLETE_WIRE.shopCatalog.find(w => w.id === weaponId);
      if (!weapon) return;

      // Check free mode
      const monet = await OMEGA.call('WALLET', 'getMonetizationStatus', {});
      if (monet.success && monet.freeMode) {
        // Free mode — give weapon instantly
        if (typeof GAME !== 'undefined' && GAME.player) {
          GAME.player.weapons = GAME.player.weapons || [];
          GAME.player.weapons.push(weapon);
          if (window.omegaToast) window.omegaToast('FREE: ' + weapon.name + ' acquired!');
        }
        return;
      }

      // Paid mode — check balance
      const pid = OMEGA.player.playerId;
      if (!pid) return;

      const wallet = await OMEGA.wallet.getBalance();
      if (!wallet.success || (wallet.wallet.balanceUSD || 0) < weapon.price) {
        if (window.omegaToast) window.omegaToast('Insufficient balance. Need $' + weapon.price);
        return;
      }

      const r = await OMEGA.wallet.spend(weapon.price, weapon.name);
      if (r.success) {
        if (typeof GAME !== 'undefined' && GAME.player) {
          GAME.player.weapons = GAME.player.weapons || [];
          GAME.player.weapons.push(weapon);
        }
        if (window.omegaToast) window.omegaToast('Purchased ' + weapon.name + ' for $' + weapon.price);

        // Update profile
        await OMEGA.map.updateProfile({
          weapons: weapon.name,
          coins: -(weapon.price),
        });
      } else {
        if (window.omegaToast) window.omegaToast('Purchase failed: ' + r.error);
      }
    };

    // Buy ammo
    window.omegaBuyAmmo = async function(weaponId, amount) {
      const cost = (amount || 100) * 0.01; // $0.01 per round

      const monet = await OMEGA.call('WALLET', 'getMonetizationStatus', {});
      if (monet.success && monet.freeMode) {
        if (window.omegaToast) window.omegaToast('FREE: Ammo refilled!');
        return;
      }

      const r = await OMEGA.wallet.spend(cost, 'Ammo x' + (amount || 100));
      if (r.success) {
        if (window.omegaToast) window.omegaToast('Ammo purchased for $' + cost.toFixed(2));
      } else {
        if (window.omegaToast) window.omegaToast('Failed: ' + r.error);
      }
    };

    console.log('[OMEGA-8D] Weapon shop wired — ' + this.shopCatalog.length + ' weapons with prices');
  },

  _calcWeaponPrice(w) {
    const eraMultipliers = {
      'Stone Age': 1, 'Bronze Age': 2, 'Iron Age': 3, 'Medieval': 5,
      'Renaissance': 8, 'Industrial': 12, 'WW1': 15, 'WW2': 18,
      'Modern': 25, 'Near Future': 40, 'Deep Future': 60, '30th Century': 100,
    };
    const base = 5;
    const eraMult = eraMultipliers[w.era] || 25;
    const dmgMult = (w.damage || 50) / 50;
    return Math.round(base * eraMult * dmgMult);
  },

  _weaponIcon(w) {
    const cat = (w.category || '').toLowerCase();
    if (cat.includes('sniper')) return '🎯';
    if (cat.includes('pistol') || cat.includes('sidearm')) return '🔫';
    if (cat.includes('rocket') || cat.includes('missile')) return '🚀';
    if (cat.includes('grenade') || cat.includes('explosive')) return '💣';
    if (cat.includes('knife') || cat.includes('melee')) return '🔪';
    if (cat.includes('shotgun')) return '💥';
    if (cat.includes('laser') || cat.includes('plasma')) return '⚡';
    if (cat.includes('orbital') || cat.includes('kinetic')) return '🛰️';
    return '🔫';
  },

  // ============ 2. ACHIEVEMENTS → BACKEND ============
  wireAchievements() {
    if (typeof ACHIEVEMENTS === 'undefined') return;

    // Sync achievements to player profile
    window.omegaSyncAchievements = async function(playerId, unlockedAchievements) {
      const pid = playerId || OMEGA.player.playerId;
      if (!pid) return;

      const profile = await OMEGA.map.getPlayer(pid);
      if (!profile.success) return;

      const existing = profile.player?.achievements || [];
      const newOnes = unlockedAchievements.filter(a => !existing.includes(a.id || a));

      if (newOnes.length > 0) {
        await OMEGA.map.updateProfile({
          achievements: [...existing, ...newOnes.map(a => a.id || a)],
        });
        console.log('[OMEGA-8D] Synced ' + newOnes.length + ' achievements to backend');
      }
    };

    // Unlock achievement
    window.omegaUnlockAchievement = async function(achievementId) {
      const pid = OMEGA.player.playerId;
      if (!pid) return;

      // Check if already unlocked
      const profile = await OMEGA.map.getPlayer(pid);
      if (!profile.success) return;
      const existing = profile.player?.achievements || [];
      if (existing.includes(achievementId)) return;

      // Unlock
      existing.push(achievementId);
      await OMEGA.map.updateProfile({ achievements: existing });

      // Show notification
      if (typeof ACHIEVEMENTS !== 'undefined' && ACHIEVEMENTS[achievementId]) {
        const ach = ACHIEVEMENTS[achievementId];
        COMPLETE_WIRE._showAchievementPopup(ach);
      }

      // Update AI behavior
      await OMEGA.ai.updateBehavior({ learnedPattern: 'achievement:' + achievementId });
    };

    console.log('[OMEGA-8D] Achievements wired to backend');
  },

  _showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;background:linear-gradient(135deg,#13132a,#0d0d1a);border:2px solid #ffaa00;border-radius:14px;padding:16px 28px;text-align:center;animation:fadeIn 0.5s;max-width:90%';
    popup.innerHTML = `
      <div style="font-size:32px">${achievement.icon || '🏆'}</div>
      <div style="font-size:16px;font-weight:700;color:#ffaa00;margin:4px 0">ACHIEVEMENT UNLOCKED</div>
      <div style="font-size:14px;color:#e0e0e0">${achievement.name || achievement.id}</div>
      <div style="font-size:11px;color:#888;margin-top:2px">${achievement.desc || ''}</div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => { popup.style.opacity = '0'; popup.style.transition = 'opacity 0.5s'; setTimeout(() => popup.remove(), 500); }, 4000);
  },

  // ============ 3. CAREER PATHS → BACKEND ============
  wireCareerPaths() {
    const careers = (typeof CAREERS !== 'undefined' ? CAREERS : null) ||
                    (typeof GameData !== 'undefined' && GameData.careers ? GameData.careers : null) ||
                    [
                      { id: 'hacker', name: 'Cyber Hacker', icon: '💻', desc: 'Hack enemy systems, disable turrets, control ARIA' },
                      { id: 'sniper', name: 'Sniper', icon: '🎯', desc: 'Long-range elimination, reconnaissance, overwatch' },
                      { id: 'medic', name: 'Combat Medic', icon: '💊', desc: 'Revive teammates, heal, doomsday survival' },
                      { id: 'engineer', name: 'Engineer', icon: '🔧', desc: 'Build fortifications, hard-light barriers, pocket dimensions' },
                      { id: 'pilot', name: 'Pilot', icon: '🚁', desc: 'Fly vehicles, orbital drops, submarine ops' },
                      { id: 'heavy', name: 'Heavy Gunner', icon: '🛡️', desc: 'Suppressing fire, tank operations, shield deployment' },
                      { id: 'recon', name: 'Recon', icon: '🔭', desc: 'Stealth, intel gathering, OSINT/MANSINT/WARSINT' },
                      { id: 'commander', name: 'Commander', icon: '🎖️', desc: 'Call strikes, coordinate squads, deploy banishment' },
                      { id: 'demolitions', name: 'Demolitions', icon: '💣', desc: 'Explosives, breaching, terrain destruction' },
                    ];

    this.careers = careers;

    // Set career on backend
    window.omegaSetCareer = async function(careerId) {
      const pid = OMEGA.player.playerId;
      if (!pid) return;

      const career = COMPLETE_WIRE.careers.find(c => c.id === careerId);
      if (!career) return;

      // Check if player can have this career (based on tier)
      const profile = await OMEGA.map.getPlayer(pid);
      const existingCareers = profile.success ? (profile.player?.careers || []) : [];

      // Add career
      if (!existingCareers.includes(careerId)) {
        existingCareers.push(careerId);
        await OMEGA.map.updateProfile({
          careers: existingCareers,
          primaryCareer: careerId,
        });

        if (window.omegaToast) window.omegaToast('Career unlocked: ' + career.name + ' ' + career.icon);
      }

      // Update AI behavior with career
      await OMEGA.ai.updateBehavior({ playstyle: careerId });
    };

    // Get player careers from backend
    window.omegaGetCareers = async function() {
      const pid = OMEGA.player.playerId;
      if (!pid) return [];

      const profile = await OMEGA.map.getPlayer(pid);
      if (!profile.success) return [];

      const careerIds = profile.player?.careers || [];
      return COMPLETE_WIRE.careers.filter(c => careerIds.includes(c.id));
    };

    console.log('[OMEGA-8D] Career paths wired — ' + careers.length + ' careers available');
  },

  // ============ 4. VR ARCADE → COMPLETE ============
  wireVRArcade() {
    if (typeof VR_INTEL === 'undefined' && typeof VRArcade === 'undefined') return;

    const headsets = [
      { id: 'quest3', name: 'Meta Quest 3', fov: 110, refreshRate: 120, resolution: '2064x2208', tracking: '6DoF inside-out', hand: true, eye: false },
      { id: 'quest3s', name: 'Meta Quest 3S', fov: 96, refreshRate: 120, resolution: '1832x1920', tracking: '6DoF', hand: true, eye: false },
      { id: 'pimax', name: 'Pimax Crystal', fov: 140, refreshRate: 120, resolution: '2880x2880', tracking: '6DoF lighthouse', hand: true, eye: true },
      { id: 'visionpro', name: 'Apple Vision Pro', fov: 100, refreshRate: 90, resolution: '3660x3200', tracking: '6DoF inside-out', hand: true, eye: true },
      { id: 'psvr2', name: 'PSVR2', fov: 110, refreshRate: 120, resolution: '2000x2040', tracking: '6DoF inside-out', hand: true, eye: true, haptics: true, adaptiveTriggers: true },
      { id: 'vivepro2', name: 'HTC Vive Pro 2', fov: 120, refreshRate: 120, resolution: '2448x2448', tracking: '6DoF lighthouse', hand: true, eye: false },
      { id: 'index', name: 'Valve Index', fov: 130, refreshRate: 144, resolution: '1832x1920', tracking: '6DoF lighthouse', hand: true, eye: false, fingerTracking: true },
      { id: 'bigscreen', name: 'Bigscreen Beyond', fov: 110, refreshRate: 90, resolution: '2560x2560', tracking: '6DoF lighthouse', hand: true, eye: true },
      { id: 'reverb', name: 'HP Reverb G2', fov: 114, refreshRate: 90, resolution: '2160x2160', tracking: '6DoF inside-out', hand: true, eye: false },
    ];

    this.vrHeadsets = headsets;

    // VR session manager
    window.omegaVRConnect = async function(headsetId) {
      const headset = COMPLETE_WIRE.vrHeadsets.find(h => h.id === headsetId);
      if (!headset) return;

      // Check VR support
      if (!navigator.xr) {
        if (window.omegaToast) window.omegaToast('VR not supported on this device. Try desktop VR headset.');
        return { success: false, error: 'WebXR not available' };
      }

      try {
        const session = await navigator.xr.requestSession('immersive-vr', {
          optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'],
        });

        COMPLETE_WIRE.vrSession = session;
        if (window.omegaToast) window.omegaToast('VR connected: ' + headset.name + ' (' + headset.fov + '° FOV)');

        // Configure VR rendering
        if (typeof RealisticRender !== 'undefined') {
          RealisticRender.config.vrMode = true;
          RealisticRender.config.vrHeadset = headset;
        }

        return { success: true, headset, session };
      } catch (e) {
        // Fallback: simulate VR mode (for development/testing)
        if (window.omegaToast) window.omegaToast('VR simulation: ' + headset.name);
        COMPLETE_WIRE.vrSession = { simulated: true, headset };
        return { success: true, simulated: true, headset };
      }
    };

    // VR disconnect
    window.omegaVRDisconnect = function() {
      if (COMPLETE_WIRE.vrSession) {
        if (COMPLETE_WIRE.vrSession.end) COMPLETE_WIRE.vrSession.end();
        COMPLETE_WIRE.vrSession = null;
        if (typeof RealisticRender !== 'undefined') {
          RealisticRender.config.vrMode = false;
          RealisticRender.config.vrHeadset = null;
        }
        if (window.omegaToast) window.omegaToast('VR disconnected');
      }
    };

    // VR arcade mode (multiplayer VR arena)
    window.omegaStartVRArcade = async function(headsetId, mode) {
      const connect = await window.omegaVRConnect(headsetId);
      if (!connect.success) return;

      // Start game mode in VR
      if (typeof GameModes !== 'undefined') {
        const modeId = mode || 'void_horde'; // Default VR mode
        GameModes.selectMode(modeId);
      }

      // Multi-device login for VR
      const pid = OMEGA.player.playerId;
      if (pid) {
        await OMEGA.ai.loginDevice('vr_' + headsetId, 'VR Headset', 'vr');
      }

      return { success: true, headset: connect.headset, mode: mode || 'void_horde' };
    };

    console.log('[OMEGA-8D] VR arcade wired — ' + headsets.length + ' headsets supported');
  },

  // ============ 5. NETCODE SYNC → OCEANIC + ORBITAL + SUBMARINE ============
  wireNetcode() {
    // Network sync system for multi-domain warfare
    this.netcode = {
      // Connection state
      connected: false,
      ping: 0,
      players: new Map(),
      events: [],

      // Sync domains
      domains: {
        surface: { active: true, latency: 0 },      // Standard ground combat
        subsurface: { active: false, latency: 50 }, // Submarine/oceanic warfare
        atmospheric: { active: false, latency: 30 }, // HAHO/stratospheric
        orbital: { active: false, latency: 100 },   // Kinetic bombardment
        void: { active: false, latency: 200 },      // Void dimension
        cosmic: { active: false, latency: 500 },    // Cosmic dimension
      },

      // Event types
      eventTypes: {
        // Surface events
        'player_move': { priority: 1, sync: 'realtime', maxDelay: 50 },
        'player_shoot': { priority: 1, sync: 'realtime', maxDelay: 30 },
        'player_death': { priority: 0, sync: 'immediate', maxDelay: 0 },
        'player_damage': { priority: 1, sync: 'realtime', maxDelay: 50 },

        // Subsurface events
        'submarine_move': { priority: 2, sync: 'throttled', maxDelay: 100 },
        'submarine_sonar': { priority: 3, sync: 'throttled', maxDelay: 200 },
        'submarine_launch': { priority: 1, sync: 'immediate', maxDelay: 0 },
        'uuv_deploy': { priority: 2, sync: 'throttled', maxDelay: 100 },
        'cable_sever': { priority: 1, sync: 'immediate', maxDelay: 0 },

        // Atmospheric events
        'haho_jump': { priority: 2, sync: 'throttled', maxDelay: 100 },
        'haho_land': { priority: 1, sync: 'immediate', maxDelay: 0 },
        'airdrop_supply': { priority: 3, sync: 'throttled', maxDelay: 200 },

        // Orbital events
        'orbital_strike_call': { priority: 0, sync: 'immediate', maxDelay: 0 },
        'orbital_rod_drop': { priority: 0, sync: 'immediate', maxDelay: 0 },
        'kinetic_impact': { priority: 0, sync: 'immediate', maxDelay: 0 },
        'satellite_hack': { priority: 1, sync: 'immediate', maxDelay: 50 },

        // Dimensional events
        'dimensional_shift': { priority: 1, sync: 'immediate', maxDelay: 0 },
        'banishment': { priority: 0, sync: 'immediate', maxDelay: 0 },
        'warp_back': { priority: 0, sync: 'immediate', maxDelay: 0 },
        'pocket_dimension': { priority: 2, sync: 'throttled', maxDelay: 100 },

        // Cognitive warfare
        'cognitive_pulse': { priority: 2, sync: 'throttled', maxDelay: 200 },
        'behavioral_learn': { priority: 3, sync: 'batched', maxDelay: 1000 },

        // Legacy/terrain
        'terrain_modify': { priority: 1, sync: 'immediate', maxDelay: 0 },
        'permanent_damage': { priority: 0, sync: 'immediate', maxDelay: 0 },
      },

      // Sync event
      syncEvent(eventType, data) {
        const config = this.eventTypes[eventType];
        if (!config) return;

        const event = {
          type: eventType,
          data,
          timestamp: Date.now(),
          priority: config.priority,
          playerId: OMEGA?.player?.playerId,
        };

        // Route to appropriate domain
        let domain = 'surface';
        if (eventType.startsWith('submarine') || eventType.startsWith('uuv') || eventType === 'cable_sever') domain = 'subsurface';
        else if (eventType.startsWith('haho') || eventType === 'airdrop_supply') domain = 'atmospheric';
        else if (eventType.startsWith('orbital') || eventType === 'kinetic_impact') domain = 'orbital';
        else if (eventType.includes('void') || eventType === 'banishment') domain = 'void';
        else if (eventType.includes('cosmic') || eventType === 'warp_back') domain = 'cosmic';

        const domConfig = this.domains[domain];
        if (!domConfig.active) this.activateDomain(domain);

        // Store event
        this.events.push(event);
        if (this.events.length > 1000) this.events.shift();

        // Sync to backend (for permanent events)
        if (config.sync === 'immediate' && (eventType === 'terrain_modify' || eventType === 'permanent_damage' || eventType === 'kinetic_impact' || eventType === 'cable_sever')) {
          this.syncToBackend(event);
        }

        return event;
      },

      activateDomain(domain) {
        if (this.domains[domain]) {
          this.domains[domain].active = true;
          console.log('[OMEGA-8D Netcode] Domain activated:', domain);
        }
      },

      async syncToBackend(event) {
        if (typeof OMEGA === 'undefined' || !OMEGA.player.playerId) return;

        // Permanent terrain changes → MapModification entity
        if (event.type === 'terrain_modify' || event.type === 'permanent_damage' || event.type === 'kinetic_impact') {
          await OMEGA.map.modifyZone(
            event.data.zoneId || 'default',
            event.type,
            event.data.coords || { x: 0, y: 0 },
            event.data.radius || 50
          );
        }

        // Cable sever → affects server grid
        if (event.type === 'cable_sever') {
          console.log('[OMEGA-8D Netcode] Undersea cable severed — regional grid blackout');
          this.domains.surface.latency += 200; // Latency spike
        }

        // Orbital strike → permanent crater
        if (event.type === 'kinetic_impact') {
          console.log('[OMEGA-8D Netcode] Orbital kinetic impact — permanent terrain change');
        }
      },

      // Get network status
      getStatus() {
        const activeDomains = Object.entries(this.domains).filter(([k, v]) => v.active).map(([k]) => k);
        return {
          connected: this.connected,
          ping: this.ping,
          activeDomains,
          eventCount: this.events.length,
          players: this.players.size,
        };
      },

      // Simulate connection (for development)
      connect() {
        this.connected = true;
        this.ping = Math.floor(Math.random() * 30) + 10;
        console.log('[OMEGA-8D Netcode] Connected — ping:', this.ping, 'ms');
        return this.getStatus();
      },
    };

    // Global netcode functions
    window.omegaNetSync = function(eventType, data) {
      return COMPLETE_WIRE.netcode.syncEvent(eventType, data);
    };

    window.omegaNetStatus = function() {
      return COMPLETE_WIRE.netcode.getStatus();
    };

    window.omegaNetConnect = function() {
      return COMPLETE_WIRE.netcode.connect();
    };

    // Simulate netcode connection
    this.netcode.connect();

    console.log('[OMEGA-8D] Netcode wired — ' + Object.keys(this.netcode.eventTypes).length + ' event types, 6 domains');
  },

  // ============ 6. RECRUITMENT BANNERS → BACKEND ============
  wireRecruitment() {
    window.omegaCreateRecruitment = async function(bannerData) {
      const pid = OMEGA.player.playerId;
      if (!pid) return;

      const banner = {
        bannerId: 'RBN-' + Date.now(),
        campaignName: bannerData.campaignName || 'Unnamed Campaign',
        commander: pid,
        country: bannerData.country || 'Nigeria',
        description: bannerData.description || '',
        requirements: bannerData.requirements || '',
        type: bannerData.type || 'army', // army, navy, airforce, special, hacker
        status: 'active',
        applicants: [],
        createdAt: new Date().toISOString(),
      };

      const r = await OMEGA.call('MAP', 'createRecruitment', banner);
      if (r.success) {
        if (window.omegaToast) window.omegaToast('Recruitment banner created!');
      }
      return r;
    };

    window.omegaGetRecruitments = async function() {
      // Read from RecruitmentBanner entity
      return await OMEGA.call('MAP', 'getRecruitments', {});
    };

    window.omegaApplyRecruitment = async function(bannerId, applicantData) {
      const r = await OMEGA.call('MAP', 'applyRecruitment', {
        bannerId,
        playerId: OMEGA.player.playerId,
        ...applicantData,
      });
      return r;
    };

    console.log('[OMEGA-8D] Recruitment banners wired to backend');
  },

  // ============ 7. WAR ECOSYSTEM → BACKEND ============
  wireWarEcosystem() {
    // War ecosystem connects all warfare domains
    this.warEcosystem = {
      // Active war zones
      zones: new Map(),

      // Register a war zone
      async registerZone(zoneData) {
        if (typeof OMEGA !== 'undefined' && OMEGA.player.playerId) {
          const r = await OMEGA.map.createZone(
            zoneData.name,
            zoneData.lat,
            zoneData.lng,
            zoneData.country
          );
          if (r.success) {
            this.zones.set(r.zone?.id || r.zone?.zoneId, zoneData);
            return r;
          }
        }
        return { success: false };
      },

      // Get all active zones
      getActiveZones() {
        return Array.from(this.zones.values());
      },

      // Escalate threat level
      escalateThreat(zoneId, level) {
        const zone = this.zones.get(zoneId);
        if (zone) {
          zone.threatLevel = level;
          console.log('[OMEGA-8D] Threat escalated in', zone.name, 'to level', level);
        }
      },

      // Trigger permanent terrain change
      async permanentChange(zoneId, changeType, coords, radius) {
        if (typeof OMEGA !== 'undefined') {
          return await OMEGA.map.modifyZone(zoneId, changeType, coords, radius);
        }
      },

      // Submarine operations
      async submarineOp(zoneId, operation) {
        // operation: 'deploy_uuv', 'sever_cable', 'launch_missile', 'sonar_ping'
        const event = COMPLETE_WIRE.netcode.syncEvent('submarine_' + operation, {
          zoneId, operation, timestamp: Date.now(),
        });

        if (operation === 'sever_cable') {
          await this.permanentChange(zoneId, 'cable_sever', { x: 0, y: 0 }, 100);
        }
        if (operation === 'launch_missile') {
          await this.permanentChange(zoneId, 'missile_strike', { x: 0, y: 0 }, 200);
        }

        return event;
      },

      // Orbital kinetic strike
      async orbitalStrike(zoneId, targetCoords, rodType) {
        const event = COMPLETE_WIRE.netcode.syncEvent('orbital_rod_drop', {
          zoneId, target: targetCoords, rodType, timestamp: Date.now(),
        });

        // Mach 10 impact — permanent crater
        await this.permanentChange(zoneId, 'kinetic_impact', targetCoords, 500);
        COMPLETE_WIRE.netcode.syncEvent('kinetic_impact', { zoneId, coords: targetCoords });

        return event;
      },

      // HAHO infiltration
      async hahoInsertion(zoneId, dropCoords) {
        return COMPLETE_WIRE.netcode.syncEvent('haho_jump', {
          zoneId, drop: dropCoords, timestamp: Date.now(),
        });
      },

      // Cognitive warfare
      cognitiveAttack(zoneId, attackType) {
        return COMPLETE_WIRE.netcode.syncEvent('cognitive_pulse', {
          zoneId, type: attackType, timestamp: Date.now(),
        });
      },
    };

    // Global functions
    window.omegaWarZone = this.warEcosystem;
    window.omegaSubmarineOp = function(zoneId, op) { return COMPLETE_WIRE.warEcosystem.submarineOp(zoneId, op); };
    window.omegaOrbitalStrike = function(zoneId, coords, rod) { return COMPLETE_WIRE.warEcosystem.orbitalStrike(zoneId, coords, rod); };
    window.omegaHAHO = function(zoneId, coords) { return COMPLETE_WIRE.warEcosystem.hahoInsertion(zoneId, coords); };
    window.omegaCognitiveAttack = function(zoneId, type) { return COMPLETE_WIRE.warEcosystem.cognitiveAttack(zoneId, type); };

    console.log('[OMEGA-8D] War ecosystem wired — submarine, orbital, HAHO, cognitive ops connected');
  },

  // ============ 8. DOOMSDAY SURVIVAL → BACKEND ============
  wireDoomsdaySurvival() {
    window.omegaCheckSurvival = async function() {
      const pid = OMEGA.player.playerId;
      if (!pid) return { survives: false };

      const r = await OMEGA.ai.checkDoomsdaySurvival();
      if (r.success && r.survives) {
        if (window.omegaToast) window.omegaToast('You survive doomsday outside bunker!');
      } else {
        if (window.omegaToast) window.omegaToast('No survival traits — find a bunker!');
      }
      return r;
    };

    console.log('[OMEGA-8D] Doomsday survival wired to backend');
  },

  // ============ COMPLETE STATUS REPORT ============
  getStatus() {
    return {
      weaponShop: !!window.omegaBuyWeapon,
      achievements: !!window.omegaUnlockAchievement,
      careerPaths: !!window.omegaSetCareer,
      vrArcade: !!window.omegaVRConnect,
      netcode: !!window.omegaNetSync,
      recruitment: !!window.omegaCreateRecruitment,
      warEcosystem: !!window.omegaWarZone,
      doomsdaySurvival: !!window.omegaCheckSurvival,
      freeMode: true,
      rendering4K: typeof RealisticRender !== 'undefined',
      comboReference: typeof COMBOS_PANEL !== 'undefined',
      gameModes: typeof GameModes !== 'undefined',
      systemBridge: typeof OMEGA !== 'undefined',
      adminAuth: typeof OMEGA !== 'undefined' && !!OMEGA.admin,
    };
  },
};

// Auto-init when OMEGA is ready
window.addEventListener('omegaReady', () => COMPLETE_WIRE.init());

// Also init if OMEGA already exists
if (typeof OMEGA !== 'undefined' && OMEGA.player.playerId) {
  COMPLETE_WIRE.init();
}

// Also init on DOMContentLoaded as fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => COMPLETE_WIRE.init(), 2000); // Wait for other scripts
  });
} else {
  setTimeout(() => COMPLETE_WIRE.init(), 2000);
}

if (typeof window !== 'undefined') window.COMPLETE_WIRE = COMPLETE_WIRE;
if (typeof module !== 'undefined' && module.exports) module.exports = COMPLETE_WIRE;