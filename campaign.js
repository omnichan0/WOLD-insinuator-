// ====== CHRONOFALL — 6D Campaign & Quantum System ======
// Adds on top of the base game:
// - 6th Dimension: Quantum Shift (3 parallel realities)
// - Level/Step/Strap progression (232 levels × 13 steps × 4 straps)
// - Mission tracking & completion
// - Era-based visual theming
// - Weapon database integration

// ====== 6D QUANTUM SYSTEM ======
const QUANTUM_STATES = 3;
let currentQuantumState = 0;
let quantumShiftCD = 0;
let quantumMaxCD = 5000;

// Visual settings per quantum state
const QUANTUM_VISUALS = [
  { fog: 0x0a0a2e, ambient: 0x404080, ground: 0x1a1a3e, accent: 0x00f5ff, name: 'ALPHA' },
  { fog: 0x2e0a0a, ambient: 0x804040, ground: 0x3e1a1a, accent: 0xff0044, name: 'BETA' },
  { fog: 0x0a2e0a, ambient: 0x408040, ground: 0x1a3e1a, accent: 0x00ff88, name: 'GAMMA' },
];

function initQuantumSystem() {
  // Add quantum state indicator to HUD
  const hud = document.getElementById('hud');
  const qDiv = document.createElement('div');
  qDiv.id = 'quantumDisplay';
  qDiv.style.cssText = 'position:fixed;top:80px;left:20px;z-index:51;text-align:center;';
  qDiv.innerHTML = `
    <div style="color:#ff00e6;font-size:0.6em;letter-spacing:2px;margin-bottom:5px;">QUANTUM STATE (6D)</div>
    <div id="quantumStates" style="display:flex;gap:5px;">
      <div class="q-state active" data-q="0" style="width:30px;height:30px;border-radius:6px;background:rgba(0,245,255,0.3);border:2px solid #00f5ff;display:flex;align-items:center;justify-content:center;font-size:0.7em;color:#00f5ff;font-weight:bold;">Q1</div>
      <div class="q-state" data-q="1" style="width:30px;height:30px;border-radius:6px;background:rgba(255,0,68,0.05);border:2px solid rgba(255,0,68,0.3);display:flex;align-items:center;justify-content:center;font-size:0.7em;color:#666;font-weight:bold;">Q2</div>
      <div class="q-state" data-q="2" style="width:30px;height:30px;border-radius:6px;background:rgba(0,255,136,0.05);border:2px solid rgba(0,255,136,0.3);display:flex;align-items:center;justify-content:center;font-size:0.7em;color:#666;font-weight:bold;">Q3</div>
    </div>
    <div id="quantumCD" style="margin-top:5px;width:96px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">
      <div id="quantumCDFill" style="height:100%;background:#ff00e6;width:100%;transition:width 0.1s;"></div>
    </div>
    <div style="color:#555;font-size:0.5em;margin-top:3px;">[X] or Gamepad Select</div>
  `;
  hud.appendChild(qDiv);

  // Add quantum shift key
  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyX' && gameState === 'playing') quantumShift();
  });
}

function quantumShift() {
  if (quantumShiftCD > 0) return;
  if (gameState !== 'playing') return;

  currentQuantumState = (currentQuantumState + 1) % QUANTUM_STATES;
  quantumShiftCD = quantumMaxCD;

  // Update visuals
  const qv = QUANTUM_VISUALS[currentQuantumState];
  if (scene.fog) scene.fog.color.setHex(qv.fog);
  scene.background.setHex(qv.fog);

  // Update ambient light
  scene.traverse((obj) => {
    if (obj.isAmbientLight) obj.color.setHex(qv.ambient);
  });

  // Update grid color
  scene.traverse((obj) => {
    if (obj.isGridHelper) {
      obj.material.color.setHex(qv.accent);
    }
  });

  // Quantum shift visual effect
  createQuantumBurst(playerState.position.clone());

  // Update HUD
  document.querySelectorAll('.q-state').forEach(el => {
    const q = parseInt(el.dataset.q);
    if (q === currentQuantumState) {
      el.style.background = `rgba(${qv.accent === 0x00f5ff ? '0,245,255' : qv.accent === 0xff0044 ? '255,0,68' : '0,255,136'},0.3)`;
      el.style.borderColor = `#${qv.accent.toString(16).padStart(6,'0')}`;
      el.style.color = `#${qv.accent.toString(16).padStart(6,'0')}`;
    } else {
      el.style.background = 'rgba(255,255,255,0.05)';
      el.style.borderColor = 'rgba(255,255,255,0.2)';
      el.style.color = '#666';
    }
  });

  // Some enemies may not exist in this quantum state
  if (typeof bots !== 'undefined') {
    bots.forEach(bot => {
      if (!bot.alive) return;
      // Each bot has a "home" quantum state
      if (bot.quantumState === undefined) bot.quantumState = Math.floor(Math.random() * 3);
      // Bots in other quantum states are partially visible and deal less damage
      const qDist = Math.abs(bot.quantumState - currentQuantumState);
      bot.mesh.children.forEach(child => {
        if (child.material) {
          child.material.transparent = qDist > 0;
          child.material.opacity = Math.max(0.15, 1 - qDist * 0.4);
        }
      });
    });
  }

  addKillFeed('QUANTUM SHIFT → ' + qv.name + ' REALITY');
}

