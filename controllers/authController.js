const User = require('../models/UserModel');
const { generateAccessToken, generateRefreshToken } = require('../config/jwtConfig');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signup = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({ "access-token": accessToken, "refresh-token": refreshToken });
};

const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(user.matchPassword(password))) {
        return res.status(201).json({ message: "Invalid Credentails." })
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({ "access-token": accessToken, "refresh-token": refreshToken });

}

const refreshToken = async (req, res) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const accessToken = generateAccessToken(decoded.userId);

        return res.status(201).json({ "access-token": accessToken })

    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token " })
    }
}

module.exports = { signup, login, refreshToken };