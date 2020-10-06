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
        return { error: true, errorMessage: e.message}
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

export const fetch10NewPosts = async () => {
    try {
        const response = await API.graphql(graphqlOperation(queries.listPosts))
        return response.data.listPosts.items
    } catch (e) {
        return handleError(e)
    }
}

/*
 * Mutations
 */
export const createPost = async (data) => {
    try {
        return await API.graphql(graphqlOperation(mutations.createPost, {input: data}))
    } catch (e) {
        return handleError(e)
    }
}

export const updatePost = async (data) => {
    try {
        return await API.graphql(graphqlOperation(mutations.updatePost, { input: data }))
    } catch (e) {
        return handleError(e)
    }
}
