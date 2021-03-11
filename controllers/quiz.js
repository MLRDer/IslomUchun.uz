const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Quiz = require("../models/Quiz");

exports.getAll = catchAsync(async (req, res, next) => {
    // implement get by tag
    // and get by count (randomly)
    const quiz = await Quiz.find().lean();

    res.status(200).json({
        success: true,
        data: quiz,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id).lean();

    if (!quiz) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: quiz,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
        success: true,
        data: quiz,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!quiz) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: quiz,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Quiz.findById(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
