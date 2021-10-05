import React from 'react';

function FavoriteFilters(props) {
  const { text, onClick } = props;
  const types = ({
  'Todos': 'filter-by-all-btn' ,
  'Comidas': 'filter-by-food-btn',
  'Bebidas': 'filter-by-drink-btn',
  });
  const testidText = types[text];
  return (
    <button
      type="button"
      onClick={ onClick }
      name={ text }
      data-testid={ testidText }
    >
      { text }
    </button>
  );
};

export default FavoriteFilters;
