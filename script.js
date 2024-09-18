
const touchedFields={
  fname: false,
  femail: false,
  fphone: false,
  fpass: false,
  fcpass: false,
};
// only numbers are allowed
document
  .getElementById("fphone")
  .addEventListener("keypress", function (event) {
    if (event.key < "0" || event.key > "9") {
      event.preventDefault();
    }
  });
// to clear all error messages
function clearErrors() {
  let errors = document.getElementsByClassName("formerror");
  for (let item of errors) {
    item.innerHTML = "";
  }
}

//to set error message for a specific field
function seterror(id, error){
  let element=document.getElementById(id);
  element.getElementsByClassName("formerror")[0].innerHTML=error;
}

// Show error card with a specific message
function showErrorCard(message){
  let errorCard=document.getElementById("errorCard");
  let errorMessage=document.getElementById("errorMessage");
  let overlay=document.getElementById("overlay");
  errorMessage.innerHTML=message;
  errorCard.classList.add("show");
  overlay.classList.add("show");
}

// Show success card 
function showSuccessCard(message) {
  let successCard = document.getElementById("successCard");
  let successMessage = document.getElementById("successMessage");
  let overlay = document.getElementById("overlay");

  successMessage.innerHTML = message;
  successCard.classList.add("show");
  overlay.classList.add("show");
  // Reset the form
  document.forms["myForm"].reset();
  // Reset touchedFields
  touchedFields.fname = false;
  touchedFields.femail = false;
  touchedFields.fphone = false;
  touchedFields.fpass = false;
  touchedFields.fcpass = false;
  clearErrors();
}


// Close the error or success card
function closeCard(){
  let errorCard=document.getElementById("errorCard");
  let successCard=document.getElementById("successCard");
  let overlay=document.getElementById("overlay");
  errorCard.classList.remove("show");
  successCard.classList.remove("show");
  overlay.classList.remove("show");
}

// Validate form
function validateForm() {
  let returnval=true;
  clearErrors();
  let errorMessage="";

  // Name validation
  let name=document.forms["myForm"]["fname"].value;
  let namePattern=/^[A-Za-z\s]+$/; // Only letters and spaces allowed
  if (touchedFields.fname && name.length<5 && name.length>20) {
    seterror("name","*Name must be at least 5 characters long.");
    errorMessage+="Name must be at least 5 characters long.<br>";
    returnval=false;
  } else if (touchedFields.fname && !namePattern.test(name)) {
    seterror("name", "*Name must not contain special characters or numbers.");
    errorMessage += "Name must not contain special characters or numbers.<br>";
    returnval=false;
  }

  // Email validation
  let email = document.forms["myForm"]["femail"].value;
  if (touchedFields.femail && !email.includes("@")) {
    seterror("email", "*Enter a valid email address (must contain @).");
    errorMessage += "Enter a valid email address (must contain @).<br>";
    returnval = false;
  }

  // Phone validation
  let phone = document.forms["myForm"]["fphone"].value;
  if (touchedFields.fphone && (phone.length != 10 || phone === "123456789")) {
    seterror(
      "phone",
      "*Phone number must be exactly 10 digits and not '123456789'."
    );
    errorMessage +=
      "Phone number must be exactly 10 digits and not '123456789'.<br>";
    returnval = false;
  }

  // Password validation
  let password = document.forms["myForm"]["fpass"].value;
  let passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (
    touchedFields.fpass &&
    (password.toLowerCase()==="password" ||
      password.toLowerCase() === name.toLowerCase())
  ) {
    seterror(
      "pass",
      "*Password cannot be 'password' or the same as your name."
    );
    errorMessage +=
      "Password cannot be 'password' or the same as your name.<br>";
    returnval = false;
  } else if (touchedFields.fpass && !passwordPattern.test(password)) {
    seterror(
      "pass",
      "*Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
    );
    errorMessage +=
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.<br>";
    returnval = false;
  }
  // Confirm password validation
  let confirmPassword = document.forms["myForm"]["fcpass"].value;
  if (touchedFields.fcpass && confirmPassword !== password) {
    seterror("cpass", "*Passwords do not match.");
    errorMessage += "Passwords do not match.<br>";
    returnval = false;
  }
  if (!returnval) {
    showErrorCard(errorMessage);
  }
  return returnval;
}
//onsubmit
document.getElementById("myForm").onsubmit = function (event) {
  if (!validateForm()) {
    event.preventDefault();
  } else {
    showSuccessCard("Form submitted successfully!");
    event.preventDefault();
  }
};

// Add onchange events for individual fields
document.getElementById("fname").onchange=function () {
  touchedFields.fname=true;
  validateForm();
};
document.getElementById("femail").onchange=function () {
  touchedFields.femail=true;
  validateForm();
};
document.getElementById("fphone").onchange=function () {
  touchedFields.fphone=true;
  validateForm();
};
document.getElementById("fpass").onchange=function () {
  touchedFields.fpass=true;
  validateForm();
};
document.getElementById("fcpass").onchange=function(){
  touchedFields.fcpass=true;
  validateForm();
};
