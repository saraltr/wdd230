const cookies = document.cookie.split(';');
let numDrinksOrdered = 0;
for (const cookie of cookies) {
  const [name, value] = cookie.trim().split('=');
  if (name === 'numDrinksOrdered') {
    numDrinksOrdered = parseInt(value);
    break;
  }
}

const drinks = document.getElementById("order-count");

drinks.textContent = numDrinksOrdered;