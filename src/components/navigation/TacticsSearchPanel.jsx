import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

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
}));

const TacticsSearchPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary
                    expandIcon={<SearchIcon />}
                    aria-controls="search settings"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Filter posts...</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default TacticsSearchPanel