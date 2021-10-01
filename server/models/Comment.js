const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentBody: {
      type: String,
      required: true,
      validate: [({ length }) => length <= 280, 'body must be less than 281 characters.']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
  });

  const Comment = model("Comment", commentSchema);
  
  module.exports = Comment;