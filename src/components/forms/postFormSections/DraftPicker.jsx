import React from 'react'
import Typography from "@material-ui/core/Typography"
import { useHistory } from "react-router-dom"



/**
 * Pick drafts to edit from dropdown.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const DraftPicker = (props) => {
    const {
        drafts,
    } = props
    const history = useHistory()


    const onChange = (event) => {
        const id = event.target.value
        history.push(`/post-editor?id=${id}`)
    }


    return (
        <Typography variant="subtitle1" component="h6">
            Browse drafts ({drafts.length}):
            <select name='draft' value='' onChange={onChange}>
                <option value='' key=''> </option>
                { drafts.map((draft) => (
                        <option value={draft.id} key={draft.id}>{draft.title}</option>
                    )
                )}
            </select>
        </Typography>
    )
}

export default DraftPicker