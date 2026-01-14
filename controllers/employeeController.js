const Employee = require('../models/Employee');
const User = require('../models/User');
const LeaveRequest = require('../models/LeaveRequest');

/**
 * Get logged-in employee profile
 */
exports.getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id }).populate(
      'user',
      'name email role'
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update logged-in employee profile
 */
exports.updateMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Admin / Manager: Get all employees
 */
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate(
      'user',
      'name email role'
    );

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Admin / Manager: Get single employee by ID
 */
exports.getEmployeeById = async (req, res) => {
  try {
    // Use findById safely
    const employee = await Employee.findById(req.params.id).populate(
      'user',
      'name email role'
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Manager: Get leave requests of a single employee
 */
exports.getEmployeeLeaves = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const leaves = await LeaveRequest.find({ employee: employee._id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};