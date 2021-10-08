import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
