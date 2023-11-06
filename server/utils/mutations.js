
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
      photos {
        title
        photoId
        description
        imagelink
        date
        thread {
          comment {
            editPhoto
            user
            date
            text
            likes 
            dislikes
          }
        }
      }
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
      photos {
        title
        photoId
        description
        imagelink
        date
        thread {
          comment {
            editPhoto
            user
            date
            text
            likes 
            dislikes
          }
        }
      }
    }
  }
}
`;

export const ADD_PHOTO = gql`

mutation addPhoto($userId: ID!, $photo: photoInput!) {
    addPhoto(userId: $userId, photo: $photo) {
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
        thread {
          comment {
            editPhoto
            user
            date
            text
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
      thread {
        comment {
          editPhoto
          user
          date
          text
          likes 
          dislikes
        }
      }
    }
  }
}
`;

export const ADD_COMMENT = gql`

mutation addComment($userId: ID!, $comment: commentInput!) {
  addComment(userId: $userId, comment: $comment) {
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
        thread {
          comment {
            editPhoto
            user
            date
            text
            likes 
            dislikes
          }
        }
      }
    }
  }
  `;
