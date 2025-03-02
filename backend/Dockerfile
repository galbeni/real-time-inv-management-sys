# Set node version
FROM node:23.8

# Set working directory
WORKDIR /app

# Copy package.json files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY backend ./

# Set backend port
EXPOSE 5000

# Start backend application
CMD ["node", "server.js"]