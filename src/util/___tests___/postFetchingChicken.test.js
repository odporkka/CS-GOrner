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


describe('Calls fetch with no previous results', () => {
    let searchCriteria
    beforeEach(() => {
        searchCriteria = {
            maps: [],
            tags: [],
            author: undefined
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("and returns items and total if api returns them", async () => {
        api.elasticSearchPostsCount.mockResolvedValue(mockData.post.elasticSearchPosts.success.items.length)
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)

        const response = await chicken.fetch(searchCriteria, 5)

        const expected = {
            ...mockData.post.elasticSearchPosts.success,
            postCount: mockData.post.elasticSearchPosts.success.items.length,
            allItems: mockData.post.elasticSearchPosts.success.items,
            page: 1,
            nextToken: undefined,
            apiFilter: {
                and: [
                    { published: { eq: true}},
                    { deprecated: { eq: false}}
                ]
            }
        }
        expect(response).toEqual(expected)
    })

    test("and returns empty array and total 0 if api returns empty items", async () => {
        api.elasticSearchPostsCount.mockResolvedValue(0)
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.empty)

        const response = await chicken.fetch(searchCriteria)
        const expected = {
            ...mockData.post.elasticSearchPosts.empty,
            postCount: 0,
            allItems: [],
            page: 1,
            nextToken: undefined,
            apiFilter: {
                and: [
                    { published: { eq: true}},
                    { deprecated: { eq: false}}
                ]
            }
        }
        expect(response).toEqual(expected)
    })

    test("and returns error if api returns error", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.error)
        api.elasticSearchPostsCount.mockResolvedValue(mockData.post.elasticSearchPosts.error)

        const response = await chicken.fetch(searchCriteria)

        expect(response).toEqual(mockData.post.elasticSearchPosts.error)
    })

    test("and api is called with right filter if initial searchCriteria is given", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(999)
        await chicken.fetch(searchCriteria, 5)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: false}}
            ]
        })
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [{ published: {eq: true}}, { deprecated: {eq: false}}]
        }, 5, undefined)
    })

    test("and api is called with right filter if author is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(999)
        searchCriteria.author = 'author'
        await chicken.fetch(searchCriteria, 5)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: false}},
                { authorID: {eq: 'author'}}
            ]
        }, 5, undefined)
    })

    test("Api is called with right filter if maps are given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(999)
        searchCriteria.maps = [{id: 'mapID1'}, {id: 'mapID2'}, {id: 'mapID3'}]
        await chicken.fetch(searchCriteria, 10)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
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
        }, 10, undefined)
    })

    test("Api is called with right filter if tags are given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(999)
        searchCriteria.tags = ['TAG1', 'TAG2', 'TAG3']
        await chicken.fetch(searchCriteria, 10)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
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
        }, 10, undefined)
    })

    test("Api is called with right filter if published is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(999)
        searchCriteria.published = false
        await chicken.fetch(searchCriteria, 69)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: false}},
                { deprecated: {eq: false}},
            ]
        }, 69, undefined)
    })

    test("Api is called with right filter if deprecated is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(999)
        searchCriteria.deprecated = true
        await chicken.fetch(searchCriteria, 69)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledWith({
            and: [
                { published: {eq: true}},
                { deprecated: {eq: true}},
            ]
        }, 69, undefined)
    })

    test("Api is called with right filter if EVERYTHING is given in searchCriteria", async () => {
        api.elasticSearchPosts.mockResolvedValue(mockData.post.elasticSearchPosts.success)
        api.elasticSearchPostsCount.mockResolvedValue(100)
        searchCriteria.published = false
        searchCriteria.deprecated = true
        searchCriteria.author = 'author'
        searchCriteria.maps = [{id: 'mapID1'}, {id: 'mapID2'}, {id: 'mapID3'}]
        searchCriteria.tags = ['TAG1', 'TAG2', 'TAG3']
        await chicken.fetch(searchCriteria, 9999)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPosts).toHaveBeenCalledTimes(1)
        expect(api.elasticSearchPostsCount).toHaveBeenCalledWith({
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
        }, 9999, undefined)
    })
})