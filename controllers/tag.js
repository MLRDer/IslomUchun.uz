const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Tag = require("../models/Tag");

exports.getAll = catchAsync(async (req, res, next) => {
    const tags = await Tag.find().lean();

    res.status(200).json({
        success: true,
        data: tags,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const tag = await Tag.findById(req.params.id).lean();

    if (!tag) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: tag,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const tag = await Tag.create(req.body);

    res.status(201).json({
        success: true,
        data: tag,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!tag) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: tag,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Tag.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
