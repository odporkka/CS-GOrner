import React, { useState } from 'react'
import { Storage } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import IconButton from '@material-ui/core/IconButton'

// MUI styles
const useStyles = makeStyles({
    label: {
        paddingRight: '10px'
    },
})



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
    const classes = useStyles()
    const initialState = {
        file: undefined,
        uploadProgress: undefined,
        uploadButtonDisabled: false,
    }
    const [state, setState] = useState(initialState)

    /*
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

    /*
     * Post specific uuid that is used to group posts images under same path.
     * "Folder" in S3. i.e. /public/<uuid>/fileName
     *
     * @param fileName
     * @return {string}
     */
    const resolveName = (fileName) => {
        return `${post.s3id}/${fileName}`
    }

    /*
     * Construct public url to embed in markdown
     *
     * @param fileName
     * @return {string}
     */
    const resolvePublicUrl = (fileName) => {
        const s3Config = Storage.getPluggable('AWSS3')._config
        const bucket = s3Config.bucket
        const region = s3Config.region

        return `https://${bucket}.s3-${region}.amazonaws.com/public/${fileName}`
    }

    const copyToClipboard = (url, fileName) => {
        const markdownRefString = `<img src=${url} alt="${fileName}" height="200px"/>`

        const copyText = document.createElement('textarea')
        copyText.value = markdownRefString
        document.body.append(copyText)
        copyText.select()
        document.execCommand('copy')
        document.body.removeChild(copyText)

        alert(`Copied the markdown ref: ${markdownRefString}`)
    }

    const uploadToS3 = async (event) => {
        event.preventDefault() // Need this, otherwise page reloads and does some strange shit
        setState({...state, uploadButtonDisabled: true})

        const fileName = resolveName(state.file.name)
        const publicUrl = resolvePublicUrl(fileName)

        // Push image to S3
        let result
        try {
            result = await Storage.put(fileName, state.file, {
                progressCallback(progress) {
                    const progressPercentage = (Math.round(progress.loaded / progress.total * 100))
                    setState({...state, uploadProgress: progressPercentage})
                },
                ACL: 'public-read'
            })
            result.url = publicUrl
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
            <label htmlFor='fileUpload' className={classes.label}>Upload images/videos/gifs..:</label>
            <input type="file" name="fileUpload" id='fileUpload' onChange={onChangeHandler}/>
            <br />
            {showState()}
            <ul>
                {post.images && post.images.map(image => (
                    <li key={image.key}>
                        {image.key.split('/')[1]}
                        <IconButton aria-label='copy' color='inherit'
                            onClick={() => copyToClipboard(image.url, image.key)}>
                            <FileCopyOutlinedIcon/>
                        </IconButton>
                        <IconButton aria-label='delete' style={{color:'red'}} onClick={() => removeFromS3(image)}>
                            <BackspaceIcon/>
                        </IconButton>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostFormImageUpload