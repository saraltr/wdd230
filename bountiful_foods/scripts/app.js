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

