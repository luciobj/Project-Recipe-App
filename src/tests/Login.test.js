import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const emailTestid = 'email-input';
const passwordTestid = 'password-input';
const loginButtonTestid = 'login-submit-btn';
const acceptableEmail = 'meuemail@eesse.com';
const acceptablePassword = '1234567';

describe('Requisito 2- Testa se a página de Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('tem o input para o email', () => {
    const emailInput = screen.getByTestId(emailTestid);
    expect(emailInput).toBeInTheDocument();
  });
  it('tem o input para o email', () => {
    const passwordInput = screen.getByTestId(passwordTestid);
    expect(passwordInput).toBeInTheDocument();
  });
});

describe('Requisitos 3 a 5 - Testa se a validação dos campos', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Fica desabilitado com email no formato errado', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, 'meuemaileesse');
    userEvent.type(passwordInput, acceptablePassword);
    expect(loginButton).toBeDisabled();
  });
  it('Fica desabilitado com email e senha nos formatos errados', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, 'meuemaileesse');
    userEvent.type(passwordInput, '1234');
    expect(loginButton).toBeDisabled();
  });
  it('Fica abilitado com email e senha no formato correto', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, acceptableEmail);
    userEvent.type(passwordInput, acceptablePassword);
    expect(loginButton).not.toBeDisabled();
  });
});

describe('Requisito 6- Testa se os tokens são salvos no localStorage', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  it('É salvo o email passado corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    const localStorageSetCalls = 3;
    const token = 1;
    userEvent.type(emailInput, acceptableEmail);
    userEvent.type(passwordInput, acceptablePassword);
    userEvent.click(loginButton);
    expect(localStorage.setItem).toHaveBeenCalledTimes(localStorageSetCalls);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('mealsToken', token);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cocktailsToken', token);
  });
});

describe('Requisito 7- Testa se o email é salvo no localStorage', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
  it('mostra o email correto passado', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    const localStorageSetCalls = 6;
    userEvent.type(emailInput, acceptableEmail);
    userEvent.type(passwordInput, acceptablePassword);
    userEvent.click(loginButton);
    expect(localStorage.setItem).toHaveBeenCalledTimes(localStorageSetCalls);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'user', JSON.stringify({ email: acceptableEmail }),
    );
  });
});

describe('Requisito 8- Testa se é redirecionado após o login', () => {
  it('o URL é agora /comidas', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, acceptableEmail);
    userEvent.type(passwordInput, acceptablePassword);
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
