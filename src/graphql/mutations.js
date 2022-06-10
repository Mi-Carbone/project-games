/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const registerUser = /* GraphQL */ `
  mutation RegisterUser(
    $name: String!
    $surname: String!
    $email: String!
    $username: String!
    $password: String!
    $image: String
  ) {
    registerUser(
      name: $name
      surname: $surname
      email: $email
      username: $username
      password: $password
      image: $image
    ) {
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
export const newScore = /* GraphQL */ `
  mutation NewScore($game: String!, $score: Int!, $userId: ID!) {
    newScore(game: $game, score: $score, userId: $userId) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile($image: String, $userId: ID!) {
    updateProfile(image: $image, userId: $userId)
  }
`;
export const createUserGame = /* GraphQL */ `
  mutation CreateUserGame(
    $input: CreateUserGameInput!
    $condition: ModelUserGameConditionInput
  ) {
    createUserGame(input: $input, condition: $condition) {
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
export const updateUserGame = /* GraphQL */ `
  mutation UpdateUserGame(
    $input: UpdateUserGameInput!
    $condition: ModelUserGameConditionInput
  ) {
    updateUserGame(input: $input, condition: $condition) {
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
export const deleteUserGame = /* GraphQL */ `
  mutation DeleteUserGame(
    $input: DeleteUserGameInput!
    $condition: ModelUserGameConditionInput
  ) {
    deleteUserGame(input: $input, condition: $condition) {
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
export const createScores = /* GraphQL */ `
  mutation CreateScores(
    $input: CreateScoresInput!
    $condition: ModelScoresConditionInput
  ) {
    createScores(input: $input, condition: $condition) {
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
export const updateScores = /* GraphQL */ `
  mutation UpdateScores(
    $input: UpdateScoresInput!
    $condition: ModelScoresConditionInput
  ) {
    updateScores(input: $input, condition: $condition) {
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
export const deleteScores = /* GraphQL */ `
  mutation DeleteScores(
    $input: DeleteScoresInput!
    $condition: ModelScoresConditionInput
  ) {
    deleteScores(input: $input, condition: $condition) {
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
