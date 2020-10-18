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
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
      owner
    }
  }
`;
