import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      Página de Login;
      <Link to="/perfil">
        Página de Perfil
      </Link>
    </div>
  );
}
