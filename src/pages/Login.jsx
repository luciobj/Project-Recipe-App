import React, { useContext, useEffect, useState } from 'react';
import { validate } from 'validate.js';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginContext from '../utils/LoginContext';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

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

  const handleClick = () => {
    history.push('/comidas');
    // localStorage.setItem('user', { email });
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
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ handleClick }
        >
          Login
        </button>
      </div>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf().isRequired,
};
