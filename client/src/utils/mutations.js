
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

mutation addPhoto(
  $imageLink: String!,
  $description: String!,
  $photoOwner: String!,
  $title: String!
  ) {
addPhoto(
   imageLink: $imageLink,
   description: $description,
   photoOwner: $photoOwner,
   title: $title
   ) {
        _id
        title
        photoOwner
        description
        imageLink
        date
        comments {
          _id
          username
          createdAt
          commentBody
          likes 
          dislikes
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
      date
      comments {
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
  $photoId: ID!
  $commentBody: String!
  $username: String!
) {
  addComment(
    photoId: $photoId
    commentBody: $commentBody
    username: $username
  ) {
      _id
      title
      photoOwner
      description
      imageLink
      date
      comments {
        _id
        username
        commentBody
        createdAt
      }
    }
  }
`;

export const SAVE_PHOTO = gql`
mutation savePhoto($photoId: ID!, $username: String!) {
  savePhoto(photoId: $photoId, username: $username) {
    _id
    username
    email
    password
    photos {
      _id
      title
      photoOwner
      description
      imageLink
    }
  }
}
`;
