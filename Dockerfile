###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine
# Create app directory
WORKDIR /usr/buzzz-server/

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.build.json ./
COPY --chown=node:node tsconfig.json ./

# add env
ENV PAYSTACK_SECRET_KEY=sk_test_bbd29282a8f850f15feaccafd188d2d5da35e803
ENV TYPEORM_CONNECTION=mysql
ENV TYPEORM_URL=
ENV TYPEORM_HOST=localhost
ENV TYPEORM_PORT=3306
ENV TYPEORM_DATABASE=buzzzz
ENV TYPEORM_USERNAME=root
ENV TYPEORM_PASSWORD=
ENV TYPEORM_SYNCHRONIZE=true
ENV TYPEORM_ENTITIES=dist/*/.entity.js
ENV TYPEORM_MIGRATIONS=dist/database/migrations/*.js
ENV TYPEORM_MIGRATIONS_DIR=src/database/migrations

ENV JWT_SECRET=jwt-secret//g/
ENV JWT_EXPIRE=3d
ENV JWT_COOKIE_EXPIRE=3d

ENV OAUTH_GOOGLE_ID=
ENV OAUTH_GOOGLE_SECRET=
ENV OAUTH_TWITTER_CONSUMER_KEY=
ENV OAUTH_TWITTER_CONSUMER_SECRET=

ENV SENDGRID_API_KEY=
ENV FROM_EMAIL=
ENV PORT=5000
# firebase
ENV FIREBASE_DATABASE_URL=https://buzzz-37d26-default-rtdb.firebaseio.com/
ENV FIREBASE_IMAGE_URL=https://buzzz-chi.vercel.app/svg/logo.svg
ENV TYPE=service_account
ENV PROJECT_ID=buzzz-37d26
ENV PRIVATE_KEY_ID=a2c55651808d15359418ce981204a00a3fa1257e
ENV PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDQPUtbeqCPfiJn\nSro5IfuvWGm2NbCdcBHBRP4LP73tdObHxl9Z6R/FIjVHewaMxtzbGpw73zP9HY2L\nnOgTyHdQ6u8zS6MzFeUAnYinIaxedw8BGQPMqEYbUnU1t1aLRTdDDLZVoeU9Mk4l\nm2MpzApG1JTH0ZvVWm5PAgFEExeb7xTS+Dk/ciKfDCqS6wuR2jYB0vtPP2Bu00EG\nfvMMUd7zUCh4sF93iJ+QFo/Z2UAk4CXFpYWRvZTmNCJoFUjdUC/z5h9HZDAKVkQk\nm6JOTNPBDPT3PfjvDvprP9aSp9ii+xbYI0kzgSVEoEllo/RbSgqJvKPDDuDnGSkz\n4V77uT3ZAgMBAAECggEABE7MTQlpomZJ2Gitlwp6risuTqhoLa2YlG60sa9hIrUp\nJAdYyB+gOmAFiaPEJCvl/Dtd8Yghx3Hx0GpPy775JumhRqahKuigSuW3Yru52N9u\nJkfp8fUmNCD9zz1qcymcpcywxe86MoyknLcM81um98WkiUivCFgdUZGZTJr3gVCE\niGxwgD7FT+q6VaZHy2Jx5F2FGXRuTM0bh45MvPRImx3sfy3bDSms4Q6jsK3HIve4\nYk/wwghSyU9SKUhkfNoiX/jOwOzGQez5dL/xBdkoS3fIf7yBrn5fAfpOjkxAtz8O\nIYFU9X93sRqbIKOahmtr7fHPWWWOF4G50LrNbaxBIQKBgQDoqXpcc3Jh7Py9MCwA\nQSTQQvtX8ZC1LCnwkzwNX6XVfg0VflsFhGbjGgUJd22479a+W6Lx8DqYpfQjxops\nnl8gZ8V4zEz8+HGp311QSKrdQKJxA05W1hqTAaNUjNzWjKjYDf67dcBcacN9Mdzr\njdA1AHWiA87jp3UfqU8d0gbQsQKBgQDlIKtWISe5xJrTzKfUSemyccVgPkjL+k+/\nozU/CQz8x0D5wA+5xm6IcXBQ1u5rQwlulVTYFdAPcFU+MslDZIrE2M2qizraYOt4\nSWq8v39JUzmRl4FHvpeAacm5qLz8O9iqOEg/mYMxErLVsRER9M8R8DyEzND2TC9U\nXyqbVOdJqQKBgBrXmrdZ1mN33PzStvDckyu33pmZ1BEi5D/OLMp6M367CTVmm4e6\na8hdsyERd0Yz3XmexuDUz13XH6CVAllfuCfb8QtrvqIc47gufeyKRbQ7BcK2F+6q\nyuwU70wM6FmUZtJuYuorvqKqzRP/kbZXaSMER44GlHLtWfTqKqeNGJ4xAoGAblQF\nzIpYe54Mw3GnWpRgoFkiJk63dOjJ38gxynGMPGehhOETcWv4K2EcKQDleuajswja\n+tW+AsEferyvpvDR1SlkFvvF0gObPqdzawF2xBL8BHwEd0xx3RaTWP/ESFx03roN\nJ/q+bjHHxRfm1VOhJc0dBwEsmXxjyeetN3BxkkkCgYBhqIzzaP7Chu/+bsqus9fK\n70SSl8+C3I/+Gcs9xxwRWIMht3rL+qAVXHmWwUB8eK1rr+WiFNrLo5F6p6ODu1e4\nKlEsa/BmfJoY3ln+MatSlWDo1TzOIojDL8PSCP9dPe867+LlbegTp+7hCEaabi6w\n4lMT8IbJHxKm20i4tXWJlQ==\n-----END PRIVATE KEY-----\n'
ENV CLIENT_EMAIL=firebase-adminsdk-q00my@buzzz-37d26.iam.gserviceaccount.com
ENV CLIENT_ID=115397941695726707258
ENV AUTH_URI=https://accounts.google.com/o/oauth2/auth
ENV TOKEN_URI=https://oauth2.googleapis.com/token
ENV AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
ENV CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q00my%40buzzz-37d26.iam.gserviceaccount.com

# cloudinary
ENV CLOUD_NAME=eddymadu
ENV CLOUD_API_KEY=287241113588159
ENV CLOUD_API_SECRET=x_gCfnDAWufLrUlziXdxVqbbAYY 
ENV CLOUDINARY_URL=cloudinary://287241113588159:x_gCfnDAWufLrUlziXdxVqbbAYY@eddymadu          
# Bundle app source
# COPY --chown=node:node . .

# install dependencies 
RUN yarn --network-timeout 600000

# set user to be non root user for security reason
USER node

# From here we load our application's code in, therefore the previous docker
COPY .  .

EXPOSE 5000
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD ["executable"]
# # run app
CMD  ["yarn","start:dev"]



##################
# BUILD FOR PRODUCTION
###################

# FROM node:16-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# # In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

# COPY --chown=node:node --from=development /usr/src/app/prod.env ./.env
# COPY --chown=node:node --from=development /usr/src/app/tsconfig.build.json ./
# COPY --chown=node:node --from=development /usr/src/app/tsconfig.json ./


# # Run the build command which creates the production bundle
# RUN yarn build

# # Set NODE_ENV environment variable
# ENV NODE_ENV production

# # Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
# RUN yarn autoclean --only=production && yarn cache clean --force

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:16-alpine As production

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/.env ./.env


# # Start the server using the production build
# CMD [ "node", "dist/main.js" ]

