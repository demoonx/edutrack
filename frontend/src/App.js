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
      <Route path="/" element={<Login />} />
      <Route
        path="/panelprofesor"
        element={
          usuario?.role === 'profesor' ? (
            <PanelProfesor onCerrarSesion={logout} />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/panelestudiante"
        element={
          usuario?.role === 'estudiante' ? (
            <PanelEstudiante onCerrarSesion={logout} />
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="page-wrapper">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
