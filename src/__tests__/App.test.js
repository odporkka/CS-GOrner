import React from 'react'
import { Auth } from 'aws-amplify'
import { waitFor, screen } from '@testing-library/react'
import { renderWithRouter} from '../util/testUtil'


import App from '../App'
import * as api from '../backend/api'

describe('App.js renders', () => {

    it('and landing page works if content fetch works', async () => {
        renderWithRouter(<App />, { route: '/'})
        /*
         * Context is fetched
         */
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
        /*
         * Logo is present
         */
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        /*
         * Nav bar with hrefs set is present
         */
        const tabs = ['/', '/tactics', '/forum', '/about']
        const nav = screen.getAllByRole('tab')
        expect(nav.length).toBe(tabs.length)
        nav.forEach((tab) => {
            expect(tabs.includes(tab.getAttribute('href'))).toBe(true)
        })
        /*
         * Welcome message is present
         */
        expect(screen.getByText(/welcome to csgorner/i)).toBeInTheDocument()
        /*
         * New posts are shown
         */
        expect(screen.getByText(/new posts/i)).toBeInTheDocument()
        expect(screen.getByText(/Admin's Post/i)).toBeInTheDocument()
        expect(screen.getByText(/Post description/i)).toBeInTheDocument()
        expect(screen.getByText(/Editor2's Post/i)).toBeInTheDocument()
        /*
         * Footer is present
         */
        expect(screen.getByText(/copyright/i)).toBeInTheDocument()
        expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
    })
})