import React from 'react'
import { fireEvent, prettyDOM, screen, waitFor, waitForElementToBeRemoved, getAllByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../util/testUtil'

import PostEditorPage from '../PostEditorPage'
import { mockData, mockContext } from '../../../__mocks__/mockData'
import { initialPostState } from "../../../backend/models/post"
import { tags } from '../../../backend/models/tags'
import * as api from '../../../backend/api'



describe('When no AWS user is logged in, PostEditorPage renders', () => {

    beforeEach(() => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.error)
    })

    afterEach(() => {
        api.elasticSearchCurrentUsersPosts.mockClear()
    })

    it('and shows notification but does not show form', async () => {
        renderWithProviders(
            <PostEditorPage />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.initialValues
        )
        /*
         * Users posts are not even tried to fetch
         */
        await waitFor(() => {
            expect(api.elasticSearchCurrentUsersPosts).toHaveBeenCalledTimes(0)
        })

        /*
         * Shows warning
         */
        expect(screen.getByText(/You must be logged in as admin/i)).toBeInTheDocument()
        /*
         * Does not show post edit form
         */
        expect(screen.queryByTestId('post-editor-form-container')).not.toBeInTheDocument()
    })
})

describe('When AWS user is logged in, PostEditorPage renders', () => {

    beforeEach(() => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.success)
        api.createPost.mockResolvedValue(mockData.post.createPost.initialStateSuccess)
    })

    afterEach(() => {
        api.elasticSearchCurrentUsersPosts.mockClear()
        api.createPost.mockClear()
    })

    it('and post edit form allows editing and saving of new post', async () => {
        renderWithProviders(
            <PostEditorPage />,
            mockContext.context.initialValues,
            mockContext.awsCognitoUserContext.awsCognitoUser,
        )
        /*
         * Shows post editor form
         */
        expect(screen.getByTestId('post-editor-form-container')).toBeInTheDocument()
        /*
         * Shows previews
         */
        expect(screen.getByTestId('post-editor-preview-container')).toBeInTheDocument()

        /*
         * Shows and removes users posts loading message when loaded
         */
        await waitForElementToBeRemoved(() => screen.getByText(/loading your posts/i))
        /*
         * Post select shows existing drafts and posts
         */
        await waitFor(() => {
            expect(screen.queryByText(/loading your posts/i)).not.toBeInTheDocument()
        })
        expect(screen.getByText(/your posts/i)).toBeInTheDocument()
        expect(screen.getByText(/your drafts/i)).toBeInTheDocument()

        /*
         * Call save first time with initial data
         */
        userEvent.click(screen.getByRole('button', {name: /save/i}))
        await waitFor(() => {
            expect(api.createPost).toHaveBeenCalledWith({...initialPostState, mapID: "1"})
        })

        /*
         * Do some edits and save again
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
        const tag1 = screen.getByRole('checkbox', {name: /aim/i})
        const tag2 = screen.getByRole('checkbox', {name: /settings/i})
        userEvent.click(tag1)
        userEvent.click(tag2)

        // Check that changes were reflected to preview (teaser and full post)
        const preview = screen.getByTestId('post-editor-preview-container')
        expect(screen.getAllByRole('heading', {name: edits.title}).length).toBe(2)
        expect(getAllByText(preview, selectedMap.canonicalName).length).toBe(2)
        expect(tag1.checked).toBe(true)
        expect(tag2.checked).toBe(true)
        expect(getAllByText(preview, /aim/i).length).toBe(2)
        expect(getAllByText(preview, /settings/i).length).toBe(2)
    })
})

//         const yourPostsSelect = screen.getByLabelText(/your posts/i)
//         const yourDraftsSelect = screen.getByLabelText(/your drafts/i)
//         console.log(prettyDOM(yourPostsSelect))
//         console.log(prettyDOM(yourDraftsSelect))
//
//         const yourPostsDiv = screen.getByText(/your posts/i).closest("div")
//         const yourDraftsDiv = screen.getByText(/your drafts/i).closest("div")
//         console.log(prettyDOM(yourPostsDiv))
//         console.log(prettyDOM(yourDraftsDiv))
//
//         fireEvent.click(yourPostsDiv)