const typeDefs = `
    type Category {
        _id: ID
        name: String
    }

    type Product {
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
        orders: [Order]
  }
    
    type Checkout {
    session: ID
  }
    type User {
        _id: ID
        name: String
        }
    type Query {
        users: [User]!
        user(userId: ID!): User
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        order(_id: ID!): Order
        checkout(products: [ProductInput]): Checkout

    }
    type Mutation {
        addUser(name: String!): User
        removeUser(userId: ID!): User
        addOrder(products: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
    }
`;

module.exports = typeDefs;