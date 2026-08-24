const express = require("express");

const router = express.Router();

const siteSettingsController = require("../controllers/siteSettingsController");

const {
  protect,
  adminOnly,
} = require("../middlewares/authMiddleware");

// ==============================
// PUBLIC: Get Brochure Link
// ==============================
router.get(
  "/brochure",
  siteSettingsController.getBrochureLink
);

// ==============================
// ADMIN: Update Brochure Link
// ==============================
router.put(
  "/brochure",
  protect,
  adminOnly,
  siteSettingsController.updateBrochureLink
);

module.exports = router;