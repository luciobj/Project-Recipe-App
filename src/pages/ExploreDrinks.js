import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreDrinks() {
  const history = useHistory();

  const handleCLick = ({ target: { name } }) => history.push(`/explorar/bebidas/${name}`);
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
        name="area"
        onClick={ handleCLick }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreDrinks;
