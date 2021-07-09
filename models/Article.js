const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
    uz: {
        title: {
            type: String,
            requiered: true,
        },
        content: {
            type: String,
            requiered: true,
        },
    },
    ru: {
        title: {
            type: String,
            requiered: true,
        },
        content: {
            type: String,
            requiered: true,
        },
    },
    image: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tags",
        },
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: "Users",
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

module.exports = mongoose.model("Articles", articleSchema);
