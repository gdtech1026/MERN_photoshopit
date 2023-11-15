
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
      }
    }
  }
`;

export const SEARCH_PHOTO = gql`
  query searchPhotos($searchTerm: String) {
    searchPhotos(searchTerm: $searchTerm) {
      _id
      title
      photoOwner
      description
      imageLink
      date
      comments {
        username
        createdAt
      }
    }
  }
`

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
      username
      createdAt
      commentBody
      likes 
      dislikes
      }
    }
`;