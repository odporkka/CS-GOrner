import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import AuthorInfo from '../content/AuthorInfo'
import AuthorList from '../content/AuthorList'
import { Context } from '../../context/Context'
import * as api from '../../backend/api'


// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
    }
}))

/**
 * "/authors" -page.
 *
 * @return {JSX.Element}
 * @constructor
 */
const AuthorPage = () => {
    const classes = useStyles()
    const history = useHistory()
    const { contentData } = useContext(Context)
    const [ author, setAuthor ] = useState(null)
    /*
     * Fetch author if id is given in parameters.
     */
    useEffect(() => {
        let mounted = true
        const fetch = async () => {
            const searchParams = new URLSearchParams(history.location.search)
            // Fetch post if id defined in url parameters
            if (searchParams.has('author')) {
                const sud = searchParams.get('author')
                const response = await api.fetchAuthorWithSud(sud)
                if (mounted) {
                    if (response) {
                        if (!response.error) {
                            setAuthor(response)
                        } else {
                            alert(`Error while fetching author!`)
                        }
                    } else {
                        alert(`Author not found! It might been deleted recently!`)
                        history.push('/authors')
                    }
                }
            }
        }
        fetch().catch((e) => console.log(e))
        return () => { mounted = false }
    },[history, history.location.search])
    

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
            { author &&
                <AuthorInfo author={author}/>
            }
            </Grid>

            <Grid item xs={12}>
                <AuthorList authors={contentData.authors}/>
            </Grid>
        </Grid>
    )
}

export default AuthorPage