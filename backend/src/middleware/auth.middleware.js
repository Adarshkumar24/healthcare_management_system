const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  
  // --- Start of Debugging Logs ---
  console.log("\n--- Auth Middleware Check ---");
  console.log("Token received from header:", token ? "A token was found." : "No token found.");
  // --- End of Debugging Logs ---

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not configured on the server.");
    return res.status(500).send({ message: "Internal Server Error: Auth secret not configured." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // --- Start of Debugging Logs ---
      console.log("Middleware Error: Token verification failed.", err.message);
      // --- End of Debugging Logs ---
      return res.status(401).send({ message: "Unauthorized! Invalid Token." });
    }
    
    // --- Start of Debugging Logs ---
    console.log("Token decoded successfully:", decoded);
    req.userId = decoded.id;
    console.log("req.userId has been set to:", req.userId);
    console.log("---------------------------\n");
    // --- End of Debugging Logs ---
    
    next();
  });
};

module.exports = { verifyToken };

