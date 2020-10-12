/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMap = /* GraphQL */ `
  mutation CreateMap(
    $input: CreateMapInput!
    $condition: ModelMapConditionInput
  ) {
    createMap(input: $input, condition: $condition) {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const updateMap = /* GraphQL */ `
  mutation UpdateMap(
    $input: UpdateMapInput!
    $condition: ModelMapConditionInput
  ) {
    updateMap(input: $input, condition: $condition) {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const deleteMap = /* GraphQL */ `
  mutation DeleteMap(
    $input: DeleteMapInput!
    $condition: ModelMapConditionInput
  ) {
    deleteMap(input: $input, condition: $condition) {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      published
      publishDate
      deprecated
      s3id
      title
      author
      mapID
      tags
      description
      markdown
      sanitizedHtml
      images {
        key
        url
      }
      createdAt
      updatedAt
      map {
        id
        name
        canonicalName
        createdAt
        updatedAt
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      published
      publishDate
      deprecated
      s3id
      title
      author
      mapID
      tags
      description
      markdown
      sanitizedHtml
      images {
        key
        url
      }
      createdAt
      updatedAt
      map {
        id
        name
        canonicalName
        createdAt
        updatedAt
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      published
      publishDate
      deprecated
      s3id
      title
      author
      mapID
      tags
      description
      markdown
      sanitizedHtml
      images {
        key
        url
      }
      createdAt
      updatedAt
      map {
        id
        name
        canonicalName
        createdAt
        updatedAt
      }
    }
  }
`;
