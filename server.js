const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const ejs = require('ejs');
const engine = require('ejs-mate');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

try{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
}catch(err){
    console.log('Mongoose Connection Error! Database failed to connect!');
    console.log(err);
}

app.post('/', (req, res) => {
    const { question, option1, option2, option3, option4 } = req.body;
    console.log(req.body);
    res.end();
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