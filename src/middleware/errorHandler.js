const { AppError } = require('../utils/errors');
const logger = require ('../utils/logger');
const config = require ('../config');



const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';


    if (err.name === 'ValidationError' && err.isJoi){
        statusCode = 400;
        message = err.details[0].message;
    }

   if (statusCode >= 500){
    logger.error(`[${statusCode}] ${message}`, {stack:err.stack, url:req.originalUrl});

   }else{
    logger.warn(`[$statusCode] ${message}`, {url:req.originalUrl});
   }
    

    res.status(statusCode).json({
        success:false,
        message:message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack
        }),
    });
};

module.exports = errorHandler;