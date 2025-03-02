# Set node version
FROM node:23.8

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install

# Copy backend code
COPY backend ./backend

# Set backend port
EXPOSE 5000

# Start backend application
CMD ["node", "backend/server.js"]