const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// ==========================
// PUBLIC ROUTES
// ==========================
router.get("/", programController.getAllPrograms);
router.get("/:id", programController.getProgramById);

// ==========================
// ADMIN ROUTES
// ==========================
router.post("/", protect, adminOnly, programController.createProgram);

// UPDATE PROGRAM (Edit)
router.patch("/:id", protect, adminOnly, programController.updateProgram);

// DEACTIVATE PROGRAM
router.patch("/:id/deactivate", protect, adminOnly, programController.deactivateProgram);

module.exports = router;
