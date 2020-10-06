import React, {createContext} from "react"

const initialValues = {
    AWSCognitoUser: null,
    setAWSCognitoUser: () => {}
}

export const AWSCognitoUserContext = createContext(initialValues)

/**
 * Context for AWS user (Users that can add/modify content)
 * Actual state and setter are hosted in App.js root component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const AWSCognitoUserContextAPIProvider = (props) => {
    const value = {
        AWSCognitoUser: props.AWSCognitoUser,
        setAWSCognitoUser: props.setAWSCognitoUser
    }

    return (
        <AWSCognitoUserContext.Provider value={value}>
            {props.children}
        </AWSCognitoUserContext.Provider>
        )
}

export default AWSCognitoUserContextAPIProvider