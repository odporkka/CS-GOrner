const jwt = require('jsonwebtoken');

const JWT_SECRET = 'getThisToEnvVarsPls';
const JWT_REFRESH_SECRET = 'getThisToEnvVarsTooPls';
const JWT_TOKEN_TTL = 120;              // 120 s
const JWT_REFRESH_TOKEN_TTL = 86400;    // 24 hr
const JWT_ALGORITHM = 'HS256';

exports.getAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_TOKEN_TTL
    });
};

exports.getRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_REFRESH_TOKEN_TTL
    });
};

exports.verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

exports.verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

// const access = getAccessToken('lol');
// const refresh = getRefreshToken('lol');
//
// console.log(access);
// console.log(refresh);
//
// console.log(verifyAccessToken(access));
// console.log(verifyRefreshToken(access));
