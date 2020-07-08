import React, { createContext, useEffect, useState } from "react";

import * as api from "../graphql/api"

const initialValues = {
    maps: []
}

export const Context = createContext(initialValues)

const ContextAPIProvider = (props) => {
    const [ contentData, setContentData ] = useState(initialValues)

    useEffect( () => {
        async function fetchData() {
            const maps = await api.fetchMaps();
            setContentData({ maps: maps })
        }
        fetchData();
    }, [])

    return (
        <Context.Provider value={{ contentData, setContentData}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextAPIProvider