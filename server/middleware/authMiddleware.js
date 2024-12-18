const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token is found, you need to log in' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded;
        next();
        
    } catch (err) {
        res.status(400).json({ error: 'Invalid token provided' });
    }
};

module.exports = auth;
