export function initHamburgerMenu() {
  const btnHamburger = document.querySelector<HTMLElement>("#btn-hamburger");
  const body = document.body;
  const header = document.querySelector<HTMLElement>(".header");
  const fadeElems = document.querySelectorAll<HTMLElement>(".has-fade");

  // safety check
  if (!btnHamburger || !header) {
    throw new Error("Required DOM elements not found");
  }

  btnHamburger.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page jump
    console.log("click hamburger");

    const isOpen = header.classList.contains("open");

    if (isOpen) {
      // close hamburger menu
      body.classList.remove("noscroll");
      header.classList.remove("open");

      fadeElems.forEach((element) => {
        element.classList.remove("fade-in");
        element.classList.add("fade-out");
      });
    } else {
      // open hamburger menu
      body.classList.add("noscroll");
      header.classList.add("open");

      fadeElems.forEach((element) => {
        element.classList.remove("fade-out");
        element.classList.add("fade-in");
      });
    }
  });
}
