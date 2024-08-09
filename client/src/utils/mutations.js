import { gql } from '@apollo/client';

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

export const CREATE_EVENT = gql`
  mutation createEvent($title: String!, $description: String, $price: Float, $address: String, $image: String!) {
    createEvent(title: $title, description: $description, price: $price, address: $address, image: $image) {
      _id
      title
      description
      price
      address
      image
      user {
        _id
        email
      }
    }
  }
`;
