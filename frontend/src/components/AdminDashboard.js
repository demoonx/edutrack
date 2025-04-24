import React, { useState } from 'react';
import QuestionList from './QuestionList';
import CreateQuestion from './CreateQuestion';
import { FaBookOpen, FaSignOutAlt } from 'react-icons/fa';

function AdminDashboard({ onLogout }) {
  const [materia, setMateria] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuestionCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <h2><FaBookOpen /> Panel del Profesor</h2>

      <label>Selecciona una materia para ver preguntas:</label>
      <select onChange={(e) => setMateria(e.target.value)} defaultValue="">
        <option value="" disabled>-- Elegir --</option>
        <option value="Biología">Biología</option>
        <option value="Historia">Historia</option>
        <option value="Matemáticas">Matemáticas</option>
        <option value="Física">Física</option>
        <option value="Lenguaje">Lenguaje</option>
        <option value="Inglés">Inglés</option>
      </select>

      {materia && <QuestionList subject={materia} key={refreshKey} />}

      <hr />
      <CreateQuestion onQuestionCreated={handleQuestionCreated} />
      <button className="logout-button" onClick={onLogout}>
        <FaSignOutAlt /> Cerrar sesión
      </button>
    </div>
  );
}

export default AdminDashboard;
