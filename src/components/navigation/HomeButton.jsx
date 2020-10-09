import React from 'react'


/**
 * Home logo/button at top left of the page.
 *
 * @return {JSX.Element}
 * @constructor
 */
const HomeButton = () => {
    const style = {
        maxHeight: '80px'
    }


    return (
        <img src="home-logo-placeholder.png" alt="CS:GOrner-logo" style={style}/>
    )
}

export default HomeButton