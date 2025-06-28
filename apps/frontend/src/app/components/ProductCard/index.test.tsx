import 'jest-styled-components';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { ProductCard, Props } from './index';
import theme from '../../styles/themes/default';

const props: Props = {
  product: {
    id: 'any_id',
    name: 'any_name',
    price: 2,
    category: 'any_category',
    imageUrl: 'any_url',
    stock: 10,
  },
  quantity: 0,
  inCart: false,
  onAddClick: jest.fn(),
  onRemoveClick: jest.fn(),
};

describe('ProductCard component', () => {
  const renderProductCard = ({
    product,
    quantity,
    inCart,
    onAddClick,
    onRemoveClick,
  }: Props) => {
    render(
      <ProductCard
        product={product}
        quantity={quantity}
        inCart={inCart}
        onAddClick={onAddClick}
        onRemoveClick={onRemoveClick}
      />,
      {
        wrapper: ({ children }) => (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ),
      }
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product name and hides quantity when not in cart', () => {
    renderProductCard({ ...props, quantity: 0, inCart: false });

    expect(screen.getByText(props.product.name)).toBeInTheDocument();
    expect(screen.queryByText(String(props.quantity))).toBeNull();
    expect(screen.queryByTestId('product-card-add-button')).toBeDefined();
    expect(screen.queryByTestId('product-card-remove-button')).toBeNull();
  });

  it('should render product with quantity and action buttons when in cart', () => {
    const quantity = 3;
    renderProductCard({ ...props, quantity, inCart: true });

    expect(screen.getByText(props.product.name)).toBeInTheDocument();
    expect(screen.getByText(String(quantity))).toBeVisible();
    expect(screen.getByTestId('product-card-add-button')).toBeVisible();
    expect(screen.getByTestId('product-card-remove-button')).toBeVisible();
  });

  it('should render call onAddClick when add button is clicked', () => {
    renderProductCard({ ...props, quantity: 1, inCart: true });

    fireEvent.click(screen.getByTestId('product-card-add-button'));

    expect(props.onAddClick).toHaveBeenCalledTimes(1);
  });

  it('should call onRemoveClick when remove button is clicked', () => {
    renderProductCard({ ...props, quantity: 1, inCart: true });

    fireEvent.click(screen.getByTestId('product-card-remove-button'));

    expect(props.onRemoveClick).toHaveBeenCalledTimes(1);
  });

  it('should not render image if imageUrl is empty', () => {
    renderProductCard({
      ...props,
      product: { ...props.product, imageUrl: ' ' },
    });

    expect(screen.queryByRole('img', { name: props.product.name })).toBeNull();
  });
});
