import React, { useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Own classes/components

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
    },
    contentPaper: {
    },
    form: {

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

    useEffect(() => {
        let mounted = true
        const fetch = async () => {
            const searchParams = new URLSearchParams(history.location.search)
            // Fetch post if id defined in url parameters
            if (mounted) {
                for (const [key, value] of searchParams) {
                    console.log(key, value)
                }
            }
        }
        fetch().catch((e) => console.log(e))

        return () => { mounted = false }
    },[history.location.search])


    return (
        <Paper className={classes.contentPaper}>
            <Container xs={12}>
                <Grid container spacing={2} justify='center'>
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
                            <input type="image" alt="steam_login_button" src="/images/steam_login.png" />
                            {/*<button type="submit">Log in through Steam</button>*/}
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default SteamLoginPage