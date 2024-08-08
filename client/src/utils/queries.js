import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      email
    }
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
