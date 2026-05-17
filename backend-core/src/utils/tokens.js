const jwt = require("jsonwebtoken")

const signInAccessToken = (payload) => {
    jwt.sign(payload,process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN, // 15 min
    });
}

const signInRefreshToken = (payload) => {
    jwt.sign(payload,process.env.JWT_REFRESH_SECRET , {
        expiresIn : process.env.JWT_REFRESH_EXPIRES_IN , //7 day
    });
}

const verifyAccessToken = (token) => {
    jwt.verify(token,process.env.JWT_SECRET);
}

const verifyrefreshToken = (token) => {
    jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}

module.exports = {
    signInAccessToken,
    signInRefreshToken,
    verifyAccessToken,
    verifyrefreshToken,
}