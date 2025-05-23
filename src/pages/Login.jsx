// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import USUARIOS from '../data/usuarios';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const valido = USUARIOS.some(
      (u) => u.usuario === usuario && u.password === password
    );

    if (valido) {
      localStorage.setItem('usuario', usuario);
      navigate('/tirada');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a002a] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#2a0040]/80 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none"
        />

        <div className="relative">
          <input
            type={mostrarPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded bg-white bg-opacity-20 text-black placeholder-black/70 outline-none"
          />
          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
          >
            <FontAwesomeIcon icon={mostrarPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 py-2 rounded-full font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
