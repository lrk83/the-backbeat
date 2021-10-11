const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

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
      image: {
        type: String
      },
      description: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
      followedTags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }
      ],
      soundPosts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'SoundPost'
          }
      ],
      savedSoundPosts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'SoundPost'
          }
      ],
      skillPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SkillPost'
        }
      ],
      savedSkillPosts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'SkillPost'
          }
      ],
      followers: [
          {
              type: Schema.Types.ObjectId,
              ref: 'User'
          }
      ],
      followedUsers: [
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

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

userSchema.methods.isCorrectPassWord = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('followerCount').get(function(){
    return this.followers.length;
})

userSchema.virtual('soundPostCount').get(function(){
    return this.soundPosts.length;
})

userSchema.virtual('savedSoundPostCount').get(function(){
    return this.savedSoundPosts.length;
})

userSchema.virtual('skillPostCount').get(function(){
  return this.skillPosts.length;
})

userSchema.virtual('savedSkillPostCount').get(function(){
  return this.savedSkillPosts.length;
})

const User = model('User', userSchema);

module.exports = User;