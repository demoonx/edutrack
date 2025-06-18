const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: sumar puntaje
router.post('/add-score', async (req, res) => {
  const { userId, materia, puntos } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (!user.puntajes.hasOwnProperty(materia)) {
      return res.status(400).json({ message: `Materia inválida: ${materia}` });
    }

    user.puntajes[materia] += puntos;
    user.markModified('puntajes'); // 🔧 clave para que Mongoose registre el cambio
    await user.save();

    console.log(`✅ Puntaje actualizado para ${user.email}: ${materia} += ${puntos}`);

    res.json({ message: "Puntaje actualizado", puntajes: user.puntajes });
  } catch (err) {
    console.error("❌ Error al actualizar puntaje:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// GET: obtener puntaje acumulado
router.get('/puntaje/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user.puntajes);
  } catch (err) {
    console.error("❌ Error en /puntaje/:email:", err);
    res.status(500).json({ error: "Error al consultar puntaje del alumno" });
  }
});

module.exports = router;
