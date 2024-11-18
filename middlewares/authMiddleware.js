const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const validateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Access Denied!" }); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user_id = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = validateUser;