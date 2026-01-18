const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      default: 'Not Assigned'
    },

    position: {
      type: String,
      default: 'Not Assigned'
    },

    phone: {
      type: String,
      trim: true
    },
    
    //  Sprint 5: Shift assignment
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shift',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);