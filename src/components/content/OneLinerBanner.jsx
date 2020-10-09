import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// MUI styles
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.primary.light,
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
            <CardContent>
                <Typography variant='h5' component='h5' display='inline'>
                    "Git gud kid!"
                </Typography>
                <Typography variant='body2' display='inline'>
                    -Unknown CS god
                </Typography>
            </CardContent>
        </Card>
    )
}

export default OneLinerBanner