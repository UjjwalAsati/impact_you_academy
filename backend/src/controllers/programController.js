const Program = require("../models/Program");

// ==============================
// PUBLIC: Get Active Programs
// ==============================
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true });

    res.json(programs);
  } catch (error) {
    console.error("Get programs error:", error);

    res.status(500).json({
      message: "Failed to fetch programs"
    });
  }
};

// ==============================
// PUBLIC: Get Single Program
// ==============================
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "Program not found"
      });
    }

    res.json(program);
  } catch (error) {
    console.error("Get program error:", error);

    res.status(500).json({
      message: "Failed to fetch program"
    });
  }
};

// ==============================
// ADMIN: Create Program
// ==============================
exports.createProgram = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      allowSeatBooking,
      seatBookingAmount,
      certification,
      schedule,
      learningOutcomes,
      modules
    } = req.body;

    if (!title || price === undefined || price === "") {
      return res.status(400).json({
        message: "Title and price are required"
      });
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Invalid course price"
      });
    }

    const seatBookingEnabled = Boolean(allowSeatBooking);

    const numericSeatBookingAmount =
      seatBookingAmount === undefined ||
      seatBookingAmount === ""
        ? 999
        : Number(seatBookingAmount);

    if (
      seatBookingEnabled &&
      (Number.isNaN(numericSeatBookingAmount) ||
        numericSeatBookingAmount <= 0)
    ) {
      return res.status(400).json({
        message: "Valid seat booking amount is required"
      });
    }

    if (
      seatBookingEnabled &&
      numericSeatBookingAmount >= numericPrice
    ) {
      return res.status(400).json({
        message:
          "Seat booking amount must be less than the full course price"
      });
    }

    const program = await Program.create({
      title,
      description,
      duration,
      price: numericPrice,
      allowSeatBooking: seatBookingEnabled,
      seatBookingAmount: numericSeatBookingAmount,
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

    res.status(500).json({
      message: "Failed to create program"
    });
  }
};

// ==============================
// ADMIN: Update Program
// ==============================
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "Program not found"
      });
    }

    const {
      price,
      allowSeatBooking,
      seatBookingAmount
    } = req.body;

    if (price !== undefined) {
      const numericPrice = Number(price);

      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          message: "Invalid course price"
        });
      }

      program.price = numericPrice;
    }

    if (allowSeatBooking !== undefined) {
      program.allowSeatBooking = Boolean(allowSeatBooking);
    }

    if (seatBookingAmount !== undefined && seatBookingAmount !== "") {
      const numericSeatBookingAmount = Number(seatBookingAmount);

      if (
        Number.isNaN(numericSeatBookingAmount) ||
        numericSeatBookingAmount <= 0
      ) {
        return res.status(400).json({
          message: "Invalid seat booking amount"
        });
      }

      program.seatBookingAmount = numericSeatBookingAmount;
    }

    if (
      program.allowSeatBooking &&
      program.seatBookingAmount >= program.price
    ) {
      return res.status(400).json({
        message:
          "Seat booking amount must be less than the full course price"
      });
    }

    const fields = [
      "title",
      "description",
      "duration",
      "certification",
      "schedule",
      "learningOutcomes",
      "modules",
      "isActive"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        program[field] = req.body[field];
      }
    });

    await program.save();

    res.json({
      message: "Program updated successfully",
      program
    });
  } catch (error) {
    console.error("Update program error:", error);

    res.status(500).json({
      message: "Failed to update program"
    });
  }
};

// ==============================
// ADMIN: Delete Program
// ==============================
exports.deactivateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "Program not found"
      });
    }

    res.json({
      message: "Program deleted successfully"
    });
  } catch (error) {
    console.error("Delete program error:", error);

    res.status(500).json({
      message: "Failed to delete program"
    });
  }
};