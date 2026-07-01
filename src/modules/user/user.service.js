const bcrypt = require('bcrypt');
const userRepository = require('./user.repository');
const { userSchema } = require('./user.validation');
const jwt = require ('jsonwebtoken'); 
const { ValidationError, ConflictError, UnauthorizedError, NotFoundError } = require ('../../utils/errors');
const logger = require('../../utils/logger');
const config = require('../../config');





class UserService{
    async register(userData){
        const { error, value } = userSchema.validate(userData);

        if (error) {
            throw new ValidationError (error.details[0].message);
        }

        const existingUser = await userRepository.findByEmail(value.email);

        if (existingUser) {
            throw new ConflictError ('Email already registered try another email');

            
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);


        const userid = await userRepository.create(value.email, hashedPassword, value.role);

        logger.info(`User registered: ${value.email} (ID: ${userid})`);

        return{id:userid, email:value.email, role:value.role}
    }

    async login (email, password){
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedError ('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedError (' Invalid email or password');
        }

        const token = jwt.sign(
            { id: user.id, email:user.email, role:user.role },
            config.jwt.secret,
            {
               expiresIn: config.jwt.expiresIn
            }
        )

        logger.info(`User logged in: ${email} (ID: ${user.id})`);

        return {id: user.Id, email: user.email, role:user.role, token}
    }

    async uploadAvatar (userId, file){
        if (!file){
            throw new ValidationError('No file uploaded');

        }

        const baseUrl = `${config.BASE_URL || 'http://localhost:500'}`;
        const avatarPath = `/uploads/${file.filename}`;
        const updated = await userRepository.updateAvatar(userId, avatarPath);
        const fullUrl = `${config.baseUrl}${avatarPath}`;


        if (!updated){
            throw new NotFoundError ('User not found');
        }
        logger.info(`User ${userId} updated avatar to ${avatarPath}`);
        return {avatar: avatarPath}
    }
}

module.exports = new UserService();