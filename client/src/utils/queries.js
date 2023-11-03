

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
        description
        imagelink
        date
    }
  }
}
`;