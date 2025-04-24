
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['profesor', 'estudiante'],
    required: true
  },
  nombre: {
    type: String
  },
  puntajes: {
    Biología: { type: Number, default: 0 },
    Historia: { type: Number, default: 0 },
    Matemáticas: { type: Number, default: 0 },
    Física: { type: Number, default: 0 },
    Lenguaje: { type: Number, default: 0 },
    Inglés: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
// Este modelo representa a los usuarios en la base de datos.
// Contiene campos como email, rol (profesor o estudiante), nombre y puntajes por materia.