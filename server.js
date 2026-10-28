// OMEGA-8D — game server, admin panel, and local llama.cpp proxy

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('rate-limiter-flexible').RateLimiterMemory;
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.set('trust proxy', 1);
const PORT = Number(process.env.PORT || 5000);
const AI_PORT = Number(process.env.OMEGA8D_AI_PORT || 8081);
const MODEL_PATH = process.env.OMEGA8D_MODEL_PATH ||
  path.join(__dirname, 'models', 'WhiteRabbitNeo_WhiteRabbitNeo-V3-7B-Q4_K_M.gguf');
const MODEL_NAME = path.basename(MODEL_PATH);
const ADMIN_EMAIL = (process.env.OMEGA8D_ADMIN_EMAIL || '').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.OMEGA8D_ADMIN_PASSWORD || '';
const ADMIN_SESSION_COOKIE = 'omega8d_admin_session';
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const adminSessions = new Map();
const worldPresence = new Map();
const WORLD_PRESENCE_TTL_MS = 2 * 60 * 1000;

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:", "wss:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https:", "wss:"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "blob:"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Rate limiting — prevent brute force / abuse
const apiLimiter = new rateLimit({
  points: 100,           // 100 requests
  duration: 60,          // per minute per IP
});
const authLimiter = new rateLimit({
  points: 5,             // 5 auth attempts
  duration: 300,         // per 5 minutes
});
const aiLimiter = new rateLimit({
  points: 30,            // 30 AI requests
  duration: 60,          // per minute
});

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ''));
  const b = Buffer.from(String(right || ''));
  return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(header.split(';').filter(Boolean).map(part => {
    const index = part.indexOf('=');
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }));
}

function getAdminSession(req) {
  const token = parseCookies(req)[ADMIN_SESSION_COOKIE];
  if (!token) return null;
  const session = adminSessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    adminSessions.delete(token);
    return null;
  }
  return session;
}

function requireAdmin(req, res, next) {
  if (!getAdminSession(req)) {
    return res.status(401).json({ success: false, error: 'Admin authentication required' });
  }
  next();
}

function setAdminCookie(res, token, maxAge) {
  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie',
    `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}; Max-Age=${Math.floor(maxAge / 1000)}; Path=/; HttpOnly; SameSite=Strict${secure ? '; Secure' : ''}`);
}

function clearAdminCookie(res) {
  res.setHeader('Set-Cookie',
    `${ADMIN_SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict`);
}

