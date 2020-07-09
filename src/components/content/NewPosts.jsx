import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const NewPosts = ({posts}) => {

    return (
        <Paper>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>New Posts</Typography>
                    </Grid>

                    { posts.map((post) => (
                            <Grid item key={post.id}>
                                {post.title}
                            </Grid>
                        )
                    )}
                </Grid>
            </Container>
        </Paper>
    );
}

export default NewPosts