import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
// TODO: Icons for steam and discord



/**
 * Social buttons in Footer component.
 * 
 * @return {JSX.Element}
 * @constructor
 */
const SocialButtonBar = () => {
    const linkedInLink = 'https://www.linkedin.com/in/odporkka/'
    const instagramLink = 'http://example.com'
    const facebookLink = 'http://example.com'
    const steamGroupLink = 'http://example.com'
    const discordLink = 'http://example.com'


    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <IconButton aria-label='discord' color='inherit'
                    onClick={() => (window.open(discordLink))}>
                    <SportsEsportsIcon  />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='csgorner steam group' color='inherit'
                    onClick={() => (window.open(steamGroupLink))} >
                    <SportsEsportsIcon/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='facebook' color='inherit'
                    onClick={() => (window.open(facebookLink))} >
                    <FacebookIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='instagram' color='inherit'
                    onClick={() => (window.open(instagramLink))} >
                    <InstagramIcon />
                </IconButton>
            </Grid>
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