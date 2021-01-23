const mongoose = require("mongoose");
const { Schema } = mongoose;

const TimeSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    hijri_month: {
        type: String,
        required: true,
    },
    month_ru: {
        type: String,
        required: true,
    },
    hijri_month_ru: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    region_ru: {
        type: String,
        required: true,
    },
    data: [{}],
});

TimeSchema.index({ month: "text", region: "text" });

module.exports = mongoose.model("Times", TimeSchema);
