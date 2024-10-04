const montly = "api/montlyBest.json";
const montlyDiv = document.querySelector(".bestSelling");

async function getData() {
    const response = await fetch(montly);
    const data = await response.json();
    // console.log(data)
    displayMontlyDrinks(data.montlyBest);
    // console.log(data.montlyBest);
}

getData();

const displayMontlyDrinks = ((drinks) => {
    drinks.forEach((drink) => {

        const img = document.createElement("img");
        img.src = drink.imagePath;
        img.alt = drink.name;

        const name = document.createElement("p");
        name.textContent = drink.name;
        name.style.color = "#d14408";

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

        // cart icon
        // const card = document.createElement("img");
        // card.src = "images/cart.png";
        // card.alt = "cart icon";
        // card.title = "Add to cart";
        // card.style.cursor = "pointer";
        // card.classList.add("cart2");

        const montlyDrink = document.createElement("div");
        montlyDrink.classList.add("montlyDrink");
        const montlyText = document.createElement("div");
        montlyText.classList.add("montlyText");

        montlyText.appendChild(name);
        montlyText.appendChild(description);
        montlyText.appendChild(priceDiv);

        montlyDrink.append(img);
        montlyDrink.append(montlyText);

        montlyDiv.appendChild(montlyDrink);
        // montlyDiv.appendChild(card);
        // console.log(img.src)
})});
