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

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds=10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassWord = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

userSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

userSchema.virtual('savedPostCount').get(function(){
    return this.savedPosts.length;
})

const User = model('User', userSchema);

module.exports = User;