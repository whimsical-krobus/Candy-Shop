import type { CartItem } from "../models/CartItem";
import type { Product } from "../models/Product";
import { decrease, increase } from "../services/cartService";

export let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

// initialize cart
export const initCart = () => {
  const triggers = document.querySelectorAll(".cart-trigger");
  const miniCart = document.getElementById("mini-cart");

  if (!miniCart || triggers.length === 0) {
    return;
  }

  console.log(triggers.length);

  /* if (icon && miniCart) {
    icon.onclick = () => {
      miniCart.style.display =
        miniCart.style.display === "none" ? "block" : "none";
      renderMiniCart();
    };
  } 
  */

  // cart won't show from the start
  miniCart.style.display = "none";

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("trigger klickad");

      if (miniCart.style.display === "none") {
        miniCart.style.display = "block";
      } else {
        miniCart.style.display = "none";
      }

      renderMiniCart();
    });
  });

  updateCartBadge();
};

export const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: Product) => {
  let found = false;

  // loops through cart and checks if product id matches cart id
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      // add one to quantity
      cart[i].quantity++;
      found = true;
    }
  }

  // if product was not found, add product to cart with quantity: 1
  if (!found) {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartBadge();
  renderMiniCart();
};

// function to show number of items in cart
export const updateCartBadge = () => {
  const badges = document.querySelectorAll<HTMLElement>(".cart-badge");

  /* if (!badge) return;

  // if cart contains items: set display to block, otherwise none
  if (cart.length > 0) {
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  } */
  badges.forEach((badge) => {
    if (cart.length > 0) {
      badge.style.display = "block";
    } else {
      badge.style.display = "none";
    }
  });
};

export const renderMiniCart = () => {
  const list = document.getElementById("mini-cart-list");
  const sub = document.getElementById("mini-cart-subtotal");
  const total = document.getElementById("mini-cart-total");

  if (!list || !sub || !total) return;

  list.innerHTML = "";

  let sum = 0;

  // loops through cart and creates html for mini cart
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    sum += item.price * item.quantity;

    const li = document.createElement("li");

    const name = document.createElement("span");
    name.innerText = `${item.name} - ${item.price} SEK`;

    const minus = document.createElement("button");
    minus.innerText = "-";
    // calls decrease function which applies onclick on minus button
    decrease(minus, item, i, () => {
      updateCartBadge();
      renderMiniCart();
    });

    const qty = document.createElement("span");
    qty.innerText = item.quantity.toString();

    const plus = document.createElement("button");
    plus.innerText = "+";
    // calls increase function which applies onclick on plus button
    increase(plus, item, () => {
      updateCartBadge();
      renderMiniCart();
    });

    const remove = document.createElement("button");
    remove.innerText = "🗑";
    // adds onclick to remove-button, removes item from cart
    remove.onclick = () => {
      cart.splice(i, 1);
      saveCart();
      updateCartBadge();
      renderMiniCart();
    };

    li.appendChild(name);
    li.appendChild(minus);
    li.appendChild(qty);
    li.appendChild(plus);
    li.appendChild(remove);

    list.appendChild(li);
  }

  sub.innerText = sum.toString();
  total.innerText = sum.toString();
};
