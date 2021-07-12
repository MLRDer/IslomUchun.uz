const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    name_uz: {
        type: String,
        required: true,
    },
    name_ru: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Tags", tagSchema);
