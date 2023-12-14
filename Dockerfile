

# BUILD FOR PRODUCTION
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json .

COPY tsconfig.build.json .

COPY tsconfig.json .

RUN yarn 

 COPY . .


# PRODUCTION
FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json .

COPY tsconfig.build.json .

COPY tsconfig.json .

RUN yarn --set-timeout=100000  --omit=dev

 COPY --from=build ./app/dist ./dist


CMD [ "node", "dist/main.js" ]
