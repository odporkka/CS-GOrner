import React from "react"
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from "@material-ui/core/styles"

import AWSCognitoUserContextAPIProvider from '../context/AWSCognitoUserContext'
import ContextProvider from '../context/Context'
import { theme } from "../theme"

export const renderWithRouter = (ui, { route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route)
    return render(ui, { wrapper: BrowserRouter})
}

export const renderWithProviders = (ui, contentContextValue, awsUserContextValue) => {
    return renderWithRouter(
        <ThemeProvider theme={theme}>
            <ContextProvider
                contentData={contentContextValue}
                setContentData={null}>
                <AWSCognitoUserContextAPIProvider
                    AWSCognitoUser={awsUserContextValue}
                    setAWSCognitoUser={null}>
                    {ui}
                </AWSCognitoUserContextAPIProvider>
            </ContextProvider>
        </ThemeProvider>
    )
}

export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

