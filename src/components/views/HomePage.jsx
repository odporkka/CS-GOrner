import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import OneLinerBanner from "../content/OneLinerBanner"


const HomePage = () => {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
        },
        contentPaper: {
            backgroundColor: theme.palette.primary.light,
        }
    });
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OneLinerBanner />
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.contentPaper} spacing={2}>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6">
                                    New posts
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default HomePage