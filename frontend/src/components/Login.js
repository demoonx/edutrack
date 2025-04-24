
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (role) => {
    if (!email) {
      setError('Ingresa tu correo.');
      return;
    }

    try {
      const res = await axios.post('http://192.168.1.102:5000/api/auth/login', {
        email,
        role
      });

      if (res.data && res.data.email) {
        onLogin(res.data);
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('No se pudo iniciar sesión');
    }
  };

  return (
    <>
      <img src="/edutrack-logo.png" alt="EduTrack" className="logo" />
      <h2>Accede a tu cuenta</h2>

      <input
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="button-principal" onClick={() => handleLogin('estudiante')}>
        👨‍🎓 Entrar como estudiante
      </button>

      <button className="button-grey" onClick={() => handleLogin('profesor')}>
        👨‍🏫 Entrar como profesor
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </>
  );
}

export default Login;
