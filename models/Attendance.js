const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    clockIn: {
      type: Date
    },

    clockOut: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);