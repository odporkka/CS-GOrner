export const mockData = {
    post: {
        fetch10NewestPosts: [
            {
                "id": "1",
                "published": true,
                "publishDate": "2020-10-29T20:29:01.005Z",
                "deprecated": false,
                "s3id": "",
                "title": "Admin's Post",
                "authorID": "1",
                "mapID": "1",
                "tags": [
                    "SETTINGS"
                ],
                "description": "Post description",
                "markdown": "Post here...",
                "sanitizedHtml": "<p>Post here...</p>\n",
                "images": [],
                "createdAt": "2020-10-29T20:28:29.597Z",
                "updatedAt": "2020-10-29T22:20:07.808Z",
                "map": {
                    "name": "general",
                    "canonicalName": "General"
                },
                "author": {
                    "cognitoUserSud": "1",
                    "username": "Administrator",
                    "profilePic": null
                }
            },
            {
                "id": "2",
                "published": true,
                "publishDate": "2020-10-29T20:23:25.027Z",
                "deprecated": false,
                "s3id": "",
                "title": "Editor2's Post",
                "authorID": "2",
                "mapID": "3",
                "tags": [],
                "description": "No tags in this post",
                "markdown": "No tags..",
                "sanitizedHtml": "<p>No tags..</p>\n",
                "images": [],
                "createdAt": "2020-10-29T20:23:21.474Z",
                "updatedAt": "2020-10-29T20:23:25.389Z",
                "map": {
                    "name": "de_dust2",
                    "canonicalName": "Dust II"
                },
                "author": {
                    "cognitoUserSud": "2",
                    "username": "Editor2",
                    "profilePic": null
                }
            }
        ],
        elasticSearchCurrentUsersPosts: {
            success: {items : [
                    {
                        "id": "2",
                        "published": true,
                        "publishDate": "2020-10-29T20:23:25.027Z",
                        "deprecated": false,
                        "s3id": "",
                        "title": "Editor2's Post",
                        "authorID": "2",
                        "mapID": "3",
                        "tags": [],
                        "description": "No tags in this post",
                        "markdown": "No tags..",
                        "sanitizedHtml": "<p>No tags..</p>\n",
                        "images": [],
                        "createdAt": "2020-10-29T20:23:21.474Z",
                        "updatedAt": "2020-10-29T20:23:25.389Z",
                        "map": {
                            "name": "de_dust2",
                            "canonicalName": "Dust II"
                        },
                        "author": {
                            "cognitoUserSud": "2",
                            "username": "Editor2",
                            "profilePic": null
                        }
                    }
                ],
                total: 1},
            empty: {
                total: 0
            },
            error: {
                error: true,
                errorMessage: 'API Error'
            },
        },
        elasticSearchPosts: {
            success: {
                items: [
                    {id: "00001", title: "Title"},
                    {id: "00001", title: "Title"}
                ],
                total: 2
            },
            empty: {
                items: [],
                total: 0
            },
            error: {
                error: true,
                errorMessage: 'API Error'
            },
        }
    },
    map: {
        allMaps: [
            {
                "id": "1",
                "name": "general",
                "canonicalName": "General",
                "createdAt": "2020-10-10T18:26:26.569Z",
                "updatedAt": "2020-10-10T18:26:26.569Z"
            },
            {
                "id": "2",
                "name": "de_cache",
                "canonicalName": "Cache",
                "createdAt": "2020-10-10T18:26:26.616Z",
                "updatedAt": "2020-10-10T18:26:26.616Z"
            },
            {
                "id": "3",
                "name": "de_dust2",
                "canonicalName": "Dust II",
                "createdAt": "2020-10-10T18:26:26.603Z",
                "updatedAt": "2020-10-10T18:26:26.603Z"
            },
            {
                "id": "4",
                "name": "de_inferno",
                "canonicalName": "Inferno",
                "createdAt": "2020-10-10T18:26:26.622Z",
                "updatedAt": "2020-10-10T18:26:26.622Z"
            },
            {
                "id": "5",
                "name": "de_mirage",
                "canonicalName": "Mirage",
                "createdAt": "2020-10-10T18:26:26.627Z",
                "updatedAt": "2020-10-10T18:26:26.627Z"
            },
            {
                "id": "6",
                "name": "de_nuke",
                "canonicalName": "Nuke",
                "createdAt": "2020-10-10T18:26:26.633Z",
                "updatedAt": "2020-10-10T18:26:26.633Z"
            },
            {
                "id": "7",
                "name": "de_overpass",
                "canonicalName": "Overpass",
                "createdAt": "2020-10-10T18:26:26.638Z",
                "updatedAt": "2020-10-10T18:26:26.638Z"
            },
            {
                "id": "8",
                "name": "de_train",
                "canonicalName": "Train",
                "createdAt": "2020-10-10T18:26:26.643Z",
                "updatedAt": "2020-10-10T18:26:26.643Z"
            },
            {
                "id": "9",
                "name": "de_vertigo",
                "canonicalName": "Vertigo",
                "createdAt": "2020-10-10T18:26:26.648Z",
                "updatedAt": "2020-10-10T18:26:26.648Z"
            }
        ]
    },
    author: {
        fetchAuthorsList: [
            {
                "cognitoUserSud": "1",
                "username": "Administrator"
            },
            {
                "cognitoUserSud": "2",
                "username": "Editor2"
            },
            {
                "cognitoUserSud": "3",
                "username": "Editor3"
            }
        ]
    },
    amplifyAuth: {
        currentAuthenticatedUserResolve: () => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    resolve({ username: 'AWS_user' })
                })
            })
        },
        // currentAuthenticatedUserReject: 'not authenticated'
        currentAuthenticatedUserReject: () => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    reject('not authenticated')
                })
            })
        }
    },
    postFetchingChicken: {
        successfulResponse: {
            items: [
                {id: "00001", title: "Title"},
                {id: "00001", title: "Title"}
            ],
            total: 2
        },
        emptyItemsResponse: {
            items: [],
            total: 0
        },
        apiErrorResponse: {
            error: true,
            errorMessage: 'Error'},
        errorResponse: {
            items: [],
            total: 0,
            error: true,
            errorMessage: 'Error'}
    }
}