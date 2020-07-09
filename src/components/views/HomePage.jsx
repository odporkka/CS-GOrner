import React, { useContext } from 'react'
import Grid from "@material-ui/core/Grid"

import OneLinerBanner from "../content/OneLinerBanner"
import { Context } from "../../context/Context"
import NewPosts from "../content/NewPosts"


const HomePage = () => {
    const { contentData } = useContext(Context)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OneLinerBanner />
            </Grid>

            <Grid item xs={12}>
                <NewPosts posts={ contentData.posts }/>
            </Grid>
        </Grid>
    );
}

export default HomePage