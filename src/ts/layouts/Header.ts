import { initCart } from "../cart/cart";
import { initHamburgerMenu } from "../components/HamburgerMenu";
import { initProductDetails } from "../pages/productDetails";
import { initProductPage } from "../pages/productPage";

export const initHeader = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("/header.html");
      const html = await res.text();

      const header = document.getElementById("header");
      if (header) {
        header.innerHTML = html;
        
        // init cart + mini cart
        initCart();
        
        // menu
        initHamburgerMenu();
        
        // product page
        if (document.getElementById("product-page")) {
          initProductPage();
        }
        
        // product details page
        if (document.getElementById("details-page")) {
          initProductDetails();
        }
        
      }
    } catch (err) {
      console.error("Header load failed:", err);
    }
  });
}