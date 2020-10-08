import React, {useState} from 'react'
import {Storage} from 'aws-amplify'
import {makeStyles} from "@material-ui/core/styles"
import {Typography} from "@material-ui/core"


/**
 * Image upload to S3
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PostFormImageUpload = (props) => {
    const useStyles = makeStyles({
        label: {
            paddingRight: '10px'
        },
    });
    const classes = useStyles();
    const initialState = {
        file: undefined,
        uploadProgress: undefined,
        uploadButtonDisabled: false
    }
    const [state, setState] = useState(initialState)

    /**
     * State/submit component.
     *
     * @return {JSX.Element|null}
     */
    const showState = () => {
        if (state.uploadProgress) {
            return (
                <Typography>{state.uploadProgress} %</Typography>
            )
        } else if (state.file && !state.uploadButtonDisabled){
            return (
                <button onClick={uploadToS3}>Upload!</button>
            )
        } else {
            return null
        }

    }

    const onChangeHandler = (event) => {
        setState({...state, file: event.target.files[0]})
    }

    // Add post specific s3 uuid
    const resolveName = (fileName) => {
        return `${props.post.s3id}/${fileName}`
    }

    const uploadToS3 = async (event) => {
        event.preventDefault() // Need this, otherwise page reloads and does some strange shit
        setState({...state, uploadButtonDisabled: true})

        try {
            const result = await Storage.put(resolveName(state.file.name), state.file, {
                progressCallback(progress) {
                    const progressPercentage = (Math.round(progress.loaded / progress.total * 100))
                    setState({...state, uploadProgress: progressPercentage})
                },
            })
            props.addImage(result)
        } catch (e) {
            console.log(e)
        } finally {
            setState(initialState)
        }
    }


    return (
        <div>
            <label htmlFor='fileUpload' className={classes.label}>Upload images/videos/gifs..:</label>
            <input type="file" name="fileUpload" id='fileUpload' onChange={onChangeHandler}/>
            <br />
            {showState()}
            {/*<ul>*/}
            {/*    {props.post.images && props.post.images.map(image => (*/}
            {/*        <li key={image.key}>{image.key}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    )
}

export default PostFormImageUpload