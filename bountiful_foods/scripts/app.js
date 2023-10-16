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

const fulldate = `${day}, ${date} ${month} ${year} `;

document.querySelector("#year").textContent = year;

const heroImg = "images/hero.png";

const section = document.getElementById("hero-section");
const placeholder = document.getElementById("hero-placeholder");

// Create a new image element and set the source to the actual image
const img = new Image();
img.src = heroImg; // Set the actual image source

// When the actual image is loaded, replace the section background image
img.onload = function () {
  section.style.backgroundImage = `url(${img.src})`;
  placeholder.style.display = "none"; // Hide the placeholder div
};