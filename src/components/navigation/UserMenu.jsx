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


    return (
        <div className={classes.userDiv}>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={<AccountCircleIcon />}
                endIcon={AWSCognitoUser ?
                    <img src='admin-crown.png'  alt='admin-icon' style={{height: '20px', width: '20px'}}/> : null}>
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
                        <MenuItem onClick={handleClose} component={Link} to='post-editor' >Make new post</MenuItem>
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