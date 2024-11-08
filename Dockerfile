# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*  

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci --omit=dev

# ---- Development Dependencies ----
FROM dependencies AS dev-dependencies
RUN npm i drizzle-kit

# ---- Build ----
FROM dev-dependencies AS build
COPY . .
RUN apk add --no-cache git
RUN npm run dbgen | grep -i 'no schema changes, nothing to migrate' || (echo 'Required string not found, stopping build.' && exit 1)
RUN npm run build
RUN npm prune --omit=dev
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin
RUN /usr/local/bin/node-prune


# ---- Release ----
FROM node:20-alpine AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/migrations ./migrations
COPY --from=build /usr/src/app/documentation ./documentation
COPY --from=build /usr/src/app/.apiversion ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package.json ./
COPY compodoc.config.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
