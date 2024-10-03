const drinksApi = "api/catalog.json";
const drinksContainer = document.querySelector(".drinks-display");

async function getData() {
    const response = await fetch(drinksApi);
    const data = await response.json();
    displayDrinks(data.drinks);
}

getData();

const displayDrinks = (drinks => {
    drinks.forEach((drink) => {
        // Create a container for each drink
        const drinkContainer = document.createElement("div");
        drinkContainer.classList.add("drink-container"); // Add a class for easier styling
        
        const img = document.createElement("img");
        img.src = drink.imagePath;
        img.alt = drink.name;

        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const text = document.createElement("div");
        text.textContent = drink.name;
        text.classList.add("catText");

        // Append elements
        overlay.appendChild(text);
        drinkContainer.appendChild(img);
        drinkContainer.appendChild(overlay);
        drinksContainer.appendChild(drinkContainer);
    });
});
