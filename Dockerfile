# Use the official Node.js 20 image as the base image
FROM node:20-alpine AS builder

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a minimal image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app /app

# Install only production dependencies
RUN npm ci --only=production

# Set the user to 'node' for better security practices
USER node

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]