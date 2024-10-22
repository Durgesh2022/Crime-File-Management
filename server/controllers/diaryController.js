const Diary = require('../models/Diary');

// @desc    Create a new diary entry
// @route   POST /diary
// @access  Public
const createDiaryEntry = async (req, res) => {
  try {
    const { date, name, description } = req.body;
    const document = req.file ? req.file.path : null;

    // Create a new diary entry in the database
    const diary = new Diary({
      date,
      name,
      description,
      document,
    });

    await diary.save();

    res.status(201).json({
      message: 'Diary entry created successfully!',
      data: diary,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { createDiaryEntry };
