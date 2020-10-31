export const mockData = {
    post: {
        tenNewest: []
    },
    map: {
        allMaps: []
    },
    author: {
        allAuthors: []
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
    }
}