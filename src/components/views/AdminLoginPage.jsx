import React, {useContext, useEffect} from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {AWSCognitoUserContext} from "../../context/AWSCognitoUserContext"
import {Auth} from "@aws-amplify/auth"

/**
 * /admin page used for logging in as AWS user.
 *
 * Page is wrapped with "withAuthenticator" which forces aws login.
 * Because of that page is only rendered when user is logged in.
 *
 * @return {JSX.Element}
 * @constructor
 */
const AdminLoginPage = () => {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
        },
        contentPaper: {
            backgroundColor: theme.palette.primary.dark,
        },
        form: {

        }
    });
    const classes = useStyles();
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
                        <Typography variant="h6" component="h6">
                            You are logged in with AWS admin account:
                            {<p>{AWSCognitoUser?.username ? AWSCognitoUser.username : 'Error: no user found in context'}</p>}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default withAuthenticator(AdminLoginPage)