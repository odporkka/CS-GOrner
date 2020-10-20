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
      title
      authorID
      mapID
      published
      publishDate
      deprecated
      tags
      description
      markdown
      sanitizedHtml
      s3id
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
      author {
        id
        cognitoUserSud
        username
        profilePic {
          key
          url
        }
        bio
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
      title
      authorID
      mapID
      published
      publishDate
      deprecated
      tags
      description
      markdown
      sanitizedHtml
      s3id
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
      author {
        id
        cognitoUserSud
        username
        profilePic {
          key
          url
        }
        bio
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
      title
      authorID
      mapID
      published
      publishDate
      deprecated
      tags
      description
      markdown
      sanitizedHtml
      s3id
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
      author {
        id
        cognitoUserSud
        username
        profilePic {
          key
          url
        }
        bio
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateAuthor = /* GraphQL */ `
  subscription OnCreateAuthor($cognitoUserSud: String) {
    onCreateAuthor(cognitoUserSud: $cognitoUserSud) {
      id
      cognitoUserSud
      username
      profilePic {
        key
        url
      }
      bio
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAuthor = /* GraphQL */ `
  subscription OnUpdateAuthor($cognitoUserSud: String) {
    onUpdateAuthor(cognitoUserSud: $cognitoUserSud) {
      id
      cognitoUserSud
      username
      profilePic {
        key
        url
      }
      bio
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAuthor = /* GraphQL */ `
  subscription OnDeleteAuthor($cognitoUserSud: String) {
    onDeleteAuthor(cognitoUserSud: $cognitoUserSud) {
      id
      cognitoUserSud
      username
      profilePic {
        key
        url
      }
      bio
      createdAt
      updatedAt
    }
  }
`;
