/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateScores = /* GraphQL */ `
  subscription OnCreateScores {
    onCreateScores {
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
        image
      }
      createdAt
      updatedAt
      owner
      userGameScoresId
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      owner
      message
      createdAt
      updatedAt
    }
  }
`;
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
      image
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
      image
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
      image
    }
  }
`;
