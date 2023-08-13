const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
