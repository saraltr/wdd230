const url = "api/data.json";
// const spotlight1 = document.querySelector(".spotlight_1");
// const spotlight2 = document.querySelector(".spotlight_2");
// const spotlight3 = document.querySelector(".spotlight_3");

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  displayCompanies(data.companies);
}

function displayCompanies(companies) {
  const goldCompanies = companies.filter(
    (company) => company.status === "gold"
  );
  const spotlight1 = document.querySelector(".spotlight_1");
  const spotlight2 = document.querySelector(".spotlight_2");
  const spotlight3 = document.querySelector(".spotlight_3");

  [spotlight1, spotlight2, spotlight3].forEach((spotlight) => {
    const goldCompany =
      goldCompanies[Math.floor(Math.random() * goldCompanies.length)];

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = goldCompany.image;
    img.alt = goldCompany.imgAlt;
    img.setAttribute("width", "340");
    img.setAttribute("loading", "lazy");
    card.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = goldCompany.company;
    card.appendChild(name);

    const address = document.createElement("p");
    address.textContent = `📍 ${goldCompany.adress}`;
    card.appendChild(address);

    const phone = document.createElement("p");
    phone.textContent = `📞 ${goldCompany.phone}`;
    card.appendChild(phone);

    const link = document.createElement("a");
    link.href = goldCompany.url;
    link.textContent = "Visit Website";
    link.setAttribute("target", "_blank");
    card.appendChild(link);

    spotlight.appendChild(card);
  });
}
