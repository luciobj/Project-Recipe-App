import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/recipesContext';
import { fetchCategoriesFilteredResults,
  fetchCategoriesInitialResults } from '../services/fetchCategories';

export default function Categories(props) {
  const [categories, setCategories] = useState([{ strCategory: 'All' }]);
  const [loading, toggleLoading] = useState(true);
  const [initialResults, setInitialResults] = useState([]);
  const [filtered, setFiltered] = useState('');
  const { setMeals, setDrinks } = useContext(RecipesContext);

  useEffect(() => {
    const { mealOrDrink } = props;
    if (mealOrDrink === 'meal') {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json())
        .then((result) => setCategories((prevState) => [...prevState, ...result.meals]));
      fetchCategoriesInitialResults(mealOrDrink)
        .then((data) => setInitialResults(data.meals));
    } else if (mealOrDrink === 'drink') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((data) => data.json())
        .then((result) => setCategories((prevState) => [...prevState, ...result.drinks]));
      fetchCategoriesInitialResults(mealOrDrink)
        .then((data) => setInitialResults(data.drinks));
    }
  }, [props, setCategories]);

  useEffect(() => {
    if (categories.length > 1) {
      toggleLoading(false);
    }
  }, [categories, toggleLoading]);

  const handleClick = ({ target }) => {
    const { value } = target;
    const inputs = document.getElementsByName('categories');
    if (filtered === '') {
      setFiltered(value);
      for (let index = 0; index < inputs.length; index += 1) {
        if (inputs[index].value !== target.value) {
          inputs[index].disabled = true;
        }
      }
    } else {
      target.checked = false;
      setFiltered('');
      for (let index = 0; index < inputs.length; index += 1) {
        inputs[index].disabled = false;
      }
    }
  };

  useEffect(() => {
    const { mealOrDrink } = props;
    if (mealOrDrink === 'meal') {
      if (filtered === '' || filtered === 'All') {
        setMeals(initialResults);
      } else {
        fetchCategoriesFilteredResults(mealOrDrink, filtered)
          .then((result) => setMeals(result.meals));
      }
    } else {
      if (filtered === '' || filtered === 'All') {
        setDrinks(initialResults);
      } else {
        fetchCategoriesFilteredResults(mealOrDrink, filtered)
          .then((result) => setDrinks(result.drinks));
      }
    }
  }, [props, filtered, initialResults, setMeals, setDrinks]);

  const maxRender = 6;
  return (
    <div>
      { loading ? <p>Carregando categorias</p> : 
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
      }
    </div>
  );
}

Categories.propTypes = {
  mealOrDrink: PropTypes.shape({ mealOrDrink: PropTypes.string }),
}.isRequired;
