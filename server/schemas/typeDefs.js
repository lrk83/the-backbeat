const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
       _id: ID
       username: String
       email: String
       posts: [Post]
       savedPosts: [Post]
       friends: [User]
       postCount: Int
       savedPostCount: Int
       friendCount: Int
    }

    type Post {
        _id: ID
        postDescription: String
        genre: Genre
        createdAt: String
        author: User
        followers: [User]
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Genre {
        _id: ID
        name: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        me: User
        users: [User]
        user(username: String!):User
        posts(username: String): [Post]
        post(_id: ID!):Post
        postbyGenre(genreId: ID!): [Post]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postDescription: String!, genreID: ID!): User
        followPost(postId: ID!): User
        removePost(id: ID!): User
        addComment(postId: ID!, commentBody: String!): Post
        addFriend(friendId: ID!): User
    }
`;

module.exports = typeDefs;