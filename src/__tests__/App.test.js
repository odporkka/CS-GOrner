import React from 'react'
import { Auth } from 'aws-amplify'
import { render, screen, waitFor } from '@testing-library/react'

import App from '../App'


describe('App.js renders', () => {

    it('and context is set', async () => {
        render(<App />)
        await waitFor(() => {
            expect(Auth.currentAuthenticatedUser).rejects.toEqual('not authenticated')
        })
    })
})