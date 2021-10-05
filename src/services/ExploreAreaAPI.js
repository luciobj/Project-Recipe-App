const AREA_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const MEAL_BY_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const fetchAreas = async () => {
  try {
    const response = await fetch(AREA_API_URL);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchMealByArea = async (area) => {
  if (area === 'All') {
    try {
      const response = await fetch(`${MEAL_BY_AREA_URL}American`);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    try {
      const response = await fetch(`${MEAL_BY_AREA_URL}${area}`);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
