import { CartItem } from '../../types';

interface CartProps {
  cart: CartItem[];
  onCheckout: () => void;
}

const CartRow = ({ title, quantity, price }: CartItem) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>${price}</td>
    </tr>
  );
};

const Cart = ({ cart, onCheckout }: CartProps) => {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ _id, title, quantity, price }) => (
            <CartRow
              key={_id}
              _id={_id}
              title={title}
              quantity={quantity}
              price={price}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">
              Total: ${total}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
