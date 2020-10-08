import React, {useContext} from 'react'
import {useHistory} from "react-router-dom"
import DOMPurify from 'dompurify'
import marked from 'marked'
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

import {Context} from "../../context/Context"
import * as api from '../../graphql/api'
import Post from "../content/Post"
import PostFormImageUpload from "./PostFormImageUpload"


/**
 *      title
 *      author
 *      mapID
 *      description
 *      markdown
 *      sanitizedHtml
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
        addImage
    } = props
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
    });
    const classes = useStyles();
    const { contentData } = useContext(Context)

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setPost({...post, [name]: value});
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
                        <select name='mapID' value={post.mapID} onChange={handleInputChange}>
                            { contentData.maps.map((map) => (
                                    <option value={map.id} key={map.id}>{map.name}</option>
                                )
                            )}
                        </select>
                    </Grid>

                    {/* Top right side */}
                    <Grid container item xs={6}>
                        <PostFormImageUpload post={post} addImage={addImage}/>
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
                        <Button variant='contained' onClick={savePost} className={classes.button}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={savePost} className={classes.button}>
                            Publish
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