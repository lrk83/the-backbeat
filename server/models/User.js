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
      savedPosts: [bookSchema],
    },
    // set this to use virtual below
    {
      toJSON: {
        virtuals: true,
      },
    }
  );