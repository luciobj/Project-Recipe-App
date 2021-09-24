import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRandomMeal, fetchRandomDrink } from '../Services/randomRecipeAPI'

function ExploreButtons() {
  const [randomMeal, setRandomMeal] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);

  const getRandomMeal = async () => {
    const data = await fetchRandomMeal();
    setRandomMeal(data);
  } 

  const getRandomDrink = async () => {
    const data = await fetchRandomDrink();
    setRandomDrink(data);
  }
  
  const handleSurpriseClick = () => {
    if (url === 'comidas') getRandomMeal();
    if (url === 'bebidas') getRandomDrink();
  }

  const url = window.location.pathname.replace('/explorar/', '');
  const history = useHistory();

  const handleCLick = ({ target: { name } }) => history.push(`/explorar/${url}/${name}`);

  if (url === 'comidas') {
      return(
        <div>
        <button
          type="button"
          name="ingredientes"
          onClick={ handleCLick }
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
  
        <button
          type="button"
          name="area"
          onClick={ handleCLick }
          data-testid="explore-by-area">
            Por Local de Origem
        </button>
  
        <button 
          type="button"
          name="surprise"
          onClick={ handleSurpriseClick }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      );
  }
  
  if (url === 'bebidas') {
      return (
        <div>
         <button
            type="button"
            name="ingredientes"
            onClick={ handleCLick }
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
    
          <button 
            type="button"
            name="surprise"
            onClick={ handleSurpriseClick }
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </div>
      );
  }
}

export default ExploreButtons;