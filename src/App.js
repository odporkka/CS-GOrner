import React, { useEffect, useState } from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import AWSCognitoUserContextAPIProvider from './context/AWSCognitoUserContext'
import ContextProvider from './context/Context'
import Footer from './components/content/Footer'
import NavBar from './components/navigation/NavBar'
import Router from './Router'
import ScrollToTopComponent from './components/navigation/ScrollToTopComponent'
import SteamUserContextAPIProvider from './context/SteamUserContext'
import { theme } from './theme'
import * as api from './backend/api'

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

    /*
     * Steam user stuff:
     * - Actual getter/setter for user (these are passed to context as props)
     * - UseEffect for fetching user if page is first loaded and previous login is still valid
     */
    const [steamUser, setSteamUser] = useState({ loading: true })

    /*
     * Content fetched at first page load
     */
    const initialValues = {
        maps: [],
        newPosts: [],
        authors: []
    }
    const [contentData, setContentData] = useState(initialValues)
    useEffect( () => {
        async function fetchData() {
            let maps = await api.fetchMaps()
            const posts = await api.fetch5NewestPosts()
            let authors = await api.fetchAuthorsList()

            if (maps.error || posts.error || authors.error) {
                console.log('Error(s) while fetching data:')
                if (maps.error) console.log('Maps error:', maps.errorMessage)
                if (posts.error) console.log('Posts error:', posts.errorMessage)
                if (authors.error) console.log('Authors error:', authors.errorMessage)
                return
            }

            /*
             * Sort and edit content
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
            maps = sortMaps(maps)
            authors = authors.sort((a1, a2) => (a1.username > a2.username) ? 1 : -1)

            // console.log('Context-Maps: ', maps)
            // console.log('Context-Posts: ', posts)
            // console.log('Context-Authors: ', authors)

            setContentData(prevState => ({
                ...prevState,
                maps: maps,
                newPosts: posts,
                authors: authors
            }))
        }
        fetchData().then()
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.rootContainer}>
                <ContextProvider
                    contentData={contentData}
                    setContentData={setContentData}>
                    <AWSCognitoUserContextAPIProvider
                        AWSCognitoUser={AWSCognitoUser}
                        setAWSCognitoUser={setAWSCognitoUser}>
                        <SteamUserContextAPIProvider
                            steamUser={steamUser}
                            setSteamUser={setSteamUser}>

                            <CssBaseline />
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
                        </SteamUserContextAPIProvider>
                    </AWSCognitoUserContextAPIProvider>
                </ContextProvider>
            </Container>
        </ThemeProvider>
    )
}

export default App
