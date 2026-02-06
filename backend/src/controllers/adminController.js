const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Inquiry = require('../models/Inquiry');

/**
 * ADMIN: Get all users
 */
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

/**
 * ADMIN: Dashboard stats
 */
exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalEnrollments = await Enrollment.countDocuments();
  const pendingEnrollments = await Enrollment.countDocuments({ status: 'pending' });
  const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });
  const totalInquiries = await Inquiry.countDocuments();

  res.json({
    totalUsers,
    totalEnrollments,
    pendingEnrollments,
    activeEnrollments,
    totalInquiries
  });
};
