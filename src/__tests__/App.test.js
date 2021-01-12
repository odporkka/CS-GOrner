import React from 'react'
import { Auth } from 'aws-amplify'
import { waitFor, screen } from '@testing-library/react'
import { renderWithRouter } from '../util/testUtil'

import App from '../App'
import * as api from '../backend/api'
import { mockData } from "../__mocks__/mockData";

describe('When no AWS user is logged in the app renders', () => {

    beforeEach(() => {
        Auth.currentAuthenticatedUser = jest.fn(mockData.amplifyAuth.currentAuthenticatedUserReject)
    })

    afterEach(() => {
        Auth.currentAuthenticatedUser.mockClear()
        api.fetchMaps.mockClear()
        api.fetch10NewestPosts.mockClear()
        api.fetchAuthorsList.mockClear()
    })

    it('and landing page works if content fetch works', async () => {
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch10NewestPosts.mockResolvedValue(mockData.post.fetch10NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)

        renderWithRouter(<App />, { route: '/'})
        /*
         * Context is fetched
         */
        await waitFor(() => {
            expect(Auth.currentAuthenticatedUser()).rejects.toEqual('not authenticated')
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
        expect(screen.queryByAltText(/admin-icon/i)).not.toBeInTheDocument()
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

    it('and landing page renders even if api returns error', async () => {
        api.fetchMaps.mockResolvedValue(mockData.apiError)
        api.fetchAuthorsList.mockResolvedValue(mockData.apiError)
        api.fetch10NewestPosts.mockResolvedValue(mockData.apiError)

        renderWithRouter(<App />, { route: '/'})

        await waitFor(() => {
            expect(Auth.currentAuthenticatedUser()).rejects.toEqual('not authenticated')
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
        expect(screen.queryByAltText(/admin-icon/i)).not.toBeInTheDocument()
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        expect(screen.getByText(/welcome to csgorner/i)).toBeInTheDocument()
        expect(screen.getByText(/copyright/i)).toBeInTheDocument()
        expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
    })
})

describe('When AWS user is logged in the app renders', () => {

    beforeEach(() => {
        Auth.currentAuthenticatedUser = jest.fn(mockData.amplifyAuth.currentAuthenticatedUserResolve)
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch10NewestPosts.mockResolvedValue(mockData.post.fetch10NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)
    })

    afterEach(() => {
        Auth.currentAuthenticatedUser.mockClear()
        api.fetchMaps.mockClear()
        api.fetch10NewestPosts.mockClear()
        api.fetchAuthorsList.mockClear()
    })

    it('and landing page works and sets AWS user', async () => {
        renderWithRouter(<App />, { route: '/'})

        /*
         * Context is fetched
         */
        await waitFor(() => {
            expect(Auth.currentAuthenticatedUser()).resolves.toEqual({"username": "AWS_user"})
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
        await waitFor(() => {
            expect(screen.getAllByAltText(/admin-icon/i).length).toBeGreaterThan(0)
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