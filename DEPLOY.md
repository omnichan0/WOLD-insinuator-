# OMEGA-8D deployment

## Runtime

The Replit workflow runs `bash start.sh`. The game server binds to the Replit-provided `PORT` (5000 in development) and the local llama.cpp process binds to `127.0.0.1:8081`.

Required Replit Secrets:

- `OMEGA8D_ADMIN_EMAIL`
- `OMEGA8D_ADMIN_PASSWORD`
- `SESSION_SECRET`

The first two protect `/admin`. `SESSION_SECRET` is reserved for deployment integrations and is not displayed or committed.

## Checks

```bash
node --check server.js
node --check system_bridge.js
node --check admin.html
curl http://127.0.0.1:5000/health
curl http://127.0.0.1:5000/api/ai/health
```

The admin panel is available at `/admin`. It uses an HTTP-only, SameSite session cookie and exposes protected runtime details only after login.

## Production notes

- Keep the GGUF file present at `models/WhiteRabbitNeo_WhiteRabbitNeo-V3-7B-Q4_K_M.gguf`, or set `OMEGA8D_MODEL_PATH`.
- Do not publish admin credentials in source, HTML, logs, or documentation.
- Publish only after the workflow, game health, AI health, and admin login have been verified.