async function getAiHealth() {
  try {
    const response = await fetch(`http://127.0.0.1:${AI_PORT}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    let detail = null;
    try { detail = await response.json(); } catch (_) {}
    return {
      status: response.ok ? 'online' : 'loading',
      model: detail?.model || MODEL_NAME,
      port: AI_PORT,
    };
  } catch (_) {
    return { status: 'offline', model: MODEL_NAME, port: AI_PORT };
  }
}

// Anti-scrape: block known scrapers, bots, curl, wget
const blockedAgents = ['curl', 'wget', 'scrapy', 'python-requests', 'httpclient', 'okhttp', 'java/', 'go-http-client', 'bot', 'crawler', 'spider'];
app.use((req, res, next) => {
  if (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1') return next();
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  for (const bot of blockedAgents) {
    if (ua.includes(bot) && !ua.includes('pwa')) {
      // Allow search engine bots but block scrapers
      if (ua.includes('googlebot') || ua.includes('bingbot')) { return next(); }
      return res.status(403).send('Access denied');
    }
  }
  next();
});

// Anti-hotlink: check referer for game assets
app.use('/game', (req, res, next) => {
  const referer = req.headers.referer || '';
  const host = req.headers.host || '';
  if (referer && !referer.includes(host) && !referer.includes('localhost') && !referer.includes('repl.co')) {
    return res.status(403).send('Hotlinking forbidden');
  }
  next();
});

// ==========================================
// RATE LIMITING
// ==========================================
app.use('/api/', async (req, res, next) => {
  try {
    await apiLimiter.consume(req.ip);
    next();
  } catch (e) {
    res.status(429).json({ error: 'Too many requests' });
  }
});

app.use('/api/auth/', async (req, res, next) => {
  try {
    await authLimiter.consume(req.ip);
    next();
  } catch (e) {
    res.status(429).json({ error: 'Too many auth attempts. Wait 5 minutes.' });
  }
});

app.use('/api/ai/', async (req, res, next) => {
  try {
    await aiLimiter.consume(req.ip);
    next();
  } catch (e) {
    res.status(429).json({ error: 'AI rate limit. Slow down.' });
  }
});

// ==========================================
// BODY PARSING
// ==========================================
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ==========================================
// INPUT SANITIZATION (anti-XSS, anti-injection)
// ==========================================
function sanitize(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/<script[^>]*>.*?<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '')
              .replace(/eval\(/gi, '')
              .replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;')
              .substring(0, 5000);
  }
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      obj[key] = sanitize(obj[key]);
    }
  }
  return obj;
}

app.use('/api/', (req, res, next) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  next();
});

// ==========================================
// WORLD PRESENCE — privacy-preserving heatmap
// ==========================================
app.post('/api/world/presence', (req, res) => {
  const playerId = String(req.body.playerId || '').trim().slice(0, 80);
  const lat = Number(req.body.lat);
  const lng = Number(req.body.lng);
  if (!playerId || !Number.isFinite(lat) || !Number.isFinite(lng) ||
      lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return res.status(400).json({ success: false, error: 'Valid player coordinates are required.' });
  }
  worldPresence.set(playerId, {
    lat, lng,
    mode: String(req.body.mode || 'field').slice(0, 32),
    era: String(req.body.era || 'modern').slice(0, 32),
    updatedAt: Date.now(),
  });
  res.json({ success: true });
});

app.get('/api/world/players', (_req, res) => {
  const now = Date.now();
  const clusters = new Map();
  let total = 0;
  for (const [playerId, player] of worldPresence) {
    if (now - player.updatedAt > WORLD_PRESENCE_TTL_MS) {
      worldPresence.delete(playerId);
      continue;
    }
    total += 1;
    // Round to half-degree cells so the heatmap never exposes a player's exact position.
    const lat = Math.round(player.lat * 2) / 2;
    const lng = Math.round(player.lng * 2) / 2;
    const key = `${lat}:${lng}`;
    const cluster = clusters.get(key) || { lat, lng, count: 0 };
    cluster.count += 1;
    clusters.set(key, cluster);
  }
  res.json({
    success: true,
    players: total,
    clusters: [...clusters.values()].map(cluster => ({
      ...cluster,
      intensity: Math.min(1, 0.18 + cluster.count / 8),
    })),
    updatedAt: new Date(now).toISOString(),
  });
});

// ==========================================
// ADMIN ACCESS — secret-backed session auth
// ==========================================
app.post('/api/admin/login', async (req, res) => {
  try {
    await authLimiter.consume(req.ip);
  } catch (_) {
    return res.status(429).json({ success: false, error: 'Too many login attempts. Try again later.' });
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(503).json({ success: false, error: 'Admin credentials are not configured.' });
  }

  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!safeEqual(email, ADMIN_EMAIL) || !safeEqual(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ success: false, error: 'Invalid credentials.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  adminSessions.set(token, { email: ADMIN_EMAIL, expiresAt });
  setAdminCookie(res, token, ADMIN_SESSION_TTL_MS);
  res.json({ success: true, expiresAt });
});

app.get('/api/admin/session', (req, res) => {
  const session = getAdminSession(req);
  if (!session) return res.status(401).json({ authenticated: false });
  res.json({ authenticated: true, email: session.email, expiresAt: session.expiresAt });
});

app.post('/api/admin/logout', (req, res) => {
  const token = parseCookies(req)[ADMIN_SESSION_COOKIE];
  if (token) adminSessions.delete(token);
  clearAdminCookie(res);
  res.json({ success: true });
});

app.get('/api/admin/overview', requireAdmin, async (req, res) => {
  res.json({
    success: true,
    service: 'OMEGA-8D',
    game: { status: 'online', port: PORT, uptime: process.uptime() },
    ai: await getAiHealth(),
    modelPath: MODEL_PATH,
    admin: { configured: Boolean(ADMIN_EMAIL && ADMIN_PASSWORD) },
    node: process.version,
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// BALANCE INTEGRITY — anti-hack validation
// ==========================================
const balanceSignatures = new Map(); // In production use Redis
const SECRET_KEY = process.env.GAME_SECRET || crypto.randomBytes(32).toString('hex');

function signBalance(playerId, balance) {
  return crypto.createHmac('sha256', SECRET_KEY)
    .update(`${playerId}:${balance}:${Math.floor(Date.now() / 300000)}`)
    .digest('hex');
}

// ==========================================
// GAME ROUTES — serve static files
// ==========================================
// Serve ALL files from root (flat structure — everything at Replit root)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.redirect('/admin');
});

app.use(express.static(__dirname, {
  maxAge: 0,
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'no-store');
    }
    if (filepath.endsWith('.html')) {
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Cache-Control', 'no-store');
    }
  }
}));

// Main route — serve index.html from root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==========================================
// PWA ROUTES
// ==========================================
app.get('/manifest.json', (req, res) => {
  res.json({
    name: 'OMEGA-8D',
    short_name: 'OMEGA-8D',
    description: '8D Tactical Arena Shooter — Real-world warfare across 12 eras',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0a0a0f',
    theme_color: '#00d4ff',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
    categories: ['games', 'action', 'strategy'],
    screenshots: [{ src: '/screenshot.png', sizes: '1280x720', type: 'image/png' }],
  });
});

app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store');
  res.send(`
    const CACHE = 'omega8d-v3';
    const ASSETS = ['/', '/manifest.json'];
    self.addEventListener('install', e => {
      e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
      self.skipWaiting();
    });
    self.addEventListener('activate', e => { self.clients.claim(); });
    self.addEventListener('fetch', e => {
      if (e.request.method !== 'GET') return;
      e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
          if (resp.ok && e.request.url.includes('/game/')) {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return resp;
        }).catch(() => caches.match('/')))
      );
    });
  `);
});

// Service worker registration injected into HTML
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/') {
    const oldSend = res.send;
    res.send = function(body) {
      if (typeof body === 'string' && body.includes('</head>')) {
        const pwaCode = `
          <link rel="manifest" href="/manifest.json">
          <meta name="theme-color" content="#00d4ff">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
          <meta name="apple-mobile-web-app-title" content="OMEGA-8D">
          <meta name="mobile-web-app-capable" content="yes">
          <link rel="apple-touch-icon" href="/icon-192.png">
          <script>
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(reg => {
                  console.log('PWA: ServiceWorker registered');
                }).catch(err => console.log('SW error:', err));
              });
            }
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              deferredPrompt = e;
              const btn = document.createElement('button');
              btn.textContent = '📱 Install OMEGA-8D';
              btn.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:9999;background:#00d4ff;color:#000;border:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 4px 20px rgba(0,212,255,0.4)';
              btn.onclick = () => { deferredPrompt.prompt(); deferredPrompt.userChoice.then(() => { btn.remove(); }); };
              setTimeout(() => document.body.appendChild(btn), 3000);
            });
          </script>
        `;
        body = body.replace('</head>', pwaCode + '</head>');
      }
      oldSend.call(this, body);
    };
  }
  next();
});

// ==========================================
// AI PROXY — one local llama.cpp model
// ==========================================
app.post('/api/ai/completion', async (req, res) => {
  try {
    const { prompt, messages, max_tokens, temperature } = req.body;

    let fullPrompt = String(prompt || '');
    if (messages && Array.isArray(messages)) {
      fullPrompt = messages.map(m => {
        const role = m.role === 'system' ? 'System' : m.role === 'assistant' ? 'Assistant' : 'User';
        return `${role}: ${String(m.content || '')}`;
      }).join('\n');
    }
    if (!fullPrompt.trim()) return res.status(400).json({ success: false, error: 'Prompt is required' });

    const aiRes = await fetch(`http://127.0.0.1:${AI_PORT}/completion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: fullPrompt,
        n_predict: Number(max_tokens ?? 1000),
        temperature: Number(temperature ?? 0.7),
        stop: ['User:', 'Assistant:'],
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!aiRes.ok) {
      return res.status(502).json({ error: 'AI server unavailable', code: 'AI_DOWN' });
    }

    const aiData = await aiRes.json();
    res.json({
      success: true,
      response: aiData.content || aiData.completion || '',
      source: 'llama.cpp',
      model: MODEL_NAME,
    });
  } catch (e) {
    res.status(502).json({ error: 'AI server offline', code: 'AI_OFFLINE', detail: e.message });
  }
});

