import { loadProducts, renderProducts } from "../components/ProductCard";
import type { Product } from "../models/Product";
import { getFavorites } from "../services/favorites";

export const initProductPage = async () => {
  const products = await loadProducts();
  const params = new URLSearchParams(window.location.search);

  const filteredProducts = getFilteredProducts(products, params);

  const pageTitle = document.getElementById(
    "product-page-title"
  ) as HTMLElement;
  setPageTitle(pageTitle, params);

  renderProducts(filteredProducts);
};

const getFilteredProducts = (
  products: Product[],
  params: URLSearchParams
): Product[] => {
  const category = params.get("category");
  const isNew = params.get("isNew") === "true";
  const favorite = params.get("favorites") === "true";

  let filtered = products;

  // filter products based on parameter in url
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (isNew) {
    filtered = filtered.filter((p) => p.isNew);
  }
  if (favorite) {
    const favorites = getFavorites();
    filtered = filtered.filter((p) => favorites.includes(p.id));
  }

  // sort products so new products are shown first
  const sortedProducts = filtered.sort((a: Product, b: Product) => {
    if (a.isNew && !b.isNew) {
      return -1; // a is before b
    }

    if (!a.isNew && b.isNew) {
      return 1; // a is after b
    }

    return 0;
  });

  return sortedProducts;
};

export const setPageTitle = (
  pageTitleElem: HTMLElement,
  params: URLSearchParams
) => {
  const category = params.get("category");
  const isNew = params.get("isNew") === "true";
  const favorite = params.get("favorites") === "true";

  if (isNew) {
    pageTitleElem.textContent = "New arrivals";
  } else if (favorite) {
    pageTitleElem.textContent = "Favorites";
  } else if (category) {
    // capitalizes text and sets the title to category name
    pageTitleElem.textContent = category[0].toUpperCase() + category.slice(1);
  } else {
    pageTitleElem.textContent = "All products";
  }
};
