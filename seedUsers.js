require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Employee = require('./models/Employee');
const connectDB = require('./config/db');

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});

    // Create Manager
    const managerPassword = await bcrypt.hash('manager123', 10);
    const manager = await User.create({
      name: 'John Manager',
      email: 'manager@example.com',
      password: managerPassword,
      role: 'manager'
    });

    // Create Employee
    const employeePassword = await bcrypt.hash('employee123', 10);
    const employeeUser = await User.create({
      name: 'Jane Employee',
      email: 'jane@example.com',
      password: employeePassword,
      role: 'employee'
    });

    // Create Employee document linked to the User
    const employeeDoc = await Employee.create({
      user: employeeUser._id,
      name: employeeUser.name,
      department: 'Not Assigned',
      position: 'Not Assigned'
    });

    console.log(' Seed complete!');
    console.log('Manager User ID:', manager._id.toString());
    console.log('Employee User ID:', employeeUser._id.toString());
    console.log('Employee Document ID (use this for assign shift):', employeeDoc._id.toString());

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();