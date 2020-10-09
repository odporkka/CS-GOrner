import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import {Context} from '../../context/Context'
import MapCard from '../content/MapCard'
import TacticsSearchPanel from '../navigation/TacticsSearchPanel'

// MUI styles
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    }
}))



/**
 * "/tactics" -page.
 * Browse and search all posts.
 *
 * @return {JSX.Element}
 * @constructor
 */
const TacticsBrowsePage = () => {
    const classes = useStyles()
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

    )
}

export default TacticsBrowsePage