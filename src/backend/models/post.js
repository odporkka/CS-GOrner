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
    description: '',
    markdown: '',
    sanitizedHtml: '',
    images: []
}