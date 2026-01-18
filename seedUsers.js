require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Employee = require('./models/Employee');
const connectDB = require('./config/db');

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear existing users (optional)
    await User.deleteMany({});
    await Employee.deleteMany({});

    // Manager
    const managerPassword = await bcrypt.hash('manager123', 10);
    await User.create({
      name: 'John Manager',
      email: 'manager@example.com',
      password: managerPassword,
      role: 'manager'
    });

    // Employee
    const employeePassword = await bcrypt.hash('employee123', 10);
    const employeeUser = await User.create({
      name: 'Jane Employee',
      email: 'jane@example.com',
      password: employeePassword,
      role: 'employee'
    });

    await Employee.create({
      user: employeeUser._id,
      name: employeeUser.name
    });

    console.log('Seed users created successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();