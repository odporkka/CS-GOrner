import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { CardMedia } from '@material-ui/core'

// MUI styles
const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    label: {
      paddingBottom: '10px'
    },
    paragraph: {
        paddingBottom: '20px'
    },
    cardMedia: {
        height: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'center'
    },
    imageAlign: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
    },
    image: {
        verticalAlign: 'middle',
        width: 200,
        height: 'auto',
        paddingRight: '15px'
    }
}))

/**
 * "/about" -page.
 *
 * @return {JSX.Element}
 * @constructor
 */
const AboutPage = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent className={classes.message}>
                <Typography className={classes.label} variant='h5' display='inline'>
                    Who am I?
                </Typography>
                <Typography className={classes.paragraph} variant='body2' display='inline'>
                    I'm a filthy casual scrub and coder from Finland who wanted to do something productive
                    for a change. I've been playing Counter-Strike somewhere around 3k hours since 2015 and
                    been a Global Elite for a some time. Currently I am also IGL in my workplace team which
                    plays in a national company league here in Finland. I don't consider myself any kind of pro but
                    I guess I still rank as somewhat better than average. So take any posts written by me with a
                    grain of salt.
                </Typography>
                <Typography className={classes.label} variant='h5' display='inline'>
                    Why I made this website?
                </Typography>
                <Typography className={classes.paragraph} variant='body2' display='inline'>
                    As an IGL I ran to a problem where I had to teach some default plays and tactics to my team.
                    I also didn't find much information on them anywhere so I first considered about just
                    writing down small notes of them on maps we play. That still sounded like a lot of work for such
                    a small thing (showing stuff over and over again sounded also kinda boresome) so I decided, what
                    a heck, I could probably spin up some sort of website for that. That way I could maybe help some
                    other people searching for that sort of information too. I also had to do a web programming
                    exercise for school so I realized I could kill two noobs with one shot so to speak.. And that leads us here.
                    Hopefully we get some quality content on here too.
                </Typography>
                <Typography className={classes.label} variant='h5' display='inline'>
                    What's up with that stupid name!?
                </Typography>
                <Typography className={classes.paragraph} variant='body2' display='inline'>
                    IDK, felt cute, might change later. Although made the logo already so maybe not.. I'm also a big fan
                    of finnish spurdo memes so..
                </Typography>
                <Typography variant='body2' display='inline' align='right'>
                    - Helarius Hiiri
                </Typography>
            </CardContent>

            <CardMedia className={classes.cardMedia}>
                <img className={classes.image} src='images/spurdo.png' alt='defuse kit'/>
            </CardMedia>
        </Card>
    )
}

export default AboutPage