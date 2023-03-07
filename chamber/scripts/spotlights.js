const dataUrl = "api/data.json";
const spotlight1 = document.querySelector(".spotlight_1");
const spotlight2 = document.querySelector(".spotlight_2");
const spotlight3 = document.querySelector(".spotlight_3");

async function getData() {
  const response = await fetch(dataUrl);
  const data = await response.json();
  displayCompanies(data.companies);
}

function displayCompanies(companies) {
  const goldCompanies = companies.filter(
    (company) => company.statuts === "gold"
  );

  const randomCompanies = [];
  while (randomCompanies.length < 3 && goldCompanies.length > 0) {
    const randomIndex = Math.floor(Math.random() * goldCompanies.length);
    randomCompanies.push(goldCompanies[randomIndex]);
    goldCompanies.splice(randomIndex, 1);
  }

  const spotlights = [spotlight1, spotlight2, spotlight3];

  for (let i = 0; i < spotlights.length; i++) {
    const spotlight = spotlights[i];
    const company = randomCompanies[i];

    spotlight.querySelector("img").setAttribute("src", company.image);
    spotlight.querySelector("img").setAttribute("alt", company.imgAlt);
    spotlight.querySelector("img").setAttribute("loading", "lazy");
    spotlight.querySelector("figcaption").textContent = company.company;

    const address = document.createElement("p");
    address.textContent = `📍 ${company.adress}`;
    spotlight.appendChild(address);

    const phone = document.createElement("p");
    phone.textContent = `📞 ${company.phone}`;
    spotlight.appendChild(phone);
    phone.classList.add("phoneNum");

    const link = document.createElement("a");
    link.href = company.url;
    link.textContent = "Visit Website";
    link.setAttribute("target", "_blank");
    spotlight.appendChild(link);
  }
}

getData();
