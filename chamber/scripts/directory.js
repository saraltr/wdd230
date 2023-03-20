const url = "api/data.json";

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#container");

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  displayCompanies(data.companies);
}

function displayCompanies(companies) {
  const container = document.querySelector("#container");

  companies.forEach((company) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = company.image;
    img.alt = company.imgAlt;
    img.setAttribute("width", "340");
    img.setAttribute("loading", "lazy");
    card.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = company.company;
    card.appendChild(name);

    const address = document.createElement("p");
    address.textContent = `📍 ${company.adress}`;
    card.appendChild(address);

    const phone = document.createElement("p");
    phone.textContent = `📞 ${company.phone}`;
    card.appendChild(phone);

    const link = document.createElement("a");
    link.href = company.url;
    link.textContent = "Visit Website";
    link.setAttribute("target", "_blank");
    card.appendChild(link);

    container.appendChild(card);
  });
}

function displayCompaniesAsTable(companies) {
  const container = document.querySelector("#container");

  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
  const headerNames = ["Company", "Address", "Phone", "Website"];

  headerNames.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  companies.forEach((company) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = company.company;
    row.appendChild(nameCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = company.adress;
    row.appendChild(addressCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = company.phone;
    row.appendChild(phoneCell);

    const linkCell = document.createElement("td");
    const link = document.createElement("a");
    link.href = company.url;
    link.textContent = "Visit Website";
    link.setAttribute("target", "_blank");
    linkCell.appendChild(link);
    row.appendChild(linkCell);

    table.appendChild(row);
  });

  container.appendChild(table);
}

gridbutton.addEventListener("click", () => {
  displayCompanies(JSON.parse(localStorage.getItem("companies")));
  display.classList.remove("list");
  display.classList.add("grid");
});

// listbutton.addEventListener("click", () => {
//   const companies = JSON.parse(localStorage.getItem("companies"));
//   displayCompaniesAsTable(companies);
//   display.classList.remove("grid");
//   display.classList.add("list");
// });

(async function () {
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem("companies", JSON.stringify(data.companies));
  displayCompanies(data.companies);
})();