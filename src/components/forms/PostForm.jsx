import React, { useState } from 'react'
import DOMPurify from 'dompurify'
import marked from 'marked'
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Post from "../content/Post"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

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
    });
    const classes = useStyles();

    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setState({...state, [name]: value});
    }

    const calculatePreview = () => {
        const dirtyHtml = marked(state.markdown)
        const sanitizedHtml = DOMPurify.sanitize(dirtyHtml)
        setState({...state, sanitizedHtml: sanitizedHtml })
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

                <Button variant='contained' color="primary" onClick={calculatePreview}>
                    Preview
                </Button>
            </form>

            {state.sanitizedHtml && (
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