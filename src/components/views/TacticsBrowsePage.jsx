import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Own classes/components
import LoadingSpinner from '../content/LoadingSpinner'
import PostSearchResults from '../content/PostSearchResults'
import TacticsMapPanel from '../navigation/TacticsMapPanel'
import TacticsSearchPanel from '../navigation/TacticsSearchPanel'
import * as chicken from '../../util/PostFetchingChicken'

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
    const initialSearchCriteria = {
        map: undefined,
        tags: [],
        author: undefined
    }
    const initialResults = {
        items: [],
        total: 0
    }
    const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria)
    const [resultsLoading, setResultsLoading] = useState(false)
    const [results, setResults] = useState(initialResults)

    /*
     * Elastic search all posts by map.
     * (TODO: Consider limit if amount of posts is big?)
     *
     * @param map
     * @return {Promise<void>}
     */
    const searchByMap = async (map) => {
        setResultsLoading(true)
        const newSearchOptions = { ...initialSearchCriteria, map: map}
        const results = await chicken.fetch(newSearchOptions)
        setSearchCriteria(newSearchOptions)
        setResults(results)
        setResultsLoading(false)
    }


    return (
        <Grid className={classes.root} container spacing={2}>

            <Grid className={classes.searchMenus} item xs={12}>
                <TacticsSearchPanel />
                <TacticsMapPanel searchByMap={searchByMap}/>
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