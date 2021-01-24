import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import HelpIcon from '@material-ui/icons/Help';
import IconButton from "@material-ui/core/IconButton";
import {Tooltip} from "@material-ui/core";

// MUI styles
const useStyles = makeStyles({
    label: {
        paddingRight: '10px'
    },
    input: {

    }
})


const YouTubeEmbedHelper = () => {
    const classes = useStyles()
    const [youTubeUrl, setYouTubeUrl] = useState(undefined)

    const onChangeHandler = (event) => {
        setYouTubeUrl(event.target.value)
    }

    const copyToClipboard = () => {
        const markdownRefString = `
<iframe width="420" 
        height="315" 
        allowfullscreen="allowfullscreen" 
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"
src="${youTubeUrl}">
</iframe>`
        const copyText = document.createElement('textarea')
        copyText.value = markdownRefString
        document.body.append(copyText)
        copyText.select()
        document.execCommand('copy')
        document.body.removeChild(copyText)
        alert(`Copied the markdown ref: ${markdownRefString}`)
    }

    const showHelp = () => {
        const infoText = "Copy the url of the video here in the form:\n" +
            "https://www.youtube.com/embed/<video-id>\n" +
            "and press copy button to get embed script copied to your clipboard.\n\n" +
            "You can then paste it to the article to the point where you want it." +
            " Only adjust height and width parameters if needed and leave other untouched."
        alert(infoText)
    }


    return (
        <div>
            <label htmlFor='youTubeUrl' className={classes.label}>YouTube video embed:</label>
            <input id='youTubeUrl' name='youTubeUrl' className={classes.input} value={youTubeUrl}
                   onChange={onChangeHandler}/>
            <Tooltip title='Copy embed script to clipboard'>
                <IconButton aria-label='copy' color='inherit'
                            onClick={() => copyToClipboard()}>
                    <FileCopyOutlinedIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='How to use video embed?'>
                <IconButton aria-label='copy' color='inherit'
                            onClick={() => showHelp()}>
                    <HelpIcon/>
                </IconButton>
            </Tooltip>
        </div>
    )

}

export default YouTubeEmbedHelper