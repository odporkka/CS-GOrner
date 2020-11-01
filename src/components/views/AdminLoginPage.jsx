import React, { useContext } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
    },
    contentPaper: {
    },
    form: {

    }
}))



/**
 * "/admin" -page used for logging in as AWS IAM user (editors).
 *
 * OBS!! Page is wrapped with "withAuthenticator"!
 * This shows embedded AWS login window if user is not already logged in.
 * The actual component is only rendered if login is found.
 *
 * @return {JSX.Element}
 * @constructor
 */
const AdminLoginPage = () => {
    const classes = useStyles()
    // Fetch AWS user if not found yet (right after login)
    const { AWSCognitoUser, setAWSCognitoUser } = useContext(AWSCognitoUserContext)
    if (!AWSCognitoUser) {
        async function fetchUser() {
            const user = await Auth.currentAuthenticatedUser()
            setAWSCognitoUser(user)
        }
        fetchUser()
            .catch((e) => console.log(e))
    }


    return (
        <Paper className={classes.contentPaper}>
            <Container xs={12}>
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <Typography variant="body1">
                            You are logged in with AWS admin account:<br/>
                            {AWSCognitoUser?.username ? AWSCognitoUser.username : 'Error: no user found in context'}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default withAuthenticator(AdminLoginPage)