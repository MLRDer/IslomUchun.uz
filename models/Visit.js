const mongoose = require("mongoose");
const { Schema } = mongoose;

const VisitSchema = new Schema({
    count: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Visits", VisitSchema);
