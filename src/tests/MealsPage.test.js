import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Requisito 13 - Implementa barra de busca', () => {
  it('Verifica se os ratio-buttons e botão de busca são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetterSearch).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('Verifica se os inputs e o botão possuem os textos corretos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const ingredientText = screen.getByText(/ingrediente/i);
    const nameText = screen.getByText(/nome/i);
    const firstLetterText = screen.getByText(/primeira letra/i);
    const searchText = screen.getByText(/buscar/i);

    expect(ingredientText).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(firstLetterText).toBeInTheDocument();
    expect(searchText).toBeInTheDocument();
  });
});

describe('Requisito 14 - radio buttons para filtragem', () => {
  it('Verifica se o botão de busca do header existe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const headerSearchButton = screen.getByTestId('search-top-btn');

    expect(headerSearchButton).toBeInTheDocument();
  });
  it('Verifica se a busca por INGREDIENTE é feita corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadioInput = screen.getByText('Ingrediente');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadioInput).toBeInTheDocument();
  });
});
