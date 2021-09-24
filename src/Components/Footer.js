import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const index = () => (
  <footer className="footer" data-testid="footer">
    <div data-testid="drinks-bottom-btn" src={ drinkIcon }>
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="drink icon" />
      </Link>
    </div>
    <div data-testid="explore-bottom-btn" src={ exploreIcon }>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="explore icon" />
      </Link>
    </div>
    <div data-testid="food-bottom-btn" src={ mealIcon }>
      <Link to="/comidas">
        <img src={ mealIcon } alt="meal icon" />
      </Link>
    </div>
  </footer>
);

export default index;
