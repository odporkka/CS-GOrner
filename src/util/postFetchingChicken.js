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

    // Top level conditions are combined with AND
    let filter = { and: []}

    // Set published if defined, default to true
    filter.and.push({
        published: { eq: searchCriteria.hasOwnProperty('published') ? searchCriteria.published : true }
    })

    // Set deprecated if defined, default to false
    filter.and.push({
        deprecated: { eq: searchCriteria.hasOwnProperty('deprecated') ? searchCriteria.deprecated : false }
    })

    // Set author if present
    if (searchCriteria.author) filter.and.push({authorID: { eq: searchCriteria.author }})

    // Set maps if defined
    if (searchCriteria.maps && Array.isArray(searchCriteria.maps)) {
        filter = buildMapFilter(filter, searchCriteria.maps)
    }

    // Set tags if defined
    if (searchCriteria.tags && Array.isArray(searchCriteria.tags)) {
        filter = buildTagFilter(filter, searchCriteria.tags)
    }

    console.log('Chicken made a filter: ', filter)

    let response = await api.elasticSearchPosts(filter)
    if (!response.total) {
        response.total = 0
    }
    console.log('Chicken got response from backend: ', response)

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
    maps.forEach(map => {
        if (map.id) mapList.push({ mapID: {eq: map.id}})
    })
    if (mapList.length > 0) {
        filter.and.push({ or: mapList })
    }
    return filter
}

/**
 * Filter by chosen tags
 *
 * @param filter
 * @param tags
 * @return {*}
 */
const buildTagFilter = (filter, tags) => {
    const tagList = []
    tags.forEach(tag => {
        // Tags are stored as ; separated string.
        tagList.push({ tags: { matchPhrase: `${tag};` }})
    })
    if (tagList.length > 0) {
        filter.and.push({ or: tagList })
    }
    return filter
}