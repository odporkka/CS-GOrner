/*global URLSearchParams*/
const jwtAuth = require('./lib/jwtAuthService');
const steam = require('./lib/steamService');
const api = require('./lib/apiService');

/* Amplify Params - DO NOT EDIT
	API_CSGORNER_GRAPHQLAPIENDPOINTOUTPUT
	API_CSGORNER_GRAPHQLAPIIDOUTPUT
	API_CSGORNER_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
    Query: {
        authenticate: async (ctx, ip) => {
            // Validate login and parse steamID
            const loginValidateResponse = await steam.validateLogin(ctx.arguments);
            if (loginValidateResponse.error) {
                return JSON.stringify(loginValidateResponse);
            }

            // Fetch user info from steam and database
            const userFromSteam = await steam.getUserInfo(loginValidateResponse.steamid);
            // console.log('user:', user)
            if (userFromSteam && userFromSteam.error) {
                return JSON.stringify(userFromSteam);
            }
            const userFromDb = await api.getSteamUser(loginValidateResponse.steamid);
            if (userFromDb && userFromDb.error) {
                return JSON.stringify(userFromDb);
            }
            // console.log('userFromDb', userFromDb)

            // Calculate session and refresh token
            let updatedUser = {...userFromSteam};
            const token = jwtAuth.getAccessToken(userFromSteam, ip);
            updatedUser.token = token
            // updatedUser.refreshToken = jwtAuth.getRefreshToken(user);

            // Save or create user
            let apiResponse;
            if (!userFromDb) {
                console.log('User not found, making new entry for steamid:', loginValidateResponse.steamid)
                apiResponse = await api.createSteamUser(updatedUser);
            } else {
                apiResponse = await api.updateSteamUser({...updatedUser, id: userFromDb.id});
            }
            // console.log('apiResponse', apiResponse)
            if (apiResponse.error) {
                return JSON.stringify(apiResponse);
            }
            // console.log('token:', apiResponse.token)
            // console.log(jwtAuth.verifyAccessToken(apiResponse.token))
            return JSON.stringify({...userFromSteam, token: token})
        },
        renew: async (ctx, ip)  => {
            const token = ctx.arguments.token;
            try {
                // Verify and parse token
                const tokenInfo = jwtAuth.verifyAccessToken(token, ip);
                console.log('tokenInfo:', tokenInfo);
                if (tokenInfo.error) {
                    return JSON.stringify(tokenInfo);
                }
                const userFromDb = await api.getSteamUser(tokenInfo.steamid);
                // Nee to remove these before updating to database
                delete userFromDb.createdAt;
                delete userFromDb.updatedAt;
                console.log('user:', userFromDb);
                if (!userFromDb) {
                    return JSON.stringify({ error: true, errorMessage: 'No user found matching token' });
                }
                // Calculate and update token
                const renewedToken = jwtAuth.getAccessToken(userFromDb, ip);
                const apiResponse = await api.updateSteamUser({...userFromDb, token: renewedToken});
                if (apiResponse.error) {
                    return JSON.stringify(apiResponse);
                }
                // delete user.refreshToken
                return JSON.stringify({...userFromDb, token: renewedToken});
            } catch (e) {
                console.log('Validate error:', e);
                return JSON.stringify({ error: true, errorMessage: 'Could not validate token' });
            }
        }
    }
};

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
    const ip = event.request.headers["x-forwarded-for"].split(",")[0];
    //console.log(event)
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event, ip);
        }
    }
    throw new Error("Resolver not found.");
};
