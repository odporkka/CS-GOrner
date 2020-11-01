import React, { createContext } from "react";

// Values that context should have
const initialValues = {
    contentData: {
        maps: [],
        newPosts: [],
        authors: [],
    },
    setContentData: () => {}
}
export const Context = createContext(initialValues)


/**
 * Context for general always loaded content
 * Actual state and setter are hosted in App.js root component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const ContextProvider = (props) => {
    const value = {
        contentData: props.contentData,
        setContentData: props.setContentData
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider