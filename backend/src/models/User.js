const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },

  passwordResetToken: String,
  passwordResetExpires: Date

},
{ timestamps: true }
);

/**
 * Password hashing middleware
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  // Prevent double hashing
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});


module.exports = mongoose.model('User', userSchema);
