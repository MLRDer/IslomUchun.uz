const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
    uz: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    ru: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    image: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Books", bookSchema);
