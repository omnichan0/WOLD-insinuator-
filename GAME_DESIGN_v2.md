# CHRONOFALL v2 — 4D Arena Shooter
## Master Game Design Document (Updated)

---

## WHAT'S NEW IN v2

### Adanaxis-Inspired 4D Spatial System
The 4th dimension is now SPATIAL, not just temporal. Inspired by Adanaxis (the real 4D spatial game by Andrew Stewart), we added the **Ana/Kata axis** (W-axis):

- Every object has a W-position alongside X, Y, Z
- Player can move along the W-axis (bracket keys on PC, D-pad on controller)
- Objects far in W-space appear faded/transparent — they're "out of phase"
- You can dodge into the 4th dimension to avoid enemy fire
- Bots also move in W-space — their position crystal shows how far they are
- Hit detection considers W-distance — targets far in 4D take less damage
- Obstacles only collide if you're close in W-space — phase through walls by shifting

This is the Adanaxis essence, tweaked: we combine spatial 4D with TIME manipulation for a true "4D+" experience.

### New Features Added in v2

1. **6 Characters with unique ability cooldowns**
   - RIFT (Rewind), FLUX (Slow-Mo), BLINK (Dash), WRAITH (Echo), NOVA (Phase), STORM (all abilities)

2. **8 Weapons** (was 4)
   - Pulse Rifle, Scatter Gun, Phantom SMG, Void Sniper, Chrono LMG, Beam Cannon, Rift Rocket, Sidearm

3. **Vehicle System** — Phase Runner
   - Enter/exit with F
   - Drive around arena with speedometer
   - Third-person camera while driving
   - Can be destroyed

4. **Landing Drop Sequence**
   - Map-based drop selection (like Warzone/Free Fire)
   - 10-second countdown
   - Click map to choose landing zone
   - Falling physics — land on ground

5. **PlayStation/Xbox Controller Support**
   - Full Gamepad API integration
   - Dual-stick controls (left=movement, right=camera)
   - R2=shoot, L2=aim, L1=rewind, R1=slowmo
   - Triangle=switch weapon, Circle=reload, Square=vehicle, Cross=jump
   - D-pad=4D movement, L3=dash, R3=phase
   - Auto-detected on connect

6. **Armor System** — damage absorbed by armor first

7. **Grenades** — Chrono Grenade (explosive with cooldown)

8. **Aim Down Sights (ADS)** — reduced spread, zoom, bonus damage

9. **Hit Markers** — visual feedback on hits, red for kills

10. **Rocket Launcher** — projectile with splash damage

11. **Time Fractures (Portals)** — 4 teleport portals around the arena

12. **Phase Shift Ability** — invulnerability for 1.5 seconds

13. **Temporal Dash** — teleport 5m forward instantly

14. **Larger Arena** — 100x100 (was 80x80) with more obstacles

15. **8 Bots** (was 5) with strafe behavior and 4D movement

16. **Pickup Types** — Health, Ammo, AND Armor

---

## FULL FEATURE LIST (v2 Prototype)

### Core Mechanics
- [x] 3D first-person rendering (Three.js)
- [x] 4D spatial movement (W-axis, Adanaxis-inspired)
- [x] Time manipulation (Rewind, Slow-Mo, Phase, Dash)
- [x] Character selection (6 characters)
- [x] Weapon selection (8 weapons)
- [x] Dual weapon slots (primary + sidearm)
- [x] Vehicle system (Phase Runner)
- [x] Landing drop sequence (map-based)
- [x] Portal system (time fractures)
- [x] AI bots (8, with patrol/chase/strafe states)
- [x] Bots move in 4D space
- [x] Armor + Health system
- [x] Grenades
- [x] Aim Down Sights
- [x] Hit markers
- [x] Rocket with splash damage
- [x] Sound effects (Web Audio API)

### Controls
- [x] Keyboard + Mouse (PC)
- [x] Touch joystick + buttons (Mobile)
- [x] Gamepad/Controller (PlayStation, Xbox)
- [x] Pointer lock (PC)

### HUD
- [x] Health bar + text
- [x] Armor bar
- [x] Ammo counter
- [x] W-axis indicator (4D position)
- [x] 4 ability cooldown bars
- [x] Score + kills
- [x] Kill feed
- [x] Minimap (with 4D-aware enemy markers)
- [x] Crosshair (changes color on ADS)
- [x] Damage overlay
- [x] Vehicle HUD
- [x] Controller status indicator

### Environment
- [x] Neon cyberpunk arena
- [x] Crates with 4D positions (fade when out of phase)
- [x] Central tower with neon ring
- [x] Platform/ramps
- [x] 4 portal rings (time fractures)
- [x] 2 Phase Runner vehicles
- [x] 20+ pickups (health, ammo, armor)
- [x] Starfield skybox
- [x] Dynamic lighting (neon point lights)
- [x] Fog for atmosphere

---

## ROADMAP (Updated)

### Phase 1: Prototype v2 ✅ (CURRENT)
All features listed above are complete.

### Phase 2: Core Game Loop (Next)
- [ ] Bot difficulty levels
- [ ] More maps (Temporal City, Void Station, Neon Dojo)
- [ ] Multiple game modes (TDM, FFA, Search & Destroy)
- [ ] Killstreaks/Chrono Streaks
- [ ] Attachment system for weapons
- [ ] Wraith Echo Combat (ghost fighters)
- [ ] Storm's Chrono Storm (arena-wide rewind)
- [ ] Procedural arena generation

### Phase 3: Multiplayer
- [ ] WebSocket server
- [ ] Matchmaking
- [ ] Party system
- [ ] Dedicated servers
- [ ] Lag compensation
- [ ] Anti-cheat

### Phase 4: Local Multiplayer
- [ ] WebRTC for WiFi play
- [ ] Bluetooth API for mobile
- [ ] Lobby system
- [ ] Up to 8 local players

### Phase 5: Battle Royale
- [ ] Large 300x300 map
- [ ] 30-player lobbies
- [ ] Temporal Collapse (shrinking zone)
- [ ] Loot from time fractures
- [ ] Vehicle variety
- [ ] Chrono Companion (pet drone)

### Phase 6: Live Ops
- [ ] Chrono Pass (battle pass)
- [ ] Ranked seasons
- [ ] Store with cosmetics
- [ ] Daily/weekly challenges
- [ ] Tutorial
- [ ] Settings menu
- [ ] Analytics

---

## TECH STACK
- **Prototype:** Three.js + vanilla JS (single HTML file)
- **Production:** Godot 4 (open-source engine, web + mobile + console export)
- **Backend:** Node.js + Socket.io
- **Database:** MongoDB
- **Mobile:** Capacitor wrapper
- **PWA:** Service worker for offline play

## INSPIRATION & TWEAKING (Legal)
- Adanaxis: 4D spatial concept — we add time manipulation (novel combination)
- Free Fire: BR mechanics — our characters have time-based abilities (unique)
- Mini Militia: Local multiplayer — we use WebRTC/Bluetooth (different tech)
- COD: Loadouts — our weapon system includes 4D-aware damage (novel)
- Poki: Web play — we're a PWA (instant, installable)
- All names, art, and branding are original
- The 4D spatial + time system is genuinely novel — no other game combines both
