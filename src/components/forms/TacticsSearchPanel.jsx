import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

// Own classes/components
import AuthorSelect from './formSections/AuthorSelect'
import MapCheckbox from './formSections/MapCheckbox'
import TagCheckbox from './formSections/TagCheckbox'

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '20px'
    }
}))



/**
 * Seach panel in tactics browse view.
 *
 * @return {JSX.Element}
 * @constructor
 */
const TacticsSearchPanel = (props) => {
    const {
        search,
        searchCriteria,
        setSearchCriteria,
        resetSearchCriteria,
        panelExpanded,
        setPanelExpanded
    } = props
    const classes = useStyles()

    const toggleExpand = () => {
        setPanelExpanded(!panelExpanded)
    }

    /*
     * Change searchCriteria if map is added/removed
     */
    const handleMapChange = (checkedMap) => {
        let mapArray = searchCriteria.maps
        if (!mapArray.includes(checkedMap)) {
            mapArray.push(checkedMap)
        } else {
            mapArray = mapArray.filter((map) => map !== checkedMap)
        }
        setSearchCriteria({...searchCriteria, maps: mapArray})
    }

    /*
     * Change searchCriteria if tag is added/removed
     */
    const handleTagChange = (event) => {
        const tagName = event.target.name
        let tagArray = searchCriteria.tags
        if (event.target.checked) {
            tagArray.push(tagName)
        } else {
            tagArray = tagArray.filter((tag) => (tag !== tagName))
        }
        setSearchCriteria({...searchCriteria, tags: tagArray})
    }

    const handleAuthorChange = (event) => {
        // Set empty string as undefined
        const value = event.target.value === 'no_author' ? undefined : event.target.value
        console.log('changed', value)
        setSearchCriteria({...searchCriteria, author: value})
    }


    return (
        <div className={classes.root}>
            <Accordion expanded={panelExpanded}>
                <AccordionSummary
                    expandIcon={<SearchIcon />}
                    aria-controls="search settings"
                    id="panel1a-header"
                    onClick={() => toggleExpand()}
                >
                    <Typography className={classes.heading}>Advanced filtering...</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={6}>
                                <AuthorSelect checkedAuthor={searchCriteria.author} handleAuthorChange={handleAuthorChange}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} container spacing={2}>
                            <Grid item xs={12}>
                                <MapCheckbox checkedList={searchCriteria.maps} handleMapChange={handleMapChange} />
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <TagCheckbox checkedList={searchCriteria.tags} handleTagChange={handleTagChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12} container spacing={2}>
                            <Grid item>
                                <Button
                                    variant='contained'
                                    onClick={() => search()}
                                    className={classes.button}>
                                    Search
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='contained'
                                    onClick={() => resetSearchCriteria()}
                                    className={classes.button}>
                                    Reset all
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>

            </Accordion>
        </div>
    );
}

export default TacticsSearchPanel