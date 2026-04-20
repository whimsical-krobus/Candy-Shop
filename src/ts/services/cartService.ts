import { cart, saveCart } from "../cart/cart";
import type { CartItem } from "../models/CartItem";

export const decrease = (
  btn: HTMLButtonElement,
  item: CartItem,
  index: number,
  afterClick: () => void,
) => {
  btn.onclick = () => {
    item.quantity--;
    // if quantity is less than or 0, removes item from cart
    if (item.quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    // executes callback function
    afterClick();
  };
};

export const increase = (
  btn: HTMLButtonElement,
  item: CartItem,
  afterClick: () => void,
) => {
  btn.onclick = () => {
    item.quantity++;
    saveCart();
    // executes callback function
    afterClick();
  };
};
