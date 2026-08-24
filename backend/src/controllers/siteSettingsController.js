const SiteSettings = require("../models/SiteSettings");

// ==============================
// PUBLIC: Get Brochure Link
// ==============================
exports.getBrochureLink = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    // Create settings document if it does not exist
    if (!settings) {
      settings = await SiteSettings.create({
        brochureLink: "",
      });
    }

    res.json({
      brochureLink: settings.brochureLink || "",
    });
  } catch (error) {
    console.error("Get brochure link error:", error);

    res.status(500).json({
      message: "Failed to fetch brochure link",
    });
  }
};

// ==============================
// ADMIN: Update Brochure Link
// ==============================
exports.updateBrochureLink = async (req, res) => {
  try {
    const { brochureLink } = req.body;

    if (
      brochureLink !== undefined &&
      typeof brochureLink !== "string"
    ) {
      return res.status(400).json({
        message: "Brochure link must be a string",
      });
    }

    const trimmedLink = (brochureLink || "").trim();

    // Allow empty link so admin can temporarily remove brochure
    if (
      trimmedLink &&
      !/^https?:\/\/.+/i.test(trimmedLink)
    ) {
      return res.status(400).json({
        message: "Please enter a valid brochure URL",
      });
    }

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({
        brochureLink: trimmedLink,
      });
    } else {
      settings.brochureLink = trimmedLink;
      await settings.save();
    }

    res.json({
      message: "Brochure link updated successfully",
      brochureLink: settings.brochureLink,
    });
  } catch (error) {
    console.error("Update brochure link error:", error);

    res.status(500).json({
      message: "Failed to update brochure link",
    });
  }
};