import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import PostTeaser from './PostTeaser'

// MUI styles
const useStyles = makeStyles({
    postNumber: {
        paddingBottom: '10px',
        textAlign: 'right'
    }
})

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
    const classes = useStyles()


    return (
        <Paper>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>New Posts</Typography>
                    </Grid>

                    { posts.map((post, i) => (
                        <Grid key={post.id} item xs={12}>
                            <Typography className={classes.postNumber}>{`#${i + 1}`}</Typography>
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