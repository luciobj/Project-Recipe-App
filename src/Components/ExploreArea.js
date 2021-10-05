import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';
import { fetchAreas, fetchMealByArea } from '../services/ExploreAreaAPI';

function ExploreArea() {
  const { areas, setAreas } = useContext(RecipesContext);
  const [selectedArea, setSelectedArea] = useState('All');
  const [mealsByArea, setMealsByArea] = useState([]);
  const MaxLength = 12;

  useEffect(() => {
    const getAreas = async () => setAreas(await fetchAreas());

    getAreas();
  }, [setAreas]);

  useEffect(() => {
    const getMealsByArea = async () => {
      setMealsByArea(await fetchMealByArea(selectedArea));
    };
    getMealsByArea();
  }, [setMealsByArea, selectedArea]);

  return (
    <div>
      <select
        name="area"
        onChange={ ({ target }) => setSelectedArea(target.value) }
        data-testid="explore-by-area-dropdown"
      >
        <option value="All" data-testid="All-option"> All </option>
        {areas.map(({ strArea }) => (
          <option
            key={ strArea }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            { strArea }
          </option>
        ))}
      </select>
      {mealsByArea && mealsByArea.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link key={ idMeal } to={ `/comidas/${idMeal}` }>
          <div
            key={ idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              style={ { width: '300px' } }
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>
              { strMeal }
            </h3>
          </div>
        </Link>
      )).slice(0, MaxLength)}
    </div>
  );
}

export default ExploreArea;
