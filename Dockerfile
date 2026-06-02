# ── Stage 1: Build ────────────────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Install bun for faster installs
RUN npm install -g bun

# Copy dependency manifests first for better Docker layer caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build in live mode (SSR, not static export) so env vars are read at runtime
ENV NEXT_PUBLIC_LIVE_MODE=true

RUN bun run build

# ── Stage 2: Runtime ─────────────────────────────────────────────────────
FROM node:22-slim AS runtime

WORKDIR /app

# Create non-root user
RUN groupadd -r omnia && useradd -r -g omnia -m omnia

# Copy standalone server from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Set environment defaults
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose port
EXPOSE 3000

# Run as non-root user
USER omnia

CMD ["node", "server.js"]
