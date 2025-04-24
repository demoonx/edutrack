
import React from 'react';
import Login from './components/Login';
import PanelProfesor from './components/PanelProfesor';
import PanelEstudiante from './components/PanelEstudiante';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { usuario, login, logout } = useAuth();

  return (
    <div
      className="App"
      style={{
        background: "url('/fondo.png') center center / cover no-repeat fixed",
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container">
        {!usuario ? (
          <Login onLogin={login} />
        ) : usuario.role === 'profesor' ? (
          <PanelProfesor onCerrarSesion={logout} />
        ) : (
          <PanelEstudiante onCerrarSesion={logout} />
        )}
      </div>
    </div>
  );
}


export default App;
