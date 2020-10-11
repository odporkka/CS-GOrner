import { API, graphqlOperation } from "aws-amplify"

import * as queries from "./queries"
import * as mutations from "./mutations"

/**
 * Gathers graphql errors to one message if found.
 *
 * @param e
 * @return {{errorMessage: *, error: boolean}|{errorMessage: string, error: boolean}}
 */
const handleError = (e) => {
    if (e.errors) {
        let errorMessage = ''
        e.errors.forEach((error) => {
            errorMessage += error.message + '\n'
        })
        return { error: true, errorMessage: errorMessage}
    } else {
        return { error: true,
            errorMessage: e.message ? e.message : e}
    }
}

/*
 * Queries
 */
export const fetchMaps = async () => {
    try {
        const response = await API.graphql(graphqlOperation(queries.listMaps))
        return response.data.listMaps.items
    } catch (e) {
        return handleError(e)
    }
}

export const fetchPostWithId = async (id) => {
    try {
        const response = await API.graphql(graphqlOperation(queries.getPost, {id: id}))
        return response.data.getPost
    } catch (e) {
        return handleError(e)
    }
}

export const fetch10NewestPosts = async () => {
    try {
        const response = await API.graphql(graphqlOperation(queries.searchPosts, {
            filter: { published: { eq: true }},
            sort: {
                field: 'publishDate',
                direction: 'desc'
            },
            limit: 10
        }))
        return response.data.searchPosts.items
    } catch (e) {
        return handleError(e)
    }
}

export const elasticSearch = async (filter, nextToken=undefined) => {
    try {
        const response = await API.graphql(graphqlOperation(queries.searchPosts, {
            filter: filter,
            sort: {
                field: 'publishDate',
                direction: 'desc'
            },
            limit: 10,
            nextToken: nextToken
        }))
        return response.data.searchPosts
    } catch (e) {
        return handleError(e)
    }
}

export const elasticSearchIdsAndTitles =  async (filter) => {
    try {
        const response = await API.graphql(graphqlOperation(queries.searchPostTitlesAndIds, {
            filter: filter,
            sort: {
                field: 'title',
                direction: 'desc'
            },
        }))
        return response.data.searchPosts
    } catch (e) {
        return handleError(e)
    }
}

/*
 * Mutations
 * Use authMode: 'AMAZON_COGNITO_USER_POOLS' here to only allow authenticated users to modify content.
 */
export const createPost = async (data) => {
    try {
        const response = await API.graphql({
            query: mutations.createPost,
            variables: {input: data},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        return response.data.createPost
    } catch (e) {
        return handleError(e)
    }
}

export const updatePost = async (data) => {
    try {
        const response =  await API.graphql({
            query: mutations.updatePost,
            variables: {input: data},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        return response.data.updatePost
    } catch (e) {
        return handleError(e)
    }
}

export const deletePostById = async (id) => {
    try {
        const response = await API.graphql({
            query: mutations.deletePost,
            variables: {input: {id: id}},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        return response.data.deletePost
    } catch (e) {
        return handleError(e)
    }
}
