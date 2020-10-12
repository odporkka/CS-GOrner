/*
 * Post object stuff.
 *
 * Transforms etc.
 */


export const initialPostState = {
    id: undefined,
    published: false,
    // AWSDateTime, set at first publish
    publishDate: undefined,
    deprecated: false,
    // Random per post uuid used as s3 file prefix. Calculated on image upload.
    s3id: '',
    title: '',
    author: '',
    mapID: '',
    tags: [],
    description: '',
    markdown: '',
    sanitizedHtml: '',
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
        case (postTags.SOLO): return 'SOLO'
        case (postTags.SOUNDS): return 'SOUNDS'
        case (postTags.CLUTCH): return 'Clutching'
        case (postTags.SUPPORT): return 'Support'
        case (postTags.SETTINGS): return 'Settings'
        default: return undefined
    }
}