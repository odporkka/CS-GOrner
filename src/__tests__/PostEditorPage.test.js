import React from 'react'
import { Auth } from 'aws-amplify'
import { waitFor, screen } from '@testing-library/react'
import { renderWithRouter } from '../util/testUtil'

import App from '../App'
import * as api from '../backend/api'
import { mockData } from "../__mocks__/mockData"

describe('When no AWS user is logged in, PostEditorPage renders', () => {

    it('and shows notification but does not show form', async () => {
        renderWithRouter(<App />, {  route: '/post-editor' })
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
         * Footer is present
         */
        expect(screen.getByText(/copyright/i)).toBeInTheDocument()
        expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
        /*
         * Shows warning
         */
        expect(screen.getByText(/You must be logged in as admin/i)).toBeInTheDocument()
        /*
         * Does not show post edit form
         */
        expect(screen.queryByText(/post editor/i)).not.toBeInTheDocument()
    })
})

describe('When editor is logged in, PostEditorPage renders', () => {

    beforeEach(() => {
        Auth.currentAuthenticatedUser = jest.fn(mockData.amplifyAuth.currentAuthenticatedUserResolve)
    })

    it('and post edit form allows making new posts', async () => {
        renderWithRouter(<App />, {  route: '/post-editor' })
        /*
         * Context is fetched
         */
        await waitFor(() => {
            expect(Auth.currentAuthenticatedUser).toHaveBeenCalledTimes(1)
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
        // screen.debug(screen.getByText(/sign out/i))

        expect(screen.getByRole('heading', {name: /post editor/i})).toBeInTheDocument()
    })
})