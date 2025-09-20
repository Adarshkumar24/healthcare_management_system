// Load environment variables from .env file AT THE VERY START
require('dotenv').config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

const db = require("./src/models");

// === THIS IS THE FINAL VERSION ===
// sync() will connect to the DB and create tables if they don't exist,
// but it will NOT delete your data on every restart.
db.sequelize.sync() 
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });
// =================================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

