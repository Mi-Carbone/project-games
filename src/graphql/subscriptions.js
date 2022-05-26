/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserGame = /* GraphQL */ `
  subscription OnCreateUserGame($owner: String) {
    onCreateUserGame(owner: $owner) {
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
export const onUpdateUserGame = /* GraphQL */ `
  subscription OnUpdateUserGame($owner: String) {
    onUpdateUserGame(owner: $owner) {
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
export const onDeleteUserGame = /* GraphQL */ `
  subscription OnDeleteUserGame($owner: String) {
    onDeleteUserGame(owner: $owner) {
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
export const onCreateScores = /* GraphQL */ `
  subscription OnCreateScores($owner: String) {
    onCreateScores(owner: $owner) {
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
export const onUpdateScores = /* GraphQL */ `
  subscription OnUpdateScores($owner: String) {
    onUpdateScores(owner: $owner) {
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
export const onDeleteScores = /* GraphQL */ `
  subscription OnDeleteScores($owner: String) {
    onDeleteScores(owner: $owner) {
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