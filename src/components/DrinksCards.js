import React, {useContext} from "react";
import RecipesContext from '../context/recipesContext';

function DrinksCards() {
    const { drinks } = useContext(RecipesContext);
    
    if (drinks === null) return global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    return(
        <div>
            {drinks.map(({idDrink, strDrinkThumb, strDrink}, index) => {
                return <div 
                  data-testid={`${index}-recipe-card`}
                  key={idDrink}
                >
                    <img 
                    src={strDrinkThumb} 
                    alt={strDrink} 
                    data-testid={`${index}-card-img`}
                    />
                    <h3 data-testid={`${index}-card-name`}>{strDrink}</h3>
                </div>
            }).slice(0, 12)}
        </div>
    );
}

export default DrinksCards;