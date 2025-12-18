# =========================
# Development
# =========================
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]

# =========================
# Production
# =========================
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 8000

CMD ["node", "dist/index.js"]