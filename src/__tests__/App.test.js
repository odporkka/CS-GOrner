import React from 'react'
import { Auth } from 'aws-amplify'
import { render, waitFor } from '@testing-library/react'

import App from '../App'
import * as api from '../backend/api'

describe('App.js renders', () => {

    it('and context is fetched', async () => {
        render(<App />)
        await waitFor(() => {
            expect(Auth.currentAuthenticatedUser).rejects.toEqual('not authenticated')
        })
        await waitFor(() => {
            expect(api.fetchMaps).toHaveBeenCalledTimes(1)
        })
        await waitFor(() => {
            expect(api.fetchAuthorsList).toHaveBeenCalledTimes(1)
        })
        await waitFor(() => {
            expect(api.fetch10NewestPosts).toHaveBeenCalledTimes(1)
        })
    })
})