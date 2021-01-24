import * as api from "../backend/api";

const TOKEN = 'csgorner-st'

export const renew = async (setSteamUser) => {
    const oldToken = localStorage.getItem(TOKEN);
    const response = await api.steamRenew(oldToken);
    // console.log('response:', response)
    const { error, errorMessage, token, ...user} = response
    if (error) {
        console.log(errorMessage)
        // Log out the user (will clear token)
        logOut()
        return
    }
    localStorage.setItem(TOKEN, response.token)
    setSteamUser(user)
}

export const authenticate = async (searchParams, setSteamUser) => {
    const response = await api.steamAuthentication(searchParams.toString())
    // console.log('response:', response)
    const { error, errorMessage, token, ...user} = response
    // Wipe user info from context if error was returned
    if (error) {
        alert(`Login failed\n${errorMessage}`)
        // Ask confirmation
    } else if (token && user) {
        localStorage.setItem(TOKEN, response.token)
        setSteamUser(user)
    }
}

export const tokenPresent = () => {
    return !!localStorage.getItem(TOKEN);
}

export const logOut = (setSteamUser) => {
    localStorage.removeItem(TOKEN)
    setSteamUser(null)
}