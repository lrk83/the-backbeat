const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const soundPostSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        artist:{
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        link:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            validate: [({ length }) => 1<= length <= 280, 'text should be between 1 and 280 characters.']
        },
        tags:{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        },
        aditionalTags:{
            type:Schema.Types.ObjectId,
            ref: 'Tag'
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

postSchema.virtual('aditionalTagCount').get(function(){
    return this.aditionalTags.length;
})

postSchema.virtual('followerCount').get(function(){
    return this.followers.length;
})

postSchema.virtual('commentCount').get(function(){
    return this.comments.length;
})

const SoundPost = model("SoundPost", soundPostSchema);

module.exports = SoundPost;