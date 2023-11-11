
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    user {
      _id
      username
      email
      password
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
    }
  }
}
`;

export const ADD_PHOTO = gql`

# mutation addPhoto($photo: PhotoInput!) {
#   addPhoto(photos: $photo) {

mutation addPhoto(
  $photoLink: String,
  $description: String!,
  $date: String,
  $deleteHash: String) {
addPhoto(userId: $userId,
   photoLink: $photoLink,
   description: $description,
   date: $date
   deleteHash: $deleteHash) {
        title
        photoId
        photoOwner
        description
        imageLink
        deleteHash
        date
        comments {
          editPhoto
          username
          createdAt
          commentBody
          likes 
          dislikes
        }
        }
      }
    }
  }
  `;

export const REMOVE_PHOTO = gql`
mutation removePhoto($photo: String!) {
  removePhoto(photos: $photo) {
    _id
    username
    email
    password
    photos {
      title
      photoId
      photoOwner
      description
      imageLink
      deleteHash
      date
      comments {
        editPhoto
        username
        createdAt
        commentBody
        likes 
        dislikes
      }
    }
  }
}
`;


export const ADD_COMMENT = gql`
mutation addComment(
  $photoId: ID!,
  $commentBody: String!,
  $createdAt: String!,
  $likes: Int!,
  dislikes: Int!
) {
  addComment(
    photoId: $photoId,
    commentBody: $commentBody,
    createdAt: $createdAt,
    likes: $likes,
    dislikes: $dislikes    
  ) {
      title
      photoId
      photoOwner
      description
      imageLink
      deleteHash
      date
      comments {
        editPhoto
        username
        createdAt
        commentBody
        likes 
        dislikes
        }
      }
    }
  }
  `;


