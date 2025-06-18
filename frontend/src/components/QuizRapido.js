import React, { useEffect, useState } from 'react';
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

  const iniciarQuiz = () => {
    if (materiaSeleccionada) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions`)
        .then(res => {
          const filtradas = res.data.filter(q => q.subject === materiaSeleccionada);
          const seleccionadas = filtradas.sort(() => 0.5 - Math.random()).slice(0, 5);
          setPreguntas(seleccionadas);
          setPreguntaActual(seleccionadas[0]);
          setIndice(0);
          setMostrarResultado(false);
        });
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
            <button key={i} className="button-principal" onClick={() => setMateriaSeleccionada(m)}>
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
      ) : (
        <ResolverPregunta
          pregunta={preguntaActual}
          onResponder={manejarRespuesta}
        />
      )}
    </div>
  );
}

export default QuizRapido;
