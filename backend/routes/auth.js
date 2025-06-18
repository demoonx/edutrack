const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { nombre, rol } = req.body;

  try {
    const normalizedEmail = nombre.trim().toLowerCase() + "@edutrack.com";

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = new User({
        email: normalizedEmail,
        nombre: nombre.trim(),
        role: rol === "profesor" ? "profesor" : "estudiante"
      });

      await user.save();
      console.log(`✅ Usuario creado automáticamente: ${nombre} como ${rol}`);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        puntajes: user.puntajes
      }
    });
  } catch (err) {
    console.error("❌ Error en login automático:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.get("/test", (req, res) => {
  res.send("✔️ Ruta auth activa");
});

module.exports = router;
