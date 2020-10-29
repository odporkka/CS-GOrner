import { Storage } from 'aws-amplify'
import { v4 as uuidv4 } from "uuid"

/**
 * Upload file to S3. Throws error.
 *
 * @param s3id
 * @param file
 * @param setUploadProgress
 * @return {Promise<{key}|Object|{errorMessage: string, error: boolean}>}
 */
export const uploadToS3 = async (s3id, file, setUploadProgress) => {
    const fileName = resolveName(s3id, file.name)
    const publicUrl = resolvePublicUrl(fileName)

    console.log('fileName', fileName)
    console.log('publicUrl', publicUrl)

    // Push image to S3 & update metadata on post
    const result = await Storage.put(fileName, file, {
        progressCallback(progress) {
            const progressPercentage = (Math.round(progress.loaded / progress.total * 100))
            setUploadProgress(progressPercentage)
        },
        ACL: 'public-read'
    })

    if (!result && !result.key) {
        return { error: true, errorMessage: 'Something went wrong while uploading file'}
    }
    result.url = publicUrl
    return result
}

/**
 * Remove file from S3. Throws error.
 */
export const removeFromS3 = async (image) => {
    const result = await Storage.remove(image.key)
    // Just a simple check. IDK what should really be checked and docs aren't helping either.
    if (!result) {
        return { error: true, errorMessage: 'Something went wrong while removing file'}
    }
    return result
}

/**
 * Bulk remove files from S3. Throws error.
 */
export const bulkRemoveFromS3 = async (imageArray) => {
    if (!Array.isArray(imageArray)) return
    for (const image of imageArray) {
        if (image.hasOwnProperty('key')) await Storage.remove(image.key)
    }
}

/*
* Post specific uuid that is used to group posts images under same path.
* "Folder" in S3. i.e. /public/<uuid>/fileName
*
* @param fileName
* @return {string}
*/
const resolveName = (postS3id, fileName) => {
    const s3id = postS3id ?
        postS3id : uuidv4().split('-')[0]
    return `${s3id}/${fileName}`
}

/*
 * Construct public url to embed in markdown
 *
 * @param fileName
 * @return {string}
 */
const resolvePublicUrl = (fileName) => {
    const s3Config = Storage.getPluggable('AWSS3')._config
    const bucket = s3Config.bucket
    const region = s3Config.region
    return `https://${bucket}.s3-${region}.amazonaws.com/public/${fileName}`
}