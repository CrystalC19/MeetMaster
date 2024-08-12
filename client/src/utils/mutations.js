import { gql } from '@apollo/client';

// User mutations
export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
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
