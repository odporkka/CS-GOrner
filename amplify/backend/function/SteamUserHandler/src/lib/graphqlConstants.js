exports.getSteamUser = /* GraphQL */ `
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
exports.createSteamUser = /* GraphQL */ `
  mutation CreateSteamUser(
    $input: CreateSteamUserInput!
    $condition: ModelSteamUserConditionInput
  ) {
    createSteamUser(input: $input, condition: $condition) {
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
exports.updateSteamUser = /* GraphQL */ `
  mutation UpdateSteamUser(
    $input: UpdateSteamUserInput!
    $condition: ModelSteamUserConditionInput
  ) {
    updateSteamUser(input: $input, condition: $condition) {
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
exports.deleteSteamUser = /* GraphQL */ `
  mutation DeleteSteamUser(
    $input: DeleteSteamUserInput!
    $condition: ModelSteamUserConditionInput
  ) {
    deleteSteamUser(input: $input, condition: $condition) {
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