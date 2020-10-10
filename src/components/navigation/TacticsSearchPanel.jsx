import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'

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
}))



/**
 * Seach panel in tactics browse view.
 *
 * @return {JSX.Element}
 * @constructor
 */
const TacticsSearchPanel = () => {
    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Accordion className={classes.panel}>
                <AccordionSummary
                    expandIcon={<SearchIcon />}
                    aria-controls="search settings"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Advanced filtering...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        TBI!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default TacticsSearchPanel