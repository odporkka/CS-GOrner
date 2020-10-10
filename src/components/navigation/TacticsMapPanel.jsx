import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

// Own classes/compontets
import { Context } from '../../context/Context'
import MapCard from '../content/MapCard'

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '20px'
    },
    panel: {
        // fontSize: theme.typography.pxToRem(15),
        // fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: theme.palette.primary.light,
    },
    heading: {}
}))



/**
 * Map search panel in tactics browse view.
 *
 * @return {JSX.Element}
 * @constructor
 */
const TacticsMapPanel = (props) => {
    const {
        searchByMap
    } = props
    const classes = useStyles()
    const { contentData } = useContext(Context)
    const [ expanded, setExpanded ] = useState(true)

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    const toggleSearch = (map) => {
        setExpanded(false)
        searchByMap(map)
    }

    return (
        <div className={classes.root}>
            <Accordion className={classes.panel} expanded={expanded} onClick={() => toggleExpand()}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon fontSize='large'/>}
                    aria-controls="search settings"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="h6">Tactics by map</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Grid container spacing={2} >
                        { contentData.maps.map((map) => (
                                <Grid item key={map.id} xs={12}>
                                    <MapCard map={map} key={map.id} toggleSearch={toggleSearch}/>
                                </Grid>
                            )
                        )}
                    </Grid>

                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default TacticsMapPanel