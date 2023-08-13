const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
  correctOption: { type: mongoose.Schema.Types.ObjectId, ref: 'Option' },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
