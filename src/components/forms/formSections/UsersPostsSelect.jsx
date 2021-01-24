import React from 'react'
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"

// Own classes/components
import PostSelect from "./PostSelect"

const UsersPostsSelect = (props) => {
    const {
        history,
        usersPosts
    } = props

    return (
        <>
        { usersPosts ?
            <>
                <Grid item>
                    <PostSelect
                        name='drafts'
                        label='Your drafts'
                        history={history}
                        posts={usersPosts.filter((p) => (p.published === false))} />
                </Grid>
                <Grid item>
                    <PostSelect
                        name='posts'
                        label='Your posts'
                        history={history}
                        posts={usersPosts.filter((p) => (p.published === true))} />
                </Grid>
            </>
            :
            <Grid item>
                <Typography variant='body2'>Loading your posts...</Typography>
            </Grid>
            }
        </>
    )
}

export default UsersPostsSelect