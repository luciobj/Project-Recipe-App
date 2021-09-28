import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../utils/renderWithRouter';
import Drinks from '../pages/Drinks';

// describe('Requisito 26 - Carregue as 12 primeiras receitas, uma em cada card', () => {
//   it('Testa se há 12 cards renderizados na tela', async () => {
//     renderWithRouter(<Drinks />);
//     const recipeCards = await screen.findAllByTestId(/-recipe-card /i);
//     console.log(recipeCards);
//     const expectedRender = 12;
//     expect(recipeCards.length).toBe(expectedRender);
//   });
// });

describe('Requisito 27 - Checa os botões para filtro por categoria', () => {
  it('Testa se há apenas cinco opções renderizadas(ou seis com opção All)', async () => {
    renderWithRouter(<Drinks />);
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    const expectedRender = 5;
    expect(categoriesInput.length).toBe(expectedRender || expectedRender + 1);
  });
});

// describe('Requisito 28 - Checa se os botões para filtro funcionam corretamente', () => {
//   beforeEach(() => {
//     renderWithRouter(<Drinks />);
//   });

//   it('Testa se são renderizados outros 12 cards na tela após o clique', () => {
//     const recipeCards = screen.findAllByTestId(/-recipe-card /i);
//     const categoriesInput = screen.findAllByTestId(/-category-filter/i);
//     const expectedRender = 12;
//     const firstBatch = recipeCards;
//     userEvent.click(categoriesInput[2]);
//     const secondBatch = recipeCards;
//     expect(recipeCards.length).toBe(expectedRender);
//     expect(firstBatch).not.toBe(secondBatch);
//   });

//   it('Testa se a categoria corresponde a selecionada', () => {
//     const categoriesInput = screen.findAllByTestId(/-category-filter/i);
//     const recipeCards = screen.findAllByTestId(/-recipe-card /i);
//     userEvent.click(categoriesInput[3]);
//     const categoryCheck = recipeCards
//       .every((card) => card.category === categoriesInput[3].value);
//     expect(categoryCheck).toBe(true);
//   });
// });

// describe('Requisito 29 - Checa o filtro como um toggle', () => {
//   it('Testa se ao clicar duas vezes, o filtro volta ao inicial', () => {
//     renderWithRouter(<Drinks />);
//     const recipeCards = screen.findAllByTestId(/-recipe-card /i);
//     const categoriesInput = screen.findAllByTestId(/-category-filter/i);
//     const firstBatch = [...recipeCards];
//     userEvent.click(categoriesInput[3]);
//     const secondBatch = [...recipeCards];
//     userEvent.click(categoriesInput[3]);
//     expect(recipeCards).toBe(firstBatch);
//     expect(recipeCards).not.toBe(secondBatch);
//   });
// });

// describe('Requisito 30 - Garante que apenas uma opção possa ser selecionada', () => {
//   beforeEach(() => {
//     renderWithRouter(<Drinks />);
//   });
//   it('Testa se dois botões sejam selecionados, apenas um recebe o \'check\'', () => {
//     const categoriesInput = screen.findAllByTestId(/-category-filter/i);
//     userEvent.click(categoriesInput[1]);
//     userEvent.click(categoriesInput[4]);
//     const checkedInputs = categoriesInput.filter((category) => category.checked === true);
//     expect(checkedInputs.length).toBe(1);
//   });
//   it('Testa se continua o mesmo resultado, caso outro botão seja selecionado', () => {
//     const recipeCards = screen.findAllByTestId(/-recipe-card /i);
//     const categoriesInput = screen.findAllByTestId(/-category-filter/i);
//     userEvent.click(categoriesInput[3]);
//     const firstBatch = [...recipeCards];
//     userEvent.click(categoriesInput[2]);
//     const secondBatch = [...recipeCards];
//     expect(firstBatch).toBe(secondBatch);
//   });
// });

// describe('Requisito 31 - Checa o botão \'All\' para filtro por todas categoria', () => {
//   beforeEach(() => {
//     renderWithRouter(<Drinks />);
//   });
//   it('Testa se o botão com testo \'All\' existe na tela', () => {
//     const allInput = screen.getByTestId(/all-category-filter/i);
//     expect(allInput).toBeInTheDocument();
//   });
//   it('Testa se o botão renderiza a busca com todas as categorias', () => {
//     const allInput = screen.getByTestId(/all-category-filter/i);
//     const recipeCards = screen.findAllByTestId(/-recipe-card /i);
//     userEvent.click(allInput);
//     const categoryCheck = recipeCards
//       .every((card) => card.category === allInput.value);
//     expect(categoryCheck).toBe(true);
//   });
// });

// describe('Requisito 32 - Verifica o redirecionamento para página de detalhes', () => {
//   beforeEach(() => {
//     renderWithRouter(<Drinks />);
//   });
//   it('Testa se é redirecionado corretamente', () => {
//   });
// });
