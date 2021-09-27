import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Categories(props) {
  const [categories, setCategories] = useState([{ strCategory: 'All' }]);
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    const { mealOrDrink } = props;
    if (mealOrDrink === 'meal') {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json())
        .then((result) => setCategories((prevState) => [...prevState, ...result.meals]));
    } else if (mealOrDrink === 'drink') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json())
        .then((result) => setCategories((prevState) => [...prevState, ...result.drinks]));
    }
  }, [props, setCategories]);

  const handleClick = ({ target }) => {
    const { value } = target;
    if (filtered === '') {
      setFiltered(value);
    } else if (value === filtered) {
      target.checked = false;
      setFiltered('');
    } else {
      target.checked = false;
      const xablau = document.getElementsByName('categories');
      for (let index = 0; index < xablau.length; index += 1) {
        if (xablau[index].value === filtered) {
          xablau[index].checked = true;
        }
      }
    }
  };

  const maxRender = 6;
  return (
    <div>
      <label htmlFor="categories">
        { categories && categories
          .map((category) => (
            <label htmlFor={ category.strCategory } key={ category.strCategory }>
              { category.strCategory }
              <input
                name="categories"
                id={ category.strCategory }
                type="radio"
                data-testid={ `${category.strCategory}-category-filter` }
                value={ category.strCategory }
                onClick={ handleClick }
              />
            </label>
          )).slice(0, maxRender) }
      </label>
      { filtered }
    </div>
  );
}

Categories.propTypes = {
  mealOrDrink: PropTypes.shape({ mealOrDrink: PropTypes.string }),
}.isRequired;
