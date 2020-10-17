import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import PostTeaser from './PostTeaser'
import { tagToString } from '../../backend/models/post'



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

    const showMapCriteria = (searchCriteria.maps && searchCriteria.maps.length > 0)
    const showTagCriteria = (searchCriteria.tags && searchCriteria.tags.length > 0)

    return (
        <>
            <Grid item xs={12}>
                <Typography variant='h6'>Results ({results.total})</Typography>
                { showMapCriteria && (
                    <Typography variant='body1'>Maps:{searchCriteria.maps.map(m => ` ${m.canonicalName}`)}</Typography>
                )}
                { showTagCriteria && (
                    <Typography variant='body1'>Maps: {searchCriteria.tags.map(t => ` ${tagToString(t)}`)}</Typography>
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