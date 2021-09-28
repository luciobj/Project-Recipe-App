import React, { useEffect, useState } from 'react';

const API_URL = 'www.themealdb.com/api/json/v1/1/list.php?i=list';

function IngredientsCards() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const results = await fetch(API_URL)
        .then((res) => res.json());
      console.log(results);
    }
    fetchIngredients();
  }, []);

  return (
    <div>
      { console.log(ingredients, setIngredients)}
    </div>
  );
}

export default IngredientsCards;
