/*
 * Post fetch functionality.
 */

// Own classes/components
import * as api from "../backend/api"

/**
 * Fetch posts based on given search criteria
 * TODO: Adjust so that only description is fetched? Do full post fetch only when fetching with single post id?
 *
 * @param searchCriteria
 * @return {Promise<{errorMessage: *, error: boolean}|{errorMessage: string, error: boolean}|undefined>}
 */
export const fetch = async (searchCriteria) => {
    console.log('Chicken is parsing search criteria:', searchCriteria)

    let filter = {}
    // Set published if defined, default to true
    searchCriteria.published ?
        filter.published = { eq: searchCriteria.published } : filter.published = { eq: true }

    // Set deprecated if defined, default to false
    searchCriteria.deprecated ?
        filter.deprecated = { eq: searchCriteria.deprecated } : filter.deprecated = { eq: false }

    // Set maps if defined
    if (searchCriteria.maps && Array.isArray(searchCriteria.maps)) {
        filter = buildMapFilter(filter, searchCriteria.maps)
    }

    console.log('Chicken made a filter: ', filter)

    let response = await api.elasticSearch(filter)
    if (!response.total) {
        response.total = 0
    }
    console.log('Chicken got response from backend: ', response)

    // Have to do filtering here since elastic search doesn't allow operations on array field
    if (searchCriteria.tags && Array.isArray(searchCriteria.tags)) {
        response = filterByTags(response, searchCriteria.tags)
    }

    return response
}

/**
 * Fetch only ids and titles
 *
 * @return {Promise<*[]|*>}
 */
export const fetchCurrentUsersPosts = async () =>{
    console.log('Chicken is fetching your posts!')

    const response = await api.elasticSearchCurrentUsersPosts()
    console.log('Chicken got response from backend: ', response)

    if (!response.items || response.error) {
        return []
    }

    return response.items
}

/**
 * Add mapID filter to filter if one or more maps are present.
 *
 * @param filter
 * @param maps
 * @return {*}
 */
const buildMapFilter = (filter, maps) => {
    const mapList = []
    while (maps.length > 0) {
        const map = maps.shift()
        if (map.id) mapList.push({ mapID: {eq: map.id}})
    }
    if (mapList.length > 0) {
        filter = {...filter, or: mapList}
    }
    return filter
}

/**
 * Pick only posts where tags have any of tags in search criteria
 *
 * @param response
 * @param tags
 * @return {*}
 */
const filterByTags = (response, tags) => {
    console.log('TODO: filter response by tags', tags)
    return response
}