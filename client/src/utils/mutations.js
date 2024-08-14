import { gql } from '@apollo/client';


export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $password: String) {
    updateUser(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id   
        email
        password
      }
    }
  }
`;

// Event mutation without file upload
export const CREATE_EVENT = gql`
  mutation createEvent($title: String!, $description: String!, $amount: Float!, $date: String!, $address: String!) {
    createEvent(title: $title, description: $description, amount: $amount, date: $date, address: $address) {
      _id
      title
      description
      amount
      date
      address
    }
  }
`;

//Define the GraphQL mutation for logging out
export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
