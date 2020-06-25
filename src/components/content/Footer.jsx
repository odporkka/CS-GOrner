import React from 'react'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

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
            <Typography variant="body2" component="p">
                &copy; {new Date().getFullYear()} <a href="https://www.linkedin.com/in/odporkka/">Otto Porkka</a>
            </Typography>
        </Paper>
    )
}

export default Footer