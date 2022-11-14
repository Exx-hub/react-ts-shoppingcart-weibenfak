import CartItem from "../cartItem/CartItem";
import { Wrapper } from "./ShoppingCart.styles";

import { Product } from "../../App";

type ShoppingCartProps = {
  cartItems: Product[];
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};

const ShoppingCart = (props: ShoppingCartProps) => {
  const { cartItems, addToCart, removeFromCart } = props;

  const calculateTotal = (items: Product[]) =>
    items.reduce((acc: number, item) => acc + item.qty * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default ShoppingCart;
