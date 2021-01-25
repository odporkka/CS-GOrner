import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


// MUI styles
const useStyles = makeStyles((theme) => ({
    cardDiv: {
        maxWidth: '600px',
        padding: '50px'
    },
    card: {
        border: `2px solid #5d79ae`,
        display: 'flex'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    userPic: {
        height: '100%',
        width: 184
    },
}))

const AuthorInfo = (props) => {
    const classes = useStyles()
    const {
        author
    } = props

    return (
        <Grid item xs={12} container justify='center'>
            <Grid item xs={12} className={classes.cardDiv}>
                {/*<Card classes={{root: classes.card}}>*/}
                <Card className={classes.card}>
                    <CardMedia className={classes.userPic}>
                        <img
                            style={{padding: '10px', width: 184 }}
                            alt='author-user-pic'
                            src={author.profilePic ? author.profilePic.url : './images/csgo-placeholder-logo.png'} />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='h5' align='center'>
                            {author.username}
                        </Typography>
                        <Typography variant='body2' align='center'>
                            Joined: {author.createdAt}
                        </Typography>
                        <Typography variant='body1' align='center'>
                            Posts: <b>{author.nOfPosts}</b>
                        </Typography>
                        <Typography variant='body1' align='center'>
                            Avg.rating: <b>TBI</b>
                        </Typography>
                        <Typography variant='h6' align='center'>
                            Bio
                        </Typography>
                        <Typography variant='body1' align='center'>
                            {author.bio ? author.bio : '-'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default AuthorInfo