const express = require('express');
const cors = require('cors');
const studentScoreRoutes = require('./controllers/studentController');
require('dotenv').config();

const { mongoose, redisClient } = require('./database'); // Conexión centralizada

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const studentRoutesLegacy = require('./routes/students');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/students', studentScoreRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
