const { Schema, Types } = require('mongoose');

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
      minlength: 1,
      maxLength: 280,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      ref: "Photo",
    },
    imageLink: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new dateFormat(timestamp).toLocaleString(),
    },
    // likes: {
    //   type: Int,
    //   required: true,
    // },
    // dislikes: {
    //   type: Int,
    //   required: true,
    // }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = commentSchema;
