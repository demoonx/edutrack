
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ error: 'Email y rol son obligatorios' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, role });
    } else {
      user.role = role; // 👈 actualiza el rol si ya existe
    }

    await user.save();

    res.json({
      email: user.email,
      role: user.role,
      nombre: user.nombre || '',
      puntajes: user.puntajes
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en login' });
  }
});

module.exports = router;
