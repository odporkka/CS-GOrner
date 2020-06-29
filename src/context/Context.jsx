import React, { createContext, useEffect, useState } from "react";
import { API, graphqlOperation } from 'aws-amplify'
import { listMaps } from '../graphql/queries'

const initialValues = {
    maps: []
}

export const Context = createContext(initialValues)

const ContextAPIProvider = (props) => {
    const [ contentData, setContentData ] = useState(initialValues)

    useEffect(() => {
        fetchMaps()
            .then(() => console.log('Maps fetch successful'))
    }, [])

    async function fetchMaps() {
        try {
            const mapsData = await API.graphql(graphqlOperation(listMaps))
            // console.log('maps:', mapsData)
            const maps = mapsData.data.listMaps.items
            setContentData({ maps: maps })
        } catch (err) { console.log('Error fetching maps') }
    }

    return (
        <Context.Provider value={{ contentData, setContentData}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextAPIProvider;