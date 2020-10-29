import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Storage } from 'aws-amplify'
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
import PostSelect from '../forms/formSections/PostSelect'
import * as api from '../../backend/api'
import * as chicken from '../../util/postFetchingChicken'
import * as markdownUtils from '../../util/markdownUtils'

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
    const history = useHistory()
    const [usersPosts, setUsersPosts] = useState([])
    const [post, setPost] = useState(initialPostState)
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
            if (searchParams.has('id')) {
                const id = searchParams.get('id')
                const post = await api.fetchPostWithId(id)
                if (mounted) {
                    if (post) {
                        setPost(post)
                    } else {
                        alert(`Post with id ${id} not found! It might been deleted recently!`)
                        history.push('/post-editor')
                    }
                }
            } else {
                setPost(initialPostState)
            }
        }
        fetch().catch((e) => console.log(e))

        return () => { mounted = false }

    },[history, history.location.search])

    /*
     * Fetch current users posts.
     */
    useEffect(() => {
        let mounted = true
        const fetchUsersPosts = async () => {
            const posts = await chicken.fetchCurrentUsersPosts()
            if (mounted) setUsersPosts(posts)
        }
        fetchUsersPosts().catch((e) => console.log(e))

        return () => { mounted = false }
    }, [])


    /*
     * Save post to API.
     * Updates state if save was successful.
     *
     * @param input Post object
     * @return {Promise<void>}
     */
    const savePost = async (data) => {
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
            }
            // New posts, call create here
        } else {
            response = await api.createPost(input)
            if (!response.error) {
                alert(`Post '${input.title}' created successfully!`)
                history.push(`/post-editor?id=${response.id}`)
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
    * Post specific uuid that is used to group posts images under same path.
    * "Folder" in S3. i.e. /public/<uuid>/fileName
    *
    * @param fileName
    * @return {string}
    */
    const resolveName = (fileName) => {
        const s3id = post.s3id ?
            post.s3id : uuidv4().split('-')[0]
        return `${s3id}/${fileName}`
    }

    /*
     * Construct public url to embed in markdown
     *
     * @param fileName
     * @return {string}
     */
    const resolvePublicUrl = (fileName) => {
        const s3Config = Storage.getPluggable('AWSS3')._config
        const bucket = s3Config.bucket
        const region = s3Config.region
        return `https://${bucket}.s3-${region}.amazonaws.com/public/${fileName}`
    }

    /*
     * Upload image file to S3 and update post.images
     */
    const uploadToS3 = async (file) => {
        const fileName = resolveName(file.name)
        const publicUrl = resolvePublicUrl(fileName)

        // Push image to S3 & update metadata on post
        let result
        try {
            result = await Storage.put(fileName, file, {
                progressCallback(progress) {
                    const progressPercentage = (Math.round(progress.loaded / progress.total * 100))
                    setUploadProgress(progressPercentage)
                },
                ACL: 'public-read'
            })

            if (result && result.key) {
                result.url = publicUrl
                const newImageArray = post.images.concat(result)
                const updatedPost = {...post, images: newImageArray}
                savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
            }

            setUploadProgress(undefined)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    /*
     * Remove image from S3 and post.images
     */
    const removeFromS3 = async (image) => {
        console.log(`Removing image ${image.key} from S3..`)
        try {
            const result = await Storage.remove(image.key)
            // Just a simple check. IDK what should really be checked and docs aren't helping either.
            if (result) {
                console.log(`Removing image data from post object..`)
                // Filter removed image out of post.images
                const newImageArray = post.images.filter((i) =>(i !== image))
                const updatedPost = {...post, images: newImageArray}
                savePost(updatedPost).catch((e) => {console.log(e);alert(e)})
            }
        } catch (e) {
            alert(`Something went wrong when removing image:\n ${e}`)
        }
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
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Paper>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} spacing={2} justify='flex-end'>
                                <Grid item>
                                    <PostSelect
                                        name='drafts'
                                        label='Your drafts'
                                        history={history}
                                        posts={usersPosts.filter((p) => (p.published === false))} />
                                </Grid>
                                <Grid item>
                                    <PostSelect
                                        name='posts'
                                        label='Your posts'
                                        history={history}
                                        posts={usersPosts.filter((p) => (p.published === true))} />
                                </Grid>
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
            <Grid item xs={12}>
                <Paper>
                    <Container>
                        { post.sanitizedHtml && (
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
                        )}
                    </Container>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default PostEditorPage