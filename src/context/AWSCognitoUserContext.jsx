import React, { createContext } from "react";

const initialValues = {
    AWSCognitoUser: null,
}

export const AWSCognitoUserContext = createContext(initialValues)

const AWSCognitoUserContextAPIProvider = (props) => {
    const value = {
        AWSCognitoUser: props.AWSCognitoUser,
    }

    return (
        <AWSCognitoUserContext.Provider value={value}>
            {props.children}
        </AWSCognitoUserContext.Provider>
        )
}

export default AWSCognitoUserContextAPIProvider