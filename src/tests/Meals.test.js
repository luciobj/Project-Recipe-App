import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

const searchTopBtn = 'search-top-btn';

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

  it('Verifica se os ratio-buttons e botão de busca são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const ingredientSearch = screen.getByText(/Comidas/i);

    expect(ingredientSearch).toBeInTheDocument();
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

    const headerSearchButton = screen.getByTestId(searchTopBtn);

    expect(headerSearchButton).toBeInTheDocument();
  });
  it('Verifica se a busca por INGREDIENTE é feita corretamente', async () => {
    const meals = {
      idMeal: '52782',
      strMeal: 'Lamb tomato and sweet spices',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/qtwtss1468572261.jpg',
    };

    const result = {
      json: () => meals,
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(result),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const headerSearchButton = screen.getByTestId(searchTopBtn);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadioInput = screen.getByLabelText('Ingrediente');
    const searchButton = screen.getByText('Buscar');

    expect(headerSearchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
    expect(ingredientRadioInput).toBeInTheDocument();
    expect(ingredientRadioInput.checked).toBe(false);
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'potato' } });
    expect(searchInput).toHaveValue('potato');
    fireEvent.click(ingredientRadioInput);
    expect(ingredientRadioInput.checked).toBe(true);
    fireEvent.click(searchButton);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=potato',
    );
  });

  it('Dispara alerta caso a pesquisa por primeira letra seja feita com mais de uma letra',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/comidas');

      global.alert = jest.fn();

      const searchInput = screen.getByTestId('search-input');
      const firstLetterRadioInput = screen.getByLabelText('Primeira letra');
      const searchButton = screen.getByText('Buscar');

      fireEvent.change(searchInput, { target: { value: 'po' } });
      expect(searchInput.value.length).toBe(2);
      fireEvent.click(firstLetterRadioInput);
      expect(firstLetterRadioInput.checked).toBe(true);
      fireEvent.click(searchButton);

      expect(window.alert).toBeCalledWith(
        'Sua busca deve conter somente 1 (um) caracter',
      );
    });
});

describe('Requisito 15 - Testa se a página de drinks é renderizada', () => {
  it('verifica página de drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetterSearch).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
