import React, { useState } from 'react';
import axios from 'axios';
import ResolverPregunta from './ResolverPregunta';
import { useAuth } from '../context/AuthContext';

function QuizRapido({ onVolver }) {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [indice, setIndice] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const { usuario } = useAuth();

  const materias = ["Biología", "Historia", "Matemáticas", "Física", "Lenguaje", "Inglés"];

  const iniciarQuiz = async (materia) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions`);
      const filtradas = res.data.filter(q => q.subject === materia);
      const seleccionadas = filtradas.sort(() => 0.5 - Math.random()).slice(0, 5);

      setMateriaSeleccionada(materia);
      setPreguntas(seleccionadas);
      setPreguntaActual(seleccionadas[0]);
      setIndice(0);
      setMostrarResultado(false);
    } catch (err) {
      console.error("❌ Error al cargar preguntas:", err);
    }
  };

  const manejarRespuesta = async (correcta) => {
    if (correcta && usuario) {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/students/add-score`, {
        userId: usuario.id,
        materia: materiaSeleccionada,
        puntos: 1
      });
    }
    avanzar();
  };

  const avanzar = () => {
    const siguiente = indice + 1;
    if (siguiente < preguntas.length) {
      setIndice(siguiente);
      setPreguntaActual(preguntas[siguiente]);
    } else {
      setMostrarResultado(true);
    }
  };

  return (
    <div className="container">
      {!materiaSeleccionada ? (
        <>
          <h3>Selecciona una asignatura para el quiz</h3>
          {materias.map((m, i) => (
            <button key={i} className="button-principal" onClick={() => iniciarQuiz(m)}>
              {m}
            </button>
          ))}
          <button onClick={onVolver}>⬅ Volver</button>
        </>
      ) : mostrarResultado ? (
        <>
          <h3>¡Quiz finalizado!</h3>
          <button onClick={onVolver}>⬅ Volver</button>
        </>
      ) : preguntaActual ? (
        <ResolverPregunta
          pregunta={preguntaActual}
          onResponder={manejarRespuesta}
        />
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  );
}

export default QuizRapido;
