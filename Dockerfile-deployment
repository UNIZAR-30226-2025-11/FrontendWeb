# Use the official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only the package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the project files
COPY . .

# Expose the port defined in the environment variables or default to 5173
EXPOSE ${VITE_PORT:-5173}

# Start Vite
CMD ["npm", "run", "dev"]
