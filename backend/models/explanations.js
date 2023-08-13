const mongoose = require('mongoose');

const explanationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Option' },
});

const Explanation = mongoose.model('Explanation', explanationSchema);

module.exports = Explanation;
