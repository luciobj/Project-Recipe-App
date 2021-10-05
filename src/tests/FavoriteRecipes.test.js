import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const drink0 = {
  id: '11007',
  type: 'bebida',
  area: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Alcoholic',
  name: 'Margarita',
  image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
};
const drink1 = {
  id: '12776',
  type: 'bebida',
  area: '',
  category: 'Coffee / Tea',
  alcoholicOrNot: 'Non alcoholic',
  name: 'Coffee mug',
  image: 'https://www.thecocktaildb.com/images/media/drink/xwtptq1441247579.jpg',
};
const meal0 = {
  id: '53015',
  type: 'comida',
  area: 'American',
  category: 'Dessert',
  alcoholicOrNot: '',
  name: 'Krispy Kreme Donut',
  image: 'https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg',
};
const storeMeals = [meal0, drink1];
const storeFull = [drink0, meal0, drink1];

describe('Requisito 61 - Checa os elementos dos cards renderizados', () => {
  beforeEach(() => {
    renderWithRouter(<FavoriteRecipes />);
  });
  // Reference for mock:
  // * https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
  // * https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
  const localStorageMock = {
    store: storeMeals,
    getItem: (key) => localStorage.store[key],
    setItem: (key, value) => { localStorage.store[key] = value.toString(); },
    clear: () => { localStorage.store = {}; },
    removeItem: (key) => { delete localStorage.store[key]; },
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  afterAll(() => {
    window.localStorage.clear();
  });

  it('A foto da receita está renderizada corretamente', () => {
    const recipeImg = screen.getAllByTestId(/-horizontal-image/);
    const expectedLength = 2;
    expect(recipeImg.length).toBe(expectedLength);
    expect(recipeImg[0]).toBeInTheDocument();
    expect(recipeImg[0].src).toBe(window.localStorage.store[0].image);
    expect(recipeImg[1]).toBeInTheDocument();
    expect(recipeImg[1].src).toBe(window.localStorage.store[1].image);
  });
  it('O nome da receita está renderizado corretamente', () => {
    const recipeName = screen.getAllByTestId(/-horizontal-name/);
    const expectedLength = 2;
    expect(recipeName.length).toBe(expectedLength);
    expect(recipeName[0]).toBeInTheDocument();
    expect(recipeName[0].innerHTML).toBe(window.localStorage.store[0].name);
    expect(recipeName[1]).toBeInTheDocument();
    expect(recipeName[1].innerHTML).toBe(window.localStorage.store[1].name);
  });
  it('A area e categoria da receita estão renderizadas corretamente', () => {
    const recipeArea = screen.getAllByTestId(/-horizontal-area/);
    const expectedLength = 2;
    const expectedText0 = `${window.localStorage
      .store[0].area} - ${window.localStorage.store[0].category}`;
    const expectedText1 = `${window.localStorage
      .store[1].area} - ${window.localStorage.store[1].category}`;
    expect(recipeArea.length).toBe(expectedLength);
    expect(recipeArea[0]).toBeInTheDocument();
    expect(recipeArea[0].innerHTML).toBe(expectedText0);
    expect(recipeArea[1]).toBeInTheDocument();
    expect(recipeArea[1].innerHTML).toBe(expectedText1);
  });
  it('O botão de compartilhar da receita está renderizado corretamente', () => {
    const recipeShareBtn = screen.getAllByTestId(/-horizontal-share-btn/);
    const expectedLength = 2;
    expect(recipeShareBtn.length).toBe(expectedLength);
  });
  it('O botão de \'desfavoritar\' está renderizado corretamente', () => {
    const recipeUnfavoriteBtn = screen.getAllByTestId(/-horizontal-favorite-btn/);
    const expectedLength = 2;
    expect(recipeUnfavoriteBtn.length).toBe(expectedLength);
  });
});

describe('Requisito 63 - Checa a lógica do botão compartilhar', () => {
  beforeEach(() => {
    renderWithRouter(<FavoriteRecipes />);
    const recipeShareBtn = screen.getAllByTestId(/-horizontal-share-btn/);
    userEvent.click(recipeShareBtn[0]);
  });

  Object.defineProperty(navigator, 'clipboard', { value: {
    writeText: jest.fn(() => null),
  } });

  const detailUrl0 = 'http://localhost:3000/bebidas/11007';
  it('A função para salvar o url é chamada corretamente', () => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });
  it('A função para salvar o url é chamada com o valor correto', () => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(detailUrl0);
  });
});

