const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  clockIn,
  clockOut,
  getAttendanceHistory
} = require('../controllers/attendanceController');

const router = express.Router();

// Employee attendance routes
router.post('/clock-in', auth, role('employee'), clockIn);
router.post('/clock-out', auth, role('employee'), clockOut);
router.get('/history', auth, role('employee'), getAttendanceHistory);

module.exports = router;