import React, { useContext, useEffect, useState } from 'react';

import LoginContext from '../utils/LoginContext';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinimumLength = 6;
    if (emailRegex.test(email) && password.length > passwordMinimumLength) {
      setDisabled(false);
    }
  }, [email, password]);

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
        <button type="button" disabled={ disabled } data-testid="login-submit-btn">
          Login
        </button>
      </div>
    </section>
  );
}
