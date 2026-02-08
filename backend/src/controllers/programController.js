const Program = require('../models/Program');

exports.getAllPrograms = async (req, res) => {
  const programs = await Program.find({ isActive: true });
  res.json(programs);
};

exports.getProgramById = async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program)
    return res.status(404).json({ message: 'Program not found' });

  res.json(program);
};

// ADMIN: Create new program
exports.createProgram = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const program = await Program.create({
      title,
      description,
      duration,
      price
    });

    return res.status(201).json({
      message: "Program created successfully",
      program
    });
  } catch (error) {
    console.error("Create program error:", error);
    return res.status(500).json({ message: "Failed to create program" });
  }
};
