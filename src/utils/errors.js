const AppError = require ('./AppError');


class ValidationError extends AppError{
    constructor(message = 'Invalid input data'){
        super(message, 400);

    }
}

class UnauthorizedError extends AppError{
    constructor(message = 'Invalid email or password'){
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor (messahe = 'You do not have permission to access this resource') {
        super(message, 403);
    }
}

class NotFoundError extends AppError {
    constructor (message = 'Resource  not found'){
        super(message, 404);
    }
}

class ConflictError extends AppError {
    constructor (message = 'Resource already exists') {
        super(message, 409);
    }
}

class InternalServerError extends AppError {
    constructor (message = 'Something went wrong') {
        super(message, 500);
        this.isOperational = false;
    }
}

module.exports = {
    AppError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalServerError,
};