// AI health check
app.get('/api/ai/health', async (req, res) => {
  const health = await getAiHealth();
  res.status(health.status === 'online' ? 200 : 503).json({
    ...health,
    source: 'local',
    provider: 'llama.cpp',
  });
});

// AI config — the local model is the only supported provider
app.get('/api/ai/config', (req, res) => {
  res.json({
    auto: true,
    endpoint: '/api/ai/completion',
    health: '/api/ai/health',
    model: MODEL_NAME,
    provider: 'local-llama-cpp',
    note: 'All game AI requests use the single local llama.cpp model.',
  });
});

// ==========================================
// BALANCE SECURITY API — signed balances
// ==========================================
app.post('/api/balance/verify', (req, res) => {
  const { playerId, balance, signature } = req.body;
  const expectedSig = signBalance(playerId, balance);
  res.json({ valid: signature === expectedSig });
});

app.post('/api/balance/sign', (req, res) => {
  const { playerId, balance } = req.body;
  const signature = signBalance(playerId, balance);
  res.json({ signature });
});

// ==========================================
// ANTI-CHEAT: validate game actions
// ==========================================
const validActions = ['shoot', 'move', 'reload', 'ability', 'banish', 'warp', 'buy', 'equip', 'select'];
app.post('/api/game/action', async (req, res) => {
  const { action, playerId, data } = req.body;

  if (!validActions.includes(action)) {
    return res.status(400).json({ error: 'Invalid action', code: 'CHEAT_DETECTED' });
  }

  // Check for impossible values (damage > 1000, speed hacks, etc)
  if (data) {
    if (data.damage && data.damage > 1000) return res.status(400).json({ error: 'Impossible damage', code: 'CHEAT_DAMAGE' });
    if (data.speed && data.speed > 500) return res.status(400).json({ error: 'Speed hack', code: 'CHEAT_SPEED' });
    if (data.coins && data.coins < 0) return res.status(400).json({ error: 'Negative coins', code: 'CHEAT_COINS' });
  }

  res.json({ valid: true, action, timestamp: Date.now() });
});

