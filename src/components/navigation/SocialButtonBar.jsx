import React from 'react'
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
// TODO: Icons for steam and discord
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const SocialButtonBar = () => {
    const linkedInLink = 'https://www.linkedin.com/in/odporkka/'
    const instagramLink = 'http://example.com'
    const facebookLink = 'http://example.com'
    const steamGroupLink = 'http://example.com'
    const discordLink = 'http://example.com'

    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <IconButton aria-label='discord' color='inherit'>
                    <SportsEsportsIcon onClick={() => (window.open(discordLink))} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='csgorner steam group' color='inherit'>
                    <SportsEsportsIcon onClick={() => (window.open(steamGroupLink))} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='facebook' color='inherit'>
                    <FacebookIcon onClick={() => (window.open(facebookLink))} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='instagram' color='inherit'>
                    <InstagramIcon onClick={() => (window.open(instagramLink))} />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton aria-label='linked in' color='inherit'>
                    <LinkedInIcon onClick={() => (window.open(linkedInLink))} />
                </IconButton>
            </Grid>

        </Grid>
    )
}

export default SocialButtonBar