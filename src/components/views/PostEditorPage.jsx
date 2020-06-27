import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import PostForm from "../forms/PostForm"

const PostEditorPage = () => {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
        },
        contentPaper: {
            backgroundColor: theme.palette.primary.light,
        },
        form: {

        }
    });
    const classes = useStyles();

    return (
        <Paper className={classes.contentPaper}>
            <Container xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            Post editor
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <PostForm />
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default PostEditorPage