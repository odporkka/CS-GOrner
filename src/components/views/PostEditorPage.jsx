import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import marked from 'marked'
import DOMPurify from 'dompurify'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'
import PostForm from '../forms/PostForm'
import * as api from '../../backend/api'

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
    },
    contentPaper: {
        backgroundColor: theme.palette.primary.light,
    },
    form: {

    }
}))



/**
 * "/post-edit" -page.
 * Editors can edit posts here.
 * 
 * @return {JSX.Element}
 * @constructor
 */
const PostEditorPage = () => {
    const classes = useStyles()
    const { AWSCognitoUser } = useContext(AWSCognitoUserContext)
    const history = useHistory()
    const initialPostState = {
        id: undefined,
        published: false,
        // AWSDateTime, set at first publish
        publishDate: undefined,
        deprecated: false,
        // Random per post uuid used as s3 file prefix
        s3id: uuidv4().split('-')[0],
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
    },[history])


    /*
     * Save post to API.
     * Updates state if save was successful.
     *
     * @param input Post object
     * @return {Promise<void>}
     */
    const savePost = async (input) => {
        input.sanitizedHtml = markdownToHtml(input.markdown)

        let response
        // If id is found, we are updating post. New posts dont have id yet
        if (input.id) {
            // CreatedAt and updatedAt are managed by AWS automatically
            delete input.createdAt
            delete input.updatedAt
            // Linked properties need to be removed too
            delete input.map
            response = await api.updatePost(input)
            if (!response.error) {
                alert(`Post '${input.title}' saved successfully!`)
                setPost(response)
            } else {
                alert(`Error(s) occurred while saving:\n${response.errorMessage}`)
            }
            // New posts, call create here
        } else {
            response = await api.createPost(input)
            if (!response.error) {
                alert(`Post '${input.title}' created successfully!`)
                history.push(`/post-editor?id=${response.id}`)
                setPost(response)
            } else {
                alert(`Error(s) occurred while trying to create post:\n${response.errorMessage}`)
            }
        }
    }

    /*
     * Delete current post, remove associated images from S3 and reset state.
     *
     * @return {Promise<void>}
     */
    const deletePost = async () => {
        if (post.id) {

            const response = await api.deletePostById(post.id)

            if (response && !response.error) {
                console.log(`Post '${response.title}' deleted successfully from backend!`)
                console.log(`Removing ${response.images.length} associated files from S3..`)
                try {
                    for (const image in response.images) {
                        await Storage.remove(image.key)
                    }
                } catch (e) {
                    alert(`Something went wrong while removing files.. Restoring post..`)
                    savePost(response).catch((e) => alert(e))
                    return
                }
                alert(`Post '${response.title}' deleted successfully from backend!`)
                history.push('/post-editor')
                setPost(initialPostState)
            } else {
                if (response.error) {
                    alert(`Error(s) occurred while deleting post:\n${response.errorMessage}`)
                } else {
                    alert(`Empty response from backend. Post not found with id: ${post.id}!`)
                }
            }
        }
    }

    /*
     * Concat new image object to post.images and save post to API.
     *
     * @param imageToAdd Image object to add. Must match graphql type Image.
     */
    const addImage = (imageToAdd) => {
        const newImageArray = post.images.concat(imageToAdd)
        const updatedPost = {...post, images: newImageArray}
        savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
    }

    /*
     * Remove image from post.images and save post to API.
     *
     * @param imageToRemove Image object to remove. Must match graphql type Image.
     */
    const removeImage = (imageToRemove) => {
        const newImageArray = post.images.filter((image) =>(image !== imageToRemove))
        const updatedPost = {...post, images: newImageArray}
        savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
    }

    /*
     * Toggle publish parameter (with confirmation)
     */
    const togglePublish = () => {
        const confirmationMessage = !post.published ?
            'Are you sure you want to publish?' : 'Are you sure you want to take post down?'
        const confirmed = window.confirm(confirmationMessage)
        if (confirmed) {
            let firstPublishDate
            // Calculate publishDate if first publish
            if (!post.publishDate && !post.published) {
                firstPublishDate = new Date().toISOString()
            }
            const updatedPost = {
                ...post,
                published: !post.published,
                publishDate: post.publishDate ? post.publishDate : firstPublishDate
            }
            savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
        }
    }

    const calculatePreview = () => {
        setPost({...post, sanitizedHtml: markdownToHtml(post.markdown) })
    }

    const markdownToHtml = (markdown) => {
        const dirtyHtml = marked(markdown)
        return DOMPurify.sanitize(dirtyHtml)
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
                            Post editor {post.published ? ` - ${post.title}` : '(Draft)'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <PostForm
                            post={post}
                            setPost={setPost}
                            savePost={savePost}
                            deletePost={deletePost}
                            calculatePreview={calculatePreview}
                            addImage={addImage}
                            removeImage={removeImage}
                            togglePublish={togglePublish}/>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default PostEditorPage