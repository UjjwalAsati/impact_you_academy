const Inquiry = require("../models/Inquiry");

/**
 * CUSTOMER: create inquiry
 */
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required"
      });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit inquiry" });
  }
};

/**
 * ADMIN: get all inquiries
 */
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

/**
 * ADMIN: update inquiry status
 */
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "contacted", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    inquiry.status = status;
    await inquiry.save();

    res.json({
      message: "Inquiry status updated",
      inquiry
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry" });
  }
};
