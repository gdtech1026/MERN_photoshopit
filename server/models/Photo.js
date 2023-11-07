

const { Schema, model, Types } = require('mongoose');

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
});



module.exports = photoSchema;
