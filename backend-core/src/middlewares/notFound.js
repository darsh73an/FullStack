const ApiError = require('../utils/ApiError')

const notFound = (re,res,next) => {
    next(new ApiError(404,`Route ${req.originalUrl} not found`,))
}

module.exports = notFound;