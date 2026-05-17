const { query } = require("../config/db");
const { verifyAccessToken } = require("../utils/tokens");
const ApiError = require("../utils/ApiError");

// Protects any route — attach this middleware to routes that need login
const protect = (req,res,next) => {
    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new ApiError(401,"No token provided. Please log in");
    }

    const token = authHeader.split(" ")[1];

    // jwt.verify throws if token is expired or tampered — express-async-errors catches it
    const decoded = verifyAccessToken(token);

    const {rows} = await query(
        "SELECT id, name, email, role FROM users WHERE id = $1",
        [decoded.id]
    );

    if(!rows.length){
        throw new APiError(401,"User no longer exists.");
    }

    req.user = rows[0];
    next();

    // Role-based access control — usage: authorize("admin")
    const authorize = (...roles) => {
        return (req,res,next) => {
            if(!roles.includes(req.user.role)) {
                throw new ApiError(403,"You are not allowed to perform this action");
            }
            next();
        };
    };
};

module.exports = {
    protect,
    authorize,
}
