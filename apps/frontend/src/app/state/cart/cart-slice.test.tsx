import { useCartState } from './cart-slice';

describe('Cart Slice', () => {
  beforeEach(() => {
    useCartState.setState({ cartItems: new Map() });
  });

  test('should add a new item to the cart', () => {
    useCartState.getState().addCartItem('item-1');
    const state = useCartState.getState();
    expect(state.cartItems.get('item-1')?.quantity).toBe(1);
  });

  test('should increment quantity of an existing item', () => {
    useCartState.getState().addCartItem('item-1');
    useCartState.getState().addCartItem('item-1');
    const state = useCartState.getState();
    expect(state.cartItems.get('item-1')?.quantity).toBe(2);
  });

  test('should decrement quantity of an item', () => {
    useCartState.getState().addCartItem('item-1');
    useCartState.getState().addCartItem('item-1');
    useCartState.getState().removeCartItem('item-1');
    const state = useCartState.getState();
    expect(state.cartItems.get('item-1')?.quantity).toBe(1);
  });

  test('should remove item if quantity becomes 0', () => {
    useCartState.getState().addCartItem('item-1');
    useCartState.getState().removeCartItem('item-1');
    const state = useCartState.getState();
    expect(state.cartItems.has('item-1')).toBe(false);
  });

  test('should not throw if removing a non-existent item', () => {
    useCartState.getState().removeCartItem('item-999');
    const state = useCartState.getState();
    expect(state.cartItems.size).toBe(0);
  });
});
