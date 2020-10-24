import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Own classes/components
import LoadingSpinner from '../content/LoadingSpinner'
import PostSearchResults from '../content/PostSearchResults'
import TacticsMapPanel from '../forms/TacticsMapPanel'
import TacticsSearchPanel from '../forms/TacticsSearchPanel'
import * as chicken from '../../util/postFetchingChicken'

// MUI styles
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    searchMenus: {

    },
    results: {

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
    const initialPanelState = {
        searchPanelExpanded: false,
        mapPanelExpanded: true
    }
    const initialSearchCriteria = {
        maps: [],
        tags: [],
        author: undefined
    }
    const initialResults = {
        items: [],
        total: 0
    }
    const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria)
    const [resultsLoading, setResultsLoading] = useState(false)
    const [panelState, setPanelState] = useState(initialPanelState)
    const [results, setResults] = useState(initialResults)

    /*
     * Elastic search all posts by map.
     * (TODO: Consider limit if amount of posts is big?)
     *
     * @param map
     * @return {Promise<void>}
     */
    const searchByMap = async (map) => {
        setPanelState({searchPanelExpanded: false, mapPanelExpanded: false})
        setResultsLoading(true)
        const newSearchOptions = { ...initialSearchCriteria, maps: [map]}
        const results = await chicken.fetch(newSearchOptions)
        setSearchCriteria(newSearchOptions)
        setResults(results)
        setResultsLoading(false)
    }

    /*
     * Elastic search by criteria.
     * (TODO: Consider limit if amount of posts is big?)
     *
     * @param map
     * @return {Promise<void>}
     */
    const search = async () => {
        setPanelState({searchPanelExpanded: false, mapPanelExpanded: false})
        setResultsLoading(true)
        const results = await chicken.fetch(searchCriteria)
        setResults(results)
        setResultsLoading(false)
    }

    /*
     * Reset criteria
     */
    const resetSearchCriteria = () => {
        setSearchCriteria(initialSearchCriteria)
    }

    const setSearchPanelExpanded = (isExpanded) => {
        setPanelState({...panelState, searchPanelExpanded: isExpanded})
    }
    const setMapPanelExpanded = (isExpanded) => {
        setPanelState({...panelState, mapPanelExpanded: isExpanded})
    }


    return (
        <Grid className={classes.root} container spacing={2}>

            <Grid className={classes.searchMenus} item xs={12}>
                {/* Advanced filtering panel */}
                <TacticsSearchPanel
                    panelExpanded={panelState.searchPanelExpanded}
                    setPanelExpanded={setSearchPanelExpanded}
                    search={search}
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                    resetSearchCriteria={resetSearchCriteria}/>
                {/* Map select component */}
                <TacticsMapPanel
                    panelExpanded={panelState.mapPanelExpanded}
                    setPanelExpanded={setMapPanelExpanded}
                    searchByMap={searchByMap}/>
            </Grid>

            <Grid className={classes.results} item xs={12}>
                <Paper>
                    <Container>
                        <Grid container spacing={2}>

                            { resultsLoading ?
                                <LoadingSpinner xsItemSize={12}/>
                            :
                                <PostSearchResults results={results} searchCriteria={searchCriteria}/>
                            }

                        </Grid>
                    </Container>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default TacticsBrowsePage