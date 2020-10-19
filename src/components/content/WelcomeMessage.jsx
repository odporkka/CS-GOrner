import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CardMedia } from '@material-ui/core'

// MUI styles
const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
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
        width: 150,
        height: 'auto',
        paddingRight: '15px'
    }
}))



/**
 * Welcome message on home page.
 * 
 * 
 * @return {JSX.Element}
 * @constructor
 */
const WelcomeMessage = () => {
    const classes = useStyles()


    return (
        <Card className={classes.root}>
            <CardContent className={classes.message}>
                <Typography variant='h6' display='inline'>
                    Welcome to csgorner.gg!
                </Typography>
                <Typography variant='body2' display='inline'>
                    This site is still under construction and doesn't have much content yet.
                    The bottom idea is to gather all kinds of Counter-Strike related tips and tactics
                    to one place. Hopefully it will take off and we will get some great content in the future.
                </Typography>
                <Typography variant='body2' display='inline' align='right'>
                    - Helarius Hiiri
                </Typography>
            </CardContent>

            <CardMedia className={classes.cardMedia}>
                <span className={classes.imageAlign}/>
                <img className={classes.image} src='images/defuse_kit.png' alt='defuse kit'/>
            </CardMedia>
        </Card>
    )
}

export default WelcomeMessage