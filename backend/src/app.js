const express = require("express");
const app = express();

// CORS middleware for frontend-backend communication
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// === THIS IS THE FIX ===
// Add middleware to parse JSON request bodies
app.use(express.json());
// ======================

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the healthcare application." });
});

// Import and use all application routes
const authRoutes = require("./routes/auth.routes");
const patientRoutes = require("./routes/patient.routes");
const doctorRoutes = require("./routes/doctor.routes");
const mappingRoutes = require("./routes/mapping.routes");

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

module.exports = app;

