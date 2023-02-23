const email = document.getElementById("#email");

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});

const form = document.querySelector("form");
const mail = document.querySelector("#mail");
const emailError = document.querySelector("#mail + span.error");

mail.addEventListener("input", (event) =>{
// Each time the user types something, we check if the
// form fields are valid.
    if (mail.validity.valid){
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
    } else{
        // If there is still an error, show the correct error
        showError();
    }

});

form.addEventListener("submit", (event) => {
    // if the email field is valid, we let the form submit
    if (!mail.validity.valid){
        showError();

         // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
    }

})

function showError(){
    if (mail.validity.valueMissing){
        // If the field is empty,
        // display the following error message.
        emailError.textContent = "You need to enter an email address.";
    }
    else if (email.validity.typeMismatch){
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = "Entered value needs to be an email address.";
    } 
    else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }


    // Set the styling appropriately
    emailError.className = "error active";
};

