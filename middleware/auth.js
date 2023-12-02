// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust the path as needed

exports.requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    };
};
