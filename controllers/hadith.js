const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Hadith = require("../models/Hadith");

exports.getAll = catchAsync(async (req, res, next) => {
    const page = req.query.page || 0;

    const hadiths = await Hadith.find()
        .sort({ createdAt: -1 })
        .skip(20 * page)
        .limit(20)
        .lean();

    const count = await Hadith.find().count();

    res.status(200).json({
        success: true,
        count: count,
        data: hadiths,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const hadith = await Hadith.findByIdAndUpdate(
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

    if (!hadith) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: hadith,
    });
});

/*
 *      needs to be corrected
 */
exports.create = catchAsync(async (req, res, next) => {
    const hadith = await Hadith.create(req.body);

    res.status(201).json({
        success: true,
        data: hadith,
    });
});

/*
 *      needs to be corrected
 */
exports.update = catchAsync(async (req, res, next) => {
    const hadith = await Hadith.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!hadith) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: hadith,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Hadith.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
