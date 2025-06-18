import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PanelProfesor from './components/PanelProfesor';
import PanelEstudiante from './components/PanelEstudiante';
import { useAuth } from './context/AuthContext';
import './App.css';

function AppRoutes() {
  const { usuario, login, logout } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={login} />} />
      <Route
        path="/panelprofesor"
        element={<PanelProfesor onCerrarSesion={logout} />}
      />
      <Route
        path="/panelestudiante"
        element={<PanelEstudiante onCerrarSesion={logout} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
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
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
