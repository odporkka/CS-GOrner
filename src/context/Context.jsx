import React, { createContext, useEffect, useState } from "react";

// Own classes/components
import * as api from "../backend/api"


// Values that context should have
const initialValues = {
    maps: [],
    newPosts: [],
}
export const Context = createContext(initialValues)

/*
 * Sort maps based on canonical name, but put "General" first
 */
const sortMaps = (unsorted) => {
    // Pick "general" map
    const general = unsorted.find((m) => (m.name === 'general'))
    // Filter general out of unsorted
    unsorted = unsorted.filter((m) => (m.name !== 'general'))
    // Sort based on canonical (display) name
    const sorted = unsorted.sort((m1, m2) => (m1.canonicalName > m2.canonicalName) ? 1 : -1)
    // Return general in front of list
    sorted.unshift(general)
    return sorted
}


/**
 * ContextProvider component.
 * Store data fetched from API here.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const ContextAPIProvider = (props) => {
    /*
     * Set up context state (and implement setter functions)
     */
    const initialState = {
        ...initialValues
    }
    const [contentData, setContentData] = useState(initialState)

    /*
     * Stuff fetched at first page load
     */
    useEffect( () => {
        async function fetchData() {
            const maps = await api.fetchMaps()
            const posts = await api.fetch10NewestPosts()
            if (maps.error || posts.error) {
                console.log('Error(s) while fetching data:')
                if (maps.error) console.log('Maps error:', maps.errorMessage)
                if (posts.error) console.log('Posts error:', posts.errorMessage)
                return
            }
            setContentData(state => ({...state, maps: sortMaps(maps), newPosts: posts}))
        }
        fetchData()
            .catch((e) => console.log(e))
    }, [])


    return (
        <Context.Provider value={{ contentData, setContentData}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextAPIProvider