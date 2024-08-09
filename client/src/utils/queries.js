import { gql } from '@apollo/client';

export const GET_USERS = gql`
  users {
    _id
    email
    password
  }
`;

export const GET_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      description
      price
      address
      imageUrl
      user {
        _id
        email
      }
    }
  }
`;
