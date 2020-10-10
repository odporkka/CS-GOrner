import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles"

// MUI styles
const useStyles = makeStyles(() => ({
    link: {
        height: '100%'
    },
    logo: {
        maxHeight: '60px'
    }
}))


/**
 * Home logo/button at top left of the page.
 *
 * @return {JSX.Element}
 * @constructor
 */
const HomeButton = (props) => {
    const {
        homePath
    } = props
    const classes = useStyles()

    const style = {
    }


    return (
        <RouterLink className={classes.link} to={homePath}>
            <img className={classes.logo} src="images/csgorner-logo-white-red.png" alt="csgorner logo" style={style}/>
        </RouterLink>
    )
}

export default HomeButton