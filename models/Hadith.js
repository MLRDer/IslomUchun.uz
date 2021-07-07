const mongoose = require("mongoose");
const { Schema } = mongoose;

const hadithSchema = new Schema({
    uz: {
        title: {
            type: String,
            requiered: true,
        },
        hadith: {
            type: String,
            requiered: true,
        },
        origin: {
            type: String,
            requiered: true,
        },
    },
    ru: {
        title: {
            type: String,
            requiered: true,
        },
        hadith: {
            type: String,
            requiered: true,
        },
        origin: {
            type: String,
            requiered: true,
        },
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

module.exports = mongoose.model("Hadiths", hadithSchema);
