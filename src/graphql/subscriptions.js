/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMap = /* GraphQL */ `
  subscription OnCreateMap {
    onCreateMap {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMap = /* GraphQL */ `
  subscription OnUpdateMap {
    onUpdateMap {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMap = /* GraphQL */ `
  subscription OnDeleteMap {
    onDeleteMap {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($authorID: String) {
    onCreatePost(authorID: $authorID) {
      id
      published
      publishDate
      deprecated
      s3id
      title
      authorID
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($authorID: String) {
    onUpdatePost(authorID: $authorID) {
      id
      published
      publishDate
      deprecated
      s3id
      title
      authorID
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($authorID: String) {
    onDeletePost(authorID: $authorID) {
      id
      published
      publishDate
      deprecated
      s3id
      title
      authorID
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
