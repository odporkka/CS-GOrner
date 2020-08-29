import React, {useContext} from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {AWSCognitoUserContext} from "../../context/AWSCognitoUserContext"

/**
 * /admin page used for logging in as AWS user.
 *
 * Page is wrapped with "withAuthenticator" and because of that is only rendered when user is logged in.
 * That is why we can set admin state with useEffect hook and only for first render.
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
    // User in context if found
    const { AWSCognitoUser } = useContext(AWSCognitoUserContext)

    return (
        <Paper className={classes.contentPaper}>
            <Container xs={12}>
                <Grid container spacing={2} justify='center'>
                    <Grid item>
                        <Typography variant="h6" component="h6">
                            You are logged in with AWS admin account:
                            {<p>{AWSCognitoUser?.username ? AWSCognitoUser.username : 'no user found in context'}</p>}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default withAuthenticator(AdminLoginPage)