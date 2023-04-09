const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json'

const getFruits = async()=>{
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            displayResults(data);
          } else {
              throw Error(await res.text());
          }

    } catch (error) {
    console.log(error);
    }
    
}
getFruits();

function displayResults(data) {
  const fruitsFieldset = document.getElementById('fruits');
  fruitsFieldset.addEventListener('click', selectedFruits);

  for (let i = 0; i < data.length; i++) {
    const fruit = data[i];
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'fruit';
    checkbox.value = fruit.name;

    const label = document.createElement('label');
    label.textContent = fruit.name;

    fruitsFieldset.appendChild(checkbox);
    fruitsFieldset.appendChild(label);
  }

function selectedFruits() {
  const checkboxes = fruitsFieldset.querySelectorAll('input[type="checkbox"]');
  const checkedCheckboxes = fruitsFieldset.querySelectorAll('input[type="checkbox"]:checked');
  
  if (checkedCheckboxes.length >= 3) {
    for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        checkboxes[i].disabled = true;
      }
    }
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].disabled = false;
    }
  }
  
  const selectedFruits = document.getElementById('selected-fruits');
  selectedFruits.innerHTML = ''; 

  let totalCarbohydrates = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCalories = 0;
  let totalSugar = 0;

  const selectedFruitsList = document.createElement('p');
  selectedFruits.appendChild(selectedFruitsList);

  for (let i = 0; i < checkedCheckboxes.length; i++) {
    const fruitName = checkedCheckboxes[i].value;
    const selectedFruit = document.createElement('li');
    selectedFruit.textContent = fruitName;
    selectedFruitsList.appendChild(selectedFruit);

    const fruit = data.find(fruit => fruit.name === fruitName);
    totalCarbohydrates += fruit.nutritions.carbohydrates;
    totalProtein += fruit.nutritions.protein;
    totalFat += fruit.nutritions.fat;
    totalCalories += fruit.nutritions.calories;
    totalSugar += fruit.nutritions.sugar;
  }

  const nutritionSummary = document.getElementById('nutrition-summary');
  nutritionSummary.innerHTML = `
    Total carbohydrates: ${totalCarbohydrates.toFixed(1)}g<br>
    Total protein: ${totalProtein.toFixed(1)}g<br>
    Total fat: ${totalFat.toFixed(1)}g<br>
    Total calories: ${totalCalories.toFixed(1)} kcal<br>
    Total sugar: ${totalSugar.toFixed(1)}g
  `;
  
    const form = document.getElementById('drink-form');
    const messageDiv = document.getElementById('submit-message');
    const orderCount = document.getElementById('order-count');
    let numDrinksOrdered = parseInt(localStorage.getItem("numDrinksOrdered")) || 0;
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        numDrinksOrdered++;
        document.cookie = `numDrinksOrdered=${numDrinksOrdered}`;
        localStorage.setItem("numDrinksOrdered", numDrinksOrdered);

        const firstName = document.getElementById('first-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const fruits = document.querySelectorAll('#fruits input[type="checkbox"]:checked');
        const instructions = document.querySelector('textarea[name="userText"]').value;

        const orderInfo = `
            <p>Your drink has been ordered. You will receive an email confirmation shortly.</p>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Selected Fruits:</strong> ${Array.from(fruits).map(fruit => fruit.value).join(', ')}</p>
            <p><strong>Special Instructions:</strong> ${instructions}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>`;

        messageDiv.style.display = 'block';
        messageDiv.innerHTML = `
            <h2>Order Information</h2>
            ${orderInfo}`;
    
        orderCount.innerHTML = `<p>You have ordered ${numDrinksOrdered} drinks.</p>`;
        resetBtn.addEventListener("click", function() {
            localStorage.setItem("numDrinksOrdered", 0);
            
            numDrinksOrdered = 0;

        });
    });
  
}
};


