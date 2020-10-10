import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

// Own classes/components
import TacticsMapPanel from '../navigation/TacticsMapPanel'
import TacticsSearchPanel from '../navigation/TacticsSearchPanel'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import PostTeaser from "../content/PostTeaser"

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
    const initialSeachOptions = {
        map: 'Nuke',
        tags: [],
        author: 'Helarius Hiiri'
    }
    const [searchOptions, setSeachOptions] = useState(initialSeachOptions)

    const titleString = () => {
        let string = "Posts "
        if (searchOptions.map) string += `on map ${searchOptions.map} `
        if (searchOptions.author) string += `by ${searchOptions.author} `
        return string
    }

    const searchByMap = (map) => {
        setSeachOptions({...searchOptions, map: map.name})
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
                            <Grid item xs={12}>
                                <Typography variant='h5'>{titleString()}</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Grid>

        </Grid>

    )
}

export default TacticsBrowsePage