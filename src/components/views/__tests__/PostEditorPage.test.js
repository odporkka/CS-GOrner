import React from 'react'
import { Route } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import {
    screen,
    findByRole,
    getAllByText,
    getAllByRole,
    queryAllByText,
    queryByText,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import ReactTestUtils from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../util/testUtil'

import PostEditorPage from '../PostEditorPage'
import { mockData, mockContext } from '../../../__mocks__/mockData'
import { initialPostState } from '../../../backend/models/post'
import { tags } from '../../../backend/models/tags'
import * as api from '../../../backend/api'


describe('When no AWS user is logged in PostEditorPage renders', () => {

    beforeEach(() => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.error)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('and shows notification but does not show form', async () => {
        renderWithProviders(
            <PostEditorPage />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.initialValues
        )
        // Users posts are not even tried to fetch
        await waitFor(() => {
            expect(api.elasticSearchCurrentUsersPosts).toHaveBeenCalledTimes(0)
        })
        //Shows warning
        expect(screen.getByText(/You must be logged in as admin/i)).toBeInTheDocument()
        //Does not show post edit form
        expect(screen.queryByTestId('post-editor-form-container')).not.toBeInTheDocument()
    })
})


describe('When AWS user is logged in, PostEditorPage renders', () => {

    beforeEach(() => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.success)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('and fetches users posts and shows an empty form', async () => {
        renderWithProviders(
            <PostEditorPage />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
        )
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))
        // Empty form and users post select is rendered
         checkFormIsRendered()
    })

    it('and renders empty form if id is given but post is not found', async () => {
        // fetchPostWithId returns null if not found
        api.fetchPostWithId.mockResolvedValue(null)
        renderWithProviders(
            <Route path="/post-editor" component={PostEditorPage} />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
            '/post-editor/?id=notFound'
        )
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))
        await waitFor(() => {
            expect(api.fetchPostWithId).toHaveBeenCalledTimes(1)
        })
        // Empty form and users post select is rendered
        checkFormIsRendered()
    })

    it('and allows read/update/delete of existing post', async () => {
        api.fetchPostWithId.mockResolvedValue(mockData.post.fetchPostWithId["5"])
        renderWithProviders(
            <Route path="/post-editor" component={PostEditorPage} />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
            '/post-editor/?id=5'
        )
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))
        await waitFor(() => {
            expect(api.fetchPostWithId).toHaveBeenCalledTimes(1)
        })
        const form = screen.getByTestId('post-editor-form-container')
        const preview = screen.getByTestId('post-editor-preview-container')

        //Existing post is loaded on form
        expect(queryAllByText(form, /Editor2's Draft 1/i).length).toBeGreaterThan(0)

        /*
         * Editing works
         */
        const selectedMap = mockContext.context.initialValues.maps[mockContext.context.initialValues.maps.length -1]
        const edits = {
            title: 'Git gud',
            mapID: selectedMap.id,
            map: selectedMap,
            tags: [tags.UTILITY, tags.ECONOMY]
        }
        userEvent.type(screen.getByLabelText(/title/i), `{selectall}{del}${edits.title}`).then()
        userEvent.selectOptions(screen.getByLabelText(/map/i), edits.mapID)
        const tag1 = screen.getByRole('checkbox', { name: /utility/i })
        const tag2 = screen.getByRole('checkbox', { name: /economy/i })
        userEvent.click(tag1)
        userEvent.click(tag2)
        // Check that changes were reflected to preview (teaser and full post)
        expect(screen.getAllByRole('heading', { name: edits.title }).length).toBe(2)
        expect(getAllByText(preview, selectedMap.canonicalName).length).toBe(2)
        expect(tag1.checked).toBe(true)
        expect(tag2.checked).toBe(true)
        expect(getAllByText(preview, /utility/i).length).toBe(2)
        expect(getAllByText(preview, /economy/i).length).toBe(2)

        /*
         * Save works
         */
        api.updatePost.mockResolvedValue({...mockData.post.fetchPostWithId["5"], ...edits})
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith({
                ...mockData.post.fetchPostWithId["5"],
                ...edits,
            })
        })

        /*
         * Delete works
         */
        api.deletePostById.mockResolvedValue(mockData.post.deletePostWithId["5"])
        const userDraftsOptionsBefore = getAllByRole(screen.getByLabelText(/your drafts/i), 'option').length
        userEvent.click(screen.getByRole('button', { name: /delete/i }))
        await waitFor(() => {
            expect(api.deletePostById).toHaveBeenCalledWith("5")
        })
        // Form is cleared
        expect(screen.queryByText( /Editor2's draft 1/i)).not.toBeInTheDocument()
        // Option is removed from drafts
        const userDraftsOptionsAfter = getAllByRole(screen.getByLabelText(/your drafts/i), 'option').length
        expect(userDraftsOptionsAfter).toBe(userDraftsOptionsBefore - 1)
    })

    it('and allows create/update/delete of new post', async () => {
        renderWithProviders(
            <Route path="/post-editor" component={PostEditorPage} />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
            '/post-editor'
        )
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))

        /*
         * Create with initial post state works
         */
        api.createPost.mockResolvedValue(mockData.post.createPost.initialStateSuccess)
        api.fetchPostWithId.mockResolvedValue({...mockData.post.createPost.initialStateSuccess})
        let userDraftsOptionsBefore = getAllByRole(screen.getByLabelText(/your drafts/i), 'option').length
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            // ID 1 should resolve to map "general"
            expect(api.createPost).toHaveBeenCalledWith({ ...initialPostState, mapID: "1" })
        })
        // Option is added to drafts
        let userDraftsOptionsAfter = getAllByRole(screen.getByLabelText(/your drafts/i), 'option').length
        expect(userDraftsOptionsAfter).toBe(userDraftsOptionsBefore + 1)

        /*
         * Editing works
         */
        const selectedMap = mockContext.context.initialValues.maps[mockContext.context.initialValues.maps.length -1]
        const edits = {
            title: 'Test-title',
            mapID: selectedMap.id,
            map: selectedMap,
            tags: [tags.AIM, tags.SETTINGS]
        }
        userEvent.type(screen.getByLabelText(/title/i), `{selectall}{del}${edits.title}`).then()
        userEvent.selectOptions(screen.getByLabelText(/map/i), edits.mapID)
        const tag1 = screen.getByRole('checkbox', { name: /aim/i })
        const tag2 = screen.getByRole('checkbox', { name: /settings/i })
        userEvent.click(tag1)
        userEvent.click(tag2)
        // Check that changes were reflected to preview (teaser and full post)
        const preview = screen.getByTestId('post-editor-preview-container')
        expect(screen.getAllByRole('heading', { name: edits.title }).length).toBe(2)
        expect(getAllByText(preview, selectedMap.canonicalName).length).toBe(2)
        expect(tag1.checked).toBe(true)
        expect(tag2.checked).toBe(true)
        expect(getAllByText(preview, /aim/i).length).toBe(2)
        expect(getAllByText(preview, /settings/i).length).toBe(2)

        /*
         * Save works
         */
        api.updatePost.mockResolvedValue({...mockData.post.createPost.initialStateSuccess, ...edits})
        api.fetchPostWithId.mockResolvedValue({...mockData.post.createPost.initialStateSuccess, ...edits})
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith({
                ...mockData.post.createPost.initialStateSuccess, ...edits
            })
        })

        /*
         * Delete works
         */
        api.deletePostById.mockResolvedValue({...mockData.post.createPost.initialStateSuccess, ...edits})
        userDraftsOptionsBefore = getAllByRole(screen.getByLabelText(/your drafts/i), 'option').length
        userEvent.click(screen.getByRole('button', { name: /delete/i }))
        await waitFor(() => {
            expect(api.deletePostById).toHaveBeenCalledWith("69")
        })
        // Form is cleared
        expect(screen.queryByText( /Test-titlei/)).not.toBeInTheDocument()
        // Option is removed from drafts
        userDraftsOptionsAfter = getAllByRole(screen.getByLabelText(/your drafts/i), 'option').length
        expect(userDraftsOptionsAfter).toBe(userDraftsOptionsBefore - 1)
    })

    it('and does not crash when saving even if api does not respond', async () => {
        renderWithProviders(
            <Route path="/post-editor" component={PostEditorPage} />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
            '/post-editor'
        )
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))

        /*
         * Crash when trying to create (first save)
         */
        api.createPost.mockResolvedValue(mockData.apiError)
        api.fetchPostWithId.mockResolvedValue(mockData.apiError)
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            expect(api.createPost).toHaveBeenCalledWith({ ...initialPostState, mapID: "1" })
        })
        checkFormIsRendered()

        /*
         * Create is successful but fetch after it crashes
         */
        api.createPost.mockResolvedValue(mockData.post.createPost.initialStateSuccess)
        api.fetchPostWithId.mockResolvedValue(mockData.apiError)
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            expect(api.createPost).toHaveBeenCalledWith({ ...initialPostState, mapID: "1" })
        })
        checkFormIsRendered()

        /*
         * Save is successful but fetch after it crashes
         */
        api.updatePost.mockResolvedValue(mockData.post.createPost.initialStateSuccess)
        api.fetchPostWithId.mockResolvedValue(mockData.apiError)
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith(mockData.post.createPost.initialStateSuccess)
        })
        checkFormIsRendered()

        /*
         * Save is fails
         */
        api.updatePost.mockResolvedValue(mockData.apiError)
        userEvent.click(screen.getByRole('button', { name: /save/i }))
        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith(mockData.post.createPost.initialStateSuccess)
        })
        checkFormIsRendered()
    })

    it('and allows upload and delete of images', async () => {
        renderWithProviders(
            <Route path="/post-editor" component={PostEditorPage} />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
            '/post-editor'
        )
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))

        const imageUpload = await screen.findByTestId('post-editor-image-upload')
        // Load file with file chooser
        const uploadComponent = screen.getByLabelText(/upload/i)
        const file = new File(['(⌐□_□)'], 'chikken.png', { type: 'image/png' })
        ReactTestUtils.Simulate.change(uploadComponent, { target: { files: [file] } })
        // Wait for upload button to appear, throws error if not found
        const uploadButton = await findByRole(imageUpload,'button', { name: /upload/i })

        // Click upload and wait for post save
        let expected = {
            ...initialPostState,
            mapID: '1',
            images: [{
                key: 'folder/chikken.png',
                url: 'https://bucket.s3-region.amazonaws.com/public/d3adb33f/chikken.png',
            }],
            s3id: 'd3adb33f'
        }
        const apiResponse = {
            ...mockData.post.createPost.initialStateSuccess,
            images: [{
                key: 'folder/chikken.png',
                url: 'https://bucket.s3-region.amazonaws.com/public/d3adb33f/chikken.png'
            }],
            s3id: 'd3adb33f'
        }
        api.createPost.mockResolvedValue(apiResponse)
        api.fetchPostWithId.mockResolvedValue(apiResponse)
        Storage.getPluggable = jest.fn()
        Storage.getPluggable.mockReturnValue(mockData.storage.config)
        Storage.put = jest.fn(mockData.s3.uploadSuccess)

        userEvent.click(uploadButton)

        await waitFor(() => {
            expect(Storage.put).toHaveBeenCalledTimes(1)
        })
        await waitFor(() => {
            expect(api.createPost).toHaveBeenCalledWith(expected)
        })
        await waitFor(() => {
            expect(api.fetchPostWithId).toHaveBeenCalledTimes(1)
        })
        await waitFor(() => {
            expect(queryByText(imageUpload, /chikken.png/i)).toBeInTheDocument()
        })


        // Test remove works
        expected = {
            ...mockData.post.createPost.initialStateSuccess,
            s3id: 'd3adb33f',
        }
        Storage.remove = jest.fn().mockReturnValue({ status: 204 })
        api.updatePost.mockResolvedValue(expected)

        const deleteButton = await findByRole(imageUpload,'button', { name: /delete/i })

        userEvent.click(deleteButton)

        await waitFor(() => {
            expect(Storage.remove).toHaveBeenCalledTimes(1)
        })
        await waitFor(() => {
            expect(api.updatePost).toHaveBeenCalledWith(expected)
        })
    })
})

const checkFormIsRendered = () => {
    expect(screen.queryByTestId('post-editor-form-container')).toBeInTheDocument()
    expect(screen.queryByTestId('post-editor-preview-container')).toBeInTheDocument()
    expect(screen.queryByText(/your posts/i)).toBeInTheDocument()
    expect(screen.queryByText(/your drafts/i)).toBeInTheDocument()
    expect(screen.queryByText(/new post/i)).toBeInTheDocument()
}
