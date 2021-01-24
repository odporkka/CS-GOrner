import React, {createContext, useEffect} from 'react'
import { Auth } from 'aws-amplify';

// Values that context should have
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
    const { AWSCognitoUser, setAWSCognitoUser } = props
    useEffect( () => {
        async function fetchUser() {
            const user = await Auth.currentAuthenticatedUser()
            setAWSCognitoUser(user)
        }
        fetchUser().catch(() => {})
    }, [setAWSCognitoUser])

    const value = {
        AWSCognitoUser: AWSCognitoUser,
        setAWSCognitoUser: setAWSCognitoUser
    }

    return (
        <AWSCognitoUserContext.Provider value={value}>
            {props.children}
        </AWSCognitoUserContext.Provider>
    )
}

export default AWSCognitoUserContextAPIProvider