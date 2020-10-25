import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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
const NewPosts = (props) => {
    const {
        posts
    } = props
    
    
    return (
        <Paper>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>New Posts</Typography>
                    </Grid>

                    { posts.map((post) => (
                            <Grid item key={post.id} xs={12}>
                                <PostTeaser postData={post} />
                            </Grid>
                        )
                    )}
                </Grid>
            </Container>
        </Paper>
    );
}

export default NewPosts