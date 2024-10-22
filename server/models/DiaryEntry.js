const mongoose = require('mongoose');

const DiaryEntrySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('DiaryEntry', DiaryEntrySchema);
