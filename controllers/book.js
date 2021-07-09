const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Book = require("../models/Book");

exports.getAll = catchAsync(async (req, res, next) => {
    const page = req.query.page || 0;

    const books = await Book.find()
        .sort({ createdAt: -1 })
        .skip(10 * page)
        .limit(10)
        .lean();

    const count = await Book.find().count();

    res.status(200).json({
        success: true,
        count: count,
        data: books,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
            view: {
                $inc: 1,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    ).lean();

    if (!book) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: book,
    });
});

/*
 *      Needs to be corrected after conversion is implemented
 */
exports.create = catchAsync(async (req, res, next) => {
    const book = await Book.create(req.body);

    res.status(201).json({
        success: true,
        data: book,
    });
});

/*
 *      Needs to be corrected after conversion is implemented
 */
exports.update = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!book) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: book,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