function createQuantumBurst(pos) {
  const qv = QUANTUM_VISUALS[currentQuantumState];
  for (let i = 0; i < 25; i++) {
    const geo = new THREE.SphereGeometry(0.1 + Math.random() * 0.2, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: qv.accent, transparent: true, opacity: 0.8 });
    const p = new THREE.Mesh(geo, mat);
    p.position.copy(pos); p.position.y = 1;
    scene.add(p);
    const angle = (i / 25) * Math.PI * 2;
    const speed = 0.1 + Math.random() * 0.2;
    particles.push({
      mesh: p, life: 40, maxLife: 40, type: 'quantum',
      vel: new THREE.Vector3(Math.cos(angle) * speed, Math.random() * 0.2, Math.sin(angle) * speed)
    });
  }
}

function updateQuantumCD(dt) {
  if (quantumShiftCD > 0) {
    quantumShiftCD -= dt * 16.67;
    document.getElementById('quantumCDFill').style.width = Math.max(0, 100 - (quantumShiftCD / quantumMaxCD * 100)) + '%';
  }
}

// ====== CAMPAIGN / MISSION PROGRESSION UI ======
let campaignUI = null;
let currentMission = null;
let missionKills = 0;
let missionStartTime = 0;

function initCampaignSystem() {
  // Load game data
  loadGameData();

  // Create campaign overlay
  const hud = document.getElementById('hud');
  const cDiv = document.createElement('div');
  cDiv.id = 'campaignHUD';
  cDiv.style.cssText = 'position:fixed;top:20px;left:20px;z-index:51;min-width:250px;display:none;';
  cDiv.innerHTML = `
    <div style="background:rgba(0,0,0,0.7);border:1px solid rgba(0,245,255,0.3);border-radius:8px;padding:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span id="cEra" style="color:#00f5ff;font-size:0.7em;font-weight:bold;letter-spacing:2px;">STONE AGE</span>
        <span id="cRank" style="color:#ff00e6;font-size:0.65em;">Recruit</span>
      </div>
      <div style="margin-top:6px;">
        <span id="cLevel" style="color:#fff;font-size:1.1em;font-weight:bold;">Level 1</span>
        <span style="color:#666;font-size:0.65em;"> Step </span>
        <span id="cStep" style="color:#00ff88;font-size:0.9em;">1</span>
        <span style="color:#666;font-size:0.65em;">/13</span>
      </div>
      <div style="margin-top:4px;">
        <span id="cStrap" style="color:#ff6600;font-size:0.7em;">Alpha</span>
        <span style="color:#666;font-size:0.6em;"> Strap </span>
        <span id="cStrapNum" style="color:#666;font-size:0.6em;">(1/4)</span>
      </div>
      <div style="margin-top:6px;border-top:1px solid rgba(255,255,255,0.1);padding-top:6px;">
        <div id="cMissionType" style="color:#fff;font-size:0.75em;font-weight:bold;">Elimination</div>
        <div id="cObjective" style="color:#888;font-size:0.7em;margin-top:2px;">Eliminate 3 enemies</div>
      </div>
      <div style="margin-top:6px;">
        <div style="color:#555;font-size:0.55em;">PROGRESS</div>
        <div style="width:100%;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;margin-top:2px;">
          <div id="cProgress" style="height:100%;background:linear-gradient(90deg,#00f5ff,#00ff88);width:0%;transition:width 0.3s;"></div>
        </div>
      </div>
      <div style="margin-top:4px;">
        <span id="cMissionKills" style="color:#666;font-size:0.6em;">Kills: 0/3</span>
        <span id="cTimer" style="color:#666;font-size:0.6em;float:right;display:none;">⏱ 0s</span>
      </div>
    </div>
  `;
  hud.appendChild(cDiv);

  // Progress bar at bottom of screen
  const pDiv = document.createElement('div');
  pDiv.id = 'levelProgress';
  pDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:3px;z-index:60;background:rgba(0,0,0,0.3);';
  pDiv.innerHTML = '<div id="levelProgressBar" style="height:100%;background:linear-gradient(90deg,#00f5ff,#ff00e6,#00ff88);width:0%;transition:width 0.5s;"></div>';
  hud.appendChild(pDiv);
}

