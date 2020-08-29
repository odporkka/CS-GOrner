import React, {useContext} from 'react'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import PostForm from "../forms/PostForm"
import {AWSCognitoUserContext} from "../../context/AWSCognitoUserContext"

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
    const { AWSCognitoUser } = useContext(AWSCognitoUserContext)

    // if (!AWSCognitoUser) {
    //     return (
    //         <Paper className={classes.contentPaper}>
    //             <Container xs={12}>
    //                 <Grid container spacing={2} justify='center'>
    //                     <Grid item>
    //                         <Typography variant="h6" component="h6">
    //                             You must be logged in as admin to edit and create posts.
    //                         </Typography>
    //                     </Grid>
    //                 </Grid>
    //             </Container>
    //         </Paper>
    //         )
    // }

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