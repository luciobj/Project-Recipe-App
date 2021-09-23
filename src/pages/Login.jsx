import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import LoginContext from '../utils/LoginContext';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinimumLength = 6;
    if (emailRegex.test(email) && password.length > passwordMinimumLength) {
      setDisabled(false);
    }
  }, [email, password]);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    console.log(localStorage.getItem('user'));
    history.push('/comidas');
  };

  return (
    <section>
      <div>
        <p>Login: </p>
        <input
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <p>Password: </p>
        <input
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          disabled={ disabled }
          data-testid="login-submit-btn"
          onClick={ handleClick }
        >
          Login
        </button>
      </div>
    </section>
  );
}
