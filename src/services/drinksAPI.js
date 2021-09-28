const API_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const API_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
// const ERROR_MESSAGE = 'Não foi possível realizar pesquisa';

export const fetchDrinkByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${API_INGREDIENT_URL}${ingredient}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchDrinkByName = async (name) => {
  try {
    const response = await fetch(`${API_NAME_URL}${name}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchDrinkByFirstLetter = async (firstLetter) => {
  try {
    const response = await fetch(`${API_LETTER_URL}${firstLetter}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error.message);
  }
};
