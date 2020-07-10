import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../../context/Context"
import { makeStyles } from '@material-ui/core/styles';

import Post from "../content/Post"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const TacticPage = (props) => {
    const classes = useStyles();
    const title = props.match.params.title
    const { contentData } = useContext(Context)
    const [ post, setPost ] = useState(null)

    console.log(post)

    useEffect(() => {
        const postData = contentData.posts.find((p) => (p.id === title))
        if (postData) {
            setPost(postData)
        }
    }, [contentData, title])

    return (
        <div className={classes.root}>
            { post ?
                <Post data={post}/>
                :
                <div align='center'> loading...</div>
            }
        </div>

    );
}

export default TacticPage