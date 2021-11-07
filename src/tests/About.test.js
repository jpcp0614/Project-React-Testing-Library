import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2. Testa o componente About.js', () => {
  beforeEach(() => render(<About />));

  test('Verifica se a página contém 2 parágrafos com as informações da Pokédex', () => {
    const firstInfo = screen.getByText(/this application/i);
    const secondInfo = screen.getByText(/one can filter/i);
    expect(firstInfo).toBeInTheDocument();
    expect(secondInfo).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const headingEl = screen.getByRole('heading', { name: /about pokédex/i });
    expect(headingEl).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem de uma Pokédex', () => {
    const imgEl = screen.getByRole('img', { name: /pokédex/i });
    expect(imgEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
