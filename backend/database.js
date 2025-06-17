const mongoose = require('mongoose');
const Redis = require('ioredis');

// 🔗 Conexión MongoDB (desde variable de entorno)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar MongoDB:', err));

// 🔗 Conexión Redis (desde variable de entorno)
const redisClient = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false
  }
});

redisClient.on('connect', () => console.log('✅ Conectado a Redis'));
redisClient.on('error', err => console.error('❌ Error de Redis:', err));

module.exports = { mongoose, redisClient };
