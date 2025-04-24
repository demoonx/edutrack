const mongoose = require('mongoose');
const redis = require('ioredis');

mongoose.connect('mongodb://localhost:27017/edutrack');

const redisClient = new redis(); // por defecto localhost:6379

module.exports = { mongoose, redisClient };
// Este archivo establece la conexión a la base de datos MongoDB y a Redis.
// Puedes ajustar la configuración de conexión según sea necesario.