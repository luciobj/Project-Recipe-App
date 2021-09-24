import React from "react";
import { useHistory } from "react-router";

function Explore() {
  // ref pra usar o history em componentes funionais: https://www.codegrepper.com/code-examples/javascript/redirect+onclick+react
  let history = useHistory();

  const handleCLick = ({ target }) => {
    const { name } = target;
    history.push(`/explorar/${name}`);
  };

  return (
    <div>
      <button
        type="button"
        name="comidas"
        onClick={ handleCLick }
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>

      <button
        type="button"
        name="bebidas"
        onClick={ handleCLick }
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </div>
  );
}

export default Explore;
