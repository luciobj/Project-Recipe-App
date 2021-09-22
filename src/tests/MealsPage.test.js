import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
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
    const drinks = {
      idDrink: '12710',
      strDrink: 'Apple Berry Smoothie',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwqvur1468876473.jpg',
    };

    global.fetch = jest.fn(async () => ({
      json:async () => drinks,
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadioInput = screen.getByText('Ingrediente');
    const searchButton = screen.getByText('Buscar');

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
    expect(ingredientRadioInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'a' } });
    expect(searchInput).toHaveValue('a');
    fireEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
  });
});

it('Verifica se a busca por NOME é feita corretamente', () => {
  const drinks = {
    idDrink: '12710',
    strDrink: 'Apple Berry Smoothie',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwqvur1468876473.jpg',
  };

  global.fetch = jest.fn(async () => ({
    json: async () => drinks,
  }));

  const { history } = renderWithRouter(<App />);
  history.push('/comidas');

  const searchInput = screen.getByTestId('search-input');
  const ingredientRadioInput = screen.getByText('Ingrediente');
  const searchButton = screen.getByText('Buscar');

  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('');
  expect(ingredientRadioInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'a' } });
  expect(searchInput).toHaveValue('a');
  fireEvent.click(searchButton);

  expect(global.fetch).toBeCalledTimes(1);
});
