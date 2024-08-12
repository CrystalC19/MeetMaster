import { gql } from '@apollo/client';

// User Queries
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      email
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      email
    }
  }
`;
export const QUERY_EVENTS = gql`
  query events {
    events {
      _id
      title
      description
      amount
      date
      address
    }
  }
`;

export const QUERY_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      _id
      title
      description
      amount
      date
      address
    }
  }
`;

