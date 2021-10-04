import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Page Profile - Test page of Profile App Recipes', () => {
  it('Should exist logo Profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const logoProfile = screen.getByAltText('icon-profile');
    expect(logoProfile).toBeInTheDocument();
  });

  it('Should exist a title of page profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const title = screen.getByText('Perfil');
    expect(title).toBeInTheDocument();
  });

  it('Should exists a paragraph for email', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const paragraphEmail = screen.getByTestId('profile-email');
    expect(paragraphEmail).toBeInTheDocument();
  });

  // código que achei em uma pesquisa no stackoverflow
  // https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
  // it('Verify if screen contain email', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/perfil');
  //   const user = { email: 'exemplo@exemplo.com' };
  //   localStorage.setItem('user', JSON.stringify(user));
  //   const userStorage = JSON.parse(localStorage.getItem('user'));
  //   // const localStorageMock = {
  //   //   getItem: jest.fn(() => {
  //   //     const user = JSON.parse(localStorage.getItem('user'))
  //   //     return user
  //   //   }),
  //   //   setItem: jest.fn(() => {
  //   //     const user = { email: 'exemplo@exemplo.com' };
  //   //     localStorage.setItem('user', JSON.stringify(user));
  //   //   }),
  //   //   clear: jest.fn(() => {
  //   //     localStorage.clear();
  //   //   })
  //   // };
  //   // global.localStorage = localStorageMock;

  //   // localStorageMock.setItem();

  //   // const email = localStorageMock.getItem().email;
  //   console.log(JSON.parse(localStorage.getItem('user')));
  //   const { email } = userStorage;
  //   const userEmail = screen.getByText(email);

  //   expect(userEmail).toBeInTheDocument();
  // });

  it('Should exist three buttons in the page profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const buttons = screen.getAllByRole('button');
    const buttonsLength = 3;
    expect(buttons.length).toBe(buttonsLength);
  });

  it('Verify if exists three logos in the footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const logoDrinks = screen.getByAltText('drinks');
    const logoExplore = screen.getByAltText('explore');
    const logoFoods = screen.getByAltText('foods');
    expect(logoDrinks).toBeInTheDocument();
    expect(logoExplore).toBeInTheDocument();
    expect(logoFoods).toBeInTheDocument();
  });

  it('Clicking the  recipes done button changes for the recipes done page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const btnRecipesDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnRecipesDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  it('Clicking the recipes favorite button changes for the recipes favorite page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const btnRecipesfavorites = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnRecipesfavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });

  it('Clicking the  "sair" button changes for login page and clear localStorage', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(localStorage.length).toBe(0);
  });
});
