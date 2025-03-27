
# Real-time Inventory Management System
## Project Description

This is a monorepo-based Nuxt 3 and Express.js application that implements a real-time inventory management system. The frontend is an interactive SPA that displays products fetched from the API in a table, ensuring a fully responsive design with a card-based list component. The backend is a mock API built with Express.js, providing real-time updates through WebSocket communication. The UI is fully responsive, incorporating a card-based list component for optimal display on tablets and mobile devices.

## Development Process
- The first step was to set up a Nuxt 3 project with the necessary dependencies/modules, such as Nuxt TailwindCSS, Nuxt i18n for string translations, Nuxt SVG Sprite for optimized SVG usage, and Socket.io Client for real-time communication between the frontend and backend.
-   The project was structured with a default layout, and the UI was built using Vue components and plugins based on the Tailwind CSS framework. Initially, static dummy data was used for display.
-   Since tables in HTML are not very responsive on smaller screens, a separate card component was created to ensure a better user experience on mobile and tablet views.
-   Next, the backend was developed using Node.js with the Express.js framework to provide API endpoints for fetching product data in JSON format.
-   Once the backend server and API endpoints were set up, the frontend was configured to fetch and display real data dynamically.
-   The Socket.io server was then implemented on both the frontend and backend to enable real-time communication between applications.
-   The logic for real-time state management, updates, conflict detection, and resolution was developed as follows:

## WebSocket and State Management, Conflict Handling and Resolution
- **State Management**:
    - The frontend maintains a `products` array, which stores product data retrieved from the API.
    - A UI controller component allows users to modify product quantities by increasing or decreasing values.
    - An optimistic update approach is used—first updating the UI, then sending the request to the API to update the product quantity.
- **Synchronization**:
    - The frontend receives real-time notifications via WebSocket whenever a product update occurs on the server.
    - If an update is detected on the server, the corresponding product is marked with a `stale` (outdated) status and visually highlighted, indicating that the client-side data is out of sync with the server.
- **Conflict Handling**:
    - When a product is updated on the frontend, an optimistic update is applied, meaning the UI updates immediately before sending the request to the server.
    - If the server responds with a **409 Conflict**, it indicates that another user has modified the product data. In this case, the product is marked as `stale` (outdated) and highlighted with a yellow background.
    - Users can manually resolve the conflict by refreshing the product data using a sync button.
    - Alternatively, users can choose to resolve the conflict by clicking the **Force Save** button. This action will intentionally overwrite the server's version with the client-side state, even if it is outdated.
    - The Force Save option is especially useful in optimistic UI flows, where a user is aware of the conflict but intentionally wants to persist their changes.
    - The server detects the `forceUpdate` flag in the request and skips conflict detection logic, directly updating the product.
    - This feature ensures that local changes are not lost due to background updates from other clients.

## Directory Structure
```
backend/ -> Express.js server, mock API, and Socket.io WebSocket handling
frontend/ -> Nuxt 3 application with TailwindCSS, SVG Sprite, Nuxt i18n, and Socket.io client support
node_modules/
.dockerignore
.env
.gitignore
docker-compose.yml
package-lock.json
package.json
README.md
```

## Mock API Data Structure
Each inventory item includes the following fields: (`backend/mocks/products.ts`)
-   `id`
-   `name` (product name)
-   `image_url` (image URL)
-   `quantity` (stock quantity)
-   `lastUpdated` (timestamp of the last update)

## Installation and Running the Project
### 1. Install Dependencies
```sh
npm install
```

### 2. Start Development Mode
Start both frontend and backend:
```sh
npm run dev
```
Start frontend and backend separately:
```sh
npm run dev:backend
npm run dev:frontend
```
Frontend and backend URLs: (ports based on .env)
```sh
FE: http://localhost:3000
BE: http://localhost:5001
```

## Dockerization
The project includes a **Docker Compose** configuration that starts both frontend and backend services:
```sh
docker-compose up --build
```
Dockerized environment URLs: (ports based on .env)
```sh
FE: http://localhost:8080
BE: http://localhost:5001
```
This allows the application to run in a fully containerized environment.

## Key Technologies
- **Frontend**: Nuxt 3, TailwindCSS, Nuxt i18n, Nuxt SVG Sprite, Socket.io Client
- **Backend**: Express.js, Mock API, Socket.io, Dotenv, CORS
- **Containerization**: Docker, Docker Compose