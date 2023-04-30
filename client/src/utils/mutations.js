import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($updateUserId: ID!, $username: String!, $email: String!, $password: String!) {
    updateUser(id: $updateUserId, username: $username, email: $email, password: $password) {
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

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
}

`;

export const CREATE_POST = gql`
  mutation createPost($postTitle: String!, $postText: String!) {
    createPost(postTitle: $postTitle, postText: $postText) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
  }
}
`;


export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

// export const CREATE_COMMENT = gql`
//   mutation createComment($postId: ID!, $commentText: String!) {
//     createComment(postId: $postId, commentText: $commentText) {
//       _id
//       commentText
//       commentAuthor
//       createdAt
//   }
// }
// `;





