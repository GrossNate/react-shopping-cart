import { CartItem } from '../../types';

interface CartRefreshAction {
  type: 'CART_REFRESH';
  payload: CartItem[];
}
interface CartAddItemAction {
  type: 'CART_ADD_ITEM';
  payload: CartItem;
}
interface CartCheckoutAction {
  type: 'CART_CHECKOUT';
}

type CartAction = CartCheckoutAction | CartRefreshAction | CartAddItemAction;

export const CartAction = {
  CartRefresh: (payload: CartItem[]): CartRefreshAction => ({
    type: 'CART_REFRESH',
    payload,
  }),
  CartAddItem: (payload: CartItem): CartAddItemAction => ({
    type: 'CART_ADD_ITEM',
    payload
  }),
  CartCheckout: (): CartCheckoutAction => ({type: 'CART_CHECKOUT'})
};

const cartReducer = (currentCart: CartItem[], action: CartAction) => {
  console.log("cart reducer called");
  const { type } = action;
  switch (type) {
    case 'CART_ADD_ITEM': {
      const { payload: newItem } = action;
      if (currentCart.some(({ _id }) => _id === newItem._id)) {
        return currentCart.map((cartItem) =>
          cartItem._id === newItem._id ? newItem : cartItem
        );
      }
      return [...currentCart, newItem];
    }
    case 'CART_CHECKOUT':
      return [];
    case 'CART_REFRESH':
      return action.payload;
    default:
      throw new Error('Cart reducer error.');
  }
};

export default cartReducer;
