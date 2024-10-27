const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  caseNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  document: {
    type: String, // Path to the uploaded document
  },
  image: {
    type: String, // Path to the uploaded image
  },
}, { timestamps: true });

module.exports = mongoose.model('Diary', diarySchema);
