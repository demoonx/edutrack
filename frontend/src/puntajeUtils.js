import axios from 'axios';

export async function sumarPuntaje(email, materia, puntos = 1) {
  try {
    console.log('📤 Enviando puntaje...', { email, materia, puntos });
    const res = await axios.post('http://localhost:5000/api/students/puntaje', {
      email,
      materia,
      puntos
    });
    console.log('✅ Puntaje sumado correctamente');
  } catch (error) {
    console.error('❌ Error al sumar puntaje:', error.response?.data || error.message);
  }
}
