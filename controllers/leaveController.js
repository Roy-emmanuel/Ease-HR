const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');

// Employee applies leave
exports.applyLeave = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

    const leave = await LeaveRequest.create({
      employee: employee._id,
      reason: req.body.reason,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: 'pending'
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Manager approves/rejects leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Employee views own leave history
exports.getLeaveHistory = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

    const leaves = await LeaveRequest.find({ employee });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Manager views all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().populate('employee', 'name email');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Employee cancels their leave
exports.cancelLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;

    // Find the leave
    const leave = await LeaveRequest.findById(leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    // Make sure the employee owns this leave
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

    if (leave.employee.toString() !== employee._id.toString()) {
      return res.status(403).json({ message: 'You can only cancel your own leave' });
    }

    // Only allow cancellation if leave is pending
    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending leaves can be cancelled' });
    }

    // ✅ Proper deletion in modern Mongoose
    await leave.deleteOne();

    res.status(200).json({ message: 'Leave cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};