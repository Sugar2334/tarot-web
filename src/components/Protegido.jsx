import { Navigate } from 'react-router-dom';

export default function Protegido({ children }) {
  const usuario = localStorage.getItem('usuario');
  return usuario ? children : <Navigate to="/" />;
}
