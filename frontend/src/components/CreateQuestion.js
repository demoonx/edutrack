
import React, { useState } from 'react';
import axios from 'axios';

function CreateQuestion() {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [answer, setAnswer] = useState(null);

  const handleSubmit = async () => {
    if (!subject || !question || options.some(opt => opt === '') || answer === null || answer === undefined) {
      alert('Completa todos los campos y marca la respuesta correcta.');
      return;
    }

    await axios.post('${process.env.REACT_APP_API_URL}/api/questions', {
      subject,
      question,
      options,
      answer: options[answer]
    });

    alert('Pregunta creada con éxito.');
    // Mantener campos si se desea
  };

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (idx) => {
    if (options.length > 2) {
      const updated = [...options];
      updated.splice(idx, 1);
      setOptions(updated);

      if (answer === idx) setAnswer(null);
      if (idx < answer) setAnswer(prev => prev - 1);
    }
  };

  return (
    <div>
      <h3>Crear nueva pregunta</h3>

      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="">Selecciona asignatura</option>
        <option value="Biología">Biología</option>
        <option value="Historia">Historia</option>
        <option value="Matemáticas">Matemáticas</option>
        <option value="Física">Física</option>
        <option value="Lenguaje">Lenguaje</option>
        <option value="Inglés">Inglés</option>
      </select>

      <input
        type="text"
        placeholder="Escribe el enunciado de la pregunta"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ marginTop: '15px' }}
      />

      <label style={{ fontWeight: 'bold', marginTop: '20px', display: 'block' }}>Alternativas:</label>

      {options.map((opt, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <button
            onClick={() => handleRemoveOption(idx)}
            disabled={options.length <= 2}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 8px',
              cursor: options.length <= 2 ? 'not-allowed' : 'pointer',
              marginRight: '8px'
            }}
            title="Eliminar alternativa"
          >
            🗑
          </button>

          <input
            type="text"
            placeholder={`Opción ${idx + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[idx] = e.target.value;
              setOptions(newOpts);
            }}
            style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <input
              type="radio"
              name="correct-answer"
              checked={answer === idx}
              onChange={() => setAnswer(idx)}
              style={{ marginRight: '5px' }}
            />
            <label>Correcta</label>
          </div>
        </div>
      ))}

      {options.length < 10 && (
        <button className="button-principal" onClick={handleAddOption}>
          ➕ Agregar alternativa
        </button>
      )}

      <button className="button-principal" onClick={handleSubmit}>💾 Guardar pregunta</button>
    </div>
  );
}

export default CreateQuestion;
