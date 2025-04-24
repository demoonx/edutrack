import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';

function SeleccionPanel({ setTipoPanel, onCerrarSesion }) {
  return (
    <div>
      <h2>Selecciona tu panel</h2>
        <button className="button-principal" onClick={() => setTipoPanel('profesor')}>
            <FaChalkboardTeacher /> Panel de Profesor
        </button>
        <button className="button-principal" onClick={() => setTipoPanel('estudiante')}>
            <FaUserGraduate /> Panel de Estudiante
        </button>
        <button className="logout-button" onClick={onCerrarSesion}>
            <FaSignOutAlt /> Cerrar sesión
        </button>
    </div>
  );
}

export default SeleccionPanel;
