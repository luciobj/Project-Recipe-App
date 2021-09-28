import React from "react";
import { useHistory } from "react-router";
import shareIcon from "../images/shareIcon.svg";

function DoneRecipesCards() {
//   Estrutura de DoneRecipes no localStorage:
//   [{
//     id: id-da-receita,
//     type: comida-ou-bebida,
//     area: area-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]
  const history = useHistory();

  const doneRecipes = JSON.parse(localStorage.getItem("doneRecipes"));
  console.log(doneRecipes);
  return (
    <div>
      {doneRecipes.map((recipe, index) => (
        <div>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={`${index}-horizontal-image`}
          />
          <p data-testid={`${index}-horizontal-top-text`}>{ recipe.category }</p>
          <p data-testid={`${index}-horizontal-name`}>{ recipe.name }</p>
          <p data-testid={`${index}-horizontal-done-date`}>{ recipe.doneDate }</p>
          <button type="button" data-testid={`${index}-horizontal-share-btn`}>
            <img 
              src={shareIcon}
              alt="Compartilhar receita"
              onClick={ () => history.push(`/${recipe.type}/${recipe.id}`) }
             />
          </button>
          <span data-testid={`${index}-${recipe.tag}-horizontal-tag`}>{ recipe.tag }</span>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipesCards;
