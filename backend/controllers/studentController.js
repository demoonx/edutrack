const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-score', async (req, res) => {
  const { userId, materia, puntos } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.puntajes[materia] = (user.puntajes[materia] || 0) + puntos;
    await user.save();

    res.json({ message: "Puntaje actualizado", puntajes: user.puntajes });
  } catch (err) {
    console.error("❌ Error al actualizar puntaje:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// GET: obtener puntaje acumulado por estudiante
router.get('/puntaje/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({});
    }

    const plainPuntajes = Object.fromEntries(student.puntajes);
    res.json(plainPuntajes);
  } catch (error) {
    console.error('❌ Error al obtener puntaje:', error);
    res.status(500).json({ error: 'Error al consultar puntaje del alumno' });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  const student = await Student.findOne({ email });
  if (!student) return res.status(404).json({ error: 'No encontrado' });
  res.json(student);
});

module.exports = router;
// This code defines an Express.js route to handle adding scores for students.
// It expects a POST request with userId, materia, and puntos in the body.