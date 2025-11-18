FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./

FROM base AS development

RUN npm install

COPY . .

EXPOSE 5173 7000

CMD ["tail", "-f", "/dev/null"]

FROM base AS builder

RUN npm ci

COPY . .

RUN npm run build

FROM base AS production

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY server.js ./

EXPOSE 7000

CMD ["node", "server.js"]
