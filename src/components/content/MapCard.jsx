import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// MUI styles
const useStyles = makeStyles((theme)=>({
    card: {
        height: 250,
        width: 200,
        maxWidth: 200,
        maxHeight: 250,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        // borderRadius: 0,
        // boxShadow: "none"
    },
    image: {
        height: 150,
        // width: 150,
    },
    content: {
        height: 60,
    }

}))



/**
 * Map selection component in tactics browse view.
 *
 * @return {JSX.Element}
 * @constructor
 * @param props
 */
const MapCard = (props) => {
    const {
        map
    } = props
    const classes = useStyles()


    return (
        <Card className={classes.card} elevation={3}>
            <CardActionArea>
                <CardMedia
                    className={classes.image}
                    image="map.png"
                    title="Map"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h3">
                        {map.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Browse {map.name} tactics
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Forums
                </Button>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    );

}

export default MapCard