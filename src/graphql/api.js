import { API, graphqlOperation } from "aws-amplify"
import * as queries from "./queries"
import * as mutations from "./mutations"

export const fetchMaps = async () => {
    try {
        const mapsData = await API.graphql(graphqlOperation(queries.listMaps))
        return mapsData.data.listMaps.items
    } catch (err) {
        console.log('Error fetching maps')
        return null
    }
}

export const createPost = async (data) => {
    try {
        console.log(data)
        const newPost = await API.graphql(graphqlOperation(mutations.createPost, { input: data }))
        return newPost
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