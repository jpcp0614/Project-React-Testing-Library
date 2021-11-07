import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3. Testa o componente FavoritePokemons.js', () => {
  test('Verifica se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const noFavPokemonsFound = screen.getByText(/no favorite pokemon found/i);
    expect(noFavPokemonsFound).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favCheckbox);

    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavPokemons);

    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const pokemonType = screen.getByTestId(/pokemon-type/i);
    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
