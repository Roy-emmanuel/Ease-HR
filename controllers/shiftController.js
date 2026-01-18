const Shift = require('../models/shift');
const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// Create a new shift (Manager)
exports.createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Shift created successfully',
      data: shift
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all shifts (Manager)
exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json({ success: true, data: shifts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Assign shift to employee (Manager)
exports.assignShiftToEmployee = async (req, res) => {
  try {
    const { employeeId, shiftId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(shiftId)) {
      return res.status(400).json({ message: 'Invalid shift ID' });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if shift exists
    const shift = await Shift.findById(shiftId);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    // Assign shift
    employee.shift = shift._id;
    await employee.save();

    // Return populated employee data
    const updatedEmployee = await Employee.findById(employee._id).populate('shift');

    res.json({
      success: true,
      message: 'Shift assigned successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};