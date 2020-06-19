import React, { useContext } from 'react'

import { ContentContext } from '../../context/ContentContext'

const NavBar = () => {
    const { contentData } = useContext(ContentContext)

    return (
        <div>
            {contentData.maps.map(map =>
                <p key={map.name}>{map.name}</p>
            )}
        </div>
    )
}

export default NavBar