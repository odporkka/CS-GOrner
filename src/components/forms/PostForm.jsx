import React, { useContext, useState } from 'react'
import DOMPurify from 'dompurify'
import marked from 'marked'
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

import { Context } from "../../context/Context"
import * as api from '../../graphql/api'
import Post from "../content/Post"


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
    const [state, setState] = useState({
        title: '',
        author: '',
        mapID: '',
        description: '',
        markdown: '',
        sanitizedHtml: ''
    })
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
        setState({...state, [name]: value});
    }

    const calculatePreview = () => {
        setState({...state, sanitizedHtml: markdownToHtml(state.markdown) })
    }

    const saveArticle = async () => {
        const input = state
        input.sanitizedHtml = markdownToHtml(input.markdown)
        const response = await api.createPost(input)
        if (!response.error) {
            alert(`Article '${input.title}' saved succesfully!`)
        } else {
            alert(`Error(s) occured while saving:\n${response.errorMessage}`)
        }
    }

    const markdownToHtml = (markdown) => {
        const dirtyHtml = marked(markdown)
        const sanitizedHtml = DOMPurify.sanitize(dirtyHtml)
        return sanitizedHtml
    }

    return (
        <>
            <form className={classes.form} noValidate autoComplete="off">
                <label htmlFor='title' className={classes.label}>Title:</label>
                <br />
                <input type='text'
                    id='title'
                    name='title'
                    className={classes.input}
                    value={state.title}
                    onChange={handleInputChange}/>
                <br />

                <label htmlFor='author' className={classes.label}>Author:</label>
                <br />
                <input type='text'
                    id='author'
                    name='author'
                    className={classes.input}
                    value={state.author}
                    onChange={handleInputChange}/>
                <br />

                <label htmlFor='map'>Map:</label>
                <select name='mapID' value={state.mapID} onChange={handleInputChange}>
                    { contentData.maps.map((map) => (
                            <option value={map.id} key={map.id}>{map.name}</option>
                        )
                    )}
                </select>
                <br />

                <label htmlFor='description' className={classes.label}>Description:</label>
                <br />
                <textarea id='description'
                    name='description'
                    className={classes.description}
                    value={state.description}
                    onChange={handleInputChange}/>
                <br />

                <label htmlFor='description' className={classes.label}>Article in markdown:</label>
                <br />
                <textarea id='markdown'
                    name='markdown'
                    className={classes.markdown}
                    value={state.markdown}
                    onChange={handleInputChange}/>
                <br />

                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant='contained' color="primary" onClick={calculatePreview} className={classes.button}>
                            Preview
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={saveArticle} className={classes.button}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={saveArticle} className={classes.button}>
                            Publish
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color="secondary" onClick={saveArticle} className={classes.button}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>


            </form>

            { state.sanitizedHtml && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            Preview:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Post data={state} />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default PostForm