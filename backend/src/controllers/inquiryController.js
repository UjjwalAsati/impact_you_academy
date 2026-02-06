const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  await Inquiry.create({ name, email, phone, message });

  res.status(201).json({ message: 'Inquiry submitted successfully' });
};

exports.getAllInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
};

exports.updateInquiryStatus = async (req, res) => {
  const { status } = req.body;

  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry)
    return res.status(404).json({ message: 'Inquiry not found' });

  inquiry.status = status;
  await inquiry.save();

  res.json({ message: 'Status updated' });
};