// ==========================================
// HEALTH CHECK (for keep-alive)
// ==========================================
app.get('/icon.svg', (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(path.join(__dirname, 'icon.svg'));
});

app.get('/icon-192.png', (req, res) => {
  const f = path.join(__dirname, 'icon-192.png');
  if (fs.existsSync(f)) { res.setHeader('Content-Type', 'image/png'); res.sendFile(f); }
  else { res.redirect('/icon.svg'); }
});

app.get('/icon-512.png', (req, res) => {
  const f = path.join(__dirname, 'icon-512.png');
  if (fs.existsSync(f)) { res.setHeader('Content-Type', 'image/png'); res.sendFile(f); }
  else { res.redirect('/icon.svg'); }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    game: true,
    ai: { provider: 'llama.cpp', port: AI_PORT },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// 404 HANDLER
// ==========================================
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'Endpoint not found' });
  } else {
    res.status(404).send('Not found');
  }
});

// ==========================================
// START
// ==========================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[OMEGA-8D] Game server running on port ${PORT}`);
  console.log(`[OMEGA-8D] AI proxy -> http://127.0.0.1:${AI_PORT}`);
  console.log(`[OMEGA-8D] PWA enabled — installable on any device`);
  console.log(`[OMEGA-8D] Security: helmet + rate limit + anti-scrape + anti-cheat`);
  console.log(`[OMEGA-8D] Admin panel -> /admin`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[OMEGA-8D] Shutting down...');
  process.exit(0);
});