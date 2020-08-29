import React, {useState} from 'react'
import {Storage} from 'aws-amplify'
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"

const PostFormImageUpload = () => {
    const useStyles = makeStyles({
        label: {
            paddingRight: '10px'
        },
    });
    const classes = useStyles();
    const [file, setFile] = useState(null)

    const onChangeHandler = (event) => {
        setFile(event.target.files[0])
    }

    const uploadToS3 = (event) => {
        event.preventDefault() // Need this, otherwise page reloads and does some strange shit
        console.log(file)
        // Storage.put('test.txt', 'Hello')
        //     .then (result => console.log(result)) // {key: "test.txt"}
        //     .catch(err => console.log(err));
    }

    return (
        <div>
            <label htmlFor='fileUpload' className={classes.label}>Upload images/videos/gifs..:</label>
            <input type="file" name="fileUpload" id='fileUpload' onChange={onChangeHandler}/>
            <button onClick={uploadToS3}>Upload!</button>

            {file && (<p>{file.toString()}</p>)}
        </div>
    )
}

export default PostFormImageUpload