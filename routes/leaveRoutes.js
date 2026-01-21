const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  applyLeave,
  updateLeaveStatus,
  getLeaveHistory,
  getAllLeaves,
  cancelLeave   
} = require('../controllers/leaveController');

const router = express.Router();

// Employee applies leave
router.post('/', auth, role('employee'), applyLeave);

// Employee views own leave history
router.get('/history', auth, role('employee'), getLeaveHistory);

// Employee cancels a leave
router.delete('/:id', auth, role('employee'), cancelLeave);

// Manager approves/rejects leave
router.put('/:id', auth, role('manager', 'admin'), updateLeaveStatus);

// Manager views all leave requests
router.get('/all', auth, role('manager', 'admin'), getAllLeaves);

module.exports = router;