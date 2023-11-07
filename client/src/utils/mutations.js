
import { gql } from '@apollo/client';

// Must delete later 

// Send USER_LOGIN to loginform component

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

// Must delete later 

// Send ADD_USER to SignUpform component

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

// Must delete later 

// using challenge 21 as a reference but also accounting for the createPost component 

// Send SAVE_PHOTO to createPost component

export const ADD_PHOTO = gql`

mutation addPhoto($userId: ID!, $photo: PhotoInput!) {
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
  `;

// Must delete later 

// Send REMOVE_PHOTO to yourPosts Page 

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
  `;


