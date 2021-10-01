const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        postDescription: {
            type: String,
            required: true,
            validate: [({ length }) => 1<= length <= 280, 'text should be between 1 and 280 characters.']
        },
        genre:{
            type: Schema.Types.ObjectId,
              ref: 'Genre'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followers: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

postSchema.virtual('followerCount').get(function(){
    return this.followers.length;
})

postSchema.virtual('commentCount').get(function(){
    return this.comments.length;
})

const Post = model("Post", postSchema);

module.exports = Post;