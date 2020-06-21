import React, {useContext} from 'react'
import {ContentContext} from "../../context/ContentContext"
import Typography from "@material-ui/core/Typography"

const MapPage = () => {
    const { contentData } = useContext(ContentContext)

    return (
        <div>
            { contentData.maps.map((map) => (
                <Typography key={map.name} color="inherit">{map.name}</Typography>
                )
            )}
        </div>
    );
}

export default MapPage