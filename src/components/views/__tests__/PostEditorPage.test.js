import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import { renderWithProviders } from '../../../util/testUtil'

import PostEditorPage from '../PostEditorPage'
import { mockData } from '../../../__mocks__/mockData'
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
            mockData.context.initialValues,
            mockData.awsCognitoUserContext.initialValues
        )
        await waitFor(() => {
            expect(api.elasticSearchCurrentUsersPosts).toHaveBeenCalledTimes(1)
        })

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
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.success)
    })

    afterEach(() => {
        api.elasticSearchCurrentUsersPosts.mockClear()
    })

    it('and post edit form allows making new posts', async () => {
        renderWithProviders(
            <PostEditorPage />,
            mockData.context.initialValues,
            mockData.awsCognitoUserContext.awsCognitoUser,
        )
        /*
         * Shows post editor form
         */
        expect(screen.getByRole('heading', {name: /post editor/i})).toBeInTheDocument()
        /*
         * Shows loading on users posts
         */
        expect(screen.getByText(/loading your posts/i)).toBeInTheDocument()
        /*
         * Shows users posts select when loaded
         */
        await waitFor(() => {
            expect(screen.queryByText(/loading your posts/i)).not.toBeInTheDocument()
        })
        expect(screen.getByText(/your posts/i)).toBeInTheDocument()
        expect(screen.getByText(/your drafts/i)).toBeInTheDocument()
    })
})