const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const skillPostSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            validate: [({ length }) => 1<= length <= 280, 'text should be between 1 and 280 characters.']
        },
        text:{
            type: String,
            required: true
        },
        links: {
            type: Schema.Types.ObjectId,
            ref: 'SkillLink'
        },
        tags:{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        },
        aditionalTags:{
            type:Schema.Types.ObjectId,
            ref: 'Tag'
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

skillPostSchema.virtual('aditionalTagCount').get(function(){
    return this.aditionalTags.length;
})

skillPostSchema.virtual('followerCount').get(function(){
    return this.followers.length;
})

skillPostSchema.virtual('commentCount').get(function(){
    return this.comments.length;
})

const SkillPost = model("SkillPost", skillPostSchema);

module.exports = SkillPost;