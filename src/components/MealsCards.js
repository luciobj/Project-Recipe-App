import React, {useContext} from "react";
import RecipesContext from '../context/recipesContext';

function MealsCards() {
    const { meals } = useContext(RecipesContext);

    if (meals === null) return global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    return(
        <div>
            {meals.map(({idMeal, strMealThumb, strMeal}, index) => {
                return <div 
                  data-testid={`${index}-recipe-card`}
                  key={idMeal}
                >
                    <img 
                    src={strMealThumb} 
                    alt={strMeal} 
                    data-testid={`${index}-card-img`}
                    />
                    <h3 data-testid={`${index}-card-name`}>{strMeal}</h3>
                </div>
            }).slice(0, 12)}
        </div>
    );
}

export default MealsCards;
