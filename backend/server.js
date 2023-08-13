const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

try {
    mongoose.connect(process.env.MONGO_URI);
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(8000, () => {
    console.log('Server is running at port 8000');
});