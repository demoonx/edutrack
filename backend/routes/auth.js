const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ajusta según tu ruta real

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Si el usuario no existe, lo creamos automáticamente
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        password: hashedPassword,
        role: "student" // o cualquier rol por defecto
      });

      await user.save();
      console.log("👤 Usuario registrado automáticamente");
    }

    // Comparamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    // Generamos token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("❌ Error en login automático:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
