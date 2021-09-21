import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from 'validate.js';

import LoginContext from '../utils/LoginContext';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailConstraints = {
      Email: { email: true },
    };
    const passwordConstraints = {
      Password: { length: { minimum: 6 } },
    };
    const validationEmail = validate({ Email: email }, emailConstraints);
    const validationPassword = validate({ Password: password }, passwordConstraints);
    if (validationEmail === undefined && validationPassword === undefined) {
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
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabled }
          >
            Login
          </button>
        </Link>
      </div>
    </section>
  );
}
