

const typeDefs = `

type User {
    _id: ID
    name: String
    email: String
    password: String
    photos: [String]
  }

  type Photo {
    title: String!
    photoId: String
    description: String!
    imagelink: String
    date: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  input User {
    _id: ID
    name: String
    email: String
    password: String
    photos: [String]
  }

  input photoInput {
    title: String!
    photoId: String
    description: String!
    imagelink: String
    date: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    adduser(name: String!, email: String!, password: String!): Auth

    savePhoto(profileId: ID!, skill: String!): User

    removeUserprofileId: ID!): User

    removePhoto(photo: String!): User
  }

`

module.exports = typeDefs;
