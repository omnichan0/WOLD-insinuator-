#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GAME_PORT="${PORT:-5000}"
AI_PORT="${OMEGA8D_AI_PORT:-8081}"
MODEL_PATH="${OMEGA8D_MODEL_PATH:-$ROOT_DIR/models/WhiteRabbitNeo_WhiteRabbitNeo-V3-7B-Q4_K_M.gguf}"
LLAMA_SERVER="${OMEGA8D_LLAMA_SERVER:-$ROOT_DIR/llama.cpp/build/bin/llama-server}"

while true; do
  if ! curl -sS --max-time 5 "http://127.0.0.1:$AI_PORT/health" >/dev/null 2>&1; then
    if [[ -x "$LLAMA_SERVER" && -s "$MODEL_PATH" ]] && ! pgrep -f "llama-server.*--port $AI_PORT" >/dev/null 2>&1; then
      "$LLAMA_SERVER" -m "$MODEL_PATH" -c 4096 --host 127.0.0.1 --port "$AI_PORT" --no-jinja -ngl 0 >/dev/null 2>&1 &
    fi
  fi
  if ! curl -fsS --max-time 5 "http://127.0.0.1:$GAME_PORT/health" >/dev/null 2>&1; then
    echo "Game server health check failed; the managed workflow will restart it."
  fi
  sleep 60
done