
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length >= 2
  },
  answer: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
// Este modelo representa las preguntas en la base de datos.
// Contiene campos como el tema, la pregunta, las opciones de respuesta y la respuesta correcta.