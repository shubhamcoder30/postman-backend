# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built assets from build-stage
COPY --from=build-stage /app/dist ./dist

# Ensure constants and other required non-TS files are available if they aren't in dist
# Based on the file structure, dist should contain everything needed.

EXPOSE 3000

CMD ["node", "dist/index.js"]
