
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PerfilAlumno({ onVolver }) {
  const { usuario } = useAuth();
  const [puntajes, setPuntajes] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (usuario?.email) {
      console.log("Consultando puntaje para:", usuario.email);
      axios.get(`http://localhost:5000/api/students/puntaje/${usuario.email}`)
        .then(res => {
          const data = res.data || {};
          setPuntajes(data);
          const suma = Object.values(data).reduce((acc, val) => acc + val, 0);
          setTotal(suma);
        })
        .catch(err => {
          console.error('Error al obtener puntaje:', err);
        });
    }
  }, [usuario]);

  return (
    <div className="container">
      <h2>🎓 Mi perfil de alumno</h2>
      <h3>📊 Puntaje por asignatura:</h3>
      {Object.keys(puntajes).length === 0 ? (
        <p style={{ fontStyle: 'italic' }}>No hay puntajes registrados aún.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Asignatura</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(puntajes).map(([materia, puntos]) => (
              <tr key={materia}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{materia}</td>
                <td style={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  backgroundColor: puntos >= 5 ? '#d4edda' : '#fff3cd',
                  color: puntos >= 5 ? '#155724' : '#856404',
                  fontWeight: 'bold'
                }}>
                  {puntos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 style={{ marginTop: '20px' }}>🏆 Total acumulado: {total} puntos</h3>
      <button className="button-grey" onClick={onVolver}>🔙 Volver</button>
    </div>
  );
}

export default PerfilAlumno;
