
import { gql } from '@apollo/client';

export const GET_ME = gql`
query me($username: String!) {
  me($username: String!) {
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
      }
    }
  }
}
`;

export const GET_PHOTO = gql`
query getPhotos {
  photos {
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
}
`;

export const SINGLE_PHOTO = gql`
  query getSinglePhoto ($photoId: ID!) {
    photo(photoId: $photoId) {
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

`


export const GET_COMMENTS = gql`
query getComments {
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