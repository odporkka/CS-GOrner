import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'
import PostBanner from './PostBanner'

// MUI styles
const useStyles = makeStyles({
    root: {
        color: 'black',
        marginBottom: '15px',
        backgroundColor: 'white',
    },
    divider: {
        backgroundColor: 'black'
    }
})



/**
 * Component to show single Post object.
 *
 * @return {JSX.Element}
 * @constructor
 * @param props
 */
const Post = (props) => {
    const {
        data
    } = props
    const classes = useStyles()
    const { AWSCognitoUser } = useContext(AWSCognitoUserContext)


    return (
        <Paper xs={12} className={classes.root} >
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PostBanner data={data} inTeaser={false}/>
                    </Grid>
                    <Grid item xs={12}>
                        <div dangerouslySetInnerHTML={{ __html: data.sanitizedHtml }} />
                    </Grid>
                    { AWSCognitoUser && (
                        <Grid item>
                            <Button variant='contained' component={Link} to={`/post-editor?id=${data.id}`}>
                                <EditIcon /> Edit
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Paper>
    )
}

export default Post