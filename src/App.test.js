import React from 'react';
import App from './App';
import renderWithRouter from './utils/renderWithRouter';
import { screen } from '@testing-library/react';

// test('Farewell, front-end', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('82 - Test page of Profile App Recipes', () => {
  // it('Should exist logo Profile', () => {
  //   render(<App />);
  
  // });

  it('Should exist a title of page profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    const title = screen.getByText('Perfil');
    expect(title).toBeInTheDocument();
  });

  // it('Should exist a user email in the page profile', () => {
  //   render(<App />);
  // });

  // it('Should exist three buttons in the page profile', () => {
    
  // });

  // it('Should exist logo explore', () => {
  //   render(<App />);
  // });
});
