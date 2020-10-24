import React, { useContext } from 'react'

// Own classes/components
import { Context } from '../../../context/Context'


/**
 * Map checkbox component
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const MapCheckbox = (props) => {
    const {
        handleMapChange,
        checkedList
    } = props
    const { contentData } = useContext(Context)

    return (
        <div>
            <label htmlFor='maps'>Maps: </label>
            {contentData.maps.map((map) => (
                <div key={map.canonicalName}>
                    <input
                        type='checkbox'
                        name={map.canonicalName}
                        id={map.canonicalName}
                        checked={checkedList.includes(map)}
                        onChange={() => handleMapChange(map)}/>
                    <label htmlFor={map.canonicalName}> {map.canonicalName} </label>
                </div>
            ))}
        </div>
    )
}

export default MapCheckbox
