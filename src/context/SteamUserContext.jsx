import React, { createContext, useEffect } from 'react'
import * as steamService from '../util/steamService'

// Values that context should have
const initialValues = {
    steamUser: null,
    setSteamUser: () => {},
}
export const SteamUserContext = createContext(initialValues)



/**
 * Context for Steam user
 * Actual state and setter are hosted in App.js root component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const SteamUserContextAPIProvider = (props) => {
    const {
        setSteamUser
    } = props
    /*
     * Called when rendering api component.
     * Tries to set steam user if token is found.
     */
    useEffect(() => {
        let mounted = true
        const fetchUser = async () => {
            if (steamService.tokenPresent() && mounted) {
                await steamService.renew(setSteamUser)
            }
        }
        fetchUser().catch((e) => console.log(e))
        return () => { mounted = false }
    }, [setSteamUser])


    const value = {
        steamUser: props.steamUser,
        setSteamUser: props.setSteamUser,
    }

    return (
        <SteamUserContext.Provider value={value}>
            {props.children}
        </SteamUserContext.Provider>
    )
}

export default SteamUserContextAPIProvider
