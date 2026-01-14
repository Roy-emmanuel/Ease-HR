const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  createShift,
  getAllShifts,
  assignShiftToEmployee
} = require('../controllers/shiftController');

const router = express.Router();

router.post('/', auth, role('manager'), createShift);
router.get('/', auth, role('manager'), getAllShifts);
router.post('/assign', auth, role('manager'), assignShiftToEmployee);

module.exports = router;