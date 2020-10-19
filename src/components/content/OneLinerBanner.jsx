import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CardMedia } from '@material-ui/core'

// MUI styles
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
    },
    quote: {
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
        width: 'auto',
        height: 100,
    }
}))



/**
 * On liners at top of home page.
 * 
 * 
 * @return {JSX.Element}
 * @constructor
 */
const OneLinerBanner = () => {
    const classes = useStyles()


    return (
        <Card className={classes.root}>
            <CardContent className={classes.quote}>
                <Typography variant='subtitle1' display='inline'>
                    BOT Chikken says:
                </Typography>
                <Typography variant='h5' display='inline' align='center'>
                    Git gud kid!
                </Typography>
                <Typography variant='subtitle1' display='inline' align='right'>
                    (Unknown CS god)
                </Typography>
            </CardContent>

            <CardMedia className={classes.cardMedia}>
                <span className={classes.imageAlign} />
                <img className={classes.image} src='images/chicken.png' alt='chickkkken'/>
            </CardMedia>
        </Card>
    )
}

export default OneLinerBanner