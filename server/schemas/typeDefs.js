

const typeDefs = `

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    photos: [Photo]
  }

  type Auth {
    token: String!
  }

  type Query {
    me(userId:ID!): User
    comments: Comment
    photos(username: String): [Photo]
    photo(photoId: ID!): Photo
  }

  type Photo {
    title: String!
    photoId: ID!
    description: String!
    imagelink: String!
    date: String!
    comments: [Comment]
  }

  type Comment {
    editPhoto: String
    user: String!
    date: String!
    text: String!
    likes: Int!
    dislikes: Int!
    commentId: String!
  }

  input userInput {
    _id: ID
    username: String!
    email: String!
    password: String!
    photos: [String]
  }

  input photoInput {
    title: String!
    description: String!
    imagelink: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addPhoto(photo: photoInput!): Photo

    removePhoto(photoId: ID!): Photo

    addComment(photoId: ID!, comment: String!): Photo

    removeComment(photoId: ID!, commentId: ID!): Photo
  }

`

module.exports = typeDefs;
