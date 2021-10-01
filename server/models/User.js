const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      password: {
        type: String,
        required: true,
      },
      // set savedBooks to be an array of data that adheres to the bookSchema
      posts: [
          {
              type: Schema.Posts.ObjectId,
              ref: 'Post'
          }
      ],
      savedPosts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'Post'
          }
      ],
      friends: [
          {
              type: Schema.Types.ObjectId,
              ref: 'User'
          }
      ]
    },
    // set this to use virtual below
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  )

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

userSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

userSchema.virtual('savedPostsCount').get(function(){
    return this.savedPosts.length;
})

const User = model('User', userSchema)

module.exports = User;