import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRandomMeal, fetchRandomDrink } from '../Services/randomRecipeAPI';

function ExploreButtons() {
  const url = window.location.pathname.replace('/explorar/', '');
  const history = useHistory();

  const [randomMeal, setRandomMeal] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    const getRandomMeal = async () => {
      const data = await fetchRandomMeal();
      setRandomMeal(data);
    };
    getRandomMeal();
  }, []);

  useEffect(() => {
    const getRandomDrink = async () => {
      const data = await fetchRandomDrink();
      setRandomDrink(data);
    };
    getRandomDrink();
  }, []);

  const handleSurpriseClick = () => {
    if (url === 'comidas') history.push(`/${url}/${randomMeal[0].idMeal}`);
    if (url === 'bebidas') history.push(`/${url}/${randomDrink[0].idDrink}`);
  };

  const handleCLick = ({ target: { name } }) =>
    history.push(`/explorar/${url}/${name}`);

  if (url === 'comidas') {
    return (
      <div>
        <button
          type="button"
          name="ingredientes"
          onClick={handleCLick}
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          name="area"
          onClick={handleCLick}
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>

        <button
          type="button"
          name="surprise"
          onClick={handleSurpriseClick}
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }

  if (url === "bebidas") {
    return (
      <div>
        <button
          type="button"
          name="ingredientes"
          onClick={handleCLick}
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          name="surprise"
          onClick={handleSurpriseClick}
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

export default ExploreButtons;
