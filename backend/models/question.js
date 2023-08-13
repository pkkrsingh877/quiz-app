const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
  correctOption: { type: mongoose.Schema.Types.ObjectId, ref: 'Option' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category schema
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
