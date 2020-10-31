import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import AWSCognitoUserContextAPIProvider from './context/AWSCognitoUserContext'
import ContextAPIProvider from './context/Context'
import Footer from './components/content/Footer'
import NavBar from './components/navigation/NavBar'
import Router from './Router'
import ScrollToTopComponent from './util/ScrollToTopComponent'
import { theme } from './theme'

// MUI styles
const useStyles = makeStyles(() => ({
    rootContainer: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    mainGrid: {
        flex: 1
    },
    mainContent: {
        width: 'calc(100% - 320px)',
        // border: '1px solid blue',
        display: 'inline',
    },
    rightSideBanner: {
        width: '300px',
        marginLeft: '20px',
        float: 'right',
        border: '1px solid blue',
        display: 'inline',
    },
}))



/**
 * Root component
 *
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
    const classes = useStyles()

    /*
     * AWS Admin user stuff:
     * - Actual getter/setter for user (these are passed to context as props)
     * - UseEffect for fetching user if page is first loaded and previous login is still valid
     */
    const [AWSCognitoUser, setAWSCognitoUser] = useState(null)
    useEffect( () => {
        async function fetchUser() {
            const user = await Auth.currentAuthenticatedUser()
            console.log(user)
            setAWSCognitoUser(user)
        }
        fetchUser()
            .catch((e) => console.log(e))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.rootContainer}>
                <ContextAPIProvider>
                    <AWSCognitoUserContextAPIProvider
                        AWSCognitoUser={AWSCognitoUser}
                        setAWSCognitoUser={setAWSCognitoUser}>
                        <CssBaseline />
                        <BrowserRouter>
                            <ScrollToTopComponent />

                            <NavBar />

                            <Grid container className={classes.mainGrid} justify='center'>
                                <Grid item className={classes.mainContent}>
                                    <Router />
                                </Grid>

                                {/*<Grid item className={classes.rightSideBanner}>*/}
                                {/*    <Container>*/}
                                {/*        /!*<p>Sidebanner</p>*!/*/}
                                {/*    </Container>*/}
                                {/*</Grid>*/}

                            </Grid>

                            <Footer />
                        </BrowserRouter>
                    </AWSCognitoUserContextAPIProvider>
                </ContextAPIProvider>
            </Container>
        </ThemeProvider>
    )
}

export default App
