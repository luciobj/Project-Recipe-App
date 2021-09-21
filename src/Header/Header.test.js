import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Services/renderWithRouter';
import App from '../App';

const profileTestId = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchTopBtnTestId = 'search-top-btn';

describe('Implemente os elementos do header na tela principal de receitas', () => {
  test('se os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    renderWithRouter(<App />);
    const profile = screen.getByTestId(profileTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchTopBtn = screen.getByTestId(searchTopBtnTestId);

    expect(profile).toBeInDocument();
    expect(pageTitle).toBeInDocument();
    expect(searchTopBtn).toBeInDocument();
  });
});
