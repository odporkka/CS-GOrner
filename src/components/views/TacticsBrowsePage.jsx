import React, {useContext} from 'react'
import {Context} from "../../context/Context"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MapCard from "../content/MapCard"
import TacticsSearchPanel from "../navigation/TacticsSearchPanel"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const TacticsBrowsePage = () => {
    const classes = useStyles();

    const { contentData } = useContext(Context)

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

export default TacticsBrowsePage