import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const PostBanner = ({data}) => {
    const useStyles = makeStyles({
        root: {
            height: '100px',
            maxHeight: '100px'
        },
        imageContainer: {
            height: '100%'
        },
        image: {
            height: '100%'
        }
    });
    const classes = useStyles();

    const now = new Date()
    data.publishedAt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    data.updatedAt = new Date().toDateString()

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4}>
                <Typography>
                    {data.publishedAt}
                </Typography>
                <Typography variant='body2'>
                    Bread > Crumb > Here
                </Typography>
                <Typography variant='body1'>
                    by {data.author}
                </Typography>
                <Typography variant='body2' style={{fontSize: 10}}>
                   last edit: {data.updatedAt}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='body1'>
                    Tags:
                </Typography>
            </Grid>
            <Grid item xs={4} className={classes.imageContainer}>
                <img src='csgo-logo.png' alt='map' className={classes.image}/>
            </Grid>
        </Grid>
    )
}

export default PostBanner