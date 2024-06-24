# STAGE 1: A container with pnpm and python3 is required
FROM node:18.18-alpine as builder
WORKDIR /app
# install pnpm
RUN npm i --global pnpm
# install python3 and other deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache linux-headers libc6-compat g++ py3-pip python3 make

# # Fetch deps into the pnpm store
# # We run pnpm fetch in a separate step to avoid re-fetching deps on every code change
# # fetch is a pnpm command that downloads all dependencies to the local store
# # You could remove or skip this step if using npm or yarn (but make sure to copy your lock file)
# # copy the lock file that you use
# COPY pnpm-lock.yaml ./
# COPY .npmrc /app/.npmrc
# RUN pnpm config set store-dir /workdir/.pnpm-store
# RUN pnpm fetch

# Copy the application code and install all deps from cache into the application
ARG SERVICE=${SERVICE}
ARG BOT_PRIVATE_TOKEN=${BOT_PRIVATE_TOKEN}
COPY package.json /app/
COPY .npmrc /app/.npmrc
COPY pnpm-lock.yaml ./
# finally, install all the deps
RUN pnpm install

# Build the NextJS app
ARG BUILD_MODE=$BUILD_MODE
COPY . /app/
RUN export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN export PUPPETEER_EXECUTABLE_PATH=`which chromium`
RUN BUILD_MODE=$BUILD_MODE pnpm build

# STAGE 2: Create a clean production image - only take pruned assets
FROM node:18.18-alpine as runner
WORKDIR /app
ARG SERVICE=$SERVICE

# We add a non-root user to run the app for security reasons
RUN addgroup --system --gid 1001 $SERVICE
RUN adduser --system --uid 1001 $SERVICE
USER $SERVICE

COPY --chown=$SERVICE:$SERVICE --from=builder /app/.next/standalone /app
COPY --chown=$SERVICE:$SERVICE --from=builder /app/public /app/public
COPY --chown=$SERVICE:$SERVICE --from=builder /app/.next/static /app/.next/static

EXPOSE 8080
ENV PORT 8080
CMD ["node", "server.js"]
