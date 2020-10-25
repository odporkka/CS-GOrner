/**
 * Supported tags enum
 *
 * @type {{SUPPORT: string, AIM: string, CLUTCH: string, SOUNDS: string, MOVEMENT: string, SOLO: string,
 * SETTINGS: string, UTILITY: string, ECONOMY: string, TEAMWORK: string}}
 */
export const tags = {
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
 * Return UI string for tag
 *
 * @param tag
 * @return {string|undefined}
 */
export const tagToString = (tag) => {
    switch (tag) {
        case (tags.AIM): return 'Aim'
        case (tags.MOVEMENT): return 'Movement'
        case (tags.UTILITY): return 'Utility'
        case (tags.ECONOMY): return 'Economy'
        case (tags.TEAMWORK): return 'Teamwork'
        case (tags.SOLO): return 'Solo'
        case (tags.SOUNDS): return 'Sounds'
        case (tags.CLUTCH): return 'Clutching'
        case (tags.SUPPORT): return 'Support'
        case (tags.SETTINGS): return 'Settings'
        default: return undefined
    }
}

export const tagsToTagArray = (postTags) => {
    let array = postTags.split(';')
    array = array.filter((t) => Object.values(tags).includes(t))
    return array
}

export const tagArrayToTags = (tagArray) => {
    let tags = ''
    tagArray.forEach((tag) =>
        tags += `${tag};`
    )
    return tags
}

