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
