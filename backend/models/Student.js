// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  puntajes: {
    type: Map,
    of: Number,
    default: {}
  }
});

module.exports = mongoose.model('Student', studentSchema);
