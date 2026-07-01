const joi = require('joi');
const dotenv = require('dotenv');
const path = require ('path');


dotenv.config({ path: path.join(__dirname, '../../.env')});


const envSchema = joi.object({

    PORT: joi.number().default(5000),
    NODE_ENV: joi.string().valid('development', 'staging', 'production').default ('development'),

    JWT_SECRET: joi.string().required(),

    DB_HOST: joi.string().default('localhost'),
    DB_USER: joi.string().default('root'),
    DB_PASSWORD: joi.string().allow(''),
    DB_NAME: joi.string().required(),
    BASE_NAME: joi.string().default('http://localhost:5000'),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error (`Config validation error: ${error.message}`);

}

const config = {
    port:envVars.PORT,
    env: envVars.NODE_ENV,
    baseUrl: envVars.BASE_URL,
    jwt: {
        secret: envVars.JWT_SECRET,
        expiresIn: '7d',
    },

    db:{
        host:envVars.DB_HOST,
        user: envVars.DB_USER,
        password:envVars.DB_PASSWORD,
        name: envVars.DB_NAME,
    },

    logLevel: envVars.NODE_ENV === 'production' ? 'info' : 'debug',
}

module.exports = config;
