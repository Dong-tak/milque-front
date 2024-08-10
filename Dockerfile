# Use the official Node.js 20 image
FROM node:20-alpine

# Create and set the working directory
WORKDIR /deploy

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# # Build arguments
# ARG NEXT_PUBLIC_URI

# # Environment variables
# ENV NEXT_PUBLIC_URI=$NEXT_PUBLIC_URI

# Build the Next.js application
RUN npm run build

# Set the user to 'node' for better security practices
USER node

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]