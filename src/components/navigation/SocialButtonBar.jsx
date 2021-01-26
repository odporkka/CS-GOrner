import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
// import InstagramIcon from '@material-ui/icons/Instagram'
// import FacebookIcon from '@material-ui/icons/Facebook'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
// TODO: Icons for steam and discord

const useStyles = makeStyles((theme) => ({
    socialIcon: {
        width: '24px',
        height: '24px'
    },
}))

/**
 * Social buttons in Footer component.
 * 
 * @return {JSX.Element}
 * @constructor
 */
const SocialButtonBar = () => {
    const classes = useStyles()
    const discordLink = 'https://discord.gg/bkdBypPRq2'
    const linkedInLink = 'https://www.linkedin.com/in/odporkka/'
    // const instagramLink = 'http://example.com'
    // const facebookLink = 'http://example.com'
    const steamGroupLink = 'http://example.com'


    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <IconButton aria-label='discord' color='inherit'
                    onClick={() => (window.open(discordLink))}>
                    <img src='./images/discord.png' alt='discord-server-link' className={classes.socialIcon}/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='csgorner steam group' color='inherit'
                    onClick={() => (window.open(steamGroupLink))} >
                    <SportsEsportsIcon/>
                </IconButton>
            </Grid>
            {/*<Grid item>*/}
            {/*    <IconButton aria-label='facebook' color='inherit'*/}
            {/*        onClick={() => (window.open(facebookLink))} >*/}
            {/*        <FacebookIcon />*/}
            {/*    </IconButton>*/}
            {/*</Grid>*/}
            {/*<Grid item>*/}
            {/*    <IconButton aria-label='instagram' color='inherit'*/}
            {/*        onClick={() => (window.open(instagramLink))} >*/}
            {/*        <InstagramIcon />*/}
            {/*    </IconButton>*/}
            {/*</Grid>*/}
            <Grid item>
                <IconButton aria-label='linked in' color='inherit'
                    onClick={() => (window.open(linkedInLink))} >
                    <LinkedInIcon />
                </IconButton>
            </Grid>

        </Grid>
    )
}

export default SocialButtonBar