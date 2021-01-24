import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import SocialButtonBar from '../navigation/SocialButtonBar'

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        marginTop: '50px',
        bottom: 0,
        // borderRadius: 0,
        // boxShadow: 'none'
    },
    links: {
        color: theme.palette.primary.contrastText,
        paddingLeft: '50px',
        textAlign: 'center'
    },
    link: {
        paddingLeft: '10px',
        paddingRight: '10px'
    }
}))


/**
 * Footer component.
 *
 * @return {JSX.Element}
 * @constructor
 */
const Footer = () => {
    const classes = useStyles()

    return (
        <Paper className={classes.root} xs={12} square={true}>
            <Container>
                <Grid container alignItems='center' justify='center'>
                    <Grid item xs={8}>
                        <Typography variant='body2' component='p' className={classes.links}>
                            <Link component={RouterLink} to='/' color='inherit' className={classes.link}>
                                    News
                            </Link>
                            {' - '}
                            <Link component={RouterLink} to='/tactics' color='inherit' className={classes.link}>
                                    Tactics
                            </Link>
                            {' - '}
                            <Link component={RouterLink} to='/forum' color='inherit' className={classes.link}>
                                    Forum
                            </Link>
                            {' - '}
                            <Link component={RouterLink} to='/about' color='inherit' className={classes.link}>
                                    About
                            </Link>
                            {' - '}
                            <Link component={RouterLink} to='/' color='inherit' className={classes.link}>
                                    Contact me
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <SocialButtonBar />
                        <Typography variant='body2' component='p' align='right'>
                            <small>
                                Copyright &copy; {new Date().getFullYear()} Otto Porkka. All rights reserved.
                            </small>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Footer