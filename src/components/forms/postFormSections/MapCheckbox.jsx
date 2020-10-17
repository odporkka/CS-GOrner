import React, {useContext} from 'react'
import { Context } from "../../../context/Context"



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
                        checked={checkedList.includes(map.name)}
                        onChange={handleMapChange}/>
                    <label htmlFor={map.canonicalName}> {map.canonicalName} </label>
                </div>
            ))}
        </div>
    )
}

export default MapCheckbox
