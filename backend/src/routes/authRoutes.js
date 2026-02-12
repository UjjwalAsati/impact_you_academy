const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const forgotPasswordLimiter = require("../middlewares/forgotPasswordLimiter");


router.get("/verify-email/:token", authController.verifyEmail);
router.post('/register', authController.register);
router.post('/login', authController.login);

router.post("/forgot-password", forgotPasswordLimiter, authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
