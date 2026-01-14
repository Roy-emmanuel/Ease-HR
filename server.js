// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');

// const app = express();
// app.use(express.json());

// connectDB();

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
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// **Health Check / Root Route**
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/shifts', require('./routes/shiftRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});