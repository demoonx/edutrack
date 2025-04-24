
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Student = require('../models/Student');

// GET: obtener todas las preguntas o filtrar por materia
router.get('/', async (req, res) => {
  try {
    const { subject } = req.query;
    const preguntas = subject
      ? await Question.find({ subject })
      : await Question.find();
    res.json(preguntas);
  } catch (err) {
    console.error('Error al obtener preguntas:', err);
    res.status(500).json({ error: 'Error al obtener preguntas' });
  }
});

// POST: crear nueva pregunta
router.post('/', async (req, res) => {
  try {
    const { subject, question, options, answer, createdBy } = req.body;
    const nueva = new Question({ subject, question, options, answer, createdBy });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error al crear pregunta:', err);
    res.status(500).json({ error: 'Error al crear pregunta' });
  }
});

// PUT: editar pregunta
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizada);
  } catch (err) {
    console.error('Error al actualizar pregunta:', err);
    res.status(500).json({ error: 'Error al actualizar pregunta' });
  }
});

// DELETE: eliminar pregunta
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error al eliminar pregunta:', err);
    res.status(500).json({ error: 'Error al eliminar pregunta' });
  }
});

module.exports = router;
