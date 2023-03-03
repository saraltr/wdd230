const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
  //   console.table(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
  const cards = document.querySelector("div.cards"); // select the output container element

  prophets.forEach(
    (prophet) => {
      // Create elements to add to the div.cards element
      let card = document.createElement("section");
      let h2 = document.createElement("h2");
      let portrait = document.createElement("img");
      let birth = document.createElement("p");
      let birthPlace = document.createElement("p");
      let death = document.createElement("p");
      let servedYears = document.createElement("p");

      h2.textContent = `${prophet.name} ${prophet.lastname}`;
      birth.textContent = `Date of Birth: ${prophet.birthdate}`;
      birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
      servedYears.textContent = `Prophet Years: ${prophet.length}`;

      // Calculate the age of the prophet
      let age;
      if (prophet.death) {
        const birthDate = new Date(prophet.birthdate);
        const deathDate = new Date(prophet.death);
        age = deathDate.getFullYear() - birthDate.getFullYear();
        const months = deathDate.getMonth() - birthDate.getMonth();
        if (
          months < 0 ||
          (months === 0 && deathDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        death.textContent = `Died on: ${prophet.death}, at age ${age} years old`;
      } else {
        const birthDate = new Date(prophet.birthdate);
        const currentDate = new Date();
        age = currentDate.getFullYear() - birthDate.getFullYear();
        const months = currentDate.getMonth() - birthDate.getMonth();
        if (
          months < 0 ||
          (months === 0 && currentDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        death.textContent = `Current age: ${age} years old`;
      }

      // Build the image portrait by setting all the relevant attribute
      portrait.setAttribute("src", prophet.imageurl);
      portrait.setAttribute("alt", `Portait of ${prophet.name}`);
      portrait.setAttribute("loading", "lazy");
      portrait.setAttribute("width", "340");
      portrait.setAttribute("height", "440");

      // Append the section(card) with the created elements
      card.appendChild(h2);
      card.appendChild(birth);
      card.appendChild(birthPlace);
      card.appendChild(death);
      card.appendChild(servedYears);
      card.appendChild(portrait);

      cards.appendChild(card);
    } // end of forEach loop
  );
}; // end of function expression
