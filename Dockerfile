FROM node:24-alpine AS base

FROM base AS deps

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN --mount=type=cache,target=/pnpm/store \
    pnpm fetch --frozen-lockfile && \
    pnpm install --frozen-lockfile --prod --offline

FROM base AS build

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN --mount=type=cache,target=/pnpm/store \
    pnpm fetch --frozen-lockfile && \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM base AS app

RUN corepack enable \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nodeuser -u 1001 -G nodejs

WORKDIR /app

COPY --from=deps --chown=nodeuser:nodejs /app/node_modules /app/node_modules
COPY --from=build --chown=nodeuser:nodejs /app/dist /app/dist
COPY --from=build --chown=nodeuser:nodejs /app/prisma /app/prisma
COPY --from=build --chown=nodeuser:nodejs /app/firebase /app/firebase

COPY --chown=nodeuser:nodejs pnpm-lock.yaml package.json .env ./

EXPOSE 3000

USER nodeuser

CMD pnpm prisma migrate deploy && pnpm start 

