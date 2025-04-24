
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Redis = require('ioredis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect('mongodb://localhost:27017/edutrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error al conectar MongoDB:', err));

// Conexión Redis
const redis = new Redis();
redis.on('connect', () => console.log('✅ Conectado a Redis'));
redis.on('error', err => console.error('❌ Error de Redis:', err));

// Rutas
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const studentRoutes = require('./routes/students');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/students', studentRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://192.168.1.102:${PORT}`);
});
