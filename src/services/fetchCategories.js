export const fetchCategoriesInitialResults = async (mealOrDrink) => {
  if(mealOrDrink === 'meal') {
    try {
      const resolve = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      const json = await resolve.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    try {
      const resolve = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      const json = await resolve.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const fetchCategoriesFilteredResults = async (mealOrDrink, category) => {
  if(mealOrDrink === 'meal') {
    try {
      const resolve = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const json = await resolve.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
      try {
      const resolve = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const json = await resolve.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};