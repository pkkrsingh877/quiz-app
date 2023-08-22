const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Middleware to encode URL-encoded data in POST requests
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add DELETE method
    allowedHeaders: ['Content-Type', 'Authorization'] // Add headers you want to allow
}));


// Import route files
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const optionRoutes = require('./routes/optionRoutes');
const explantionRoutes = require('./routes/explanationRoutes');

// Mount routers
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/category', categoryRoutes);
app.use('/option', optionRoutes);
app.use('/explanation', explantionRoutes);

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