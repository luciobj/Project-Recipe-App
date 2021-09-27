import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouter from '../utils/renderWithRouter';
import Header from '../Components/Header';

const profileTestId = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const SearchBtnTestId = 'search-top-btn';
const searchBarTestId = 'search-input';
const searchIconTestId = 'search-icon';
const userIconTestId = 'user-icon';

describe('Ícone de perfil, h1 Comida e botão de pesquisa disposto na tela', () => {
  renderWithRouter(<Header />);
  const profile = screen.getByTestId(profileTestId);
  const pageTitle = screen.getByTestId(pageTitleTestId);
  const SearchBtn = screen.getByTestId(SearchBtnTestId);
  it('should be have the user icon and the search button create a search bar', () => {
    expect(profile).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(SearchBtn).toBeInTheDocument();

    const userIcon = screen.getByTestId(userIconTestId);
    expect(userIcon).toBeInTheDocument();

    userEvent.click(SearchBtn);
    expect(profile).not.toBeInTheDocument();
    expect(pageTitle).not.toBeInTheDocument();

    const searchIcon = screen.getByTestId(searchIconTestId);
    expect(searchIcon).toBeInTheDocument();

    const searchBar = screen.getByTestId(searchBarTestId);
    expect(searchBar).toBeInTheDocument();
  });
});
