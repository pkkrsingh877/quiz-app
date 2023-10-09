// Import jsonwebtoken
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a JWT token when a user logs in
const generateToken = (user) => {
  const payload = {
    id: user._id
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }); // Change the secret key and expiration as needed
};

// Verify JWT tokens in your middleware or route handlers
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your secret key

    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { generateToken, verifyToken };