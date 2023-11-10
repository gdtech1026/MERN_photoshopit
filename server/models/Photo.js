const { Schema, model, Types } = require('mongoose');
const commentSchema = require('./Comment');

const photoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    photoOwner: {
        type: String,
        required: true,
    },
    photoId: {
        type: Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: 'Please leave a description for your photo...',
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    imagelink: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [commentSchema],
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;
