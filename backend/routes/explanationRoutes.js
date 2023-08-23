const express = require('express');
const router = express.Router();
const Explanation = require('../models/explanation');

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        res.send(id);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
})

module.exports = router;

module.exports = router;