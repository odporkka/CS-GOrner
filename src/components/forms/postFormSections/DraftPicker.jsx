import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

// MUI styles
const useStyles = makeStyles({
    label: {
        paddingRight: '10px'
    },
})



/**
 * Pick drafts to edit from dropdown.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const DraftPicker = (props) => {
    const classes = useStyles()
    const {
        drafts,
    } = props
    const history = useHistory()

    const onChange = (event) => {
        const id = event.target.value
        history.push(`/post-editor?id=${id}`)
    }


    return (
        <div>
            <label htmlFor='drafts' className={classes.label}>Your drafts:</label>

            <select name='drafts' value='' onChange={onChange}>
                    <option value='' key=''> </option>
                    { drafts.map((draft) => (
                            <option value={draft.id} key={draft.id}>{draft.title}</option>
                        )
                    )}
            </select>
        </div>

    )
}

export default DraftPicker