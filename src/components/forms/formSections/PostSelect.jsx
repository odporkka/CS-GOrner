import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

// MUI styles
const useStyles = makeStyles({
    root: {
    },
    label: {
        paddingRight: '10px',
    },
    select: {
        width: '100px'
    }
})



/**
 * Pick drafts to edit from dropdown.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PostSelect = (props) => {
    const classes = useStyles()
    const {
        posts,
        name,
        label
    } = props
    const history = useHistory()

    const onChange = (event) => {
        const id = event.target.value
        history.push(`/post-editor?id=${id}`)
    }


    return (
        <div className={classes.root}>
            <label htmlFor={name} className={classes.label}>{label}:</label>

            <select className={classes.select} name={name} id={name} value='' onChange={onChange}>
                <option value='' key=''> </option>
                { posts.map((post) => (
                        <option value={post.id} key={post.id}>{post.title}</option>
                    )
                )}
            </select>
        </div>

    )
}

export default PostSelect