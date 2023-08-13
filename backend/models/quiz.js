const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category schema
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
