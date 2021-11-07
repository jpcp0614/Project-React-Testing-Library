import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';
const PIKACHU = pokemons[0].name;
const TYPE_BUTTONS = 'pokemon-type-button';
const NEXT_POKEMON = 'next-pokemon';
const POKEMON_TYPE = 'pokemon-type';

describe('Requisito 5. Testa o componente Pokedex.js', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingEl = screen.getByRole('heading',
      { value: 2, name: /encountered pokémons/i });
    expect(headingEl).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon quando o botão é clicado', () => {
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();

    const pokemonName = screen.getByTestId(POKEMON_NAME);

    pokemons.forEach(({ name }, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonName.textContent).toBe(name);
        userEvent.click(btnNextPokemon);
        expect(pokemonName.textContent).toBe(PIKACHU);
      } else {
        expect(pokemonName.textContent).toBe(name);
        userEvent.click(btnNextPokemon);
      }
    });
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    const showSinglePokemon = screen.getAllByTestId(POKEMON_NAME);
    expect(showSinglePokemon).toHaveLength(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    const typeButtons = screen.getAllByTestId(TYPE_BUTTONS);

    typeButtons.forEach((button) => {
      expect(button).toBeInTheDocument(); // se todos os botões amarelos estão na tela

      const typeButton = screen.getByRole('button', { name: button.textContent });
      const pokemonsByType = pokemons.filter((pokemon) => ( // pokemons é do data
        pokemon.type === button.textContent // true
      ));

      userEvent.click(typeButton); // fire
      const nextPokemon = screen.getByTestId(NEXT_POKEMON);
      const pokemonName = screen.getByTestId(POKEMON_NAME);
      const pokemonType = screen.getByTestId(POKEMON_TYPE);

      pokemonsByType.forEach((pokemon) => { // forEach no array pokemonsByType
        expect(pokemon.type).toBe(button.textContent);
        expect(pokemonName.textContent).toBe(pokemon.name);
        expect(pokemonType.textContent).toBe(pokemon.type);
        userEvent.click(nextPokemon);
      });
    });

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeVisible();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    const currentPokemon = screen.getByTestId(POKEMON_NAME);
    expect(currentPokemon).toHaveTextContent(PIKACHU);
  });
});
