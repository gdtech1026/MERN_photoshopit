

const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    password: String
    photos: [Photo]!
  }

  type Photo {
    photoId: ID
    title: String
    photoOwner: String
    description: String
    imageLink: String
    date: String
    comments: [Comment]!
  }

  type Comment {
    commentId: ID
    imageLink: String
    username: String
    createdAt: String
    commentBody: String
    likes: Int
    dislikes: Int
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    me(username: String!): User
    comments: [Comment]
    photos(username: String): [Photo]
    photo(photoId: ID!): Photo
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    addPhoto(description: String!, photoOwner: String!, title: String!, imageLink: String!): Photo

    addComment(photoId: ID!, commentBody: String!,
    username: String!
    ): Photo

    removePhoto(photoId: ID!): Photo

    removeComment(photoId: ID!, commentId: ID!): Photo
  }

`

module.exports = typeDefs;

// input userInput {
//   _id: ID
//   username: String!
//   email: String!
//   password: String!
//   photos: [String]
// }

// input photoInput {
//   title: String!
//   description: String!
//   imagelink: String!
// }
