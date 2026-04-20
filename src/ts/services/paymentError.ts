export function initPaymentError() {
  const paymentSection = document.getElementById(
    "payment-method",
  ) as HTMLElement | null;

  const confirmButton = document.getElementById(
    "confirm-order-btn",
  ) as HTMLButtonElement | null;

  if (!paymentSection || !confirmButton) return;

  const paymentRadios = paymentSection.querySelectorAll(
    'input[type="radio"][name="payment"]',
  ) as NodeListOf<HTMLInputElement>;

  const errorMessage = paymentSection.querySelector(
    ".payment__error",
  ) as HTMLParagraphElement | null;

  // click on place order
  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    const isChecked = Array.from(paymentRadios).some((radio) => radio.checked);

    if (!isChecked) {
      // show error
      paymentSection.classList.add("payment--error");
      if (errorMessage) errorMessage.style.display = "block";
    }
  });

  // remove error when user selects a payment
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      paymentSection.classList.remove("payment--error");
      if (errorMessage) errorMessage.style.display = "none";
    });
  });
}
