import React, {useState} from 'react'
import {Storage} from 'aws-amplify'
import {makeStyles} from "@material-ui/core/styles"
import {Typography} from "@material-ui/core"
import BackspaceIcon from "@material-ui/icons/Backspace"
import IconButton from "@material-ui/core/IconButton"


/**
 * S3 Image upload component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PostFormImageUpload = (props) => {
    const {
        post,
        addImage,
        removeImage
    } = props
    const useStyles = makeStyles({
        label: {
            paddingRight: '10px'
        },
    });
    const classes = useStyles();
    const initialState = {
        file: undefined,
        uploadProgress: undefined,
        uploadButtonDisabled: false,
        removeInProgress: false
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
        return `${post.s3id}/${fileName}`
    }

    const uploadToS3 = async (event) => {
        event.preventDefault() // Need this, otherwise page reloads and does some strange shit
        setState({...state, uploadButtonDisabled: true})

        // Push image to S3
        let result
        try {
            result = await Storage.put(resolveName(state.file.name), state.file, {
                progressCallback(progress) {
                    const progressPercentage = (Math.round(progress.loaded / progress.total * 100))
                    setState({...state, uploadProgress: progressPercentage})
                },
            })
            addImage(result)
        } catch (e) {
            console.log(e)
        }

        setState(initialState)
    }

    const removeFromS3 = async (image) => {
        console.log(`Removing image ${image.key} from S3..`)
        try {
            const result = await Storage.remove(image.key)
            console.log('Response', result)
            console.log(`Image removed successfully.. (supposedly... thx amplify-aws...)`)
            console.log(`Removing image data from post object..`)
            removeImage(image)
        } catch (e) {
            alert(`Something went wrong when removing image:\n ${e}`)
        }
    }


    return (
        <div>
            { state.removeInProgress ?
                <div>
                    <p>Loading...</p>
                </div>
            :
                <div>
                    <label htmlFor='fileUpload' className={classes.label}>Upload images/videos/gifs..:</label>
                    <input type="file" name="fileUpload" id='fileUpload' onChange={onChangeHandler}/>
                    <br />
                    {showState()}
                    <ul>
                        {post.images && post.images.map(image => (
                            <li key={image.key}>
                                {image.key}
                                <IconButton aria-label='delete' style={{color:'red'}} onClick={() => removeFromS3(image)}>
                                    <BackspaceIcon/>
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default PostFormImageUpload