# Base image
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Builder stage
FROM base AS builder
COPY . .
RUN npm run build

# Pruning stage to remove development dependencies
FROM base AS pruner
COPY --from=builder /app ./
RUN npm prune --production

# Runner stage, copy only necessary files for production
FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=pruner /app ./

# Ensure to copy any other directories/files like public, if needed
COPY --from=builder /app/public ./public

EXPOSE 3000

# Run the server
CMD ["npm", "start"]