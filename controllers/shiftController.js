const Shift = require('../models/shift');
const Employee = require('../models/Employee');

// Create shift (Manager)
exports.createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Shift created successfully',
      data: shift
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shifts (Manager)
exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json({ success: true, data: shifts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign shift to employee (Manager)
exports.assignShiftToEmployee = async (req, res) => {
  try {
    const { employeeId, shiftId } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.shift = shiftId;
    await employee.save();

    res.json({
      success: true,
      message: 'Shift assigned successfully',
      data: employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};