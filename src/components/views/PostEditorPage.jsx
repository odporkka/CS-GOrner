import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import {v4 as uuidv4} from 'uuid'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

import * as api from '../../graphql/api'
import PostForm from "../forms/PostForm"
import {AWSCognitoUserContext} from "../../context/AWSCognitoUserContext"

const PostEditorPage = (props) => {
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
    const history = useHistory()
    const initialPostState = {
        id: undefined,
        s3id: uuidv4().split('-')[0],       // Random per post uuid for s3 files
        title: '',
        author: '',
        mapID: '',
        description: '',
        markdown: '',
        sanitizedHtml: '',
        images: []
    }
    const [post, setPost] = useState(initialPostState)

    /*
     * Fetch post if id was given in url parameters
     */
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const fetchPost = async (id) => {
            const post = await api.fetchPostWithId(id)
            if (post) {
                setPost(post)
            } else {
                alert(`Post with id ${id} not found! It might been deleted recently!`)
                history.push('/post-editor')
            }
        }
        if (searchParams.has('id')) {
            fetchPost(searchParams.get('id'))
                .catch((e) => console.log(e))
        }
    }, [history])

    const resetPost = () => {
        setPost(initialPostState)
    }

    const addImage = (image) => {
        const newImageArray = post.images.concat(image)
        setPost({...post, images: newImageArray})
    }


    if (!AWSCognitoUser) {
        return (
            <Paper className={classes.contentPaper}>
                <Container xs={12}>
                    <Grid container spacing={2} justify='center'>
                        <Grid item>
                            <Typography variant="h6" component="h6">
                                You must be logged in as admin to edit and create posts.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            )
    }

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
                        <PostForm
                            post={post}
                            setPost={setPost}
                            resetPost={resetPost}
                            addImage={addImage}/>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default PostEditorPage