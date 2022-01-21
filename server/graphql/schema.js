const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        createdAt: String!
        updatedAt: String!
    }
    
    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }

    input PostInputData {
        title: String!
        content: String!
    }

    type RootQuery {
        posts(page: Int): PostData!
        post(id: ID!): Post!
    }

    type RootMutation {
        createPost(postInput: PostInputData): Post!
        updatePost(id: ID!, postInput: PostInputData): Post!
        deletePost(id: ID!): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
