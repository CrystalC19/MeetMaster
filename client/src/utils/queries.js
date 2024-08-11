import { gql } from '@apollo/client';


export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;


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
