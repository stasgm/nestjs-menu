# Using multi-stage build (supported Docker 17 and later)
# ------ Stage 1 (build) --------
FROM node:18.15.0-slim AS builder
# Create app directory
WORKDIR /usr/src/app
# Copy dependency definitions
COPY package.json yarn.lock ./
COPY tsconfig*.json ./
COPY prisma ./prisma/
# TODO: remove seed file or copy schema file and migration folder
RUN rm prisma/seed.ts
# Install app dependencies from yarn.lock
RUN yarn install --frozen-lockfile --production=true
# Copy source code to image after yarn install to use caching efficient
COPY ./src ./src
# Build prod to ./dist folder for deploy later
RUN yarn build

# # ------ Stage 2 (release) ------
FROM node:18.15.0-alpine3.17 AS release
# create a new user
# USER node
# Create app directory
WORKDIR /app
# Copy dist files
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
# ENV
# COPY .env.development.docker .env
# COPY package.json yarn.lock ./
COPY config/prod.ts config/default.ts ./config/

# Frees up space by removing unnecessary files and folders from dependencies.
COPY yarn.lock .
COPY .yarnclean .
RUN yarn autoclean --force
# Expose port 3000 and start app
EXPOSE 3000

ENTRYPOINT [ "node", "dist/main" ]
