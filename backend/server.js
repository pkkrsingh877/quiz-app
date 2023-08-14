const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Middleware to encode URL-encoded data in POST requests
app.use(express.urlencoded({ extended: true }));

// Import route files
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');

// Mount routers
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);

const databaseSetup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connection Successful!');
    } catch (error) {
        console.log('DB Connection Unsuccessful!');
        console.log(error);
    }
}

databaseSetup();


app.get('/', (req, res) => {
    res.send(`htmlContent`);
});

app.listen(8000, () => {
    console.log('Server is running at port 8000');
});