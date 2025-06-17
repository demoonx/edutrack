
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST: sumar puntaje por materia
router.post('/puntaje', async (req, res) => {
  try {
    const { email, materia, puntos } = req.body;
    console.log('📥 POST recibido:', email, materia, puntos);

    let student = await Student.findOne({ email });

    if (!student) {
      console.log('👶 Creando nuevo estudiante');
      student = new Student({ email, puntajes: new Map([[materia, puntos]]) });
    } else {
      const anterior = student.puntajes.get(materia) || 0;
      student.puntajes.set(materia, anterior + puntos);
      console.log(`📝 Puntaje actualizado: ${materia} = ${anterior + puntos}`);
    }

    await student.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error al registrar puntaje:', error);
    res.status(500).json({ error: 'Error al registrar puntaje del alumno' });
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
