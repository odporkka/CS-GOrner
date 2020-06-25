import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import OneLinerBanner from "../content/OneLinerBanner"
import Grid from "@material-ui/core/Grid"

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
                    <Typography variant="h6" component="h6">
                        New posts
                    </Typography>
                </Paper>
            </Grid>

        </Grid>
    );
}

export default HomePage