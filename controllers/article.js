/*  *TODO:
 *      1. get by tags
 *      2. image upload: cloudinary or aws s3
 */

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Article = require("../models/Article");

exports.getAll = catchAsync(async (req, res, next) => {
    const page = req.query.page || 0;

    const articles = await Article.find()
        .sort({ createdAt: -1 })
        .skip(page * 20)
        .limit(20)
        .lean();

    const count = await Article.find().count();

    res.status(200).json({
        success: true,
        count: count,
        data: articles,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const article = await Article.findByIdAndUpdate(
        req.params.id,
        {
            view: {
                $inc: 1,
            },
        },
        {
            runValidators: true,
            new: true,
        }
    ).lean();

    if (!article) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: article,
    });
});

/*
 *      needs to be corrected
 */
exports.create = catchAsync(async (req, res, next) => {
    const article = await Article.create(req.body);

    res.status(201).json({
        success: true,
        data: article,
    });
});

/*
 *      needs to be corrected
 */
exports.update = catchAsync(async (req, res, next) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!article) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: article,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Article.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
