import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'

// MUI styles
const useStyles = makeStyles(() => ({
    userDiv: {
        minWidth: '100px'
    },
    userMenu: {

    },
    avatar: {
        float: 'right'
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
    const { AWSCognitoUser } = useContext(AWSCognitoUserContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const logoutAWS = () => {
        console.log('logged out')
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
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={<AccountCircleIcon />}
                endIcon={AWSCognitoUser ? adminIcon(20, 20) : null}>
                Log in
            </Button>

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
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>

                {AWSCognitoUser && (
                    <div id='AWS admin options'>
                        <Divider />
                        <MenuItem onClick={handleClose} component={Link} to='post-editor'>
                            {adminMenuItemLabel('Post editor')}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Button onClick={logoutAWS}>
                                <AmplifySignOut />
                            </Button>
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    )
}

export default UserMenu