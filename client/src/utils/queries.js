
import { gql } from '@apollo/client';

export const GET_ME = gql`
query me($username: String!) {
  me(username: $username) {
    _id
    username
    email
    password
    photos {
      _id
      title
      photoId
      photoOwner
      description
      imageLink
      deleteHash
      date
      }
    }
  }
`;

export const GET_PHOTO = gql`
query getPhotos {
  photos {
      _id
      title
      photoId
      photoOwner
      description
      imageLink
      deleteHash
      date
      }
    }
`;

export const GET_COMMENT = gql`
query getComment {
  comments {
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
`


export const GET_COMMENTS = gql`
query getComments {
  comments {
      _id
      editPhoto
      username
      createdAt
      commentBody
      likes 
      dislikes
      }
    }
`;