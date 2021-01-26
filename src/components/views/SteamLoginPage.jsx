import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CheckBox from "@material-ui/core/Checkbox"

// Own classes/components
import { SteamUserContext } from '../../context/SteamUserContext'
import LoadingSpinner from '../content/LoadingSpinner'
import * as steamService from '../../util/steamService'



// MUI styles
const useStyles = makeStyles((theme) => ({
    steamLoginButton: {
        width: '150px'
    },
    cardDiv: {
        maxWidth: '600px',
        padding: '25px'
    },
    card: {
        border: `2px solid ${theme.palette.secondary.main}`,
        display: 'flex'
    },
    cardLoggedIn: {
        border: `2px solid green`,
        display: 'flex'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    steamAvatar: {
        height: '100%',
        width: 184
    },
    logoutButton: {
        marginBottom: '20px'
    }
}))


/**
 * '/admin' -page used for logging in as AWS IAM user (editors).
 *
 * OBS!! Page is wrapped with 'withAuthenticator'!
 * This shows embedded AWS login window if user is not already logged in.
 * The actual component is only rendered if login is found.
 *
 * @return {JSX.Element}
 * @constructor
 */
const SteamLoginPage = () => {
    const classes = useStyles()
    const history = useHistory()
    const [ loading, setLoading ] = useState(true)
    const [ consentGiven, setConsentGiven ] = useState(false)
    const { steamUser, setSteamUser } = useContext(SteamUserContext)

    useEffect(() => {
        let mounted = true
        const login = async () => {
            const searchParams = new URLSearchParams(history.location.search)
            if (mounted) {
                // Already logged in, don't do anything
                if (steamUser && steamUser.personaname) {
                    return
                // Check if token present and validate
                } else if (steamService.tokenPresent()) {
                    await steamService.renew(setSteamUser)
                // Initial steam login redirect
                } else if (searchParams.has('openid.mode') &&
                    searchParams.get('openid.mode') === 'id_res') {
                    // console.log('auth')
                    await steamService.authenticate(searchParams, setSteamUser)
                }
                setLoading(false)
            }
        }
        login().catch((e) => console.log(e))
        return () => { mounted = false }
    },[history.location.search, steamUser, setSteamUser])

    const logOutHandler = () => {
        steamService.logOut(setSteamUser)
        history.push('/login')
    }


    return (
        <Paper>
            <Container xs={12}>
                <Grid container spacing={2} justify='center'>

                    { loading &&
                    <LoadingSpinner />
                    } 

                    { !steamUser && !loading &&
                    <div>
                        <Grid item xs={12} className={classes.cardDiv}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant='h6' align='center'>
                                        No login detected!
                                    </Typography>
                                    <Typography variant='body1'>
                                        Log in is required to be able to vote on posts.
                                        We only use your steamid and information from you public profile.
                                        Login expires after being inactive for 12 hours after which you must
                                        log in again through steam.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <FormControlLabel control={
                                <CheckBox
                                checked={consentGiven}
                                style={{color: 'white'}}
                                onChange={() => setConsentGiven(!consentGiven)}
                                />
                            }
                            label='I understand'
                            />
                        </Grid>
                        {consentGiven &&
                        <div>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Typography variant='h6' align='center'>
                                    You can log in via Steam by clicking link below:
                                </Typography>
                            </Grid>
                            <Grid item style={{textAlign: 'center'}}>
                                <form action='https://steamcommunity.com/openid/login' method='post'>
                                    <input type='hidden' name='openid.identity'
                                           value='http://specs.openid.net/auth/2.0/identifier_select'/>
                                    <input type='hidden' name='openid.claimed_id'
                                           value='http://specs.openid.net/auth/2.0/identifier_select'/>
                                    <input type='hidden' name='openid.ns' value='http://specs.openid.net/auth/2.0'/>
                                    <input type='hidden' name='openid.mode' value='checkid_setup'/>
                                    <input type='hidden' name='openid.realm' value='http://localhost:3000'/>
                                    <input type='hidden' name='openid.return_to' value='http://localhost:3000/login'/>
                                    <input
                                        type='image'
                                        alt='steam_login_button'
                                        src='/images/steam_login.png'
                                        className={classes.steamLoginButton}/>
                                </form>
                            </Grid>
                        </div>
                        }
                    </div>
                    }

                    { steamUser && !loading &&
                    <div>
                        <Grid item xs={12} container justify='center'>
                            <Grid item xs={12} className={classes.cardDiv}>
                                {/*<Card classes={{root: classes.card}}>*/}
                                <Card className={classes.cardLoggedIn}>
                                    <CardMedia className={classes.steamAvatar}>
                                        <img
                                            style={{padding: '10px'}}
                                            alt='steam-user-avatar'
                                            src={steamUser.avatarfull} />
                                    </CardMedia>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant='h6' align='center'>
                                            You are logged in as:
                                        </Typography>
                                        <Typography variant='h5' align='center'>
                                            {steamUser.personaname}
                                        </Typography>
                                        <Typography variant='body1' align='center'>
                                            Your login is valid for the next 12 hours.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justify='center' className={classes.logoutButton}>
                            <Grid item>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    onClick={() => logOutHandler()}>
                                Log out!
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    }
                </Grid>
            </Container>
        </Paper>
    )
}

export default SteamLoginPage