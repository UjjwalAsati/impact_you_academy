const Enrollment = require('../models/Enrollment');
const Program = require('../models/Program');

/**
 * USER: Enroll in a program
 * Creates enrollment with status = pending
 */
exports.createEnrollment = async (req, res) => {
  const userId = req.user._id;
  const { programId } = req.body;

  if (!programId) {
    return res.status(400).json({ message: 'Program ID is required' });
  }

  const program = await Program.findById(programId);
  if (!program) {
    return res.status(404).json({ message: 'Program not found' });
  }

  // Prevent duplicate enrollment
  const existingEnrollment = await Enrollment.findOne({
    user: userId,
    program: programId
  });

  if (existingEnrollment) {
    return res.status(400).json({ message: 'Already enrolled in this program' });
  }

  const enrollment = await Enrollment.create({
    user: userId,
    program: programId,
    status: 'pending'
  });

  res.status(201).json({
    message: 'Enrollment created',
    enrollment
  });
};

/**
 * USER: Get my enrollments
 */
exports.getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate('program', 'title duration price status')
    .sort({ createdAt: -1 });

  res.json(enrollments);
};

/**
 * ADMIN: Get all enrollments
 */
exports.getAllEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate('user', 'name email')
    .populate('program', 'title price')
    .sort({ createdAt: -1 });

  res.json(enrollments);
};

/**
 * ADMIN: Update enrollment status
 */
exports.updateEnrollmentStatus = async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'active', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) {
    return res.status(404).json({ message: 'Enrollment not found' });
  }

  enrollment.status = status;
  await enrollment.save();

  res.json({
    message: 'Enrollment status updated',
    enrollment
  });
};
