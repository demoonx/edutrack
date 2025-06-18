import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (rol) => {
    if (!nombre) {
      setError('Ingresa tu nombre.');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        nombre,
        rol
      });

      console.log("🧪 Respuesta del backend:", res.data);

      if (res.data?.user) {
        login(res.data.user); // guarda el usuario en contexto
        navigate(`/${rol === 'estudiante' ? 'panelestudiante' : 'panelprofesor'}`);
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      console.error('❌ Error en login:', err);
      setError('No se pudo iniciar sesión');
    }
  };

  return (
    <>
      <img src="/edutrack-logo.png" alt="EduTrack" className="logo" />
      <h2>Accede a tu cuenta</h2>

      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button className="button-principal" onClick={() => handleLogin('estudiante')}>
        Ingresar como Estudiante
      </button>
      <button className="button-principal" onClick={() => handleLogin('profesor')}>
        Ingresar como Profesor
      </button>

      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Login;
