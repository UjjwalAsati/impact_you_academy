const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// PUBLIC routes
router.get("/", programController.getAllPrograms);
router.get("/:id", programController.getProgramById);

// ADMIN ONLY
router.post("/", protect, adminOnly, programController.createProgram);

module.exports = router;
