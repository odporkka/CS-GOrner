import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

// Own classes/components
import { Context } from "../../context/Context"
import Post from "../content/Post"

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}))



/**
 * "tactics/<id>" -page.
 * Show full single post.
 *
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const TacticPage = (props) => {
    const classes = useStyles()
    const title = props.match.params.title
    const { contentData } = useContext(Context)
    const [ post, setPost ] = useState(null)

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
    )
}

export default TacticPage