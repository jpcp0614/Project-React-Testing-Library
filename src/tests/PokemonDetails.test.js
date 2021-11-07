import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const POKEMON_LINK = '/pokemons/65';

describe('Requisito 7. Testa o componente PokemonDetails.js', () => {
  test('Verifica se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_LINK);

    // details ALAKAZAM
    const pokemonDetails = screen.getByRole('heading', { name: /alakazam details/i });
    const textSummary = screen.getByRole('heading', { name: /summary/i });
    const pokemonInfo = screen.getByText(/Closing both its eyes/i);

    expect(pokemonDetails).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });

  test('Verifica se existe os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_LINK);

    const locationTitle = screen.getByRole('heading',
      { name: /game locations of alakazam/i });
    const locationImg = screen.getByRole('img', { name: /alakazam location/i });
    const locationName = screen.getByText('Unova Accumula Town');

    expect(locationTitle).toBeInTheDocument();
    expect(locationName).toBeInTheDocument();
    expect(locationImg).toBeInTheDocument();
    expect(locationImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
  });

  test('Verifica se o usuário pode favoritar através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_LINK);

    const favChecked = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favChecked).toBeInTheDocument();
    userEvent.click(favChecked);
  });
});

// finalizado! Obrigado Valdenio!
