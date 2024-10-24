# ---- Base ----
FROM node:22.10-alpine AS build
RUN apk --no-cache add bash curl git make
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --loglevel verbose
COPY . .
RUN npm run build

# ---- Dependencies ----
FROM node:22.10-alpine AS prod-dependencies
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/package-lock.json ./
RUN npm ci
COPY --from=build /usr/src/app/migrations ./migrations
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.apiversion ./
COPY --from=build /usr/src/app/database-ca-certificate.crt ./
COPY --from=build /usr/src/app/compodoc.config.json ./
COPY --from=build /usr/src/app/documentation ./
EXPOSE 3000
CMD ["node", "dist/main.js"]