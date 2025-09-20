// // Load environment variables from .env file
// require('dotenv').config();

// module.exports = {
//     HOST: process.env.DB_HOST,
//     // Temporarily hardcoding the correct username to resolve the connection issue.
//     USER: 'adarshpradhan', 
//     PASSWORD: process.env.DB_PASSWORD,
//     DB: process.env.DB_NAME,
//     DIALECT: process.env.DB_DIALECT,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };

// // Load environment variables from .env file
// require('dotenv').config();

// module.exports = {
//     HOST: process.env.DB_HOST,
//     // Using your specific username to ensure connection
//     USER: 'adarshpradhan', 
//     PASSWORD: process.env.DB_PASSWORD,
//     // === THIS IS THE CHANGE FOR OUR TEST ===
//     DB: 'healthcare_test_db', // Using a new, unique name
//     // ======================================
//     DIALECT: process.env.DB_DIALECT,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };


// // Load environment variables from .env file
// require('dotenv').config();

// module.exports = {
//     HOST: process.env.DB_HOST,
//     // === THIS IS THE FINAL FIX ===
//     // Reverting to the default 'postgres' user which has ownership rights
//     USER: 'postgres', 
//     // ============================
//     PASSWORD: process.env.DB_PASSWORD,
//     // We will use the original database name
//     DB: 'healthcare_db', 
//     DIALECT: process.env.DB_DIALECT,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };


// Load environment variables from .env file
require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    // === THIS IS THE FINAL, CORRECT USERNAME ===
    USER: 'adarshpradhan', 
    // ===========================================
    PASSWORD: process.env.DB_PASSWORD,
    // Using the original database name
    DB: 'healthcare_db', 
    DIALECT: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

