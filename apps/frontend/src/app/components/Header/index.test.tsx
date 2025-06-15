import 'jest-styled-components';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { Header } from '../Header';
import theme from '../../styles/themes/default';

describe('Header (component)', () => {
  const renderHeader = () =>
    render(<Header />, {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      ),
    });

  it('should render input with correct placeholder', () => {
    renderHeader();

    const inputElement = screen.getByPlaceholderText(
      'Search for vegetables, fruits or meat.'
    );
    expect(inputElement).toBeInTheDocument();
  });

  it('should render the menu icon', () => {
    renderHeader();

    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  it('should render the shopping cart icon and badge count', () => {
    renderHeader();

    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();

    const badge = screen.getByText('12');
    expect(badge).toBeInTheDocument();
  });
});
