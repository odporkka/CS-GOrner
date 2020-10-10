import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import { Context } from '../../context/Context'
import NewPosts from '../content/NewPosts'
import OneLinerBanner from '../content/OneLinerBanner'



/**
 * Home page a.k.a landing page.
 *
 * @return {JSX.Element}
 * @constructor
 */
const HomePage = () => {
    const { contentData } = useContext(Context)

    return (
        <Grid container spacing={4} justify='flex-end'>
            <Grid item>
                <OneLinerBanner />
            </Grid>

            <Grid item xs={12}>
                <NewPosts posts={ contentData.newPosts }/>
            </Grid>
        </Grid>
    )
}

export default HomePage