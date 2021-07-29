const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
    uz: {
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
    },
    ru: {
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
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",
        },
    ],
    tg_msg_id: {
        type: String,
        default: "custom",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

quizSchema.index({ question: "text", tags: "text", tg_msg_id: "text" });

module.exports = mongoose.model("Quizzes", quizSchema);
