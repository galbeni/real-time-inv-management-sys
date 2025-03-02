const express = require("express"); // Import Express.js server
const http = require("http"); // Import Node.js http module
const cors = require("cors"); // Import CORS middleware
const { Server } = require("socket.io"); // Import Socket.io server
const data = require("./mocks/products.ts"); // Import mock table data

const BACKEND_PORT = process.env.BACKEND_PORT || 5001; // Define the server port
const app = express();
const server = http.createServer(app);

// Create a new Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

// Sample table data stored in memory
let tableData = data.products;

// GET all rows
app.get("/api/rows", (req, res) => res.json(tableData));

// GET a single row by ID
app.get("/api/rows/:id", (req, res) => {
  const row = tableData.find(item => item.id === Number(req.params.id));
  row ? res.json(row) : res.status(404).json({ error: "Row not found" });
});

// PUT to update a row with conflict detection
app.put("/api/rows/:id", (req, res) => {
  const id = Number(req.params.id);
  const rowIndex = tableData.findIndex(item => item.id === id);
  if (rowIndex === -1) return res.status(404).json({ error: "Row not found" });

  const { quantity, clientLastUpdated, forceUpdate } = req.body;
  const serverRow = tableData[rowIndex];

  // If the client explicitly requested a force update, there is NO conflict
  // and the server has no other job than updating the data
  if (forceUpdate) {
    serverRow.quantity = quantity;
    serverRow.lastUpdated = new Date().toISOString();
    io.emit("rowUpdated", { id });
    return res.json(serverRow);
  }

  // Normal conflict detection if there is no forceUpdate
  if (new Date(clientLastUpdated) < new Date(serverRow.lastUpdated)) {
    return res.status(409).json({
      error: "Conflict detected",
      serverRow
    });
  }

  // Update the row and notify all clients
  serverRow.quantity = quantity;
  serverRow.lastUpdated = new Date().toISOString();
  io.emit("rowUpdated", { id });
  res.json(serverRow);
});

// WebSocket event handler
io.on("connection", () => {
  console.log("Client connected via WebSocket!");
});

// Start the server
require('dotenv').config({ path: '../.env' });
server.listen(BACKEND_PORT, "0.0.0.0", () => console.log(`Server running on http://0.0.0.0:${BACKEND_PORT}`));
