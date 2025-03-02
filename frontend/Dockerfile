# Set node version
FROM node:23.8

# Set the working directory
WORKDIR /app

# Copy the package.json files
COPY frontend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the frontend code
COPY frontend/ ./

# Build the frontend
RUN npm cache clean --force
RUN npm run build

# Set the frontend port
EXPOSE 3000 

# Start the frontend application
CMD ["npm", "run", "start"]