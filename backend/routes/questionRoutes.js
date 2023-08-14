const express = require('express');
const router = express.Router();
const Question = require('../models/question');

router.post('/', async (req, res) => {
    try {
        const { text, options, correctOption, category } = req.body;
        const question = await Question.create({ question, options, correctOption, category });
        console.log(question);
        res.json(question);
    } catch (error) {
        res.json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const questions = Question.find();
        res.json(questions);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;