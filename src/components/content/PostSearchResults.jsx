import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import PostTeaser from './PostTeaser'
import { tagToString } from '../../backend/models/tags'
import { Context } from '../../context/Context'



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
        searchCriteria,
        onPageChange
    } = props
    const { contentData } = useContext(Context)

    const showMapCriteria = (searchCriteria.maps && searchCriteria.maps.length > 0)
    const showTagCriteria = (searchCriteria.tags && searchCriteria.tags.length > 0)
    const selectedAuthor = searchCriteria.author ?
        contentData.authors.find(a => a.cognitoUserSud === searchCriteria.author).username : undefined
    const pages = Math.ceil(results.postCount / 5)


    return (
        <>
            <Grid item xs={12}>
                <Typography variant='h6'>Results ({results.postCount})</Typography>
                { showMapCriteria && (
                    <Typography variant='body1'>Maps:{searchCriteria.maps.map(m => ` ${m.canonicalName}`)}</Typography>
                )}
                { showTagCriteria && (
                    <Typography variant='body1'>Tags: {searchCriteria.tags.map(t => ` ${tagToString(t)}`)}</Typography>
                )}
                { selectedAuthor && (
                    <Typography variant='body1'>Author: {selectedAuthor}</Typography>
                )}
            </Grid>

            { results.items && results.items.length > 0 &&
            <Grid item xs={12}>
                <Pagination count={pages} variant="outlined" shape="rounded" color="secondary" onChange={onPageChange}/>
            </Grid>
            }

            { results.items && results.items.map((post) => (
                <Grid item key={post.id} xs={12}>
                    <PostTeaser postData={post} />
                </Grid>
                )
            )}

            { results.items && results.items.length > 0 &&
            <Grid item xs={12}>
                <Pagination count={pages} variant="outlined" shape="rounded" color="secondary" onChange={onPageChange}/>
            </Grid>
            }
        </>
    );
}

export default PostSearchResults