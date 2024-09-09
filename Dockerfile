# Dockerfile

# Base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a minimal image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install production dependencies (if needed)
RUN npm ci

# Set environment variables
ENV NEXT_PUBLIC_POST_API_URL=https://mileque.com/v1
ENV NEXT_PUBLIC_GA_ID=G-701LXS786T

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]