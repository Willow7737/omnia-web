#!/usr/bin/env bash
# Build script for omnia-web
#
# Next.js route segment config (dynamic, runtime) must be static string literals,
# so we can't conditionally set them from env vars at compile time.
#
# For the GitHub Pages static export build (NEXT_BASE_PATH=/omnia-web):
#   - Docker-only API routes (/api/debug, /api/proxy) are removed because
#     they require force-dynamic + nodejs runtime, which is incompatible with
#     output: "export". These routes are only useful when running in Docker.
#   - The /api/config route is kept but must have force-static to work with
#     output: "export". Values are baked at build time.
#
# For the Docker live mode build (NEXT_PUBLIC_LIVE_MODE=true):
#   - All routes are kept with their dynamic configuration intact.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
API_DIR="$PROJECT_DIR/src/app/api"

# Track removed routes so we can restore them after build
REMOVED_ROUTES=()

restore_routes() {
    if [ ${#REMOVED_ROUTES[@]} -gt 0 ]; then
        echo "📦 Restoring Docker-only API routes..."
        cd "$PROJECT_DIR"
        for route in "${REMOVED_ROUTES[@]}"; do
            git checkout -- "$route" 2>/dev/null || true
        done
    fi
}

trap restore_routes EXIT

# Check if building for GitHub Pages static export
if [ "${NEXT_BASE_PATH:-}" = "/omnia-web" ]; then
    echo "🏗️  GitHub Pages static export build detected"
    echo "🗑️  Removing Docker-only API routes (incompatible with output: export)..."

    # Remove /api/debug — only useful in Docker, requires force-dynamic + nodejs runtime
    if [ -d "$API_DIR/debug" ]; then
        REMOVED_ROUTES+=("$API_DIR/debug")
        rm -rf "$API_DIR/debug"
        echo "   ✗ Removed /api/debug"
    fi

    # Remove /api/proxy — only useful in Docker, requires force-dynamic + nodejs runtime
    if [ -d "$API_DIR/proxy" ]; then
        REMOVED_ROUTES+=("$API_DIR/proxy")
        rm -rf "$API_DIR/proxy"
        echo "   ✗ Removed /api/proxy"
    fi

    echo "✅ Kept /api/config (will be pre-rendered with build-time values)"
else
    echo "🐳 Docker / standalone build detected — keeping all API routes"
fi

# Run the actual Next.js build
cd "$PROJECT_DIR"
echo "🔨 Running next build..."
npx next build
