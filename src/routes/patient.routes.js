// --- THIS IS THE UPDATED PART ---
// Import the entire middleware module
const authMiddleware = require("../middleware/auth.middleware");
// =================================

const controller = require("../controllers/patient.controller");
const router = require("express").Router();

// --- THIS IS THE UPDATED PART ---
// Use the middleware function from the imported module
router.use(authMiddleware.verifyToken);
// =================================

// Routes
router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;

