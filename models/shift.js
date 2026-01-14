const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    startTime: {
      type: String, // e.g. "09:00"
      required: true
    },

    endTime: {
      type: String, // e.g. "17:00"
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shift', shiftSchema);