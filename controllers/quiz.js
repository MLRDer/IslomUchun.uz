const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const Quiz = require("../models/Quiz");
const Tag = require("../models/Tag");
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
    let { question, options, description, tag, tg_msg_id } = req.body;

    if (tg_msg_id) {
        tag = converter
            .ktol(tag)
            .replace(/"/g, "'")
            .replace(/hazinasi/g, "xazinasi");

        let dbTag = await Tag.findOne({ "uz.name": tag }).lean();
        if (!dbTag) {
            dbTag = await Tag.create({
                uz: {
                    name: tag,
                },
                ru: {
                    name: converter.ltok(tag),
                },
            });
        }
        tag = dbTag._id;
    }

    let newQuiz = {
        uz: {
            question: converter.ktol(question),
            options: options.map((option) => {
                return {
                    option: converter.ktol(option.option),
                    isCorrect: option.isCorrect,
                };
            }),
            description: converter.ktol(description),
        },
        ru: {
            question: converter.ltok(question),
            options: options.map((option) => {
                return {
                    option: converter.ltok(option.option),
                    isCorrect: option.isCorrect,
                };
            }),
            description: converter.ltok(description),
        },
        tags: tag,
        tg_msg_id: tg_msg_id ? tg_msg_id : "custom",
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

exports.tgUpdate = catchAsync(async (req, res, next) => {
    const { id, answer } = req.body;

    let quiz = await Quiz.findOne({ tg_msg_id: id });

    if (!quiz) return next(new AppError(404, errors.NOT_FOUND));

    for (let i = 0; i < 4; i++) {
        quiz.uz.options[i].isCorrect = quiz.ru.options[i].isCorrect = false;
    }

    quiz.uz.options[answer].isCorrect = quiz.ru.options[
        answer
    ].isCorrect = true;
    quiz.uz.description = `To'g'ri javob: ${quiz.uz.options[answer].option}!`;
    quiz.ru.description = `Тўғри жавоб: ${quiz.ru.options[answer].option}!`;

    quiz = await quiz.save();

    res.status(200).json({
        success: true,
        data: null,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Quiz.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
