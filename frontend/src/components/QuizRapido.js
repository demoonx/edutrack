
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResolverPregunta from './ResolverPregunta';

function QuizRapido({ onVolver }) {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [indice, setIndice] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const materias = ["Biología", "Historia", "Matemáticas", "Física", "Lenguaje", "Inglés"];

  const iniciarQuiz = () => {
    if (materiaSeleccionada) {
      axios.get('http://localhost:5000/api/questions')
        .then(res => {
          const filtradas = res.data.filter(q => q.subject === materiaSeleccionada);
          const seleccionadas = filtradas.sort(() => 0.5 - Math.random()).slice(0, 5);
          setPreguntas(seleccionadas);
          setPreguntaActual(seleccionadas[0]);
          setIndice(0);
        });
    }
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
          <button className="button-grey" onClick={onVolver}>🔙 Volver</button>
        </>
      ) : preguntas.length === 0 ? (
        <>
          <button className="button-principal" onClick={iniciarQuiz}>Iniciar Quiz</button>
          <button className="button-grey" onClick={() => setMateriaSeleccionada('')}>🔙 Volver</button>
        </>
      ) : mostrarResultado ? (
        <>
          <h3>✅ ¡Has completado el quiz!</h3>
          <button className="button-grey" onClick={() => {
            setMateriaSeleccionada('');
            setPreguntas([]);
            setIndice(0);
            setMostrarResultado(false);
            setPreguntaActual(null);
          }}>
            🔁 Volver a selección de asignatura
          </button>
        </>
      ) : (
          <ResolverPregunta pregunta={preguntaActual} onSiguiente={avanzar} />
      )}
    </div>
  );
}

export default QuizRapido;
