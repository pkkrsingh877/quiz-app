const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const ejs = require('ejs');
const engine = require('ejs-mate');
const Question = require('./models/questions');
const methodOverride = require('method-override');

// setting up ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


// connect to mongodb
try{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB CONNECTION SUCCESSFUL');
}catch(err){
    console.log('Mongoose Connection Error! Database failed to connect!');
    console.log(err);
}

app.delete('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);
        console.log(question);
        res.status(200).redirect('/questions');
    } catch (err) {
        console.log(err);
    }
});

app.get('/questions', async (req, res) => {
    const questions = await Question.find({});
    console.log(questions);
    res.status(200).render('home/questions', { questions });
});

app.post('/', async (req, res) => {
    const { question, option1, option2, option3, option4, answer } = req.body;
    const arr = [option1, option2, option3, option4];

    const data = await Question.create({
        question: question,
        options: arr,
        answer: answer
    });
    console.log(data);
    res.status(200).redirect('/questions');
});

app.get('/upload', (req, res) => {
    res.render('home/upload');
});

app.get('/quiz', (req, res) => {
    res.render('home/quiz');
});

app.get('/', (req, res) => {
    res.render('home/index');
});

// app.use((req, res, next, err) => {
//     console.log(err);
//     res.status(500).end();
// });

app.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
});