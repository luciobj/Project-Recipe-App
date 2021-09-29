import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Meals from '../pages/Meals';

// const searchTopBtn = 'search-top-btn';

// describe('Requisito 13 - Implementa barra de busca', () => {
//   it('Verifica se os ratio-buttons e botão de busca são renderizados', () => {
//     renderWithRouter(<Meals />);
//     const ingredientSearch = screen.getByTestId('ingredient-search-radio');
//     const nameSearch = screen.getByTestId('name-search-radio');
//     const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
//     const searchButton = screen.getByTestId('exec-search-btn');
//     expect(ingredientSearch).toBeInTheDocument();
//     expect(nameSearch).toBeInTheDocument();
//     expect(firstLetterSearch).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//   });

//   it('Verifica se os ratio-buttons e botão de busca são renderizados', () => {
//     renderWithRouter(<Meals />);
//     const ingredientSearch = screen.getByText(/Comidas/i);
//     expect(ingredientSearch).toBeInTheDocument();
//   });

//   it('Verifica se os inputs e o botão possuem os textos corretos', () => {
//     renderWithRouter(<Meals />);
//     const ingredientText = screen.getByText(/ingrediente/i);
//     const nameText = screen.getByText(/nome/i);
//     const firstLetterText = screen.getByText(/primeira letra/i);
//     const searchText = screen.getByText(/buscar/i);
//     expect(ingredientText).toBeInTheDocument();
//     expect(nameText).toBeInTheDocument();
//     expect(firstLetterText).toBeInTheDocument();
//     expect(searchText).toBeInTheDocument();
//   });
// });

// describe('Requisito 14 - radio buttons para filtragem', () => {
//   it('Verifica se o botão de busca do header existe', () => {
//     renderWithRouter(<Meals />);
//     const headerSearchButton = screen.getByTestId(searchTopBtn);
//     expect(headerSearchButton).toBeInTheDocument();
//   });
//   it('Verifica se a busca por INGREDIENTE é feita corretamente', async () => {
//     const meals = {
//       idMeal: '52782',
//       strMeal: 'Lamb tomato and sweet spices',
//       strMealThumb:
//         'https://www.themealdb.com/images/media/meals/qtwtss1468572261.jpg',
//     };
//     const result = {
//       json: () => meals,
//     };
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(result),
//     });

//     renderWithRouter(<Meals />);
//     const headerSearchButton = screen.getByTestId(searchTopBtn);
//     const searchInput = screen.getByTestId('search-input');
//     const ingredientRadioInput = screen.getByLabelText('Ingrediente');
//     const searchButton = screen.getByText('Buscar');
//     fireEvent.change(searchInput, { target: { value: 'potato' } });
//     expect(searchInput).toHaveValue('potato');
//     fireEvent.click(ingredientRadioInput);
//     expect(ingredientRadioInput.checked).toBe(true);
//     fireEvent.click(searchButton);
//     expect(global.fetch).toBeCalled();
//     expect(global.fetch).toBeCalledWith(
//       'https://www.themealdb.com/api/json/v1/1/filter.php?i=potato',
//     );
//   });

//   it('Dispara alerta caso a pesquisa por primeira letra seja feita com mais de uma letra',
//     async () => {
//       renderWithRouter(<Meals />);
//       global.alert = jest.fn();
//       const searchInput = screen.getByTestId('search-input');
//       const firstLetterRadioInput = screen.getByLabelText('Primeira letra');
//       const searchButton = screen.getByText('Buscar');
//       fireEvent.change(searchInput, { target: { value: 'po' } });
//       expect(searchInput.value.length).toBe(2);
//       fireEvent.click(firstLetterRadioInput);
//       expect(firstLetterRadioInput.checked).toBe(true);
//       fireEvent.click(searchButton);
//       expect(window.alert).toBeCalledWith(
//         'Sua busca deve conter somente 1 (um) caracter',
//       );
//     });
// });

// describe('Requisito 15 - Testa se a página de drinks é renderizada', () => {
//   it('verifica página de drinks', () => {
//     renderWithRouter(<Meals />);
//     const ingredientSearch = screen.getByTestId('ingredient-search-radio');
//     const nameSearch = screen.getByTestId('name-search-radio');
//     const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
//     const searchButton = screen.getByTestId('exec-search-btn');
//     expect(ingredientSearch).toBeInTheDocument();
//     expect(nameSearch).toBeInTheDocument();
//     expect(firstLetterSearch).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//   });
// });

describe('Requisito 26 - Carregue as 12 primeiras receitas, uma em cada card', () => {
  it('Testa se há 12 cards renderizados na tela', async () => {
    renderWithRouter(<Meals />);
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const expectedRender = 12;
    expect(recipeCards.length).toBe(expectedRender);
  });
});

describe('Requisito 27 - Checa os botões para filtro por categoria', () => {
  it('Testa se há apenas cinco opções renderizadas(ou seis com opção All)', async () => {
    renderWithRouter(<Meals />);
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    const categoriesInputMinusAll = categoriesInput
      .filter((input) => input.value !== 'All');
    const expectedRender = 5;
    expect(categoriesInputMinusAll.length).toBe(expectedRender);
  });
});

describe('Requisito 28 - Checa se os botões para filtro funcionam corretamente', () => {
  beforeEach(() => {
    renderWithRouter(<Meals />);
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
    renderWithRouter(<Meals />);
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
    renderWithRouter(<Meals />);
  });
  it('Testa se dois botões sejam selecionados, apenas um tem o \'check\'', async () => {
    const categoriesInput = await screen.findAllByTestId(/-category-filter/i);
    userEvent.click(categoriesInput[1]);
    userEvent.click(categoriesInput[4]);
    const checkedInputs = categoriesInput.filter((category) => category.checked === true);
    expect(checkedInputs.length).toBe(1);
  });
  it('Testa se continua o mesmo resultado, se outro botão seja selecionado', async () => {
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
    renderWithRouter(<Meals />);
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
    const { history } = renderWithRouter(<Meals />);
    const recipeCards = await screen.findAllByTestId(/-recipe-card/i);
    const chosenCardIndex = 10;
    const chosenCard = String(recipeCards[chosenCardIndex].innerHTML);
    const chosenCardIdIndex = chosenCard.indexOf(' id=');
    const indexFinderAuxiliar = 5;
    const indexFinderSecondAuxiliar = 8;
    const chosenCardId = chosenCard[chosenCardIdIndex + indexFinderAuxiliar]
    + chosenCard[chosenCardIdIndex + indexFinderAuxiliar + 1]
    + chosenCard[chosenCardIdIndex + indexFinderSecondAuxiliar - 1]
    + chosenCard[chosenCardIdIndex + indexFinderSecondAuxiliar]
    + chosenCard[chosenCardIdIndex + indexFinderSecondAuxiliar + 1];
    userEvent.click(recipeCards[chosenCardIndex]);
    const { pathname } = history.location;
    expect(pathname).toBe(`/comidas/${chosenCardId}`);
  });
});
