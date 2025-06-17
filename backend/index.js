const express = require('express');
const cors = require('cors');
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
const studentRoutes = require('./routes/students');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/students', studentRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
