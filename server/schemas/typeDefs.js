

const typeDefs = `

type User {
    _id: ID
    name: String
    email: String
    password: String
    photos: [String]!
  }

  type Photo {
    title: String!
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    adduser(name: String!, email: String!, password: String!): Auth

    savePhoto(profileId: ID!, skill: String!): User

    removeUserprofileId: ID!): User

    removePhoto(book: String!): User
  }


`

module.exports = typeDefs;
