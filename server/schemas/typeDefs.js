const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
       _id: ID
       username: String
       email: String
       skillPosts: [SkillPost]
       savedSkillPosts: [SkillPost]
       soundPosts: [SoundPost]
       savedSoundPosts: [SoundPost]
       friends: [User]
       skillPostCount: Int
       savedSkillPostCount: Int
       soundPostCount: Int
       savedSoundPostCount: Int
       friendCount: Int
    }

    type SkillPost {
        _id: ID
        name: String
        author: User
        date: String
        image: String
        description: String
        text: String
        links: [SkillLink]
        tags: [Tag]
        aditionalTags: [Tag]
        followers: [User]
        comments: [Comment]
    }

    type SoundPost {
        _id: ID
        name: String
        artist: String
        author: User
        date: String
        link: String
        image: String
        description: String
        tags: [Tag]
        aditionalTags: [Tag]
        followers: [User]
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Tag {
        _id: ID
        name: String
    }

    type SkillLink{
        _id: ID
        name: String
        content: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        me: User
        users: [User]
        user(username: String!):User
        skillPosts(author: User): [SkillPost]
        soundPosts(author: User): [SoundPost]
        skillPost(_id: ID!):SkillPost
        soundPost(_id: ID!):SoundPost
        skillPostbyTag(tagId: ID!): [SkillPost]
        soundPostbyTag(tagId: ID!): [SoundPost]
        skillLink(skillPost: skillPost): [SkillLink]
    }

    input skillPostInput{
        name: String
        image: String
        description: String
        text: String
        tagIds: [ID]
    }

    input soundPostInput{
        name: String
        artist: String
        image: String
        link: String
        description: String
        TagIds: [ID]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addSkillPost(postData: skillPostInput): User
        addSoundPost(postData: soundPostInput): User
        saveSkillPost(postId: ID!): User
        saveSoundPost(postId: ID!): User
        removeSkillPost(id: ID!): User
        removeSoundPost(id: ID!): User
        addTag(name: String): User
        addLink(name: String, content: String): User
        addComment(postId: ID!, commentBody: String!): Post
        addFriend(friendId: ID!): User
    }
`;

module.exports = typeDefs;