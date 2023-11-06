import { gql } from '@apollo/client';


export const GET_ME = gql`
query Me {
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
      thread {
        comment {
          editPhoto
          user
          date
          likes 
          dislikes
        }
      }
    }
  }
}
`;


