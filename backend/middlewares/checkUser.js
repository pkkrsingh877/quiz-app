const { verifyToken } = require('../functions/generateToken');
require('dotenv').config();

const checkUserMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    verifyToken(token);
    next();
}

module.exports = checkUserMiddleware;