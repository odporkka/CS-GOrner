import * as chicken from '../../util/postFetchingChicken'
import * as api from '../../backend/api'
import { mockData } from "../../__mocks__/mockData"

describe('Test fetchCurrentUsersPosts', () => {
    afterEach(() => {
        api.elasticSearchCurrentUsersPosts.mockClear()
    })

    test("Returns users posts if api returns items", async () => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.success)

        const response = await chicken.fetchCurrentUsersPosts()
        expect(response).toEqual(mockData.post.elasticSearchCurrentUsersPosts.success.items)
    })

    test("Returns empty array if api returns no items", async () => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.empty)

        const response = await chicken.fetchCurrentUsersPosts()
        expect(response).toEqual([])
    })

    test("Returns empty array if api returns error", async () => {
        api.elasticSearchCurrentUsersPosts.mockResolvedValue(mockData.post.elasticSearchCurrentUsersPosts.error)

        const response = await chicken.fetchCurrentUsersPosts()
        expect(response).toEqual([])
    })
})


describe('Test fetch', () => {
    let searchCriteria
    beforeEach(() => {
        searchCriteria = {
            maps: [],
            tags: [],
            author: undefined
        }
    })

    afterEach(() => {
        api.elasticSearchPosts.mockClear()
    })

    test("Returns items and total if api returns them", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)

        const response = await chicken.fetch(searchCriteria)
        expect(response).toEqual(mockData.post.elasticSearchPosts.success)
    })

    test("Returns empty array and total 0 if api returns empty items", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.empty)

        const response = await chicken.fetch(searchCriteria)
        expect(response).toEqual(mockData.post.elasticSearchPosts.empty)
    })

    test("Returns empty array, total 0 and error info if api returns error", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.error)

        const response = await chicken.fetch(searchCriteria)
        expect(response).toEqual({...mockData.post.elasticSearchPosts.error, items: [], total: 0})
    })

    test("Api is called with right filter if initial searchCriteria is given", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        await chicken.fetch(searchCriteria)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: false}}
            ]
        })
    })

    test("Api is called with right filter if author is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        searchCriteria.author = 'author'
        await chicken.fetch(searchCriteria)
        await expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        await expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: false}},
                { authorID: {eq: 'author'}}
            ]
        })
    })

    test("Api is called with right filter if maps are given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        searchCriteria.maps = [{id: 'mapID1'}, {id: 'mapID2'}, {id: 'mapID3'}]
        await chicken.fetch(searchCriteria)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: false}},
                { or: [
                    { mapID: {eq: 'mapID1'}},
                    { mapID: {eq: 'mapID2'}},
                    { mapID: {eq: 'mapID3'}},
                ]}
            ]
        })
    })

    test("Api is called with right filter if tags are given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        searchCriteria.tags = ['TAG1', 'TAG2', 'TAG3']
        await chicken.fetch(searchCriteria)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: false}},
                { or: [
                        { tags: {matchPhrase: 'TAG1;'}},
                        { tags: {matchPhrase: 'TAG2;'}},
                        { tags: {matchPhrase: 'TAG3;'}},
                ]}
            ]
        })
    })

    test("Api is called with right filter if published is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        searchCriteria.published = false
        await chicken.fetch(searchCriteria)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: false}},
                { deprecated: {eq: false}},
            ]
        })
    })

    test("Api is called with right filter if deprecated is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        searchCriteria.deprecated = true
        await chicken.fetch(searchCriteria)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: true}},
            ]
        })
    })

    test("Api is called with right filter if EVERYTHING is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        searchCriteria.published = false
        searchCriteria.deprecated = true
        searchCriteria.author = 'author'
        searchCriteria.maps = [{id: 'mapID1'}, {id: 'mapID2'}, {id: 'mapID3'}]
        searchCriteria.tags = ['TAG1', 'TAG2', 'TAG3']
        await chicken.fetch(searchCriteria)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: false}},
                { deprecated: {eq: true}},
                { authorID: {eq: 'author'}},
                { or: [
                        { mapID: {eq: 'mapID1'}},
                        { mapID: {eq: 'mapID2'}},
                        { mapID: {eq: 'mapID3'}},
                ]},
                { or: [
                    { tags: {matchPhrase: 'TAG1;'}},
                    { tags: {matchPhrase: 'TAG2;'}},
                    { tags: {matchPhrase: 'TAG3;'}},
                ]}
            ]
        })
    })
})