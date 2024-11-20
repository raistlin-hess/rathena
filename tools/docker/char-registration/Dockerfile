FROM node:22-alpine

WORKDIR /usr/server

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
COPY package.json .
RUN npm i --omit=dev
# --mount=type=bind,source=package.json,target=package.json \
#  --mount=type=cache,target=/root/.npm \
#  npm i --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 443

# Run the application.
# CMD node src/index.js
CMD npm run start
