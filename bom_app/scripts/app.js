// Instructions 

// Create three variables that hold references to the input, button, and list elements using const.

const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

// Create an click event listener for the Add Chapter button using addEventListener and an anonymous function.  

button.addEventListener("click", () => {
    // make sure the input is not blank before doing the following remaining tasks in this list

    // the value will only be added if it is not empty
    if (input.value !== "") {
        
        const userChapter = input.value;
        input.value = "";


        // create an li element
        const listItem = document.createElement("li")

        // create a delete button
        const deleteBtn = document.createElement("button")

        // populate the li elements textContent or innerHTML with the input

        listItem.textContent = userChapter;

        // populate the button textContent with an ❌
        deleteBtn.textContent = "❌";

        // append the li element with the delete button
        // append the list element with the li element just created and appended with text and the delete button

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);

        deleteBtn.addEventListener('click', () => {
        list.removeChild(listItem);})

        input.focus();
    }
}


);
