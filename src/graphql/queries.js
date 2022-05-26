/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allUsers = /* GraphQL */ `
  query AllUsers {
    allUsers {
      id
      name
      surname
      email
      username
      password
      scores {
        items {
          id
          game
          score
          date
          createdAt
          updatedAt
          owner
          userGameScoresId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const login = /* GraphQL */ `
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      surname
      email
      username
      password
      scores {
        items {
          id
          game
          score
          date
          createdAt
          updatedAt
          owner
          userGameScoresId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const getUserGame = /* GraphQL */ `
  query GetUserGame($id: ID!) {
    getUserGame(id: $id) {
      id
      name
      surname
      email
      username
      password
      scores {
        items {
          id
          game
          score
          date
          createdAt
          updatedAt
          owner
          userGameScoresId
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserGames = /* GraphQL */ `
  query ListUserGames(
    $filter: ModelUserGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        surname
        email
        username
        password
        scores {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getScores = /* GraphQL */ `
  query GetScores($id: ID!) {
    getScores(id: $id) {
      id
      game
      score
      date
      userId {
        id
        name
        surname
        email
        username
        password
        scores {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
      userGameScoresId
    }
  }
`;
export const listScores = /* GraphQL */ `
  query ListScores(
    $filter: ModelScoresFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        game
        score
        date
        userId {
          id
          name
          surname
          email
          username
          password
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
        userGameScoresId
      }
      nextToken
    }
  }
`;