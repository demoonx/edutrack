// src/components/QuestionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuestionList({ subject }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions`)
      .then(res => {
        const filtradas = res.data.filter(q => q.subject === subject);
        setQuestions(filtradas);
      });
  }, [subject]);

  return (
    <div>
      <h3>Preguntas de {subject}</h3>
      <ul>
        {questions.map(q => (
          <li key={q.id}>{q.question}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
