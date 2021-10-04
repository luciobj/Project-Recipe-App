import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ExploreButtons from '../Components/ExploreButtons';

const ExploreMeals = () => (
  <div>
    <Header title="Explorar Comidas" containBtnSearch />
    <ExploreButtons />
    <Footer />
  </div>
);

export default ExploreMeals;
