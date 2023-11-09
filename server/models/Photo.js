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
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;

module.exports = photoSchema;
