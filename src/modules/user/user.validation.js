const Joi = require ('joi');

const userSchema = Joi.object({
    email: Joi.string()
    .email()
    .required(),
    

    password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])'))
    .required(),


    role: Joi.string().valid('user', 'admin').default ('user')

});

module.exports = {userSchema};