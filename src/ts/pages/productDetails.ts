import { loadProducts } from "../components/ProductCard";
import type { Product } from "../models/Product";
import { setupFavoriteIcon } from "../services/favorites";
import { addToCart } from "../cart/cart";

let currentQuantity = 1;
const qtyText = document.getElementById("quantity-text") as HTMLParagraphElement;

export const initProductDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  if (!productId) {
    console.log("Error: No productId in URL");
    return;
  }

  const products = await loadProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.log("Error: Product not found");
    return;
  }

  // back button will take you back to previous page
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.history.back();
    });
  }

  const favIcon = document.getElementById("fav-icon") as HTMLImageElement;
  if (favIcon) {
    // sets an initial image to icon
    setupFavoriteIcon(favIcon, productId);
  }

  const quantityBtnDec = document.getElementById("quantity-btn-dec") as HTMLButtonElement;
  const quantityBtnInc = document.getElementById("quantity-btn-inc") as HTMLButtonElement;
  quantityBtnDec.addEventListener("click", decreaseAmount);
  quantityBtnInc.addEventListener("click", increaseAmount);

  renderProductDetails(product);
  const addBtn = document.getElementById("add-to-cart-btn");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      for(let i = 0; i < currentQuantity; i++) {
        addToCart(product);
      }
    });
  }
};

const renderProductDetails = (product: Product): Product => {
  const title = document.getElementById("product-title") as HTMLHeadingElement;
  const img = document.getElementById("product-img") as HTMLImageElement;

  const text = document.getElementById(
    "product-description",
  ) as HTMLParagraphElement;

  // if product is licorice, only show name, otherwise also show variant
  if (product.category !== "licorice") {
    title.textContent = product.name + " - " + product.variant;
  } else {
    title.textContent = product.name;
  }

  img.src = product.image;
  img.alt = product.name + " - " + product.variant;

  text.textContent = product.description;

  return product;
};

const decreaseAmount = () => {
  // quantity can't go below 1
  if(currentQuantity > 1) {
    // if quantity is less than 11, removes 1 and puts 0 before number
    if(currentQuantity < 11) {
      currentQuantity--;
      qtyText.textContent = 0 + currentQuantity.toString();
      return;
    }
    currentQuantity--;
    qtyText.textContent = currentQuantity.toString();
  } 
};

const increaseAmount = () => {
  // quantity can't go over 99
  if(currentQuantity < 99) {
    // if quantity is less than 9, add 1 to qty and put 0 before number
    if(currentQuantity < 9) {
      currentQuantity++;
      qtyText.textContent = 0 + currentQuantity.toString();
      return;
    }
    currentQuantity++;
    qtyText.textContent = currentQuantity.toString();
  }
};
