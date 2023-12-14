# BUILD FOR LOCAL DEVELOPMENT
FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.build.json ./
COPY --chown=node:node tsconfig.json ./
RUN npm install -g pnpm && pnpm install

COPY --chown=node:node . .

USER node


# BUILD FOR PRODUCTION
FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm install -g pnpm && pnpm install

ENV NODE_ENV production

USER node


# PRODUCTION
FROM node:16-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
