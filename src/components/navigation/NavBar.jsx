import React  from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'

// Own classes/components
import HomeButton from './HomeButton'
import UserMenu from './UserMenu'

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        width: '100%',
        marginTop: '10px',
        marginBottom: '40px',
    },
    appBar: {
        backgroundColor: theme.palette.primary.dark
    },
    toolbar: {
        height: '80px'
    },
    tab: {
        minWidth: '100px',
        maxWidth: '140px',
        display: 'inline-block'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    userDiv: {
        minWidth: '100px'
    },
    avatar: {
        float: 'right'
    }
}))



/**
 * NavBar component at top of page.
 *
 * @return {JSX.Element}
 * @constructor
 */
const NavBar = () => {
    const classes = useStyles()
    const location = useLocation()

    const navBarPaths = ['/', '/tactics', '/forum', '/about']

    const resolveTabValue = () => {
        return navBarPaths.includes(location.pathname) ? location.pathname : false
    }


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Grid container alignItems='center' justify='space-between'>
                        <Grid item >
                            <HomeButton homePath={navBarPaths[0]}/>
                        </Grid>
                        <Grid item >
                            <Tabs value={resolveTabValue()} centered className={classes.tabs}>
                                <Tab label='News' value={navBarPaths[0]} component={RouterLink} to={navBarPaths[0]} className={classes.tab} />
                                <Tab label='Tactics' value={navBarPaths[1]} component={RouterLink} to={navBarPaths[1]} className={classes.tab} />
                                <Tab label='Forum' value={navBarPaths[2]} component={RouterLink} to={navBarPaths[2]} className={classes.tab} />
                                <Tab label='About' value={navBarPaths[3]} component={RouterLink} to={navBarPaths[3]} className={classes.tab} />
                            </Tabs>
                        </Grid>
                        <Grid item >
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <UserMenu />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar