const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per IP
  message: {
    message: "Too many password reset attempts. Please try again later."
  }
});
