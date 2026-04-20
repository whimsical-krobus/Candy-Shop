import { cart, saveCart } from "../cart/cart";
import { decrease, increase } from "../services/cartService";

// updates summary and shows subtotal and total
const updateSummary = (cart: any[]) => {
  let sum = 0;

  // iterates through the cart and adds price times quantity to sum
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price * cart[i].quantity;
  }

  // gets id for subtotal and total
  const sub = document.getElementById("summary-subtotal");
  const total = document.getElementById("summary-total");

  // shows sums as strings
  if (sub) {
    sub.innerText = sum.toString();
  }
  if (total) {
    total.innerText = sum.toString();
  }
};

export const renderCheckoutPage = () => {
  const cartSection = document.getElementById("checkout-cart");
  if (!cartSection) return;

  // removes old items but not the header
  const oldItems = cartSection.getElementsByClassName("cart__item");
  while (oldItems.length > 0) {
    oldItems[0].remove();
  }

  updateSummary(cart);

  // loops through cart and renders every item
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const row = document.createElement("div");
    row.className = "cart__item";

    const product = document.createElement("div");
    product.className = "cart__product";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "cart__image";

    const name = document.createElement("span");
    name.innerText = item.name;

    product.appendChild(img);
    product.appendChild(name);

    const price = document.createElement("span");
    price.innerText = item.price + " SEK";

    // quantity box
    const qtyBox = document.createElement("div");
    qtyBox.className = "cart__quantity";

    const minus = document.createElement("button");
    minus.innerText = "-";

    // calls function "decrease"
    // after doing everything in decrease, calls "renderCheckoutPage"
    decrease(minus, item, i, () => {
      renderCheckoutPage();
    });

    const qty = document.createElement("span");
    qty.innerText = item.quantity.toString(); // sets string to the quantity of the item

    const plus = document.createElement("button");
    plus.innerText = "+";

    // calls function "increase"
    // after doing everything in increase, calls "renderCheckoutPage"
    increase(plus, item, () => {
      renderCheckoutPage();
    });

    qtyBox.appendChild(minus);
    qtyBox.appendChild(qty);
    qtyBox.appendChild(plus);

    const subtotal = document.createElement("span");
    subtotal.innerText = item.price * item.quantity + " SEK";

    const remove = document.createElement("button");
    remove.className = "cart__remove";
    remove.innerText = "🗑";
    // on click removes item from cart
    remove.onclick = () => {
      cart.splice(i, 1);
      saveCart();
      renderCheckoutPage();
    };

    row.appendChild(product);
    row.appendChild(price);
    row.appendChild(qtyBox);
    row.appendChild(subtotal);
    row.appendChild(remove);

    cartSection.appendChild(row);
  }
};

// const confirmBtn = document.getElementById(
//   "confirm-order-btn",
// ) as HTMLButtonElement;

// if (confirmBtn) {
//   confirmBtn.addEventListener("click", () => {
//     // checks cart
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");

//     // if cart doesnt contain any items, gives an alert and returns
//     if (cart.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "address",
//       "country",
//       "city",
//       "zip",
//       "email",
//       "phone",
//     ];

//     // loops through required fields
//     for (let i = 0; i < requiredFields.length; i++) {
//       const input = document.getElementById(
//         requiredFields[i],
//       ) as HTMLInputElement;

//       // if there is no input in fields, gives an alert and returns
//       if (!input || input.value.trim() === "") {
//         alert("Please fill in all shipping details.");
//         return;
//       }
//     }

//     // removes cart from local storage and redirects to new page
//     localStorage.removeItem("cart");
//     window.location.href = "order-confirmation-page";
//   });
// }
