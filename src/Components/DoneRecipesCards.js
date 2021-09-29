import React, { useState } from "react";
import { useHistory } from "react-router";
import shareIcon from "../images/shareIcon.svg";

function DoneRecipesCards() {
//   Estrutura de DoneRecipes no localStorage:
  const doneRecipes = [{
    id: 52771,
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '29/09/2021',
    tags: ['Pasta,Curry']
  }, 
  {
    id: 52768,
    type: 'comida',
    area: 'British',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Apple Frangipan Tart',
    image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    doneDate: '29/09/2021',
    tags: ['Tart,Baking,Fruity']
  },
  {
    id: 178339,
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'The Strange Weaver',
    image: 'https://www.thecocktaildb.com/images/media/drink/opxjzh1604179528.jpg',
    doneDate: '29/09/2021',
    tags: ['Classy']
  },
  {
    id: 12690,
    type: 'bebida',
    area: '',
    category: 'Other/Unknown',
    alcoholicOrNot: 'Alcoholic',
    name: 'Lassi - A South Indian Drink',
    image: 'https://www.thecocktaildb.com/images/media/drink/iq6scx1487603980.jpg',
    doneDate: '29/09/2021',
    tags: [],
    // FAZER REGRA PARA CASO ALGUMA DESSAS INFORMAÇÕES SEJAM NULL
  }];

  const [showCopyText, setShowCopyText] = useState(false);
  const history = useHistory();

  const copyRecipeLink = (type, id) => {
    const oneSecond = 1000;
    // ref para para copiar um texto pro clipboard: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setShowCopyText(true);

    setTimeout(() => {
      setShowCopyText(false);
    }, oneSecond)
  };

  // const doneRecipes = JSON.parse(localStorage.getItem("doneRecipes"));
  return (
    <div>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={`${index}-horizontal-image`}
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          />
          <p data-testid={`${index}-horizontal-top-text`}>{ recipe.category }</p>
          <h2
            data-testid={`${index}-horizontal-name`}
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
              { recipe.name }
          </h2>
          <p data-testid={`${index}-horizontal-done-date`}>{ recipe.doneDate }</p>
          <button type="button" data-testid={`${index}-horizontal-share-btn`}>
            <img 
              src={shareIcon}
              alt="Compartilhar receita"
              onClick={ () => copyRecipeLink(recipe.type, recipe.id) }
             />
          </button>
          { showCopyText && <span>Link copiado! </span> }
          <span data-testid={`${index}-${recipe.tags}-horizontal-tag`}>{ recipe.tags[0] }</span>
          <span data-testid={`${index}-${recipe.tags}-horizontal-tag`}>{ recipe.tags[1] }</span>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipesCards;
