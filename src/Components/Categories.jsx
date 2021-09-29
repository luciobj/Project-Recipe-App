import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/recipesContext';
import { fetchCategoriesFilteredResultsMeals,
  fetchCategoriesFilteredResultsDrinks } from '../services/fetchCategories';

export default function Categories(props) {
  const [categories, setCategories] = useState([{ strCategory: 'All' }]);
  const [loading, toggleLoading] = useState(true);
  const [filtered, setFiltered] = useState('');
  const { setMeals, setDrinks, setSearch } = useContext(RecipesContext);

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

  useEffect(() => {
    if (categories.length > 1) {
      toggleLoading(false);
    }
  }, [categories, toggleLoading]);

  const handleClick = ({ target }) => {
    const { value } = target;
    if (filtered === '' || filtered !== value) {
      setFiltered(value);
    } else if (filtered === value) {
      target.checked = false;
      setFiltered('');
    }
  };

  useEffect(() => {
    const { mealOrDrink } = props;
    if (mealOrDrink === 'meal') {
      fetchCategoriesFilteredResultsMeals(filtered)
        .then((result) => setMeals(result.meals));
      setSearch('');
    } else {
      fetchCategoriesFilteredResultsDrinks(filtered)
        .then((result) => setDrinks(result.drinks));
      setSearch('');
    }
  }, [props, filtered, setMeals, setDrinks, setSearch]);

  const maxRender = 6;
  return (
    <div>
      { loading ? <p>Carregando categorias</p>
        : <label htmlFor="categories">
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
            )).slice(0, maxRender)
          }
        </label> }
    </div>
  );
}

Categories.propTypes = {
  props: PropTypes.shape({ mealOrDrink: PropTypes.string }),
}.isRequired;
