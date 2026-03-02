const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { signToken } = require('../utils/jwt');
const sendEmail = require("../utils/sendEmail");
const PendingUser = require("../models/PendingUser");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing real user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Remove old pending records
    await PendingUser.deleteMany({ email });

    // Generate raw token (sent in email)
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash token (store in DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await PendingUser.create({
      name,
      email,
      password, // DO NOT hash here (model pre-save will hash)
      verificationToken: hashedToken,
      expiresAt: Date.now() + 15 * 60 * 1000
    });

    const verifyURL = `${process.env.FRONTEND_URL}/verify-email/${rawToken}`;

    await resend.emails.send({
    from: "Impact You Academy <onboarding@impactyouacademy.com>",
    to: email,
    subject: "Verify your email - Impact You Academy",
    html: `
      <h2>Verify Your Email</h2>
      <p>Click below to activate your account:</p>
      <a href="${verifyURL}">Verify Email</a>
      <p>This link expires in 15 minutes.</p>
    `
    });

    res.json({
      message: "Verification email sent. Please check your inbox."
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const pendingUser = await PendingUser.findOne({
      verificationToken: hashedToken,
      expiresAt: { $gt: Date.now() }
    });

    if (!pendingUser) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Create real user (password already hashed by PendingUser model)
    await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password
    });

    await PendingUser.deleteOne({ _id: pendingUser._id });

    res.json({
      message: "Email verified successfully. You can now login."
    });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};





/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: user._id });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};


/**
 * FORGOT PASSWORD
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // Always respond generically (prevent email enumeration)
    if (!user) {
      return res.json({
        message: "If an account with that email exists, a reset link has been sent."
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 mins

    await user.save();

    // Create reset link
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send Email
    await resend.emails.send({
     from: "Impact You Academy <onboarding@impactyouacademy.com>",
      to: user.email,
      subject: "Password Reset - Impact You Academy",
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetURL}" 
          style="display:inline-block;padding:10px 15px;background:#1e293b;color:#ffffff;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({
      message: "If an account with that email exists, a reset link has been sent."
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({
      message: "Error processing request"
    });
  }
};



/**
 * RESET PASSWORD
 */
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken');

    if (!user) {
      return res.status(400).json({ message: 'Token invalid or expired' });
    }

    user.password = password; // pre-save hook will hash
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};
