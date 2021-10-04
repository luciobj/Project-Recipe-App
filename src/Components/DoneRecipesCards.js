import React, { useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

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
    // não entendi, mas o teste pede para que a data seja igual a 23/06/2020 🤔️
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: 178319,
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '20/09/2021',
    tags: [],
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
    tags: ['Tart', 'Baking', 'Fruity'],
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
  const [filter, setFilter] = useState('all');
  const history = useHistory();

  const copyRecipeLink = (type, id) => {
    const oneSecond = 1000;
    // ref para para copiar um texto pro clipboard: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setShowCopyText(true);

    setTimeout(() => {
      setShowCopyText(false);
    }, oneSecond);
  };

  const handleRedirect = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  // as informações serão obtidas do localStorage 👇
  // const doneRecipes = JSON.parse(localStorage.getItem("doneRecipes"));
  return (
    
    <div>
      <button
        type="button"
        name='all'
        onClick={ ({ target }) => setFilter(target.name) }
        data-testid="filter-by-all-btn"
      >
        Todas as receitas
      </button>
      <button
        type="button"
        name="comidas"
        onClick={ ({ target }) => setFilter(target.name) }
        data-testid="filter-by-food-btn"
      >
        Comidas
      </button>
      <button
        type="button"
        name="bebidas"
        onClick={ ({ target }) => setFilter(target.name) }
        data-testid="filter-by-drink-btn"
      >
        Bebidas
      </button>

      {doneRecipes.map((
        {
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        }, index) =>

          <div key={ id }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => handleRedirect(type, id) }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { alcoholicOrNot || `${area} - ${category}` }
            </p>
            <h3
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => handleRedirect(type, id) }
            >
              { name }
            </h3>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Feita em: 
              { doneDate }
            </p>
            <button type="button">
              <img
                src={ shareIcon }
                alt="Compartilhar receita"
                onClick={ () => copyRecipeLink(type, id) }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { showCopyText && <span>Link copiado!</span> }
            <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{ tags[0] }</span>
            <span data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{ tags[1] }</span>
          </div>)}
    </div>
  );
}

export default DoneRecipesCards;
