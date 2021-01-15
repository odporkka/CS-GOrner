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
 * @param limit
 * @param prevResults
 * @return search results or error
 */
export const fetch = async (searchCriteria, limit, prevResults=null) => {
    console.log('prev results:', prevResults)
    let filter = prevResults ? prevResults.apiFilter : undefined
    let postCount = prevResults ? prevResults.postCount : undefined

    // If its initial search, build filter and fetch total count
    if (!prevResults) {
        filter = buildFilter(searchCriteria)
        const response = await api.elasticSearchPostsCount(filter)
        // TODO: better handling
        if (response.error) {
            console.log('API error, make this better', response)
            return
        }
        postCount = response
    }

    let result = {}

    let response = await api.elasticSearchPosts(filter, limit)
    if (response.error) {
        console.log(response)
        return
    }

    result.allItems = []
    result.postCount = postCount
    result.postsFetched = result.postsFetched + (response.items ? response.items.length : 0)
    result.items = response.items ? response.items : []
    result.nextToken = response.nextToken
    result.apiFilter = filter

    return result
}

/**
 * Fetch only ids and titles
 *
 * @return {Promise<*[]|*>}
 */
export const fetchCurrentUsersPosts = async () =>{
    const response = await api.elasticSearchCurrentUsersPosts()
    if (!response || !response.items || response.error) {
        return []
    }
    return response.items
}

const buildFilter = (searchCriteria) => {
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
    return filter
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