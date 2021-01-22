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
        authenticate: async (ctx) => {
            // Validate login and parse steamID
            const loginValidateResponse = await steam.validateLogin(ctx.arguments);
            if (loginValidateResponse.error) {
                return JSON.stringify(loginValidateResponse);
            }
            // Fetch user info from steam and database
            const user = await steam.getUserInfo(loginValidateResponse.steamid);
            console.log('user:', user)
            if (user && user.error) {
                return JSON.stringify(user);
            }
            const userFromDb = await api.getSteamUser(loginValidateResponse.steamid);
            if (userFromDb && userFromDb.error) {
                return JSON.stringify(userFromDb);
            }
            console.log('userFromDb', userFromDb)
            // Calculate session token
            user.token = jwtAuth.getAccessToken(user);
            // Save or create user
            let apiResponse;
            if (!userFromDb) {
                apiResponse = await api.createSteamUser(user);
            } else {
                apiResponse = await api.updateSteamUser(user);
            }
            console.log('apiResponse', apiResponse)
            if (apiResponse.error) {
                return JSON.stringify(apiResponse);
            }
            console.log('token:', apiResponse.token)
            console.log(jwtAuth.verifyAccessToken(apiResponse.token))
            return JSON.stringify(apiResponse)
        },
        isSessionValid: ctx => {
            console.log('Session check started!');
            console.log(ctx);
            return 'Session ok!';
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
    //console.log(event)
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error("Resolver not found.");
};
