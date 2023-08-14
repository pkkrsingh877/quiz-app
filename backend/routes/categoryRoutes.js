const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).end();
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

module.exports = router;