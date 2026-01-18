// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');

// const app = express();
// app.use(express.json());

// const allowedOrigins = [
//   'https://victoryemeh.github.io',
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);

//       if (origin.startsWith('http://localhost')) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error('Not allowed by CORS'));
//     },
//     credentials: true,
//   })
// );

// // Connect to MongoDB
// connectDB();

// // Health check
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/leaves', require('./routes/leaveRoutes'));
// app.use('/api/employees', require('./routes/employeeRoutes'));
// app.use('/api/attendance', require('./routes/attendanceRoutes'));
// app.use('/api/shifts', require('./routes/shiftRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Parse JSON bodies
app.use(express.json());

// CORS setup
const allowedOrigins = [
  'https://victoryemeh.github.io', 
  'http://localhost:3000',         
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true, // allows cookies and Authorization headers
}));
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // stop server if DB fails
  }
};
connectDB();

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));           
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/shifts', require('./routes/shiftRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});