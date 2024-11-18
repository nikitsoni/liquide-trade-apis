const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken };