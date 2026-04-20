// data used to auto-fill each input when focused
const autoFillData: Record<string, string> = {
  firstName: "Samwise",
  lastName: "Gamgee",
  address: "Bagshot Row 3",
  country: "The Shire",
  city: "Hobbiton",
  zip: "123 45",
  email: "whataboutsecondbreakfast@potatoes.com",
  phone: "+46 70 123 45 67",
};

// typing animation function for autofill
function typeText(input: HTMLInputElement, text: string, speed = 40) {
  let index = 0;
  input.value = ""; // clear the field bf typing

  const interval = setInterval(() => {
    input.value += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(interval); // stop typing when done
    }
  }, speed);
}

// main function to initialize the shipping form
export function initShippingForm() {
  // ensures the elements exist in the DOM
  const shippingForm = document.getElementById(
    "shipping-form",
  ) as HTMLElement | null;

  const confirmButton = document.getElementById(
    "confirm-order-btn",
  ) as HTMLButtonElement | null;

  // stop here if the form or button is missing
  if (!shippingForm || !confirmButton) return;

  const shippingInputs = shippingForm.querySelectorAll(
    "input[required]",
  ) as NodeListOf<HTMLInputElement>;

  // autofill logic, when user focuses on an input, it types in the value
  Object.entries(autoFillData).forEach(([id, value]) => {
    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) return;

    input.addEventListener("focus", () => {
      // remove red highlight immediately
      input.classList.remove("input--error");
      // only type if empty
      if (!input.value) {
        typeText(input, value);
      }
    });
  });

  // red highlight disappear as soon as the user starts typing
  shippingInputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("input--error");
    });
  });

  // validation on confirm button click
  confirmButton?.addEventListener("click", (event) => {
    event.preventDefault(); // prevents form submission / reload

    let hasErrors = false; // checks if input is empty

    shippingInputs.forEach((input) => {
      if (input.value.trim() === "") {
        // add red highlight if empty
        input.classList.add("input--error");
        hasErrors = true;
      } else {
        // remove highlight if filled
        input.classList.remove("input--error");
      }
    });
  });
}
