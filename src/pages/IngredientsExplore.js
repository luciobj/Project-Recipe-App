import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientsCards from '../Components/IngredientsCards';

function IngredientsExplore() {
  return (
    <div>
      <Header title="Explorar Ingredientes" containBtnSearch />
      <IngredientsCards />
      <Footer />
    </div>
  );
}

export default IngredientsExplore;
