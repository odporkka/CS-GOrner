import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'


import { tagToString } from "../../backend/models/post"


// MUI styles
const useStyles = makeStyles({
    root: {
        // height: '120px',
        // maxHeight: '120px'
    },
    link: {
        color: 'blue'
    },
    imageContainer: {
        height: '80px'
    },
    image: {
        height: '100%'
    },
    divider: {
        // marginTop: '10px',
        // marginBottom: '20px'
    }
})



/**
 * Header component of post object.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PostHeader = (props) => {
    const {
        data,
        inTeaser
    } = props
    const classes = useStyles()


    return (
        <Grid container className={classes.root} spacing={2}>
            {/* Title column */}
            <Grid item container xs={8}>
                <Grid item xs={12}>
                    <Typography variant='h5'>
                        { inTeaser ?
                                <Link
                                    className={classes.link}
                                    component={RouterLink}
                                    color='inherit'
                                    to={`/tactics/${data.id}`}
                                >
                                    {data.title}
                                </Link>

                            :

                            <>
                                {data.title}
                            </>
                        }

                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        by {data.authorID}
                    </Typography>
                    <Typography variant='body2' style={{fontSize: 10}}>
                        last edit: { data.updatedAt }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        Tags:{data.tags.map((t) => (` ${tagToString(t)}`))}
                    </Typography>
                </Grid>
            </Grid>

            {/* Image column */}
            <Grid item container xs={4} justify='flex-end' align='right'>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        { data.publishDate }
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.imageContainer}>
                    <img src='images/csgo-placeholder-logo.png' alt='map' className={classes.image}/>
                </Grid>
            </Grid>

            {/* Divider */}
            <Grid item xs={12} className={classes.divider}>
                <Divider />
            </Grid>
        </Grid>
    )
}

export default PostHeader