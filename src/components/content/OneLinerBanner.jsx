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
        justifyContent: 'center'
    },
    quote: {
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        width: 100,
        height: 'auto',
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
                <Typography variant='h5' component='h5' display='inline'>
                    Git gud kid!
                </Typography>
                <Typography variant='subtitle1' display='inline' align='center'>
                    - Unknown CS god
                </Typography>
            </CardContent>

            <CardMedia>
                <img className={classes.image} src='images/chicken.png' alt='chickkkken'/>
            </CardMedia>
        </Card>
    )
}

export default OneLinerBanner