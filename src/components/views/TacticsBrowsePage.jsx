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


const POSTS_LIMIT = 5

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
        allItems: [],
        postCount: 0,
        postsFetched: 0,
        items: [],
        page: 1,
        nextToken: undefined,
        apiFilter: undefined
    }
    const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria)
    const [resultsLoading, setResultsLoading] = useState(false)
    const [panelState, setPanelState] = useState(initialPanelState)
    const [results, setResults] = useState(initialResults)

    /*
     * Initial search by criteria.
     * (TODO: Consider limit if amount of posts is big?)
     *
     * @return {Promise<void>}
     */
    const search = async (map=null) => {
        setPanelState({ searchPanelExpanded: false, mapPanelExpanded: false })
        setResultsLoading(true)

        let searchInput = searchCriteria
        // Check if its only one map search
        if (map) {
            searchInput = { ...initialSearchCriteria, maps: [map] }
            setSearchCriteria(searchInput)
        }
        const response = await chicken.fetch(searchInput, POSTS_LIMIT)

        setResults(response)
        setResultsLoading(false)
    }

    const onPageChange = (event, value) => {
        const firstOnWantedPage = (value * POSTS_LIMIT) - (POSTS_LIMIT - 1)
        // We already have fetched this
        if (firstOnWantedPage <= results.postsFetched) {
            console.log(`Show range ${firstOnWantedPage}-${firstOnWantedPage+(POSTS_LIMIT - 1)}`)
        } else {
            console.log('fetch more!')
        }
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
                    search={search}/>
            </Grid>

            <Grid className={classes.results} item xs={12}>
                <Paper>
                    <Container>
                        <Grid container spacing={4}>

                            { resultsLoading ?
                                <LoadingSpinner xsItemSize={12}/>
                            :
                                <PostSearchResults
                                    results={results}
                                    searchCriteria={searchCriteria}
                                    onPageChange={onPageChange}/>
                            }

                        </Grid>
                    </Container>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default TacticsBrowsePage