import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCards() {
  const [showCopyText, setShowCopyText] = useState(false);
  const [filter, setFilter] = useState('all');
  // as informações serão obtidas do localStorage 👇
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const copyRecipeLink = (type, id) => {
    const oneSecond = 1000;
    // ref para para copiar um texto pro clipboard: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setShowCopyText(true);

    setTimeout(() => {
      setShowCopyText(false);
    }, oneSecond);
  };

  return (

    <div>
      <button
        type="button"
        name="all"
        onClick={ ({ target }) => setFilter(target.name) }
        data-testid="filter-by-all-btn"
      >
        Todas as receitas
      </button>
      <button
        type="button"
        name="comida"
        onClick={ ({ target }) => setFilter(target.name) }
        data-testid="filter-by-food-btn"
      >
        Comidas
      </button>
      <button
        type="button"
        name="bebida"
        onClick={ ({ target }) => setFilter(target.name) }
        data-testid="filter-by-drink-btn"
      >
        Bebidas
      </button>

      {doneRecipes === null && <p>Você ainda não tem receitas feitas</p>}

      {doneRecipes && doneRecipes.filter(({ type }) => (
        type.includes(filter) || filter === 'all'))
        .map((
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
          }, index,
        ) => (

          <div key={ id }>
            <Link to={ `/${type}s/${id}` }>
              <img
                style={ { width: '300px' } }
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { alcoholicOrNot || `${area} - ${category}` }
            </p>
            <Link to={ `/${type}s/${id}` }>
              <h3
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </h3>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Feita em:
              { doneDate }
            </p>
            <button type="button" onClick={ () => copyRecipeLink(type, id) }>
              <img
                src={ shareIcon }
                alt="Compartilhar receita"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { showCopyText && <span>Link copiado!</span> }
            <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{ tags[0] }</span>
            <span data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{ tags[1] }</span>
          </div>))}
    </div>
  );
}

export default DoneRecipesCards;
