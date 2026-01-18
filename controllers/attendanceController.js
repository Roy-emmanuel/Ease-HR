const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Helper: get today date string
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};


  // CLOCK IN
 
exports.clockIn = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    // Sprint 5 requirement: validate shift assignment
    if (!employee.shift) {
      return res.status(400).json({
        message: 'No shift assigned to employee'
      });
    }

    const today = getTodayDate();

    const existingAttendance = await Attendance.findOne({
      employee: employee._id,
      date: today
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: 'You have already clocked in today'
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date: today,
      clockIn: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Clock-in successful',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  CLOCK OUT

exports.clockOut = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const today = getTodayDate();

    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: today
    });

    if (!attendance) {
      return res.status(400).json({
        message: 'You have not clocked in today'
      });
    }

    if (attendance.clockOut) {
      return res.status(400).json({
        message: 'You have already clocked out today'
      });
    }

    attendance.clockOut = new Date();
    await attendance.save();

    res.json({
      success: true,
      message: 'Clock-out successful',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ATTENDANCE HISTORY
 */
exports.getAttendanceHistory = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });

    const records = await Attendance.find({
      employee: employee._id
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};