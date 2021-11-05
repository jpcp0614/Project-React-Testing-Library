import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1. Testa o componente App.js', () => {
  test('Verifica os links Home, About e Favorite Pokémon\'s estão na tela', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPokemons).toBeInTheDocument();
  });

  test('Verifica se, ao clicar no link Home, redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se, ao clicar no link About, redireciona para a página about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica se, ao clicar no link Favorite, redireciona para favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavPokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se redireciona para a página Not Found - URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    expect(history.location.pathname).toBe('/not-found');

    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
