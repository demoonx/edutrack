
import React, { useState } from 'react';
import CreateQuestion from './CreateQuestion';
import QuestionListEditable from './QuestionListEditable';

function PanelProfesor({ onCerrarSesion }) {
  const [vista, setVista] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');

  return (
    <>
      <img src="/edutrack-logo.png" alt="EduTrack" className="logo" />
      <h2>🎓 Panel del Profesor</h2>
      {!vista && (
        <>
          <button className="button-principal" onClick={() => setVista('ver')}>📄 Visualizar preguntas</button>
          <button className="button-principal" onClick={() => setVista('crear')}>➕ Crear pregunta</button>
          <button className="button-grey" onClick={onCerrarSesion}>🔙 Cerrar sesión</button>
        </>
      )}
      {vista === 'ver' && (
        <>
          {!materiaSeleccionada ? (
            <>
              <select onChange={(e) => setMateriaSeleccionada(e.target.value)} defaultValue="">
                <option value="" disabled>Selecciona una asignatura</option>
                <option value="Biología">Biología</option>
                <option value="Historia">Historia</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Física">Física</option>
                <option value="Lenguaje">Lenguaje</option>
                <option value="Inglés">Inglés</option>
              </select>
              <button className="button-grey" onClick={() => setVista(null)}>🔙 Volver</button>
            </>
          ) : (
            <QuestionListEditable
              subject={materiaSeleccionada}
              onVolver={() => setMateriaSeleccionada('')}
            />
          )}
        </>
      )}
      {vista === 'crear' && (
        <>
          <CreateQuestion />
          <button className="button-grey" onClick={() => setVista(null)}>🔙 Volver</button>
        </>
      )}
    </>
  );
}

export default PanelProfesor;