describe('Requisito 64 - Checa se a lógica de desfavoritar funciona corretamente', () => {
  beforeEach(() => {
    renderWithRouter(<FavoriteRecipes />);
  });

  const localStorageMock = {
    store: storeMeals,
    getItem: (key) => localStorage.store[key],
    setItem: (key, value) => { localStorage.store[key] = value.toString(); },
    clear: () => { localStorage.store = {}; },
    removeItem: (key) => { delete localStorage.store[key]; },
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  afterAll(() => {
    window.localStorage.clear();
  });

  it('O localStorage é atualizado e a receita desaparece após ser desfavoritada', () => {
    const chosenUnfavoriteBtn = screen.getByTestId(/0-horizontal-favorite-btn/);
    userEvent.click(chosenUnfavoriteBtn);
    expect(localStorage.store.length).toBe(1);
    const recipeCards = screen.getAllByTestId(/-recipe-card/);
    expect(recipeCards.length).toBe(1);
  });
});

describe('Requisito 65 - Checa os botões de filtro', () => {
  beforeEach(() => {
    renderWithRouter(<FavoriteRecipes />);
  });

  const localStorageMock = {
    store: storeFull,
    getItem: (key) => localStorage.store[key],
    setItem: (key, value) => { localStorage.store[key] = value.toString(); },
    clear: () => { localStorage.store = {}; },
    removeItem: (key) => { delete localStorage.store[key]; },
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  afterAll(() => {
    window.localStorage.clear();
  });
  it('Os botões estão renderizados corretamente na tela', () => {
    const filterBtns = screen.getAllByTestId(/filter-by/);
    const filtersQuantity = 3;
    expect(filterBtns.length).toBe(filtersQuantity);
  });
  it('A lógica do filtro de comidas está desenvolvida corretamente', () => {
    const mealFilterBtn = screen.getByTestId(/filter-by-meal-btn/);
    userEvent.click(mealFilterBtn);
    const recipeCards = screen.getAllByTestId(/-recipe-card/i);
    expect(recipeCards.length).toBe(1);
  });
  it('A lógica do filtro de bebidas está desenvolvida corretamente', () => {
    const drinkFilterBtn = screen.getByTestId(/filter-by-drinks-btn/);
    userEvent.click(drinkFilterBtn);
    const recipeCards = screen.getAllByTestId(/-recipe-card/i);
    expect(recipeCards.length).toBe(2);
  });
  it('A lógica de remover os filtros está desenvolvida corretamente', () => {
    const drinkFilterBtn = screen.getByTestId(/filter-by-drinks-btn/);
    const clearFilterBtn = screen.getByTestId(/filter-by-all-btn/);
    userEvent.click(drinkFilterBtn);
    userEvent.click(clearFilterBtn);
    const recipeCards = screen.getAllByTestId(/-recipe-card/i);
    const expectedCards = 3;
    expect(recipeCards.length).toBe(expectedCards);
  });
});

describe('Requisito 66 - Verifica o redirecionamento para página de detalhes', () => {
  const localStorageMock = {
    store: storeMeals,
    getItem: (key) => localStorage.store[key],
    setItem: (key, value) => { localStorage.store[key] = value.toString(); },
    clear: () => { localStorage.store = {}; },
    removeItem: (key) => { delete localStorage.store[key]; },
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  afterAll(() => {
    window.localStorage.clear();
  });
  it('Testa se é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const recipeCards = screen.getAllByTestId(/-horizontal-card/i);
    const detailPath0 = '/comidas/53015';
    userEvent.click(recipeCards[0]);
    const { pathname } = history.location;
    expect(pathname).toBe(detailPath0);
  });
});
