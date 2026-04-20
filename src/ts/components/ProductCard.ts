import type { Product } from "../models/Product";
import { setupFavoriteIcon } from "../services/favorites";
import { addToCart } from "../cart/cart";

const grid = document.getElementById("item-grid") as HTMLElement;

// load in products
export const loadProducts = async (): Promise<Product[]> => {
  const response = await fetch("/data/products.json");
  const data = await response.json();
  console.log(response.ok, response.status);

  return data.products;
};

export const renderProducts = (products: Product[]) => {
  // empty products
  grid.innerHTML = "";

  products.forEach((product) => {
    grid.append(createProductCard(product));
  });
};

const createProductCard = (product: Product): HTMLElement => {
  // create elements and set classes
  const card = document.createElement("article");
  card.className = "card flex flex-ai-c";

  const cardDiv = document.createElement("div");
  cardDiv.className = "detail-container flex flex-jc-sb";

  const cardImg = document.createElement("img");
  cardImg.className = "card__img";
  cardImg.src = product.image;
  cardImg.alt = product.name + " - " + product.variant;
  cardImg.dataset.productId = product.id; // give img data attribute which points to product id

  // if you click img, redirects you to details page with correct id
  cardImg.addEventListener("click", () => {
    window.location.href = `/product-details-page.html?productId=${product.id}`;
  });

  const cardTitle = document.createElement("h3");
  cardTitle.className = "card__title";

  // if product is a licorice, only shows name, otherwise both name and variant are shown
  if (product.category !== "licorice") {
    cardTitle.textContent = product.name + " - " + product.variant;
  } else {
    cardTitle.textContent = product.name;
  }

  const cardPrice = document.createElement("p");
  cardPrice.className = "card__price";
  cardPrice.textContent = `${product.price} kr`;

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container flex";

  const btn = document.createElement("button");
  btn.className = "card__btn cart-btn cart-btn--primary";
  btn.textContent = "Add to cart";

  btn.addEventListener("click", () => {
  addToCart(product);
});

  const btnImg = document.createElement("img");
  btnImg.src = "/img/icon_ShoppingCartSimple.svg";
  btnImg.alt = "Shopping cart";

  const favIcon = document.createElement("img");
  favIcon.className = "favorite";
  favIcon.src = "/img/icon_wishlist_deafult.svg";
  favIcon.alt = "Favorite icon";
  setupFavoriteIcon(favIcon, product.id);

  btn.appendChild(btnImg);
  btnContainer.append(btn, favIcon);

  cardDiv.append(cardTitle, cardPrice, btnContainer);
  card.append(cardImg, cardDiv);

  // if product is new, add span element with text "New"
  if (product.isNew) {
    const newSpan = document.createElement("span");
    newSpan.className = "new";
    newSpan.textContent = "New";
    card.append(newSpan);
  }

  return card;
};
