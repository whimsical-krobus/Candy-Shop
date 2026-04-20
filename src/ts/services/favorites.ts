const favoritesKey = "favorites";

// get stored favorites from local storage
export const getFavorites = (): string[] => {
  const data = localStorage.getItem(favoritesKey);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

// check if product is favorite already
export const isFavorite = (productId: string): boolean => {
  // checks if array from getFavorites function includes this productId
  return getFavorites().includes(productId);
};

export const toggleFavorite = (productId: string) => {
  const favorites = getFavorites();

  // if product is favorited, remove it from favorite list
  if (favorites.includes(productId)) {
    // create empty array
    const updatedFavorites = [];

    // if product in "favorites" id doesnt match the product id, put it in the new list
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] !== productId) {
        updatedFavorites.push(favorites[i]);
      }
    }

    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  } else {
    // if the product is not favorited, add it to favorite list
    favorites.push(productId);

    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  }
};

export const initFavorites = () => {
  // get all hearts on the page
  const favIcons = document.querySelectorAll<HTMLImageElement>(".favorite");

  favIcons.forEach((favIcon) => {
    const productId = favIcon.dataset.productId;
    if (!productId) return;
    setupFavoriteIcon(favIcon, productId);
  });
};

const updateFavoriteIcon = (favIcon: HTMLImageElement, productId: string) => {
  if (isFavorite(productId)) {
    favIcon.src = "/img/icon_wishlist_filled.svg";
  } else {
    favIcon.src = "/img/icon_wishlist_deafult.svg";
  }
};

export const setupFavoriteIcon = (
  favIcon: HTMLImageElement,
  productId: string
) => {
  updateFavoriteIcon(favIcon, productId);

  favIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // stops click from triggering card
    toggleFavorite(productId);
    updateFavoriteIcon(favIcon, productId);
  });
};
