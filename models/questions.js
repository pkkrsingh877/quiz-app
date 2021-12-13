const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required!']
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: Number,
        required: [true, 'Answer is required!']
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;