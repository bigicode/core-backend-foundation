const express =  require ('express')
const router = express.Router();
const userController = require ('./user.controller');
const authMiddleware = require('../../middleware/auth');
const roleMiddleware = require ('../../middleware/role');
const { authLimiter } = require('../../middleware/rateLimiter');
const upload = require ('../../utils/upload');



//public routes
router.post('/register', authLimiter, userController.register);
router.post('/login', authLimiter, userController.login)

//protected routes

router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        success:true,
        data:req.user
    });
});

router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Admin Dashboard'
    });
});

router.put('/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);

module.exports = router;