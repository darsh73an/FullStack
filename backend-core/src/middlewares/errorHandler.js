const ApiError = require("../utils/ApiError");

const errorHandler = (req,res,next) => {

    //                     known error
    const statusCode = err.isOperational ? err.statusCode : 500;

    const message = err.isOperational ? err.message : "Something went wrong. Try again later";

    // Always log the full error on the server side
    console.error(`[ERROR] ${req.method} ${req.originalurl} ->` , err);

    res.status(statusCode).json({
        sucess:false,
        message,
        errors : err.errors || [],

        ...(process.env.NODE_ENV === "development" && {stack : err.stack}),
    });
}

module.exports = errorHandler;