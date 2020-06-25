import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"

const OneLinerBanner = () => {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            backgroundColor: theme.palette.primary.light,
        }
    });
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h5' component='h5' display='inline'>
                    "Git gud kid!"
                </Typography>
                <Typography variant='body2' display='inline'>
                    - Unknown CS god
                </Typography>
            </CardContent>
        </Card>
    );
}

export default OneLinerBanner