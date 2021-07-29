const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Quiz = require("../models/Quiz");
const converter = require("../utils/converter");
const mongoose = require("mongoose");

exports.getAll = catchAsync(async (req, res, next) => {
    // implement get by tag
    // and get by count (randomly)
    const count = req.query.count || 15;
    let query = [];
    if (req.query.tag) {
        query = [
            { $unwind: "$tags" },
            { $match: { tags: mongoose.Types.ObjectId(req.query.tag) } },
        ];
    }

    const quiz = await Quiz.aggregate([
        ...query,
        {
            $sample: {
                size: parseInt(count),
            },
        },
    ]);

    res.status(200).json({
        success: true,
        data: quiz,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id).populate("tags").lean();

    if (!quiz) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: quiz,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const { question, options, description, tags } = req.body;
    let newQuiz = {
        uz: {
            question: converter.ktol(question),
            options: options.map((option) => converter.ktol(option.option)),
            description: converter.ktol(description),
        },
        ru: {
            question: converter.ltok(question),
            options: options.map((option) => converter.ltok(option.option)),
            description: converter.ltok(description),
        },
        tags: tags,
    };

    const quiz = await Quiz.create(newQuiz);

    res.status(201).json({
        success: true,
        data: quiz,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!quiz) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: quiz,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Quiz.findByIdandDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
