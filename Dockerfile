# Base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Build-time variables (if needed)
ARG NEXT_PUBLIC_POST_API_URL
ARG NEXT_PUBLIC_GA_ID

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies with caching
RUN npm ci 

# Copy the rest of the application code
COPY . .

# Use the environment variables during the build process
ENV NEXT_PUBLIC_POST_API_URL=$NEXT_PUBLIC_POST_API_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

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