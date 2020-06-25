import React, {useContext} from 'react'
import {ContentContext} from "../../context/ContentContext"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapCard from "../content/MapCard"
import {Link as RouterLink} from "react-router-dom"
import Link from "@material-ui/core/Link"
import TacticsSearchPanel from "../navigation/TacticsSearchPanel"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const TacticsPage = () => {
    const classes = useStyles();

    const { contentData } = useContext(ContentContext)

    return (
        <div className={classes.root}>

            <TacticsSearchPanel />


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

export default TacticsPage