import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Own classes/components
import PostHeader from './PostHeader'

// MUI styles
const useStyles = makeStyles({
    root: {
        color: 'black',
        marginBottom: '15px',
        backgroundColor: 'white',
    },
    divider: {
        backgroundColor: 'black'
    }
})



/**
 * Component to show single Post object.
 *
 * @return {JSX.Element}
 * @constructor
 * @param props
 */
const Post = (props) => {
    const {
        postData
    } = props
    const classes = useStyles()


    return (
        <Paper xs={12} className={classes.root} >
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PostHeader post={postData} inTeaser={false}/>
                    </Grid>
                    <Grid item xs={12}>
                        <div dangerouslySetInnerHTML={{ __html: postData.sanitizedHtml }} />
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Post