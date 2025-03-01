const express = require("express");
const http = require("http");
const cors = require("cors");
const data = require("./mocks/products.ts");

const app = express();
const server = http.createServer(app);

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

  const { quantity, clientLastUpdated } = req.body;
  const serverRow = tableData[rowIndex];

  // Check if there's a conflict (server has a newer version)
  if (new Date(clientLastUpdated) < new Date(serverRow.lastUpdated)) {
    return res.status(409).json({
      error: "Conflict detected",
      serverRow
    });
  }

  // Update server row
  console.log(`Updating row ${id} from ${serverRow.quantity} to ${quantity}`);
  serverRow.quantity = quantity;
  serverRow.lastUpdated = new Date().toISOString();

  res.json(serverRow);
});

server.listen(4000, () => console.log("Server running on http://localhost:4000"));
