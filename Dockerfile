# Base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies with caching
RUN npm ci --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a minimal image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies (cached)
RUN npm ci --production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]