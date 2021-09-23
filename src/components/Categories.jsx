import React, { useState, useEffect } from 'react';

export default function Categories(mealOrDrink) {
  const [categories, setCategories] = useState([{ strCategory: 'All' }]);
  const [filtered, setFiltered] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (mealOrDrink === 'meal') {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json())
        .then((result) => setCategories((prevState) => [...prevState, ...result.meals]));
    } else if (mealOrDrink === 'drink') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json())
        .then((result) => setCategories((prevState) => [...prevState, ...result.drinks]));
    }
  }, [mealOrDrink, setCategories]);

  const handleClick = ({ target }) => {
    if (!disabled) {
      target.disabled = false;
      setDisabled(true);
      setFiltered(target.value);
    } else {
      setDisabled(false);
      target.disabled = disabled;
    }
  };

  const maxRender = 5;
  return (
    <div>
      <label htmlFor="categories">
        { categories && categories.map((category, index) => {
          if (index <= maxRender) {
            return (
              <div key={ category.strCategory }>
                { category.strCategory }
                <input
                  id="checkbox"
                  type="checkbox"
                  data-testid={ `${category.strCategory}-category-filter` }
                  value={ category.strCategory }
                  onClick={ handleClick }
                  disabled={ disabled }
                />
              </div>
            );
          }
        }) }
      </label>
      { filtered }
    </div>
  );
}
