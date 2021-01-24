import React, { useContext } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Context} from "../../../context/Context"

// MUI styles
const useStyles = makeStyles({
    label: {
        paddingRight: '10px'
    },
})



/**
 * Author select component.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const AuthorSelect = (props) => {
    const {
        selectedAuthor,
        handleAuthorChange
    } = props
    const classes = useStyles()
    const { contentData } = useContext(Context)

    return (
        <div>
            <label htmlFor='authors' className={classes.label}>Author:</label>

            <select name='authors' value={selectedAuthor}  onChange={handleAuthorChange}>
                <option value='no_author' key='no_author'>Select author.. </option>
                { contentData.authors.map((author) => (
                        <option value={author.cognitoUserSud} key={author.cognitoUserSud}>{author.username}</option>
                    )
                )}
            </select>
        </div>
    )
}

export default AuthorSelect
