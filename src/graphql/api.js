import { API, graphqlOperation } from "aws-amplify"
import * as queries from "./queries"
import * as mutations from "./mutations"

/*
 * Queries
 */
export const fetchMaps = async () => {
    try {
        const response = await API.graphql(graphqlOperation(queries.listMaps))
        return response.data.listMaps.items
    } catch (e) {
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
}

export const fetch10NewPosts = async () => {
    try {
        const response = await API.graphql(graphqlOperation(queries.listPosts))
        return response.data.listPosts.items
    } catch (e) {
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
}

/*
 * Mutations
 */
export const createPost = async (data) => {
    try {
        const response = await API.graphql(graphqlOperation(mutations.createPost, { input: data }))
        return response
    } catch (e) {
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
}
