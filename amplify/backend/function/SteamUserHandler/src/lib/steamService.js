/*
 * Steam API helper class
 */
const axios = require('axios');
const STEAM_LOGIN_URL = 'https://steamcommunity.com/openid/login';
const STEAM_API_KEY = '6810BF818F72AB2B2A65A39E9E446D6E';
const STEAM_PLAYER_SUMMARY_URL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=`

/**
 * Calls steam openid to verify params from client.
 *
 * @param arguments event arguments
 * @returns {Promise<{status: string, steamID: string, message: string}|{error: boolean, errorMessage: string}>}
 */
exports.validateLogin = async (arguments) => {
    const urlParams = arguments.urlParams;
    if (!urlParams) return { error: true, errorMessage: 'No url params received'};
    let searchParams;
    try {
        searchParams = new URLSearchParams(urlParams);
    } catch (e) {
        return { error: true, errorMessage: 'Could not parse url params'};
    }
    searchParams.set('openid.mode', 'check_authentication');
    const url = STEAM_LOGIN_URL + "?" + searchParams.toString();
    try {
        const steamResponse = await axios.get(url);
        const regex = RegExp('is_valid:true');
        if (regex.test(steamResponse.data)) {
            const steamid = parseSteamId(searchParams.get('openid.claimed_id'));
            return {
                status: 'ok',
                steamid: steamid,
                message: 'Steam login was verified'
            };
        } else {
            return { error: true, errorMessage: 'Could not verify steam login' };
        }
    } catch (e) {
        console.log(e);
        return { error: true, errorMessage: 'Got error response from steam' };
    }
}

/**
 * Query user information from Steam api by steamid
 * @param steamid steamid
 * @returns {Promise<{errorMessage: string, error: boolean}|any>}
 */
exports.getUserInfo = async (steamid) => {
    const url = STEAM_PLAYER_SUMMARY_URL + steamid
    try {
        const steamResponse = await axios.get(url);
        // console.log('steamResponse', steamResponse.data.response);
        if (steamResponse &&
            steamResponse.data &&
            steamResponse.data.response &&
            steamResponse.data.response.players &&
            steamResponse.data.response.players[0]) {
            return parseUserInfoResponse(steamResponse.data.response.players[0]);
        } else {
            return { error: true, errorMessage: 'No player info in steam response' };
        }

    } catch (e) {
        console.log(e);
        return { error: true, errorMessage: 'Got error response from steam' };
    }
}

/**
 * Parse steamid from claim
 *
 * @param claimedId
 * @returns {*}
 */
const parseSteamId = (claimedId) => {
    const pathArray = claimedId.split('/');
    return pathArray[pathArray.length - 1];
}

/**
 * Parse params from steam response
 *
 * SteamUser params:
 * id: ID!
 * token: String!
 * steamid: String!
 * personaname: String!
 * profileurl: String!
 * avatar: String
 * avatarmedium: String
 * avatarfull: String
 * avatarhash: String
 * loccountrycode: String
 * @param steamResponse
 * @returns {{steamid: *, profileurl: *, avatarhash: *, avatarfull: *, avatarmedium: *, avatar: *, loccountrycode: *, personaname: *}}
 */
const parseUserInfoResponse = (steamResponse) => {
    return {
        steamid: steamResponse.steamid,
        personaname: steamResponse.personaname,
        profileurl: steamResponse.profileurl,
        avatar: steamResponse.avatar,
        avatarmedium: steamResponse.avatarmedium,
        avatarfull: steamResponse.avatarfull,
        avatarhash: steamResponse.avatarhash,
        loccountrycode: steamResponse.loccountrycode
    };
}
