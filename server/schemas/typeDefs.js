const typeDefs = `
    type User {
        _id: ID
        name: String
        }
    type Query {
        users: [User]!
        user(userId: ID!): User
    }
    type Mutation {
        addUser(name: String!): User
        removeUser(userId: ID!): User
    }
`;

module.exports = typeDefs;