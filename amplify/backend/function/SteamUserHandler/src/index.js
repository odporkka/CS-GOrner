/*global URLSearchParams*/
const axios = require('axios');

/* Amplify Params - DO NOT EDIT
	API_CSGORNER_GRAPHQLAPIENDPOINTOUTPUT
	API_CSGORNER_GRAPHQLAPIIDOUTPUT
	API_CSGORNER_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const STEAM_URL = 'https://steamcommunity.com/openid/login';

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
    Query: {
        authenticate: async (ctx) => {
            // console.log('Steam auth verification started!')
            const urlParams = ctx.arguments.urlParams;
            // console.log('urlParams', urlParams)
            const searchParams = new URLSearchParams(urlParams);
            // console.log('searchParams', searchParams)
            searchParams.set('openid.mode', 'check_authentication');
            // console.log('searchParams', searchParams)
            const url = STEAM_URL + "?" + searchParams.toString();
            //console.log('url', url)

            let response;
            try {
                const steamResponse = await axios.get(url);
                console.log(steamResponse.data);
                const regex = RegExp('is_valid:true');

                if (regex.test(steamResponse.data)) {
                    response = { status: 'ok', message: 'User was verified!' };
                } else {
                    response = { error: true, errorMessage: 'Could not validate steam user' };
                }
            } catch (e) {
                console.log(e);
                response = { error: true, errorMessage: 'Could not validate steam user' };
            }
            return JSON.stringify(response);
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
