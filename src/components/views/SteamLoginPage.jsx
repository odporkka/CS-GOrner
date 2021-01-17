import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import * as api from '../../backend/api'
import { SteamUserContext } from '../../context/SteamUserContext'
import LoadingSpinner from '../content/LoadingSpinner'


// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
    },
    contentPaper: {
    },
    form: {
    },
    steamLoginButton: {
        width: '150px'
    }
}))


/**
 * "/admin" -page used for logging in as AWS IAM user (editors).
 *
 * OBS!! Page is wrapped with "withAuthenticator"!
 * This shows embedded AWS login window if user is not already logged in.
 * The actual component is only rendered if login is found.
 *
 * @return {JSX.Element}
 * @constructor
 */
const SteamLoginPage = () => {
    const classes = useStyles()
    const history = useHistory()
    const [ loading, setLoading ] = useState(false)
    const { steamUser, setSteamUser } = useContext(SteamUserContext)

    useEffect(() => {
        let mounted = true
        setLoading(true)

        const validateUser = async () => {
            const searchParams = new URLSearchParams(history.location.search)
            if (mounted) {
                // Initial steam login redirect,
                if (searchParams.has('openid.mode') &&
                    searchParams.get('openid.mode') === 'id_res') {
                    const response = await api.steamAuthentication(searchParams.toString())
                    console.log('response:', response)
                    // Wipe user info from context if error was returned
                    if (response.error) {
                        setSteamUser(null)
                    // Ask confirmation
                    } else if (response.status === 'register') {
                        console.log('Need permission from user')
                    // Set user
                    } else if (response.status === 'ok') {
                        setSteamUser('user')
                    }
                }
            }
        }

        validateUser().catch((e) => console.log(e))
        setLoading(false)
        return () => { mounted = false }
    },[history.location.search, setSteamUser])


    return (
        <Paper className={classes.contentPaper}>
            <Container xs={12}>
                <Grid container spacing={2} justify='center'>

                    { loading &&
                    <LoadingSpinner />
                    } 

                    { !steamUser && !loading &&
                    <>
                        <Grid item xs={12}>
                            <Typography variant='h6' align='center'>
                                No login detected!<br/> You can log in via Steam by clicking link below:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <form action="https://steamcommunity.com/openid/login" method="post">
                                <input type="hidden" name="openid.identity"
                                       value="http://specs.openid.net/auth/2.0/identifier_select" />
                                <input type="hidden" name="openid.claimed_id"
                                       value="http://specs.openid.net/auth/2.0/identifier_select" />
                                <input type="hidden" name="openid.ns" value="http://specs.openid.net/auth/2.0" />
                                <input type="hidden" name="openid.mode" value="checkid_setup" />
                                <input type="hidden" name="openid.realm" value="http://localhost:3000" />
                                <input type="hidden" name="openid.return_to" value="http://localhost:3000/login" />
                                <input
                                    type="image"
                                    alt="steam_login_button"
                                    src="/images/steam_login.png"
                                    className={classes.steamLoginButton}/>
                            </form>
                        </Grid>
                    </>
                    }

                    { steamUser && !loading &&
                    <>
                        <Grid item xs={12}>
                            <Typography variant='h6' align='center'>
                                You are logged in as: {steamUser}!<br/>
                                You can log out below (this doesn't log you out from Steam):
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Grid item>
                                <button onClick={() => alert('log out!')}>Log out!</button>
                            </Grid>
                        </Grid>
                    </>

                    }
                </Grid>
            </Container>
        </Paper>
    )
}

export default SteamLoginPage