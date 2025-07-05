import { create, type StateCreator } from 'zustand';

type State = {
  cartItems: Map<string, { quantity: number }>;
};

type Actions = {
  addCartItem: (id: string) => void;
  removeCartItem: (id: string) => void;
};

export type CartSlice = State & Actions;

const initialState: State = {
  cartItems: new Map(),
};

const createCartSlice: StateCreator<CartSlice> = (set) => ({
  ...initialState,
  addCartItem: (id: string) =>
    set((state) => {
      const existing = state.cartItems.get(id);
      const updatedItems = new Map(state.cartItems);

      updatedItems.set(id, {
        quantity: existing ? existing.quantity + 1 : 1,
      });

      return { cartItems: updatedItems };
    }),
  removeCartItem: (id: string) =>
    set((state) => {
      const existing = state.cartItems.get(id);
      if (!existing) return state;

      const updatedItems = new Map(state.cartItems);

      if (existing.quantity > 1) {
        updatedItems.set(id, { quantity: existing.quantity - 1 });
      } else {
        updatedItems.delete(id);
      }

      return { cartItems: updatedItems };
    }),
});

export const useCartState = create<CartSlice>()(createCartSlice);
