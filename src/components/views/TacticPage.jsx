import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'

// Own classes/components
import { AWSCognitoUserContext } from '../../context/AWSCognitoUserContext'
import { Context } from '../../context/Context'
import Post from '../content/Post'
import * as api from "../../backend/api";

// MUI styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}))



/**
 * "tactics/<id>" -page.
 * Show full single post.
 *
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const TacticPage = (props) => {
    const classes = useStyles()
    // Actually id for now. TODO: rename in Router?
    const title = props.match.params.title
    const history = useHistory()
    const { contentData } = useContext(Context)
    const { AWSCognitoUser } = useContext(AWSCognitoUserContext)
    const [ post, setPost ] = useState(null)

    useEffect(() => {
        let mounted = true
        const fetch = async () => {
            const response = await api.fetchPostWithId(title)
            if (mounted) {
                if (response) {
                    if (!response.error) {
                        setPost(response)
                    } else {
                        alert(`Error while fetching post with id ${title}!`)
                    }
                } else {
                    alert(`Post with id ${title} not found! It might been deleted recently!`)
                    history.push('/tactics')
                }
            }
        }
        fetch().catch((e) => console.log(e))

        return () => { mounted = false }
    }, [title])


    return (
        <div className={classes.root}>
            { post ?
                <Grid container spacing={2}>
                { AWSCognitoUser && (
                    <Grid item xs={12}>
                        <Button variant='contained' component={Link} to={`/post-editor?id=${post.id}`}>
                            <EditIcon /> Edit
                        </Button>
                    </Grid>
                )}
                    <Grid item xs={12}>
                        <Post postData={post}/>
                    </Grid>
                </Grid>

                :

                <div align='center'> loading...</div>
            }
        </div>
    )
}

export default TacticPage