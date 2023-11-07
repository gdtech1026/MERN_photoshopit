

const typeDefs = `

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    photos: [Photo]
  }

  type Auth {
    token: String!
  }

  type Query {
    # me: User

    me(userId:ID!): User

    users: [User]
  }

  type Photo {
    title: String!
    photoId: String
    description: String!
    imagelink: String
    date: String
    comments: [Comment]
  }

  input userInput {
    _id: ID
    name: String!
    email: String!
    password: String!
    photos: [String]
  }

  input photoInput {
    title: String!
    photoId: String
    description: String!
    imagelink: String
    date: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth

    savePhoto(userId: ID!, photo: String!): User

    removeUser(userId: ID!): User

    removePhoto(photo: String!): User
  }

`

module.exports = typeDefs;
