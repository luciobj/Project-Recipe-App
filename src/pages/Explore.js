import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explore() {
  // ref pra usar o history em componentes funionais: https://www.codegrepper.com/code-examples/javascript/redirect+onclick+react
  const history = useHistory();

  const handleCLick = ({ target: { name } }) => history.push(`/explorar/${name}`);

  return (
    <div>
      <Header title="Explorar" containBtnSearch />
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
      <Footer />
    </div>
  );
}

export default Explore;
