const userService = require('./user.service');


class UserController {
    async register (req, res, next){ 
        try {
            const result = await userService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        }catch (error){
          next(error);
        }
    }

    async login (req, res, next) {
        try{
            const { email, password } = req.body;
            const result = await userService.login(email, password);
            res.status(200).json({
                success: true,
                message: 'User logged in successful',
                data: result
            });
        } catch (error){
           next(error);
        }
    }

    async uploadAvatar(req, res, next){
        try{
            const userId = req.user.id;
            const result = await userService.uploadAvatar(userId, req.file);
            res.status(200).json({
                success:true,
                message: 'Avatar updated successfully',
                data:result
            });
        }catch (error) {
            next (error);
        }
    }

    async profile(req, res, next){
        try{
            res.status(200).json({
                success: true,
                data: req.user,
            });
        } catch (error){
            next(error)
        }
    }
}


module.exports = new UserController();