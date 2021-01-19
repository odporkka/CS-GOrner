/*global URLSearchParams*/
const jwtHandler = require('./jwtHandler');
const steamApi = require('./steamApi');

/* Amplify Params - DO NOT EDIT
	API_CSGORNER_GRAPHQLAPIENDPOINTOUTPUT
	API_CSGORNER_GRAPHQLAPIIDOUTPUT
	API_CSGORNER_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

function checkUserInfo(steamResponse, userFromDb) {
    return steamResponse;
}

function saveUser(updatedUser) {
    return updatedUser
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
    Query: {
        authenticate: async (ctx) => {
            const loginValidateResponse = await steamApi.validateLogin(ctx.arguments);
            if (loginValidateResponse.error) {
                return JSON.stringify(loginValidateResponse);
            }
            // TODO: Fetch user info from steam
            let steamResponse = { steamId: '12345' }
            // TODO: Fetch user info from db if found
            let userFromDb = null
            // TODO: Update user info if needed
            const user = checkUserInfo(steamResponse, userFromDb)
            // TODO: Calculate tokens and set them to user object
            const accessToken = jwtHandler.getAccessToken(user)
            const refreshToken = jwtHandler.getRefreshToken(user)
            const updatedUser = { ...user, accessToken: accessToken, refreshToken: refreshToken}
            // TODO: Save user
            saveUser(updatedUser)
            // Return user with accessToken
            const response = { ...user, accessToken: accessToken}
            return JSON.stringify(response)
        },
        sessionValid: ctx => {
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
