
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sumarPuntaje } from '../puntajeUtils';

function ResolverPregunta({ pregunta, onVolver, onSiguiente }) {
  const { usuario } = useAuth();
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    setRespuestaSeleccionada(null);
    setResultado(null);
  }, [pregunta]);

  const handleSeleccion = async (opcion) => {
    setRespuestaSeleccionada(opcion);
    const esCorrecta = opcion === pregunta.answer;
    setResultado(esCorrecta ? 'correcta' : 'incorrecta');

    if (esCorrecta && usuario?.email && pregunta?.subject) {
        console.log('Sumando puntaje para:', usuario.email, 'materia:', pregunta.subject);
        await sumarPuntaje(usuario.email, pregunta.subject, 1);
      }
  };

  return (
    <div className="container">
      <h3>{pregunta.question}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pregunta.options.map((op, idx) => (
          <li key={idx} style={{ margin: '10px 0' }}>
            <button
              className="button-principal"
              onClick={() => handleSeleccion(op)}
              disabled={respuestaSeleccionada !== null}
              style={{
                backgroundColor:
                  respuestaSeleccionada === op
                    ? (resultado === 'correcta' ? '#28a745' : '#dc3545')
                    : ''
              }}
            >
              {op}
            </button>
          </li>
        ))}
      </ul>

      {respuestaSeleccionada && (
        <>
          <p style={{ fontWeight: 'bold', color: resultado === 'correcta' ? 'green' : 'red' }}>
            {resultado === 'correcta' ? '✅ Respuesta correcta' : '❌ Respuesta incorrecta'}
          </p>
          {onSiguiente ? (
            <button className="button-principal" onClick={onSiguiente}>➡️ Siguiente pregunta</button>
          ) : (
            <button className="button-grey" onClick={onVolver}>🔙 Volver a preguntas</button>
          )}
        </>
      )}
    </div>
  );
}

export default ResolverPregunta;
