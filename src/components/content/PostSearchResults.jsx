import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import PostTeaser from './PostTeaser'



/**
 * Search results of TacticsBrosePage.
 *
 * @return {JSX.Element}
 * @constructor
 * @param props
 */
const PostSearchResults = (props) => {
    const {
        results,
        searchCriteria
    } = props


    return (
        <>
            <Grid item xs={12}>
                <Typography variant='h6'>Results ({results.total})</Typography>
                { searchCriteria.map && (
                    <Typography variant='body1'>Map: {searchCriteria.map.name}</Typography>
                )}
            </Grid>

            { results.items.map((post) => (
                    <Grid item key={post.id} xs={12}>
                        <PostTeaser postData={post} />
                    </Grid>
                )
            )}
        </>
    );
}

export default PostSearchResults