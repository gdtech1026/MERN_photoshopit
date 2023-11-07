

const typeDefs = `

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    photo: [Photo]
  }

  type Auth {
    token: String!
  }

  type Query {
    me(userId:ID!): User

    comments: Comment

    photos: Photo

  }

  type Photo {
    title: String!
    photoId: String
    description: String!
    imagelink: String
    date: String
    comment: [Comment]
  }

  type Comment {
    editPhoto: String
    user: String!
    date: String!
    text: String!
    likes: Int!
    dislikes: Int!
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

    addPhoto(userId: ID!, photo: String!): User

    removePhoto(photo: String!): User
  }

`

module.exports = typeDefs;