function loadGameData() {
  // If gamedata.js is loaded, use it. Otherwise use defaults.
  if (typeof ERAS !== 'undefined') {
    generateNewMission();
  }
}

function generateNewMission() {
  if (typeof generateMission === 'undefined') return;

  // Use the progression from gamedata.js
  if (typeof playerProgress !== 'undefined') {
    currentMission = getCurrentMission();
  } else {
    currentMission = generateMission(1, 1, 0);
  }

  missionKills = 0;
  missionStartTime = Date.now();

  // Update UI
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  const hud = document.getElementById('campaignHUD');
  if (hud) hud.style.display = 'block';
  setText('cEra', currentMission.era);
  setText('cRank', currentMission.rank);
  setText('cLevel', 'Level ' + currentMission.level);
  setText('cStep', currentMission.step);
  setText('cStrap', currentMission.strapName);
  setText('cStrapNum', '(' + (currentMission.strap + 1) + '/4)');
  setText('cMissionType', currentMission.type);
  setText('cObjective', currentMission.objectives.join(', '));
  setText('cMissionKills', 'Kills: 0/' + currentMission.enemyCount);
  const progress = document.getElementById('cProgress');
  if (progress) progress.style.width = '0%';

  // Era-based theming
  applyEraTheme(currentMission.level);

  // Set up bots for this mission
  setupMissionBots(currentMission);
}

function applyEraTheme(level) {
  if (typeof getEraForLevel === 'undefined') return;
  const era = getEraForLevel(level);

  // Change arena lighting color based on era
  const eraColor = era.color;
  if (scene.fog) scene.fog.color.setHex(eraColor);
  scene.background.setHex(eraColor);

  // Adjust ambient light
  scene.traverse((obj) => {
    if (obj.isAmbientLight) {
      obj.color.setHex(era.color);
      obj.intensity = 0.4 + (era.id / 11) * 0.3; // brighter in future eras
    }
  });
}

function setupMissionBots(mission) {
  if (typeof bots === 'undefined') return;

  // Clear existing bots
  bots.forEach(bot => { if (bot.mesh) scene.remove(bot.mesh); });
  bots.length = 0;

  // Spawn bots based on mission
  const count = mission.enemyCount;
  const difficulty = mission.difficulty;

  const botColors = [0xff0044, 0xff6600, 0xff00ff, 0x88ff00, 0xff8800, 0xff0088, 0x00ff44, 0xff4444];

  for (let i = 0; i < Math.min(count, 12); i++) {
    const botGroup = new THREE.Group();
    const color = botColors[i % botColors.length];
    const era = getEraForLevel(mission.level);

    // Bot appearance changes with era
    let bodyMat;
    if (era.id < 4) {
      // Ancient — simpler
      bodyMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.1, roughness: 0.9 });
    } else if (era.id < 8) {
      // Modern — tactical
      bodyMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2, roughness: 0.6, metalness: 0.3 });
    } else {
      // Future — glowing
      bodyMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.7 });
    }

    const bodyGeometry = typeof THREE.CapsuleGeometry === 'function'
      ? new THREE.CapsuleGeometry(0.4, 0.8, 4, 8)
      : new THREE.CylinderGeometry(0.42, 0.34, 1.6, 8);
    const body = new THREE.Mesh(bodyGeometry, bodyMat);
    body.position.y = 1; body.castShadow = true; botGroup.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), bodyMat);
    head.position.y = 1.7; botGroup.add(head);

    // Eyes
    for (const dx of [-0.1, 0.1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 4, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      eye.position.set(dx, 1.7, 0.2); botGroup.add(eye);
    }

    // 4D + 6D crystal indicator
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.15, 0), new THREE.MeshBasicMaterial({ color: 0xff00e6 }));
    crystal.position.set(0, 2.5, 0); botGroup.add(crystal);

    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 40;
    botGroup.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

    const bot = {
      mesh: botGroup, crystal, health: 50 + difficulty * 20, maxHealth: 50 + difficulty * 20,
      speed: 0.04 + difficulty * 0.008, state: 'patrol',
      target: botGroup.position.clone(), lastShot: 0,
      fireRate: Math.max(200, 1000 - difficulty * 100),
      damage: 5 + difficulty * 3, detectionRange: 40 + difficulty * 2,
      attackRange: 50 + difficulty * 5, alive: true,
      name: 'ENEMY-' + (i + 1),
      wPosition: (Math.random() - 0.5) * 1.5,
      wTarget: (Math.random() - 0.5) * 1.5,
      quantumState: Math.floor(Math.random() * 3),
      strafeDir: Math.random() > 0.5 ? 1 : -1,
      strafeTimer: 0
    };

    // Apply strap modifiers
    if (mission.strap === 3) {
      bot.health *= 1.5; bot.damage *= 1.3; // Elite enemies
    }

    scene.add(botGroup);
    bots.push(bot);
  }
}

