/*
 * Post object stuff.
 *
 * Transforms etc.
 */


export const initialPostState = {
    id: undefined,
    title: '',
    // Cognito user sub
    authorID: undefined,
    mapID: undefined,
    published: false,
    // AWSDateTime, set at first publish
    publishDate: undefined,
    deprecated: false,
    tags: [],
    description: '',
    markdown: '',
    sanitizedHtml: '',
    // Random per post uuid used as s3 file prefix. Calculated on image upload.
    s3id: '',
    images: []
}

export const postTags = {
    AIM: "AIM",
    MOVEMENT: "MOVEMENT",
    UTILITY: "UTILITY",
    ECONOMY: "ECONOMY",
    TEAMWORK: "TEAMWORK",
    SOLO: "SOLO",
    SOUNDS: "SOUNDS",
    CLUTCH: "CLUTCH",
    SUPPORT: "SUPPORT",
    SETTINGS: "SETTINGS",
}

/**
 * Return string for postTag
 *
 * @param tag
 * @return {string|undefined}
 */
export const tagToString = (tag) => {
    switch (tag) {
        case (postTags.AIM): return 'Aim'
        case (postTags.MOVEMENT): return 'Movement'
        case (postTags.UTILITY): return 'Utility'
        case (postTags.ECONOMY): return 'Economy'
        case (postTags.TEAMWORK): return 'Teamwork'
        case (postTags.SOLO): return 'Solo'
        case (postTags.SOUNDS): return 'Sounds'
        case (postTags.CLUTCH): return 'Clutching'
        case (postTags.SUPPORT): return 'Support'
        case (postTags.SETTINGS): return 'Settings'
        default: return undefined
    }
}

/**
 * Strip extra properties.
 * I.e. connected objects, dates etc.
 *
 * @param post
 * @return {*}
 */
export const stripExtraProperties = (post) => {
    const acceptedProperties = Object.keys(initialPostState)
    Object.keys(post).forEach((property) => {
        if (!acceptedProperties.includes(property)) {
            delete post[property]
        }
    })
    return post
}

/**
 * Validate required all fields of post object.
 *
 * @param post
 * @return {{error: boolean, errors: {message: *}[]}}
 */
export const validatePostObject = (post) => {
    let errors = []

    // Non empty string
    if (!post.title) errors.push('Post must have attribute "title"!')
    if (post.title && typeof post.title !== 'string') errors.push('Attribute "title" must be of type string!')
    // Non empty string
    if (!post.authorID) errors.push('Post must have attribute "authorID"!')
    if (post.authorID && typeof post.authorID !== 'string') errors.push('Attribute "authorID" must be of type string!')
    // Non empty string
    if (!post.mapID) errors.push('Post must have attribute "mapID"!')
    if (post.mapID && typeof post.mapID !== 'string') errors.push('Attribute "mapID" must be of type string!')
    // Exists, is boolean
    if (post.published === undefined) errors.push('Post must have attribute "published"!')
    if (post.published && typeof post.published !== 'boolean') errors.push('Attribute "published" must be of type boolean!')
    // Exists, is boolean
    if (!post.deprecated === undefined) errors.push('Post must have attribute "deprecated"!')
    if (post.deprecated && typeof post.deprecated !== 'boolean') errors.push('Attribute "deprecated" must be of type boolean!')
    // Exists, is array
    if (!post.tags) errors.push('Post must have attribute "tags"!')
    if (post.tags && !Array.isArray(post.tags)) errors.push('Attribute "tags" must be of type array!')
    // Non empty string
    if (!post.description) errors.push('Post must have attribute "description"!')
    if (post.description && typeof post.description !== 'string') errors.push('Attribute "description" must be of type string!')
    // Non empty string
    if (!post.markdown) errors.push('Post must have attribute "markdown"!')
    if (post.markdown && typeof post.markdown !== 'string') errors.push('Attribute "markdown" must be of type string!')
    // Non empty string
    if (!post.sanitizedHtml) errors.push('Post must have attribute "sanitizedHtml"!')
    if (post.sanitizedHtml && typeof post.sanitizedHtml !== 'string') errors.push('Attribute "sanitizedHtml" must be of type string!')
    // Exists, is string
    if (post.s3id === undefined) errors.push('Post must have attribute "s3id"!')
    if (post.s3id && typeof post.s3id !== 'string') errors.push('Attribute "s3id" must be of type string!')

    errors = errors.map((error) => ({message: error}))
    let response = { error: false, errors: errors }
    if (errors.length > 0) {
        response.error = true
    }

    return response
}