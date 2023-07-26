import EErrors from "./enums.js";

const errorHandler = (error, req, res, next) => {
    switch(error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            res.status(400).send({
                status: 'error',
                error: error.name,
                description: error.cause
            })
            break;
        default:
            res.status(500).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
            break;
    }
    next();
} 

export default errorHandler;