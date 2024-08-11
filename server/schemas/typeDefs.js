const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    orders: [Order]
  }

  type Event {
    _id: ID!
    title: String!
    description: String
    price: Float
    address: String
    image: String!
    user: User!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    events: [Event]
    event(id: ID!): Event
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
  }

  type Auth {
    token: String
    user: User
  }

  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(title: String!, description: String, price: Float, address: String, image: String!): Event
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product


  }

    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
    
  type Checkout {
        session: ID
    }


    input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }


`;

module.exports = typeDefs;
