import React  from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import HomeButton from "./HomeButton"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        width: '100%',
        marginBottom: '20px',
    },
    toolbar: {
        maxHeight: '80px'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
}));

const NavBar = () => {
    const classes = useStyles();
    const location = useLocation();
    console.log(location.pathname)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    {/*<Grid container>*/}
                    {/*    <Grid item xs={2}>*/}
                    {/*        <HomeButton />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        */}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    <HomeButton />
                    <Tabs value={location.pathname} centered>
                        <Tab label='News' value='/' component={RouterLink} to='/' />
                        <Tab label='Tactics' value='/tactics' component={RouterLink} to='/tactics' />
                        <Tab label='Forum' value='/forum' component={RouterLink} to='/forum' />
                        <Tab label='About' value='/about' component={RouterLink} to='/about'/>
                        <Tab label='New post' value='/post-editor'  component={RouterLink} to='/post-editor'/>
                    </Tabs>

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
                </Toolbar>
            </AppBar>
        </div>
    );
}



export default NavBar