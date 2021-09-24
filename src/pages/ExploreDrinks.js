import React from 'react';

function ExploreDrinks() {
  return (
    <div>
           <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
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

export default ExploreDrinks;
