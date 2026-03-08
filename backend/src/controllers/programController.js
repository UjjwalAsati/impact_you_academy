const Program = require("../models/Program");

// ==============================
// PUBLIC: Get Active Programs
// ==============================
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch programs" });
  }
};

// ==============================
// PUBLIC: Get Single Program
// ==============================
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program)
      return res.status(404).json({ message: "Program not found" });

    res.json(program);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch program" });
  }
};

// ==============================
// ADMIN: Create Program (FULL)
// ==============================
exports.createProgram = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      certification,
      schedule,
      learningOutcomes,
      modules
    } = req.body;

    if (!title || !price) {
      return res
        .status(400)
        .json({ message: "Title and price are required" });
    }

    const program = await Program.create({
      title,
      description,
      duration,
      price,
      certification,
      schedule,
      learningOutcomes,
      modules
    });

    res.status(201).json({
      message: "Program created successfully",
      program
    });
  } catch (error) {
    console.error("Create program error:", error);
    res.status(500).json({ message: "Failed to create program" });
  }
};

// ==============================
// ADMIN: Update Program (EDIT)
// ==============================
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program)
      return res.status(404).json({ message: "Program not found" });

    Object.assign(program, req.body);

    await program.save();

    res.json({
      message: "Program updated successfully",
      program
    });
  } catch (error) {
    console.error("Update program error:", error);
    res.status(500).json({ message: "Failed to update program" });
  }
};

// ==============================
// ADMIN: Delete Program
// ==============================
exports.deactivateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({
      message: "Program deleted successfully"
    });

  } catch (error) {
    console.error("Delete program error:", error);
    res.status(500).json({ message: "Failed to delete program" });
  }
};
