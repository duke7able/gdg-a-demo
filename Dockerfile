# Use a smaller, optimized Node.js base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (better for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Vite React app
RUN npm run build

# Use a lightweight server to serve the app
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install 'serve' globally
RUN npm install -g serve

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist /usr/src/app/dist

# Set the PORT environment variable (Cloud Run dynamically assigns this)
ENV PORT 8080

# Expose the correct port
EXPOSE 8080

# Use the correct PORT dynamically
CMD ["serve", "-s", "/usr/src/app/dist", "-l", "8080"]
