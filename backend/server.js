const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware to encode URL-encoded data in POST requests
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

//import middleware functions
const checkUser = require('../backend/middlewares/checkUser');

// Import route files
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const optionRoutes = require('./routes/optionRoutes');
const explantionRoutes = require('./routes/explanationRoutes');
const userRoutes = require('./routes/userRoutes');

// Mount routers
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/category', categoryRoutes);
app.use('/option', optionRoutes);
app.use('/explanation', explantionRoutes);
app.use('/user', userRoutes);

const databaseSetup = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/quizapp');
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