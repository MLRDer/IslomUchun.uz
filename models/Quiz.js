const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            option: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                default: false,
            },
        },
    ],
    description: {
        type: String,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

quizSchema.index({ question: "text", tags: "text" });

module.exports = mongoose.model("Quizzes", quizSchema);
