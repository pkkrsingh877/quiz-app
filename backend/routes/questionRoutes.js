const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Option = require('../models/option');
const Explanation = require('../models/explanation');

router.post('/edit/:id', async (req, res) => {
   try {
        const { id } = req.body;
        console.log(id)
        // question = await Question.findById(id).populate('options').populate('correctOption');
        // console.log(question);
        res.status(200).json('');
   } catch (error) {
        console.log(error);
        res.status(500).end();
   } 
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate('options').populate('correctOption').populate('category');
        console.log(question);
        res.status(200).json(question);
    } catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { text, options, correctOption, selectedCategory, explanations } = req.body;

        // Create an array to store promises
        const promises = [];

        // Create options
        const optionIds = options.map(async (option) => {
            const createdOption = await Option.create({ option });
            return createdOption._id;
        });
        promises.push(...optionIds);

        // Create explanations
        explanations.forEach(async (explanation, i) => {
            const createdExplanation = Explanation.create({ explanation, optionId: optionIds[i] });
            promises.push(createdExplanation);
        });

        // Wait for all promises to be resolved
        await Promise.all(promises);

        // Create question
        const question = await Question.create({
            text,
            options: optionIds,
            correctOption: optionIds[correctOption],
            category: selectedCategory
        });

        console.log(question, "This actually was a question");
        res.status(200).end();
    } catch (error) {
        res.json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;