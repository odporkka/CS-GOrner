/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const authenticate = /* GraphQL */ `
  query Authenticate($urlParams: String) {
    authenticate(urlParams: $urlParams)
  }
`;
export const renew = /* GraphQL */ `
  query Renew($token: String) {
    renew(token: $token)
  }
`;
export const ratePost = /* GraphQL */ `
  query RatePost {
    ratePost
  }
`;
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
        nOfPosts
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
          nOfPosts
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
    $from: Int
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
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
          nOfPosts
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
        nOfPosts
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
      nOfPosts
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
export const getSteamUser = /* GraphQL */ `
  query GetSteamUser($steamid: String!) {
    getSteamUser(steamid: $steamid) {
      id
      token
      steamid
      personaname
      profileurl
      avatar
      avatarmedium
      avatarfull
      avatarhash
      loccountrycode
      createdAt
      updatedAt
    }
  }
`;
export const listSteamUsers = /* GraphQL */ `
  query ListSteamUsers(
    $steamid: String
    $filter: ModelSteamUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSteamUsers(
      steamid: $steamid
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        token
        steamid
        personaname
        profileurl
        avatar
        avatarmedium
        avatarfull
        avatarhash
        loccountrycode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
