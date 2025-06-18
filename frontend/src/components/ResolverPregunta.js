import React, { useState, useEffect } from 'react';

function ResolverPregunta({ pregunta, onResponder }) {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    setRespuestaSeleccionada(null);
    setResultado(null);
  }, [pregunta]);

  const handleSeleccion = (opcion) => {
    setRespuestaSeleccionada(opcion);
    const esCorrecta = opcion === pregunta.answer;
    setResultado(esCorrecta ? 'correcta' : 'incorrecta');

    // ✅ Notificar al componente padre si fue correcta
    if (onResponder) {
      onResponder(esCorrecta);
    }
  };

  if (!pregunta) return <p>No hay pregunta para mostrar.</p>;

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
        </>
      )}
    </div>
  );
}

export default ResolverPregunta;
