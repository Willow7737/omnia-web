#!/usr/bin/env bash
# Start Omnia Protocol 5-node testnet inside the Codespace
#
# This script clones the omnia-protocol repo, builds Docker images,
# and starts the testnet. The omnia-web dashboard connects to it
# automatically via NEXT_PUBLIC_OMNIA_API_URL.
set -euo pipefail

OMNIA_REPO="https://github.com/Willow777/omnia-protocol"
OMNIA_DIR="$HOME/omnia-protocol"

echo "══════════════════════════════════════════════════════════════"
echo "  Omnia Protocol — Codespace Testnet Setup"
echo "══════════════════════════════════════════════════════════════"
echo ""

# Check if Docker is available
if ! command -v docker &>/dev/null; then
  echo "❌ Docker not found. Docker-in-Docker may not be ready yet."
  echo "   Try running this script again in a moment."
  exit 1
fi

# Clone omnia-protocol if not present
if [ ! -d "$OMNIA_DIR" ]; then
  echo "📦 Cloning omnia-protocol..."
  git clone --depth 1 "$OMNIA_REPO" "$OMNIA_DIR"
  echo "✅ Cloned to $OMNIA_DIR"
else
  echo "✅ omnia-protocol already cloned at $OMNIA_DIR"
fi

# Check if testnet is already running
if docker compose -f "$OMNIA_DIR/docker/docker-compose.yml" ps 2>/dev/null | grep -q "omnia-bootstrap"; then
  echo "✅ Testnet is already running!"
  echo ""
  echo "🌐 Node HTTP APIs:"
  echo "  Bootstrap:   http://localhost:9090"
  echo "  Node 1:      http://localhost:9091"
  echo "  Node 2:      http://localhost:9092"
  echo "  Node 3:      http://localhost:9093"
  echo "  Node 4:      http://localhost:9094"
  echo ""
  echo "📊 Dashboard: http://localhost:3000"
  exit 0
fi

# Build and start testnet
echo "🔨 Building Docker images (this may take 10-15 minutes on first build)..."
echo "   Subsequent starts will use cached images."
echo ""

RUST_LOG=info docker compose -f "$OMNIA_DIR/docker/docker-compose.yml" up -d --build 2>&1 || {
  echo ""
  echo "⚠️  Docker build/start failed. This can happen if the Codespace"
  echo "   doesn't have enough resources. Try a 4-core or larger Codespace."
  echo ""
  echo "   You can also start a smaller 3-node testnet instead:"
  echo "   docker compose -f $OMNIA_DIR/docker/docker-compose.testnet.yml up -d --build"
  exit 1
}

# Wait for bootstrap to become healthy
echo ""
echo "⏳ Waiting for bootstrap node to become healthy..."
for i in $(seq 1 60); do
  if curl -sf "http://localhost:9090/health" > /dev/null 2>&1; then
    echo "✅ Bootstrap node is healthy!"
    break
  fi
  if [ "$i" -eq 60 ]; then
    echo "⚠️  Bootstrap node did not become healthy within 2 minutes."
    echo "   Check logs: docker compose -f $OMNIA_DIR/docker/docker-compose.yml logs omnia-bootstrap"
  fi
  sleep 2
done

echo ""
echo "══════════════════════════════════════════════════════════════"
echo "  Testnet is running! 🚀"
echo "══════════════════════════════════════════════════════════════"
echo ""
echo "🌐 Node HTTP APIs:"
echo "  Bootstrap:   http://localhost:9090"
echo "  Node 1:      http://localhost:9091"
echo "  Node 2:      http://localhost:9092"
echo "  Node 3:      http://localhost:9093"
echo "  Node 4:      http://localhost:9094"
echo ""
echo "📊 Start the dashboard:"
echo "  bun run dev"
echo ""
echo "💡 The dashboard auto-connects to the testnet via"
echo "   NEXT_PUBLIC_OMNIA_API_URL=http://localhost:9090"
echo ""
echo "🛑 To stop the testnet:"
echo "  docker compose -f $OMNIA_DIR/docker/docker-compose.yml down -v"
