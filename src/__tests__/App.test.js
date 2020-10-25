import React from 'react'
import ReactDOM from 'react-dom'

import App from '../App'

it('App.js renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
})