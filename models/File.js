const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  dateUploaded: Date,
  lastUpdated: Date,
  duration: Number,
  transcription: String,
});

module.exports = mongoose.model('File', fileSchema);