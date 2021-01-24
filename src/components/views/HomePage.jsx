import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import { Context } from '../../context/Context'
import NewPosts from '../content/NewPosts'
import OneLinerBanner from '../content/OneLinerBanner'
import WelcomeMessage from '../content/WelcomeMessage'



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
            <Grid item xs={7}>
                <WelcomeMessage />
            </Grid>
            <Grid item xs={5}>
                <OneLinerBanner />
            </Grid>

            <Grid item xs={12}>
                <NewPosts posts={ contentData.newPosts }/>
            </Grid>
        </Grid>
    )
}

export default HomePage