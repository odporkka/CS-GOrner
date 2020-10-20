/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listMaps = /* GraphQL */ `
  query ListMaps(
    $filter: ModelMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        canonicalName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMap = /* GraphQL */ `
  query GetMap($id: ID!) {
    getMap(id: $id) {
      id
      name
      canonicalName
      createdAt
      updatedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          bio
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: SearchablePostSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          bio
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const listAuthors = /* GraphQL */ `
  query ListAuthors(
    $cognitoUserSud: String
    $filter: ModelAuthorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAuthors(
      cognitoUserSud: $cognitoUserSud
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getAuthor = /* GraphQL */ `
  query GetAuthor($cognitoUserSud: String!) {
    getAuthor(cognitoUserSud: $cognitoUserSud) {
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
