const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, questions, tag } = req.body;
        const quiz = await Quiz.create({ title, questions, category }); 
        res.json(quiz);
    } catch (error) {
        console.log(error);
        res.end();
    }
});

router.get('/', async (req, res) => {
    try {
        const quizes = await Quiz.find();
        console.log(quizes);
        res.json(quizes);
    } catch (error) {
        console.log(error);
        res.end();
    }
});

module.exports = router;
