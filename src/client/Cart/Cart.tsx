import CartItem from './CartItem/CartItem';
import Button from '@material-ui/core/Button';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  handlePurchase: () => void;
  purchaseSuccessful: boolean;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handlePurchase, purchaseSuccessful }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>

      {purchaseSuccessful ? <p>Purchase Successful!! </p> : null }

      {cartItems.length === 0 ? null : <Button onClick={() => handlePurchase()} variant="contained">Purchase</Button>}

    </Wrapper>
  );
};

export default Cart;
