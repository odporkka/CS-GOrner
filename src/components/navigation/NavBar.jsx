import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import HomeButton from "./HomeButton"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginBottom: '20px',
        // border: '1px solid yellow'
        // height: '85px'
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

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <HomeButton />

                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link component={RouterLink} to="/" color="inherit">
                            Home
                        </Link>
                    </Typography>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link component={RouterLink} to="/maps" color="inherit">
                            Tactics
                        </Link>
                    </Typography>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link component={RouterLink} to="/forum" color="inherit">
                            Forum
                        </Link>
                    </Typography>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link component={RouterLink} to="/about" color="inherit">
                            About
                        </Link>
                    </Typography>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link component={RouterLink} to="/new" color="inherit">
                            New post
                        </Link>
                    </Typography>

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