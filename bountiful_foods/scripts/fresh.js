const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json'

const getFruits = async()=>{
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data)
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

  const title = document.querySelector("#creationTitle");
  
  const selectedFruits = document.getElementById('selected-fruits');
  selectedFruits.innerHTML = '<h3>Selected Fruits:</h3>';
  if (checkedCheckboxes.length > 0) {
    title.innerHTML = 'Your Selection:'
  }

  if (checkedCheckboxes.length === 0) {
      selectedFruits.innerHTML = '';
      title.innerHTML = 'Create Your Drink!'
  } 

  let totalCarbohydrates = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCalories = 0;
  let totalSugar = 0;

  const selectedFruitsList = document.createElement('p');
  selectedFruits.appendChild(selectedFruitsList);

  if (checkedCheckboxes.length === 0) {
      // clear nutrition summary if no fruits are selected
      const nutritionSummary = document.getElementById('nutrition-summary');
      nutritionSummary.innerHTML = "You haven't chosen any fruits.";
      return;
  }

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
    <h2>Nutrition Summary:</h2>
    Total carbohydrates: ${totalCarbohydrates.toFixed(2)}g<br>
    Total protein: ${totalProtein.toFixed(2)}g<br>
    Total fat: ${totalFat.toFixed(2)}g<br>
    Total calories: ${totalCalories.toFixed(1)}kcal<br>
    Total sugar: ${totalSugar.toFixed(2)}g
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
        selectedFruits.textContent = '';
        const nutritionSummary = document.getElementById('nutrition-summary');
        nutritionSummary.innerHTML = '';

        function validateEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email);
        }

        let errorMessages = [];

        if (!firstName) {
            errorMessages.push("No name provided.");
        }
        if (!email) {
            errorMessages.push("No email provided.");
        }
        if (!validateEmail(email)) {
          errorMessages.push("The email provided is not valid.");
        }
        if (!phone) {
            errorMessages.push("No phone number provided.");
        }
        if (fruits.length === 0) {
            errorMessages.push("No fruits selected.");
        }

        if (errorMessages.length > 0) {
          const errorForm = document.createElement("h3")
          errorForm.textContent = "Form Incomplete";
          errorForm.style.color = "#c8221f";
          const errorMsg = document.createElement("p");
          errorMsg.style.color = "#c8221f";
          errorMsg.innerHTML = errorMessages.join("<br>");
          messageDiv.appendChild(errorForm);
          messageDiv.appendChild(errorMsg);
          messageDiv.style.display = 'block';
          // console.log(errorMessages.length);
          return;
        }

        const orderInfo = `
            <div class="orderTop">
              <h2>Order #${numDrinksOrdered} Information</h2>
              <p id="close">x</p>
            </div>
            <p class="orderConfir">Your drink has been ordered! You will receive an email confirmation shortly.</p>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Selected Fruits:</strong> ${Array.from(fruits).map(fruit => fruit.value).join(', ')}</p>
            <p><strong>Special Instructions:</strong> ${instructions}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>`;

        messageDiv.addEventListener("click", function(event) {
          if (event.target.id === "close") {
            messageDiv.style.display = "none";
          } 
        })

        messageDiv.style.display = 'block';
        messageDiv.innerHTML = `
            ${orderInfo}`;
    
        orderCount.innerHTML = `<p>You have ordered ${numDrinksOrdered} drinks.</p>`;
        resetBtn.addEventListener("click", function() {
            localStorage.setItem("numDrinksOrdered", 0);
            
            numDrinksOrdered = 0;
        });
    });
  
}
};


