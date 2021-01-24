import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'
import { SteamUserContext } from '../../context/SteamUserContext'
import * as steamService from '../../util/steamService'

// MUI styles
const useStyles = makeStyles((theme) => ({
    userDiv: {
        minWidth: '100px'
    },
    userMenuButtonDiv: {
        border: `2px solid red`,
        borderRadius: 4
    },
    userMenuButton: {
        margin: '-3px 0px -2px 10px',
        textTransform: 'none'
    },
    userName: {
        fontSize: 16,
        color: '#ccba7c'
    },
    logInText: {
        fontSize: 16,
        color: '#5d79ae'
    },
    menuPaper: {
        backgroundColor: theme.palette.primary.light,
    },
    avatar: {
        height: '25px',
        width: '25px'
    },
    adminTitle: {
        paddingLeft: '20px'
    },
    adminMenuLabelContainer: {
        width: '100%'
    },
    adminMenuLabelIcon: {
        float: 'right'
    }
}))



/**
 * User menu at top right of NavBar.
 * 
 * @return {JSX.Element}
 * @constructor
 */
const UserMenu = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const { AWSCognitoUser, setAWSCognitoUser } = useContext(AWSCognitoUserContext)
    const { steamUser, setSteamUser } = useContext(SteamUserContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        steamService.logOut(setSteamUser)
    }

    const logoutAWS = () => {
        setAWSCognitoUser(null)
    }

    const adminIcon = (width, height) => {
        return <img src='images/admin-crown.png' alt='admin-icon' style={{height: height, width: width, float: 'right'}}/>
    }

    const adminMenuItemLabel = (label) => {
        return (
            <div className={classes.adminMenuLabelContainer}>
                {label}
                <div className={classes.adminMenuLabelIcon}>{adminIcon(20, 20)}</div>
            </div>
        )
    }


    return (
        <div className={classes.userDiv}>
            { steamUser ?
                <div className={classes.userMenuButtonDiv}>
                    <Button className={classes.userMenuButton}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        startIcon={<Avatar
                            variant='square'
                            src='images/csgo-headshot-sharpened-white-h50.png'
                            className={classes.avatar}/>}
                        endIcon={AWSCognitoUser ? adminIcon(20, 20) : null}>
                        <b className={classes.userName}>{steamUser.personaname}</b>
                    </Button>
                </div>
            :
                <div className={classes.userMenuButtonDiv}>
                    <Button className={classes.userMenuButton}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                            startIcon={<Avatar
                                variant='square'
                                src='images/csgo-headshot-sharpened-white-h50.png'
                                className={classes.avatar}/>}
                        endIcon={AWSCognitoUser ? adminIcon(20, 20) : null}>
                        <b className={classes.logInText}>Log in</b>
                    </Button>
                </div>
            }


            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.userMenu}
                classes={{paper: classes.menuPaper}}
            >
                { steamUser ?
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    :
                    <MenuItem onClick={handleClose} component={Link} to='/login'>Log in (via Steam)</MenuItem>
                }

                {AWSCognitoUser && (
                    <div id='AWS admin options'>
                        <Divider />
                        <MenuItem onClick={handleClose} component={Link} to='post-editor'>
                            {adminMenuItemLabel('Post editor')}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <AmplifySignOut onClick={logoutAWS}/>
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    )
}

export default UserMenu