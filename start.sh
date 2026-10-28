#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GAME_PORT="${PORT:-5000}"
AI_PORT="${OMEGA8D_AI_PORT:-8081}"
MODEL_PATH="${OMEGA8D_MODEL_PATH:-$ROOT_DIR/models/WhiteRabbitNeo_WhiteRabbitNeo-V3-7B-Q4_K_M.gguf}"
LLAMA_SERVER="${OMEGA8D_LLAMA_SERVER:-$ROOT_DIR/llama.cpp/build/bin/llama-server}"
LOG_DIR="$ROOT_DIR/.omega8d-logs"
mkdir -p "$LOG_DIR"

if [[ ! -x "$LLAMA_SERVER" ]]; then
  echo "llama-server is missing: $LLAMA_SERVER" >&2
  exit 1
fi
if [[ ! -s "$MODEL_PATH" ]]; then
  echo "LLM model is missing or empty: $MODEL_PATH" >&2
  exit 1
fi

export PORT="$GAME_PORT"
export OMEGA8D_AI_PORT="$AI_PORT"
export OMEGA8D_MODEL_PATH="$MODEL_PATH"

if ! curl -sS --max-time 2 "http://127.0.0.1:$AI_PORT/health" >/dev/null 2>&1; then
  echo "[OMEGA-8D] Starting llama.cpp with $MODEL_PATH"
  "$LLAMA_SERVER" \
    -m "$MODEL_PATH" \
    -c 4096 \
    --host 127.0.0.1 \
    --port "$AI_PORT" \
    --no-jinja \
    -ngl 0 \
    >"$LOG_DIR/llama-server.log" 2>&1 &
  AI_PID=$!
else
  AI_PID=""
  echo "[OMEGA-8D] llama.cpp is already running on port $AI_PORT"
fi

node "$ROOT_DIR/server.js" >"$LOG_DIR/game-server.log" 2>&1 &
GAME_PID=$!
bash "$ROOT_DIR/keepalive.sh" >"$LOG_DIR/keepalive.log" 2>&1 &
KEEPALIVE_PID=$!

cleanup() {
  kill "$KEEPALIVE_PID" "$GAME_PID" ${AI_PID:-} 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "[OMEGA-8D] Game server starting on port $GAME_PORT"
echo "[OMEGA-8D] Admin panel: /admin"
echo "[OMEGA-8D] Local AI: 127.0.0.1:$AI_PORT"

wait "$GAME_PID"