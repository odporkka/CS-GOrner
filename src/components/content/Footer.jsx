import React from 'react'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import SocialButtonBar from "../navigation/SocialButtonBar"

const Footer = () => {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            marginTop: '50px',
            bottom: 0,
            // borderRadius: 0,
            // boxShadow: "none"
        }
    });
    const classes = useStyles();

    return (
        <Paper className={classes.root} xs={12} square={true}>
            <Container>
                <Grid container>
                    <Grid container item xs={8} justify='flex-start' alignItems='center'>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body2" component="p">
                                Link1
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body2" component="p">
                                Link2
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body2" component="p">
                                Link3
                            </Typography>
                        </Grid>
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