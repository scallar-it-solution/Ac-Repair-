# syntax=docker/dockerfile:1

# Production image for the Frostwright website: the Next.js standalone server plus static assets.
#   docker build -t frostwright-ac-repair .
#   docker run --rm -p 3000:3000 frostwright-ac-repair      → http://localhost:3000

ARG NODE_VERSION=24-alpine

# ---- dependencies (cached until package-lock.json changes)
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ---- build (every page is prerendered here)
FROM node:${NODE_VERSION} AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runtime: only the traced server files, no dev dependencies
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# The standalone server does not copy public/ or .next/static/ itself.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/robots.txt || exit 1
CMD ["node", "server.js"]
