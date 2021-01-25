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
        api.fetch5NewestPosts.mockClear()
        api.fetchAuthorsList.mockClear()
    })

    it('and "home" page / landing page works if content fetch works', async () => {
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch5NewestPosts.mockResolvedValue(mockData.post.fetch5NewestPosts)
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        // No aws login
        expect(screen.queryByAltText(/admin-icon/i)).not.toBeInTheDocument()
        // Logo is present
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        // Nav bar with hrefs set is present
        testNabBarPresent()
        // Welcome message is present
        expect(screen.getByText(/welcome to csgorner/i)).toBeInTheDocument()
        // New posts are shown
        expect(screen.getByText(/new posts/i)).toBeInTheDocument()
        expect(screen.getByText(/Admin's Post/i)).toBeInTheDocument()
        expect(screen.getByText(/Post description/i)).toBeInTheDocument()
        expect(screen.getByText(/Editor2's Post/i)).toBeInTheDocument()
        // Footer is present
        testFooterPresent()
    })

    it('and "home" page / landing page renders even if api returns error', async () => {
        api.fetchMaps.mockResolvedValue(mockData.apiError)
        api.fetchAuthorsList.mockResolvedValue(mockData.apiError)
        api.fetch5NewestPosts.mockResolvedValue(mockData.apiError)

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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.queryByAltText(/admin-icon/i)).not.toBeInTheDocument()
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/welcome to csgorner/i)).toBeInTheDocument()
        expect(screen.getByText(/copyright/i)).toBeInTheDocument()
        expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
    })

    it('and "tactics" page render if content fetch works', async () => {
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch5NewestPosts.mockResolvedValue(mockData.post.fetch5NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)
        // Tactics
        renderWithRouter(<App />, { route: '/tactics'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/tactics by map/i)).toBeInTheDocument()
        expect(screen.getByText(/advanced filtering/i)).toBeInTheDocument()
    })

    it('and "tactics" page render even if api returns error', async () => {
        api.fetchMaps.mockResolvedValue(mockData.apiError)
        api.fetchAuthorsList.mockResolvedValue(mockData.apiError)
        api.fetch5NewestPosts.mockResolvedValue(mockData.apiError)
        // Tactics
        renderWithRouter(<App />, { route: '/tactics'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/tactics by map/i)).toBeInTheDocument()
        expect(screen.getByText(/advanced filtering/i)).toBeInTheDocument()
    })

    it('and "forum" page render if content fetch works', async () => {
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch5NewestPosts.mockResolvedValue(mockData.post.fetch5NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)
        // Tactics
        renderWithRouter(<App />, { route: '/forum'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/build forum here/i)).toBeInTheDocument()
    })

    it('and "forum" page render even if api returns error', async () => {
        api.fetchMaps.mockResolvedValue(mockData.apiError)
        api.fetchAuthorsList.mockResolvedValue(mockData.apiError)
        api.fetch5NewestPosts.mockResolvedValue(mockData.apiError)
        // Tactics
        renderWithRouter(<App />, { route: '/forum'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/build forum here/i)).toBeInTheDocument()
    })

    it('and "authors" page render if content fetch works', async () => {
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch5NewestPosts.mockResolvedValue(mockData.post.fetch5NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)
        // Tactics
        renderWithRouter(<App />, { route: '/authors'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/Administrator/i)).toBeInTheDocument()
        expect(screen.getByText(/Editor2/i)).toBeInTheDocument()
        expect(screen.getByText(/Editor3/i)).toBeInTheDocument()
    })

    it('and "authors" page render even if api returns error', async () => {
        api.fetchMaps.mockResolvedValue(mockData.apiError)
        api.fetchAuthorsList.mockResolvedValue(mockData.apiError)
        api.fetch5NewestPosts.mockResolvedValue(mockData.apiError)
        // Tactics
        renderWithRouter(<App />, { route: '/authors'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/Posts/i)).toBeInTheDocument()
    })

    it('and "about" page render if content fetch works', async () => {
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch5NewestPosts.mockResolvedValue(mockData.post.fetch5NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)
        // Tactics
        renderWithRouter(<App />, { route: '/about'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/Who am I/i)).toBeInTheDocument()
        expect(screen.getByText(/Why I made this website/i)).toBeInTheDocument()
        expect(screen.getByText(/What's up with that stupid name/i)).toBeInTheDocument()
    })

    it('and "about" page render even if api returns error', async () => {
        api.fetchMaps.mockResolvedValue(mockData.apiError)
        api.fetchAuthorsList.mockResolvedValue(mockData.apiError)
        api.fetch5NewestPosts.mockResolvedValue(mockData.apiError)
        // Tactics
        renderWithRouter(<App />, { route: '/about'})
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
        })
        expect(screen.getByAltText(/csgorner logo/i)).toBeInTheDocument()
        testNabBarPresent()
        testFooterPresent()
        expect(screen.getByText(/Who am I/i)).toBeInTheDocument()
        expect(screen.getByText(/Why I made this website/i)).toBeInTheDocument()
        expect(screen.getByText(/What's up with that stupid name/i)).toBeInTheDocument()
    })

})

describe('When AWS user is logged in the app renders', () => {

    beforeEach(() => {
        Auth.currentAuthenticatedUser = jest.fn(mockData.amplifyAuth.currentAuthenticatedUserResolve)
        api.fetchMaps.mockResolvedValue(mockData.map.fetchMaps)
        api.fetch5NewestPosts.mockResolvedValue(mockData.post.fetch5NewestPosts)
        api.fetchAuthorsList.mockResolvedValue(mockData.author.fetchAuthorsList)
    })

    afterEach(() => {
        Auth.currentAuthenticatedUser.mockClear()
        api.fetchMaps.mockClear()
        api.fetch5NewestPosts.mockClear()
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
            expect(api.fetch5NewestPosts).toHaveBeenCalledTimes(1)
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
        const tabs = ['/', '/tactics', '/forum', '/authors', '/about']
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

const testNabBarPresent = () => {
    const tabs = ['/', '/tactics', '/forum', '/authors', '/about']
    const nav = screen.getAllByRole('tab')
    expect(nav.length).toBe(tabs.length)
    nav.forEach((tab) => {
        expect(tabs.includes(tab.getAttribute('href'))).toBe(true)
    })
}

const testFooterPresent = () => {
    expect(screen.getByText(/copyright/i)).toBeInTheDocument()
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
}