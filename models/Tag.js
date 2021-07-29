const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    uz: {
        name: {
            type: String,
            required: true,
        },
    },
    ru: {
        name: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Tags", tagSchema);
