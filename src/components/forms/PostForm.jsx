import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import PostFormImageUpload from './formSections/PostFormImageUpload'
import PostMetaData from './formSections/PostMetaData'
import YouTubeEmbedHelper from './formSections/YouTubeEmbedHelper'
import { Context } from '../../context/Context'

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
        fileToUpload,
        setFileToUpload,
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
    const { contentData } = useContext(Context)

    /*
     * Change post state as form changes
     */
    const handleInputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setPost({...post, [name]: value})
    }

    const handleMapChange = (event) => {
        const mapID = event.target.value ? event.target.value : undefined
        setPost({...post, mapID: mapID, map: contentData.maps.find(m => m.id === mapID)})
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
                    <Grid container item xs={6} spacing={2} direction='column' alignItems='stretch'>
                        <Grid item>
                            <YouTubeEmbedHelper />
                        </Grid>
                        <Grid item data-testid='post-editor-image-upload'>
                            <PostFormImageUpload
                                post={post}
                                fileToUpload={fileToUpload}
                                setFileToUpload={setFileToUpload}
                                uploadToS3={uploadToS3}
                                uploadProgress={uploadProgress}
                                removeFromS3={removeFromS3}
                            />
                        </Grid>
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

                        <label htmlFor='markdown' className={classes.label}>Article (markdown):</label>
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
        </div>
    )
}

export default PostForm