import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import Post from '../content/Post'
import PostFormImageUpload from './postFormSections/PostFormImageUpload'
import PostMetaData from "./postFormSections/PostMetaData"

// MUI styles
const useStyles = makeStyles({
    form: {
    },
    label: {
        paddingRight: '10px'
    },
    description: {
        width: '100%',
        height: '100px'
    },
    markdown: {
        width: '100%',
        height: '400px'
    },
    button: {
    }
})



/**
 * Form for post editing. State is hosted on parent component.
 *
 * @param props
 * @return {*}
 * @constructor
 */
const PostForm = (props) => {
    const {
        post,
        setPost,
        // S3 & files stuff
        uploadToS3,
        uploadProgress,
        removeFromS3,
        // Form button functions
        calculatePreview,
        savePost,
        togglePublish,
        deletePost
    } = props
    const classes = useStyles()

    /*
     * Change post state as form changes
     */
    const handleInputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setPost({...post, [name]: value})
    }

    const handleMapChange = (event) => {
        const value = event.target.value ? event.target.value : undefined
        setPost({...post, mapID: value})
    }

    /*
     * Change post state if tag is added/removed
     */
    const handleTagChange = (event) => {
        const tagName = event.target.name
        let newTagArray
        if (event.target.checked) {
            newTagArray = post.tags.concat(tagName)
        } else {
            newTagArray = post.tags.filter((tag) => (tag !== tagName))
        }
        setPost({...post, tags: newTagArray})

    }


    return (
        <div id='post-form'>
            <form className={classes.form} noValidate autoComplete="off">
                <Grid container spacing={2}>

                    {/* Top left side */}
                    <Grid item xs={6}>
                        <PostMetaData
                            post={post}
                            handleInputChange={handleInputChange}
                            handleTagChange={handleTagChange}
                            handleMapChange={handleMapChange}
                        />
                    </Grid>

                    {/* Top right side */}
                    <Grid item xs={6}>
                        <PostFormImageUpload
                            post={post}
                            uploadToS3={uploadToS3}
                            uploadProgress={uploadProgress}
                            removeFromS3={removeFromS3}
                            />
                    </Grid>

                    {/* Text areas */}
                    <Grid item xs={12} >
                        <label htmlFor='description' className={classes.label}>Description (markdown):</label>
                        <br />
                        <textarea id='description'
                            name='description'
                            className={classes.description}
                            value={post.description}
                            onChange={handleInputChange}/>
                        <br />

                        <label htmlFor='description' className={classes.label}>Article (markdown):</label>
                        <br />
                        <textarea id='markdown'
                            name='markdown'
                            className={classes.markdown}
                            value={post.markdown}
                            onChange={handleInputChange}/>
                        <br />
                    </Grid>
                </Grid>

                {/* Buttons */}
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant='contained' color="primary" onClick={calculatePreview} className={classes.button}>
                            Preview
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={() => savePost(post)} className={classes.button}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={() => togglePublish()} className={classes.button}>
                            {!post.published ? 'Publish' : 'Take post down'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color="secondary" onClick={deletePost} className={classes.button}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Preview */}
            { post.sanitizedHtml && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            Preview:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Post data={post} />
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default PostForm