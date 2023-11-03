
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    profile {
      _id
      username
      email
      password
      photos {
        title
        photoId
        description
        imagelink
        date
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    profile {
      _id
      username
      email
      password
      photos {
        title
        photoId
        description
        imagelink
        date
      }
    }
  }
}
`;

export const SAVE_PHOTO = gql`

mutation savePhoto($profileId: ID!, $photo: PhotoInput!) {
    addPhoto(profileId: $profileId, photo: $photo) {
      _id
      username
      email
      password
      photos {
        title
        photoId
        description
        imagelink
        date
      }
    }
  }
  `;

  export const REMOVE_PHOTO = gql`
mutation RemovePhoto($photo: String!) {
  removePhoto(photo: $photo) {
    _id
    username
    email
    password
    photos {
        title
        photoId
        description
        imagelink
        date
    }
  }
}
`;


