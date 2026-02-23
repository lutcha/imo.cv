# STAGE 0: Dev (hot-reload, volume-mounted source)
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

# STAGE 1: Build with Turbopack (Next.js 20/15 features)
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build optimized with standalone mode
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBOPACK=1
RUN npm run build

# STAGE 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only necessary artifacts
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
