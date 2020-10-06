import React, { createContext, useEffect, useState } from "react";

import * as api from "../graphql/api"

const initialValues = {
    maps: [],
    posts: [],
    setPosts: () => {}
}

export const Context = createContext(initialValues)

const ContextAPIProvider = (props) => {
    /*
     * Set up context state (and implement setter functions)
     */
    const setPosts = (posts) => {
        setContentData({...contentData, posts: posts})
    }

    const initialState = {
        ...initialValues,
        setPosts: setPosts
    }
    const [ contentData, setContentData ] = useState(initialState)

    /*
     * Stuff fetched at first page load
     */
    useEffect( () => {
        async function fetchData() {
            const maps = await api.fetchMaps()
            const posts = await api.fetch10NewPosts()
            if (maps.error || posts.error) {
                console.log('Error(s) while fetching data:')
                if (maps.error) console.log('Maps error:', maps.errorMessage)
                if (posts.error) console.log('Posts error:', posts.errorMessage)
                return
            }
            setContentData(state => ({...state, maps: maps, posts: posts}))
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