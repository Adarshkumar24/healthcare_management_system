// Import the entire middleware module
const authMiddleware = require("../middleware/auth.middleware");
const controller = require("../controllers/mapping.controller");
const router = require("express").Router();

// Use the middleware function from the imported module
router.use(authMiddleware.verifyToken);

// Routes
router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/patient/:patientId", controller.findAllForPatient);
router.delete("/", controller.delete);

module.exports = router;

