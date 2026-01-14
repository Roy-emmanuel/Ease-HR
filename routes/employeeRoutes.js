const express = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  getMyProfile,
  updateMyProfile,
  getAllEmployees,
  getEmployeeById,
  getEmployeeLeaves
} = require('../controllers/employeeController');

const router = express.Router();

// Employee routes
router.get('/me', auth, role('employee'), getMyProfile);
router.put('/me', auth, role('employee'), updateMyProfile);

// Manager/Admin routes
router.get('/', auth, role('manager', 'admin'), getAllEmployees);

//  Manager/Admin: view single employee by ID
router.get('/:id', auth, role('manager', 'admin'), getEmployeeById);

//  Manager/Admin: view leave requests of a single employee
router.get('/:id/leaves', auth, role('manager', 'admin'), getEmployeeLeaves);

module.exports = router;