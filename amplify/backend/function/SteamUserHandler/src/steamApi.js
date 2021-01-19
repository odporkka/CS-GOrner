/*
 * Steam API helper class
 */
const axios = require('axios');
const STEAM_LOGIN_URL = 'https://steamcommunity.com/openid/login';

/**
 * Calls steam openid to verify params from client.
 *
 * @param arguments event arguments
 * @returns {Promise<{status: string, message: string}|{error: boolean, errorMessage: string}>}
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
            return { status: 'ok', message: 'Steam login was verified' };
        } else {
            return { error: true, errorMessage: 'Could not verify steam login' };
        }
    } catch (e) {
        console.log(e);
        return { error: true, errorMessage: 'Got error response from steam' };
    }
}
