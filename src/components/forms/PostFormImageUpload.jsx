import React, {useState} from 'react'
import {Storage} from 'aws-amplify'
import {makeStyles} from "@material-ui/core/styles"
import {Typography} from "@material-ui/core"

const PostFormImageUpload = () => {
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

    const onChangeHandler = (event) => {
        setState({...state, file: event.target.files[0]})
    }

    const uploadToS3 = async (event) => {
        event.preventDefault() // Need this, otherwise page reloads and does some strange shit
        setState({...state, uploadButtonDisabled: true})
        console.log(state.file)
        try {
            await Storage.put(state.file.name, state.file, {
                progressCallback(progress) {
                    console.log(progress)
                    const progressPercentage = (Math.round(progress.loaded / progress.total * 100))
                    setState({...state, uploadProgress: progressPercentage})
                },
            })
        } catch (e) {
            console.log(e)
        } finally {
            setState(initialState)
        }
    }

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

    return (
        <div>
            <label htmlFor='fileUpload' className={classes.label}>Upload images/videos/gifs..:</label>
            <input type="file" name="fileUpload" id='fileUpload' onChange={onChangeHandler}/>
            <br />
            {showState()}
        </div>
    )
}

export default PostFormImageUpload