
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResolverPregunta from './ResolverPregunta';

function AsignaturasEstudiante({ onVolver }) {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActiva, setPreguntaActiva] = useState(null);

  const materias = ["Biología", "Historia", "Matemáticas", "Física", "Lenguaje", "Inglés"];

  useEffect(() => {
    if (materiaSeleccionada) {
      axios.get('http://192.168.1.102:5000/api/questions')
        .then(res => {
          const filtradas = res.data.filter(q => q.subject === materiaSeleccionada);
          setPreguntas(filtradas);
        });
    }
  }, [materiaSeleccionada]);

  const handleResponder = (pregunta) => {
    setPreguntaActiva(pregunta);
  };

  const volverDePregunta = () => {
    setPreguntaActiva(null);
  };

  return (
    <div className="container">
      {!materiaSeleccionada ? (
        <>
          <h3>Selecciona una asignatura</h3>
          {materias.map((materia, idx) => (
            <button
              key={idx}
              className="button-principal"
              onClick={() => setMateriaSeleccionada(materia)}
            >
              {materia}
            </button>
          ))}
          <button className="button-grey" onClick={onVolver}>🔙 Volver</button>
        </>
      ) : preguntaActiva ? (
        <ResolverPregunta pregunta={preguntaActiva} onVolver={volverDePregunta} />
      ) : (
        <>
          <h3>Preguntas de {materiaSeleccionada}</h3>
          {preguntas.length === 0 ? (
            <p style={{ fontStyle: 'italic' }}>No hay preguntas aún.</p>
          ) : (
            preguntas.map(p => (
              <div key={p._id} style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: '#f2f2f2'
              }}>
                <strong>{p.question}</strong>
                <br />
                <button
                  className="button-principal"
                  onClick={() => handleResponder(p)}
                  style={{ marginTop: '8px' }}
                >
                  Responder esta pregunta
                </button>
              </div>
            ))
          )}
          <button className="button-grey" onClick={() => setMateriaSeleccionada('')}>
            🔙 Volver a asignaturas
          </button>
        </>
      )}
    </div>
  );
}

export default AsignaturasEstudiante;
