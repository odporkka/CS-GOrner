import React, { useContext } from 'react'
import { Hub } from 'aws-amplify'
import { AmplifyAuthenticator, AmplifyContainer } from '@aws-amplify/ui-react'
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

    },
    authDiv: {
        height: 'auto'
    },
    authContainer: {
        width: '500px',
        height: '500px'
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

    const authListener = (data) => {
        if (data.payload.event === 'signIn') {
            setAWSCognitoUser(data.payload.data)
        }
    }
    Hub.listen('auth', authListener)

    return (
        <Paper className={classes.contentPaper}>
            <Container xs={12}>
                <Grid container spacing={2} justify='center'>
                    <Grid item className={classes.authDiv}>
                        <AmplifyContainer className={classes.authContainer}>
                            <AmplifyAuthenticator>
                                { AWSCognitoUser &&
                                <>
                                    <Typography variant='h6'>
                                        You are logged in with AWS admin account:
                                    </Typography>
                                    <Typography variant='h4'>
                                        {AWSCognitoUser.username}
                                    </Typography>
                                </>
                                }
                            </AmplifyAuthenticator>
                        </AmplifyContainer>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default AdminLoginPage