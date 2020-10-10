import React from 'react'
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"



/**
 * Loading spinner Grid item.
 *
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const LoadingSpinner = (props) => {
    const {
        xsItemSize
    } = props

    return (
        <Grid item xs={xsItemSize}>
            <Typography variant='subtitle1'>Loading...</Typography>
        </Grid>
    )
}

export default LoadingSpinner