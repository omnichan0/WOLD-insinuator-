# OMEGA-8D local AI

OMEGA-8D uses one local `llama.cpp` server. There is no Groq, Base44, or external AI fallback.

## Current model

The canonical model is:

```text
models/WhiteRabbitNeo_WhiteRabbitNeo-V3-7B-Q4_K_M.gguf
```

The startup script fails explicitly if the model or the compiled server is missing.

## Run locally

```bash
bash start.sh
```

The game server listens on `$PORT` (5000 by default). The local llama.cpp server listens only on `127.0.0.1:8081`, and game requests use:

```text
POST /api/ai/completion
GET  /api/ai/health
GET  /api/ai/config
```

The browser never connects directly to the llama.cpp port.

## Change the model

Set `OMEGA8D_MODEL_PATH` to a valid GGUF file before starting the app:

```bash
OMEGA8D_MODEL_PATH=/path/to/model.gguf bash start.sh
```

Do not commit credentials or download responses in place of GGUF model files.