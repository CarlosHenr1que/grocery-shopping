import 'jest-styled-components';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { Header } from '../Header';
import theme from '../../styles/themes/default';
import { useCartState } from '../../state/cart/cart-slice';

jest.mock('../../state/cart/cart-slice', () => ({
  useCartState: jest.fn(),
}));

const stateMock = {
  cartItems: new Map([
    ['item-1', { quantity: 5 }],
    ['item-2', { quantity: 7 }],
  ]),
};
describe('Header (component)', () => {
  beforeEach(() => {
    (useCartState as unknown as jest.Mock).mockReturnValue({
      ...stateMock,
    });
  });

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

    const badge = screen.getByText(String(stateMock.cartItems.size));
    expect(badge).toBeInTheDocument();
  });
});
