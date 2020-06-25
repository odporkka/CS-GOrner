import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const MapCard = ({map}) => {
    const theme = useTheme();
    const useStyles = makeStyles({
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

    });
    const classes = useStyles();

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