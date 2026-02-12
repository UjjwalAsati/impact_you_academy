const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const pendingUserSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  verificationToken: {
    type: String,
    required: true
  },

  expiresAt: {
    type: Date,
    required: true
  }

},
{ timestamps: true }
);

/**
 * 🔐 Hash password before saving
 */
pendingUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

/**
 * 🕒 Auto delete after expiry
 */
pendingUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("PendingUser", pendingUserSchema);