function onMissionKill() {
  if (!currentMission) return;
  missionKills++;
  document.getElementById('cMissionKills').textContent = 'Kills: ' + missionKills + '/' + currentMission.enemyCount;
  const progress = Math.min(100, (missionKills / currentMission.enemyCount) * 100);
  document.getElementById('cProgress').style.width = progress + '%';

  if (missionKills >= currentMission.enemyCount) {
    completeCurrentMission();
  }
}

function completeCurrentMission() {
  // Show completion notification
  addKillFeed('✅ MISSION COMPLETE: ' + currentMission.title);
  addKillFeed('+' + currentMission.xpReward + ' XP');

  // Update progression
  if (typeof playerProgress !== 'undefined' && typeof completeMission === 'function') {
    completeMission(currentMission);
  }

  // Update level progress bar
  if (typeof getProgressPercent === 'function') {
    document.getElementById('levelProgressBar').style.width = getProgressPercent() + '%';
  }

  // Generate next mission after delay
  setTimeout(() => {
    generateNewMission();
  }, 2000);
}

// ====== ERA-BASED WEAPON ARMORY ======
function getEraWeapons(level) {
  if (typeof getEraForLevel === 'undefined' || typeof WEAPON_DB === 'undefined') return [];
  const era = getEraForLevel(level);
  const weapons = [];
  for (const [key, w] of Object.entries(WEAPON_DB)) {
    if (w.era <= era.id) weapons.push({ key, ...w });
  }
  return weapons;
}

function getEraVehicles(level) {
  if (typeof getEraForLevel === 'undefined' || typeof VEHICLE_DB === 'undefined') return [];
  const era = getEraForLevel(level);
  const vehicles = [];
  for (const [key, v] of Object.entries(VEHICLE_DB)) {
    if (v.era <= era.id) vehicles.push({ key, ...v });
  }
  return vehicles;
}

// ====== INTEGRATION HOOKS ======
// These functions hook into the main game's existing systems

// Hook into bot kills to track mission progress
const originalKillBot = typeof killBot === 'function' ? killBot : null;
if (originalKillBot) {
  killBot = function(bot) {
    originalKillBot(bot);
    onMissionKill();
  };
}

// Update quantum CD in game loop
const originalAnimate = typeof animate === 'function' ? animate : null;

// Initialize after game loads
function init6D() {
  if (typeof scene === 'undefined' || !scene) {
    setTimeout(init6D, 100);
    return;
  }
  initQuantumSystem();
  initCampaignSystem();
  console.log('CHRONOFALL 6D Campaign System initialized');
}

// Auto-init when game starts
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(init6D, 1000);
});

// Also init when game starts
const originalStartGame = typeof startGame === 'function' ? startGame : null;
const originalStartDrop = typeof startDrop === 'function' ? startDrop : null;

if (originalStartDrop) {
  startDrop = function() {
    originalStartDrop();
    setTimeout(() => { generateNewMission(); }, 500);
  };
}
