# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production
ENV RECAPTCHA_SITE_KEY=6LdKH-0UAAAAAB8sXLePDO6Ntg8X_G1BbehME5M8
ENV RECAPTCHA_SECRET=6LdKH-0UAAAAAPrC-Q4HgHk6AU550rHO2ZPEFanw

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
