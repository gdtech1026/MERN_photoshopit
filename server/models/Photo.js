

const { Schema, model, Types } = require('mongoose');

const bookSchema = new Schema({
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
    iamgelink: {
        type: String,
    },
    date: {
        type: String,
    },
});

module.exports = photoSchema;
