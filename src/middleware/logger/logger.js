import winston from 'winston';
import config from '../../config/config.js';


const ENVIRONMENT = config.mode;

let logger;
//debug, http, info, warning, error, fatal
const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'blue'
    }
}

if (ENVIRONMENT === 'production') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info'
            }),
            new winston.transports.File({
                filename: 'src/logs/errors.log',
                level: 'error'
            })
        ]
    });
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug'
            })
        ]
    });
}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    //console.log
    // req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}