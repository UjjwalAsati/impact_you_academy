const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    brochureLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SiteSettings",
  siteSettingsSchema
);