import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import { Context } from '../../context/Context'
import Post from '../content/Post'
import PostFormImageUpload from './PostFormImageUpload'

// MUI styles
const useStyles = makeStyles({
    form: {
    },
    label: {
        paddingRight: '10px'
    },
    input: {
        width: '400px'
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
        savePost,
        deletePost,
        calculatePreview,
        addImage,
        removeImage,
        togglePublish
    } = props
    const classes = useStyles()
    const { contentData } = useContext(Context)
    
    const handleInputChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setPost({...post, [name]: value})
    }

    const findGeneralMapId = () => {
        const general = contentData.maps.find((m) => (m.name === 'general'))
        return general ? general.id : undefined
    }


    return (
        <div id='post-form'>
            <form className={classes.form} noValidate autoComplete="off">
                <Grid container spacing={2}>

                    {/* Top left side */}
                    <Grid container item xs={6}>
                        <label htmlFor='title' className={classes.label}>Title:</label>
                        <br />
                        <input type='text'
                            id='title'
                            name='title'
                            className={classes.input}
                            value={post.title}
                            onChange={handleInputChange}/>
                        <br />

                        <label htmlFor='author' className={classes.label}>Author:</label>
                        <br />
                        <input type='text'
                            id='author'
                            name='author'
                            className={classes.input}
                            value={post.author}
                            onChange={handleInputChange}/>
                        <br />

                        <label htmlFor='map'>Map:</label>
                        <select name='mapID' value={findGeneralMapId()} onChange={handleInputChange}>
                            { contentData.maps.map((map) => (
                                    <option value={map.id} key={map.id}>{map.name}</option>
                                )
                            )}
                        </select>
                    </Grid>

                    {/* Top right side */}
                    <Grid container item xs={6}>
                        <PostFormImageUpload
                            post={post}
                            addImage={addImage}
                            removeImage={removeImage}
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