import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreButtons() {
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
            name="area"
            onClick={ handleCLick }
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </div>
      );
  }
}

export default ExploreButtons;