const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
// const ERROR_MESSAGE = 'Não foi possível realizar pesquisa';

export const fetchRandomMeal = async () => {
  try {
    const response = await fetch(RANDOM_MEAL_URL);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchRandomDrink = async () => {
  try {
    const response = await fetch(RANDOM_DRINK_URL);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    throw new Error(error.message);
  }
};
