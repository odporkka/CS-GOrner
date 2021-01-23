const jwt = require('jsonwebtoken');

const JWT_SECRET = 'getThisToEnvVarsPls';
const JWT_REFRESH_SECRET = 'getThisToEnvVarsTooPls';
const JWT_TOKEN_TTL = 86400;            // 24 h
const JWT_REFRESH_TOKEN_TTL = 86400;    // 24 h
const JWT_ALGORITHM = 'HS256';

/**
 * Get new access token
 *
 * @param payload
 * @returns {*}
 */
exports.getAccessToken = (payload, ip) => {
    return jwt.sign({
        steamid: payload.steamid, ip: ip
    }, JWT_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_TOKEN_TTL
    });
};

/**
 * Get new refresh token
 * @param payload
 * @returns {*}
 */
exports.getRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_REFRESH_TOKEN_TTL
    });
};

/**
 * Verify access token validity
 * @param token
 * @returns {*}
 */
exports.verifyAccessToken = (token, ip) => {
    try {
        const tokenInfo = jwt.verify(token, JWT_SECRET);
        // console.log('tokenInfo', tokenInfo)
        // console.log('ip', ip)
        if (tokenInfo.ip !== ip) {
            return { error: true, errorMessage: "Token and caller ip didn't match"};
        }
        return tokenInfo
    } catch (e) {
        return { error: true, errorMessage: "Token verify failed"};
    }
};

/**
 * Verify refresh token validity
 * @param token
 * @returns {*}
 */
exports.verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};
