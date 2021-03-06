import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import { Context } from '../../../context/Context'
import TagCheckbox from './TagCheckbox'


// MUI styles
const useStyles = makeStyles({
    root: {
    },
    label: {
        paddingRight: '10px'
    },
    input: {
        width: '400px'
    },
})



/**
 * Post meta data form component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PostMetaData = (props) => {
    const {
        post,
        handleInputChange,
        handleTagChange,
        handleMapChange
    } = props
    const classes = useStyles()
    const { contentData } = useContext(Context)

    return (
        <Grid container spacing={1}>
            {/* Title */}
            <Grid item xs={12}>
                <label htmlFor='title' className={classes.label}>Title:</label>
                <input type='text'
                    id='title'
                    name='title'
                    className={classes.input}
                    value={post.title}
                    onChange={handleInputChange}/>
            </Grid>

            {/* Author */}
            {/*<Grid item xs={12}>*/}
            {/*    <label htmlFor='author' className={classes.label}>Author:</label>*/}
            {/*    <input type='text'*/}
            {/*        id='author'*/}
            {/*        name='author'*/}
            {/*        className={classes.input}*/}
            {/*        value={post.author}*/}
            {/*        onChange={handleInputChange}/>*/}
            {/*</Grid>*/}

            {/* Map pick */}
            <Grid item xs={12}>
                <label htmlFor='mapID' className={classes.label}>Map:</label>
                <select name='mapID' id='mapID' value={post.mapID} onChange={handleMapChange}>
                    { contentData.maps.map((map) => (
                            <option value={map.id} key={map.id}>{map.canonicalName}</option>
                        )
                    )}
                </select>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
                <TagCheckbox checkedList={post.tags} handleTagChange={handleTagChange} label='Tags'/>
            </Grid>
        </Grid>
    )
}

export default PostMetaData