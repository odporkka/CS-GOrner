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
      published
      publishDate
      deprecated
      s3id
      title
      author
      mapID
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        published
        publishDate
        deprecated
        s3id
        title
        author
        mapID
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
        published
        publishDate
        deprecated
        s3id
        title
        author
        mapID
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
      nextToken
      total
    }
  }
`;
