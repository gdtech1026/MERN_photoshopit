

import { gql } from '@apollo/client';

// Must delete later 

// Send GET_ME to yourPosts Page 

export const GET_ME = gql`
query me {
  me {
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

export const GET_PHOTO = gql`
query getPhoto {
  photos {
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

export const GET_COMMENT = gql`
query getCmment {
  comments {
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