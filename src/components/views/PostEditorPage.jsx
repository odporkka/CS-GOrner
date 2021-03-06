import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'
import { initialPostState } from '../../backend/models/post'
import Post from '../content/Post'
import PostForm from '../forms/PostForm'
import PostTeaser from '../content/PostTeaser'
import * as api from '../../backend/api'
import * as chicken from '../../util/postFetchingChicken'
import * as markdownUtils from '../../util/markdownService'
import * as s3 from '../../util/s3service'
import {Context} from "../../context/Context"
import UsersPostsSelect from "../forms/formSections/UsersPostsSelect"

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
    },
    lightPaper: {
        backgroundColor: theme.palette.primary.light,
    },
    divider: {
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
    const { contentData } = useContext(Context)
    const history = useHistory()
    const [usersPosts, setUsersPosts] = useState(undefined)
    const [post, setPost] = useState(initialPostState)
    const [fileToUpload, setFileToUpload] = useState(undefined)
    const [uploadProgress, setUploadProgress] = useState(undefined)

    /*
     * Fetch post if id was given in url parameters.
     * Loads post after url changes with history.listener.
     *
     * This effect should launch on first render only.
     * Listener handles calling fetchPost after that.
     */
    useEffect(() => {
        let mounted = true
        const fetch = async () => {
            const searchParams = new URLSearchParams(history.location.search)
            // Fetch post if id defined in url parameters
            if (searchParams.has('id')) {
                const id = searchParams.get('id')
                const response = await api.fetchPostWithId(id)
                if (mounted) {
                    if (response) {
                        if (!response.error) {
                            setPost(response)
                        } else {
                            alert(`Error while fetching post with id ${id}!`)
                        }
                    } else {
                        alert(`Post with id ${id} not found! It might been deleted recently!`)
                        history.push('/post-editor')
                    }
                }
            // Set always initial state if no id in url parameters
            } else {
                // Set default map to general
                const mapID = contentData.maps[0] ? contentData.maps[0].id : undefined
                setPost({...initialPostState, mapID: mapID})
                setFileToUpload(undefined)
            }
        }
        fetch().catch((e) => console.log(e))

        return () => { mounted = false }

    },[history, history.location.search, contentData.maps])

    /*
     * Fetch current users posts.
     */
    useEffect(() => {
        let mounted = true
        const fetchUsersPosts = async () => {
            const posts = await chicken.fetchCurrentUsersPosts()
            if (mounted) setUsersPosts(posts)
        }
        if (AWSCognitoUser) {
            fetchUsersPosts().catch((e) => console.log(e))
        }
        return () => { mounted = false }
    }, [AWSCognitoUser])

    /*
     * Save post to API.
     * Updates state if save was successful.
     *
     * @param input Post object
     * @return {Promise<void>}
     */
    const savePost = async (data) => {
        // Spread copy object to prevent mutation of state
        let input = {...data}
        input.sanitizedHtml = markdownUtils.markdownToHtml(input.markdown)

        let response
        // If id is found, we are updating post. New posts dont have id yet
        if (input.id) {
            response = await api.updatePost(input)
            if (!response.error) {
                alert(`Post '${input.title}' saved successfully!`)
                setPost(response)
            } else {
                alert(`Error(s) occurred while saving:\n${response.errorMessage}`)
                return response
            }
            // New posts, call create here
        } else {
            response = await api.createPost(input)
            if (!response.error) {
                alert(`Post '${input.title}' created successfully!`)
                setPost(response)
                setUsersPosts(usersPosts.concat(response))
                history.push(`/post-editor?id=${response.id}`)
            } else {
                alert(`Error(s) occurred while trying to create post:\n${response.errorMessage}`)
                return response
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
            let response
            // If post was published, remove it from author post count
            if (post.published) {
                response = await api.updateAuthorPostCount(-1)
                if (response.error) {
                    alert(`Error(s) occurred while deleting post:\n${response.errorMessage}`)
                }
            }
            // Delete post
            response = await api.deletePostById(post.id)
            if (response && !response.error) {
                try {
                    await s3.bulkRemoveFromS3(response.images)
                } catch (e) {
                    alert(`Something went wrong while removing files.. Restoring post..`)
                    savePost(response).catch((e) => alert(e))
                    return
                }
                alert(`Post with id ${response.id} deleted successfully!`)
                setUsersPosts(usersPosts.filter((p) => p.id !== post.id))
                history.push('/post-editor')
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
     * Upload image file to S3 and update post.images
     */
    const uploadToS3 = async () => {
        try {
            const s3id = post.s3id ? post.s3id : uuidv4().split('-')[0]
            const s3result = await s3.uploadToS3(s3id, fileToUpload, setUploadProgress)
            setUploadProgress(undefined)
            if (s3result && !s3result.error) {
                const newImageArray = post.images.concat(s3result)
                const updatedPost = {...post, s3id: s3id, images: newImageArray}
                const response = await savePost(updatedPost)
                if (response && response.error) {
                    s3.removeFromS3(s3result).catch((e) => alert(e))
                }
            // uploadToS3 returned error
            } else if (s3result.error) {
                console.log(s3result.errorMessage)
                alert(`Error:\n${s3result.errorMessage}`)
            }
        // Something threw and error, includes s3 connection errors
        } catch (e) {
            console.log(e.message ? e.message : e)
            alert(e)
        }
    }

    /*
     * Remove image from S3 and post.images
     */
    const removeFromS3 = async (image) => {
        try {
            const result = await s3.removeFromS3(image)
            // Just a simple check. IDK what should really be checked and docs aren't helping either.
            if (result && !result.error) {
                // Filter removed image out of post.images
                const newImageArray = post.images.filter((i) =>(i !== image))
                const updatedPost = {...post, images: newImageArray}
                savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
            } else if (result.error) {
                alert(`Error:\n${result.errorMessage}`)
            }
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    /*
     * Toggle publish parameter (with confirmation)
     */
    const togglePublish = async () => {
        const confirmationMessage = !post.published ?
            'Are you sure you want to publish?' : 'Are you sure you want to take post down?'
        const confirmed = window.confirm(confirmationMessage)
        if (confirmed) {
            let firstPublishDate
            // Publishing
            if (!post.published) {
                if (!post.publishDate) {
                    firstPublishDate = new Date().toISOString()
                }
                // Update user author count if author found
                if (post.authorID) {
                    const apiResponse = await api.updateAuthorPostCount(1)
                    if (apiResponse.error) {
                        console.log(apiResponse)
                        alert(`Error\n${apiResponse.errorMessage}`)
                        return
                    }
                }
            // Taking post down
            } else {
                const apiResponse = await api.updateAuthorPostCount(-1)
                if (apiResponse.error) {
                    alert(`Error\n${apiResponse.errorMessage}`)
                    return
                }
            }
            const updatedPost = {
                ...post,
                published: !post.published,
                publishDate: post.publishDate ? post.publishDate : firstPublishDate
            }
            savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
        }
    }

    /*
     * Set HTML calculated from markdown.
     */
    const calculatePreview = () => {
        setPost({
            ...post,
            sanitizedHtml: markdownUtils.markdownToHtml(post.markdown)
        })
    }


    if (!AWSCognitoUser) {
        return (
            <Paper className={classes.contentPaper}>
                <Container xs={12}>
                    <Grid container spacing={2} justify='center'>
                        <Grid item>
                            <Typography variant="body1">
                                You must be logged in as admin to edit and create posts.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            )
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} data-testid='post-editor-form-container'>
                <Paper>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} spacing={2} justify='flex-end'>
                                <UsersPostsSelect usersPosts={usersPosts} history={history}/>
                                <Grid item>
                                    <Button
                                        className={classes.button} variant='contained' color="primary"
                                        onClick={() => history.push('/post-editor')} >
                                        New post
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5" component="h5">
                                    Post editor - {post.title} {post.published ? '' : '(Draft)'}
                                </Typography>
                                <Divider className={classes.divider}/>
                            </Grid>



                            <Grid item xs={12}>
                                <PostForm
                                    post={post}
                                    setPost={setPost}

                                    fileToUpload={fileToUpload}
                                    setFileToUpload={setFileToUpload}
                                    uploadToS3={uploadToS3}
                                    uploadProgress={uploadProgress}
                                    removeFromS3={removeFromS3}

                                    calculatePreview={calculatePreview}
                                    savePost={savePost}
                                    togglePublish={togglePublish}
                                    deletePost={deletePost}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Grid>

            {/* Previews */}
            <Grid item xs={12} data-testid='post-editor-preview-container'>
                <Paper>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Preview
                                </Typography>
                            </Grid>

                            {/* Teaser */}
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Teaser:
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <PostTeaser postData={post} />
                            </Grid>

                            {/* Full post */}
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Full Post:
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Post postData={post} />
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default PostEditorPage