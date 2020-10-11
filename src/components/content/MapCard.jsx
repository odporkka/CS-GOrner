import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { ChevronRight } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'

// MUI styles
const useStyles = makeStyles((theme)=>({
    card: {
        height: 70,
        display: 'flex',
        backgroundColor: 'white',
        color: 'black',
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
        width: '60%',
        height: '100%'
    },
    content: {
        width: '30%'
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
                        {map.canonicalName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Browse {map.name} tactics
                    </Typography>
                </CardContent>

                <CardMedia
                    className={classes.image}
                    image={`images/maps/height420/${map.name}_h420.jpg`}
                    title="Map"
                />
                
                <ChevronRight fontSize='large'/>

            </CardActionArea>
        </Card>
    );

}

export default MapCard