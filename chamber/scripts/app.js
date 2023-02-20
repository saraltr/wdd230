// creates the toggleMenu

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");

x.addEventListener("click", toggleMenu);

document.querySelector(
	"#lastModified"
).textContent = `Last Modification: ${document.lastModified}`;


//get date

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let d = new Date();
let year = d.getFullYear();
let time = d.getTime();
let day = days[d.getDay()];
let month = months[d.getMonth()];
let date = d.getDate();

const fulldate = `${day}, ${date} ${month} ${year} `

document.querySelector("#currentdate").textContent = fulldate;

document.querySelector(
	"#year"
).textContent = year;


if (day === "Monday" || day === "Tuesday"){
	const banner = document.querySelector(".banner");
	banner.style.display = "block"

	document.querySelector(".close").addEventListener("click", () => {
		banner.style.display = "none"
	}
	)
}
const visitsDisplay = document.querySelector("#visits");

let numVisits = Number(window.localStorage.getItem("visits-ls")); 

if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `This is your first visit!`;
}

// increment the number of visits.
numVisits++;
// store the new number of visits value
localStorage.setItem("visits-ls", numVisits);
