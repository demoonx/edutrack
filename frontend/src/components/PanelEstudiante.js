
import React, { useState } from 'react';
import AsignaturasEstudiante from './AsignaturasEstudiante';
import QuizRapido from './QuizRapido';
import PerfilAlumno from './PerfilAlumno';

function PanelEstudiante({ onCerrarSesion }) {
  const [vista, setVista] = useState(null);

  return (
    <div className="container">
      <img src="/edutrack-logo.png" alt="EduTrack" className="logo" />
      <h2>👨‍🎓 Panel del Estudiante</h2>

      {!vista && (
        <>
          <button className="button-principal" onClick={() => setVista('asignaturas')}>
            📚 Asignaturas
          </button>
          <button className="button-principal" onClick={() => setVista('quiz')}>
            ⚡ Quiz rápido
          </button>
          <button className="button-principal" onClick={() => setVista('perfil')}>
            🧑‍🎓 Mi perfil de alumno
          </button>
          <button className="button-grey" onClick={onCerrarSesion}>
            🔙 Cerrar sesión
          </button>
        </>
      )}

      {vista === 'asignaturas' && <AsignaturasEstudiante onVolver={() => setVista(null)} />}
      {vista === 'quiz' && <QuizRapido onVolver={() => setVista(null)} />}
      {vista === 'perfil' && <PerfilAlumno onVolver={() => setVista(null)} />}
    </div>
  );
}

export default PanelEstudiante;
