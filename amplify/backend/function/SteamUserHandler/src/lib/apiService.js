const https = require('https');
const AWS = require('aws-sdk');
const urlParse = require('url').URL;
const graphqlQueries = require('./graphqlConstants.js');

/* Amplify Params - DO NOT EDIT
	API_CSGORNER_GRAPHQLAPIENDPOINTOUTPUT
	API_CSGORNER_GRAPHQLAPIIDOUTPUT
	API_CSGORNER_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const appsyncUrl = process.env.API_CSGORNER_GRAPHQLAPIENDPOINTOUTPUT;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const region = process.env.REGION;
const apiKey = process.env.API_CSGORNER_GRAPHQLAPIKEYOUTPUT

/**
 * Returns SteamUser or null if not found.
 *
 * @param steamid Steam id
 * @returns {Promise<unknown>}
 */
exports.getSteamUser = async (steamid) => {
    try {
        const variables = {
            steamid: steamid
        };
        const req = new AWS.HttpRequest(appsyncUrl, region);
        req.method = "POST";
        req.path = "/graphql";
        req.headers.host = endpoint;
        req.headers["Content-Type"] = "application/json";
        req.body = JSON.stringify({
            query: graphqlQueries.getSteamUser,
            operationName: "GetSteamUser",
            variables: variables
        });

        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

        const apiResponse = await new Promise((resolve, reject) => {
            const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
                result.on('data', (data) => {
                    resolve(JSON.parse(data.toString()));
                });
            });

            httpRequest.write(req.body);
            httpRequest.end();
        });

        return apiResponse.data.getSteamUser;
    } catch (e) {
        console.log(e);
        return { error: true, errorMessage: 'Error happened while fetching steam user data' };
    }
};

/**
 * Create new steam user entry to database
 *
 * @param user
 * @returns {Promise<string|*|{errorMessage: string, error: boolean}>}
 */
exports.createSteamUser = async (user) => {
    try {
        const variables = {
            input: {
                ...user
            }
        };

        const req = new AWS.HttpRequest(appsyncUrl, region);
        req.method = "POST";
        req.path = "/graphql";
        req.headers.host = endpoint;
        req.headers["Content-Type"] = "application/json";
        req.body = JSON.stringify({
            query: graphqlQueries.createSteamUser,
            operationName: "CreateSteamUser",
            variables: variables
        });

        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());


        const apiResponse = await new Promise((resolve, reject) => {
            const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
                result.on('data', (data) => {
                    resolve(JSON.parse(data.toString()));
                });
            });
            httpRequest.write(req.body);
            httpRequest.end();
        });
        if (apiResponse &&
            apiResponse.data &&
            apiResponse.data.createSteamUser) {
            return apiResponse.data.createSteamUser;
        } else {
            return { error: true, errorMessage: 'No user data in api response' };
        }
    } catch (e) {
        console.log(e);
        return { error: true, errorMessage: 'Error happened while creating steam user' };
    }
}

/**
 * Update existing steam user entry
 *
 * @param user
 * @returns {Promise<string|*|{errorMessage: string, error: boolean}>}
 */
exports.updateSteamUser = async (user) => {
    try {
        const variables = {
            input: {
                ...user
            }
        };

        const req = new AWS.HttpRequest(appsyncUrl, region);
        req.method = "POST";
        req.path = "/graphql";
        req.headers.host = endpoint;
        req.headers["Content-Type"] = "application/json";
        req.body = JSON.stringify({
            query: graphqlQueries.updateSteamUser,
            operationName: "UpdateSteamUser",
            variables: variables
        });
        
        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

        const apiResponse = await new Promise((resolve, reject) => {
            const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
                result.on('data', (data) => {
                    resolve(JSON.parse(data.toString()));
                });
            });
            httpRequest.write(req.body);
            httpRequest.end();
        });
        console.log(apiResponse)
        if (apiResponse &&
            apiResponse.data &&
            apiResponse.data.updateSteamUser) {
            return apiResponse.data.updateSteamUser;
        } else {
            return { error: true, errorMessage: 'No user data in api response' };
        }
    } catch (e) {
        console.log(e);
        return { error: true, errorMessage: 'Error happened while updating steam user' };
    }
}