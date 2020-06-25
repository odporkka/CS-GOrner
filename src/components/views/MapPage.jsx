import React, {useContext} from 'react'
import {ContentContext} from "../../context/ContentContext"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapCard from "../content/MapCard"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    item: {
        maxWidth: 300
    }
}));

const MapPage = () => {
    const classes = useStyles();

    const { contentData } = useContext(ContentContext)

    return (
        <div className={classes.root}>
            <Grid container spacing={5}
                direction="row"
                justify="center"
                alignItems="center">
                { contentData.maps.map((map) => (
                    <Grid item key={map.id}>
                        <MapCard map={map} key={map.id} />
                    </Grid>
                    )
                )}
            </Grid>
        </div>

    );
}

export default MapPage