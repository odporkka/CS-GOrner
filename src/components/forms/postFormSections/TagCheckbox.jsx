import React from 'react'

// Own classes/components
import { postTags, tagToString } from "../../../backend/models/post"


/**
 * Checkbox component for post tags
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const TagCheckbox = (props) => {
    const {
        handleTagChange,
        checkedList
    } = props


    return (
        <div>
            <label htmlFor='tags'>Tags: </label>
            {Object.entries(postTags).map(([key,value]) => (
                <div key={key}>
                    <input
                        type='checkbox'
                        name={value}
                        id={key}
                        checked={checkedList.includes(postTags[value])}
                        onChange={handleTagChange}/>
                    <label htmlFor={key}> {tagToString(value)} </label>
                </div>
            ))}
        </div>
    )
}

export default TagCheckbox
