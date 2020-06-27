import React from 'react'
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Divider from '@material-ui/core/Divider';


import PostBanner from "./PostBanner"
import Typography from "@material-ui/core/Typography"

const Post = ({data}) => {
    const useStyles = makeStyles({
        root: {
            color: 'black',
            marginBottom: '15px'
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
                        <PostBanner data={data}/>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            {data.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div dangerouslySetInnerHTML={{ __html: data.sanitizedHtml }} className={classes.root}/>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Post