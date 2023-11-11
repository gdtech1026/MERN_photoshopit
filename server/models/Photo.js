const { Schema, model, Types } = require('mongoose');
const commentSchema = require('./Comment');

const photoSchema = new Schema({
    title: {
        type: String,
        // required: 'You need to leave a title!',
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    photoOwner: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    photoId: {
        type: Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: 'Please leave a description for your photo...',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    imageLink: {
        type: String,
        // required: true,
    },
    deleteHash: {
        type: String,
        // required: true,
    },
    comments: [commentSchema],
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;
