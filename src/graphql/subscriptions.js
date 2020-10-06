/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMap = /* GraphQL */ `
  subscription OnCreateMap {
    onCreateMap {
      id
      name
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      author
      mapID
      description
      markdown
      sanitizedHtml
      createdAt
      updatedAt
      map {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      author
      mapID
      description
      markdown
      sanitizedHtml
      createdAt
      updatedAt
      map {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      author
      mapID
      description
      markdown
      sanitizedHtml
      createdAt
      updatedAt
      map {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
