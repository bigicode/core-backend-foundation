const jwt = require ('jsonwebtoken');
const config = require('../config');



const authMiddleware = (req, res, next) => {
    console.log('All Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ') [1];

    try{
        const decode = jwt.verify(token, config.jwt.secret);
        req.user = decode
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};


module.exports = authMiddleware;