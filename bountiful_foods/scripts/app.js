function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const btn = document.getElementById("hamburgerBtn");

btn.addEventListener("click", toggleMenu);

document.querySelector(
  "#lastModified"
).textContent = `Last Modification: ${document.lastModified}`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let d = new Date();
let year = d.getFullYear();
let time = d.getTime();
let day = days[d.getDay()];
let month = months[d.getMonth()];
let date = d.getDate();
// console.log(day);

const fulldate = `${day}, ${date} ${month} ${year} `;

document.querySelector("#year").textContent = year;

const heroImg = "images/hero.png";

const section = document.getElementById("hero-section");
const placeholder = document.getElementById("hero-placeholder");

// create a new image element and set the source to the actual image
const img = new Image();
img.src = heroImg; // set the actual image source

// when the actual image is loaded, replace the section background image
img.onload = function () {
  section.style.backgroundImage = `url(${img.src})`;
  placeholder.style.display = "none"; // Hide the placeholder div
};

// drink of the day
const specials = "api/specials.json";
const drinksDiv = document.querySelector(".drinkContainer");

const todays = document.querySelector("#today");
todays.textContent = `${day}'s Special`;

async function getData() {
  const response = await fetch(specials);
  const data = await response.json();
  
  if (day === "Monday") {
    displayDrinkOfTheDay(data.fruitDrinks[0]);
  } else if (day === "Tuesday") {
    displayDrinkOfTheDay(data.fruitDrinks[1]);
  } else if (day === "Wednesday") {
    displayDrinkOfTheDay(data.fruitDrinks[2]);
  } else if (day === "Thursday" || day === "Saturday") {
    displayDrinkOfTheDay(data.fruitDrinks[3]);
  } else if (day === "Friday" || day == "Sunday") {
    displayDrinkOfTheDay(data.fruitDrinks[4]);
  }
}

getData();

function displayDrinkOfTheDay(drink) {

  // drinks.forEach((drink) => {

  // drinks of the day img
    const img = document.createElement("img");
    img.src = drink.imagePath;
    img.alt = drink.name;

    // drinks content div (description, price, rating, nb of votes)
    const drinkCont = document.createElement("div");
    drinkCont.classList.add("drinkText");

    // title
    const drinkTitle = document.createElement("h3");
    drinkTitle.textContent = drink.name
    drinkTitle.style.color = "#d14408";

    // description
    const description = document.createElement("p");
    description.textContent = drink.description;
    description.style.color = "black";

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("priceDiv");
    // normal price
    const price = document.createElement("p");
    price.innerHTML = `$${drink.regularPrice}`;
    price.style.color = "#d14408"
    price.style.fontSize = "smaller";
    price.style.textDecoration = "line-through";

    // special day price
    const newPrice = document.createElement("p");
    newPrice.innerHTML = `$${drink.specialPrice}`;
    newPrice.style.color = "#289946";
    newPrice.style.fontSize = "larger";

    // price div
    priceDiv.appendChild(newPrice);
    priceDiv.appendChild(price);

    // rating stars
    const rating = drink.clientRating;

    // rating Div for the stars
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    // num of ratings
    const ratingsNumb = document.createElement("p");
    ratingsNumb.setAttribute("id", "numb")
    ratingsNumb.innerHTML = `${drink.numberOfVotes} ratings`;
    ratingsNumb.style.fontSize = "smaller";
    ratingsNumb.style.color = "#d14408";

    // function to generate star images based on the rating
    const displayRatingStars = (rating, div) => {

      const totalStars = 5; // Total number of stars
      const fullStars = Math.floor(rating); // number of full stars
      const hasHalfStar = rating % 1; // get the fractional part of the rating

      for (let i = 0; i < fullStars; i++) {
        const starImage = document.createElement("img");
        starImage.src = "images/filled.png"; // use the filled star image
        starImage.alt = "Filled Star";
        div.appendChild(starImage);
      }

      if (hasHalfStar) {
        const starImage = document.createElement("img");
        starImage.src = "images/middle.png"; // use the half-filled star image
        starImage.alt = "Half-Filled Star";
        div.appendChild(starImage);
      }

      for (let i = 0; i < totalStars - fullStars - (hasHalfStar ? 1 : 0); i++) {
        const starImage = document.createElement("img");
        starImage.src = "images/empty.png"; // use the empty star image for the remaining stars
        starImage.alt = "Empty Star";
        div.appendChild(starImage);
      }
    }
    
    displayRatingStars(rating, ratingDiv);

    // cart icon
    const card = document.createElement("img");
    card.src = "images/cart.png";
    card.alt = "cart icon";
    card.title = "Add to cart";
    card.style.cursor = "pointer";
    card.classList.add("cart");

    // add els to the content div
    drinkCont.append(description);
    drinkCont.appendChild(priceDiv);
    drinkCont.appendChild(ratingDiv);
    drinkCont.appendChild(card);
    drinkCont.appendChild(ratingsNumb);

    // add els to the div
    drinksDiv.append(img);
    drinksDiv.append(drinkTitle);
    drinksDiv.append(drinkCont);
  // })
};