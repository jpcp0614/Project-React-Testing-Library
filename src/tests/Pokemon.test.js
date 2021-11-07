import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';
const CHARMANDER_NAME = pokemons[1].name;
const CHARMANDER_TYPE = pokemons[1].type;
const CHARMANDER_WEIGHT = 'Average weight: 8.5 kg';
const POKEMON_TYPE = 'pokemon-type';
const POKEMON_WEIGHT = 'pokemon-weight';
const POKEMON_LINK = '/pokemons/4';

describe('Requisito 6. Testa o componente Pokemon.js', () => {
  test('Verifica se é renderizado um card com informações do pokémon', () => {
    renderWithRouter(<App />);

    // card CHARMANDER
    const fireButton = screen.getByRole('button', { name: /fire/i });
    expect(fireButton).toBeInTheDocument();
    userEvent.click(fireButton);

    const pokemonName = screen.getByTestId(POKEMON_NAME);
    const pokemonType = screen.getByTestId(POKEMON_TYPE);
    const pokemonWeight = screen.getByTestId(POKEMON_WEIGHT);
    const pokemonImage = screen.getByRole('img', { name: /charmander sprite/i });

    expect(pokemonName.textContent).toBe(CHARMANDER_NAME);
    expect(pokemonType.textContent).toBe(CHARMANDER_TYPE);
    expect(pokemonWeight.textContent).toBe(CHARMANDER_WEIGHT);
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test('Verifica se o card do Pokémon indicado contém um link exibir detalhes', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toHaveAttribute('href', POKEMON_LINK);
  });

  test('Verifica se ao clicar em More Details, redireciona para detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(POKEMON_LINK);
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_LINK);

    const favPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favPokemon).toBeInTheDocument();
    userEvent.click(favPokemon);

    const favStar = screen.getByRole('img', { name: /charmander is marked as/i });
    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
