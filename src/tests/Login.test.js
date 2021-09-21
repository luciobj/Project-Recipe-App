import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

const emailTestid = 'email-input';
const passwordTestid = 'password-input';
const loginButtonTestid = 'login-submit-btn';

describe('Tests if the login page', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('has the email input', () => {
    const emailInput = screen.getByTestId(emailTestid);
    expect(emailInput).toBeInTheDocument();
  });
  it('has the password input', () => {
    const passwordInput = screen.getByTestId(passwordTestid);
    expect(passwordInput).toBeInTheDocument();
  });
});

describe('Tests if the inputs have propet validation', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('checks with a invalid email and a valid password', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, 'meuemaileesse');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeDisabled();
  });
  it('checks with a invalid email and password', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, 'meuemaileesse');
    userEvent.type(passwordInput, '1234');
    expect(loginButton).toBeDisabled();
  });
  it('checks with a valid email and a valid password', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, 'meuemail@eesse.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).not.toBeDisabled();
  });
});

// describe('Tests the local storage is updated with the email and password', () => {
//   beforeEach(() => {
//     renderWithRouter(<App />);
//   });

//   it('checks with a invalid email and a valid password', () => {
//     const emailInput = screen.getByTestId(emailTestid);
//     const passwordInput = screen.getByTestId(passwordTestid);
//     const loginButton = screen.getByTestId(loginButtonTestid);
//     userEvent.type(emailInput, 'meuemaileesse');
//     userEvent.type(passwordInput, '1234567');
//     expect(loginButton).toBeDisabled();
//   });
// });

// describe('Tests the local storage is updated with the tokens', () => {
//   beforeEach(() => {
//     renderWithRouter(<App />);
//   });

//   it('checks with a invalid email and a valid password', () => {
//     const emailInput = screen.getByTestId(emailTestid);
//     const passwordInput = screen.getByTestId(passwordTestid);
//     const loginButton = screen.getByTestId(loginButtonTestid);
//     userEvent.type(emailInput, 'meuemaileesse');
//     userEvent.type(passwordInput, '1234567');
//     expect(loginButton).toBeDisabled();
//   });
// });

describe('Tests if the page is redirected after clicking on the button', () => {
  it('the path is now the main for foods', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    const { pathname } = history.location;
    userEvent.type(emailInput, 'meuemail@eesse.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    expect(pathname).toBe('/comidas');
  });
});
