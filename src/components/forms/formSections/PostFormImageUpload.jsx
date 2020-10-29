import React, { useState } from 'react'
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
 * TODO: Bug when pressing "New post" and setting same image.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PostFormImageUpload = (props) => {
    const {
        post,
        fileToUpload,
        setFileToUpload,
        uploadToS3,
        uploadProgress,
        removeFromS3
    } = props
    const classes = useStyles()
    const [uploadButtonDisabled, setUploadButtonDisabled] = useState(false)

    const onChangeHandler = (event) => {
        setFileToUpload(event.target.files[0])
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

    const onUpload = async (event) => {
        event.preventDefault() // Need this, otherwise page reloads and does some strange shit
        setUploadButtonDisabled(true)
        await uploadToS3()
        setUploadButtonDisabled(false)
    }

    /*
     * State/submit component.
     *
     * @return {JSX.Element|null}
     */
    const showState = () => {
        if (uploadProgress) {
            return (
                <Typography>{uploadProgress} %</Typography>
            )
        } else if (fileToUpload && !uploadButtonDisabled){
            return (
                <button onClick={onUpload}>Upload!</button>
            )
        } else {
            return null
        }

    }


    return (
        <div>
            <label htmlFor='fileUpload' className={classes.label}>Upload images:</label>
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