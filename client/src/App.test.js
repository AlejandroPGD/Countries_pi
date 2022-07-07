import { render, screen } from '@testing-library/react';
import App from './App';

test('debe tener un boton con el texto ingresar', () => {
  render(<App />);
  screen.debug()
  const linkElement = screen.getByRole('button', { class: /Ingresar/i })
  expect(linkElement).toBeInTheDocument();
});
