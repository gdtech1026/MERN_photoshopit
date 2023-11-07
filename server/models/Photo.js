const { Schema, model, Types } = require('mongoose');
const commentSchema = require('./Comment');

const photoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    photoId: {
        type: Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagelink: {
        type: String,
    },
    date: {
        type: String,
    },
    comments: [commentSchema],
});

module.exports = photoSchema;
