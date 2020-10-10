import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import PostTeaser from './PostTeaser'



/**
 * Top X new posts component in home page.
 *
 * @return {JSX.Element}
 * @constructor
 * @param props
 */
const PostSearchResults = (props) => {
    const {
        posts,
        searchCriteria
    } = props
    console.log(searchCriteria.map?.name)

    if (posts.length === 0) {
        return (
            <Grid item xs={12}>
                <Typography variant='h6'>No results!</Typography>
            </Grid>
        )
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant='h5'>Results</Typography>
                { searchCriteria.map && (
                    <Typography variant='body1'>Map: {searchCriteria.map.name}</Typography>
                )}
            </Grid>

            { posts.map((post) => (
                    <Grid item key={post.id} xs={12}>
                        <PostTeaser postData={post} />
                    </Grid>
                )
            )}
        </>
    );
}

export default PostSearchResults