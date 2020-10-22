import { API, Auth, graphqlOperation } from 'aws-amplify'

import { validatePostObject, stripExtraProperties } from './models/post'
import * as queries from './queries'
import * as mutations from './mutations'


const userNotFound = 'Current user not found!'
const userSudError = 'Could not resolve current users sud!'
const authorCouldNotBeCreatedError = 'Could not create author for sud!'


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

export const elasticSearchCurrentUsersPosts =  async () => {
    const currentUserID = await getUserSud()
    if (!currentUserID) return handleError({message: userSudError})

    try {
        const response = await API.graphql(graphqlOperation(queries.searchPostTitlesAndIds, {
            filter: { authorID: {eq: currentUserID}},
            sort: {
                field: 'title',
                direction: 'asc'
            },
        }))
        return response.data.searchPosts
    } catch (e) {
        return handleError(e)
    }
}

export const fetchAuthorWithSud = async (sud) => {
    try {
        const response = await API.graphql(graphqlOperation(queries.getAuthor,
            { cognitoUserSud: sud }))
        return response.data.getAuthor
    } catch (e) {
        return handleError(e)
    }
}

export const fetchAuthorsList = async () => {
    try {
        const response = await API.graphql(graphqlOperation(queries.listAuthors))
        return response.data.listAuthors.items
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
        // Set authorID if not present
        // (Can be present i.e. if validation failed but author was already created)
        if (!data.authorID) {
            const currentUser = await Auth.currentUserInfo()
            const sud = await getUserSud(currentUser)
            if (!sud || sud.error) {
                return handleError({ message: userSudError})
            }

            // Check if author object is made
            let author = await fetchAuthorWithSud(sud)
            if (!author || author.error) {
                console.log(`Author is not yet made for sud ${sud}!`)
                author = await createAuthor(currentUser, sud)
                if (author.error) return handleError({ message: authorCouldNotBeCreatedError})
            } else {
                console.log(`Author ${author.username} found for sud ${sud}!`)
            }
            data.authorID = sud
        }
        const validatedPost = stripAndValidatePost(data)
        if (validatedPost.error) return validatedPost

        console.log('Saving post object: ', validatedPost)
        const response = await API.graphql({
            query: mutations.createPost,
            variables: {input: validatedPost},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        return response.data.createPost
    } catch (e) {
        return handleError(e)
    }
}

export const updatePost = async (data) => {
    const validatedPost = stripAndValidatePost(data)
    if (validatedPost.error) return validatedPost

    try {
        const response =  await API.graphql({
            query: mutations.updatePost,
            variables: {input: validatedPost},
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

export const createAuthor = async (currentUser, sud) => {
    if (!currentUser) return handleError({ message: userNotFound})
    const input = {
        cognitoUserSud: sud,
        username: currentUser.username
    }
    try {
        const response = await API.graphql({
            query: mutations.createAuthor,
            variables: {input: input},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        return response.data.createAuthor
    } catch (e) {
        return handleError(e)
    }
}


/*
 * Private functions
 */
const getUserSud = async (currentUser=undefined) => {
    // Fetch current user info if not given
    if (!currentUser) currentUser = await Auth.currentUserInfo()
    // Parse sub
    const ownerSub = currentUser?.attributes?.sub
    if (!ownerSub) handleError({ message: userSudError})
    return ownerSub
}

const stripAndValidatePost = (data) => {
    console.log('Stripping and validating post..')
    data = stripExtraProperties(data)
    const validation = validatePostObject(data)
    if (validation.error) return handleError(validation)
    return data
}
