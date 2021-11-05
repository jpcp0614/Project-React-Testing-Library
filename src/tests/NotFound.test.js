import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4. Testa o componente NotFound.js', () => {
  beforeEach(() => render(<NotFound />));
  test('Verifica se página contém um h2 com o texto Page requested not found 😭', () => {
    const headingEl = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(headingEl).toBeInTheDocument();
  });

  test('Verifica se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const imageEl = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(imageEl).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
