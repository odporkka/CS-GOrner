import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

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
    const classes = useStyles()

    const authors = [
        'author1',
        'author2',
        'author3'
    ]

    return (
        <div>
            <label htmlFor='authors' className={classes.label}>Author:</label>

            <select name='authors' value={authors[0]} onChange={() => console.log('Author picked!')}>
                <option value='' key=''> </option>
                { authors.map((author) => (
                        <option value={author} key={author}>{author}</option>
                    )
                )}
            </select>
        </div>
    )
}

export default AuthorSelect
