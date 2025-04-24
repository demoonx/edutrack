
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function QuestionListEditable({ subject, onVolver }) {
  const [questions, setQuestions] = useState([]);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editOptions, setEditOptions] = useState([]);
  const [editAnswer, setEditAnswer] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => {
        const filtradas = res.data.filter(q => q.subject === subject);
        setQuestions(filtradas);
      });
  }, [subject]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro que deseas eliminar esta pregunta?')) return;
    await axios.delete(`http://localhost:5000/api/questions/${id}`);
    setQuestions(prev => prev.filter(q => q._id !== id));
  };

  const handleEdit = (q) => {
    setEditingId(q._id);
    setEditText(q.question);
    setEditOptions(q.options);
    setEditAnswer(q.options.findIndex(opt => opt === q.answer));
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:5000/api/questions/${editingId}`, {
      question: editText,
      options: editOptions,
      answer: editOptions[editAnswer]
    });
    setEditingId(null);
    setQuestions(prev => prev.map(q =>
      q._id === editingId ? {
        ...q,
        question: editText,
        options: editOptions,
        answer: editOptions[editAnswer]
      } : q
    ));
  };

  const toggleOptions = (id) => {
    setVisibleOptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveOption = (idx) => {
    if (editOptions.length > 2) {
      const updated = [...editOptions];
      updated.splice(idx, 1);
      setEditOptions(updated);
      if (editAnswer === idx) setEditAnswer(null);
      if (idx < editAnswer) setEditAnswer(prev => prev - 1);
    }
  };

  return (
    <div>
      <h3>Preguntas de {subject}</h3>
      {questions.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#777' }}>Aún no hay preguntas.</p>
      ) : (
        questions.map(q => (
          <div key={q._id} style={{
            backgroundColor: '#f2f9ff',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #d0e4f1'
          }}>
            {editingId === q._id ? (
              <>
                <h3>Editar pregunta</h3>
                <label style={{ fontWeight: 'bold' }}>Editar enunciado de la pregunta:</label>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  style={{ width: '100%', marginBottom: '10px' }}
                />

                <label style={{ fontWeight: 'bold' }}>Editar alternativas:</label>
                {editOptions.map((opt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <button
                      onClick={() => handleRemoveOption(idx)}
                      disabled={editOptions.length <= 2}
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        cursor: editOptions.length <= 2 ? 'not-allowed' : 'pointer',
                        marginRight: '8px'
                      }}
                      title="Eliminar alternativa"
                    >
                      🗑
                    </button>

                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const newOpts = [...editOptions];
                        newOpts[idx] = e.target.value;
                        setEditOptions(newOpts);
                      }}
                      style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                      <input
                        type="radio"
                        name="respuesta-editar"
                        checked={editAnswer === idx}
                        onChange={() => setEditAnswer(idx)}
                        style={{ marginRight: '5px' }}
                      />
                      <label>Correcta</label>
                    </div>
                  </div>
                ))}

                <button className="button-principal" onClick={handleSave}>💾 Guardar</button>
                <button className="button-grey" onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><strong>{q.question}</strong></div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button title="Editar" onClick={() => handleEdit(q)}><FaEdit /></button>
                  <button title="Eliminar" onClick={() => handleDelete(q._id)}><FaTrashAlt /></button>
                  <button title="Ver alternativas" onClick={() => toggleOptions(q._id)}>
                    {visibleOptions[q._id] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>
            )}
            {visibleOptions[q._id] && !editingId && (
              <ul style={{ marginTop: '10px', textAlign: 'left' }}>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
                <li><strong>✅ Respuesta correcta: {q.answer}</strong></li>
              </ul>
            )}
          </div>
        ))
      )}
      <button className="button-grey" onClick={onVolver}>🔙 Volver</button>
    </div>
  );
}

export default QuestionListEditable;
