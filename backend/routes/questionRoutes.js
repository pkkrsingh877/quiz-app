const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Option = require('./optionRoutes');
const Explanation = require('./explanationRoutes');

router.post('/', async (req, res) => {
    try {
        // correctOption has the index of correctOption coming in array of options
        // selectedCategory has id of selected category coming from form
        // option is array of options from form
        // explanation is an array of explanations
        const { text, options , correctOption, selectedCategory, explanations } = req.body;
        console.log(req.body)
        //create options
        let optionIds = [];
        options.forEach(async option => {
            let optionId = await Option.create({ option });
            optionIds.push(optionId)
        });
        //create explanations
        let i = 0;
        explanations.forEach(async (explanation, optionIds) => {
            await Explanation.create({ explanation, optionId: optionIds[i] })
        });

        //create question
        const question = await Question.create({ text, options: optionIds, correctOption: optionIds[correctOption], category: selectedCategory });
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