/*
 * Post fetch functionality.
 */

// Own classes/components
import * as api from "../backend/api"

export const fetch = async (searchCriteria) => {
    console.log('Chicken is parsing search criteria:', searchCriteria)

    let filter
    if (searchCriteria.map && searchCriteria.map.id) {
        filter = { published: { eq: true }, mapID: {eq: searchCriteria.map.id}}
    }
    console.log('Chicken made a filter: ', filter)

    const response = await api.elasticSearch(filter)
    if (!response.total) {
        response.total = 0
    }
    console.log('Chicken got response from backend: ', response)

    return response
}