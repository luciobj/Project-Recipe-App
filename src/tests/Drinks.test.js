import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/dom';
import renderWithRouter from '../utils/renderWithRouter';
import Drinks from '../pages/Drinks';

describe('Requisito 26 - Carregue as 12 primeiras receitas, uma em cada card', () => {
  it('Testa se há 12 cards renderizados na tela', async () => {
    renderWithRouter(<Drinks />);
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const expectedRender = 12;
    expect(recipeCards.length).toBe(expectedRender);
  });
});

describe('Requisito 27 - Checa os botões para filtro por categoria', () => {
  it('Testa se há apenas cinco opções renderizadas(ou seis com opção All)', async () => {
    renderWithRouter(<Drinks />);
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    const categoriesInputMinusAll = categoriesInput.filter((input) => input.value !== 'All')
    const expectedRender = 5;
    expect(categoriesInputMinusAll.length).toBe(expectedRender);
  });
});

describe('Requisito 28 - Checa se os botões para filtro funcionam corretamente', () => {
  beforeEach(() => {
    renderWithRouter(<Drinks />);
  });

  it('Testa se são renderizados outros 12 cards na tela após o clique', async () => {
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    const expectedRender = 12;
    const firstBatch = recipeCards.filter((inputs) => inputs);
    userEvent.click(categoriesInput[2]);
    expect(recipeCards.length).toBe(expectedRender);
    expect(firstBatch).not.toBe(recipeCards);
  });

  // it('Testa se a categoria corresponde a selecionada', async () => {
  //   const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
  //   console.log(categoriesInput[1].value);
  //   userEvent.click(categoriesInput[1]);
  //   const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
  //   const categoryCheck = () => {
  //     let final = true;
  //     for (let index = 0; index < recipeCards.length; index += 1) {
  //       console.log(recipeCards[index].innerHTML);
  //       const partial = recipeCards[index].innerHTML.includes(categoriesInput[1].value)
  //       !partial && (final = false);
  //     }
  //     return final;
  //   }
  //   // recipeCards
  //   //   .every((card) => {
  //   //     card.innerHTML.includes(categoriesInput[3].value);
  //   //   });
  //   expect(categoryCheck()).toBe(true);
  // });
});

describe('Requisito 29 - Checa o filtro como um toggle', () => {
  it('Testa se ao clicar duas vezes, o filtro volta ao inicial', async () => {
    renderWithRouter(<Drinks />);
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    const firstBatch = recipeCards.filter((inputs) => inputs);
    userEvent.click(categoriesInput[3]);
    const secondBatch = recipeCards.filter((inputs) => inputs);
    userEvent.click(categoriesInput[3]);
    expect(recipeCards).toStrictEqual(firstBatch);
    expect(recipeCards).not.toBe(secondBatch);
  });
});

describe('Requisito 30 - Garante que apenas uma opção possa ser selecionada', () => {
  beforeEach(() => {
    renderWithRouter(<Drinks />);
  });
  it('Testa se dois botões sejam selecionados, apenas um recebe o \'check\'', async () => {
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    userEvent.click(categoriesInput[1]);
    userEvent.click(categoriesInput[4]);
    const checkedInputs = categoriesInput.filter((category) => category.checked === true);
    expect(checkedInputs.length).toBe(1);
  });
  it('Testa se continua o mesmo resultado, caso outro botão seja selecionado', async () => {
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    userEvent.click(categoriesInput[3]);
    const firstBatch = recipeCards.filter((inputs) => inputs);
    userEvent.click(categoriesInput[2]);
    const secondBatch = recipeCards.filter((inputs) => inputs);
    expect(firstBatch).toStrictEqual(secondBatch);
  });
});

describe('Requisito 31 - Checa o botão \'All\' para filtro por todas categoria', () => {
  beforeEach(() => {
    renderWithRouter(<Drinks />);
  });
  it('Testa se o botão com testo \'All\' existe na tela', async () => {
    const allInput = await screen.findByTestId(/all-category-filter/i);
    expect(allInput).toBeInTheDocument();
  });
  it('Testa se o botão renderiza a busca com todas as categorias', async () => {
    const allInput = await screen.findByTestId(/all-category-filter/i);
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const firstBatch = recipeCards.filter((inputs) => inputs);
    userEvent.click(allInput);
    expect(recipeCards).toStrictEqual(firstBatch);
  });
});

describe('Requisito 32 - Verifica o redirecionamento para página de detalhes', () => {
  it('Testa se é redirecionado corretamente', async () => {
    const { history } =renderWithRouter(<Drinks />);
    const { pathname } = history.location;
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const chosenCard = String(recipeCards[10].innerHTML);
    const chosenCardIdIndex = chosenCard.indexOf(' id=');
    const chosenCardId = chosenCard[chosenCardIdIndex + 5] +
    chosenCard[chosenCardIdIndex + 6] + 
    chosenCard[chosenCardIdIndex + 7] +
    chosenCard[chosenCardIdIndex + 8] +
    chosenCard[chosenCardIdIndex + 9];
    // userEvent.click(recipeCards[10]);
    expect(pathname).toBe(`/bebidas/${ chosenCardId }`);
  });
});
