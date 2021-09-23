import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

const emailTestid = 'email-input';
const passwordTestid = 'password-input';
const loginButtonTestid = 'login-submit-btn';
const acceptableEmail = 'meuemail@eesse.com';
const acceptablePassword = '1234567';

describe('2- Tests if the login page', () => {
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

describe('3, 4, 5 - Tests if the inputs have propet validation', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('checks with a invalid email and a valid password', () => {
    const emailInput = screen.getByTestId(emailTestid);
    const passwordInput = screen.getByTestId(passwordTestid);
    const loginButton = screen.getByTestId(loginButtonTestid);
    userEvent.type(emailInput, 'meuemaileesse');
    userEvent.type(passwordInput, acceptablePassword);
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
    userEvent.type(emailInput, acceptableEmail);
    userEvent.type(passwordInput, acceptablePassword);
    expect(loginButton).not.toBeDisabled();
  });
});

describe('6- Tests the local storage is updated with the tokens', () => {
  // Reference for mock:
  // * https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
  // * https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
  // const localStorageMock = {
  //   store: {},
  //   getItem: (key) => store[key],
  //   setItem: (key, value) => {
  //     store[key] = value.toString();
  //   },
  //   clear: () => {
  //     store = {};
  //   },
  //   removeItem: (key) => {
  //     delete store[key];
  //   },
  // };

  // Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // afterEach(() => {
  //   window.localStorage.clear();
  // });

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  it('shows the correct input email', () => {
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

describe('7- Tests the local storage is updated with the email', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
  it('shows the correct input email', () => {
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
      'user',
      { email: acceptableEmail },
    );
  });
});

describe('8- Tests if the page is redirected after clicking on the button', () => {
  it('the path is now the main for foods', () => {
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
