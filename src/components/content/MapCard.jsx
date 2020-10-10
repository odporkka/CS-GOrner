import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// MUI styles
const useStyles = makeStyles((theme)=>({
    card: {
        height: 70,
        display: 'flex',
        backgroundColor: 'white',
        color: 'black',
        // borderRadius: 0,
        // boxShadow: "none"
    },
    actionArea: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    media: {
        width: 150,
        height: '100%'
    },
    image: {
        width: '70%',
        height: '100%'
    },
    content: {
        // height: 60,
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
        map,
        toggleSearch
    } = props
    const classes = useStyles()


    return (
        <Card className={classes.card} elevation={3}>
            <CardActionArea className={classes.actionArea} onClick={() => toggleSearch(map)}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h3">
                        {map.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Browse {map.name} tactics
                    </Typography>
                </CardContent>

                <CardMedia
                    className={classes.image}
                    image="map.png"
                    title="Map"
                />

            </CardActionArea>
            {/*<CardActions>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Forums*/}
            {/*    </Button>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Share*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );

}

export default MapCard