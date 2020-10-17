/*
 * Post fetch functionality.
 */

// Own classes/components
import * as api from "../backend/api"

/**
 * Fetch posts based on given search criteria
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

    // Set tags if defined
    // if (searchCriteria.tags && Array.isArray(searchCriteria.tags)) {
    //     filter = buildTagFilter(filter, searchCriteria.tags)
    // }

    console.log('Chicken made a filter: ', filter)

    const response = await api.elasticSearch(filter)
    if (!response.total) {
        response.total = 0
    }
    console.log('Chicken got response from backend: ', response)

    return response
}

/**
 * Fetch only ids and titles
 *
 * @param author
 * @return {Promise<*[]|*>}
 */
export const fetchDraftTitlesAndIds = async (author=undefined) =>{
    console.log('Chicken is fetching drafts!')

    const filter = { published: { eq: false }}

    const response = await api.elasticSearchIdsAndTitles(filter)
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
 * Add tag filter to filter if one or more tags are present.
 *
 * @param filter
 * @param tags
 * @return {*}
 */
const buildTagFilter = (filter, tags) => {
    const tagList = []
    while (tags.length > 0) {
        const tag = tags.shift()
        tagList.push({ tag: {eq: tag}})
    }
    if (tagList.length > 0) {
        filter = {...filter, or: tagList}
    }
    return filter
}