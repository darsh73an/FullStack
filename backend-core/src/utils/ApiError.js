class ApiError extends Error {
    constructor(statusCode,message,errors = []){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.isOperational = true; // marks it as a known, expected error
    }
}

module.exports = ApiError;