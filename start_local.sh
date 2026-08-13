#!/bin/bash
# =============================================
# Launch WarriorsCricketClub (Next.js) locally
# Usage: ./local_start.sh [port]
# Default port: 8000
# Serves the static export from ./out/
# =============================================

PORT="${1:-8000}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/out"

find_available_port() {
  local start_port="$1"
  local probe_port
  for ((probe_port=start_port; probe_port<start_port+50; probe_port++)); do
    if ! lsof -iTCP:"$probe_port" -sTCP:LISTEN -t >/dev/null 2>&1; then
      echo "$probe_port"
      return 0
    fi
  done

  return 1
}

if lsof -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  NEXT_PORT="$(find_available_port "$PORT")"
  if [[ -z "$NEXT_PORT" ]]; then
    echo "ERROR: No available port found in range $PORT-$((PORT+49))."
    exit 1
  fi
  echo "Port $PORT is already in use. Switching to available port $NEXT_PORT."
  PORT="$NEXT_PORT"
fi

# Always generate a fresh static export so latest changes are served.
cd "$SCRIPT_DIR"
echo "Running fresh build with 'npm run build'..."
npm run build

# Ensure the static export exists after build.
if [ ! -d "$OUT_DIR" ]; then
  echo "ERROR: Static export not found at $OUT_DIR after build."
  exit 1
fi

cd "$OUT_DIR"

echo "=============================================="
echo "  Warriors Cricket Club - Local Server"
echo "  URL: http://localhost:$PORT"
echo "  Serving: $OUT_DIR"
echo "  Press Ctrl+C to stop."
echo "=============================================="

# Open the browser automatically (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
  open "http://localhost:$PORT" 2>/dev/null &
fi

# Start static server.
# Prefer PHP so any .php endpoints (e.g. sample.php) work locally.
if command -v php &>/dev/null; then
  php -S "localhost:$PORT"
elif command -v python3 &>/dev/null; then
  echo "WARNING: Using static server; PHP endpoints will not execute."
  python3 -m http.server "$PORT"
elif command -v python &>/dev/null; then
  echo "WARNING: Using static server; PHP endpoints will not execute."
  python -m http.server "$PORT"
elif command -v node &>/dev/null; then
  echo "WARNING: Using static server; PHP endpoints will not execute."
  npx --yes http-server -p "$PORT"
else
  echo "ERROR: PHP, Python 3, Python, or Node.js is required to run the local server."
  exit 1
fi