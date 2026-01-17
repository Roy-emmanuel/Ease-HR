// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Attach only the user ID and role
//     req.user = { id: decoded.id, role: decoded.role };
//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };






const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email' });

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};