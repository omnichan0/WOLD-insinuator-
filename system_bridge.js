/**
 * OMEGA-8D local system bridge.
 * The browser talks to this Replit server only. No external backend fallback.
 */

const OMEGA_STORAGE_KEY = 'omega8d_local_state';

function readLocalState() {
  try {
    return JSON.parse(localStorage.getItem(OMEGA_STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

function writeLocalState(state) {
  localStorage.setItem(OMEGA_STORAGE_KEY, JSON.stringify(state));
}

function localPlayer(playerId) {
  const state = readLocalState();
  state.players = state.players || {};
  state.players[playerId] = state.players[playerId] || {
    playerId,
    balanceUSD: 0,
    chronoCoins: 0,
    warBonds: 0,
    scrapMetal: 0,
    darkMatter: 0,
    transactions: [],
    profile: { playerId, achievements: [], career: null },
  };
  writeLocalState(state);
  return state.players[playerId];
}

function saveLocalPlayer(player) {
  const state = readLocalState();
  state.players = state.players || {};
  state.players[player.playerId] = player;
  writeLocalState(state);
}

async function localAi(messages, maxTokens = 1000) {
  try {
    const response = await fetch('/api/ai/completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, max_tokens: maxTokens }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const OMEGA = {
  localAI: {
    endpoint: '/api/ai/completion',
    health: '/api/ai/health',
    config: '/api/ai/config',
    auto: true,
  },
  aiOnline: false,
  aiModel: 'local',
  player: {
    playerId: localStorage.getItem('omega8d_player_id') || '',
    wallet: null,
    profile: null,
  },

  async call(apiName, action, data = {}) {
    if (apiName === 'AI') {
      if (action === 'adminGetAIConfig') {
        const response = await fetch('/api/ai/config');
        return { success: response.ok, config: await response.json() };
      }
      if (action === 'testLLM') {
        return localAi([{ role: 'user', content: "Reply with exactly: OMEGA-8D AI online" }], 32);
      }
      if (action === 'adminSetAIConfig') {
        return { success: false, error: 'AI configuration is managed by the local model runtime.' };
      }
      if (action === 'aiAutoplayDecision') return this.ai.autoplayDecision(data.gameState);
      if (action === 'processVoiceCommand') return this.ai.voiceCommand(data.command, data.gameState);
      return { success: true, message: 'AI behavior is local to this session.' };
    }

    if (apiName === 'ADMIN') {
      if (action === 'adminStatus') {
        const response = await fetch('/api/admin/session');
        return { success: true, configured: response.ok, authenticated: response.ok };
      }
      if (action === 'adminLogin') {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ email: data.username, password: data.password }),
        });
        return await response.json();
      }
      if (action === 'verifyAdmin') {
        const response = await fetch('/api/admin/session', { credentials: 'same-origin' });
        return await response.json();
      }
      return { success: false, error: 'Use /admin for account management.' };
    }

    if (apiName === 'MAP') {
      const player = localPlayer(data.playerId || this.player.playerId);
      if (action === 'getPlayer') return { success: true, player: player.profile };
      if (action === 'updatePlayer') {
        player.profile = { ...player.profile, ...data };
        delete player.profile.playerId;
        saveLocalPlayer(player);
        return { success: true, player: player.profile };
      }
      return { success: false, error: 'This map operation is not available offline.' };
    }

    if (apiName === 'WALLET') {
      const player = localPlayer(data.playerId || this.player.playerId);
      if (action === 'getMonetizationStatus') return { success: true, freeMode: true, provider: 'local' };
      if (action === 'getWallet' || action === 'getBalance') return { success: true, wallet: player };
      if (action === 'getDepositInfo') {
        return { success: false, error: 'External deposits are disabled until a payment provider is configured.' };
      }
      if (action === 'convertToGame') {
        const amount = Number(data.amountUSD || 0);
        const rates = { chronoCoins: 100, warBonds: 10, scrapMetal: 500, darkMatter: 5 };
        if (!rates[data.gameCurrency] || amount <= 0) return { success: false, error: 'Invalid conversion.' };
        player[data.gameCurrency] = (player[data.gameCurrency] || 0) + amount * rates[data.gameCurrency];
        saveLocalPlayer(player);
        return { success: true, message: 'Converted in local practice mode.', wallet: player };
      }
      if (action === 'spendBalance') return { success: true, message: 'Purchases are free in local practice mode.', wallet: player };
      if (action === 'getTransactions') return { success: true, transactions: player.transactions };
      return { success: false, error: 'Wallet operation is not available offline.' };
    }

    return { success: false, error: `Unknown local service: ${apiName}` };
  },

  async callLocalAI(messages, maxTokens = 1000) {
    return localAi(messages, maxTokens);
  },

  async checkLocalAI() {
    try {
      const response = await fetch(this.localAI.health, { signal: AbortSignal.timeout(5000) });
      const data = await response.json();
      this.aiOnline = response.ok && data.status === 'online';
      this.aiModel = data.model || 'local';
      return this.aiOnline;
    } catch (_) {
      this.aiOnline = false;
      return false;
    }
  },

  async initPlayer(playerId) {
    this.player.playerId = String(playerId || '').trim();
    localStorage.setItem('omega8d_player_id', this.player.playerId);
    const player = localPlayer(this.player.playerId);
    await this.checkLocalAI();
    this.player.wallet = player;
    this.player.profile = player.profile;
    return { wallet: player, profile: player.profile, aiOnline: this.aiOnline, aiModel: this.aiModel };
  },

  wallet: {
    async getBalance() { return OMEGA.call('WALLET', 'getWallet', { playerId: OMEGA.player.playerId }); },
    async getDepositInfo() { return OMEGA.call('WALLET', 'getDepositInfo', { playerId: OMEGA.player.playerId }); },
    async confirmDeposit() { return { success: false, error: 'External deposits are disabled in local mode.' }; },
    async convert(gameCurrency, amountUSD) { return OMEGA.call('WALLET', 'convertToGame', { gameCurrency, amountUSD, playerId: OMEGA.player.playerId }); },
    async spend(amountUSD, item) { return OMEGA.call('WALLET', 'spendBalance', { amountUSD, item, playerId: OMEGA.player.playerId }); },
    async buyWarp(tier) { return this.spend(0, `Warp ${tier}`); },
    async getTransactions() { return OMEGA.call('WALLET', 'getTransactions', { playerId: OMEGA.player.playerId }); },
    async registerWallet() { return { success: false, error: 'External wallets are disabled in local mode.' }; },
  },

  map: {
    async getPlayer(playerId) { return OMEGA.call('MAP', 'getPlayer', { playerId: playerId || OMEGA.player.playerId }); },
    async updateProfile(updates) { return OMEGA.call('MAP', 'updatePlayer', { playerId: OMEGA.player.playerId, ...updates }); },
    async createZone() { return { success: false, error: 'Persistent map storage is not configured.' }; },
    async modifyZone() { return { success: false, error: 'Persistent map storage is not configured.' }; },
    async createMatch() { return { success: false, error: 'Persistent match storage is not configured.' }; },
    async getModifications() { return { success: true, modifications: [] }; },
    async createRecruitment() { return { success: false, error: 'Persistent recruitment storage is not configured.' }; },
  },

  ai: {
    async autoplayDecision(gameState) {
      const result = await OMEGA.callLocalAI([
        { role: 'system', content: 'You are a tactical AI for OMEGA-8D. Output only JSON.' },
        { role: 'user', content: `Game state: ${JSON.stringify(gameState).substring(0, 2000)}\nRespond with {"action":"move|shoot|reload|ability|defend","target":"enemy or null","reasoning":"brief","urgency":"low|medium|high|critical"}` },
      ]);
      if (!result.success) return result;
      try {
        return { success: true, decision: JSON.parse(String(result.response).replace(/```json|```/g, '').trim()), source: 'llama.cpp' };
      } catch (_) {
        return { success: true, decision: { action: 'defend', reasoning: 'Model returned non-JSON output.' }, source: 'llama.cpp' };
      }
    },
    async voiceCommand(command, gameState) {
      const result = await OMEGA.callLocalAI([
        { role: 'system', content: 'You are the OMEGA-8D voice command processor. Output only JSON.' },
        { role: 'user', content: `Command: "${command}"\nGame state: ${JSON.stringify(gameState || {}).substring(0, 500)}\nRespond with {"action":"...","params":{}}` },
      ]);
      if (!result.success) return result;
      try {
        return { success: true, command: JSON.parse(String(result.response).replace(/```json|```/g, '').trim()), source: 'llama.cpp' };
      } catch (_) {
        return { success: true, command: { action: 'unknown', params: {} }, source: 'llama.cpp' };
      }
    },
    async updateBehavior() { return { success: true }; },
    async activateSubscription() { return { success: true, message: 'Local AI is available without a subscription.' }; },
    async checkSubscription() { return { success: true, active: true, provider: 'local' }; },
    async setUserKey() { return { success: false, error: 'Bring-your-own AI keys are disabled; the local model is active.' }; },
    async getUserStatus() { return { success: true, hasKey: false, provider: 'local-llama.cpp' }; },
    async checkDoomsdaySurvival() { return { success: true, survives: false, survivalCount: 0, cheatsUsed: 0 }; },
    async loginDevice(deviceId, deviceName, platform) { return { success: true, deviceId, deviceName, platform }; },
  },

  admin: {
    async status() { return OMEGA.call('ADMIN', 'adminStatus'); },
    async setup() { return { success: false, error: 'Use /admin. Admin credentials are stored as Replit Secrets.' }; },
    async login(username, password) { return OMEGA.call('ADMIN', 'adminLogin', { username, password }); },
    async verify() { return OMEGA.call('ADMIN', 'verifyAdmin'); },
    async changePassword() { return { success: false, error: 'Change admin credentials in Replit Secrets.' }; },
    isLoggedIn() { return false; },
    logout() { fetch('/api/admin/logout', { method: 'POST' }); },
  },

  balance: {
    async sign(playerId, balance) {
      const response = await fetch('/api/balance/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, balance }),
      });
      return response.json();
    },
    async verify(playerId, balance, signature) {
      const response = await fetch('/api/balance/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, balance, signature }),
      });
      return response.json();
    },
  },

  async validateAction(action, data = {}) {
    try {
      const response = await fetch('/api/game/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, playerId: this.player.playerId, data }),
      });
      return response.json();
    } catch (error) {
      return { valid: false, error: error.message };
    }
  },

  isAdminRoute() { return window.location.pathname.startsWith('/admin'); },
};

if (OMEGA.player.playerId) {
  OMEGA.initPlayer(OMEGA.player.playerId).then(() => {
    window.dispatchEvent(new CustomEvent('omegaReady', { detail: OMEGA.player }));
  });
}

if (typeof window !== 'undefined') window.OMEGA = OMEGA;
if (typeof module !== 'undefined' && module.exports) module.exports = OMEGA;