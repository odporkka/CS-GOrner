import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AWSCognitoUserContext} from "../../context/AWSCognitoUserContext"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import EditIcon from '@material-ui/icons/Edit';

import PostBanner from "./PostBanner"

const Post = ({data}) => {
    const useStyles = makeStyles({
        root: {
            color: 'black',
            marginBottom: '15px',
            backgroundColor: 'white',
        },
        divider: {
            backgroundColor: 'black'
        }
    });
    const classes = useStyles();
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