const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Option = require('../models/option');
const Explanation = require('../models/explanation');

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

// router.post('/', async (req, res) => {
//     try {
//         // correctOption has the index of correctOption coming in array of options
//         // selectedCategory has id of selected category coming from form
//         // option is array of options from form
//         // explanation is an array of explanations
//         const { text, options , correctOption, selectedCategory, explanations } = req.body;
//         console.log(req.body)
//         //create options
//         let optionIds = [];
//         for (const option of options) {
//             const createdOption = await Option.create({ text: option });
//             optionIds.push(createdOption._id);
//             console.log(createdOption)
//         }
//         //create explanations
//         let i = 0;
//         for (const explanation of explanations) {
//             const createdExplanation = await Explanation.create({ text: explanation, optionId: optionIds[i] })
//             console.log(createdExplanation)
//         }

//         //create question
//         const question = await Question.create({ text, options: optionIds, correctOption: optionIds[correctOption], category: selectedCategory });
//         console.log(question, "This actually was a question");
//         res.status(200).end();
//     } catch (error) {
//         res.json(error);
//     }
// });

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find({});
        console.log(questions)
        res.status(200).json(questions);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;