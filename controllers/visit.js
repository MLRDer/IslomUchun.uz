const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Visit = require("../models/Visit");

exports.create = catchAsync(async (req, res, next) => {
    const visit = await Visit.create(req.body);

    res.status(201).json({
        success: true,
        data: visit,
    });
});
