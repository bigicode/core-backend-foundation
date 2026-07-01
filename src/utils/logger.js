const winston = require ('winston');
const path = require ('path');
const config = require('../config');

const logDirectory = path.join(__dirname, '../../logs');

const logFormat = winston.format.combine(
    winston.format.timestamp({format: 'YYY-MM-DD HH:mm:ss'}),
    winston.format.errors({ stack: true}),
    winston.format.splat(),
    winston.format.json()
);

const logger = winston.createLogger({
    level: config.env.LOG_LEVEL || 'info', 
    format: logFormat,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),

        ...(config.env.NODE_ENV === 'development'? [
            new winston.transports.File({
                filename: path.join(logDirectory, 'combined.log'),
                maxsize: 5242880,
                maxFiles: 5,
            }),
            new winston.transports.File({
                filename:path.join(logDirectory, 'error.log'),
                level: 'error',
                maxsize:5242880,
                maxFiles: 5,
            }),
        ]
    :[]),
    ],

    exitOnError: false,
});

module.exports = logger;