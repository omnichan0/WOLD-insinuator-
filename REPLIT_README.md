# OMEGA-8D on Replit

OMEGA-8D is a browser game backed by a local llama.cpp model.

## Run

Replit runs:

```bash
bash start.sh
```

The game is served on the configured `PORT` and the local model stays private on port 8081. Open `/admin` for the protected operations panel.

## Admin

Set `OMEGA8D_ADMIN_EMAIL` and `OMEGA8D_ADMIN_PASSWORD` in Replit Secrets. The server creates short-lived in-memory HTTP-only sessions after a successful login.

## AI

All AI requests go through `/api/ai/completion` to the local GGUF model. External model providers and browser-supplied API keys are not supported.