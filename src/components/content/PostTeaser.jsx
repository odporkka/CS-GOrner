import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import PostBanner from "./PostBanner"

const PostTeaser = ({data}) => {
    const useStyles = makeStyles({
        root: {
            color: 'black',
            marginBottom: '15px',
            backgroundColor: 'white'
        },
        divider: {
            backgroundColor: 'black'
        }
    });
    const classes = useStyles();

    return (
        <Paper xs={12} className={classes.root} >
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PostBanner data={data} inTeaser={true}/>
                    </Grid>
                    <Grid item xs={12}>
                        {data.description}
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default PostTeaser