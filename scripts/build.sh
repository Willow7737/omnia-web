#!/usr/bin/env bash
# Build script for omnia-web
#
# Next.js route segment config (dynamic, runtime) must be static string literals,
# so we can't conditionally set them from env vars at compile time.
#
# For the GitHub Pages static export build (NEXT_BASE_PATH=/omnia-web):
#   - The entire /api directory is removed because:
#     * /api/debug and /api/proxy require force-dynamic + nodejs runtime
#     * All other API routes won't function in a static site anyway
#   - API routes are restored after build via git checkout
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
        echo "📦 Restoring API routes..."
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
    echo "🗑️  Removing API routes (incompatible with output: export)..."

    # Remove the entire /api directory for static export
    # None of the API routes function in a static site
    if [ -d "$API_DIR" ]; then
        REMOVED_ROUTES+=("$API_DIR")
        rm -rf "$API_DIR"
        echo "   ✗ Removed /api directory"
    fi
else
    echo "🐳 Docker / standalone build detected — keeping all API routes"
fi

# Run the actual Next.js build
cd "$PROJECT_DIR"
echo "🔨 Running next build..."
npx next build

# Copy standalone build artifacts (for Docker deployment)
if [ -d ".next/standalone" ]; then
    echo "📦 Copying static assets to standalone build..."
    cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
    cp -r public .next/standalone/ 2>/dev/null || true
fi
