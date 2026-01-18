// const User = require('../models/User');
// const Employee = require('../models/Employee');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const sendEmail = require('../utils/sendEmail');

// // Register a new user
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate email verification token
//     const verificationToken = crypto.randomBytes(32).toString('hex');

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       emailVerificationToken: verificationToken
//     });

//     if (role.toLowerCase() === 'employee') {
//       await Employee.create({ user: user._id, name: user.name });
//     }
//     res.status(201).json({
//       message: 'User registered successfully. Please check your email to verify your account.'
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Login an existing user
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email before logging in.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.json({
//       message: 'Login successful',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       },
//       token
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Verify email endpoint
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const user = await User.findOne({ emailVerificationToken: token });

//     if (!user) return res.status(400).json({ message: 'Invalid or expired verification token' });

//     user.isVerified = true;
//     user.emailVerificationToken = undefined;
//     await user.save();

//     res.json({ message: 'Email verified successfully. You can now log in.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER NEW USER (EMPLOYEE / MANAGER)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // If role is employee, create Employee profile
    if (role.toLowerCase() === 'employee') {
      await Employee.create({
        user: user._id,
        name: user.name
      });
    }

    res.status(201).json({
      message: 'User registered successfully. You can now login.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};