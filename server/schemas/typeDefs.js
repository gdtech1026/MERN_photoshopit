

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
    photoOwner: String
    description: String!
    imagelink: String!
    date: String!
    comments: [Comment]
  }

  type Comment {
    imageLink: String
    username: String!
    createdAt: String!
    commentBody: String!
    likes: Int!
    dislikes: Int!
    commentId: ID!
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
